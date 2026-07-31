/* Ship It Sunday — content data.
   Weeks, steps, and skills mirror the plan in Jay's Vault
   (Projects/Photoshop - Ship It Sunday/). Every video URL below was
   verified against YouTube's oEmbed metadata (title + channel) before
   inclusion — no invented links. PiXimperfect backbone + real-estate
   (Nathan Cool, Rich Baum, Garey Gomez) + sports design specialists.
   Videos with core:true are the week's "watch first" lesson; the rest
   are open-when-stuck references. Timer minutes are GUIDES (proportions),
   not deadlines — the clock counts up, chess-clock style. */

const PUBLISH_BAR = [
  "Would G&J publish this?",
  "Would I print it?",
  "Would I post it?"
];

const DAY_ONE_TIMER = [
  { mins: 5,  title: "Pick your photo",      detail: "One real, flawed exterior or drone shot from a G&J shoot. Open it. Ignore 95% of the interface on purpose." },
  { mins: 7,  title: "The crash demo",       detail: "On a throwaway COPY: Image → Adjustments → Black & White. Save, close, reopen. The color is gone forever — that's a destructive edit. Everything from here on is reversible." },
  { mins: 8,  title: "Safety copy + Camera Raw", detail: "Back on the real photo: Cmd+J to duplicate the layer. Filter → Camera Raw Filter → Geometry → Upright → Auto — the building stops leaning. Nudge Exposure + Shadows until it looks like the day you shot it." },
  { mins: 15, title: "Remove the power lines", detail: "Remove Tool: brush along each line and watch it vanish. Miss? Cmd+Z is free. This is the real skill work — it's supposed to take a while." },
  { mins: 10, title: "Crop & straighten",     detail: "Crop tool: straighten, trim the edges the lean-fix distorted." },
  { mins: 10, title: "Export & compare",      detail: "File → Export → Export As → JPEG, web-sized. Put original and finished side by side. Feel that." },
  { mins: 5,  title: "Save & log it",         detail: "Save the layered .PSD. Mark Week 1 steps done in the Plan tab, then hit SHIP. A publishable photo exists." }
];

const WEEKS = [
  {
    n: 1, lane: "Real Estate", icon: "🏠",
    title: "Rescue a real listing shot",
    ships: "A publishable exterior — lean fixed, power lines gone, properly exposed.",
    skills: ["Camera Raw basics", "Remove Tool", "Crop & straighten", "Export As", "Layers & safety duplicate"],
    steps: [
      "No prep needed — the Day One tab walks you through this cold",
      "Pick one real, flawed exterior or drone shot from a G&J shoot",
      "Run the crash demo on a throwaway copy",
      "Cmd+J safety duplicate — never touch the original",
      "Camera Raw Filter → Geometry → Upright → Auto to fix the lean",
      "Camera Raw: Exposure + Shadows until it looks like the day you shot it",
      "Remove Tool: erase power lines and clutter",
      "Crop, straighten, trim distorted edges",
      "Export As → JPEG web-sized; compare before/after side by side",
      "After shipping: watch the 30-min masterclass to backfill what you just did"
    ],
    videos: [
      { core: true, title: "Photoshop for Beginners: 30-Minute Masterclass!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=mfJeFDrboKI", length: "26 min", covers: "Start-here tour of the interface and core tools" },
      { title: "Intro to Camera Raw - Photoshop for Beginners | Lesson 11", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=YXCHi0Uo2Ew", length: "32 min", covers: "Camera Raw basics for correcting and enhancing photos" },
      { title: "How To Edit High-End Exterior Real Estate Photos", channel: "Nathan Cool Photo", url: "https://www.youtube.com/watch?v=BYRroww8Fr4", covers: "Full exterior listing edit — exposure and color" },
      { title: "Correcting Verticals and Perspective for Real Estate Photography", channel: "Garey Gomez", url: "https://www.youtube.com/watch?v=x8bm7y0nejs", covers: "Fixing leaning verticals and perspective distortion" },
      { title: "How To Remove Power Lines From Photos In Photoshop", channel: "Photoshop Training Channel", url: "https://www.youtube.com/watch?v=UGsfwWruT1s", covers: "Removing power lines cleanly" }
    ]
  },
  {
    n: 2, lane: "Landscape", icon: "🌄",
    title: "Landscape with drama",
    ships: "A print-worthy landscape or drone shot with a new sky and guided light. Invite Jack.",
    skills: ["Sky Replacement", "Layer masks", "Adjustment layers (Curves)", "Camera Raw gradients + Dehaze"],
    steps: [
      "Monday Rep first: last week's core move on a fresh photo (10 min)",
      "Midweek: watch the 'Watch first' lessons below — just watch, Sunday is for doing",
      "Sunday: pick a flat landscape or drone shot with potential",
      "Edit → Sky Replacement: audition skies, watch the automatic masking",
      "Alt-click the sky mask to inspect it — see what a mask actually is",
      "Add a Curves adjustment layer; shape the light",
      "Camera Raw: linear gradient mask on the foreground + Dehaze",
      "Paint on masks to guide the eye where you want it",
      "Export print-size AND web-size; note the difference"
    ],
    videos: [
      { core: true, title: "Layer Mask - Photoshop for Beginners | Lesson 4", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=aNpO6G72O3w", length: "29 min", covers: "Masks — the concept the whole plan runs on" },
      { core: true, title: "Photoshop's NEW Sky Replacement Update!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=IUAKxBSYNOM", covers: "Sky Replacement with realistic blending tips" },
      { title: "Sky Swaps for Real Estate 2022", channel: "Nathan Cool Photo", url: "https://www.youtube.com/watch?v=cOiEAX1eASk", covers: "Listing-grade sky replacement workflow" },
      { title: "Real Estate Drone Photography: Full Editing Workflow (Lightroom & Photoshop)", channel: "Matt Lydy Tech", url: "https://www.youtube.com/watch?v=cxjHP3G7qUI", covers: "Complete aerial/drone photo edit" }
    ]
  },
  {
    n: 3, lane: "Portrait", icon: "🙂",
    title: "Portrait polish",
    ships: "A naturally retouched portrait — family or a G&J client shot.",
    skills: ["Healing Brush / skin retouch", "Select People masking", "Dodge & burn"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: pick a real portrait; safety duplicate; zoom to 100% — retouching is judged at 100%",
      "Remove Tool / Spot Healing on temporary blemishes ONLY — keep what makes the face theirs",
      "Camera Raw → Masking → Select People: watch it auto-mask skin, eyes, hair",
      "Brighten eyes subtly; whiten teeth even more subtly",
      "Dodge & burn on a soft gray layer to shape the face",
      "Tidy or blur the background",
      "Step away 10 minutes, come back, dial everything back 20%"
    ],
    videos: [
      { core: true, title: "Skin Retouching Basics in Photoshop", channel: "PHLEARN", url: "https://www.youtube.com/watch?v=FtGJ38Kem9I", covers: "Natural blemish removal fundamentals" },
      { title: "The 3 Steps to High-End Skin Retouching in Photoshop!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=jSzDlc6SvP4", covers: "Retouching that preserves real skin texture" },
      { title: "Master Dodging and Burning in 32 Minutes | Photoshop In-Depth Tutorial", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=gmxj0X-0UvA", length: "32 min", covers: "Sculpting light on a face, start to finish" }
    ]
  },
  {
    n: 4, lane: "Sports", icon: "🏈",
    title: "Sports spotlight poster",
    ships: "A dramatic athlete poster — Jack mid-swing at Goodrich is the obvious subject.",
    skills: ["Select Subject + Select and Mask", "Blend modes", "Type tool + layer styles"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: pick the athlete shot; Select Subject, refine edges in Select and Mask (hair is the test)",
      "Drop the cutout onto a gritty, dramatic background",
      "Match the light: shadows under the athlete, rim light if the background implies it",
      "Experiment with blend modes on texture layers",
      "Bold type: name + number + year; layer styles for punch",
      "Squint test: does it read from across the room?",
      "Export a print size and a phone-wallpaper size"
    ],
    videos: [
      { core: true, title: "Sports Poster Design Tutorial - Adobe Photoshop 2022 (7 Steps)", channel: "Sports Photoshop Tutorials", url: "https://www.youtube.com/watch?v=hfCJ4OCZvK8", covers: "Seven-step athlete poster build, cutout to type" },
      { title: "Clean Professional Sports Poster | Step-by-Step Photoshop Tutorial", channel: "Daniel Cohen", url: "https://www.youtube.com/watch?v=o3UnHejqvx4", covers: "Pro-level poster layout and bold typography" },
      { title: "Photoshop Tutorial | Sports Graphic Design | How To Create a Sport Poster Design in Photoshop (2023)", channel: "Sports Photoshop Tutorials", url: "https://www.youtube.com/watch?v=svdXDysotcc", covers: "Dramatic background treatment for sport posters" },
      { title: "Master Hair Selection - Best Technique for Every Situation", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=ek6ip2_GdYQ", covers: "Select and Mask hair-edge cutouts that don't smear" },
      { title: "Blending Modes - Photoshop for Beginners | Lesson 5", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=doI1eH_nCxs", covers: "Blend modes explained for compositing and texture" }
    ]
  },
  {
    n: 5, lane: "Restoration", icon: "🖼️",
    title: "Restore an old family photo",
    ships: "A restored family print — scratches gone, contrast back, optionally colorized. Print it for Marie.",
    skills: ["Clone Stamp", "Neural Filters (Restore/Colorize)", "Levels"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: scan or photograph the old print (even, soft light); safety duplicate; assess at 100%",
      "Neural Filters → Photo Restoration for the first pass",
      "Healing Brush for scratches on texture; Clone Stamp where structure must be rebuilt",
      "Levels: bring back the blacks and whites the decades faded",
      "Optional: Neural Filters → Colorize, then hand-correct its guesses",
      "Compare against the untouched scan — honor the photo, don't plastic it",
      "Export print-ready; actually print it"
    ],
    videos: [
      { core: true, title: "NEW Photo Restoration Filter in Photoshop!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=K1xrOPKjPrA", covers: "Neural Filters restoration for old damaged photos" },
      { title: "Photo Restoration: The Only AI That Actually Works!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=knYusnpB9zI", covers: "AI restoration workflow for family photo repair" }
    ]
  },
  {
    n: 6, lane: "Design", icon: "🎨",
    title: "Design week: a real social/web graphic",
    ships: "One graphic G&J or Grass & Port will actually post.",
    skills: ["Smart Objects", "Shapes & artboards", "Export As (JPEG/WebP)"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: pick the real deliverable (promo, announcement, banner)",
      "New doc from an artboard preset; add a second artboard for the other size (post + story)",
      "Place photos as Smart Objects — scale them down and back up; nothing degrades",
      "Shapes + layer styles for structure; keep to two fonts max",
      "Type hierarchy: one big thing, one medium thing, small everything else",
      "Export As: compare WebP vs JPEG at the same quality setting",
      "Post it (or hand it to the business account) — that's the ship"
    ],
    videos: [
      { core: true, title: "The COMPLETE Guide to Smart Objects in Photoshop", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=3YkIzg2CUFQ", covers: "Smart Objects for scalable, non-destructive design" }
    ]
  },
  {
    n: 7, lane: "Composite", icon: "🪄",
    title: "Creative composite",
    ships: "One image that never happened — drone backdrop + subject, surreal or promotional.",
    skills: ["Generative Fill / Expand", "Match Color", "Advanced masking"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: choose 2+ of your own photos to combine; rough comp first — placement before polish",
      "Cut subjects with Select Subject; refine masks by hand",
      "Match Color to pull the pieces into one palette",
      "Light logic: one sun — shadows and highlights must agree",
      "Generative Fill for gaps; Generative Expand if the canvas needs room",
      "Grain/blur unifying pass on top so everything feels shot together",
      "Bonus drill fuel: fix a Staging Studio output's AI artifacts with the same tools"
    ],
    videos: [
      { core: true, title: "Photoshop Generative Fill - 20 EPIC Uses, SUPERFAST!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=NvUZIm083P8", covers: "Generative Fill and Expand, practical compositing uses" },
      { title: "5 Guaranteed Tricks to Match Subject & Background! - Photoshop Tutorial", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=x5TbF8Tb9U0", covers: "Matching light and color so composites feel real" }
    ]
  },
  {
    n: 8, lane: "Capstone", icon: "🏁",
    title: "Capstone + pipeline",
    ships: "A batch Action that processes a whole shoot, the Week 1 rematch, and a 3-image mini-portfolio.",
    skills: ["Actions + Image Processor (batch)"],
    steps: [
      "Monday Rep (10 min)",
      "Midweek: watch the 'Watch first' lesson below — just watch, Sunday is for doing",
      "Sunday: record an Action: straighten → color-correct → watermark → resize",
      "Run it on a full shoot via File → Scripts → Image Processor",
      "Spot-check 5 results at 100% — batch trust is earned",
      "Bonus RE skill: learn the window pull for interior shots (video below)",
      "THE REMATCH: re-edit the Week 1 photo from scratch, no peeking",
      "Put attempt 1 and attempt 2 side by side. That gap is the whole story",
      "Pick your best 3 images across the 8 weeks as a mini-portfolio",
      "Update the vault Ship Log, then decide what's next: deeper into one lane, or the UXP victory-lap project"
    ],
    videos: [
      { core: true, title: "Everything AUTOMATIC in Photoshop + FREE ACTIONS!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=GpO29wJ0e0g", covers: "Actions and automation for batch processing" },
      { title: "Flawless 1-Min Skin Retouch Action in Photoshop!", channel: "PiXimperfect", url: "https://www.youtube.com/watch?v=0q_GxbuEr_M", covers: "Recording your own reusable action, step by step" },
      { title: "Real Estate Photography \"Full Edit\" Tutorial. Start to finish.", channel: "Rich Baum", url: "https://www.youtube.com/watch?v=ISgIsDnAmKQ", covers: "Editing an entire real-estate shoot start to finish" },
      { title: "Easy Window Pulls for Real Estate Photography", channel: "Nathan Cool Photo", url: "https://www.youtube.com/watch?v=iHC2AHEGCJ4", covers: "Window pull — interiors where the view still reads" }
    ]
  }
];

/* Skills tracker — powers the Monday Rep. learned = week number. */
const SKILLS = [
  { id: "camera-raw",     name: "Camera Raw basics (Upright, Exposure, Shadows)", learned: 1 },
  { id: "remove-tool",    name: "Remove Tool", learned: 1 },
  { id: "crop",           name: "Crop & straighten", learned: 1 },
  { id: "export",         name: "Export As (JPEG/WebP)", learned: 1 },
  { id: "layers",         name: "Layers & safety duplicate", learned: 1 },
  { id: "sky",            name: "Sky Replacement", learned: 2 },
  { id: "masks",          name: "Layer masks", learned: 2 },
  { id: "curves",         name: "Adjustment layers (Curves)", learned: 2 },
  { id: "cr-masking",     name: "Camera Raw gradient masks + Dehaze", learned: 2 },
  { id: "healing",        name: "Healing Brush / skin retouch", learned: 3 },
  { id: "select-people",  name: "Select People masking", learned: 3 },
  { id: "dodge-burn",     name: "Dodge & burn", learned: 3 },
  { id: "select-subject", name: "Select Subject + Select and Mask", learned: 4 },
  { id: "blend-modes",    name: "Blend modes", learned: 4 },
  { id: "type",           name: "Type tool + layer styles", learned: 4 },
  { id: "clone",          name: "Clone Stamp", learned: 5 },
  { id: "neural",         name: "Neural Filters (Restore / Colorize)", learned: 5 },
  { id: "levels",         name: "Levels", learned: 5 },
  { id: "smart-objects",  name: "Smart Objects", learned: 6 },
  { id: "artboards",      name: "Shapes & artboards", learned: 6 },
  { id: "gen-fill",       name: "Generative Fill / Expand", learned: 7 },
  { id: "match-color",    name: "Match Color", learned: 7 },
  { id: "actions",        name: "Actions + Image Processor (batch)", learned: 8 }
];
