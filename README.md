# Ship It Sunday

Jay's 8-week project-first Photoshop learning companion. One real shipped image
per week across real estate, landscape, portraits, sports posters, restoration,
design, and compositing. The source-of-truth plan lives in Jay's Vault →
`Projects/Photoshop - Ship It Sunday/`; this app is the interactive coach.

## Stack

Static HTML/CSS/JS PWA — no frameworks, no build step, nothing to maintain.
Same lane as `part107-study`. State lives in `localStorage` (key `sis-v1`);
Export/Import backup buttons are on the Ship Log tab.

## The motif (write it down or it gets violated)

**The app is a Photoshop Layers panel.** Weeks stack like layers; shipping a
week turns on its visibility eye (👁), exactly like toggling a layer visible.
One accent color: Photoshop blue `#31a8ff`. Dark PS-panel grays only
(`#1e1e1e / #262626 / #323232`). Anything added later must obey the metaphor.

## Features

- **Plan** — 8 week cards: goal, skill chips, step checklists (persisted),
  curated video lessons with thumbnails. "Ship" opens the Publish Bar modal
  (all 3 honesty checks required) → confetti, streak, progress ring.
- **Day One** — guided first-session timer, chess-clock style (Jay's design):
  each stage shows a guide time but the clock counts UP; "Done ✓ — next"
  records actual time and starts the next stage. Recap table (guide vs.
  actual) at the end. No countdown, no fail state — count-up removes the
  start-avoidance that deadline pressure causes.
- **Lesson sequencing** — each week's videos are badged "Watch first" (the
  midweek core lesson) or "When stuck" (Sunday references). Weekly rhythm:
  Mon rep → midweek watch → Sunday do. Week 1 needs zero prep by design.
- **Monday Rep** — 23-skill tracker; skills unlock as weeks ship; the stalest
  skill is suggested as the week's 10-minute rep. Stale = 14+ days unused.
- **Ship Log** — shipped entries with "what fought back" notes; JSON backup.

## Video curation provenance (no fake content rule)

All 26 video URLs were verified against YouTube's oEmbed metadata (exact title
+ channel confirmed) before inclusion — none invented. Sources: PiXimperfect
(backbone), Nathan Cool Photo + Rich Baum + Garey Gomez (real estate),
Sports Photoshop Tutorials + Daniel Cohen (sports design), PHLEARN (portrait),
Photoshop Training Channel, Matt Lydy Tech. Curated Jul 31, 2026.

## Run locally

Preview config `ship-it-sunday` in `~/.claude/launch.json` (port 8644), or:
`python3 -m http.server 8644 --directory ~/code/ship-it-sunday`

## Cache discipline

Service worker is cache-first (`sw.js`). **Every CSS/JS change requires
bumping the `?v=` query in `index.html` AND `sw.js` SHELL list AND the
`CACHE` name in `sw.js`** — currently v5 / `sis-v5`. Skipping this serves
stale files and looks like a haunted bug.

## Deploy (when approved)

GitHub Pages, same as part107-study: repo → Settings → Pages → main branch.
No staging/noindex machinery needed — personal tool, no client gate.
