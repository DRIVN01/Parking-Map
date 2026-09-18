/* ============================================================
   /api/status  —  Vercel serverless function (Node.js runtime)

   GET                                   -> current stall status (public, briefly cached)
   POST { action:"verify", password }    -> checks the password
   POST { action:"load",   password }    -> current status, never cached (admin baseline)
   POST { password, changes:{ "12":"reserved", "40":"available" } }
        -> applies ONLY the listed stalls on top of the latest saved file and
           commits assets/availability.js. Stalls not listed are left untouched,
           so an old/stale admin tab can never overwrite someone else's changes.

   Env (Vercel → Settings → Environment Variables):
     ADMIN_PASSWORD, GITHUB_TOKEN   (required)
     GH_OWNER / GH_REPO / GH_BRANCH (optional; auto-detected on Vercel)
   ============================================================ */
const crypto = require("crypto");
const vm = require("vm");

function safeEqual(a, b) {
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}
const clean = (arr) => Array.from(new Set((arr || []).map(Number)
  .filter((n) => Number.isInteger(n) && n >= 1 && n <= 9999))).sort((a, b) => a - b);

function parseStatus(src) {
  const ctx = { window: {} };
  try { vm.runInNewContext(src, ctx, { timeout: 200 }); } catch (e) { return null; }
  const st = ctx.window.STALL_STATUS ||
    (ctx.window.AVAILABLE_STALLS ? { available: ctx.window.AVAILABLE_STALLS } : null);
  if (!st) return null;
  return { available: clean(st.available), unavailable: clean(st.unavailable),
           notes: st.notes && typeof st.notes === "object" ? Object.assign({}, st.notes) : {} };
}

function buildFile(s) {
  const noteLines = Object.keys(s.notes || {}).filter((k) => s.notes[k])
    .map((k) => `    ${k}: ${JSON.stringify(String(s.notes[k]))}`).join(",\n");
  return (
"/* ============================================================\n" +
"   STALL STATUS  —  updated from the private admin screen.\n" +
"   available = open to reserve now; unavailable = out of service;\n" +
"   any stall not listed is treated as Reserved.\n" +
"   ============================================================ */\n\n" +
"window.STALL_STATUS = {\n\n" +
"  available: [" + s.available.join(", ") + "],\n\n" +
"  unavailable: [" + s.unavailable.join(", ") + "],\n\n" +
"  notes: {" + (noteLines ? "\n" + noteLines + "\n  " : "") + "}\n" +
"};\n");
}

function applyChanges(state, changes) {
  const A = new Set(state.available), U = new Set(state.unavailable);
  for (const [k, v] of Object.entries(changes || {})) {
    const n = Number(k);
    if (!Number.isInteger(n) || n < 1) continue;
    A.delete(n); U.delete(n);
    if (v === "available") A.add(n); else if (v === "unavailable") U.add(n); // "reserved" = neither
  }
  return { available: clean([...A]), unavailable: clean([...U]), notes: state.notes };
}

function gh() {
  const owner = process.env.GH_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "Noufelghayati";
  const repo = process.env.GH_REPO || process.env.VERCEL_GIT_REPO_SLUG || "trio-garage-map";
  const branch = process.env.GH_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
  return {
    branch,
    api: `https://api.github.com/repos/${owner}/${repo}/contents/assets/availability.js`,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json",
               "User-Agent": "garage-admin", "X-GitHub-Api-Version": "2022-11-28" },
  };
}

async function readCurrent(g) {
  const r = await fetch(`${g.api}?ref=${g.branch}&t=${Date.now()}`, { headers: g.headers, cache: "no-store" });
  if (r.status === 404) return { sha: undefined, state: { available: [], unavailable: [], notes: {} } };
  if (!r.ok) throw new Error("read " + r.status + " " + (await r.text()).slice(0, 200));
  const j = await r.json();
  const state = parseStatus(Buffer.from(j.content || "", "base64").toString("utf8"));
  if (!state) throw new Error("could not parse availability.js");
  return { sha: j.sha, state };
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = []; for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return {}; }
}

module.exports = async function handler(req, res) {
  if (!process.env.GITHUB_TOKEN) return res.status(500).json({ error: "Server not configured: GITHUB_TOKEN is missing." });
  const g = gh();

  if (req.method === "GET") {                       // public read for the map
    try {
      const { state } = await readCurrent(g);
      res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=30");
      return res.status(200).json(state);
    } catch (e) { return res.status(502).json({ error: "Could not read status." }); }
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  res.setHeader("Cache-Control", "no-store");
  const PASS = process.env.ADMIN_PASSWORD;
  if (!PASS) return res.status(500).json({ error: "Server not configured: ADMIN_PASSWORD is missing." });
  const body = await readBody(req);
  if (!body.password || !safeEqual(body.password, PASS)) return res.status(401).json({ error: "Wrong password." });

  if (body.action === "verify") return res.status(200).json({ ok: true });
  if (body.action === "load") {
    try { return res.status(200).json({ ok: true, state: (await readCurrent(g)).state }); }
    catch (e) { return res.status(502).json({ error: "Could not load the latest status.", detail: String(e).slice(0, 200) }); }
  }

  // An older admin page (still open in a tab) sends the full list instead of changes.
  // Refuse it so it can't overwrite newer edits.
  if (!body.changes || typeof body.changes !== "object")
    return res.status(409).json({ error: "The admin screen was updated — please reload the page (Ctrl+Shift+R) and try again." });
  if (!Object.keys(body.changes).length) return res.status(400).json({ error: "No changes to publish." });

  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const { sha, state } = await readCurrent(g);
      const next = applyChanges(state, body.changes);
      const put = await fetch(g.api, { method: "PUT", headers: g.headers, body: JSON.stringify({
        message: "Admin: update stall availability",
        content: Buffer.from(buildFile(next), "utf8").toString("base64"),
        branch: g.branch, ...(sha ? { sha } : {}) }) });
      if (put.status === 409 || put.status === 422) continue;        // someone saved in between: re-read & retry
      if (!put.ok) return res.status(502).json({ error: "GitHub rejected the update.", detail: (await put.text()).slice(0, 200) });
      return res.status(200).json({ ok: true, committed: true, state: next });
    } catch (e) {
      if (attempt === 3) return res.status(502).json({ error: "Could not reach GitHub.", detail: String(e).slice(0, 200) });
    }
  }
  return res.status(409).json({ error: "Another update was saving at the same time — please press Publish again." });
};
