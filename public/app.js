/* SFHS ACSL Guide
   Hash routed, no framework. State that matters: which division you are studying for,
   which topic you are on, and per problem code kept in localStorage. */

(function () {
"use strict";

var TOPICS = window.TOPICS, GUIDE = window.GUIDE, MCQ = window.MCQ, FRQ = window.FRQ;

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
  try { localStorage.setItem("acsl:" + key, JSON.stringify(val)); } catch (e) {}
}

var division = store("division", "senior");
var theme = store("theme", "dark");
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
function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ------------------------------------------------------------------ routing

function route() {
  var h = location.hash.replace(/^#\/?/, "");
  var parts = h ? h.split("/") : [];
  return { section: parts[0] || "guide", arg: parts[1] || null };
}

function go(hash) { location.hash = hash; }

window.addEventListener("hashchange", render);
window.addEventListener("resize", function () { if (cm) cm.refresh(); });

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
    if (!t || (t.div !== "both" && t.div !== division)) return go("#/" + r.section);
  }
  if (r.section === "problem") {
    var p = problemById(r.arg);
    if (p && p.division.toLowerCase() !== division) return go("#/problems");
  }
  render();
});

el("theme-btn").addEventListener("click", function () {
  theme = theme === "dark" ? "light" : "dark";
  save("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  if (window.__cm) window.__cm.setOption("theme", theme === "dark" ? "material-darker" : "default");
});

function paintChrome(section) {
  var links = el("section-tabs").querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    var s = links[i].getAttribute("data-section");
    var on = s === section || (section === "problem" && s === "problems");
    links[i].classList.toggle("on", on);
  }
  var btns = el("division-switch").querySelectorAll("button");
  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.toggle("on", btns[j].getAttribute("data-div") === division);
  }
}

// ------------------------------------------------------------------ sidebar

function renderSidebar(section, active) {
  var side = el("sidebar");
  if (section === "problem" || section === "problems") {
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
    html += '<a class="side-link' + (t.id === active ? " on" : "") + '" href="#/' +
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
    "the mistakes that actually cost points.</p>";
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
    a.href = "#/guide/" + t.id;
    a.innerHTML = "<h3>" + esc(t.name) + "</h3><p>" + esc(t.blurb) + "</p>";
    g.appendChild(a);
  });
}

function guidePage(topicId) {
  var t = topicById(topicId);
  if (!t || !GUIDE[topicId]) return guideIndex();
  var qs = questionsFor(topicId, division);
  var foot = '<h2>Practice this</h2><div class="btn-row">' +
    '<a class="btn btn-primary" href="#/practice/' + topicId + '">' + qs.length +
    " short answer questions</a>" +
    '<a class="btn" href="#/problems">Programming problems</a>' +
    "</div>";
  el("main").innerHTML = '<div class="wrap">' +
    '<div class="eyebrow">' + CONTEST_NAMES[t.contest] + " &middot; " + division + " division</div>" +
    "<h1>" + esc(t.name) + "</h1>" + GUIDE[topicId] + foot + "</div>";
}

// ------------------------------------------------------------------ practice

function practiceIndex() {
  var list = topicsFor(division);
  var html = '<div class="wrap-wide"><div class="eyebrow">' + division + " division</div>" +
    "<h1>Practice</h1><p class=\"note\">Pick a category. Every question shows its reasoning " +
    "once you answer, right or wrong.</p><div class=\"grid\">";
  list.forEach(function (t) {
    var qs = questionsFor(t.id, division);
    var right = qs.filter(function (q) { return store("q:" + q.id, null) === true; }).length;
    html += '<a class="card" href="#/practice/' + t.id + '"><h3>' + esc(t.name) + "</h3>" +
      "<p>" + esc(t.blurb) + '</p><div class="card-foot">' +
      '<span class="chip">' + qs.length + " questions</span>" +
      (right ? '<span class="chip ok">' + right + " correct</span>" : "") +
      "</div></a>";
  });
  html += "</div>";
  var probs = problemsFor(division);
  if (probs.length) {
    html += "<h2>Programming problems</h2><div class=\"grid\">";
    probs.forEach(function (p) {
      html += '<a class="card" href="#/problem/' + p.id + '"><h3>' + esc(p.title) + "</h3>" +
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
  if (!t) return practiceIndex();
  var qs = questionsFor(topicId, division);
  if (!qs.length) {
    el("main").innerHTML = '<div class="wrap"><h1>' + esc(t.name) +
      '</h1><p class="empty">No questions in this category for the ' + division +
      " division yet.</p></div>";
    return;
  }
  if (!quiz || quiz.topic !== topicId || quiz.division !== division) {
    quiz = { topic: topicId, division: division, list: shuffle(qs.slice()), i: 0,
             picked: null, right: 0, seen: 0 };
  }
  drawQuestion();
}

function drawQuestion() {
  var t = topicById(quiz.topic);
  var q = quiz.list[quiz.i];
  var html = '<div class="wrap">' +
    '<div class="eyebrow"><a href="#/practice">Practice</a> &middot; ' +
    CONTEST_NAMES[t.contest] + "</div><h1>" + esc(t.name) + "</h1>" +
    '<div class="quiz-head"><span class="quiz-count">Question ' + (quiz.i + 1) + " of " +
    quiz.list.length + "</span>" +
    '<a class="note" href="#/guide/' + t.id + '">Read the guide for this category</a>' +
    '<span class="quiz-score">' + quiz.right + " / " + quiz.seen + "</span></div>" +
    '<div class="qtext">' + q.q + "</div>" +
    '<div class="choices" id="choices"></div>' +
    '<div id="after"></div></div>';
  el("main").innerHTML = html;

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
  var last = quiz.i === quiz.list.length - 1;
  el("after").innerHTML =
    '<div class="explain"><h4><span class="verdict ' + (ok ? "ok" : "no") + '">' +
    (ok ? "Correct" : "Not quite") + "</span></h4>" + q.why + "</div>" +
    '<div class="btn-row">' +
    (last ? '<button class="btn" id="restart">Start over</button>'
          : '<button class="btn btn-primary" id="next">Next question</button>') +
    '<a class="btn btn-ghost" href="#/practice">All categories</a>' +
    '<span class="note">Question id ' + q.id + "</span></div>";
  var nb = el("next");
  if (nb) nb.addEventListener("click", function () {
    quiz.i++; quiz.picked = null; drawQuestion();
  });
  var rb = el("restart");
  if (rb) rb.addEventListener("click", function () {
    quiz = null; practicePage(q.topic);
  });
}

function answer(idx) {
  if (quiz.picked !== null) return;
  var q = quiz.list[quiz.i];
  quiz.picked = idx;
  quiz.seen++;
  if (idx === q.ans) quiz.right++;
  save("q:" + q.id, idx === q.ans);
  paintAnswer();
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
    html += '<a class="card" href="#/problem/' + p.id + '"><h3>' + esc(p.title) + "</h3><p>" +
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
  if (!p) return problemsIndex();
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
          '<select id="lang"></select>' +
          '<button class="btn btn-ghost" id="reset">Reset code</button>' +
          '<span class="spacer"></span>' +
          '<button class="btn" id="run">Run visible tests</button>' +
          '<button class="btn btn-primary" id="submit">Submit</button>' +
        "</div>" +
        '<div class="editor-host" id="editor-host"></div>' +
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

  el("reset").addEventListener("click", function () {
    if (!confirm("Replace the editor with the original starter code?")) return;
    cm.setValue(curProblem.starter[curLang]);
    stash();
  });
  el("run").addEventListener("click", function () { execute(false); });
  el("submit").addEventListener("click", function () { execute(true); });
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
    '<div class="eyebrow"><a href="#/problems">Programming problems</a> &middot; ' +
      CONTEST_NAMES[p.contest] + " &middot; " + p.division + " division</div>" +
    "<h1>" + esc(p.title) + "</h1>" +

    '<h3 class="sec">Problem</h3>' + p.statement +
    '<h3 class="sec">Example</h3>' + p.example +
    '<h3 class="sec">Input</h3><p>' + p.input_spec + "</p>" +
    '<h3 class="sec">Output</h3><p>' + p.output_spec + "</p>" +

    '<h3 class="sec">Sample input and output</h3>' +
    dataList(p.samples, null, 1) +

    '<h3 class="sec">Test data 1 to 6</h3>' +
    '<p class="note">Shown to you, the same way ACSL shows the first half.</p>' +
    dataList(visible, null, 1) +

    '<h3 class="sec">Test data 7 to 12</h3>' +
    '<p class="note">Six sealed cases. You cannot see the inputs or the answers, exactly as in ' +
    "a real contest. Submitting tells you which ones pass. Giving up unseals them.</p>" +
    dataList(hidden, gaveUp ? null : 0, 7) +

    '<h3 class="sec">Task</h3>' +
    "<p>Complete the function <code>" + esc(p.fname) + "</code>.</p>" + p.task +
    "<p>You may create additional functions that are called from <code>" + esc(p.fname) +
    "</code> if needed in solving the problem.</p>" +

    '<h3 class="sec">Constraints</h3><p>' + p.constraints + "</p>" +

    '<h3 class="sec">Data provided</h3>' +
    "<p>There are 3 sets of sample data for debugging and 12 sets of test data for scoring. " +
    "The last 6 are hidden. The test cases vary in difficulty, and you should make up sample " +
    "data of your own to test your program properly.</p>" +

    '<div class="btn-row"><button class="btn btn-danger" id="giveup">' +
    (gaveUp ? "Solution shown below" : "Give up and show the solution") + "</button></div>" +
    '<div id="solution"></div>';

  el("ws-left").innerHTML = html;
  var gb = el("giveup");
  gb.disabled = gaveUp;
  gb.addEventListener("click", function () {
    if (!confirm("This reveals the full solution and unlocks the hidden test data. Sure?")) return;
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
  el("results-summary").innerHTML = summary;
  el("console").innerHTML = detail || "";
  collapseResults(false);
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
  }).then(function (r) { return r.json(); })
    .then(function (res) { report(res, cases, full); })
    .catch(function (e) {
      showResults('<span class="st no">Error</span><span>could not reach the code runner</span>',
                  '<div class="res-detail">' + esc(e.message) + "</div>");
    })
    .then(function () { el("run").disabled = false; el("submit").disabled = false; });
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

// ------------------------------------------------------------------ render

function render() {
  var r = route();
  el("main").classList.remove("flush");
  el("main").scrollTop = 0;
  window.scrollTo(0, 0);
  cm = null; curProblem = null; window.__cm = null;

  paintChrome(r.section);
  renderSidebar(r.section, r.arg);
  // The problem workspace is a full height split, so a footer under it would fight the layout.
  el("footer").classList.toggle("hidden", r.section === "problem");

  if (r.section === "practice") {
    if (r.arg) practicePage(r.arg); else practiceIndex();
  } else if (r.section === "problems") {
    problemsIndex();
  } else if (r.section === "problem") {
    problemPage(r.arg);
  } else {
    if (r.arg) guidePage(r.arg); else guideIndex();
  }
}

document.getElementById("wipe").addEventListener("click", function () {
  if (!confirm("Forget every answer, every saved program, and your division? This cannot be "
               + "undone.")) return;
  try {
    Object.keys(localStorage)
      .filter(function (k) { return k.indexOf("acsl:") === 0; })
      .forEach(function (k) { localStorage.removeItem(k); });
  } catch (e) {}
  location.reload();
});

render();

})();
