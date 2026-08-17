# Trio Public Garage — Interactive Stall Map

A mobile-friendly, interactive map of the garage. Every stall is clickable; tapping a
stall opens its photos, number, type and description. Includes a searchable stall list,
color-coding by stall type, pinch-zoom / pan, and works on phones, tablets and desktops.

This is the **Milestone 1** delivery. All **69 stalls (1–69)** from the plan are drawn and
fully interactive. Photos shown right now are **labeled sample placeholders** — replace them
with your real photos following the steps below (nothing in the code needs to change).

---

## 1. How to open it

**On your computer:** double-click **`index.html`** — it opens in your web browser. No
internet or server required.

**On your phone:** copy the whole folder to the phone (or host it — see below) and open
`index.html`. You can pinch to zoom and drag to pan.

**The live map** is hosted at **https://trio-garage-map.vercel.app/** — share that link
directly, or embed it on any web page (your Trio/Drivn site) with a single line:

```html
<iframe src="https://trio-garage-map.vercel.app/"
        style="width:100%;height:80vh;border:0"></iframe>
```

That's all your web person needs — paste it where you want the map to appear and it works on
phones and desktops. (If you'd rather self-host instead, upload this whole folder to any web
host and point the iframe at your own `index.html` — no server or setup required.)

You can also link straight to one stall, e.g. add `#stall-54` to the address
(`…vercel.app/#stall-54`) to open with that stall selected — useful for sharing a specific space.

---

## 2. What's in the folder

```
index.html            The page you open.
garage-map.svg        The clean vector map on its own (the "SVG source").
assets/
  availability.js     ← EDIT THIS to mark stalls available / sold.
  data.js             ← EDIT THIS to change stall photos & descriptions.
  app.js              The interactive behavior (no need to edit).
  styles.css          The look & feel (no need to edit).
photos/               Stall photos: stall-01.jpg, stall-02.jpg, …
README.md             This file.
```

---

## 3. How to update a stall's photos and description

Everything you'll ever change lives in **`assets/data.js`**. Open it in any plain-text
editor (Notepad, TextEdit, VS Code). Find the stall you want — search for its number.
Each stall looks like this:

```js
{
  "num": 54,
  "label": "54",
  "type": "ada",
  "poly": [...], "lx": 480.6, "ly": 250,     ←  DON'T change these (they place the stall on the map)
  "title": "Stall 54",
  "description": "ADA accessible stall with an adjacent access aisle. Van-accessible. (Sample text…)",
  "photos": ["photos/stall-54.jpg"]
}
```

- **Description:** edit the text inside the quotes after `"description":`.
- **Title:** edit `"title"` if you want a different heading.
- **Photos:** list one or more image paths inside `"photos"`. See below.
- **Status (available / reserved / unavailable):** lives in `assets/availability.js`. See below.

> Only edit the parts in quotes. Keep the commas and brackets as they are. Save the file,
> then refresh the page in your browser to see the change.

### Replacing a photo (simplest way)

Drop your real photo into the `photos/` folder and give it the **same name** the stall
already uses (e.g. `stall-54.jpg`). Done — no editing needed.

### Adding several photos to one stall

Put the extra images in `photos/` and list them all. The panel shows a photo gallery with
arrows and dots:

```js
"photos": [
  "photos/stall-54-front.jpg",
  "photos/stall-54-side.jpg",
  "photos/stall-54-wide.jpg"
]
```

(Stalls 1, 6, 10, 29, 54 and 66 already have two sample photos so you can see the gallery.)

### Marking stalls available / reserved / unavailable  ← the one you'll use most

Open **`assets/availability.js`**. Every stall is one of three statuses:

```js
window.STALL_STATUS = {
  available:   [3, 8, 9, 41, 45, 65, 66, 67, 69],  // open to reserve now (green)
  unavailable: [],                                  // out of service / not offered
  notes: { 3: "Available Aug 1" }                   // optional text on a stall
};
```

- **Available** — in the `available` list → **neon green outline** on the map + "Available"
  badge. This is the list you'll edit most.
- **Reserved** — the default. Any stall you *don't* list is shown as Reserved (already taken).
- **Unavailable** — add a number to `unavailable` for a stall that's out of service; it shows
  greyed out.
- **Notes** — optional. `3: "Available Aug 1"` shows that text on stall 3's panel — handy for
  spaces coming available on a future date.

Day to day you'll mostly just add/remove numbers in `available`:

- Stall gets reserved → remove its number from `available`.
- Stall opens up → add its number to `available`.

Use plain numbers — write `58` (not `58C`), `66` (not `66SC`), `69` (not `69SC`). Keep the
commas, then save. The legend shows a live count for each status and lets you click to see
only those stalls. This file is never overwritten when the rest of the map is updated.

> Coming soon: a private admin screen where you'll click a stall to change its status,
> instead of editing this file.

### Using Google Drive / online image links instead of files

You can point a photo at a web link instead of a local file. Use a **direct image link**
(for Google Drive, a link in the form below works):

```js
"photos": ["https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"]
```

---

## 4. Stall types & colors

Colors come from the plan's legend and are shown in the on-map key:

| Type          | Meaning (from the plan) |
|---------------|--------------------------|
| Standard      | All stalls with no letter |
| Compact (C)   | Compact stalls |
| Sub-Compact (SC) | Sub-compact stalls |
| Premium (P)   | Premium stalls |
| ADA           | Stalls marked with the wheelchair symbol (27, 54, 65) |

A stall's type is set by `"type"` in `data.js` (`standard`, `compact`, `subcompact`,
`premium`, or `ada`). To recolor a type for everyone, change its color in the `"types"`
section at the top of `data.js`.

---

## 5. Good to know

- Works in all modern browsers (Chrome, Safari, Edge, Firefox) on phone, tablet and desktop.
- Automatically follows the device's light or dark mode.
- No build tools, accounts, servers or internet connection required to run it.
- If a photo path is wrong, the panel simply shows a "photo not found" placeholder — the
  rest keeps working.

Questions or changes — just send them over. — Noufel
