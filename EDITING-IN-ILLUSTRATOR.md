# Editing the map in Illustrator (round-trip workflow)

You can adjust the map visually in Illustrator and I'll pull your changes back into the
interactive app. Here's how to keep it reliable.

## The file is organized into layers

`garage-map.svg` is grouped so you can work on one part at a time (lock the rest):

- **stalls** — the 69 colored parking stalls (`stall-1` … `stall-69`)
- **rooms** — Electrical Rm, Fire Riser, Stair & Elev, Trash, Elec Rm, Sprinkler, etc.
- **feature-labels** — P1010 / P1011 / P1012 door tags and HW markers
- **entrance-arrows** — the in/out arrows at the top opening
- **elevator**, **streets**, **footprint**

Every shape has a stable **ID/Name** (e.g. `stall-54`, `room-fire-riser`). That's how I
re-match your edits, so please don't delete a shape and redraw it — **move or resize the
existing one** instead. Moving/resizing/nudging is all fine.

## Steps

1. Open `garage-map.svg` in Illustrator.
2. Edit freely — drag rooms, resize boxes, nudge stalls. (Don't resize the artboard/canvas;
   that keeps the coordinates aligned.) You don't have to move the text labels — I re-center
   those automatically.
3. Export with these settings (this is the important part):
   - **File → Export → Export As… → SVG** (or Save As → SVG)
   - **Styling:** Presentation Attributes
   - **Object IDs:** Layer Names   ← keeps the `stall-54` / `room-…` names
   - **Decimal:** 2 or 3
   - **Minify:** off · **Responsive:** off
4. Save it into this folder — overwrite `garage-map.svg`, or name it
   `garage-map-edited.svg` if you'd rather keep the original.
5. Tell me it's ready. I'll read the new positions, update the interactive app to match,
   and re-check it on desktop and mobile.

## What I can bring back automatically

- New **positions and sizes** of any stall or room ✅
- The overall **shape/footprint** if you reshape it ✅

## Just leave me a quick note if you…

- **Add** a brand-new room, or **delete** one
- **Recolor** stalls and want that reflected in the app's type colors too
- **Rename** anything

That's it — edit, export, send it over.
