/* ============================================================
   Trio Public Garage — interactive stall map (vanilla JS, no deps)
   Renders the SVG map from window.GARAGE_DATA and wires up
   pan/zoom, stall selection, photo panel, search and filtering.
   ============================================================ */
function startGarageApp() {
  "use strict";
  var D = window.GARAGE_DATA;
  if (!D) { console.error("GARAGE_DATA not found"); return; }
  var SVGNS = "http://www.w3.org/2000/svg";
  var vb = D.meta.viewBox;                 // [x,y,w,h]
  var byNum = {};
  D.stalls.forEach(function (s) { byNum[s.num] = s; });

  // Status (available / reserved / unavailable) lives in assets/availability.js
  // so it can be maintained on its own. Reserved is the default.
  var STATUS_META = {
    available:   { name: "Available",   badge: "avail" },
    reserved:    { name: "Reserved",    badge: "reserved" },
    unavailable: { name: "Unavailable", badge: "unavail" }
  };
  (function () {
    var st = window.STALL_STATUS || {};
    if (!window.STALL_STATUS && window.AVAILABLE_STALLS)   // backward compatibility
      st = { available: window.AVAILABLE_STALLS, unavailable: [], notes: {} };
    var A = {}, U = {}, notes = st.notes || {};
    (st.available || []).forEach(function (n) { A[+n] = 1; });
    (st.unavailable || []).forEach(function (n) { U[+n] = 1; });
    D.stalls.forEach(function (s) {
      s.status = A[s.num] ? "available" : (U[s.num] ? "unavailable" : "reserved");
      s.available = s.status === "available";              // kept for existing checks
      s.note = notes[s.num] || notes[String(s.num)] || "";
    });
  })();

  /* ---------- helpers ---------- */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function q(id) { return document.getElementById(id); }
  function typeInfo(t) { return D.types[t] || { name: t, color: "#888" }; }
  function ptsStr(poly) { return poly.map(function (p) { return p[0] + "," + p[1]; }).join(" "); }

  /* ---------- build the SVG ---------- */
  var svg = el("svg", {
    viewBox: vb.join(" "),
    preserveAspectRatio: "xMidYMid meet",
    role: "img", "aria-label": "Garage map"
  });
  var viewport = el("g", { id: "viewport" }, svg);   // pan/zoom target

  // footprint (garage floor). Open polyline when the top wall has an entrance opening;
  // polyline still fills (implicitly closed) but leaves the stroke gap.
  el(D.footprintOpen ? "polyline" : "polygon",
     { points: ptsStr(D.footprint), class: "footprint" }, viewport);

  // interior bay walls (drawn in Illustrator)
  (D.walls || []).forEach(function (w) {
    el("polyline", { points: ptsStr(w), class: "wall" }, viewport);
  });

  // ADA wheelchair icon (Ed's white PNG)
  function adaIcon(cx, cy, parent) {
    var s = 9;
    var img = el("image", { x: cx - s / 2, y: cy - s / 2, width: s, height: s, class: "ada-mark" }, parent);
    img.setAttribute("href", "assets/disabled.png");
    img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "assets/disabled.png");
  }

  // room label helper (supports multi-line, custom spacing, and vertical rotation)
  function roomLabel(cx, cy, label, ls, vertical) {
    ls = ls || 5.2;
    var t = el("text", { x: cx, y: cy, class: "room-label" }, viewport);
    if (vertical) t.setAttribute("transform", "rotate(-90 " + cx + " " + cy + ")");
    var lines = (label || "").split("\n");
    lines.forEach(function (line, i) {
      var ts = el("tspan", { x: cx, dy: (i === 0 ? -(lines.length - 1) * ls / 2 : ls) }, t);
      ts.textContent = line;
    });
  }

  // rooms (non-clickable context)
  (D.rooms || []).forEach(function (r) {
    el("rect", { x: r.x, y: r.y, width: r.w, height: r.h, class: "room", rx: 1 }, viewport);
    roomLabel(r.x + r.w / 2, r.y + r.h / 2, r.label, r.ls, r.vlabel);
  });

  // poly-rooms (angled context areas, e.g. bicycle racks)
  (D.polyrooms || []).forEach(function (r) {
    el("polygon", { points: ptsStr(r.poly), class: "room" }, viewport);
    roomLabel(r.lx, r.ly, r.label, r.ls);
  });

  // small feature / door labels
  (D.labels || []).forEach(function (n) {
    if (n.circle) el("ellipse", { cx: n.x, cy: n.y, rx: n.size * 1.7, ry: n.size * 1.2, class: "room" }, viewport);
    if (n.vertical || n.text.indexOf("\n") >= 0) {
      roomLabel(n.x, n.y, n.text, n.ls, n.vertical);   // multi-line / rotated (e.g. FIRE RISER)
    } else {
      var t = el("text", { x: n.x, y: n.y, class: "room-label", "font-size": n.size || 4.4 }, viewport);
      t.textContent = n.text;
    }
  });

  // vehicle entrance arrows
  (D.arrows || []).forEach(function (a) {
    var g2 = el("g", { class: "entry-arrow" }, viewport);
    el("line", { x1: a.x, y1: a.y1, x2: a.x, y2: a.y2 }, g2);
    var head = a.dir === "down" ? a.y2 : a.y2, s = a.dir === "down" ? -1 : 1;
    el("polyline", { points: (a.x - 3) + "," + (head + s * 4) + " " + a.x + "," + head + " " + (a.x + 3) + "," + (head + s * 4) }, g2);
  });

  // elevator diamond
  if (D.elevator) {
    el("polygon", { points: ptsStr(D.elevator), class: "elev" }, viewport);
    var ec = D.elevator.reduce(function (a, p) { return [a[0] + p[0] / 4, a[1] + p[1] / 4]; }, [0, 0]);
    var et = el("text", { x: ec[0], y: ec[1], class: "room-label" }, viewport);
    et.textContent = "ELEV";
  }

  // streets (outside labels)
  (D.streets || []).forEach(function (s) {
    var t = el("text", {
      x: s.x, y: s.y, class: "street",
      "font-size": s.size || 14, "text-anchor": "middle",
      transform: s.rot ? ("rotate(" + s.rot + " " + s.x + " " + s.y + ")") : null
    }, viewport);
    t.textContent = s.label;
  });

  // stalls
  var stallEls = {};   // num -> {poly, label}
  var gStalls = el("g", { id: "stalls" }, viewport);
  D.stalls.forEach(function (s) {
    var ti = typeInfo(s.type);
    var poly = el("polygon", {
      points: ptsStr(s.poly), fill: ti.color, class: "stall",
      "data-num": s.num, tabindex: "0", role: "button",
      "aria-label": "Stall " + s.label + ", " + ti.name
    }, gStalls);
    var lbl = el("text", { x: s.lx, y: s.ly, class: "stall-num" }, gStalls);
    lbl.textContent = s.label;
    if (ti.text && ti.text.toLowerCase() !== "#ffffff") lbl.setAttribute("fill", ti.text);
    // ADA: wheelchair icon (Ed's PNG) above the number
    if (s.type === "ada") {
      lbl.setAttribute("y", s.ly + 6.5);
      lbl.setAttribute("font-size", "6");
      adaIcon(s.lx, s.ly - 4, gStalls);
    }
    // status overlay drawn on top so it never fights the selection stroke:
    // available -> neon-green ring; unavailable -> grey hatch; reserved -> none
    var overlay = null;
    if (s.status === "available") {
      overlay = el("polygon", { points: ptsStr(s.poly), class: "avail-ring" }, gStalls);
    } else if (s.status === "unavailable") {
      overlay = el("polygon", { points: ptsStr(s.poly), class: "unavail-overlay" }, gStalls);
    }
    stallEls[s.num] = { poly: poly, label: lbl, ring: overlay };
  });

  q("svgHost").appendChild(svg);

  /* ============================================================
     PAN / ZOOM
     ============================================================ */
  var scale = 1, tx = 0, ty = 0, MIN = 1, MAX = 8;
  function apply() { viewport.setAttribute("transform", "translate(" + tx + " " + ty + ") scale(" + scale + ")"); }
  function clamp() {
    // keep content from drifting fully off-screen
    var r = svg.getBoundingClientRect();
    var cw = r.width, ch = r.height;
    var minTx = cw - cw * scale, minTy = ch - ch * scale;
    // convert: our transform is in viewBox units mapped by svg; use simple bounds in client space
    tx = Math.min(0, Math.max(minTx, tx));
    ty = Math.min(0, Math.max(minTy, ty));
  }
  function clientToLocal(cx, cy) {
    var r = svg.getBoundingClientRect();
    return { x: (cx - r.left - tx) / scale, y: (cy - r.top - ty) / scale };
  }
  function zoomAt(cx, cy, factor) {
    var r = svg.getBoundingClientRect();
    var px = cx - r.left, py = cy - r.top;
    var ns = Math.min(MAX, Math.max(MIN, scale * factor));
    if (ns === scale) return;
    tx = px - (px - tx) * (ns / scale);
    ty = py - (py - ty) * (ns / scale);
    scale = ns; clamp(); apply();
  }
  function resetView() { scale = 1; tx = 0; ty = 0; apply(); }

  var host = q("svgHost");
  // wheel zoom
  host.addEventListener("wheel", function (e) {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.18 : 1 / 1.18);
  }, { passive: false });

  // pointer drag + pinch
  var pointers = {}, startDist = 0, startScale = 1, moved = false, downXY = null, downTime = 0;
  host.addEventListener("pointerdown", function (e) {
    try { host.setPointerCapture(e.pointerId); } catch (_) {}
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    moved = false; downXY = { x: e.clientX, y: e.clientY }; downTime = Date.now();
    if (Object.keys(pointers).length === 2) {
      var p = Object.values(pointers);
      startDist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      startScale = scale;
    }
    svg.classList.add("grabbing");
  });
  host.addEventListener("pointermove", function (e) {
    if (!pointers[e.pointerId]) return;
    var prev = pointers[e.pointerId];
    var ids = Object.keys(pointers);
    if (ids.length === 2) {                          // pinch
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var p = Object.values(pointers);
      var dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      var midx = (p[0].x + p[1].x) / 2, midy = (p[0].y + p[1].y) / 2;
      var target = startScale * (dist / startDist);
      zoomAt(midx, midy, target / scale);
      moved = true;
    } else {                                         // pan
      var dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      tx += dx; ty += dy; pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      clamp(); apply();
      if (Math.abs(e.clientX - downXY.x) + Math.abs(e.clientY - downXY.y) > 6) moved = true;
    }
  });
  function upPointer(e) {
    delete pointers[e.pointerId];
    if (Object.keys(pointers).length < 2) startDist = 0;
    if (Object.keys(pointers).length === 0) svg.classList.remove("grabbing");
    // tap detection — use elementFromPoint because pointer capture retargets e.target to host
    if (!moved && Date.now() - downTime < 500) {
      var hit = document.elementFromPoint(e.clientX, e.clientY);
      if (hit && hit.classList.contains("stall")) selectStall(+hit.getAttribute("data-num"), false);
    }
  }
  host.addEventListener("pointerup", upPointer);
  host.addEventListener("pointercancel", upPointer);

  // keyboard activation of stalls
  gStalls.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("stall")) {
      e.preventDefault(); selectStall(+e.target.getAttribute("data-num"), false);
    }
  });

  q("zoomIn").onclick = function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.4); };
  q("zoomOut").onclick = function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 1.4); };
  q("zoomReset").onclick = resetView;

  /* ============================================================
     SELECTION + INFO SHEET
     ============================================================ */
  var selected = null, gallery = [], galIdx = 0;
  var sheet = q("sheet"), backdrop = q("sheetBackdrop");

  function focusStall(num) {
    // center + zoom to a stall
    var s = byNum[num]; if (!s) return;
    var r = svg.getBoundingClientRect();
    var target = Math.max(scale, 2.4);
    scale = target;
    // stall center in viewBox units -> client px scaling: svg maps viewBox to r via meet
    var sx = r.width / vb[2], sy = r.height / vb[3], k = Math.min(sx, sy);
    var offx = (r.width - vb[2] * k) / 2, offy = (r.height - vb[3] * k) / 2;
    var scx = offx + s.lx * k, scy = offy + s.ly * k;   // stall center in unscaled client px
    tx = r.width / 2 - scx * scale;
    ty = r.height / 2 - scy * scale;
    clamp(); apply();
  }

  function selectStall(num, fromList) {
    var s = byNum[num]; if (!s) return;
    if (selected != null && stallEls[selected]) {
      stallEls[selected].poly.classList.remove("selected");
    }
    selected = num;
    stallEls[num].poly.classList.add("selected");
    // raise selected polygon
    gStalls.appendChild(stallEls[num].poly); gStalls.appendChild(stallEls[num].label);
    // list highlight
    Array.prototype.forEach.call(q("spotList").children, function (li) {
      li.classList.toggle("active", +li.getAttribute("data-num") === num);
    });
    var active = q("spotList").querySelector("li.active");
    // only scroll the list when the sidebar is actually on-screen, otherwise
    // scrollIntoView drags the off-screen (transformed) mobile sidebar into view
    var sidebarVisible = window.innerWidth > 860 || q("sidebar").classList.contains("open");
    if (active && sidebarVisible) active.scrollIntoView({ block: "nearest", inline: "nearest" });

    openSheet(s);
    if (fromList) focusStall(num);
    var hint = q("hint"); if (hint) hint.style.opacity = "0";
    if (history.replaceState) history.replaceState(null, "", "#stall-" + num);
  }

  function openSheet(s) {
    var ti = typeInfo(s.type);
    q("stallTitle").textContent = s.title || ("Stall " + s.label);
    var badge = q("typeBadge");
    badge.textContent = ti.name; badge.style.background = ti.color;
    if (ti.text) badge.style.color = ti.text;
    var sb = q("statusBadge"), sm = STATUS_META[s.status] || STATUS_META.reserved;
    sb.textContent = sm.name;
    sb.className = "status-badge st-" + sm.badge;
    var note = q("stallNote");
    note.textContent = s.note || ""; note.hidden = !s.note;
    badge.style.color = ti.text || "#fff";
    q("stallDesc").textContent = s.description || "";
    gallery = (s.photos && s.photos.length) ? s.photos : [];
    galIdx = 0; renderGallery();
    sheet.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(function () { sheet.classList.add("show"); backdrop.classList.add("show"); });
  }
  function closeSheet() {
    sheet.classList.remove("show"); backdrop.classList.remove("show");
    setTimeout(function () { sheet.hidden = true; backdrop.hidden = true; }, 280);
    if (selected != null && stallEls[selected]) stallEls[selected].poly.classList.remove("selected");
    var active = q("spotList").querySelector("li.active");
    if (active) active.classList.remove("active");
    selected = null;
  }
  function renderGallery() {
    var img = q("galImg"), dots = q("galDots");
    if (!gallery.length) { img.removeAttribute("src"); img.alt = "No photo"; }
    else { img.src = gallery[galIdx]; img.alt = q("stallTitle").textContent + " photo " + (galIdx + 1); }
    var multi = gallery.length > 1;
    q("galPrev").hidden = !multi; q("galNext").hidden = !multi;
    dots.innerHTML = "";
    if (multi) gallery.forEach(function (_, i) {
      var d = document.createElement("i"); if (i === galIdx) d.className = "on"; dots.appendChild(d);
    });
  }
  q("galPrev").onclick = function () { galIdx = (galIdx - 1 + gallery.length) % gallery.length; renderGallery(); };
  q("galNext").onclick = function () { galIdx = (galIdx + 1) % gallery.length; renderGallery(); };
  q("galImg").addEventListener("error", function () {
    this.style.background = "#33424f";
    this.alt = "Photo not found — add it to /photos";
  });
  q("sheetClose").onclick = closeSheet;
  backdrop.onclick = closeSheet;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });

  /* ============================================================
     SIDEBAR LIST + SEARCH
     ============================================================ */
  var list = q("spotList");
  D.stalls.forEach(function (s) {
    var ti = typeInfo(s.type);
    var li = document.createElement("li");
    li.setAttribute("data-num", s.num);
    var sm = STATUS_META[s.status] || STATUS_META.reserved;
    li.setAttribute("data-search",
      (s.label + " " + ti.name + " " + s.num + " " + sm.name).toLowerCase());
    // chip shown only for available / unavailable; reserved is the quiet default
    var chip = s.status === "reserved" ? "" :
      '<span class="spot-status st-' + sm.badge + '">' + sm.name + '</span>';
    li.innerHTML =
      '<span class="spot-dot" style="background:' + ti.color + '"></span>' +
      '<span class="spot-num">' + s.label + '</span>' +
      '<span class="spot-type">' + ti.name + '</span>' +
      chip +
      '<span class="spot-chev">›</span>';
    li.onclick = function () { selectStall(s.num, true); if (window.innerWidth <= 860) closeSidebar(); };
    list.appendChild(li);
  });

  // One filter at a time: null = show everything, else {kind:'type'|'available', value}
  var activeFilter = null;
  var searchTerm = "";

  function matchesFilter(s) {
    if (!activeFilter) return true;
    if (activeFilter.kind === "type") return s.type === activeFilter.value;
    return s.status === activeFilter.value;   // status filter
  }

  function refresh() {
    var shown = 0;
    D.stalls.forEach(function (s) {
      var li = list.querySelector('li[data-num="' + s.num + '"]');
      var okSearch = !searchTerm || li.getAttribute("data-search").indexOf(searchTerm) >= 0;
      var vis = matchesFilter(s) && okSearch;
      li.classList.toggle("hiddenItem", !vis);
      // map dimming
      var e = stallEls[s.num];
      e.poly.classList.toggle("dim", !vis);
      e.label.classList.toggle("dim", !vis);
      if (e.ring) e.ring.classList.toggle("dim", !vis);
      if (vis) shown++;
    });
    q("matchLabel").textContent = shown + (shown === 1 ? " stall" : " stalls");
    q("visibleCount").textContent = shown;
    var empty = list.querySelector(".no-match");
    if (shown === 0 && !empty) {
      var p = document.createElement("li"); p.className = "no-match"; p.textContent = "No stalls match your search.";
      list.appendChild(p);
    } else if (shown > 0 && empty) empty.remove();
  }

  var search = q("search");
  search.addEventListener("input", function () {
    searchTerm = this.value.trim().toLowerCase();
    q("clearSearch").hidden = !this.value;
    refresh();
  });
  q("clearSearch").onclick = function () { search.value = ""; searchTerm = ""; this.hidden = true; refresh(); search.focus(); };

  /* ============================================================
     LEGEND (color key + type filter)
     ============================================================ */
  var legend = q("legend");
  var counts = {}, statusCounts = { available: 0, reserved: 0, unavailable: 0 };
  D.stalls.forEach(function (s) {
    counts[s.type] = (counts[s.type] || 0) + 1;
    statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
  });

  // Clicking a row isolates it (shows only those stalls); clicking it again clears.
  function makeRow(key, swatchHTML, name, count) {
    var b = document.createElement("button");
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("data-filter", key.value);
    b.innerHTML = swatchHTML + '<span>' + name + '</span>' +
      '<span class="lg-count">' + count + '</span>';
    b.onclick = function () {
      var same = activeFilter && activeFilter.kind === key.kind && activeFilter.value === key.value;
      activeFilter = same ? null : { kind: key.kind, value: key.value };
      Array.prototype.forEach.call(legend.querySelectorAll("button"), function (o) {
        o.classList.remove("on"); o.setAttribute("aria-pressed", "false");
      });
      if (activeFilter) { b.classList.add("on"); b.setAttribute("aria-pressed", "true"); }
      legend.classList.toggle("filtering", !!activeFilter);
      refresh();
    };
    legend.appendChild(b);
    return b;
  }

  Object.keys(D.types).forEach(function (t) {
    if (!counts[t]) return;
    var ti = D.types[t];
    makeRow({ kind: "type", value: t },
      '<span class="sw" style="background:' + ti.color + '"></span>', ti.name, counts[t]);
  });
  // status rows (separate axis from stall type)
  var sep = document.createElement("div"); sep.className = "lg-sep"; legend.appendChild(sep);
  makeRow({ kind: "status", value: "available" },
    '<span class="sw sw-avail"></span>', "Available", statusCounts.available);
  makeRow({ kind: "status", value: "reserved" },
    '<span class="sw sw-reserved"></span>', "Reserved", statusCounts.reserved);
  if (statusCounts.unavailable)
    makeRow({ kind: "status", value: "unavailable" },
      '<span class="sw sw-unavail"></span>', "Unavailable", statusCounts.unavailable);

  /* ============================================================
     MOBILE SIDEBAR TOGGLE
     ============================================================ */
  function openSidebar() { q("sidebar").classList.add("open"); }
  function closeSidebar() { q("sidebar").classList.remove("open"); }
  q("listToggle").onclick = function () { q("sidebar").classList.toggle("open"); };

  // initial paint
  apply(); refresh();
  window.addEventListener("resize", function () { clamp(); apply(); });

  // deep-link: open #stall-N on load (shareable links, e.g. …/index.html#stall-54)
  function openFromHash() {
    var m = /stall-(\d+)/.exec(location.hash);
    if (m && byNum[+m[1]]) selectStall(+m[1], true);
  }
  window.addEventListener("hashchange", openFromHash);
  setTimeout(openFromHash, 60);
}

// Load the live status first (same source the admin saves to), so the public map
// is never behind the admin. Falls back to the static availability.js if the API
// is unreachable or slow, or when the page is opened as a local file.
(function boot() {
  var started = false;
  function go() { if (!started) { started = true; startGarageApp(); } }
  if (!/^https?:$/.test(location.protocol) || !window.fetch) return go();
  var timer = setTimeout(go, 2500);
  fetch("/api/status", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (st) {
      if (st && Array.isArray(st.available))
        window.STALL_STATUS = { available: st.available, unavailable: st.unavailable || [], notes: st.notes || {} };
    })
    .catch(function () {})
    .then(function () { clearTimeout(timer); go(); });
})();
