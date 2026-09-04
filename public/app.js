/* SFHS ACSL Guide
   Hash routed, no framework. State that matters: which division you are studying for,
   which topic you are on, and per problem code kept in localStorage. */

(function () {
"use strict";

var TOPICS = window.TOPICS, GUIDE = window.GUIDE, MCQ = window.MCQ, FRQ = window.FRQ;
var GEN = window.GEN;

var LANGS = [
  { id: "python", label: "Python 3.11", mode: "python" },
  { id: "java",   label: "Java 21",     mode: "text/x-java" },
  { id: "cpp",    label: "C++17",       mode: "text/x-c++src" }
];

var CONTEST_NAMES = { 1: "Contest 1", 2: "Contest 2", 3: "Contest 3", 4: "Contest 4" };

// ------------------------------------------------------------------ storage

function store(key, fallback) {
  try {
    var v = localStorage.getItem("acsl:" + key);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) { return fallback; }
}
function save(key, val) {
  try {
    localStorage.setItem("acsl:" + key, JSON.stringify(val));
  } catch (e) {
    // A full quota is the one failure worth interrupting for. Everything else here is a
    // preference, but the editor saves on every keystroke, and a student who is told
    // nothing will keep typing into a box that has quietly stopped keeping anything.
    warnOnce("Your browser will not store any more, so your work is no longer being saved. "
             + "Copy your code somewhere safe, then use Clear my progress in the footer to "
             + "clear room.");
  }
}

var warned = false;
function warnOnce(text) {
  if (warned) return;
  warned = true;
  var bar = document.createElement("div");
  bar.className = "storage-warning";
  bar.textContent = text;
  var x = document.createElement("button");
  x.textContent = "Dismiss";
  x.addEventListener("click", function () { bar.remove(); });
  bar.appendChild(x);
  document.body.appendChild(bar);
}

// Both of these are read straight back out of storage, so treat anything unrecognised the
// way a fresh visitor would be treated rather than carrying a bad value through the app.
var division = store("division", "senior");
if (division !== "junior" && division !== "senior") division = "senior";
var theme = store("theme", "dark");
if (theme !== "dark" && theme !== "light") theme = "dark";
document.documentElement.setAttribute("data-theme", theme);

// ------------------------------------------------------------------ helpers

function el(id) { return document.getElementById(id); }
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function topicsFor(div) {
  return TOPICS.filter(function (t) { return t.div === "both" || t.div === div; });
}
function topicById(id) {
  for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].id === id) return TOPICS[i];
  return null;
}
function questionsFor(topicId, div) {
  var want = div.charAt(0);
  return MCQ.filter(function (q) {
    return q.topic === topicId && (q.level === "b" || q.level === want);
  });
}
function problemsFor(div) {
  return FRQ.filter(function (p) { return p.division.toLowerCase() === div; });
}
function problemById(id) {
  for (var i = 0; i < FRQ.length; i++) if (FRQ[i].id === id) return FRQ[i];
  return null;
}
function missedFor(div) {
  return MCQ.filter(function (q) {
    if (store("q:" + q.id, null) !== false) return false;
    return q.level === "b" || q.level === div.charAt(0);
  });
}

function missedElsewhere(div) {
  var other = div === "junior" ? "senior" : "junior";
  return MCQ.filter(function (q) {
    if (store("q:" + q.id, null) !== false) return false;
    var here = q.level === "b" || q.level === div.charAt(0);
    var there = q.level === "b" || q.level === other.charAt(0);
    return !here && there;
  }).length;
}

// Every question in the bank was written with its right answer first and its distractors
// after it, which is the natural way to write one and a disaster to practise against: 195 of
// the 219 correct answers sat in position A. So no question is ever shown in the order it was
// stored. The stored order stays canonical, which is what verify.py checks against, and the
// order a student sees is decided here.
//
// None of the above is the one option whose position carries meaning, so it stays last.
function permute(q) {
  var n = q.choices.length;
  var fixed = /^none of the above$/i.test(String(q.choices[n - 1]).trim()) ? 1 : 0;
  var order = [];
  for (var i = 0; i < n - fixed; i++) order.push(i);
  shuffle(order);
  for (var k = 0; k < fixed; k++) order.push(n - fixed + k);
  return order;
}

// A shallow copy wearing the given order. Everything else about the question, its id above
// all, is untouched, so scoring and the missed list keep working on the canonical question.
function present(q, order) {
  var copy = {}, i;
  for (var k in q) if (Object.prototype.hasOwnProperty.call(q, k)) copy[k] = q[k];
  copy.choices = order.map(function (j) { return q.choices[j]; });
  copy.ans = order.indexOf(q.ans);
  return copy;
}

function presented(q) { return present(q, permute(q)); }

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ------------------------------------------------------------------ routing

function route() {
  var parts = location.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  var arg = parts[1] || null;
  if (arg) { try { arg = decodeURIComponent(arg); } catch (e) { /* leave it as typed */ } }
  return { section: parts[0] || "guide", arg: arg };
}

function go(path) {
  if (path !== location.pathname) history.pushState(null, "", path);
  render();
}

window.addEventListener("popstate", render);

// Real paths mean the browser would fetch a whole new document on every click. Catch our
// own links and route them in place, while leaving anything a person deliberately opens
// in a new tab, or any outbound link, to the browser.
document.addEventListener("click", function (e) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  var a = e.target.closest ? e.target.closest("a") : null;
  if (!a || a.target || a.hasAttribute("download")) return;
  var href = a.getAttribute("href");
  if (!href || href.charAt(0) !== "/") return;
  // Only intercept the paths this router actually renders. /privacy is a real document
  // served by the server, and swallowing it here handed it to a router that has never
  // heard of it, which drew the in-app not-found page over a page that exists.
  var first = href.slice(1).split(/[/?#]/)[0];
  if (first !== "" && SECTIONS.indexOf(first) < 0) return;
  e.preventDefault();
  go(href);
});
window.addEventListener("resize", function () { if (cm) cm.refresh(); });

// ------------------------------------------------------------------ page metadata

var ORIGIN = "https://www.sfhsacsl.org";

// Each route is now a real URL a search engine can reach, so each one has to say what it
// is. Without this every page would inherit the site title and describe itself as the
// front page, which is how a site with sixteen articles ends up indexed as one.
function setMeta(title, desc, index) {
  document.title = title;
  var set = function (sel, attr, val) {
    var n = document.head.querySelector(sel);
    if (n) n.setAttribute(attr, val);
  };
  set('meta[name="description"]', "content", desc);
  set('meta[property="og:title"]', "content", title);
  set('meta[property="og:description"]', "content", desc);
  set('meta[property="og:url"]', "content", ORIGIN + location.pathname);
  set('link[rel="canonical"]', "href", ORIGIN + location.pathname);
  set('meta[name="robots"]', "content", index ? "index,follow" : "noindex,follow");
}

function metaFor(r) {
  var t = r.arg ? topicById(r.arg) : null;
  var suffix = " | SFHS ACSL Guide";
  if (r.section === "guide" && t) {
    return [t.name + suffix, t.blurb + " Worked examples and the mistakes that cost points, "
            + "written for ACSL " + (t.div === "both" ? "Junior and Senior" : t.div) + ".", true];
  }
  if (r.section === "practice" && t) {
    return [t.name + " practice" + suffix,
            "Short answer practice on " + t.name.toLowerCase() + ", with the reasoning for "
            + "every answer.", true];
  }
  if (r.section === "problem") {
    var p = problemById(r.arg);
    if (p) return [p.title + suffix, p.blurb + " An ACSL style programming problem you can "
                   + "solve in Python, Java, or C++ in the browser.", true];
  }
  var pages = {
    guide:    ["Study guide" + suffix,
               "Sixteen ACSL categories across four contests, from number systems to "
               + "assembly, with worked examples throughout."],
    practice: ["Practice" + suffix,
               "Short answer practice across every ACSL category, with the reasoning shown "
               + "for each question."],
    exam:     ["Mock exam" + suffix,
               "Sit a full ACSL contest paper under a thirty minute clock, then review "
               + "every question."],
    missed:   ["Missed questions" + suffix, "The questions you got wrong, waiting to be "
               + "tried again."],
    problems: ["Programming problems" + suffix,
               "ACSL style programming problems with twelve test cases, solvable in Python, "
               + "Java, or C++ in the browser."]
  };
  var m = pages[r.section];
  return m ? [m[0], m[1], true]
           : ["Not found" + suffix, "There is nothing at that address.", false];
}

// ------------------------------------------------------------------ chrome

el("division-switch").addEventListener("click", function (e) {
  var b = e.target.closest("button[data-div]");
  if (!b) return;
  division = b.getAttribute("data-div");
  save("division", division);
  var r = route();
  // A topic that only exists in the other division cannot survive the switch.
  if (r.arg && (r.section === "guide" || r.section === "practice")) {
    var t = topicById(r.arg);
    if (!t || (t.div !== "both" && t.div !== division)) return go("/" + r.section);
  }
  if (r.section === "problem") {
    var p = problemById(r.arg);
    if (p && p.division.toLowerCase() !== division) return go("/problems");
  }
  render();
});

function paintThemeButton() {
  var b = el("theme-btn");
  var to = theme === "dark" ? "light" : "dark";
  b.setAttribute("aria-label", "Switch to " + to + " theme");
  b.title = "Switch to " + to + " theme";
}
paintThemeButton();

el("theme-btn").addEventListener("click", function () {
  theme = theme === "dark" ? "light" : "dark";
  save("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  paintThemeButton();
  if (window.__cm) window.__cm.setOption("theme", theme === "dark" ? "material-darker" : "default");
});

function paintChrome(section) {
  var links = el("section-tabs").querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    var s = links[i].getAttribute("data-section");
    var on = s === section
      || (section === "problem" && s === "problems")
      || (section === "missed" && s === "practice");
    links[i].classList.toggle("on", on);
    if (on) links[i].setAttribute("aria-current", "page");
    else links[i].removeAttribute("aria-current");
    // On a phone the four sections sit in a strip that can scroll, and the one you are in is
    // not always the one on screen.
    if (on && links[i].scrollIntoView) {
      links[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }
  var btns = el("division-switch").querySelectorAll("button");
  for (var j = 0; j < btns.length; j++) {
    var picked = btns[j].getAttribute("data-div") === division;
    btns[j].classList.toggle("on", picked);
    btns[j].setAttribute("aria-pressed", picked ? "true" : "false");
  }
}

// ------------------------------------------------------------------ sidebar

// The narrow-screen stand-in for the sidebar. It is always rendered and CSS decides whether it
// is on screen, so nothing here has to know how wide the window is or listen for resizes.
function renderTopicBar(section, active) {
  var bar = el("topicbar");
  if (section !== "guide" && section !== "practice") {
    bar.innerHTML = "";
    bar.classList.add("empty");
    return;
  }
  bar.classList.remove("empty");
  var list = topicsFor(division);
  var html = '<label for="topic-jump">Category</label><select id="topic-jump">';
  if (!active) html += '<option value="">Choose a category</option>';
  var lastContest = null;
  list.forEach(function (t) {
    if (t.contest !== lastContest) {
      if (lastContest !== null) html += "</optgroup>";
      lastContest = t.contest;
      html += '<optgroup label="' + CONTEST_NAMES[t.contest] + '">';
    }
    html += '<option value="' + esc(t.id) + '"' + (t.id === active ? " selected" : "") + ">"
          + esc(t.name) + "</option>";
  });
  if (lastContest !== null) html += "</optgroup>";
  bar.innerHTML = html + "</select>";
  el("topic-jump").addEventListener("change", function (e) {
    if (e.target.value) go("/" + section + "/" + e.target.value);
  });
}

function renderSidebar(section, active) {
  var side = el("sidebar");
  if (section === "problem" || section === "problems" || section === "exam"
      || section === "missed" || section === "404") {
    side.classList.add("hidden");
    return;
  }
  side.classList.remove("hidden");
  if (section !== "practice") section = "guide";
  var list = topicsFor(division);
  var html = "";
  var lastContest = null;
  list.forEach(function (t) {
    if (t.contest !== lastContest) {
      lastContest = t.contest;
      html += '<div class="side-head">' + CONTEST_NAMES[t.contest] + "</div>";
    }
    var done = "";
    if (section === "practice") {
      var qs = questionsFor(t.id, division);
      var right = qs.filter(function (q) { return store("q:" + q.id, null) === true; }).length;
      if (right > 0) done = ' <span class="tick">' + right + "/" + qs.length + "</span>";
    }
    html += '<a class="side-link' + (t.id === active ? " on" : "") + '"' +
      (t.id === active ? ' aria-current="page"' : "") + ' href="/' +
      section + "/" + t.id + '">' + esc(t.name) + done + "</a>";
  });
  side.innerHTML = html;
}

// ------------------------------------------------------------------ guide

function guideIndex() {
  var list = topicsFor(division);
  var html = '<div class="wrap-wide">' +
    '<div class="eyebrow">' + division + " division</div>" +
    "<h1>Study guide</h1>" +
    "<p class=\"note\">Twelve categories across four contests. Each page is the material plus " +
    "the checks to run before you write an answer down.</p>";
  var lastContest = null;
  list.forEach(function (t) {
    if (t.contest !== lastContest) {
      lastContest = t.contest;
      html += "<h2>" + CONTEST_NAMES[t.contest] + "</h2>" +
        '<div class="grid" data-c="' + t.contest + '"></div>';
    }
  });
  html += "</div>";
  el("main").innerHTML = html;
  list.forEach(function (t) {
    var g = el("main").querySelector('.grid[data-c="' + t.contest + '"]');
    var a = document.createElement("a");
    a.className = "card";
    a.href = "/guide/" + t.id;
    a.innerHTML = "<h3>" + esc(t.name) + "</h3><p>" + esc(t.blurb) + "</p>";
    g.appendChild(a);
  });
}

// A category that belongs to one division only should put you in that division, the way a
// shared problem link already does. Otherwise the page claims the wrong division in its own
// eyebrow and goes missing from the sidebar and the category picker.
function adoptDivisionFor(t) {
  if (t.div === "both" || t.div === division) return;
  division = t.div;
  save("division", division);
  paintChrome(route().section);
  renderSidebar(route().section, t.id);
  renderTopicBar(route().section, t.id);
}

function guidePage(topicId) {
  var t = topicById(topicId);
  if (t) adoptDivisionFor(t);
  if (!t || !GUIDE[topicId]) {
    return notFound("There is no study guide for \u201c" + topicId + "\u201d. Categories differ "
                    + "between the two divisions, so a link shared by someone in the other one "
                    + "may not exist in yours.");
  }
  var qs = questionsFor(topicId, division);
  var foot = '<h2>Practice this</h2><div class="btn-row">' +
    '<a class="btn btn-primary" href="/practice/' + topicId + '">' + qs.length +
    " short answer questions</a>" +
    '<a class="btn" href="/problems">Programming problems</a>' +
    "</div>";

  // With no sidebar on a phone, these are the only way to walk the categories in order.
  var order = topicsFor(division);
  var at = order.map(function (x) { return x.id; }).indexOf(topicId);
  var prev = at > 0 ? order[at - 1] : null;
  var next = at >= 0 && at < order.length - 1 ? order[at + 1] : null;
  if (prev || next) {
    foot += '<nav class="pager" aria-label="Categories">' +
      (prev ? '<a href="/guide/' + prev.id + '"><span>Previous</span>' + esc(prev.name) + "</a>"
            : "<span></span>") +
      (next ? '<a class="nxt" href="/guide/' + next.id + '"><span>Next</span>' + esc(next.name)
              + "</a>" : "<span></span>") +
      "</nav>";
  }
  el("main").innerHTML = '<div class="wrap">' +
    '<div class="eyebrow">' + CONTEST_NAMES[t.contest] + " &middot; " + division + " division</div>" +
    "<h1>" + esc(t.name) + "</h1>" + GUIDE[topicId] + foot + "</div>";
}

// ------------------------------------------------------------------ practice

function practiceIndex() {
  var list = topicsFor(division);
  var html = '<div class="wrap-wide"><div class="eyebrow">' + division + " division</div>" +
    "<h1>Practice</h1><p class=\"note\">Pick a category. Every question shows its reasoning " +
    "once you answer, right or wrong.</p>";
  var missed = missedFor(division);
  if (missed.length) {
    html += '<div class="grid"><a class="card" href="/missed"><h3>Missed questions</h3>' +
      "<p>The ones you got wrong, waiting to be tried again. Getting one right takes it off " +
      'the list.</p><div class="card-foot"><span class="chip">' + missed.length +
      " waiting</span></div></a></div>";
  }
  html += '<p class="note">Six of these categories can also generate questions on demand, '
        + "marked endless below. Those are built fresh each time from a random seed.</p>";
  html += '<div class="grid">';
  list.forEach(function (t) {
    var qs = questionsFor(t.id, division);
    var right = qs.filter(function (q) { return store("q:" + q.id, null) === true; }).length;
    html += '<a class="card" href="/practice/' + t.id + '"><h3>' + esc(t.name) + "</h3>" +
      "<p>" + esc(t.blurb) + '</p><div class="card-foot">' +
      '<span class="chip">' + qs.length + " questions</span>" +
      (GEN.has(t.id) ? '<span class="chip">endless</span>' : "") +
      (right ? '<span class="chip ok">' + right + " correct</span>" : "") +
      "</div></a>";
  });
  html += "</div>";
  var probs = problemsFor(division);
  if (probs.length) {
    html += "<h2>Programming problems</h2><div class=\"grid\">";
    probs.forEach(function (p) {
      html += '<a class="card" href="/problem/' + p.id + '"><h3>' + esc(p.title) + "</h3>" +
        "<p>" + esc(p.blurb) + '</p><div class="card-foot"><span class="chip">' +
        CONTEST_NAMES[p.contest] + "</span></div></a>";
    });
    html += "</div>";
  }
  el("main").innerHTML = html + "</div>";
}

var quiz = null;

function practicePage(topicId) {
  var t = topicById(topicId);
  if (t) adoptDivisionFor(t);
  if (!t) {
    return notFound("There are no practice questions under \u201c" + topicId + "\u201d. Categories "
                    + "differ between the two divisions, so a link shared by someone in the other "
                    + "one may not exist in yours.");
  }
  var qs = questionsFor(topicId, division);
  if (!qs.length) {
    el("main").innerHTML = '<div class="wrap"><h1>' + esc(t.name) +
      '</h1><p class="empty">No questions in this category for the ' + division +
      " division yet.</p></div>";
    return;
  }
  if (!quiz || quiz.topic !== topicId || quiz.division !== division) {
    quiz = { topic: topicId, division: division, list: shuffle(qs.slice()).map(presented),
             i: 0, picked: null, right: 0, seen: 0, endless: false };
  }
  drawQuestion();
}

// In endless mode the list is built as you walk off the end of it, so there is always a
// next question and never a last one.
function fillAhead() {
  if (!quiz.endless) return;
  while (quiz.list.length <= quiz.i) {
    quiz.list.push(GEN.make(quiz.topic, (Math.random() * 4294967296) >>> 0));
  }
}

function setMode(endless) {
  quiz.endless = endless;
  quiz.i = 0; quiz.picked = null; quiz.right = 0; quiz.seen = 0;
  quiz.list = endless ? []
                     : shuffle(questionsFor(quiz.topic, quiz.division).slice()).map(presented);
  drawQuestion();
}

function drawQuestion() {
  var missedMode = quiz.topic === "__missed";
  fillAhead();
  var q = quiz.list[quiz.i];
  var t = topicById(missedMode ? q.topic : quiz.topic);
  var heading = missedMode ? "Missed questions" : t.name;
  var crumb = missedMode
    ? '<a href="/practice">Practice</a> &middot; questions you got wrong'
    : '<a href="/practice">Practice</a> &middot; ' + CONTEST_NAMES[t.contest];

  var html = '<div class="wrap">' +
    '<div class="eyebrow">' + crumb + "</div><h1>" + esc(heading) + "</h1>" +
    '<div class="quiz-head"><span class="quiz-count">Question ' + (quiz.i + 1) +
    (quiz.endless ? "" : " of " + quiz.list.length) + "</span>" +
    '<a class="note" href="/guide/' + t.id + '">' +
    (missedMode ? "Guide for " + esc(t.name) : "Read the guide for this category") + "</a>" +
    '<span class="quiz-score" id="quiz-score">' + quiz.right + " / " + quiz.seen +
    "</span></div>" +
    (!missedMode && GEN.has(quiz.topic)
      ? '<div class="modes" id="modes">' +
          '<button class="' + (quiz.endless ? "" : "on") + '" data-endless="0">Question bank' +
          "</button>" +
          '<button class="' + (quiz.endless ? "on" : "") + '" data-endless="1">Endless</button>' +
          '<span class="note">' + (quiz.endless
            ? "Generated fresh each time, so you are very unlikely to see the same one twice. "
              + "These do not go in your missed list."
            : "Written by hand. " + questionsFor(quiz.topic, quiz.division).length
              + " of them, and your score is kept.") + "</span></div>"
      : "") +
    '<div class="qtext">' + q.q + "</div>" +
    '<div class="choices" id="choices"></div>' +
    '<div id="after"></div></div>';
  el("main").innerHTML = html;

  var modes = el("modes");
  if (modes) {
    modes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-endless]");
      if (b) setMode(b.getAttribute("data-endless") === "1");
    });
  }

  var box = el("choices");
  q.choices.forEach(function (c, idx) {
    var b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = '<span class="key">' + "ABCDE".charAt(idx) + '</span><span class="val">' +
      esc(c) + "</span>";
    b.addEventListener("click", function () { answer(idx); });
    box.appendChild(b);
  });
  if (quiz.picked !== null) paintAnswer();
}

function paintAnswer() {
  var q = quiz.list[quiz.i];
  var btns = el("choices").querySelectorAll(".choice");
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = true;
    if (i === q.ans) btns[i].classList.add("right");
    else if (i === quiz.picked) btns[i].classList.add("wrong");
  }
  var ok = quiz.picked === q.ans;
  var last = !quiz.endless && quiz.i === quiz.list.length - 1;
  // answer() has already counted this one, but only drawQuestion writes the header, so
  // without this the score still reads 0 / 0 underneath the word Correct.
  var score = el("quiz-score");
  if (score) score.textContent = quiz.right + " / " + quiz.seen;
  el("after").setAttribute("aria-live", "polite");
  el("after").innerHTML =
    '<div class="explain' + (ok ? "" : " wrong") + '"><h2><span class="verdict '
    + (ok ? "ok" : "no") + '">' +
    (ok ? "Correct" : "Not quite") + "</span></h2>" + q.why + "</div>" +
    '<div class="btn-row">' +
    (last ? '<button class="btn" id="restart">Start over</button>'
          : '<button class="btn btn-primary" id="next">Next question</button>') +
    '<a class="btn btn-ghost" href="/practice">All categories</a>' +
    (quiz.topic === "__missed" && ok
      ? '<span class="note">Off the missed list.</span>' : "") +
    '<span class="note">Question id ' + q.id + "</span></div>";
  var nb = el("next");
  if (nb) nb.addEventListener("click", function () {
    quiz.i++; quiz.picked = null; drawQuestion();
  });
  var rb = el("restart");
  if (rb) rb.addEventListener("click", function () {
    var wasMissed = quiz.topic === "__missed";
    quiz = null;
    if (wasMissed) missedPage();
    else practicePage(q.topic);
  });
}

function answer(idx) {
  if (quiz.picked !== null) return;
  var q = quiz.list[quiz.i];
  quiz.picked = idx;
  quiz.seen++;
  if (idx === q.ans) quiz.right++;
  if (!q.generated) save("q:" + q.id, idx === q.ans);
  paintAnswer();
}


// ------------------------------------------------------------------ mock exam

// A real contest is 6 short answer questions in 30 minutes, per the ACSL student guide.
var PER_TOPIC = 2;
var EXAM_SECONDS = 30 * 60;

var exam = null;
var clockTimer = null;

function isWdtpd(topicId) { return topicId.indexOf("wdtpd") === 0; }

function buildExam(contest) {
  // acsl.org states the format outright: "Each contest has 6 problems: two problems from each
  // of the 3 topics." So the paper is entirely determined by the contest's own topic list, and
  // there is nothing to borrow or top up.
  var div = division;
  var topics = topicsFor(div).filter(function (t) { return t.contest === contest; });
  var ids = [];
  var picked = [];

  topics.forEach(function (t) {
    shuffle(questionsFor(t.id, div).slice())
      .filter(function (q) { return ids.indexOf(q.id) < 0; })
      .slice(0, PER_TOPIC)
      .forEach(function (q) { picked.push(q); ids.push(q.id); });
  });

  // What Does This Program Do sits at the end of a real paper. Junior has a flavor of it in
  // every contest and Senior only in Contest 1, so this quietly does nothing elsewhere.
  picked.sort(function (x, y) {
    return (isWdtpd(x.topic) ? 1 : 0) - (isWdtpd(y.topic) ? 1 : 0);
  });

  return {
    contest: contest,
    division: div,
    ids: picked.map(function (q) { return q.id; }),
    // Kept alongside the ids, because a reload that reshuffled the choices would silently
    // move the answer out from under whatever the student had already picked.
    orders: picked.map(permute),
    answers: picked.map(function () { return null; }),
    at: 0,
    deadline: Date.now() + EXAM_SECONDS * 1000,
    submitted: false
  };
}

function saveExam() { save("exam", exam); }

// The exam in progress is plain JSON in localStorage, and it is read back on every visit
// to the section. A record that has been truncated, hand edited, or left behind by an
// older question set used to be handed straight to the renderer, which blanked the page
// and then blanked it again on the next reload, since nothing ever threw the bad record
// away. Vet the whole shape here instead: anything that fails is dropped, and the caller
// builds a fresh paper.
function loadExam() {
  var e = store("exam", null);
  if (!e || !Array.isArray(e.ids) || !e.ids.length) return null;
  if (!Array.isArray(e.answers) || e.answers.length !== e.ids.length) return null;
  if (!(e.contest >= 1 && e.contest <= 4)) return null;
  if (typeof e.deadline !== "number" || !isFinite(e.deadline)) return null;
  if (!(e.at >= 0 && e.at < e.ids.length)) return null;
  if (!e.ids.every(function (id) { return questionById(id); })) return null;
  if (!Array.isArray(e.orders) || e.orders.length !== e.ids.length) return null;
  var shapeOk = e.orders.every(function (o, i) {
    var n = questionById(e.ids[i]).choices.length;
    if (!Array.isArray(o) || o.length !== n) return false;
    var seen = o.slice().sort(function (x, y) { return x - y; });
    return seen.every(function (v, j) { return v === j; });
  });
  if (!shapeOk) return null;
  return e.answers.every(function (a, i) {
    return a === null || (a >= 0 && a < questionById(e.ids[i]).choices.length);
  }) ? e : null;
}

// The question as this paper shows it, which is the only version its saved answers mean
// anything against.
function examQ(i) {
  return present(questionById(exam.ids[i]), exam.orders[i]);
}

function questionById(id) {
  for (var i = 0; i < MCQ.length; i++) if (MCQ[i].id === id) return MCQ[i];
  return null;
}

function secondsLeft() {
  return Math.max(0, Math.round((exam.deadline - Date.now()) / 1000));
}

function clockText(s) {
  var m = Math.floor(s / 60);
  return (m < 10 ? "0" : "") + m + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
}

function stopClock() {
  if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
}

function examIndex() {
  var contests = [1, 2, 3, 4];
  var running = loadExam();
  var html = '<div class="wrap"><div class="eyebrow">' + division + " division</div>" +
    "<h1>Mock exam</h1>" +
    '<p class="note">Two questions from each of the contest\'s three topics, six in all, in ' +
    "thirty minutes. That is the format acsl.org publishes. No feedback while the clock runs, " +
    "and you get every explanation at the end.</p>";

  if (running && !running.submitted && running.division === division) {
    html += '<div class="banner">You have an exam in progress for Contest ' + running.contest +
      ". Starting a new one throws it away.</div>" +
      '<div class="btn-row"><a class="btn btn-primary" href="/exam/' + running.contest +
      '">Resume it</a></div>';
  }

  html += '<div class="grid">';
  contests.forEach(function (c) {
    var topics = topicsFor(division).filter(function (t) { return t.contest === c; });
    html += '<a class="card" href="/exam/' + c + '"><h3>Contest ' + c + "</h3><p>" +
      esc(topics.map(function (t) { return t.name; }).join(", ")) + "</p>" +
      '<div class="card-foot"><span class="chip">2 per topic</span>' +
      '<span class="chip">30 minutes</span></div></a>';
  });
  el("main").innerHTML = html + "</div></div>";
}

function examPage(contestArg) {
  var contest = parseInt(contestArg, 10);
  if (!(contest >= 1 && contest <= 4)) return examIndex();

  // Results stay up while you are still reading them, but leaving the section drops them,
  // so coming back to the same contest hands you a fresh paper rather than a replay.
  if (exam && exam.submitted && exam.contest === contest && exam.division === division) {
    return drawExamResults();
  }
  // An unfinished exam survives a refresh, deadline and all.
  var saved = loadExam();
  if (saved && !saved.submitted && saved.contest === contest && saved.division === division) {
    exam = saved;
  } else if (!exam || exam.submitted || exam.contest !== contest
             || exam.division !== division) {
    // The index warns that starting a new paper discards the old one, but the warning was
    // the whole of the protection: clicking another contest simply did it. Half an hour of
    // work deserves a question first.
    if (saved && !saved.submitted
        && !confirm("You have a mock exam in progress for Contest " + saved.contest
                    + ". Starting Contest " + contest + " will discard it. Continue?")) {
      return go("/exam");
    }
    exam = buildExam(contest);
    saveExam();
  }

  if (secondsLeft() === 0) return finishExam();
  drawExamQuestion();
}

function drawExamQuestion() {
  stopClock();
  var q = examQ(exam.at);
  var html = '<div class="wrap">' +
    '<div class="eyebrow"><a href="/exam">Mock exam</a> &middot; ' + exam.division +
    " division</div><h1>Contest " + exam.contest + "</h1>" +
    '<div class="exam-bar">' +
      '<div><span class="clock-label">Time left</span>' +
      '<span class="clock" id="clock">' + clockText(secondsLeft()) + "</span></div>" +
      '<div><span class="clock-label">Question</span>' +
      '<span class="clock">' + (exam.at + 1) + " / " + exam.ids.length + "</span></div>" +
      '<div class="palette" id="palette"></div>' +
    "</div>" +
    '<div class="qtext">' + q.q + "</div>" +
    '<div class="choices" id="choices"></div>' +
    '<div class="btn-row">' +
      '<button class="btn" id="prev"' + (exam.at === 0 ? " disabled" : "") + ">Previous</button>" +
      '<button class="btn" id="next"' +
      (exam.at === exam.ids.length - 1 ? " disabled" : "") + ">Next</button>" +
      '<button class="btn btn-primary" id="finish">Finish and see results</button>' +
      '<span class="note">Nothing is marked until you finish.</span>' +
    "</div></div>";
  el("main").innerHTML = html;

  var box = el("choices");
  q.choices.forEach(function (c, idx) {
    var b = document.createElement("button");
    b.className = "choice" + (exam.answers[exam.at] === idx ? " right" : "");
    b.innerHTML = '<span class="key">' + "ABCDE".charAt(idx) + '</span><span class="val">' +
      esc(c) + "</span>";
    b.addEventListener("click", function () {
      exam.answers[exam.at] = exam.answers[exam.at] === idx ? null : idx;
      saveExam();
      drawExamQuestion();
    });
    box.appendChild(b);
  });

  var pal = el("palette");
  exam.ids.forEach(function (id, i) {
    var b = document.createElement("button");
    b.textContent = i + 1;
    b.className = (i === exam.at ? "on" : "") + (exam.answers[i] !== null ? " done" : "");
    b.title = "Question " + (i + 1);
    b.addEventListener("click", function () { exam.at = i; saveExam(); drawExamQuestion(); });
    pal.appendChild(b);
  });

  el("prev").addEventListener("click", function () {
    if (exam.at > 0) { exam.at--; saveExam(); drawExamQuestion(); }
  });
  el("next").addEventListener("click", function () {
    if (exam.at < exam.ids.length - 1) { exam.at++; saveExam(); drawExamQuestion(); }
  });
  el("finish").addEventListener("click", function () {
    var blank = exam.answers.filter(function (x) { return x === null; }).length;
    var msg = blank ? "You have " + blank + " unanswered. Finish anyway?" : "Finish the exam?";
    if (confirm(msg)) finishExam();
  });

  clockTimer = setInterval(function () {
    var left = secondsLeft();
    var c = el("clock");
    if (!c) return stopClock();
    c.textContent = clockText(left);
    c.classList.toggle("low", left <= 120);
    if (left === 0) finishExam();
  }, 1000);
}

function finishExam() {
  stopClock();
  exam.submitted = true;
  // Only now does anything get recorded, which is what keeps the misses bank honest.
  exam.ids.forEach(function (id, i) {
    save("q:" + id, exam.answers[i] === examQ(i).ans);
  });
  saveExam();
  drawExamResults();
}

function drawExamResults() {
  stopClock();
  var right = 0;
  exam.ids.forEach(function (id, i) {
    if (exam.answers[i] === examQ(i).ans) right++;
  });
  var tone = right >= 5 ? "ok" : right >= 3 ? "mid" : "no";

  var html = '<div class="wrap">' +
    '<div class="eyebrow"><a href="/exam">Mock exam</a> &middot; ' + exam.division +
    " division</div><h1>Contest " + exam.contest + " results</h1>" +
    '<div class="scoreline ' + tone + '">' + right + " / " + exam.ids.length + "</div>" +
    '<p class="note">Every question is below with the reasoning. The ones you missed have been ' +
    'added to your <a href="/missed">missed questions</a>.</p>' +
    '<div class="btn-row"><a class="btn btn-primary" href="/exam">Take another</a>' +
    '<a class="btn" href="/missed">Review missed questions</a></div>';

  exam.ids.forEach(function (id, i) {
    var q = examQ(i);
    var ok = exam.answers[i] === q.ans;
    var t = topicById(q.topic);
    html += '<div class="review"><div class="review-head"><span class="n">Question ' + (i + 1) +
      '</span><span class="verdict ' + (ok ? "ok" : "no") + '">' +
      (ok ? "Correct" : exam.answers[i] === null ? "Left blank" : "Not quite") + "</span>" +
      '<span class="n">' + esc(t ? t.name : q.topic) + "</span></div>" +
      '<div class="qtext">' + q.q + "</div>" +
      '<div class="choices">';
    q.choices.forEach(function (c, idx) {
      var cls = idx === q.ans ? " right" : (idx === exam.answers[i] ? " wrong" : "");
      html += '<div class="choice' + cls + '"><span class="key">' + "ABCDE".charAt(idx) +
        '</span><span class="val">' + esc(c) + "</span></div>";
    });
    html += "</div>" +
      '<div class="explain' + (ok ? "" : " wrong") + '"><h2>Why</h2>' + q.why + "</div></div>";
  });

  el("main").innerHTML = html + "</div>";
}

// ------------------------------------------------------------------ missed bank

function missedPage() {
  var missed = missedFor(division);
  if (!missed.length) {
    var elsewhere = missedElsewhere(division);
    el("main").innerHTML = '<div class="wrap"><div class="eyebrow">' + division +
      " division</div><h1>Missed questions</h1>" +
      '<p class="empty">Nothing here. Questions you get wrong in practice or on a mock exam ' +
      "land in this list, and they leave it once you get them right." +
      (elsewhere ? " You do have " + elsewhere + " missed in the other division." : "") +
      '</p><div class="btn-row"><a class="btn" href="/practice">Back to practice</a></div></div>';
    return;
  }
  if (!quiz || quiz.topic !== "__missed" || quiz.division !== division) {
    quiz = { topic: "__missed", division: division,
             list: shuffle(missed.slice()).map(presented), i: 0,
             picked: null, right: 0, seen: 0 };
  }
  drawQuestion();
}

// ------------------------------------------------------------------ problems

function problemsIndex() {
  var probs = problemsFor(division);
  var html = '<div class="wrap-wide"><div class="eyebrow">' + division + " division</div>" +
    "<h1>Programming problems</h1>" +
    '<p class="note">Written the way ACSL writes them: a problem statement, an input and output ' +
    "spec, sample data, and twelve test cases where the last six are hidden. Solve inside the " +
    "function. The driver below it feeds the test data in and prints what you return.</p>" +
    '<div class="grid">';
  probs.forEach(function (p) {
    var st = store("frq:" + p.id, null);
    html += '<a class="card" href="/problem/' + p.id + '"><h3>' + esc(p.title) + "</h3><p>" +
      esc(p.blurb) + '</p><div class="card-foot"><span class="chip">' +
      CONTEST_NAMES[p.contest] + '</span><span class="chip">' + esc(p.fname) + "</span>" +
      (st === "solved" ? '<span class="chip ok">solved</span>' : "") +
      (st === "gaveup" ? '<span class="chip">solution seen</span>' : "") +
      "</div></a>";
  });
  el("main").innerHTML = html + "</div></div>";
}

var cm = null, curProblem = null, curLang = null;

function codeKey(pid, lang) { return "code:" + pid + ":" + lang; }

function problemPage(pid) {
  var p = problemById(pid);
  if (!p) return notFound("There is no programming problem called \u201c" + pid + "\u201d.");
  // Opening a problem from a shared link should put you in that problem's division,
  // otherwise the back link lands on a list that does not contain it.
  if (p.division.toLowerCase() !== division) {
    division = p.division.toLowerCase();
    save("division", division);
    paintChrome("problem");
  }
  curProblem = p;
  curLang = store("lang", "python");
  if (!LANGS.some(function (l) { return l.id === curLang; })) curLang = "python";

  el("main").classList.add("flush");
  el("main").innerHTML =
    '<div class="ws">' +
      '<div class="ws-left" id="ws-left"></div>' +
      '<div class="ws-right">' +
        '<div class="ws-bar">' +
          '<label for="lang" class="ws-label">Language</label>' +
          '<select id="lang"></select>' +
          '<button class="btn btn-ghost" id="reset">Reset code</button>' +
          '<span class="spacer"></span>' +
          '<button class="btn btn-ghost" id="toggle-input">Custom input</button>' +
          '<button class="btn" id="run">Run visible tests</button>' +
          '<button class="btn btn-primary" id="submit">Submit</button>' +
        "</div>" +
        '<div class="editor-host" id="editor-host"></div>' +
        '<div class="custom-input" id="custom-input" hidden>' +
          '<label for="stdin-box">Your own input</label>' +
          '<textarea id="stdin-box" spellcheck="false"></textarea>' +
          '<div class="row"><button class="btn" id="run-custom">Run with this input</button>' +
          '<span class="hint" id="stdin-hint"></span></div>' +
        "</div>" +
        '<div class="results" id="results" hidden>' +
          '<button class="results-bar" id="results-toggle" aria-expanded="true" ' +
                  'aria-controls="console" title="Hide results">' +
            '<span class="results-summary" id="results-summary"></span>' +
            '<span class="chev" aria-hidden="true">' + CHEVRON + "</span>" +
          "</button>" +
          '<div class="console" id="console"></div>' +
        "</div>" +
      "</div>" +
      '<div class="ws-needs-desk">' +
        "<h2>Open this one on a computer</h2>" +
        "<p>The editor needs a keyboard and room to see your code beside the problem, so it is " +
        "switched off at this width. The statement, the sample data, and the visible test cases " +
        "are all above, and they read fine here.</p>" +
        "<p>Anything you write is saved in the browser you write it in, so come back to this " +
        "problem on a laptop or desktop and start there.</p>" +
      "</div>" +
    "</div>";

  drawStatement();

  var sel = el("lang");
  LANGS.forEach(function (l) {
    var o = document.createElement("option");
    o.value = l.id; o.textContent = l.label;
    if (l.id === curLang) o.selected = true;
    sel.appendChild(o);
  });
  sel.addEventListener("change", function () {
    stash();
    curLang = sel.value;
    save("lang", curLang);
    loadCode();
    drawStatement();
  });

  el("reset").addEventListener("click", function () {
    if (!confirm("Replace the editor with the original starter code?")) return;
    cm.setValue(curProblem.starter[curLang]);
    stash();
  });
  el("run").addEventListener("click", function () { execute(false); });
  el("submit").addEventListener("click", function () { execute(true); });

  // ACSL tells you in every problem to make up test data of your own, so make that possible.
  var lines = p.samples[0]["in"].length;
  el("stdin-hint").textContent = lines === 1
    ? "One line per run. Blank lines are ignored."
    : lines + " lines per run, one per parameter. Add more blocks to run several at once.";
  el("stdin-box").value = store("stdin:" + p.id, p.samples[0]["in"].join("\n"));
  el("stdin-box").addEventListener("input", function () {
    save("stdin:" + p.id, el("stdin-box").value);
  });
  el("toggle-input").addEventListener("click", function () {
    var box = el("custom-input");
    box.hidden = !box.hidden;
    if (!box.hidden) el("stdin-box").focus();
    if (cm) cm.refresh();
  });
  el("run-custom").addEventListener("click", runCustom);
  el("results-toggle").addEventListener("click", function () { collapseResults(!collapsed); });

  cm = CodeMirror(el("editor-host"), {
    value: "",
    mode: LANGS.filter(function (l) { return l.id === curLang; })[0].mode,
    theme: theme === "dark" ? "material-darker" : "default",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    smartIndent: true,
    electricChars: true,
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: false,
    extraKeys: {
      Tab: function (c) {
        if (c.somethingSelected()) c.indentSelection("add");
        else c.replaceSelection("    ", "end");
      },
      "Shift-Tab": function (c) { c.indentSelection("subtract"); }
    }
  });
  window.__cm = cm;
  cm.on("change", function () { stash(); });
  loadCode();
  // The editor is inside a flex column, so its height is only final after layout. Capture the
  // instance rather than reading `cm`, which is null again if the user has already navigated on.
  var mine = cm;
  requestAnimationFrame(function () { mine.refresh(); });
  setTimeout(function () { mine.refresh(); }, 150);
}

function stash() {
  if (cm && curProblem) save(codeKey(curProblem.id, curLang), cm.getValue());
}

function loadCode() {
  var saved = store(codeKey(curProblem.id, curLang), null);
  cm.setOption("mode", LANGS.filter(function (l) { return l.id === curLang; })[0].mode);
  cm.setValue(saved === null ? curProblem.starter[curLang] : saved);
  cm.refresh();
}

function caseBlock(lines) {
  return lines.map(function (l) { return esc(l); }).join("\n");
}

function dataList(cases, lockFrom, startAt) {
  var h = '<ol class="data" start="' + (startAt || 1) + '">';
  cases.forEach(function (c, i) {
    if (lockFrom !== null && i >= lockFrom) {
      h += '<li class="sealed"><span class="locked">hidden</span></li>';
      return;
    }
    h += "<li><pre><code>" + caseBlock(c["in"]) + "</code></pre>" +
         '<div class="ans">' + esc(c.out) + "</div></li>";
  });
  return h + "</ol>";
}

function drawStatement() {
  var p = curProblem;
  var gaveUp = store("frq:" + p.id, null) === "gaveup";
  var visible = p.tests.slice(0, 6);
  var hidden = p.tests.slice(6);

  var html =
    '<div class="eyebrow"><a href="/problems">Programming problems</a> &middot; ' +
      CONTEST_NAMES[p.contest] + " &middot; " + p.division + " division</div>" +
    "<h1>" + esc(p.title) + "</h1>" +

    '<h2 class="sec">Problem</h2>' + p.statement +
    '<h2 class="sec">Example</h2>' + p.example +
    '<h2 class="sec">Input</h2><p>' + p.input_spec + "</p>" +
    '<h2 class="sec">Output</h2><p>' + p.output_spec + "</p>" +

    '<h2 class="sec">Sample input and output</h2>' +
    dataList(p.samples, null, 1) +

    '<h2 class="sec">Test data 1 to 6</h2>' +
    '<p class="note">Shown to you, the same way ACSL shows the first half.</p>' +
    dataList(visible, null, 1) +

    '<h2 class="sec">Test data 7 to 12</h2>' +
    '<p class="note">Six more cases, hidden in this interface the way ACSL hides the second half. ' +
    "Submitting tells you which ones pass, and showing the solution reveals them. They are hidden " +
    "rather than secret: this site is one static bundle, so anyone reading the page source can " +
    "find them. Treat your score here as practice rather than as a result.</p>" +
    dataList(hidden, gaveUp ? null : 0, 7) +

    '<h2 class="sec">Task</h2>' +
    "<p>Complete the function <code>" + esc(p.fname) + "</code>.</p>" + p.task +
    "<p>You may create additional functions that are called from <code>" + esc(p.fname) +
    "</code> if needed in solving the problem.</p>" +

    '<h2 class="sec">Constraints</h2><p>' + p.constraints + "</p>" +

    '<h2 class="sec">Data provided</h2>' +
    "<p>There are 3 sets of sample data for debugging and 12 sets of test data for scoring. " +
    "The last 6 are hidden. The test cases vary in difficulty, and you should make up sample " +
    "data of your own to test your program properly.</p>" +

    '<div class="btn-row"><button class="btn" id="giveup">' +
    (gaveUp ? "Solution shown below" : "Show the solution") + "</button></div>" +
    '<div id="solution"></div>';

  el("ws-left").innerHTML = html;
  var gb = el("giveup");
  gb.disabled = gaveUp;
  gb.addEventListener("click", function () {
    if (!confirm("Show the reference solution and all twelve test cases? This will mark the "
                 + "solution as viewed.")) return;
    save("frq:" + p.id, "gaveup");
    drawStatement();
  });
  if (gaveUp) drawSolution();
}

function drawSolution() {
  var p = curProblem;
  var lang = LANGS.filter(function (l) { return l.id === curLang; })[0];
  el("solution").innerHTML =
    "<h2>How to solve it</h2>" + p.approach +
    "<h3>Reference solution in " + lang.label + "</h3>" +
    '<p class="note">Switch the language selector to see this in another language.</p>' +
    "<pre><code>" + esc(p.solution[curLang]) + "</code></pre>";
}

// ------------------------------------------------------------------ running

// A chevron pointing down. Collapsed state rotates it, so the two arrows are exact
// mirrors of each other rather than two glyphs that happen to look related.
var CHEVRON = '<svg viewBox="0 0 16 16" width="13" height="13"><path d="M3.5 6l4.5 4.5L12.5 6"'
  + ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"'
  + ' stroke-linejoin="round"/></svg>';

var collapsed = false;

function collapseResults(want) {
  collapsed = want;
  var box = el("results");
  if (!box) return;
  box.classList.toggle("collapsed", collapsed);
  var btn = el("results-toggle");
  btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
  btn.title = collapsed ? "Show results" : "Hide results";
  // The editor grows into the space the results gave up, so it needs to remeasure.
  if (cm) cm.refresh();
}

function showResults(summary, detail) {
  el("results").hidden = false;
  // Compiling happens out of sight, so the outcome has to announce itself.
  el("results-summary").setAttribute("aria-live", "polite");
  el("results-summary").innerHTML = summary;
  el("console").innerHTML = detail || "";
  collapseResults(false);
}

// The runner is not the only thing that can answer a request to it. The rate limit rule in
// front of the function replies 403 itself, and a platform error or a deploy in flight can
// reply too, none of it in the shape report() expects. Without this the 403 body parsed
// cleanly, arrived with no stdout, and was read as a run that printed nothing, so a student
// being rate limited was told their correct program failed every test.
function runnerResponse(r) {
  if (r.ok) return r.json();
  if (r.status === 429 || r.status === 403) {
    return { status: "error", message: "Too many runs from your network in a short space of "
             + "time. The limit is shared by everyone on the same connection, so if your whole "
             + "class is submitting at once, give it a minute and try again." };
  }
  return { status: "error", message: "The code runner could not be reached just now (HTTP "
           + r.status + "). Try again in a moment." };
}

function execute(full) {
  var p = curProblem;
  var cases = full ? p.tests : p.tests.slice(0, 6);
  var stdin = cases.map(function (c) { return c["in"].join("\n"); }).join("\n") + "\n";
  el("run").disabled = true;
  el("submit").disabled = true;
  showResults('<span class="muted">Compiling and running ' + cases.length
              + " test cases...</span>", "");

  fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang: curLang, code: cm.getValue(), stdin: stdin })
  }).then(runnerResponse)
    .then(function (res) { report(res, cases, full); })
    .catch(function (e) {
      showResults('<span class="st no">Error</span><span>could not reach the code runner</span>',
                  '<div class="res-detail">' + esc(e.message) + "</div>");
    })
    .then(function () { el("run").disabled = false; el("submit").disabled = false; });
}

function runCustom() {
  var text = el("stdin-box").value;
  if (!text.trim()) return showResults('<span class="st no">Nothing to run</span>'
                                       + "<span>the input box is empty</span>", "");
  el("run").disabled = true;
  el("submit").disabled = true;
  el("run-custom").disabled = true;
  showResults('<span class="muted">Running your own input...</span>', "");

  fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang: curLang, code: cm.getValue(),
                           stdin: text.replace(/\s+$/, "") + "\n" })
  }).then(runnerResponse)
    .then(function (res) {
      if (res.status === "compile_error") {
        return showResults('<span class="st no">Compile error</span>'
                           + "<span>the compiler rejected this</span>",
                           '<div class="res-detail">' + esc(res.message) + "</div>");
      }
      if (res.status === "error" || res.status === "timeout") {
        return showResults('<span class="st no">'
                           + (res.status === "timeout" ? "Timed out" : "Error") + "</span>",
                           '<div class="res-detail">' + esc(res.message || "") + "</div>");
      }
      // Nothing to compare against here, so just show what the program printed.
      var out = (res.stdout || "").replace(/\n$/, "");
      var body = out === ""
        ? '<div class="res-detail"><b>output</b> (the program printed nothing)</div>'
        : '<div class="res-detail">' + esc(out) + "</div>";
      if (res.stderr) body += '<div class="res-line"><span class="st no">STDERR</span></div>'
                            + '<div class="res-detail">' + esc(res.stderr) + "</div>";
      showResults('<span class="st ' + (res.status === "ok" ? "ok" : "no") + '">'
                  + (res.status === "ok" ? "Ran" : "Runtime error") + "</span>"
                  + "<span>your own input, nothing checked</span>", body);
    })
    .catch(function (e) {
      showResults('<span class="st no">Error</span><span>could not reach the code runner</span>',
                  '<div class="res-detail">' + esc(e.message) + "</div>");
    })
    .then(function () {
      el("run").disabled = false;
      el("submit").disabled = false;
      el("run-custom").disabled = false;
    });
}

function report(res, cases, full) {
  if (res.status === "compile_error") {
    return showResults('<span class="st no">Compile error</span>'
                       + "<span>the compiler rejected this</span>",
                       '<div class="res-detail">' + esc(res.message) + "</div>");
  }
  if (res.status === "error" || res.status === "timeout") {
    return showResults('<span class="st no">'
                       + (res.status === "timeout" ? "Timed out" : "Error") + "</span>",
                       '<div class="res-detail">' + esc(res.message || "") + "</div>");
  }

  var lines = (res.stdout || "").split("\n");
  // Drop only the empty tail left by the final newline. A program that legitimately
  // prints blank lines still gets one entry per line.
  if (lines.length && lines[lines.length - 1] === "") lines.pop();

  var pass = 0, html = "";
  cases.forEach(function (c, i) {
    var got = i < lines.length ? lines[i] : null;
    var ok = got !== null && got.replace(/\s+$/, "") === c.out;
    if (ok) pass++;
    var hiddenCase = full && i >= 6;
    html += '<div class="res-line"><span class="n">Test ' + (i + 1) + "</span>" +
      '<span class="st ' + (ok ? "ok" : "no") + '">' + (ok ? "PASS" : "FAIL") + "</span>" +
      "<span>" + (hiddenCase ? '<span class="st hid">hidden</span>'
                              : esc(c["in"].join("  \u00b7  "))) + "</span></div>";
    if (!ok && !hiddenCase) {
      html += '<div class="res-detail"><b>expected</b> ' + esc(c.out) +
        "\n<b>got     </b> " + (got === null ? "(no line produced)" : esc(got)) + "</div>";
    }
  });

  if (res.stderr) {
    html += '<div class="res-line"><span class="st no">STDERR</span></div>' +
      '<div class="res-detail">' + esc(res.stderr) + "</div>";
  }
  if (lines.length > cases.length) {
    html += '<div class="res-detail"><b>note</b> the program printed ' + lines.length +
      " lines for " + cases.length + " test cases. Each case should print exactly one line." +
      "</div>";
  }

  // With the panel collapsed the bar is all you see, so it has to mention a crash.
  showResults('<span class="st ' + (pass === cases.length ? "ok" : "no") + '">' + pass + " / "
              + cases.length + "</span><span>"
              + (full ? "all twelve test cases" : "the six visible test cases")
              + (res.stderr ? ", and the program wrote to stderr" : "") + "</span>",
              html);

  if (full && pass === cases.length && store("frq:" + curProblem.id, null) !== "gaveup") {
    save("frq:" + curProblem.id, "solved");
  }
}

// ------------------------------------------------------------------ not found

var SECTIONS = ["guide", "practice", "exam", "missed", "problems", "problem"];

// Every dead link used to land on the guide index without a word, which reads as though
// the site lost your place rather than as though the address was wrong.
function notFound(detail) {
  setMeta("Not found | SFHS ACSL Guide", "There is nothing at that address.", false);
  el("main").innerHTML = '<div class="wrap lost">' +
    '<div class="eyebrow">Error 404</div>' +
    "<h1>There is nothing at that address</h1>" +
    "<p>" + esc(detail) + "</p>" +
    '<div class="btn-row"><a class="btn btn-primary" href="/guide">Back to the study guide</a>' +
    "</div></div>";
}

// ------------------------------------------------------------------ render

function render() {
  var r = route();
  if (SECTIONS.indexOf(r.section) < 0) r.section = "404";
  var m = metaFor(r);
  setMeta(m[0], m[1], m[2]);
  stopClock();
  if (r.section !== "exam") exam = null;
  el("main").classList.remove("flush");
  el("main").scrollTop = 0;
  window.scrollTo(0, 0);
  cm = null; curProblem = null; window.__cm = null;

  paintChrome(r.section);
  renderSidebar(r.section, r.arg);
  renderTopicBar(r.section, r.arg);
  // The problem workspace is a full height split, so a footer under it would fight the layout.
  el("footer").classList.toggle("hidden", r.section === "problem");

  if (r.section === "404") {
    notFound("The link that brought you here points at a page this site does not have.");
  } else if (r.section === "practice") {
    if (r.arg) practicePage(r.arg); else practiceIndex();
  } else if (r.section === "exam") {
    if (r.arg) examPage(r.arg); else examIndex();
  } else if (r.section === "missed") {
    missedPage();
  } else if (r.section === "problems") {
    problemsIndex();
  } else if (r.section === "problem") {
    problemPage(r.arg);
  } else {
    if (r.arg) guidePage(r.arg); else guideIndex();
  }
}

document.getElementById("wipe").addEventListener("click", function () {
  if (!confirm("Delete your saved answers, exam progress, code, custom input, theme, language, "
               + "and division from this browser? This cannot be undone.")) return;
  try {
    Object.keys(localStorage)
      .filter(function (k) { return k.indexOf("acsl:") === 0; })
      .forEach(function (k) { localStorage.removeItem(k); });
  } catch (e) {}
  location.reload();
});

// Anything shared while the site was hash routed points at #/guide/x. The fragment never
// reaches the server, so only this can rescue those links.
if (/^#\/?./.test(location.hash)) {
  history.replaceState(null, "", "/" + location.hash.replace(/^#\/?/, ""));
} else if (location.hash === "#" || location.hash === "#/") {
  history.replaceState(null, "", "/");
}

render();

})();
