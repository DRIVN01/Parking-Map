/* ============================================================
   Trio Garage — private ADMIN screen
   See the garage, click a stall, set its status, Publish.
   Publishing commits assets/availability.js via /api/status; the
   public map redeploys and updates within ~1 minute.
   ============================================================ */
(function () {
  "use strict";
  var D = window.GARAGE_DATA;
  var SVGNS = "http://www.w3.org/2000/svg";
  if (!D) { alert("Map data failed to load."); return; }
  var vb = D.meta.viewBox;

  /* ---------- current status (from availability.js) ---------- */
  var STATUS = window.STALL_STATUS ||
    { available: window.AVAILABLE_STALLS || [], unavailable: [], notes: {} };
  var notes = Object.assign({}, STATUS.notes || {});
  var status = {};                 // num -> 'available' | 'reserved' | 'unavailable'
  (function () {
    var A = {}, U = {};
    (STATUS.available || []).forEach(function (n) { A[+n] = 1; });
    (STATUS.unavailable || []).forEach(function (n) { U[+n] = 1; });
    D.stalls.forEach(function (s) {
      status[s.num] = A[s.num] ? "available" : (U[s.num] ? "unavailable" : "reserved");
    });
  })();
  var original = Object.assign({}, status);   // to detect unsaved changes

  /* ---------- helpers ---------- */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function q(id) { return document.getElementById(id); }
  function typeInfo(t) { return D.types[t] || { name: t, color: "#888" }; }
  function ptsStr(poly) { return poly.map(function (p) { return p[0] + "," + p[1]; }).join(" "); }

  /* ---------- build the SVG (mirrors the public map) ---------- */
  var svg = el("svg", { viewBox: vb.join(" "), preserveAspectRatio: "xMidYMid meet" });
  var viewport = el("g", { id: "viewport" }, svg);

  el(D.footprintOpen ? "polyline" : "polygon",
     { points: ptsStr(D.footprint), class: "footprint" }, viewport);
  (D.walls || []).forEach(function (w) { el("polyline", { points: ptsStr(w), class: "wall" }, viewport); });

  function adaIcon(cx, cy, parent) {
    var img = el("image", { x: cx - 4.5, y: cy - 4.5, width: 9, height: 9, class: "ada-mark" }, parent);
    img.setAttribute("href", "assets/disabled.png");
    img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "assets/disabled.png");
  }
  function roomLabel(cx, cy, label, ls, vertical) {
    ls = ls || 5.2;
    var t = el("text", { x: cx, y: cy, class: "room-label" }, viewport);
    if (vertical) t.setAttribute("transform", "rotate(-90 " + cx + " " + cy + ")");
    (label || "").split("\n").forEach(function (line, i, arr) {
      var ts = el("tspan", { x: cx, dy: (i === 0 ? -(arr.length - 1) * ls / 2 : ls) }, t);
      ts.textContent = line;
    });
  }
  (D.rooms || []).forEach(function (r) {
    el("rect", { x: r.x, y: r.y, width: r.w, height: r.h, class: "room", rx: 1 }, viewport);
    roomLabel(r.x + r.w / 2, r.y + r.h / 2, r.label, r.ls, r.vlabel);
  });
  (D.polyrooms || []).forEach(function (r) {
    el("polygon", { points: ptsStr(r.poly), class: "room" }, viewport);
    roomLabel(r.lx, r.ly, r.label, r.ls);
  });
  (D.labels || []).forEach(function (n) {
    if (n.circle) el("ellipse", { cx: n.x, cy: n.y, rx: n.size * 1.7, ry: n.size * 1.2, class: "room" }, viewport);
    if (n.vertical || n.text.indexOf("\n") >= 0) roomLabel(n.x, n.y, n.text, n.ls, n.vertical);
    else { var t = el("text", { x: n.x, y: n.y, class: "room-label", "font-size": n.size || 4.4 }, viewport); t.textContent = n.text; }
  });
  (D.arrows || []).forEach(function (a) {
    var g2 = el("g", { class: "entry-arrow" }, viewport);
    el("line", { x1: a.x, y1: a.y1, x2: a.x, y2: a.y2 }, g2);
    var head = a.y2, s = a.dir === "down" ? -1 : 1;
    el("polyline", { points: (a.x - 3) + "," + (head + s * 4) + " " + a.x + "," + head + " " + (a.x + 3) + "," + (head + s * 4) }, g2);
  });
  if (D.elevator) {
    el("polygon", { points: ptsStr(D.elevator), class: "elev" }, viewport);
    var ec = D.elevator.reduce(function (a, p) { return [a[0] + p[0] / 4, a[1] + p[1] / 4]; }, [0, 0]);
    var et = el("text", { x: ec[0], y: ec[1], class: "room-label" }, viewport); et.textContent = "ELEV";
  }
  (D.streets || []).forEach(function (st) {
    var t = el("text", { x: st.x, y: st.y, class: "street", "font-size": st.size || 14, "text-anchor": "middle",
      transform: st.rot ? ("rotate(" + st.rot + " " + st.x + " " + st.y + ")") : null }, viewport);
    t.textContent = st.label;
  });

  var stallEls = {};
  var gStalls = el("g", { id: "stalls" }, viewport);
  D.stalls.forEach(function (s) {
    var ti = typeInfo(s.type);
    var poly = el("polygon", { points: ptsStr(s.poly), fill: ti.color, class: "stall",
      "data-num": s.num, tabindex: "0", role: "button", "aria-label": "Stall " + s.label }, gStalls);
    var lbl = el("text", { x: s.lx, y: s.ly, class: "stall-num" }, gStalls);
    lbl.textContent = s.label;
    if (ti.text && ti.text.toLowerCase() !== "#ffffff") lbl.setAttribute("fill", ti.text);
    if (s.type === "ada") { lbl.setAttribute("y", s.ly + 6.5); lbl.setAttribute("font-size", "6"); adaIcon(s.lx, s.ly - 4, gStalls); }
    stallEls[s.num] = { poly: poly, label: lbl, overlay: null, stall: s };
    paintStatus(s.num);
  });
  q("svgHost").appendChild(svg);

  // draw/refresh a stall's status overlay + edited highlight
  function paintStatus(num) {
    var e = stallEls[num], s = e.stall;
    if (e.overlay) { e.overlay.remove(); e.overlay = null; }
    var st = status[num];
    if (st === "available")
      e.overlay = el("polygon", { points: ptsStr(s.poly), class: "avail-ring" }, gStalls);
    else if (st === "unavailable")
      e.overlay = el("polygon", { points: ptsStr(s.poly), class: "unavail-overlay" }, gStalls);
    e.poly.classList.toggle("edited", status[num] !== original[num]);
  }

  /* ============================================================ PAN / ZOOM */
  var scale = 1, tx = 0, ty = 0, MIN = 1, MAX = 8;
  function apply() { viewport.setAttribute("transform", "translate(" + tx + " " + ty + ") scale(" + scale + ")"); }
  function clamp() { var r = svg.getBoundingClientRect(); tx = Math.min(0, Math.max(r.width - r.width * scale, tx)); ty = Math.min(0, Math.max(r.height - r.height * scale, ty)); }
  function zoomAt(cx, cy, factor) {
    var r = svg.getBoundingClientRect(), px = cx - r.left, py = cy - r.top;
    var ns = Math.min(MAX, Math.max(MIN, scale * factor)); if (ns === scale) return;
    tx = px - (px - tx) * (ns / scale); ty = py - (py - ty) * (ns / scale); scale = ns; clamp(); apply();
  }
  var host = q("svgHost");
  host.addEventListener("wheel", function (e) { e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.18 : 1 / 1.18); }, { passive: false });
  var pointers = {}, startDist = 0, startScale = 1, moved = false, downXY = null, downTime = 0;
  host.addEventListener("pointerdown", function (e) {
    try { host.setPointerCapture(e.pointerId); } catch (_) {}
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY }; moved = false; downXY = { x: e.clientX, y: e.clientY }; downTime = Date.now();
    if (Object.keys(pointers).length === 2) { var p = Object.values(pointers); startDist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); startScale = scale; }
    svg.classList.add("grabbing");
  });
  host.addEventListener("pointermove", function (e) {
    if (!pointers[e.pointerId]) return; var prev = pointers[e.pointerId];
    if (Object.keys(pointers).length === 2) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY }; var p = Object.values(pointers);
      var dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      zoomAt((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2, (startScale * (dist / startDist)) / scale); moved = true;
    } else {
      tx += e.clientX - prev.x; ty += e.clientY - prev.y; pointers[e.pointerId] = { x: e.clientX, y: e.clientY }; clamp(); apply();
      if (Math.abs(e.clientX - downXY.x) + Math.abs(e.clientY - downXY.y) > 6) moved = true;
    }
  });
  function upPointer(e) {
    delete pointers[e.pointerId]; if (Object.keys(pointers).length < 2) startDist = 0;
    if (Object.keys(pointers).length === 0) svg.classList.remove("grabbing");
    if (!moved && Date.now() - downTime < 500) {
      var hit = document.elementFromPoint(e.clientX, e.clientY);
      if (hit && hit.classList.contains("stall")) selectStall(+hit.getAttribute("data-num"));
    }
  }
  host.addEventListener("pointerup", upPointer);
  host.addEventListener("pointercancel", upPointer);
  gStalls.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("stall")) { e.preventDefault(); selectStall(+e.target.getAttribute("data-num")); }
  });
  q("zoomIn").onclick = function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.4); };
  q("zoomOut").onclick = function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 1.4); };
  q("zoomReset").onclick = function () { scale = 1; tx = 0; ty = 0; apply(); };

  /* ============================================================ STATUS PICKER */
  var selected = null;
  var STATUS_NAME = { available: "Available", reserved: "Reserved", unavailable: "Unavailable" };
  function selectStall(num) {
    if (selected != null && stallEls[selected]) stallEls[selected].poly.classList.remove("selected");
    selected = num; stallEls[num].poly.classList.add("selected");
    var s = stallEls[num].stall, ti = typeInfo(s.type);
    q("pickerTitle").textContent = "Stall " + s.label;
    q("pickerType").textContent = ti.name;
    Array.prototype.forEach.call(document.querySelectorAll(".pk"), function (b) {
      b.classList.toggle("on", b.getAttribute("data-set") === status[num]);
    });
    q("picker").hidden = false;
    var hint = q("hint"); if (hint) hint.style.opacity = "0";
  }
  function closePicker() {
    if (selected != null && stallEls[selected]) stallEls[selected].poly.classList.remove("selected");
    selected = null; q("picker").hidden = true;
  }
  q("pickerClose").onclick = closePicker;
  Array.prototype.forEach.call(document.querySelectorAll(".pk"), function (b) {
    b.onclick = function () {
      if (selected == null) return;
      status[selected] = b.getAttribute("data-set");
      paintStatus(selected);
      Array.prototype.forEach.call(document.querySelectorAll(".pk"), function (o) {
        o.classList.toggle("on", o.getAttribute("data-set") === status[selected]);
      });
      refreshLegend(); updateDirty();
    };
  });

  /* ============================================================ LEGEND */
  var legend = q("legend");
  function refreshLegend() {
    var c = { available: 0, reserved: 0, unavailable: 0 };
    D.stalls.forEach(function (s) { c[status[s.num]]++; });
    legend.innerHTML =
      '<div class="lg-title">Status</div>' +
      row("available", "Available", c.available) +
      row("reserved", "Reserved", c.reserved) +
      row("unavailable", "Unavailable", c.unavailable);
    function row(k, name, n) {
      return '<div class="lg-row"><span class="sw sw-' + k + '"></span><span>' + name + '</span><span class="lg-count">' + n + '</span></div>';
    }
  }
  refreshLegend();

  /* ============================================================ DIRTY / PUBLISH */
  var pub = q("publishBtn");
  function changedNums() { return D.stalls.filter(function (s) { return status[s.num] !== original[s.num]; }).map(function (s) { return s.num; }); }
  function updateDirty() {
    var n = changedNums().length;
    pub.disabled = n === 0 || preview;
    pub.textContent = n === 0 ? "Publish changes" : "Publish " + n + " change" + (n === 1 ? "" : "s");
    window.onbeforeunload = n ? function () { return "You have unpublished changes."; } : null;
  }

  function payload() {
    var available = [], unavailable = [];
    D.stalls.forEach(function (s) {
      if (status[s.num] === "available") available.push(s.num);
      else if (status[s.num] === "unavailable") unavailable.push(s.num);
    });
    available.sort(function (a, b) { return a - b; }); unavailable.sort(function (a, b) { return a - b; });
    return { available: available, unavailable: unavailable, notes: notes };
  }

  var toastT;
  function toast(msg, kind) {
    var t = q("toast"); t.textContent = msg; t.className = "toast show " + (kind || ""); t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  pub.onclick = function () {
    if (preview) return;
    var body = Object.assign({ password: password }, payload());
    pub.disabled = true; pub.textContent = "Publishing…";
    fetch("/api/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.j && res.j.error || "Save failed");
        original = Object.assign({}, status);
        D.stalls.forEach(function (s) { paintStatus(s.num); });
        updateDirty();
        toast("Published — the public map will update within about a minute.", "ok");
      })
      .catch(function (err) { updateDirty(); toast(err.message || "Could not publish. Check your connection and try again.", "err"); });
  };

  /* ============================================================ LOGIN GATE */
  var password = "", preview = false;
  var isLocal = location.protocol === "file:" || /^(localhost|127\.|\[?::1)/.test(location.hostname);

  function enter() { q("gate").classList.add("hidden"); setTimeout(function () { q("gate").style.display = "none"; }, 250); apply(); updateDirty(); }

  if (isLocal) {                       // offline preview: render everything, but can't publish
    preview = true;
    q("gate").style.display = "none";
    apply(); updateDirty();
    toast("Offline preview — sign-in and publishing work once deployed.", "");
  }

  q("gateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var pass = q("gatePass").value, btn = q("gateBtn"), msg = q("gateMsg");
    if (!pass) return;
    btn.disabled = true; btn.textContent = "Checking…"; msg.hidden = true;
    fetch("/api/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "verify", password: pass }) })
      .then(function (r) { return { ok: r.ok, status: r.status }; })
      .then(function (res) {
        btn.disabled = false; btn.textContent = "Sign in";
        if (res.ok) { password = pass; enter(); }
        else { msg.textContent = res.status === 401 ? "Wrong password." : "Sign-in unavailable — check the server setup."; msg.hidden = false; }
      })
      .catch(function () { btn.disabled = false; btn.textContent = "Sign in"; msg.textContent = "Can’t reach the server. Try again."; msg.hidden = false; });
  });
})();
