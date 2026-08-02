/* Ship It Sunday — app logic. Vanilla JS, state in localStorage.
   All strings that reach innerHTML pass through esc() — including user-typed
   notes and imported backups — so nothing can inject markup. */

const LS_KEY = "sis-v1";

const state = load();
function load() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
}
state.checks  = state.checks  || {};   // "w1s0" -> true
state.shipped = state.shipped || {};   // "1" -> {date:"2026-08-02", note:""}
state.skills  = state.skills  || {};   // "masks" -> "2026-08-09" (last used)
function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = v => String(v).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });

function currentWeek() {
  for (const w of WEEKS) if (!state.shipped[w.n]) return w.n;
  return 8;
}
function ytId(url) {
  const m = String(url).match(/[?&]v=([\w-]{6,})/) || String(url).match(/youtu\.be\/([\w-]{6,})/);
  return m ? m[1] : null;
}

/* ---------- tabs ---------- */
$$(".tab").forEach(t => t.addEventListener("click", () => {
  $$(".tab").forEach(x => { x.classList.toggle("active", x === t); x.setAttribute("aria-selected", x === t); });
  $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + t.dataset.view));
  scrollTo(0, 0);
}));

/* ---------- header dashboard ---------- */
function renderDash() {
  const shipped = Object.keys(state.shipped).length;
  $("#ringLabel").textContent = `${shipped}/8`;
  const C = 2 * Math.PI * 19;
  $("#ringFg").style.strokeDashoffset = C * (1 - shipped / 8);

  let streak = 0;
  for (let n = 1; n <= 8; n++) { if (state.shipped[n]) streak++; else break; }
  $("#streakStat").textContent = `🔥 ${streak}-week streak`;

  const days = (7 - new Date().getDay()) % 7; // 0 = today is Sunday
  $("#sundayStat").textContent = days === 0 ? "🚢 It's ship day!" : `Ships in ${days} day${days > 1 ? "s" : ""}`;
}

/* ---------- weeks (Layers panel) ---------- */
function renderWeeks() {
  const cur = currentWeek();
  $("#weeks").innerHTML = WEEKS.map(w => {
    const shipped = state.shipped[w.n];
    const steps = w.steps.map((s, i) => {
      const id = `w${w.n}s${i}`, done = state.checks[id];
      return `<li class="step ${done ? "done" : ""}">
        <input type="checkbox" id="${id}" data-check="${id}" ${done ? "checked" : ""}>
        <label for="${id}">${esc(s)}</label></li>`;
    }).join("");
    const vids = w.videos.length
      ? w.videos.map(v => {
          const id = ytId(v.url);
          if (!id) return "";
          const thumb = `<img class="thumb" loading="lazy" src="https://i.ytimg.com/vi/${esc(id)}/mqdefault.jpg" alt="">`;
          return `<a class="video" href="https://www.youtube.com/watch?v=${esc(id)}" target="_blank" rel="noopener">${thumb}
            <span class="v-meta"><span class="v-badge ${v.core ? "core" : "ref"}">${v.core ? "Watch first" : "When stuck"}</span>
            <span class="v-title">${esc(v.title)}</span>
            <span class="v-sub"><b>${esc(v.channel)}</b> · ${esc(v.covers)}${v.length ? " · " + esc(v.length) : ""}</span></span></a>`;
        }).join("")
      : `<p class="hint">Lessons loading soon.</p>`;
    return `<article class="week ${shipped ? "shipped" : ""} ${w.n === cur ? "current open" : ""}" data-week="${w.n}">
      <button class="week-head" aria-expanded="${w.n === cur}">
        <span class="eye" aria-hidden="true">${shipped ? "👁" : "—"}</span>
        <span class="week-num">W${w.n}</span>
        <span class="week-title">${w.icon} ${esc(w.title)}
          ${shipped ? `<small>Shipped ${fmt(shipped.date)} ✓</small>` : ""}</span>
        <span class="lane">${esc(w.lane)}</span>
        <span class="chev">›</span>
      </button>
      <div class="week-body">
        <p class="ships-line"><b>Ships:</b> ${esc(w.ships)}</p>
        <div class="chips">${w.skills.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        <h4 class="sec">Steps</h4><ol class="steps">${steps}</ol>
        <h4 class="sec">Lessons</h4><div class="videos">${vids}</div>
        <div class="ship-row">
          ${shipped
            ? `<span class="shipped-note">Shipped ${fmt(shipped.date)}${shipped.note ? " — “" + esc(shipped.note) + "”" : ""}</span>`
            : `<button class="btn primary" data-ship="${w.n}">Ship Week ${w.n} →</button>`}
        </div>
      </div>
    </article>`;
  }).join("");

  $$(".week-head").forEach(h => h.addEventListener("click", () => {
    const card = h.closest(".week");
    card.classList.toggle("open");
    h.setAttribute("aria-expanded", card.classList.contains("open"));
  }));
  $$("[data-check]").forEach(c => c.addEventListener("change", () => {
    state.checks[c.dataset.check] = c.checked; save();
    c.closest(".step").classList.toggle("done", c.checked);
  }));
  $$("[data-ship]").forEach(b => b.addEventListener("click", e => {
    e.stopPropagation(); openShipModal(+b.dataset.ship);
  }));
}

/* ---------- publish bar modal ---------- */
let shippingWeek = null;
function openShipModal(n) {
  shippingWeek = n;
  $("#barChecks").innerHTML = PUBLISH_BAR.map((q, i) =>
    `<label class="bar-check"><input type="checkbox" data-bar="${i}"> ${esc(q)}</label>`).join("");
  $("#shipNote").value = "";
  $("#shipConfirm").disabled = true;
  $$("[data-bar]").forEach(c => c.addEventListener("change", () => {
    $("#shipConfirm").disabled = !$$("[data-bar]").every(x => x.checked);
  }));
  $("#shipModal").hidden = false;
  $("#shipModal").querySelector("input").focus();
}
$("#shipCancel").addEventListener("click", () => { $("#shipModal").hidden = true; });
$("#shipModal").addEventListener("click", e => { if (e.target === $("#shipModal")) $("#shipModal").hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") $("#shipModal").hidden = true; });
$("#shipConfirm").addEventListener("click", () => {
  state.shipped[shippingWeek] = { date: todayISO(), note: $("#shipNote").value.trim().slice(0, 300) };
  SKILLS.filter(s => s.learned === shippingWeek).forEach(s => state.skills[s.id] = todayISO());
  save();
  $("#shipModal").hidden = true;
  confetti();
  renderAll();
});

/* ---------- confetti ---------- */
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = $("#confetti"), ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const bits = Array.from({ length: 140 }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * .3,
    r: 3 + Math.random() * 5, vy: 2 + Math.random() * 3.5, vx: -1.5 + Math.random() * 3,
    c: ["#31a8ff", "#3ddc84", "#ffb02e", "#e8e8e8"][Math.random() * 4 | 0], a: Math.random() * Math.PI
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    bits.forEach(b => {
      b.y += b.vy; b.x += b.vx; b.a += .1;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a);
      ctx.fillStyle = b.c; ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r);
      ctx.restore();
    });
    if (++frames < 210) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ---------- Day One timer — chess-clock style ----------
   The guide time is shown as a proportion; the clock only counts UP.
   "Done ✓ — next" is the chess slap: records actual time, advances,
   and keeps the clock running for the next step. No fail state.
   Elapsed time is anchored to WALL CLOCK (state.live.startedAt), not
   interval ticks — backgrounding the tab or leaving for Photoshop
   doesn't stop the clock, and the session survives an app restart. */
let tIdx = 0, tRun = null;
state.dayOne = state.dayOne || [];    // [{secs}] per completed step
state.live = state.live || null;      // {idx, accum, startedAt} — in-flight step

function liveElapsed() {
  if (!state.live) return 0;
  const running = state.live.startedAt ? (Date.now() - state.live.startedAt) / 1000 : 0;
  return Math.max(0, Math.floor(state.live.accum + running));
}

const clock = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function renderTimer() {
  const done = state.dayOne.length >= DAY_ONE_TIMER.length;
  $("#timerRecap").hidden = !done;
  if (done) { stopTimer(); renderRecap(); }
  const st = DAY_ONE_TIMER[Math.min(tIdx, DAY_ONE_TIMER.length - 1)];
  $("#timerStage").textContent = done ? "Done — go ship it 🚀" : st.title;
  $("#timerDetail").textContent = done
    ? "A publishable photo exists. Head to Plan → Week 1 and hit SHIP. Your times below are self-knowledge, not grades."
    : st.detail;
  $("#timerGuide").textContent = done ? "" : `Guide: ~${st.mins} min — a proportion, not a deadline. The clock only counts up (and keeps counting while you're in Photoshop).`;
  $("#timerProgress").textContent = done ? "" : `Step ${tIdx + 1} of ${DAY_ONE_TIMER.length}`;
  $("#timerClock").textContent = clock(liveElapsed());
  $("#timerFill").style.width = done ? "100%" : Math.min(100, 100 * liveElapsed() / (st.mins * 60)) + "%";
  $("#timerList").innerHTML = done ? "" : DAY_ONE_TIMER.map((s, i) => {
    const rec = state.dayOne[i];
    return `<li class="${i < tIdx ? "past" : i === tIdx ? "now" : ""}">
      <span class="t-mins">~${s.mins}m</span><span class="t-name">${esc(s.title)}</span>
      ${rec ? `<span class="t-actual">${clock(rec.secs)}</span>` : ""}</li>`;
  }).join("");
}

function renderRecap() {
  const total = state.dayOne.reduce((a, r) => a + r.secs, 0);
  $("#timerRecap").innerHTML = `<h4 class="sec">Guide vs. you</h4>
    <table class="recap-table"><tbody>
    ${DAY_ONE_TIMER.map((s, i) => `<tr><td>${esc(s.title)}</td>
      <td>~${s.mins}m</td><td>${state.dayOne[i] ? clock(state.dayOne[i].secs) : "—"}</td></tr>`).join("")}
    <tr class="recap-total"><td>Whole session</td><td>~60m</td><td>${clock(total)}</td></tr>
    </tbody></table>
    <button class="btn ghost" id="timerReset">Reset session</button>`;
  $("#timerReset").addEventListener("click", () => {
    state.dayOne = []; state.live = null; save();
    tIdx = 0; clearInterval(tRun); tRun = null;
    $("#timerToggle").textContent = "Start";
    renderTimer();
  });
}

function tickTimer() {
  $("#timerClock").textContent = clock(liveElapsed());
  const st = DAY_ONE_TIMER[tIdx];
  if (st) $("#timerFill").style.width = Math.min(100, 100 * liveElapsed() / (st.mins * 60)) + "%";
}
function startTimer() {
  if (!state.live) state.live = { idx: tIdx, accum: 0, startedAt: Date.now() };
  else if (!state.live.startedAt) state.live.startedAt = Date.now();
  save();
  if (!tRun) tRun = setInterval(tickTimer, 1000);
  $("#timerToggle").textContent = "Pause";
}
function stopTimer() {
  if (state.live && state.live.startedAt) {
    state.live.accum = liveElapsed();
    state.live.startedAt = null;
    save();
  }
  clearInterval(tRun); tRun = null;
  $("#timerToggle").textContent = "Start";
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) tickTimer();   // catch up instantly on return from Photoshop
});

$("#timerToggle").addEventListener("click", () => {
  (state.live && state.live.startedAt) ? stopTimer() : startTimer();
});

$("#timerDone").addEventListener("click", () => {
  if (state.dayOne.length >= DAY_ONE_TIMER.length) return;
  state.dayOne[tIdx] = { secs: liveElapsed() };
  if (tIdx < DAY_ONE_TIMER.length - 1) {
    tIdx++;
    state.live = { idx: tIdx, accum: 0, startedAt: Date.now() };  // the chess slap: next clock starts immediately
    save();
    if (!tRun) tRun = setInterval(tickTimer, 1000);
    $("#timerToggle").textContent = "Pause";
  } else {
    tIdx = DAY_ONE_TIMER.length;
    state.live = null; save();
    clearInterval(tRun); tRun = null;
    $("#timerToggle").textContent = "Start";
  }
  renderTimer();
});

$("#timerPrev").addEventListener("click", () => {
  if (state.dayOne.length >= DAY_ONE_TIMER.length) return;
  if (tIdx > 0) {
    tIdx--;
    state.live = { idx: tIdx, accum: state.dayOne[tIdx] ? state.dayOne[tIdx].secs : 0, startedAt: null };
    state.dayOne.splice(tIdx);   // redoing a step clears it and everything after
    save(); stopTimer(); renderTimer();
  }
});

/* ---------- Monday Rep ---------- */
function renderRep() {
  const cur = currentWeek();
  const unlocked = SKILLS.filter(s => s.learned < cur || state.shipped[s.learned]);
  let stale = null;
  for (const s of unlocked) {
    const last = state.skills[s.id] || "0000-00-00";
    if (!stale || last < (state.skills[stale.id] || "0000-00-00")) stale = s;
  }
  $("#repSuggest").innerHTML = unlocked.length
    ? `🏋️ <b>This Monday's rep:</b> ${esc(stale.name)}${state.skills[stale.id] ? ` — last used ${fmt(state.skills[stale.id])}` : " — never repped since learning it"}. Ten minutes on a fresh photo before new work.`
    : `🏋️ <b>Monday Rep unlocks after Week 1 ships.</b> Learn it once, then keep it current.`;
  $("#skillList").innerHTML = SKILLS.map(s => {
    const isUnlocked = unlocked.includes(s);
    const last = state.skills[s.id];
    const staleDays = last ? Math.floor((Date.now() - new Date(last)) / 864e5) : null;
    return `<button class="skill ${isUnlocked ? "" : "locked"} ${staleDays !== null && staleDays > 13 ? "stale" : ""}"
      data-skill="${esc(s.id)}" ${isUnlocked ? "" : "disabled"}>
      <span class="s-week">W${s.learned}</span>
      <span class="s-name">${esc(s.name)}</span>
      <span class="s-last">${!isUnlocked ? "🔒" : last ? "used " + fmt(last) : "not yet repped"}</span>
    </button>`;
  }).join("");
  $$("[data-skill]").forEach(b => b.addEventListener("click", () => {
    state.skills[b.dataset.skill] = todayISO(); save(); renderRep();
  }));
}

/* ---------- Ship Log ---------- */
function renderLog() {
  const entries = Object.entries(state.shipped).sort((a, b) => a[0] - b[0]);
  $("#logList").innerHTML = entries.length
    ? entries.map(([n, e]) => {
        const w = WEEKS[n - 1];
        return `<div class="log-entry">
          <h4>${w.icon} Week ${esc(n)} — ${esc(w.title)} <span class="l-date">· ${fmt(e.date)}</span></h4>
          ${e.note ? `<p>“${esc(e.note)}”</p>` : ""}</div>`;
      }).join("")
    : `<div class="log-empty">Nothing shipped yet. Week 1 is one Sunday away. 🚢</div>`;
}

/* ---------- backup ---------- */
$("#exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(blob), download: `ship-it-sunday-backup-${todayISO()}.json`
  });
  a.click(); URL.revokeObjectURL(a.href);
});
$("#importFile").addEventListener("change", async e => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (typeof data !== "object" || !data || (!data.checks && !data.shipped)) throw 0;
    Object.assign(state, data); save(); renderAll();
    alert("Backup restored ✓");
  } catch { alert("That file doesn't look like a Ship It Sunday backup."); }
  e.target.value = "";
});
$("#resetBtn").addEventListener("click", () => {
  if (confirm("Wipe ALL progress on this device? Export a backup first if unsure.")) {
    localStorage.removeItem(LS_KEY); location.reload();
  }
});

/* ---------- boot ---------- */
function renderAll() { renderDash(); renderWeeks(); renderRep(); renderLog(); }
tIdx = Math.min(state.dayOne.length, DAY_ONE_TIMER.length - 1);
if (state.dayOne.length >= DAY_ONE_TIMER.length) tIdx = DAY_ONE_TIMER.length;
if (state.live && state.live.idx != null && state.dayOne.length < DAY_ONE_TIMER.length) {
  tIdx = Math.min(state.live.idx, DAY_ONE_TIMER.length - 1);
  if (state.live.startedAt) {          // was running when the app closed — resume
    tRun = setInterval(tickTimer, 1000);
  }
}
renderAll(); renderTimer();
if (tRun) $("#timerToggle").textContent = "Pause";

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
