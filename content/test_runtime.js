// Regression checks for grading, stale requests, mock composition, and the proxy.
// Run with: node content/test_runtime.js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "public/app.js"), "utf8");

function appFunction(name) {
  const start = app.indexOf("function " + name + "(");
  assert.ok(start >= 0, name);
  return app.slice(start, app.indexOf("\n}", start) + 2);
}

async function main() {
  const saved = new Map();
  const buttons = Object.fromEntries(["run", "submit", "run-custom"].map(id => [id, {}]));
  const shown = [];
  const pending = [];
  const c = vm.createContext({
    console, AbortController, activeRun: null, URLSearchParams,
    cm: { getValue: () => "print(1)" }, curProblem: { id: "a" }, curLang: "python",
    esc: s => String(s),
    el: id => buttons[id],
    store: (key, fallback) => saved.has(key) ? saved.get(key) : fallback,
    save: (key, value) => saved.set(key, value),
    showResults: (...args) => shown.push(args),
    runnerResponse: async r => r,
    fetch: (url, options) => new Promise(resolve => pending.push({ resolve, options })),
  });
  for (const name of ["divergence", "showBlanks", "markDiff", "diffHint", "comparison", "report",
                      "runButtons", "cancelRun", "requestRun", "problemProgress", "recordProblem"]) {
    vm.runInContext(appFunction(name), c);
  }
  const cases = [{ in: ["input"], out: "1" }];
  for (const response of [
    { status: "runtime_error", stdout: "1\n", stderr: "crash" },
    { status: "ok", stdout: "1\ndebug\n" },
    { status: "ok", stdout: "1\n\n" },
    { status: "ok", stdout: "" },
    { status: "compile_error", message: "invalid source" },
    { status: "timeout", message: "busy" },
  ]) {
    saved.clear();
    c.report(response, cases, true);
    assert.equal(saved.has("frq:a"), false, JSON.stringify(response));
  }
  c.report({ status: "runtime_error", stdout: "1\n" }, cases, true);
  assert.match(shown.at(-1)[0], /runtime error/);
  c.report({ status: "ok", stdout: "1\ndebug\n" }, cases, true);
  assert.match(shown.at(-1)[0], /extra output/);
  c.report({ status: "ok", stdout: "1\n", stderr: "a harmless warning" }, cases, true);
  assert.equal(saved.get("frq:a").solved, true);
  assert.equal(saved.get("frq:a").assisted, false);
  c.recordProblem("a", "view");
  assert.equal(saved.get("frq:a").assisted, false, "later viewing preserves independent completion");
  saved.set("frq:a", "gaveup");
  c.report({ status: "ok", stdout: "1\n" }, cases, true);
  assert.equal(saved.get("frq:a").solved, true);
  assert.equal(saved.get("frq:a").assisted, true, "solving after viewing records assisted completion");
  saved.set("frq:a", "solved");
  c.recordProblem("a", "view");
  assert.equal(saved.get("frq:a").assisted, false, "migrate old independent completions");
  saved.clear();
  c.report({ status: "ok", stdout: "1\n" }, cases, false);
  assert.equal(saved.size, 0, "visible tests alone do not mark solved");

  // Simulate transports that still resolve after aborting.
  const delivered = [];
  let first = c.requestRun("a", r => delivered.push(r.id));
  assert.ok(Object.values(buttons).every(b => b.disabled));
  let second = c.requestRun("b", r => delivered.push(r.id));
  assert.equal(pending[0].options.signal.aborted, true);
  pending[0].resolve({ id: "old" });
  await first;
  assert.deepEqual(delivered, []);
  assert.ok(Object.values(buttons).every(b => b.disabled), "old cleanup must not unlock a new run");
  pending[1].resolve({ id: "new" });
  await second;
  assert.deepEqual(delivered, ["new"]);
  assert.ok(Object.values(buttons).every(b => !b.disabled));

  for (const change of ["route", "language"]) {
    const run = c.requestRun("a", r => delivered.push(r.id));
    c.cancelRun();
    if (change === "route") { c.cm = { getValue: () => "new editor" }; c.curProblem = { id: "b" }; }
    else c.curLang = "java";
    pending.at(-1).resolve({ id: change });
    await run;
    assert.deepEqual(delivered, ["new"]);
  }

  c.window = {};
  for (const file of ["topics.js", "gen.js", "frq.js", ...Array.from({length: 12}, (_, i) => "mcq" + (i + 1) + ".js")]) {
    vm.runInContext(fs.readFileSync(path.join(root, "public/data", file), "utf8"), c);
  }
  c.TOPICS = c.window.TOPICS;
  c.MCQ = c.window.MCQ;
  c.PER_TOPIC = 2;
  c.EXAM_SECONDS = 1800;
  for (const name of ["topicsFor", "questionsFor", "shuffle", "permute", "isWdtpd", "examSize",
                      "buildExam"]) {
    vm.runInContext(appFunction(name), c);
  }
  for (const division of ["junior", "senior"]) {
    c.division = division;
    for (let contest = 1; contest <= 4; contest++) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const exam = c.buildExam(contest);
        assert.equal(exam.ids.length, 6);
        const topics = new Map();
        for (const id of exam.ids) {
          const q = c.MCQ.find(q => q.id === id);
          assert.ok(q.kind === "problem" && q.exam !== false);
          topics.set(q.topic, (topics.get(q.topic) || 0) + 1);
        }
        assert.deepEqual([...topics.values()], [2, 2, 2]);
      }
    }
  }

  c.GEN = c.window.GEN;
  c.FRQ = c.window.FRQ;
  c.LANGS = ["python", "java", "cpp"].map(id => ({ id }));
  const storage = new Map();
  c.localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key),
  };
  for (const name of ["questionById", "problemById", "validExam", "validSavedEntry", "validateBackup", "restoreBackup"]) {
    vm.runInContext(appFunction(name), c);
  }
  const generated = c.questionById("gen:graph-theory:123");
  assert.equal(generated.id, "gen:graph-theory:123");
  assert.equal(JSON.stringify(generated), JSON.stringify(c.questionById(generated.id)));
  for (const id of ["gen:unknown:1", "gen:graph-theory:-1", "gen:graph-theory:4294967296", "gen:graph-theory:01"]) {
    assert.equal(c.questionById(id), null, id);
  }
  for (const problem of c.FRQ) assert.equal(problem.hints.length, 2, problem.id);
  assert.equal(c.validSavedEntry("code:digit-chain:python", "x".repeat(200001)), true, "backups retain code larger than the runner limit");
  const good = { version: 1, entries: { "code:digit-chain:python": "print(1)", "q:gen:graph-theory:123": false } };
  c.restoreBackup(good);
  assert.equal(storage.get("acsl:code:digit-chain:python"), '"print(1)"');
  assert.throws(() => c.restoreBackup({ version: 1, entries: { theme: "light", "code:unknown:python": "bad" } }));
  assert.equal(storage.has("acsl:theme"), false, "validate everything before writing");
  assert.throws(() => c.validateBackup({ version: 1, entries: JSON.parse('{"__proto__":{}}') }));
  assert.throws(() => c.validateBackup({ version: 1, entries: { "frq:digit-chain": { solved: false, solutionViewed: false, assisted: true } } }));
  c.restoreBackup({ version: 1, entries: {
    "glass-clear": 100, "glass-frost": 6, "glass-tint": 15,
    "code:digit-chain:python": "print(42)"
  } });
  assert.equal(storage.get("acsl:code:digit-chain:python"), '"print(42)"',
    "retired glass preferences must not prevent restoring study data");
  for (const [key, value] of [["glass-clear", 101], ["glass-frost", -1],
                             ["glass-tint", "15"], ["glass-unknown", 1]]) {
    assert.throws(() => c.validateBackup({ version: 1, entries: { [key]: value } }));
  }
  const before = [...storage];
  let fail = true;
  c.localStorage.setItem = (key, value) => {
    if (key === "acsl:theme" && fail) { fail = false; throw new Error("quota"); }
    storage.set(key, value);
  };
  assert.throws(() => c.restoreBackup({ version: 1, entries: { "code:digit-chain:python": "changed", theme: "light" } }), /previous data was restored/);
  assert.deepEqual([...storage], before, "failed import rolls back earlier writes");
  const paper = c.buildExam(4);
  assert.ok(c.validExam(paper));
  paper.answers[0] = 0.5;
  assert.equal(c.validExam(paper), null);
  paper.answers[0] = null;
  paper.at = 0.5;
  assert.equal(c.validExam(paper), null);

  const api = vm.createContext({
    module: { exports: {} }, process: { env: {} }, Buffer, AbortController,
    setTimeout, clearTimeout, console: { error() {} },
    fetch: async () => Response.json({ status: "0", program_output: "1\n" }),
  });
  vm.runInContext(fs.readFileSync(path.join(root, "api/run.js"), "utf8"), api);
  async function call(body = { lang: "python", code: "print(1)" }, headers = {}) {
    const result = { headers: {} };
    await api.module.exports({ method: "POST", headers, body }, {
      setHeader: (k, v) => { result.headers[k] = v; },
      status: code => ({ json: data => Object.assign(result, { code, data }) }),
    });
    return result;
  }
  assert.equal((await call()).data.status, "ok");
  assert.equal((await call({ lang: "__proto__", code: "" })).code, 400);
  assert.equal((await call(undefined, { "sec-fetch-site": "cross-site" })).code, 403);
  api.fetch = async () => Response.json({ status: "1", program_output: "1\n", program_error: "crash" });
  assert.equal((await call()).data.status, "runtime_error");
  api.fetch = async () => Response.json({ status: "1", compiler_error: "bad code" });
  assert.equal((await call()).data.status, "compile_error");
  api.fetch = async () => Response.json({ status: 0, compiler_error: "warning: unused variable" });
  assert.equal((await call()).data.status, "ok", "numeric zero with warnings is still a successful build");
  api.fetch = async () => Response.json({ signal: "Segmentation fault", program_output: "partial" });
  assert.equal((await call()).data.status, "runtime_error", "a signal is a valid program failure");
  let canceled = false;
  api.fetch = async () => new Response(new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(1024 * 1024 + 1)); },
    cancel() { canceled = true; },
  }));
  assert.match((await call()).data.message, /too much output/);
  assert.equal(canceled, true, "oversized upstream streams must be canceled");
  canceled = false;
  api.fetch = async () => ({ ok: false, status: 503, body: { cancel: async () => { canceled = true; } } });
  assert.equal((await call()).data.status, "error");
  assert.equal(canceled, true, "discard error bodies without buffering them");
  api.fetch = async () => Response.json(null);
  assert.equal((await call()).data.status, "error");
  api.fetch = async () => Response.json({ compiler_error: {} });
  assert.equal((await call()).data.status, "error");
  api.fetch = async () => { const e = new Error("timeout"); e.name = "AbortError"; throw e; };
  assert.equal((await call()).data.status, "timeout");

  // Falling back to a second service. The mock answers by host, so each backend gets the
  // shape it actually speaks and the test can see which ones were asked.
  const asked = [];
  // A Response body can only be read once, so each use needs its own.
  const godboltOk = () => Response.json({ code: 0, stdout: [{ text: "4" }, { text: "8" }], stderr: [] });
  // Judge0 transfers base64 both ways, so its fixtures have to as well.
  const j64 = (text) => Buffer.from(text, "utf8").toString("base64");
  const hostOf = (url) => String(url).includes("godbolt") ? "godbolt"
    : String(url).includes("judge0") ? "judge0" : "wandbox";
  const dead = (status) => () => ({ ok: false, status, body: { cancel: async () => {} } });
  const route = (handlers) => async (url) => {
    const host = hostOf(url);
    asked.push(host);
    if (!handlers[host]) throw new Error("unexpected host " + host);
    return handlers[host]();
  };

  api.fetch = route({
    wandbox: dead(500),
    godbolt: godboltOk,
  });
  let r = await call();
  assert.equal(r.data.status, "ok", "a dead first service falls through to the second");
  assert.equal(r.data.stdout, "4\n8", "line objects rejoin with newlines");
  assert.deepEqual(asked, ["wandbox", "godbolt"]);

  asked.length = 0;
  api.fetch = route({
    wandbox: () => { throw new Error("ECONNREFUSED"); },
    godbolt: () => Response.json({ code: 1, stdout: [], stderr: [],
                                   buildResult: { code: 1, stderr: [{ text: "<source>:3: error: bad" }] } }),
  });
  r = await call({ lang: "java", code: "public class Solution {}" });
  assert.equal(r.data.status, "compile_error");
  assert.match(r.data.message, /Solution\.java:3/, "the backup's <source> is renamed too");

  // Two down, the third answers. This is the whole point of having a third.
  asked.length = 0;
  api.fetch = route({
    wandbox: dead(500),
    godbolt: dead(503),
    judge0: () => Response.json({ stdout: j64("4\n8\n"), stderr: null, compile_output: null,
                                  status: { id: 3, description: "Accepted" } }),
  });
  r = await call();
  assert.equal(r.data.status, "ok", "two dead services fall through to the third");
  assert.equal(r.data.stdout, "4\n8\n");
  assert.deepEqual(asked, ["wandbox", "godbolt", "judge0"]);

  // Judge0 reports a failed build as status 6 and leaves exit_code null on a crash.
  asked.length = 0;
  api.fetch = route({
    wandbox: dead(500),
    godbolt: dead(503),
    judge0: () => Response.json({ compile_output: j64("Main.java:1: error: bad"), stdout: null,
                                  stderr: null, status: { id: 6, description: "Compilation Error" } }),
  });
  r = await call({ lang: "java", code: "public class Solution {}" });
  assert.equal(r.data.status, "compile_error");
  assert.match(r.data.message, /Solution\.java:1/, "the third service's filename is renamed too");

  asked.length = 0;
  api.fetch = route({
    wandbox: dead(500),
    godbolt: dead(503),
    judge0: () => Response.json({ stdout: j64("partial"), stderr: null, compile_output: null,
                                  exit_code: null, status: { id: 11, description: "Runtime Error" } }),
  });
  r = await call();
  assert.equal(r.data.status, "runtime_error", "a null exit_code still reads as a crash");

  asked.length = 0;
  api.fetch = route({ wandbox: dead(500), godbolt: dead(502), judge0: dead(500) });
  r = await call();
  assert.equal(r.data.status, "error");
  assert.match(r.data.message, /not a problem with your program/);
  assert.deepEqual(asked, ["wandbox", "godbolt", "judge0"], "every service is tried before giving up");

  asked.length = 0;
  api.fetch = route({
    wandbox: () => { const e = new Error("timeout"); e.name = "AbortError"; throw e; },
    godbolt: godboltOk,
  });
  assert.equal((await call()).data.status, "timeout");
  assert.deepEqual(asked, ["wandbox"], "a program that never finishes will not finish elsewhere");

  asked.length = 0;
  api.fetch = route({
    wandbox: () => new Response(new ReadableStream({
      start(ctrl) { ctrl.enqueue(new Uint8Array(1024 * 1024 + 1)); },
      cancel() {},
    })),
    godbolt: godboltOk,
  });
  assert.match((await call()).data.message, /too much output/);
  assert.deepEqual(asked, ["wandbox"], "a program that floods output will flood the backup too");

  // GCC colors its diagnostics and Compiler Explorer compiles to a file of its own naming.
  // Both would reach the page as noise a student cannot act on.
  const esc = String.fromCharCode(27);
  asked.length = 0;
  api.fetch = route({
    wandbox: dead(500),
    godbolt: () => Response.json({
      code: 1,
      stdout: [],
      stderr: [{ text: esc + "[01m" + esc + "[KFile \"/app/output.s\", line 1" + esc + "[m" + esc + "[K" }],
    }),
  });
  r = await call();
  assert.equal(r.data.stderr, 'File "solution.py", line 1', "escapes stripped, file renamed");
  assert.equal(r.data.stderr.indexOf(esc), -1, "no escape codes reach the page");

  // Service failures must never be graded as student runtime errors (or successful output).
  for (const invalid of [{}, { status: "0junk" }, { status: null }]) {
    asked.length = 0;
    api.fetch = route({ wandbox: () => Response.json(invalid), godbolt: godboltOk });
    assert.equal((await call()).data.status, "ok", "invalid Wandbox response must fall back");
    assert.deepEqual(asked, ["wandbox", "godbolt"]);
  }
  for (const [response, status] of [
    [{ code: 0, stdout: [{ text: "4" }], truncated: true }, "error"],
    [{ code: 0, stdout: [{ text: "4" }], timedOut: true }, "timeout"],
    [{ code: 1, stdout: [], buildResult: { code: 1, stderr: [] } }, "compile_error"],
  ]) {
    asked.length = 0;
    api.fetch = route({ wandbox: dead(500), godbolt: () => Response.json(response) });
    assert.equal((await call()).data.status, status);
    assert.deepEqual(asked, ["wandbox", "godbolt"], "program failures stop fallback");
  }
  for (const response of [
    { code: 0, stdout: [], networkError: true },
    { code: 0, stdout: [], didExecute: false },
    { code: 0, stdout: [{ unexpected: "4" }] },
  ]) {
    api.fetch = route({ wandbox: dead(500), godbolt: () => Response.json(response),
      judge0: () => Response.json({ status: { id: 3 }, stdout: j64("4") }) });
    assert.equal((await call()).data.stdout, "4", "invalid or unexecuted CE result must fall back");
  }
  for (const [id, expected] of [[1, "error"], [2, "error"], [13, "error"], [14, "error"], [99, "error"],
                                [5, "timeout"], [6, "compile_error"], [11, "runtime_error"]]) {
    api.fetch = route({ wandbox: dead(500), godbolt: dead(503),
      judge0: () => Response.json({ status: { id }, stdout: null, stderr: null }) });
    assert.equal((await call()).data.status, expected, "Judge0 status " + id);
  }
  api.fetch = async (url, options) => {
    if (hostOf(url) !== "judge0") return dead(500)();
    const sent = JSON.parse(options.body);
    assert.equal(sent.compiler_options, "-std=c++17 -O2", "options stay plain text");
    assert.equal(Buffer.from(sent.source_code, "base64").toString("utf8"), "int main() {}",
                 "the source travels base64");
    return Response.json({ status: { id: 3 }, stdout: j64("201703") });
  };
  assert.equal((await call({ lang: "cpp", code: "int main() {}" })).data.status, "ok");

  // The reason for base64 at all: Judge0 refuses anything it cannot read as UTF-8 otherwise.
  api.fetch = route({ wandbox: dead(500), godbolt: dead(503),
    judge0: () => Response.json({ status: { id: 3 }, stdout: j64("caf\u00e9 \u2014 ok\n") }) });
  assert.equal((await call()).data.stdout, "caf\u00e9 \u2014 ok\n", "non-ascii output survives");

  console.log("Grading, progress migration, backups, generated links, 160 mock exams, and proxy checks passed.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
