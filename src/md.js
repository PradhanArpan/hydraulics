// Markdown + KaTeX renderer with course extensions.
// Globals `marked` and `katex` are loaded from assets/vendor.
/* global marked, katex */

let n = 0;
const key = () => "XQPH" + n++ + "QX";
export const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function math(tex, display) {
  try { return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore" }); }
  catch (e) { return "<code>" + esc(tex) + "</code>"; }
}

export function inline(s) {
  const store = {};
  s = String(s).replace(/\$([^$\n]+?)\$/g, (m, t) => { const k = key(); store[k] = math(t, false); return k; });
  let h = marked.parseInline(s);
  for (const k in store) h = h.split(k).join(store[k]);
  return h;
}

function quizHtml(json) {
  let items;
  try { items = JSON.parse(json); } catch (e) { return '<div class="callout warn">Quiz JSON error: ' + esc(e.message) + "</div>"; }
  const id = "qz" + n++;
  let h = '<div class="quiz" id="' + id + '">';
  items.forEach((it, i) => {
    h += '<div class="qitem" data-ans="' + it.answer + '"><div class="qq">' + (i + 1) + ". " + inline(it.q) + "</div>";
    it.options.forEach((o, j) => { h += '<label><input type="radio" name="' + id + "_" + i + '" value="' + j + '"> <span>' + inline(o) + "</span></label>"; });
    h += '<div class="why" hidden>' + inline(it.why || "") + "</div></div>";
  });
  return h + '<p class="qscore" aria-live="polite"></p></div>';
}

function checkHtml(json) {
  let items;
  try { items = JSON.parse(json); } catch (e) { return '<div class="callout warn">Check JSON error: ' + esc(e.message) + "</div>"; }
  if (!Array.isArray(items)) items = [items];
  return items.map(it => '<div class="chk" data-a="' + it.answer + '" data-tol="' + (it.tol == null ? 0.02 : it.tol) + '">' +
    '<div class="cq">✎ ' + inline(it.q) + '</div><div class="row"><input type="text" inputmode="decimal" placeholder="your answer"> <span>' + esc(it.unit || "") + '</span> ' +
    '<button class="btn">Check</button>' + (it.hint ? ' <button class="btn ghost" data-k="hint">Hint</button>' : "") + (it.solution ? ' <button class="btn ghost" data-k="solx">Show working</button>' : "") + '</div>' +
    '<div class="fb" hidden></div>' + (it.hint ? '<div class="hint" hidden>' + inline(it.hint) + '</div>' : "") + (it.solution ? '<div class="solx" hidden>' + inline(it.solution) + '</div>' : "") + '</div>').join("");
}

/* ---- Lesson Flow v2 blocks: plain "key: value" text, no JSON, so backslashes in TeX need no escaping ---- */
function kv(text) {
  const o = {};
  String(text).split("\n").forEach(l => {
    const m = l.match(/^(\w+):\s*(.*)$/);
    if (m) (o[m[1]] = o[m[1]] || []).push(m[2].trim());
  });
  return o;
}
const first = (o, k) => (o[k] && o[k][0]) || "";
const safeSrc = s => (/^(https?:\/\/|media\/|\.\/)/.test(s) ? s : "");

// ```steps  — a derivation revealed one step at a time. Each step: say / eq (TeX) / why. Steps separated by a line of ---
function stepsHtml(body) {
  const steps = body.split(/\n-{3,}\n/).map(kv).filter(s => s.say || s.eq);
  if (!steps.length) return '<div class="callout warn">Steps block is empty.</div>';
  let h = '<div class="dsteps" data-n="' + steps.length + '"><ol class="dsteps__list">';
  steps.forEach((s, i) => {
    h += '<li class="dstep"' + (i ? " hidden" : "") + '><div class="dstep__say">' + inline(first(s, "say")) + "</div>" +
      (s.eq ? '<div class="dstep__eq">' + s.eq.map(e => math(e, true)).join("") + "</div>" : "") +
      (s.why ? '<div class="dstep__why"><b>Why:</b> ' + inline(first(s, "why")) + "</div>" : "") + "</li>";
  });
  return h + '</ol><div class="dsteps__ctl"><button type="button" class="btn" data-k="next"></button> <button type="button" class="btn ghost" data-k="all">Show all steps</button></div></div>';
}

// ```predict — commit to an answer first, then see why. Fields: q, o (repeat), a (1-based right option), why
function predictHtml(body) {
  const o = kv(body), opts = o.o || [];
  if (!first(o, "q") || opts.length < 2) return '<div class="callout warn">Predict block needs q: and at least two o: lines.</div>';
  let h = '<div class="predict" data-a="' + (+first(o, "a") - 1) + '"><div class="predict__tag">Predict first</div><div class="predict__q">' + inline(first(o, "q")) + '</div><div class="predict__opts">';
  opts.forEach((t, i) => { h += '<button type="button" class="predict__opt" data-i="' + i + '">' + inline(t) + "</button>"; });
  return h + '</div><div class="predict__why" hidden aria-live="polite"><b></b> ' + inline(first(o, "why")) + "</div></div>";
}

// ```clip — real flow footage. kind: youtube | mp4 | link; src; start/end (s); tag: real | simulation | schematic;
// caption; notice (separate points with ;); credit; creditUrl
function clipHtml(body) {
  const o = kv(body), kind = first(o, "kind"), src = first(o, "src");
  if (!safeSrc(src)) return '<div class="callout warn">Clip needs a src that starts with https:// or media/.</div>';
  const start = +first(o, "start") || 0, end = +first(o, "end") || 0;
  let media = "";
  if (kind === "youtube") {
    const id = (src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
    if (!id) return '<div class="callout warn">Could not read the YouTube id from ' + esc(src) + "</div>";
    media = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + "?rel=0" + (start ? "&start=" + start : "") + (end ? "&end=" + end : "") +
      '" title="' + esc(first(o, "caption")) + '" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
  } else if (kind === "mp4") {
    media = '<video controls preload="metadata" playsinline src="' + esc(src) + (start || end ? "#t=" + start + (end ? "," + end : "") : "") + '"></video>';
  } else {
    media = '<a class="clip__link" href="' + esc(src) + '" target="_blank" rel="noopener">Watch the video ↗</a>';
  }
  const tag = first(o, "tag") || "real";
  const notice = (first(o, "notice") ? first(o, "notice").split(";").map(s => s.trim()).filter(Boolean) : []);
  const credit = first(o, "credit");
  const cu = safeSrc(first(o, "creditUrl"));
  return '<figure class="clip"><div class="clip__media">' + media + '</div><figcaption><span class="clip__tag clip__tag--' + esc(tag) + '">' + esc(tag) + "</span> " + inline(first(o, "caption")) +
    (notice.length ? '<ul class="clip__notice"><li class="clip__nt">What to notice</li>' + notice.map(n => "<li>" + inline(n) + "</li>").join("") + "</ul>" : "") +
    (credit ? '<div class="clip__credit">Source: ' + (cu ? '<a href="' + esc(cu) + '" target="_blank" rel="noopener">' + esc(credit) + " ↗</a>" : esc(credit)) + "</div>" : "") + "</figcaption></figure>";
}

export function renderMd(src) {
  src = String(src).replace(/\r\n?/g, "\n");
  const store = {};
  const put = html => { const k = key(); store[k] = html; return "\n\n" + k + "\n\n"; };
  src = src.replace(/```steps\s*\n([\s\S]*?)\n```/g, (m, b) => put(stepsHtml(b)));
  src = src.replace(/```predict\s*\n([\s\S]*?)\n```/g, (m, b) => put(predictHtml(b)));
  src = src.replace(/```clip\s*\n([\s\S]*?)\n```/g, (m, b) => put(clipHtml(b)));
  src = src.replace(/```quiz\s*\n([\s\S]*?)\n```/g, (m, j) => put(quizHtml(j)));
  src = src.replace(/```check\s*\n([\s\S]*?)\n```/g, (m, j) => put(checkHtml(j)));
  src = src.replace(/```[\s\S]*?```/g, m => put(marked.parse(m)));
  src = src.replace(/^::widget\[([\w-]+)\]\s*$/gm, (m, w) => put('<div class="wg-mount" data-w="' + w + '"></div>'));
  src = src.replace(/^:::(\w+)[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm, (m, type, title, body) => {
    const inner = renderMd(body);
    if (type === "sol") return put('<details class="sol"><summary>' + inline(title || "Show solution") + "</summary>" + inner + "</details>");
    if (type === "gallery" || type === "photos") return put('<div class="gallery' + (type === "photos" ? " photos" : "") + '">' + inner.replace(/<\/?p>/g, "") + "</div>");
    return put('<div class="callout ' + type + '"><span class="ct">' + inline(title || type) + "</span>" + inner + "</div>");
  });
  src = src.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => put(math(t, true)).trim());
  src = src.replace(/(^|[^\\$])\$([^\s$](?:[^$\n]*?))\$(?!\d)/g, (m, pre, t) => { const k = key(); store[k] = math(t.trim(), false); return pre + k; });
  let html = marked.parse(src, { mangle: false, headerIds: false });
  for (let pass = 0; pass < 5; pass++) {
    let changed = false;
    for (const k in store) if (html.indexOf(k) >= 0) { html = html.split("<p>" + k + "</p>").join(store[k]).split(k).join(store[k]); changed = true; }
    if (!changed) break;
  }
  return html;
}

// DOM post-processing after the HTML is inserted.
export function enhance(root) {
  root.querySelectorAll("blockquote").forEach(bq => {
    const p = bq.querySelector("p"); if (!p) return;
    const m = p.innerHTML.match(/^\[!(\w+)\]\s*([^<\n]*)/); if (!m) return;
    const div = document.createElement("div");
    div.className = "callout " + m[1].toLowerCase() + (/^\s*key ideas\s*$/i.test(m[2] || "") ? " keyideas" : "");
    p.innerHTML = p.innerHTML.replace(m[0], "").replace(/^\s*<br>/, "");
    div.innerHTML = '<span class="ct">' + esc(m[2] || m[1]) + "</span>" + bq.innerHTML;
    bq.replaceWith(div);
  });
  // lone images -> figures with captions (alt text; " — " splits caption and source).
  // An image title that is a URL (e.g. a Wikimedia Commons file page) turns the source into a credit link.
  const credit = (img, src) => {
    const t = img.getAttribute("title") || "";
    if (/^https?:/.test(t)) return ' <a class="src" href="' + esc(t) + '" target="_blank" rel="noopener">' + esc(src || "Source") + " ↗</a>";
    return src ? ' <span class="src">' + esc(src) + "</span>" : "";
  };
  root.querySelectorAll("p > img:only-child").forEach(img => {
    const p = img.parentElement; if (p.textContent.trim()) return;
    const fig = document.createElement("figure");
    const [cap, src] = (img.alt || "").split(" — ");
    fig.appendChild(img.cloneNode());
    if (cap) { const fc = document.createElement("figcaption"); fc.innerHTML = esc(cap) + credit(img, src); fig.appendChild(fc); }
    p.replaceWith(fig);
  });
  root.querySelectorAll(".gallery > img").forEach(img => {
    const fig = document.createElement("figure"); fig.appendChild(img.cloneNode());
    const [cap, src] = (img.alt || "").split(" — ");
    const fc = document.createElement("figcaption"); fc.innerHTML = esc(cap || "") + credit(img, src); fig.appendChild(fc);
    img.replaceWith(fig);
  });
  // external photos: if one cannot load, show a link to it instead of a broken image
  root.querySelectorAll('img[src^="http"]').forEach(i => {
    i.referrerPolicy = "no-referrer";
    i.addEventListener("error", () => {
      const t = i.getAttribute("title") || i.getAttribute("src");
      const d = document.createElement("div"); d.className = "img-missing";
      d.innerHTML = 'Photo could not load here. <a href="' + esc(t) + '" target="_blank" rel="noopener">Open it on the source site ↗</a>';
      i.replaceWith(d);
    });
  });
  root.querySelectorAll("img").forEach(i => {
    i.loading = "lazy";
    i.addEventListener("click", () => {
      const o = document.createElement("div"); o.className = "lightbox";
      o.innerHTML = '<img src="' + i.getAttribute("src") + '" alt=""><p>' + esc((i.alt || "").replace(" — ", " · ")) + "</p>";
      o.addEventListener("click", () => o.remove()); document.body.appendChild(o);
    });
  });
  // wide tables scroll inside their own box, never the page
  root.querySelectorAll("table").forEach(t => {
    if (t.parentElement && t.parentElement.classList.contains("tbl-wrap")) return;
    const w = document.createElement("div"); w.className = "tbl-wrap";
    t.replaceWith(w); w.appendChild(t);
  });
  root.querySelectorAll("td").forEach(td => { if (/^\s*[-−+]?[\d,]*\.?\d+(\s*%)?\s*$/.test(td.textContent)) td.classList.add("num"); });
  root.querySelectorAll('a[href^="http"]').forEach(a => { a.target = "_blank"; a.rel = "noopener"; });
  root.querySelectorAll(".chk").forEach(c => {
    const inp = c.querySelector("input"), fb = c.querySelector(".fb"), a = +c.dataset.a, tol = +c.dataset.tol;
    const test = () => {
      const v = parseFloat(String(inp.value).replace(/,/g, "").replace("−", "-"));
      fb.hidden = false;
      if (!isFinite(v)) { fb.className = "fb no"; fb.textContent = "Enter a number."; return; }
      const ok = Math.abs(v - a) <= Math.max(Math.abs(a) * tol, 1e-9);
      fb.className = "fb " + (ok ? "ok" : "no");
      fb.textContent = ok ? "✓ Correct — " + a + " (within " + Math.round(tol * 100) + " %)." : (Math.abs(v - a) <= Math.abs(a) * 0.15 ? "Close, but not within " + Math.round(tol * 100) + " %. Check rounding and units." : "Not yet. Try again, or open the hint.");
    };
    c.querySelector(".btn:not(.ghost)").addEventListener("click", test);
    inp.addEventListener("keydown", e => { if (e.key === "Enter") test(); });
    c.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => { const el = c.querySelector("." + b.dataset.k); el.hidden = !el.hidden; }));
  });
  root.querySelectorAll(".dsteps").forEach(d => {
    const steps = [...d.querySelectorAll(".dstep")], next = d.querySelector('[data-k="next"]'), all = d.querySelector('[data-k="all"]');
    let shown = 1;
    const paint = () => {
      steps.forEach((s, i) => { s.hidden = i >= shown; });
      const done = shown >= steps.length;
      next.hidden = done; all.hidden = done;
      next.textContent = "Next step (" + (shown + 1) + " of " + steps.length + ")";
    };
    next.addEventListener("click", () => { shown = Math.min(steps.length, shown + 1); paint(); steps[shown - 1].scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    all.addEventListener("click", () => { shown = steps.length; paint(); });
    paint();
  });
  root.querySelectorAll(".predict").forEach(p => {
    const ans = +p.dataset.a, why = p.querySelector(".predict__why");
    p.querySelectorAll(".predict__opt").forEach(b => b.addEventListener("click", () => {
      if (p.dataset.done) return;
      p.dataset.done = "1";
      const pick = +b.dataset.i;
      p.querySelectorAll(".predict__opt").forEach((x, j) => { x.disabled = true; if (j === ans) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
      why.hidden = false;
      why.querySelector("b").textContent = pick === ans ? "Yes." : "Not quite.";
    }));
  });
  root.querySelectorAll(".quiz").forEach(q => {
    const score = q.querySelector(".qscore"), items = q.querySelectorAll(".qitem");
    q.addEventListener("change", e => {
      const it = e.target.closest(".qitem"); if (!it || it.dataset.done) return;
      const ans = +it.dataset.ans;
      it.querySelectorAll("label").forEach((l, j) => {
        const inp = l.querySelector("input"); inp.disabled = true;
        if (j === ans) l.classList.add("right"); else if (inp.checked) l.classList.add("wrong");
      });
      it.dataset.done = "1"; it.dataset.ok = +e.target.value === ans ? "1" : "0";
      it.querySelector(".why").hidden = false;
      const done = q.querySelectorAll(".qitem[data-done]").length, ok = q.querySelectorAll('.qitem[data-ok="1"]').length;
      score.textContent = "Score " + ok + " / " + done + (done === items.length ? " · all answered" : "");
    });
  });
}
