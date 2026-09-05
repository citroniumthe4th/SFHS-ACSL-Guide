/* SFHS ACSL Guide
   Path routed, no framework. State that matters: which division you are studying for,
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

// A shortcut nobody knows about is the same as no shortcut, and the modifier differs by
// platform, so name the one the reader actually has.
var META = /Mac|iPhone|iPad/.test(navigator.platform) ? "  \u2318" : "  Ctrl";

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

function forget(key) {
  try { localStorage.removeItem("acsl:" + key); } catch (e) { /* nothing to forget */ }
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
function problemProgress(id) {
  var old = store("frq:" + id, null);
  if (old === "solved") return { solved: true, solutionViewed: false, assisted: false };
  if (old === "gaveup") return { solved: false, solutionViewed: true, assisted: false };
  if (old && typeof old.solved === "boolean" && typeof old.solutionViewed === "boolean"
      && typeof old.assisted === "boolean") return old;
  return { solved: false, solutionViewed: false, assisted: false };
}

function recordProblem(id, action) {
  var progress = problemProgress(id);
  if (action === "view") progress.solutionViewed = true;
  if (action === "solve" && !progress.solved) {
    progress.solved = true;
    progress.assisted = progress.solutionViewed;
  }
  save("frq:" + id, progress);
}

function reviewQuestions() {
  var found = MCQ.slice(), seen = new Set(found.map(function (q) { return q.id; }));
  try {
    Object.keys(localStorage).forEach(function (key) {
      var match = /^acsl:(?:q|bookmark):(gen:.*)$/.exec(key);
      if (!match || seen.has(match[1])) return;
      var q = questionById(match[1]);
      if (q) { found.push(q); seen.add(q.id); }
    });
  } catch (e) { /* Fixed questions remain available without storage. */ }
  return found;
}

function bookmarkedFor(div) {
  return reviewQuestions().filter(function (q) {
    return store("bookmark:" + q.id, false) === true
      && (q.level === "b" || q.level === div.charAt(0));
  });
}

function missedFor(div) {
  return reviewQuestions().filter(function (q) {
    if (store("q:" + q.id, null) !== false) return false;
    return q.level === "b" || q.level === div.charAt(0);
  });
}

function missedElsewhere(div) {
  var other = div === "junior" ? "senior" : "junior";
  return reviewQuestions().filter(function (q) {
    if (store("q:" + q.id, null) !== false) return false;
    var here = q.level === "b" || q.level === div.charAt(0);
    var there = q.level === "b" || q.level === other.charAt(0);
    return !here && there;
  }).length;
}

// Every question in the bank was written with its right answer first and its distractors
// after it, which is the natural way to write one and a disaster to practice against: 195 of
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
  if (path !== location.pathname + location.search + location.hash) history.pushState(null, "", path);
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
    bookmarks: ["Bookmarked questions" + suffix, "The questions you saved while practicing, "
               + "ready to work through again."],
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
  var html = '<div class="wrap-wide">' +
    '<div class="eyebrow">' + division + " division</div>" +
    "<h1>Study guide</h1>" +
    "<p class=\"note\">An independent study guide for ACSL Junior and Senior divisions. " +
    "Choose your division above, then work through the three topics for each contest.</p>" +
    '<p class="note">Preparing for Intermediate or another division? Use the ' +
    '<a href="https://www.acsl.org/get-started/study-materials">official study materials</a> ' +
    'to check your syllabus. This site is not affiliated with ACSL.</p>';
  html += '<label for="guide-search">Search all lessons</label>'
    + '<input id="guide-search" class="guide-search" type="search" autocomplete="off" placeholder="Try CDR or external path length">'
    + '<p class="note" id="search-count" role="status"></p><div id="guide-results"></div></div>';
  el("main").innerHTML = html;
  var search = el("guide-search");
  search.value = new URLSearchParams(location.search).get("search") || "";
  // The name and blurb are searchable, but they already sit on the card, so a snippet is cut
  // from the lesson body and the blurb stands in when the match was in the heading.
  var lessons = TOPICS.map(function (t) {
    var doc = document.createElement("div");
    doc.innerHTML = GUIDE[t.id] || "";
    return { topic: t, head: (t.name + " " + t.blurb).toLowerCase(),
             body: doc.textContent.replace(/\s+/g, " ").trim() };
  });
  function results() {
    var term = search.value.trim().toLowerCase();
    var matched = lessons.filter(function (lesson) {
      return term ? lesson.head.includes(term) || lesson.body.toLowerCase().includes(term)
        : lesson.topic.div === "both" || lesson.topic.div === division;
    });
    var html = "", lastContest = null;
    matched.forEach(function (lesson) {
      var t = lesson.topic;
      if (t.contest !== lastContest) {
        if (lastContest !== null) html += "</div>";
        lastContest = t.contest;
        html += "<h2>" + CONTEST_NAMES[t.contest] + '</h2><div class="grid">';
      }
      var at = term ? lesson.body.toLowerCase().indexOf(term) : -1;
      var snippet = at >= 0 ? (at > 60 ? "…" : "") + lesson.body.slice(Math.max(0, at - 60), at + 150)
        + (at + 150 < lesson.body.length ? "…" : "") : t.blurb;
      html += '<a class="card" href="/guide/' + t.id + '"><h3>' + esc(t.name)
        + '</h3><p>' + esc(snippet) + '</p><span class="chip">'
        + (t.div === "both" ? "Junior and Senior" : t.div) + '</span></a>';
    });
    el("guide-results").innerHTML = html + (matched.length ? "</div>" : '<p>No lessons match. Try a shorter term.</p>');
    el("search-count").textContent = term
      ? matched.length + " matching lesson" + (matched.length === 1 ? "" : "s")
        + " across both divisions" : "";
  }
  search.addEventListener("input", function () {
    history.replaceState(null, "", location.pathname + (search.value ? "?search=" + encodeURIComponent(search.value) : ""));
    results();
  });
  results();
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

function wikiTitle(topicId) {
  if (isWdtpd(topicId)) return "What_Does_This_Program_Do?";
  return {
    "number-systems": "Computer_Number_Systems", "recursive-functions": "Recursive_Functions",
    "prefix-postfix": "Prefix/Infix/Postfix_Notation", "bit-string-flicking": "Bit-String_Flicking",
    "lisp": "LISP", "boolean-algebra": "Boolean_Algebra", "data-structures": "Data_Structures",
    "fsa-regex": "FSAs_and_Regular_Expressions", "graph-theory": "Graph_Theory",
    "digital-electronics": "Digital_Electronics", "assembly": "Assembly_Language_Programming"
  }[topicId];
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
  el("main").innerHTML = '<article class="wrap lesson">' +
    '<div class="eyebrow">' + CONTEST_NAMES[t.contest] + " &middot; " + division + " division</div>" +
    "<h1>" + esc(t.name) + "</h1>" +
    '<div class="lesson-tools"><a class="btn btn-primary" href="/practice/' + topicId
      + '">Practice this topic</a><a href="https://www.categories.acsl.org/wiki/index.php?title='
      + encodeURIComponent(wikiTitle(topicId)) + '">Official ACSL topic reference</a></div>' +
    '<nav class="lesson-toc" aria-label="On this page"><b>On this page</b><ul></ul></nav>' +
    GUIDE[topicId] + foot + "</article>";
  var toc = el("main").querySelector(".lesson-toc ul");
  el("main").querySelectorAll(".lesson h2").forEach(function (h) {
    h.id = "section-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
    var li = document.createElement("li"), a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });
  var anchor = document.getElementById(location.hash.slice(1));
  if (anchor) anchor.scrollIntoView();
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
  var requested = new URLSearchParams(location.search).get("q");
  var linked = requested ? questionById(requested) : null;
  if (requested && (!linked || linked.topic !== topicId)) {
    return notFound("That question link is not in this category. Open Practice to choose a question.");
  }
  if (linked && linked.level !== "b") adoptDivisionFor({ div: linked.level === "j" ? "junior" : "senior" });
  var qs = linked ? [linked] : questionsFor(topicId, division);
  if (!qs.length) {
    el("main").innerHTML = '<div class="wrap"><h1>' + esc(t.name) +
      '</h1><p class="empty">No questions in this category for the ' + division +
      " division yet.</p></div>";
    return;
  }
  if (!quiz || quiz.topic !== topicId || quiz.division !== division || quiz.requested !== requested) {
    quiz = { topic: topicId, division: division, requested: requested, list: shuffle(qs.slice()).map(presented),
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
  history.replaceState(null, "", "/practice/" + quiz.topic);
  quiz.requested = null;
  quiz.endless = endless;
  quiz.i = 0; quiz.picked = null; quiz.right = 0; quiz.seen = 0;
  quiz.list = endless ? []
                     : shuffle(questionsFor(quiz.topic, quiz.division).slice()).map(presented);
  drawQuestion();
}

// Both routes carry the same prefilled report. GitHub is public and needs an account;
// the address does not, which for most people here is the shorter path.
function questionReport(q) {
  var title = "Question " + q.id + ": correction";
  var body = "Question ID: " + q.id + "\nPage: " + location.origin + questionLink(q)
    + "\n\nWhat seems wrong:\n\nSuggested correction or source:\n";
  return 'Report a mistake by <a href="mailto:contact@sfhsacsl.org?subject='
    + encodeURIComponent(title) + '&amp;body=' + encodeURIComponent(body) + '">email</a> or '
    + '<a href="https://github.com/citroniumthe4th/SFHS-ACSL-Guide/issues/new?title='
    + encodeURIComponent(title) + '&amp;body=' + encodeURIComponent(body)
    + '" target="_blank" rel="noopener noreferrer">on GitHub</a>';
}

function drawQuestion() {
  var bookmarksMode = quiz.topic === "__bookmarks";
  var missedMode = quiz.topic === "__missed" || bookmarksMode;
  fillAhead();
  var q = quiz.list[quiz.i];
  var t = topicById(missedMode ? q.topic : quiz.topic);
  var heading = bookmarksMode ? "Bookmarked questions" : missedMode ? "Missed questions" : t.name;
  var crumb = missedMode
    ? (bookmarksMode ? 'Questions you saved while practicing'
                       : '<a href="/practice">Practice</a> &middot; questions you got wrong')
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
          '<span class="note">' + (quiz.requested ? "Shared question. Choose a mode to continue practicing this category." : quiz.endless
            ? "Generated fresh each time, so you are very unlikely to see the same one twice. "
              + "Missed questions are saved so you can retry the same version."
            : "Fixed question bank. " + questionsFor(quiz.topic, quiz.division).length
              + " of them, and your score is kept.") + "</span></div>"
      : "") +
    '<p class="question-meta">' + esc(q.id) + " &middot; "
      + (q.exam === false ? "Extension beyond the core syllabus" : q.kind === "problem" || q.generated ? "Practice problem" : "Concept check")
      + ' &middot; <a href="' + questionLink(q) + '">Link to this question</a>'
      + ' &middot; ' + questionReport(q) + "</p>" +
    '<button class="btn bookmark" id="bookmark" aria-pressed="' + String(store("bookmark:" + q.id, false) === true)
      + '">' + (store("bookmark:" + q.id, false) === true ? "Bookmarked" : "Bookmark question") + "</button>" +
    '<div class="qtext">' + q.q + "</div>" +
    '<div class="choices" id="choices"></div>' +
    '<div id="after"></div></div>';
  el("main").innerHTML = html;

  el("bookmark").addEventListener("click", function () {
    var marked = store("bookmark:" + q.id, false) !== true;
    save("bookmark:" + q.id, marked);
    this.setAttribute("aria-pressed", String(marked));
    this.textContent = marked ? "Bookmarked" : "Bookmark question";
  });
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
    var was = quiz.topic;
    quiz = null;
    if (was === "__missed" || was === "__bookmarks") missedPage(was === "__bookmarks");
    else practicePage(q.topic);
  });
}

function answer(idx) {
  if (quiz.picked !== null) return;
  var q = quiz.list[quiz.i];
  quiz.picked = idx;
  quiz.seen++;
  if (idx === q.ans) quiz.right++;
  // A generated question keeps its record only while you still owe it. Nothing reads the
  // true: the category counters walk the fixed bank, so a right answer in endless mode was
  // writing a key that every later visit to Practice or Missed would scan and throw away.
  if (q.generated && idx === q.ans) forget("q:" + q.id);
  else save("q:" + q.id, idx === q.ans);
  paintAnswer();
}


// ------------------------------------------------------------------ mock exam

// A real contest is 6 short answer questions in 30 minutes, per the ACSL student guide.
var PER_TOPIC = 2;
var EXAM_SECONDS = 30 * 60;

var exam = null;
var clockTimer = null;

function isWdtpd(topicId) { return topicId.indexOf("wdtpd") === 0; }

function examSize(contest, div) {
  return topicsFor(div).filter(function (t) { return t.contest === contest; }).length * PER_TOPIC;
}

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
      .filter(function (q) { return q.kind === "problem" && q.exam !== false && ids.indexOf(q.id) < 0; })
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
function loadExam() { return validExam(store("exam", null)); }

function validExam(e) {
  if (!e || !Array.isArray(e.ids)) return null;
  if (e.division !== "junior" && e.division !== "senior") return null;
  if (typeof e.submitted !== "boolean") return null;
  if (!(Number.isInteger(e.contest) && e.contest >= 1 && e.contest <= 4)) return null;
  // Ask buildExam's own arithmetic how long this paper should be, so that changing PER_TOPIC
  // does not silently invalidate every exam already in progress.
  var want = examSize(e.contest, e.division);
  if (e.ids.length !== want || new Set(e.ids).size !== want) return null;
  if (!Array.isArray(e.answers) || e.answers.length !== e.ids.length) return null;
  if (typeof e.deadline !== "number" || !isFinite(e.deadline)) return null;
  if (!(Number.isInteger(e.at) && e.at >= 0 && e.at < e.ids.length)) return null;
  if (!e.ids.every(function (id) {
    var q = MCQ.find(function (q) { return q.id === id; });
    return q && (q.level === "b" || q.level === e.division.charAt(0));
  })) return null;
  if (!Array.isArray(e.orders) || e.orders.length !== e.ids.length) return null;
  var shapeOk = e.orders.every(function (o, i) {
    var n = questionById(e.ids[i]).choices.length;
    if (!Array.isArray(o) || o.length !== n) return false;
    var seen = o.slice().sort(function (x, y) { return x - y; });
    return seen.every(function (v, j) { return v === j; });
  });
  if (!shapeOk) return null;
  return e.answers.every(function (a, i) {
    return a === null || (Number.isInteger(a) && a >= 0 && a < questionById(e.ids[i]).choices.length);
  }) ? e : null;
}

// The question as this paper shows it, which is the only version its saved answers mean
// anything against.
function examQ(i) {
  return present(questionById(exam.ids[i]), exam.orders[i]);
}

function questionById(id) {
  for (var i = 0; i < MCQ.length; i++) if (MCQ[i].id === id) return MCQ[i];
  var match = /^gen:([a-z-]+):(0|[1-9][0-9]{0,9})$/.exec(String(id));
  if (match && GEN.has(match[1]) && Number(match[2]) <= 4294967295) {
    return GEN.make(match[1], Number(match[2]));
  }
  return null;
}

function questionLink(q) {
  return "/practice/" + q.topic + "?q=" + encodeURIComponent(q.id);
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
    "and you get every explanation at the end.</p>" +
    '<p class="note">These exams use this site\'s practice questions. Concept checks and extension ' +
    "questions stay in practice. The score is not calibrated to an official ACSL exam.</p>";

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

function drawExamQuestion(focusTarget) {
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
    '<div class="qtext" id="exam-question" tabindex="-1">' + q.q + "</div>" +
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
    b.className = "choice" + (exam.answers[exam.at] === idx ? " selected" : "");
    b.setAttribute("aria-pressed", String(exam.answers[exam.at] === idx));
    b.innerHTML = '<span class="key">' + "ABCDE".charAt(idx) + '</span><span class="val">' +
      esc(c) + "</span>";
    b.addEventListener("click", function () {
      if (secondsLeft() === 0) return finishExam();
      exam.answers[exam.at] = exam.answers[exam.at] === idx ? null : idx;
      saveExam();
      drawExamQuestion(idx);
    });
    box.appendChild(b);
  });

  var pal = el("palette");
  exam.ids.forEach(function (id, i) {
    var b = document.createElement("button");
    b.textContent = i + 1;
    b.className = (i === exam.at ? "on" : "") + (exam.answers[i] !== null ? " done" : "");
    b.title = "Question " + (i + 1);
    b.setAttribute("aria-label", b.title + (exam.answers[i] === null ? ", unanswered" : ", answered"));
    if (i === exam.at) b.setAttribute("aria-current", "step");
    b.addEventListener("click", function () { exam.at = i; saveExam(); drawExamQuestion("question"); });
    pal.appendChild(b);
  });

  el("prev").addEventListener("click", function () {
    if (exam.at > 0) { exam.at--; saveExam(); drawExamQuestion("question"); }
  });
  el("next").addEventListener("click", function () {
    if (exam.at < exam.ids.length - 1) { exam.at++; saveExam(); drawExamQuestion("question"); }
  });
  el("finish").addEventListener("click", function () {
    var blank = exam.answers.filter(function (x) { return x === null; }).length;
    var msg = blank ? "You have " + blank + " unanswered. Finish anyway?" : "Finish the exam?";
    if (confirm(msg)) finishExam();
  });

  if (focusTarget === "question") el("exam-question").focus();
  else if (typeof focusTarget === "number") box.children[focusTarget].focus();

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
      '<p class="question-meta">' + esc(q.id) + " &middot; " + questionReport(q) + "</p>" +
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

function missedPage(bookmarks) {
  // /missed?view=bookmarks was the address for about a day. Send it to its own page.
  if (!bookmarks && new URLSearchParams(location.search).get("view") === "bookmarks") {
    return go("/bookmarks");
  }
  var topic = bookmarks ? "__bookmarks" : "__missed";
  var missed = bookmarks ? bookmarkedFor(division) : missedFor(division);
  if (!missed.length) {
    var elsewhere = missedElsewhere(division);
    el("main").innerHTML = '<div class="wrap"><div class="eyebrow">' + division +
      " division</div><h1>" + (bookmarks ? "Bookmarked questions" : "Missed questions") + "</h1>" +
      '<p class="empty">' + (bookmarks ? "No bookmarks in this division yet. Use Bookmark question while practicing to save one here."
        : "Questions you get wrong in practice or on a mock exam land here. Getting one right removes it.") +
      (!bookmarks && elsewhere ? " You do have " + elsewhere + " missed in the other division." : "") +
      '</p><div class="btn-row"><a class="btn" href="/practice">Back to practice</a></div></div>';
    return;
  }
  var reviewIds = missed.map(function (q) { return q.id; }).sort().join(",");
  if (!quiz || quiz.topic !== topic || quiz.division !== division || quiz.reviewIds !== reviewIds) {
    quiz = { topic: topic, division: division, reviewIds: reviewIds,
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
    var st = problemProgress(p.id);
    html += '<a class="card" href="/problem/' + p.id + '"><h3>' + esc(p.title) + "</h3><p>" +
      esc(p.blurb) + '</p><div class="card-foot"><span class="chip">' +
      CONTEST_NAMES[p.contest] + '</span><span class="chip">' + esc(p.fname) + "</span>" +
      (st.solved ? '<span class="chip ok">' + (st.assisted ? "solved with solution" : "solved independently") + "</span>" : "") +
      (st.solutionViewed ? '<span class="chip">solution seen</span>' : "") +
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
      '<div class="ws-split" id="ws-split" role="separator" aria-orientation="vertical" ' +
        'tabindex="0" aria-label="Resize the editor. Arrow keys move it, Home resets it." ' +
        'title="Drag to resize. Double click to reset."></div>' +
      '<div class="ws-right">' +
        '<div class="ws-bar">' +
          '<label for="lang" class="ws-label">Language</label>' +
          '<select id="lang"></select>' +
          '<button class="btn btn-ghost" id="reset">Reset code</button>' +
          '<span class="fontsize"><button class="btn btn-ghost" id="font-down" ' +
            'aria-label="Smaller text" title="Smaller text">A&minus;</button>' +
          '<button class="btn btn-ghost" id="font-up" aria-label="Larger text" ' +
            'title="Larger text">A+</button></span>' +
          '<span class="spacer"></span>' +
          '<button class="btn btn-ghost" id="toggle-input">Custom input</button>' +
          '<button class="btn" id="run" title="Run the six visible tests' + META + '-Enter">' +
            "Run visible tests</button>" +
          '<button class="btn btn-primary" id="submit" title="Run all twelve' + META
            + '-Shift-Enter">Submit</button>' +
        "</div>" +
        '<p class="editor-hint" id="editor-hint">Tab indents code. Escape moves focus to the toolbar.</p>' +
        '<div class="driver-notice" id="driver-notice" hidden>' +
          '<span>The driver below your function has been updated since you started this problem. ' +
          'Yours still works, but it reads input slightly differently from the one the solutions ' +
          'use. Resetting picks up the new one and discards what is in the editor.</span>' +
          '<button class="linkish" id="driver-reset">Reset code</button>' +
          '<button class="linkish" id="driver-dismiss">Not now</button>' +
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

  function resetCode() {
    if (!confirm("Replace the editor with the original starter code?")) return;
    cancelRun();
    el("results").hidden = true;
    cm.setValue(curProblem.starter[curLang]);
    stash();
    showDriverNotice();
  }
  el("reset").addEventListener("click", resetCode);
  el("driver-reset").addEventListener("click", resetCode);
  el("driver-dismiss").addEventListener("click", function () {
    driverAcked[curProblem.id + ":" + curLang] = true;
    showDriverNotice();
  });
  el("run").addEventListener("click", function () { execute(false); });
  el("submit").addEventListener("click", function () { execute(true); });

  // ACSL tells you in every problem to make up test data of your own, so make that possible.
  var lines = p.samples[0]["in"].length;
  el("editor-host").title = "Comment or uncomment the selection with" + META + "-/";
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
    screenReaderLabel: "Source code editor",
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    smartIndent: true,
    electricChars: true,
    matchBrackets: true,
    // Typing an opening bracket or quote writes the closing one and leaves the cursor between
    // them, and Enter inside a pair opens an indented line with the closer below. This is an
    // editing aid in the same family as the auto-indent, not completion: nothing is ever
    // suggested and no identifier is ever filled in.
    //
    // triples covers Python docstrings and Java text blocks, where without it a third quote
    // would land outside the pair the first two just made.
    autoCloseBrackets: { triples: "'\"" },
    styleActiveLine: true,
    // Long lines reflow instead of running off to the right. The editor shares its width with
    // the problem and that width is now draggable, so narrowing the pane to read the statement
    // should shorten the code, not hide it behind a scrollbar.
    lineWrapping: true,
    extraKeys: {
      Esc: function () { (el("run").disabled ? el("lang") : el("run")).focus(); },
      Tab: function (c) {
        if (c.somethingSelected()) c.indentSelection("add");
        else c.replaceSelection("    ", "end");
      },
      "Shift-Tab": function (c) { c.indentSelection("subtract"); },
      // Comment out the selection, or the current line. The mode decides the syntax, so this
      // is # in Python and // in Java and C++ without the editor being told which.
      "Ctrl-/": "toggleComment",
      "Cmd-/": "toggleComment",
      // Every judge and IDE runs on one of these. During a thirty minute paper, reaching for
      // the mouse after each edit is a real cost.
      "Ctrl-Enter": function () { var b = el("run"); if (b && !b.disabled) b.click(); },
      "Cmd-Enter": function () { var b = el("run"); if (b && !b.disabled) b.click(); },
      "Shift-Ctrl-Enter": function () { var b = el("submit"); if (b && !b.disabled) b.click(); },
      "Shift-Cmd-Enter": function () { var b = el("submit"); if (b && !b.disabled) b.click(); }
    }
  });
  cm.getInputField().setAttribute("aria-label", "Source code editor");
  cm.getInputField().setAttribute("aria-describedby", "editor-hint");
  window.__cm = cm;
  applyFontSize();
  wireFontSize();
  wireSplit();
  cm.on("change", function () { stash(); });
  loadCode();
  // The editor is inside a flex column, so its height is only final after layout. Capture the
  // instance rather than reading `cm`, which is null again if the user has already navigated on.
  var mine = cm;
  requestAnimationFrame(function () { mine.refresh(); });
  setTimeout(function () { mine.refresh(); }, 150);
}

// ------------------------------------------------------- editor size and text size

var FONT_MIN = 11, FONT_MAX = 22, FONT_DEFAULT = 13;

function fontSize() {
  var n = parseInt(store("editor-font", FONT_DEFAULT), 10);
  return (n >= FONT_MIN && n <= FONT_MAX) ? n : FONT_DEFAULT;
}

function applyFontSize() {
  if (!cm) return;
  cm.getWrapperElement().style.fontSize = fontSize() + "px";
  cm.refresh();
}

function wireFontSize() {
  var step = function (by) {
    return function () {
      var n = Math.max(FONT_MIN, Math.min(FONT_MAX, fontSize() + by));
      save("editor-font", n);
      applyFontSize();
    };
  };
  el("font-down").addEventListener("click", step(-1));
  el("font-up").addEventListener("click", step(1));
}

// The split is stored as a fraction of the workspace, not a pixel count, so it survives a
// window resize and a different monitor rather than pinning the editor to a width that made
// sense somewhere else.
function splitFraction() {
  var f = parseFloat(store("ws-split", 0.44));
  return (f >= 0.2 && f <= 0.75) ? f : 0.44;
}

function applySplit() {
  var left = el("ws-left");
  if (!left) return;
  left.style.flex = "0 0 " + (splitFraction() * 100).toFixed(2) + "%";
  left.style.maxWidth = "none";
  if (cm) cm.refresh();
}

function wireSplit() {
  applySplit();
  var bar = el("ws-split"), ws = bar.parentNode, dragging = false;

  var setFromX = function (x) {
    var box = ws.getBoundingClientRect();
    var f = (x - box.left) / box.width;
    save("ws-split", Math.max(0.2, Math.min(0.75, f)));
    applySplit();
  };

  bar.addEventListener("pointerdown", function (e) {
    dragging = true;
    bar.setPointerCapture(e.pointerId);
    bar.classList.add("dragging");
    e.preventDefault();
  });
  bar.addEventListener("pointermove", function (e) { if (dragging) setFromX(e.clientX); });
  var stop = function () { dragging = false; bar.classList.remove("dragging"); };
  bar.addEventListener("pointerup", stop);
  bar.addEventListener("pointercancel", stop);
  bar.addEventListener("dblclick", function () { save("ws-split", 0.44); applySplit(); });

  // Draggable things need to work from the keyboard too.
  bar.addEventListener("keydown", function (e) {
    var f = splitFraction();
    if (e.key === "ArrowLeft") f -= 0.02;
    else if (e.key === "ArrowRight") f += 0.02;
    else if (e.key === "Home") f = 0.44;
    else return;
    e.preventDefault();
    save("ws-split", Math.max(0.2, Math.min(0.75, f)));
    applySplit();
  });
}

function stash() {
  if (cm && curProblem) save(codeKey(curProblem.id, curLang), cm.getValue());
}

// The driver ships inside the editable template, so it becomes part of whatever a student
// saves. Change it and they keep the old one until they reset, which is the right trade but
// leaves the two disagreeing quietly. The difference only shows in Run with this input, where
// it looks like a bug in their own code, so say it out loud instead. Dismissal lasts the
// session: they cannot act on this without losing work, and nagging every reload is worse.
var DRIVER_BANNER = "----- driver code: leave this alone -----";
var driverAcked = {};

function driverOf(text) {
  var at = text.indexOf(DRIVER_BANNER);
  return at < 0 ? null : text.slice(at);
}

function showDriverNotice() {
  var box = el("driver-notice");
  if (!box || !curProblem) return;
  var saved = store(codeKey(curProblem.id, curLang), null);
  var mine = typeof saved === "string" ? driverOf(saved) : null;
  var current = driverOf(curProblem.starter[curLang]);
  box.hidden = !(mine && current && mine !== current
                 && !driverAcked[curProblem.id + ":" + curLang]);
}

function loadCode() {
  cancelRun();
  el("results").hidden = true;
  var saved = store(codeKey(curProblem.id, curLang), null);
  cm.setOption("mode", LANGS.filter(function (l) { return l.id === curLang; })[0].mode);
  cm.setValue(saved === null ? curProblem.starter[curLang] : saved);
  cm.refresh();
  showDriverNotice();
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
  var gaveUp = problemProgress(p.id).solutionViewed;
  var visible = p.tests.slice(0, 6);
  var hidden = p.tests.slice(6);

  var html =
    '<div class="eyebrow"><a href="/problems">Programming problems</a> &middot; ' +
      CONTEST_NAMES[p.contest] + " &middot; " + p.division + " division</div>" +
    "<h1>" + esc(p.title) + "</h1>" +
    '<a class="btn jump-editor" href="#editor-host" id="jump-editor">Jump to editor</a>' +

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

    '<h2 class="sec">Hints</h2><p class="note">They get more specific, and opening one closes the other. Neither marks the solution as viewed.</p>' +
    (p.hints || []).map(function (hint, i) {
      return '<details class="hint" name="hint"><summary>Hint ' + (i + 1) + '</summary><p>' + esc(hint) + '</p></details>';
    }).join("") +
    '<div class="btn-row"><button class="btn" id="giveup">' +
    (gaveUp ? "Solution shown below" : "Show the solution") + "</button></div>" +
    '<div id="solution"></div>';

  el("ws-left").innerHTML = html;
  el("jump-editor").addEventListener("click", function (e) {
    e.preventDefault();
    el("editor-host").scrollIntoView({ block: "start" });
    if (cm) cm.focus();
  });
  var gb = el("giveup");
  gb.disabled = gaveUp;
  gb.addEventListener("click", function () {
    if (!confirm("Show the reference solution and all twelve test cases? This will mark the "
                 + "solution as viewed.")) return;
    recordProblem(p.id, "view");
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
  if (r.status === 429) {
    return { status: "error", message: "Too many runs from your network in a short space of "
             + "time. The limit is shared by everyone on the same connection, so if your whole "
             + "class is submitting at once, give it a minute and try again." };
  }
  if (r.status === 403) {
    return { status: "error", message: "The runner refused this request. Open the problem on "
             + "this site and try again." };
  }
  return { status: "error", message: "The code runner could not be reached just now (HTTP "
           + r.status + "). Try again in a moment." };
}

// A result belongs to the editor, language, and problem that submitted it.
var activeRun = null;

function runButtons(disabled) {
  ["run", "submit", "run-custom"].forEach(function (id) {
    var b = el(id);
    if (b) b.disabled = disabled;
  });
}

function cancelRun() {
  if (activeRun) activeRun.controller.abort();
  activeRun = null;
  runButtons(false);
}

function requestRun(stdin, done) {
  cancelRun();
  var run = { controller: new AbortController(), editor: cm,
              problem: curProblem, lang: curLang };
  activeRun = run;
  runButtons(true);
  function current() {
    return activeRun === run && cm === run.editor
      && curProblem === run.problem && curLang === run.lang;
  }
  return fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: run.controller.signal,
    body: JSON.stringify({ lang: run.lang, code: run.editor.getValue(), stdin: stdin })
  }).then(runnerResponse)
    .then(function (res) { if (current()) done(res); })
    .catch(function (e) {
      if (!current() || e.name === "AbortError") return;
      showResults('<span class="st no">Error</span><span>could not reach the code runner</span>',
                  '<div class="res-detail">' + esc(e.message) + "</div>");
    })
    .finally(function () {
      if (current()) { activeRun = null; runButtons(false); }
    });
}

function execute(full) {
  var p = curProblem;
  var cases = full ? p.tests : p.tests.slice(0, 6);
  var stdin = cases.map(function (c) { return c["in"].join("\n"); }).join("\n") + "\n";
  showResults('<span class="muted">Compiling and running ' + cases.length
              + " test cases...</span>", "");
  return requestRun(stdin, function (res) { report(res, cases, full); });
}

function runCustom() {
  var text = el("stdin-box").value;
  if (!text.trim()) return showResults('<span class="st no">Nothing to run</span>'
                                       + "<span>the input box is empty</span>", "");
  showResults('<span class="muted">Running your own input...</span>', "");
  return requestRun(text.replace(/\s+$/, "") + "\n", function (res) {
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
    });
}

// ------------------------------------------------------- comparing two output lines

// Where the two strings stop agreeing at each end. A failed case is usually a trailing space
// or one wrong character, which is exactly the difference the eye slides over when the two
// lines sit above each other.
function divergence(a, b) {
  var max = Math.min(a.length, b.length), i = 0;
  while (i < max && a.charAt(i) === b.charAt(i)) i++;
  var j = 0;
  while (j < max - i && a.charAt(a.length - 1 - j) === b.charAt(b.length - 1 - j)) j++;
  return { from: i, aTo: a.length - j, bTo: b.length - j };
}

// Spaces and tabs are shown as glyphs, but only inside the marked span, so the rest of the
// line stays readable. An invisible character is the whole reason a line can look identical
// and still be wrong.
function showBlanks(s) {
  return esc(s).replace(/ /g, '<i class="blank">\u00b7</i>')
               .replace(/\t/g, '<i class="blank">\u2192</i>');
}

function markDiff(s, from, to) {
  if (from >= to) {
    // Nothing of this string differs, so the other one has extra characters here. Mark the
    // seam rather than nothing at all, or a missing character shows up as no highlight.
    return esc(s.slice(0, from)) + '<mark class="d gap"></mark>' + esc(s.slice(from));
  }
  return esc(s.slice(0, from)) + '<mark class="d">' + showBlanks(s.slice(from, to)) + "</mark>"
       + esc(s.slice(to));
}

// Say the difference in words when it has a name. Someone staring at two lines that look the
// same needs to be told the reason they look the same.
function diffHint(exp, got) {
  if (got === null) return "your program printed no line here at all";
  if (exp === got) return "";
  if (got === "") return "your program printed an empty line here";
  if (exp.trim() === got.trim()) return "the text matches, only the surrounding spaces differ";
  if (exp.replace(/\s+/g, " ").trim() === got.replace(/\s+/g, " ").trim()) {
    return "the same values, spaced differently";
  }
  if (exp.toLowerCase() === got.toLowerCase()) return "only the letter case differs";
  if (exp.length !== got.length && (exp.indexOf(got) === 0 || got.indexOf(exp) === 0)) {
    return got.length < exp.length ? "your line stops early" : "your line has extra on the end";
  }
  return "";
}

function comparison(exp, got) {
  var hint = diffHint(exp, got);
  if (got === null) {
    return '<div class="cmp"><span class="lbl">expected</span><code>' + esc(exp) + "</code>" +
           '<span class="lbl">got</span><code class="none">nothing</code>' +
           '<span class="lbl"></span><span class="why">' + hint + "</span></div>";
  }
  var d = divergence(exp, got);
  return '<div class="cmp">' +
    '<span class="lbl">expected</span><code>' + markDiff(exp, d.from, d.aTo) + "</code>" +
    '<span class="lbl">got</span><code>' + markDiff(got, d.from, d.bTo) + "</code>" +
    (hint ? '<span class="lbl"></span><span class="why">' + hint + "</span>" : "") +
    "</div>";
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
    if (!ok && !hiddenCase) html += comparison(c.out, got);
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

  var accepted = res.status === "ok" && pass === cases.length && lines.length === cases.length;
  // The summary must distinguish matching output from a successful submission.
  showResults('<span class="st ' + (accepted ? "ok" : "no") + '">' + pass + " / "
              + cases.length + "</span><span>"
              + (full ? "all twelve test cases" : "the six visible test cases")
              + (res.status !== "ok" ? ", runtime error" : "")
              + (lines.length > cases.length ? ", extra output" : "")
              + (res.stderr ? ", and the program wrote to stderr" : "") + "</span>",
              html);

  if (full && accepted) {
    recordProblem(curProblem.id, "solve");
  }
}

// ------------------------------------------------------------------ not found

var SECTIONS = ["guide", "practice", "exam", "missed", "bookmarks", "problems", "problem"];

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
  cancelRun();
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
  } else if (r.section === "missed" || r.section === "bookmarks") {
    missedPage(r.section === "bookmarks");
  } else if (r.section === "problems") {
    problemsIndex();
  } else if (r.section === "problem") {
    problemPage(r.arg);
  } else {
    if (r.arg) guidePage(r.arg); else guideIndex();
  }
}

// Backups contain only recognized study data. Validate the complete file before writing.
function validSavedEntry(key, value) {
  if (key === "division") return value === "junior" || value === "senior";
  if (key === "theme") return value === "dark" || value === "light";
  if (key === "lang") return LANGS.some(function (lang) { return lang.id === value; });
  if (key === "editor-font") return Number.isInteger(value) && value >= 11 && value <= 22;
  if (key === "ws-split") return typeof value === "number" && value >= 0.2 && value <= 0.75;
  if (key === "exam") return value === null || !!validExam(value);
  var parts = key.split(":");
  if (parts[0] === "q" || parts[0] === "bookmark") {
    return typeof value === "boolean" && !!questionById(parts.slice(1).join(":"));
  }
  if (!problemById(parts[1])) return false;
  if (parts[0] === "code" && parts.length === 3) {
    return LANGS.some(function (lang) { return lang.id === parts[2]; })
      && typeof value === "string" && value.length <= 5 * 1024 * 1024;
  }
  if (parts[0] === "stdin" && parts.length === 2) return typeof value === "string" && value.length <= 5 * 1024 * 1024;
  if (parts[0] === "frq" && parts.length === 2) {
    if (value === "solved" || value === "gaveup") return true;
    return !!value && !Array.isArray(value) && Object.keys(value).length === 3
      && typeof value.solved === "boolean" && typeof value.solutionViewed === "boolean"
      && typeof value.assisted === "boolean" && (!value.assisted || (value.solved && value.solutionViewed));
  }
  return false;
}

function backupData() {
  var entries = {};
  Object.keys(localStorage).forEach(function (key) {
    if (!key.startsWith("acsl:")) return;
    var short = key.slice(5), value = store(short, null);
    if (validSavedEntry(short, value)) entries[short] = value;
  });
  var data = { version: 1, entries: entries };
  validateBackup(data);
  return data;
}

function validateBackup(data) {
  if (!data || data.version !== 1 || !data.entries || typeof data.entries !== "object"
      || Array.isArray(data.entries)) throw new Error("Choose a version 1 ACSL backup file.");
  var keys = Object.keys(data.entries);
  if (keys.length > 20000) throw new Error("This backup has too many entries.");
  keys.forEach(function (key) {
    if (!validSavedEntry(key, data.entries[key])) throw new Error("Invalid backup entry: " + key.slice(0, 80));
  });
  return keys;
}

function restoreBackup(data) {
  var keys = validateBackup(data), previous = new Map();
  // Read all old values first, so a read failure cannot interrupt a partial restore.
  keys.forEach(function (key) { previous.set(key, localStorage.getItem("acsl:" + key)); });
  try {
    keys.forEach(function (key) { localStorage.setItem("acsl:" + key, JSON.stringify(data.entries[key])); });
  } catch (error) {
    var restored = true;
    previous.forEach(function (value, key) {
      try {
        if (value === null) localStorage.removeItem("acsl:" + key);
        else localStorage.setItem("acsl:" + key, value);
      } catch (e) { restored = false; }
    });
    throw new Error(restored ? "Import failed. Your previous data was restored. Free some browser storage and try again."
      : "Import stopped and the browser could not restore every previous value. Keep your backup file and export the current data before continuing.");
  }
}

el("export-progress").addEventListener("click", function () {
  try {
    var blob = new Blob([JSON.stringify(backupData(), null, 2)], { type: "application/json" });
    if (blob.size > 25 * 1024 * 1024) throw new Error("Study data exceeds the 25 MB backup limit. Copy your code before clearing older progress.");
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "acsl-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    el("backup-status").textContent = "Backup downloaded. It includes saved code and stays on your device.";
  } catch (e) { el("backup-status").textContent = "Could not export: " + e.message; }
});
el("import-progress").addEventListener("click", function () { el("backup-file").click(); });
el("backup-file").addEventListener("change", async function () {
  var file = this.files[0];
  this.value = "";
  if (!file) return;
  try {
    if (file.size > 25 * 1024 * 1024) throw new Error("The backup must be smaller than 25 MB.");
    var data = JSON.parse(await file.text());
    var keys = validateBackup(data);
    if (!keys.length) throw new Error("This backup contains no study data.");
    if (!confirm("Import " + keys.length + " saved entries? Matching answers, code, and settings in this browser will be replaced. Other saved work will stay.")) return;
    restoreBackup(data);
    location.reload();
  } catch (e) { el("backup-status").textContent = e.message; }
});

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
if (/^#\/?(guide|practice|exam|missed|problems|problem)(\/|$)/.test(location.hash)) {
  history.replaceState(null, "", "/" + location.hash.replace(/^#\/?/, ""));
} else if (location.hash === "#" || location.hash === "#/") {
  history.replaceState(null, "", "/");
}

render();

})();
