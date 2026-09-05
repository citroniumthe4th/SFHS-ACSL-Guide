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
    console, AbortController, activeRun: null,
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
                      "runButtons", "cancelRun", "requestRun"]) {
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
  assert.equal(saved.get("frq:a"), "solved");
  saved.set("frq:a", "gaveup");
  c.report({ status: "ok", stdout: "1\n" }, cases, true);
  assert.equal(saved.get("frq:a"), "gaveup");
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
  for (const file of ["topics.js", ...Array.from({length: 12}, (_, i) => "mcq" + (i + 1) + ".js")]) {
    vm.runInContext(fs.readFileSync(path.join(root, "public/data", file), "utf8"), c);
  }
  c.TOPICS = c.window.TOPICS;
  c.MCQ = c.window.MCQ;
  c.PER_TOPIC = 2;
  c.EXAM_SECONDS = 1800;
  for (const name of ["topicsFor", "questionsFor", "shuffle", "permute", "isWdtpd", "buildExam"]) {
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
          assert.ok(q.check && q.exam !== false);
          topics.set(q.topic, (topics.get(q.topic) || 0) + 1);
        }
        assert.deepEqual([...topics.values()], [2, 2, 2]);
      }
    }
  }

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
  let cancelled = false;
  api.fetch = async () => new Response(new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(1024 * 1024 + 1)); },
    cancel() { cancelled = true; },
  }));
  assert.match((await call()).data.message, /too much output/);
  assert.equal(cancelled, true, "oversized upstream streams must be cancelled");
  cancelled = false;
  api.fetch = async () => ({ ok: false, status: 503, body: { cancel: async () => { cancelled = true; } } });
  assert.equal((await call()).data.status, "error");
  assert.equal(cancelled, true, "discard error bodies without buffering them");
  api.fetch = async () => Response.json(null);
  assert.equal((await call()).data.status, "error");
  api.fetch = async () => Response.json({ compiler_error: {} });
  assert.equal((await call()).data.status, "error");
  api.fetch = async () => { const e = new Error("timeout"); e.name = "AbortError"; throw e; };
  assert.equal((await call()).data.status, "timeout");
  console.log("Grading, request isolation, 160 mock exams, and proxy regression checks passed.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
