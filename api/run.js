// Vercel serverless function: compiles and runs a student submission.
//
// Vercel's Node runtime has no JDK and no g++, so the actual compiling happens on a
// remote sandbox. Wandbox is the default because it needs no API key. Point RUNNER_URL
// at another Wandbox-compatible endpoint to use a different host.

const WANDBOX = process.env.RUNNER_URL || "https://wandbox.org/api/compile.json";

const COMPILERS = {
  python: { compiler: "cpython-3.11.10", label: "Python 3.11" },
  java: { compiler: "openjdk-jdk-21+35", label: "Java 21" },
  cpp: { compiler: "gcc-13.2.0", label: "C++17 (GCC 13)", raw: "-std=c++17\n-O2" },
};

// Wandbox writes every submission to prog.java and runs `java prog`, so a public class
// named Solution will not compile. Drop the modifier and bolt on a prog entry point.
function shimJava(code) {
  const stripped = code.replace(/\bpublic\s+(?=(final\s+|abstract\s+)?class\s+Solution\b)/, "");
  return (
    stripped +
    "\n\npublic class prog { public static void main(String[] a) throws Exception { Solution.main(a); } }\n"
  );
}

const MAX_CODE = 200000;
const MAX_STDIN = 100000;
const MAX_RESPONSE = 1024 * 1024;

// Bound the upstream body before parsing it, including output from printing loops.
async function readRunnerResponse(response) {
  const reader = response.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_RESPONSE) {
        await reader.cancel();
        const error = new Error("Runner response exceeds limit");
        error.code = "OUTPUT_LIMIT";
        throw error;
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
  }
  const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid runner response");
  }
  for (const key of ["compiler_error", "program_output", "program_error"]) {
    if (data[key] !== undefined && typeof data[key] !== "string") {
      throw new Error("Invalid runner stream");
    }
  }
  return data;
}

// Best-effort throttle shared by callers on one school network. This resets across
// cold starts and counts separately on each instance. Site-wide enforcement needs
// an edge rule or a shared counter.
const WINDOW_MS = 60000;
const MAX_PER_WINDOW = 120;
const HITS = new Map();

function throttled(who) {
  const now = Date.now();
  const recent = (HITS.get(who) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  HITS.set(who, recent);
  if (HITS.size > 5000) HITS.clear(); // the map is a cache, not a ledger
  return recent.length > MAX_PER_WINDOW;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "POST only" });
  }

  // Fetch Metadata blocks cross-site browser requests. Non-browser callers can omit
  // or forge it, so it is not authentication.
  const from = req.headers["sec-fetch-site"];
  if (from && from !== "same-origin" && from !== "none") {
    return res.status(403).json({ status: "error", message: "Cross site requests are not served." });
  }

  const who = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (throttled(who)) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({
      status: "error",
      message: "That is a lot of runs in one minute. Wait about a minute and try again.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ status: "error", message: "Bad JSON" });
    }
  }
  const { lang, code, stdin = "" } = body || {};
  // hasOwnProperty, not a plain lookup: "constructor" and "__proto__" both come back
  // truthy off the prototype chain and would walk straight past an unsupported check.
  const known = typeof lang === "string" && Object.prototype.hasOwnProperty.call(COMPILERS, lang);
  const spec = known ? COMPILERS[lang] : null;
  if (!spec) return res.status(400).json({ status: "error", message: "Unsupported language" });
  if (typeof code !== "string" || code.length > MAX_CODE) {
    return res.status(400).json({ status: "error", message: "Bad source" });
  }
  const input = String(stdin);
  if (input.length > MAX_STDIN) {
    return res.status(400).json({ status: "error", message: "Too much input" });
  }

  const payload = {
    compiler: spec.compiler,
    code: lang === "java" ? shimJava(code) : code,
    stdin: input,
    "compiler-option-raw": spec.raw || "",
  };

  // This bounds our wait, including queueing and compilation. Aborting the request does
  // not stop work already running at Wandbox.
  //
  // vercel.json caps the function itself at 20s. That is deliberately a little above this abort
  // rather than equal to it: this timer is the normal way a slow run ends, and the platform cap
  // is the backstop for an invocation that wedges somewhere this timer cannot reach.
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  let data;
  try {
    const r = await fetch(WANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "sfhs-acsl-guide/1.0" },
      body: JSON.stringify(payload),
      signal: ctl.signal,
    });
    if (!r.ok) {
      console.error("runner HTTP status:", r.status);
      if (r.body) await r.body.cancel();
      return res.status(200).json({
        status: "error",
        message: "The compile service is not answering properly right now. Try again in a moment.",
      });
    }
    data = await readRunnerResponse(r);
  } catch (e) {
    if (e.name !== "AbortError") console.error("runner response failed:", e.code || e.name);
    return res.status(200).json({
      status: e.name === "AbortError" ? "timeout" : "error",
      message:
        e.name === "AbortError"
          ? "The compile service did not finish within twelve seconds. It may be busy, or your "
            + "program may be taking too long. Check your loops and try again."
          : e.code === "OUTPUT_LIMIT"
            ? "The program returned too much output. Remove debug printing and check your loops."
            : "Could not read a result from the compile service. Try again in a moment.",
    });
  } finally {
    clearTimeout(timer);
  }

  // Wandbox names the file after its own runner. Point errors back at what the student sees.
  const rename = (t) =>
    String(t || "")
      .replace(/\bprog\.java\b/g, "Solution.java")
      .replace(/\bprog\.(cc|cpp)\b/g, "solution.cpp")
      .replace(/\bprog\.py\b/g, "solution.py");

  // A program that prints in a loop can return megabytes, which then has to travel to the browser
  // and be escaped into the page. Keep each stream to something a person could actually read, and
  // say so rather than silently ending mid-line.
  const MAX_STREAM = 64 * 1024;
  const cap = (t) => {
    const s = String(t || "");
    if (s.length <= MAX_STREAM) return s;
    return s.slice(0, MAX_STREAM)
      + "\n\n[... truncated. The program produced more than 64 KB here, which usually means it is "
      + "printing inside a loop that does not stop.]";
  };

  const compileErr = (data.compiler_error || "").trim();
  if (compileErr && !data.program_output && !data.program_error && data.status !== "0") {
    return res.status(200).json({
      status: "compile_error",
      message: cap(rename(compileErr)),
    });
  }

  const exit = parseInt(data.status, 10);
  return res.status(200).json({
    status: exit === 0 ? "ok" : "runtime_error",
    stdout: cap(data.program_output),
    stderr: cap(rename(data.program_error)),
    exit: Number.isNaN(exit) ? 1 : exit,
  });
};
