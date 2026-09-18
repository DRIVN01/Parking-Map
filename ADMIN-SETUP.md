# Admin screen — one-time setup to go live

The private admin screen lives at **`/admin.html`** (e.g.
`https://trio-garage-map.vercel.app/admin.html`). It shows the garage; you click a stall and
choose **Available / Reserved / Unavailable**, then press **Publish**. Publishing saves the
change and the public map shows it within a few seconds.

It works by committing `assets/availability.js` to GitHub (which redeploys the site), so there
is **no database and no extra account** to run — just two settings below.

## What you set once (in Vercel)

1. **Create a GitHub token** (lets the admin save changes):
   - GitHub → your profile → **Settings → Developer settings → Personal access tokens →
     Fine-grained tokens → Generate new token**.
   - Repository access: **Only select repositories → `trio-garage-map`**.
   - Permissions: **Repository permissions → Contents → Read and write**.
   - Generate, and copy the token (starts with `github_pat_…`).

2. **Add the settings in Vercel** → your project → **Settings → Environment Variables**
   (apply to Production):

   | Name             | Value                                        |
   |------------------|----------------------------------------------|
   | `ADMIN_PASSWORD` | a password you choose for signing in         |
   | `GITHUB_TOKEN`   | the token from step 1                        |

   Those two are all you need — the function automatically detects which GitHub repo it's
   deployed from. (Advanced/optional overrides, only if you host it somewhere other than
   Vercel: `GH_OWNER`, `GH_REPO`, `GH_BRANCH`.)

3. **Redeploy** (Vercel → Deployments → ⋯ → Redeploy) so the settings take effect.

That's it. Open `/admin.html`, sign in with `ADMIN_PASSWORD`, and you're live.

## Using it

- Sign in with the password.
- Tap a stall → pick **Available**, **Reserved**, or **Unavailable**. Changed stalls show an
  amber dashed outline until you publish.
- Press **Publish** — the public map shows the change within a few seconds.

## Good to know

- The password and the GitHub token are stored **only on the server** (Vercel), never in the
  page — visitors can't see them, and nothing can be changed without the password.
- The admin page is marked "no-index" so search engines won't list it. Share the link only with
  people who should have access.
- Opening `admin.html` from your computer (not the live site) shows a read-only **offline
  preview** — signing in and publishing only work on the deployed site.

## When the project moves to Drivn's accounts (Milestone 5)

Recreate the GitHub token under **Drivn's** GitHub account and update `GITHUB_TOKEN` (and
`GH_OWNER`/`GH_REPO` if the repo name changes) in Drivn's Vercel project. Nothing else changes.
