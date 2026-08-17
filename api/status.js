/* ============================================================
   /api/status  —  Vercel serverless function (Node.js runtime)
   POST { action:"verify", password }              -> checks the password
   POST { password, available:[], unavailable:[], notes:{} }
        -> writes assets/availability.js into the GitHub repo (a commit),
           which triggers a redeploy so the public map updates in ~1 min.

   Required environment variables (set in Vercel → Project → Settings → Env):
     ADMIN_PASSWORD   the admin sign-in password
     GITHUB_TOKEN     a fine-grained token with "Contents: Read and write" on the repo
     GH_OWNER         (optional) repo owner   — default "Noufelghayati"
     GH_REPO          (optional) repo name    — default "trio-garage-map"
     GH_BRANCH        (optional) branch        — default "main"
   ============================================================ */
const crypto = require("crypto");

function safeEqual(a, b) {
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

function buildFile(available, unavailable, notes) {
  const list = (arr) => (arr && arr.length ? arr.join(", ") : "");
  const noteLines = Object.keys(notes || {})
    .filter((k) => notes[k])
    .map((k) => `    ${k}: ${JSON.stringify(String(notes[k]))}`)
    .join(",\n");
  return (
"/* ============================================================\n" +
"   STALL STATUS  —  updated from the private admin screen.\n" +
"   available = open to reserve now; unavailable = out of service;\n" +
"   any stall not listed is treated as Reserved.\n" +
"   ============================================================ */\n\n" +
"window.STALL_STATUS = {\n\n" +
"  available: [" + list(available) + "],\n\n" +
"  unavailable: [" + list(unavailable) + "],\n\n" +
"  notes: {" + (noteLines ? "\n" + noteLines + "\n  " : "") + "}\n" +
"};\n"
  );
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); }
  catch { return {}; }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const PASS = process.env.ADMIN_PASSWORD;
  if (!PASS) return res.status(500).json({ error: "Server not configured: ADMIN_PASSWORD is missing." });

  const body = await readBody(req);
  if (!body.password || !safeEqual(body.password, PASS))
    return res.status(401).json({ error: "Wrong password." });

  if (body.action === "verify") return res.status(200).json({ ok: true });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: "Server not configured: GITHUB_TOKEN is missing." });
  // Auto-detect the repo this is deployed from (Vercel sets these automatically),
  // so moving the project to another account needs no owner/repo config. Manual
  // GH_* env vars still win if set.
  const owner = process.env.GH_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "Noufelghayati";
  const repo = process.env.GH_REPO || process.env.VERCEL_GIT_REPO_SLUG || "trio-garage-map";
  const branch = process.env.GH_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
  const path = "assets/availability.js";
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "trio-garage-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const clean = (arr) => Array.from(new Set((arr || []).map(Number).filter((n) => n >= 1 && n <= 999))).sort((a, b) => a - b);
  const content = buildFile(clean(body.available), clean(body.unavailable), body.notes || {});

  try {
    // current SHA (needed to update an existing file)
    let sha;
    const cur = await fetch(`${api}?ref=${branch}`, { headers: ghHeaders });
    if (cur.status === 200) sha = (await cur.json()).sha;
    else if (cur.status !== 404) {
      const t = await cur.text();
      return res.status(502).json({ error: "Could not read the file from GitHub.", detail: t.slice(0, 300) });
    }

    const put = await fetch(api, {
      method: "PUT",
      headers: ghHeaders,
      body: JSON.stringify({
        message: "Admin: update stall availability",
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!put.ok) {
      const t = await put.text();
      return res.status(502).json({ error: "GitHub rejected the update.", detail: t.slice(0, 300) });
    }
    return res.status(200).json({ ok: true, committed: true });
  } catch (e) {
    return res.status(502).json({ error: "Could not reach GitHub.", detail: String(e).slice(0, 300) });
  }
};
