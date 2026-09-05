/* Generated practice questions.

   Six of the ACSL categories are pure mechanics: there is one right answer and a procedure
   that always finds it. Those do not need a hand written bank, they need a machine, and a
   machine never runs out. Everything here builds a question and its own answer from a seed,
   so the same seed always gives the same question and content/checkgen.py can recompute
   every answer against the independent implementations in content/solvers.py.

   Each question carries a `check`, a Python expression in the same form the hand written
   bank uses, which is what makes that cross check possible. Where a generator can afford
   to, it works structurally, over the expression tree it built, and leaves the parsing of
   the rendered string to the Python side. A precedence bug in the renderer then shows up
   as a disagreement rather than as a question that is quietly wrong in both places. */

window.GEN = (function () {
"use strict";

// ------------------------------------------------------------------ randomness

// mulberry32. Small, seedable, and good enough for choosing operands.
function makeRng(seed) {
  var a = seed >>> 0;
  return function () {
    a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function int(r, lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }
function pick(r, xs) { return xs[Math.floor(r() * xs.length)]; }

function shuffled(r, xs) {
  var a = xs.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Five options, the right one among them. Distractors arrive best first and are taken until
// there are enough distinct ones; a generator that cannot think of five gets padded rather
// than shipping a question with a duplicate option in it.
function options(r, correct, distractors, pad) {
  var seen = {}, out = [];
  correct = String(correct);
  seen[correct] = 1;
  for (var i = 0; i < distractors.length && out.length < 4; i++) {
    var d = String(distractors[i]);
    // A negative count next to four sensible ones gives the answer away. Only a negative
    // number, though: a prefix expression legitimately starts with a minus sign.
    if (!seen[d] && d !== "" && !/^-\d+$/.test(d)) { seen[d] = 1; out.push(d); }
  }
  for (var guard = 0; out.length < 4 && guard < 200; guard++) {
    var p = String(pad(r, guard));
    if (!seen[p] && p !== "") { seen[p] = 1; out.push(p); }
  }
  var choices = shuffled(r, out.concat([correct]));
  return { choices: choices, ans: choices.indexOf(correct) };
}

function esc(s) {
  return String(s).replace(/[&<>]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
  });
}
function code(s) { return "<code>" + esc(s) + "</code>"; }
function steps(rows) {
  return '<pre class="steps"><code>' + rows.map(esc).join("\n") + "</code></pre>";
}
function py(s) { return JSON.stringify(String(s)); }

var WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
             "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"];

// ------------------------------------------------------------------ number systems

var DIGITS = "0123456789ABCDEF";

function toBase(n, b) {
  var s = "";
  while (n > 0) { s = DIGITS.charAt(n % b) + s; n = Math.floor(n / b); }
  return s || "0";
}
function fromBase(s, b) {
  var n = 0;
  for (var i = 0; i < s.length; i++) n = n * b + DIGITS.indexOf(s.charAt(i));
  return n;
}
function baseName(b) { return b === 2 ? "binary" : b === 8 ? "octal" : "hexadecimal"; }
function sub(s, b) { return code(s) + "<sub>" + b + "</sub>"; }

function numberSystems(r) {
  var bases = [2, 8, 16];
  var from = pick(r, bases);
  var to = pick(r, bases.filter(function (b) { return b !== from; }));

  if (r() < 0.45) {
    // Straight conversion.
    var v = int(r, 40, 4000);
    var src = toBase(v, from), want = toBase(v, to);
    var chain = [];
    for (var n = v; n > 0; n = Math.floor(n / to)) {
      chain.push(n + " / " + to + " = " + Math.floor(n / to)
                 + " remainder " + DIGITS.charAt(n % to));
    }
    var o = options(r, want, [
      toBase(v, 6 - from - to > 1 ? 6 : from),          // the third base, a classic slip
      toBase(v + 1, to),
      want.split("").reverse().join(""),
      toBase(v, to === 16 ? 8 : 16)
    ], function (rr, i) { return toBase(v + i + 2, to); });

    return {
      q: "<p>Convert " + sub(src, from) + " to " + baseName(to) + ".</p>",
      choices: o.choices, ans: o.ans,
      why: "<p>One way to check the conversion is through base ten. Each " + baseName(from) + " digit is worth its place "
         + "value, so " + sub(src, from) + " is " + v + " in base ten.</p>"
         + "<p>Now divide repeatedly by " + to + " and read the remainders upward.</p>"
         + steps(chain.concat(["", "reading the remainders from the bottom up: " + want]))
         + "<p>The answer is " + sub(want, to) + ". The shortcut worth knowing is that "
         + "between binary and " + (to === 16 || from === 16 ? "hexadecimal" : "octal")
         + " you can group the bits "
         + (to === 16 || from === 16 ? "four" : "three") + " at a time and skip base ten "
         + "entirely.</p>",
      check: "to_base(from_base(" + py(src) + ", " + from + "), " + to + ")"
    };
  }

  // Arithmetic without leaving the base.
  var b = from;
  var x = int(r, 30, 900), y = int(r, 20, x - 5);
  var plus = r() < 0.6;
  var res = plus ? x + y : x - y;
  var sx = toBase(x, b), sy = toBase(y, b), sr = toBase(res, b);
  var op = plus ? "+" : "−";
  var oo = options(r, sr, [
    toBase(plus ? x - y : x + y, b),
    toBase(res, b === 16 ? 8 : 16),
    toBase(res + 1, b),
    String(res)
  ], function (rr, i) { return toBase(res + i + 2, b); });

  return {
    q: "<p>Work in " + baseName(b) + ". What is " + sub(sx, b) + " " + op + " "
     + sub(sy, b) + "?</p><p>Give the answer in " + baseName(b) + ".</p>",
    choices: oo.choices, ans: oo.ans,
    why: "<p>You can carry and borrow directly in base " + b + ", or convert to base ten, do the arithmetic, and convert back. Choose the method you can check reliably.</p>"
       + steps([sx + " (base " + b + ")  =  " + x,
                sy + " (base " + b + ")  =  " + y,
                x + " " + (plus ? "+" : "-") + " " + y + " = " + res,
                res + " (base ten)  =  " + sr + " (base " + b + ")"])
       + "<p>So the answer is " + sub(sr, b) + ". The tempting wrong answer is "
       + code(String(res)) + ", which is the base ten value left unconverted.</p>",
    check: "to_base(from_base(" + py(sx) + ", " + b + ") " + (plus ? "+" : "-")
         + " from_base(" + py(sy) + ", " + b + "), " + b + ")"
  };
}

// ------------------------------------------------------------- bit-string flicking

var BSF_PREC = { "|": 1, "^": 2, "&": 3 };

function bsfTree(r, depth) {
  if (depth <= 0 || r() < 0.3) {
    var s = "";
    for (var i = 0; i < 5; i++) s += int(r, 0, 1);
    return { t: "lit", v: s };
  }
  var k = r();
  // A double negation is not a harder question, only a scruffier one, so fold it away.
  if (k < 0.22) {
    var inner = bsfTree(r, depth - 1);
    return inner.t === "not" ? inner.a : { t: "not", a: inner };
  }
  if (k < 0.5) {
    return { t: "move",
             op: pick(r, ["LSHIFT", "RSHIFT", "LCIRC", "RCIRC"]) + "-" + int(r, 1, 3),
             a: bsfTree(r, depth - 1) };
  }
  return { t: "bin", sym: pick(r, ["&", "|", "^"]),
           l: bsfTree(r, depth - 1), r: bsfTree(r, depth - 1) };
}

// Parenthesise only where the tree needs it, because ACSL is largely testing whether you
// know the precedence in the first place.
function bsfRender(n, need) {
  if (n.t === "lit") return n.v;
  if (n.t === "not") return "~" + bsfRender(n.a, 4);
  if (n.t === "move") return n.op + " " + bsfRender(n.a, 4);
  var p = BSF_PREC[n.sym];
  var s = bsfRender(n.l, p) + " " + n.sym + " " + bsfRender(n.r, p + 1);
  return p < need ? "(" + s + ")" : s;
}

function bsfMove(op, s) {
  var parts = op.split("-"), name = parts[0], n = parseInt(parts[1], 10), L = s.length;
  if (name === "LCIRC") { n %= L; return s.slice(n) + s.slice(0, n); }
  if (name === "RCIRC") { n = (L - n % L) % L; return s.slice(n) + s.slice(0, n); }
  n = Math.min(n, L);
  if (name === "LSHIFT") return s.slice(n) + new Array(n + 1).join("0");
  return new Array(n + 1).join("0") + s.slice(0, L - n);
}
function bsfNot(s) {
  return s.replace(/[01]/g, function (c) { return c === "0" ? "1" : "0"; });
}
function bsfZip(a, b, sym) {
  var out = "";
  for (var i = 0; i < a.length; i++) {
    var x = a.charAt(i) === "1", y = b.charAt(i) === "1";
    out += (sym === "&" ? (x && y) : sym === "^" ? (x !== y) : (x || y)) ? "1" : "0";
  }
  return out;
}

// Walks the tree rather than the rendered string, so the string still has to be parsed
// independently on the Python side for the two to agree.
function bsfEval(n, log) {
  if (n.t === "lit") return n.v;
  var v;
  if (n.t === "not") {
    var inner0 = bsfEval(n.a, log);
    v = bsfNot(inner0);
    log.push("~ " + inner0 + "  ->  " + v);
  } else if (n.t === "move") {
    var inner = bsfEval(n.a, log);
    v = bsfMove(n.op, inner);
    log.push(n.op + " " + inner + "  ->  " + v);
  } else {
    var a = bsfEval(n.l, log), b = bsfEval(n.r, log);
    v = bsfZip(a, b, n.sym);
    log.push(a + " " + n.sym + " " + b + "  ->  " + v);
  }
  return v;
}

function bitStringFlicking(r) {
  var tree, expr, want, log;
  // Redraw anything that came out trivial, so a question is never just a literal.
  for (var tries = 0; tries < 40; tries++) {
    tree = bsfTree(r, 3);
    expr = bsfRender(tree, 0);
    if (tree.t !== "lit" && expr.length < 60) break;
  }
  log = [];
  want = bsfEval(tree, log);

  var o = options(r, want, [
    bsfNot(want),
    bsfMove("LSHIFT-1", want),
    bsfMove("RCIRC-1", want),
    want.split("").reverse().join("")
  ], function (rr, i) {
    var s = "";
    for (var k = 0; k < 5; k++) s += int(rr, 0, 1);
    return s;
  });

  return {
    q: "<p>Evaluate the following bit-string expression. All strings are five bits "
     + "long.</p>" + steps([expr]),
    choices: o.choices, ans: o.ans,
    why: "<p>Work outward from the innermost operation. The precedence runs "
       + code("~") + " and the shift and circulate operators first, then "
       + code("&") + ", then " + code("^") + ", then " + code("|")
       + ", and parentheses override all of it.</p>"
       + steps(log)
       + "<p>So the expression is " + code(want) + ". Remember that a shift drops bits off "
       + "the end and fills with zeros, while a circulate wraps them around, which is the "
       + "distinction most of the wrong answers here come from.</p>",
    check: "flick(" + py(expr) + ")"
  };
}

// ------------------------------------------------------- prefix, infix, and postfix

var MATH_PREC = { "^": 3, "*": 2, "/": 2, "+": 1, "-": 1 };

function mathTree(r, depth, letters) {
  if (depth <= 0 || r() < 0.28) {
    return { t: "var", v: letters[Math.floor(r() * letters.length)] };
  }
  return { t: "op", sym: pick(r, ["+", "-", "*", "/", "^", "+", "*"]),
           l: mathTree(r, depth - 1, letters), r: mathTree(r, depth - 1, letters) };
}

// `^` is the one right associative operator, so its children lean the other way.
function mathInfix(n, need) {
  if (n.t === "var") return n.v;
  var p = MATH_PREC[n.sym], right = n.sym === "^";
  var s = mathInfix(n.l, right ? p + 1 : p) + n.sym + mathInfix(n.r, right ? p : p + 1);
  return p < need ? "(" + s + ")" : s;
}
function mathPostfix(n) {
  return n.t === "var" ? n.v : mathPostfix(n.l) + " " + mathPostfix(n.r) + " " + n.sym;
}
function mathPrefix(n) {
  return n.t === "var" ? n.v : n.sym + " " + mathPrefix(n.l) + " " + mathPrefix(n.r);
}

function prefixPostfix(r) {
  var letters = ["A", "B", "C", "D", "E"].slice(0, int(r, 3, 5));
  var tree, infix;
  for (var tries = 0; tries < 40; tries++) {
    tree = mathTree(r, 3, letters);
    infix = mathInfix(tree, 0);
    if (tree.t === "op" && infix.length >= 5 && infix.length < 26) break;
  }
  var wantPostfix = r() < 0.6;
  var want = wantPostfix ? mathPostfix(tree) : mathPrefix(tree);
  var other = wantPostfix ? mathPrefix(tree) : mathPostfix(tree);

  var o = options(r, want, [
    other,
    want.split(" ").reverse().join(" "),
    (wantPostfix ? mathPostfix : mathPrefix)({ t: "op", sym: tree.sym, l: tree.r, r: tree.l })
  ], function (rr, i) {
    var t2 = mathTree(rr, 3, letters);
    return (wantPostfix ? mathPostfix : mathPrefix)(t2);
  });

  var trace = [];
  (function walk(n) {
    if (n.t === "var") return n.v;
    var a = walk(n.l), b = walk(n.r);
    var piece = wantPostfix ? a + " " + b + " " + n.sym : n.sym + " " + a + " " + b;
    trace.push(mathInfix(n, 0) + "   ->   " + piece);
    return piece;
  })(tree);

  return {
    q: "<p>Rewrite the following infix expression in " + (wantPostfix ? "postfix" : "prefix")
     + " notation.</p>" + steps([infix]),
    choices: o.choices, ans: o.ans,
    why: "<p>Build the expression tree first and the notation follows from how you read it. "
       + "The operators bind in the usual order, " + code("^") + " highest, then "
       + code("*") + " and " + code("/") + ", then " + code("+") + " and " + code("-")
       + ", with " + code("^") + " grouping right to left and the rest left to right.</p>"
       + "<p>Converting one subexpression at a time, innermost first:</p>"
       + steps(trace)
       + "<p>Which gives " + code(want) + ". In "
       + (wantPostfix ? "postfix each operator follows its two operands"
                      : "prefix each operator comes before its two operands")
       + ", and the operands stay in the same left to right order they had in the infix "
       + "form. Only the operators move.</p>",
    check: (wantPostfix ? "to_postfix(" : "to_prefix(") + py(infix) + ")"
  };
}

// ------------------------------------------------------------------ boolean algebra

function boolTree(r, depth, letters) {
  if (depth <= 0 || r() < 0.32) {
    var v = { t: "var", v: letters[Math.floor(r() * letters.length)] };
    return r() < 0.3 ? { t: "not", a: v } : v;
  }
  var k = r();
  if (k < 0.18) {
    var innerB = boolTree(r, depth - 1, letters);
    return innerB.t === "not" ? innerB.a : { t: "not", a: innerB };
  }
  return { t: k < 0.6 ? "and" : "or",
           l: boolTree(r, depth - 1, letters), r: boolTree(r, depth - 1, letters) };
}

// AND is juxtaposition, OR is +, NOT is a trailing prime on a factor.
function boolRender(n, need) {
  if (n.t === "var") return n.v;
  if (n.t === "not") {
    var inner = boolRender(n.a, 3);
    return (n.a.t === "var" ? inner : "(" + boolRender(n.a, 0) + ")") + "'";
  }
  var p = n.t === "and" ? 2 : 1;
  var s = boolRender(n.l, p) + (n.t === "and" ? "" : "+") + boolRender(n.r, p + 1);
  return p < need ? "(" + s + ")" : s;
}
function boolEval(n, env) {
  if (n.t === "var") return !!env[n.v];
  if (n.t === "not") return !boolEval(n.a, env);
  if (n.t === "and") return boolEval(n.l, env) && boolEval(n.r, env);
  return boolEval(n.l, env) || boolEval(n.r, env);
}
function boolVars(n, into) {
  if (n.t === "var") { into[n.v] = 1; return into; }
  if (n.t === "not") return boolVars(n.a, into);
  boolVars(n.l, into); boolVars(n.r, into);
  return into;
}

function booleanAlgebra(r) {
  var letters = ["A", "B", "C", "D"].slice(0, int(r, 2, 4));
  var tree, expr, vars, rows, want, total;

  // Redraw until the expression is worth asking about. One that is true in every row, or
  // in none, has a right answer but teaches nothing and gives itself away.
  for (var tries = 0; tries < 60; tries++) {
    tree = boolTree(r, 3, letters);
    expr = boolRender(tree, 0);
    vars = Object.keys(boolVars(tree, {})).sort();
    total = 1 << vars.length;
    rows = []; want = 0;
    for (var mask = 0; mask < total; mask++) {
      var env = {}, bits = [];
      for (var i = 0; i < vars.length; i++) {
        env[vars[i]] = !!(mask >> i & 1);
        bits.push(env[vars[i]] ? "1" : "0");
      }
      var v = boolEval(tree, env);
      if (v) want++;
      rows.push(vars.join(" ") + "  =  " + bits.join(" ") + "   ->   " + (v ? "1" : "0"));
    }
    if (vars.length >= 2 && expr.length < 24 && want > 0 && want < total) break;
  }

  var o = options(r, want, [total - want, want + 1, want - 1, total],
                  function (rr, i) { return int(rr, 0, total); });

  return {
    q: "<p>There are " + WORDS[vars.length] + " variables in the expression below, so "
     + WORDS[total] + " possible assignments of ones and zeros.</p>" + steps([expr])
     + "<p>For how many of those " + WORDS[total] + " assignments is the expression 1?</p>",
    choices: o.choices, ans: o.ans,
    why: "<p>Juxtaposition is AND, " + code("+") + " is OR, and a trailing "
       + code("'") + " is NOT, which binds tighter than either. With only "
       + WORDS[total] + " rows the truth table is faster than any amount of algebra.</p>"
       + steps(rows)
       + "<p>Counting the rows that come out 1 gives " + want + ". If you would rather "
       + "simplify first, DeMorgan is usually the lever: "
       + code("(A+B)' = A'B'") + " and " + code("(AB)' = A'+B'") + ".</p>",
    check: "str(bool_count(" + py(expr) + "))"
  };
}

// ------------------------------------------------------------- digital electronics

function digitalElectronics(r) {
  var inputs = ["A", "B", "C"];
  var binary = ["AND", "OR", "NAND", "NOR", "XOR", "XNOR"];
  var gates, names, count, netlist, used, combos, rows, want;

  // Same reasoning as the boolean generator: a circuit whose output never changes is a
  // question with nothing in it. Redraw until the answer sits strictly inside the range.
  for (var attempt = 0; attempt < 60; attempt++) {
  gates = []; names = [];
  count = int(r, 2, 4);

  for (var i = 0; i < count; i++) {
    var name = "G" + (i + 1);
    var pool = inputs.concat(names);
    var last = i === count - 1;
    // The output is whichever gate is listed last, so make sure it actually consumes the
    // work above it rather than dangling off an input on its own.
    var useNot = !last && r() < 0.25;
    if (useNot) {
      gates.push(name + " = NOT " + pick(r, pool));
    } else {
      var a = last && names.length ? names[names.length - 1] : pick(r, pool);
      var b = pick(r, pool.filter(function (x) { return x !== a; }));
      gates.push(name + " = " + pick(r, binary) + " " + a + " " + b);
    }
    names.push(name);
  }
  netlist = gates.join(", ");

  // Only the inputs the circuit actually reads. A gate list that never mentions C has four
  // input combinations, not eight, and asking about eight would both mislead the reader and
  // double the count.
  used = [];
  gates.forEach(function (g) {
    g.split(" ").slice(3).forEach(function (a) {
      if (inputs.indexOf(a) >= 0 && used.indexOf(a) < 0) used.push(a);
    });
  });
  used.sort();
  combos = 1 << used.length;

  // Evaluate straight off the gate list, one input combination at a time.
  rows = []; want = 0;
  for (var mask = 0; mask < combos; mask++) {
    var env = {};
    for (var k = 0; k < used.length; k++) env[used[k]] = !!(mask >> k & 1);
    var out = false;
    for (var g = 0; g < gates.length; g++) {
      var tok = gates[g].split(" ");
      var op = tok[2], x = env[tok[3]], y = tok.length > 4 ? env[tok[4]] : false;
      out = op === "AND" ? (x && y) : op === "OR" ? (x || y)
          : op === "NAND" ? !(x && y) : op === "NOR" ? !(x || y)
          : op === "XOR" ? (x !== y) : op === "XNOR" ? (x === y)
          : op === "NOT" ? !x : x;
      env[tok[0]] = out;
    }
    if (out) want++;
    rows.push(used.join(" ") + " = " + used.map(function (c) { return env[c] ? 1 : 0; })
              .join(" ") + "   ->   " + (out ? 1 : 0));
  }

  if (used.length >= 2 && want > 0 && want < combos) break;
  }

  var names_ = used.map(code);
  var listed = names_.length === 2 ? names_.join(" and ")
             : names_.slice(0, -1).join(", ") + ", and " + names_[names_.length - 1];

  var o = options(r, want, [combos - want, want + 1, want - 1, combos],
                  function (rr, i) { return int(rr, 0, combos); });

  return {
    q: "<p>A circuit is wired as follows, with " + code("G" + count)
     + " as the output.</p>" + steps(gates)
     + "<p>For how many of the " + WORDS[combos] + " combinations of " + listed
     + " is the output 1?</p>",
    choices: o.choices, ans: o.ans,
    why: "<p>" + WORDS[combos].charAt(0).toUpperCase() + WORDS[combos].slice(1)
       + " rows is small enough to just walk the table, evaluating the gates in the order "
       + "they are listed so that every gate has its inputs ready by the time you reach "
       + "it.</p>"
       + steps(rows)
       + "<p>That is " + want + " row" + (want === 1 ? "" : "s") + " where the output is 1. "
       + "Worth keeping straight: NAND is not AND followed by nothing, it is the exact "
       + "negation, so it is 1 in every case except both inputs high.</p>",
    check: "str(circuit(" + py(netlist) + "))"
  };
}

// ------------------------------------------------------------------ graph theory

function graphTheory(r) {
  var n = int(r, 4, 5);
  var names = ["A", "B", "C", "D", "E"].slice(0, n);
  var adj, bits, tries, k, u, v, want;

  for (tries = 0; tries < 60; tries++) {
    adj = [];
    for (var i = 0; i < n; i++) {
      adj.push([]);
      for (var j = 0; j < n; j++) adj[i].push(i === j ? 0 : (r() < 0.45 ? 1 : 0));
    }
    bits = adj.map(function (row) { return row.join(""); }).join("");
    k = int(r, 2, 3);
    u = int(r, 0, n - 1);
    v = int(r, 0, n - 1);

    // Count paths by enumerating them, which is a different method from the matrix
    // multiplication the Python side uses to check this.
    want = (function walk(at, left) {
      if (left === 0) return at === v ? 1 : 0;
      var total = 0;
      for (var j = 0; j < n; j++) if (adj[at][j]) total += walk(j, left - 1);
      return total;
    })(u, k);

    if (want > 0 && want <= 6) break;
  }

  var matrix = ["    " + names.join(" ")];
  for (var row = 0; row < n; row++) matrix.push(names[row] + "   " + adj[row].join(" "));

  // Spell out a few of the actual paths rather than asserting the count.
  var found = [];
  (function trace(at, left, path) {
    if (found.length >= 6) return;
    if (left === 0) { if (at === v) found.push(path.join(" -> ")); return; }
    for (var j = 0; j < n; j++) {
      if (adj[at][j]) trace(j, left - 1, path.concat([names[j]]));
    }
  })(u, k, [names[u]]);

  var o = options(r, want, [want + 1, want - 1, want + 2, 0],
                  function (rr, i) { return int(rr, 0, 8); });

  return {
    q: "<p>A directed graph on " + WORDS[n] + " vertices has the adjacency matrix below, "
     + "where row " + code("X") + " column " + code("Y") + " is 1 when there is an edge "
     + "from " + code("X") + " to " + code("Y") + ".</p>" + steps(matrix)
     + "<p>How many paths of length exactly " + k + " run from " + code(names[u])
     + " to " + code(names[v]) + "? A path may repeat vertices and edges.</p>",
    choices: o.choices, ans: o.ans,
    why: "<p>The number of paths of length " + k + " from one vertex to another is the "
       + "matching entry of the adjacency matrix raised to the power " + k
       + ", which is the fast way to do this when the graph is larger. At this size you can "
       + "simply list them.</p>"
       + steps(found.length ? found : ["there are none"])
       + "<p>That is " + want + " path" + (want === 1 ? "" : "s") + ". Note that this counts "
       + "routes that may repeat vertices and edges, which is what ACSL means by a path. A "
       + "question asking for a <em>simple path</em> forbids the repeats.</p>",
    check: "str(walks(" + n + ", " + k + ", " + py(names[u]) + ", " + py(names[v]) + ", "
         + py(bits) + "))"
  };
}

// ------------------------------------------------------------------ registry

var BUILDERS = {
  "number-systems": numberSystems,
  "bit-string-flicking": bitStringFlicking,
  "prefix-postfix": prefixPostfix,
  "boolean-algebra": booleanAlgebra,
  "digital-electronics": digitalElectronics,
  "graph-theory": graphTheory
};

function has(topic) {
  return Object.prototype.hasOwnProperty.call(BUILDERS, topic);
}

// The seed goes in the id, so a generated question can be named, checked, and reproduced.
function make(topic, seed) {
  if (!has(topic)) return null;
  var q = BUILDERS[topic](makeRng(seed));
  q.id = "gen:" + topic + ":" + seed;
  q.topic = topic;
  q.level = "b";
  q.generated = true;
  return q;
}

return { has: has, make: make, topics: Object.keys(BUILDERS) };

})();
