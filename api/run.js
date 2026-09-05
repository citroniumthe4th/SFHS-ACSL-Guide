// Vercel serverless function: compiles and runs a student submission.
//
// Vercel's Node runtime has no JDK and no g++, so the actual compiling happens on a remote
// sandbox. There is more than one, tried in order, because on 5 September 2026 Wandbox spent
// a day returning "Failed to get uid" on every request and the editor had nothing to fall
// back on. A backup only helps if it speaks a different service's protocol, so each entry
// below carries its own request shape and its own reader.
//
// RUNNER_URL still overrides the first entry's address for a Wandbox-compatible host.
//
// The third is a courtesy instance the Judge0 project runs for its own documentation, so it
// sits last on purpose: it is only ever reached when the two ahead of it are both down.

const UA = "sfhs-acsl-guide/1.0";

const COMPILERS = {
  python: {
    label: "Python 3.11",
    wandbox: "cpython-3.11.10",
    godbolt: "python311",
    godboltLang: "python",
    judge0: 113,
    source: "solution.py",
  },
  java: {
    label: "Java 21",
    wandbox: "openjdk-jdk-21+35",
    godbolt: "java2100",
    godboltLang: "java",
    judge0: 91,
    source: "Solution.java",
  },
  cpp: {
    label: "C++17 (GCC 13)",
    wandbox: "gcc-13.2.0",
    godbolt: "g132",
    godboltLang: "c++",
    judge0: 105,
    source: "solution.cpp",
    raw: "-std=c++17\n-O2",
    args: "-std=c++17 -O2",
  },
};

// Neither host will compile a public class whose name does not match the file it was handed.
function unpublic(code) {
  return code.replace(/\bpublic\s+(?=(final\s+|abstract\s+)?class\s+Solution\b)/, "");
}

// Wandbox writes every submission to prog.java and Judge0 writes it to Main.java, and each
// runs the class its own file is named after, so both need an entry point of that name.
// Compiler Explorer finds main on its own and needs only the modifier gone.
function wrapJava(code, entry) {
  return (
    unpublic(code) +
    "\n\npublic class " + entry +
    " { public static void main(String[] a) throws Exception { Solution.main(a); } }\n"
  );
}

// Judge0 answers a program whose output is not valid UTF-8 with HTTP 400 unless both
// directions are base64, which reads as a total outage to anyone whose program prints a
// stray byte. Nothing else on the list needs this, so it stays local to that entry.
const toBase64 = (text) => Buffer.from(String(text), "utf8").toString("base64");

const fromBase64 = (text) => {
  if (text === undefined || text === null) return "";
  if (typeof text !== "string") throw new Error("Invalid runner stream");
  return Buffer.from(text, "base64").toString("utf8");
};

const MAX_CODE = 200000;
const MAX_STDIN = 100000;
const MAX_RESPONSE = 1024 * 1024;

// One attempt is capped below the next, and the whole handler below the platform's own 20s,
// so a dead first choice cannot eat the budget the second one needs.
const DEADLINE_MS = 16000;
const PER_TRY_MS = 10000;
const MIN_TRY_MS = 2500;

const BACKENDS = [
  {
    name: "wandbox",
    url: () => process.env.RUNNER_URL || "https://wandbox.org/api/compile.json",
    body: (spec, lang, code, stdin) => ({
      compiler: spec.wandbox,
      code: lang === "java" ? wrapJava(code, "prog") : code,
      stdin,
      "compiler-option-raw": spec.raw || "",
    }),
    read: (d) => {
      for (const key of ["compiler_error", "program_output", "program_error"]) {
        if (d[key] !== undefined && typeof d[key] !== "string") {
          throw new Error("Invalid runner stream");
        }
      }
      const hasExit = (typeof d.status === "string" && /^\d+$/.test(d.status))
        || (Number.isInteger(d.status) && d.status >= 0);
      if (!hasExit && !(typeof d.signal === "string" && d.signal)) {
        throw new Error("Invalid runner status");
      }
      const exit = hasExit ? Number(d.status) : 1;
      return {
        compileErr: d.compiler_error || "",
        stdout: d.program_output || "",
        stderr: d.program_error || "",
        // Wandbox reports a failed build as a non-zero status with no program streams.
        built: !(d.compiler_error && !d.program_output && !d.program_error && exit !== 0),
        exit,
      };
    },
  },
  {
    name: "godbolt",
    url: (spec) => "https://godbolt.org/api/compiler/" + spec.godbolt + "/compile",
    headers: { Accept: "application/json" },
    body: (spec, lang, code, stdin) => ({
      source: lang === "java" ? unpublic(code) : code,
      lang: spec.godboltLang,
      allowStoreCodeDebug: false,
      options: {
        userArguments: spec.args || "",
        executeParameters: { args: [], stdin },
        compilerOptions: { executorRequest: true },
        filters: { execute: true },
      },
    }),
    read: (d) => {
      // Compiler Explorer answers with one object per line of output.
      const joined = (rows) => {
        if (rows === undefined || rows === null) return "";
        if (!Array.isArray(rows)) throw new Error("Invalid runner stream");
        return rows.map((r) => {
          if (!r || typeof r.text !== "string") throw new Error("Invalid runner line");
          return r.text;
        }).join("\n");
      };
      if (typeof d.code !== "number" || !Array.isArray(d.stdout)) {
        throw new Error("Invalid runner stream");
      }
      const build = d.buildResult || {};
      if (d.networkError || build.networkError) throw new Error("Runner network failure");
      if (d.truncated || build.truncated) {
        throw Object.assign(new Error("Runner output was truncated"), { code: "OUTPUT_LIMIT" });
      }
      if (d.timedOut || build.timedOut) {
        throw Object.assign(new Error("Runner time limit exceeded"), { code: "TIME_LIMIT" });
      }
      const built = build.code === undefined || build.code === 0;
      if (built && d.didExecute === false) throw new Error("Runner did not execute the program");
      return {
        compileErr: built ? "" : joined(build.stderr),
        stdout: joined(d.stdout),
        stderr: joined(d.stderr),
        built,
        exit: d.code,
      };
    },
  },
  {
    name: "judge0",
    url: () => "https://ce.judge0.com/submissions?base64_encoded=true&wait=true",
    body: (spec, lang, code, stdin) => ({
      source_code: toBase64(lang === "java" ? wrapJava(code, "Main") : code),
      language_id: spec.judge0,
      // Options are read as plain text even when the streams are not.
      compiler_options: spec.args || "",
      stdin: toBase64(stdin),
    }),
    read: (d) => {
      const stdout = fromBase64(d.stdout);
      const stderr = fromBase64(d.stderr);
      const compileOut = fromBase64(d.compile_output);
      const status = d.status && d.status.id;
      // Queued/processing and internal failures are not verdicts about the student's code.
      if (!Number.isInteger(status) || status < 3 || status > 12) {
        throw new Error("Runner did not return a program result");
      }
      if (status === 5) {
        throw Object.assign(new Error("Program time limit exceeded"), { code: "TIME_LIMIT" });
      }
      const built = status !== 6; // 6 is Judge0's compilation error
      return {
        compileErr: built ? "" : compileOut,
        stdout,
        stderr,
        built,
        // exit_code comes back null even for a program that really did exit non-zero, so
        // the status stands in for it. The page only asks whether this is zero.
        exit: status === 3 ? 0 : 1,
      };
    },
  },
];

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
  return data;
}

async function attempt(backend, spec, lang, code, stdin, budget) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), budget);
  try {
    const r = await fetch(backend.url(spec), {
      method: "POST",
      headers: Object.assign(
        { "Content-Type": "application/json", "User-Agent": UA },
        backend.headers || {}
      ),
      body: JSON.stringify(backend.body(spec, lang, code, stdin)),
      signal: ctl.signal,
    });
    if (!r.ok) {
      if (r.body) await r.body.cancel();
      const error = new Error("upstream " + r.status);
      error.code = "HTTP_" + r.status;
      throw error;
    }
    return backend.read(await readRunnerResponse(r));
  } finally {
    clearTimeout(timer);
  }
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

  const started = Date.now();
  let data = null;
  let failure = null;
  let used = -1;
  for (let i = 0; i < BACKENDS.length; i++) {
    const left = DEADLINE_MS - (Date.now() - started);
    if (left < MIN_TRY_MS) break;
    try {
      data = await attempt(BACKENDS[i], spec, lang, code, input, Math.min(PER_TRY_MS, left));
      used = i;
      break;
    } catch (e) {
      failure = e;
      // A program that prints megabytes will do it again on the next host, and a program
      // that never finishes will hang there too. Neither is the runner's fault.
      if (e.code === "OUTPUT_LIMIT" || e.code === "TIME_LIMIT" || e.name === "AbortError") break;
      console.error("runner %s failed: %s", BACKENDS[i].name, e.code || e.name);
    }
  }

  if (used > 0 && console && typeof console.log === "function") {
    console.log("ran on backup runner:", BACKENDS[used].name);
  }

  if (!data) {
    if (failure && failure.code === "TIME_LIMIT") {
      return res.status(200).json({
        status: "timeout",
        message: "The compiler or program exceeded the service's time limit. Check your loops and try again.",
      });
    }
    if (failure && failure.name === "AbortError") {
      return res.status(200).json({
        status: "timeout",
        message: "The compile service did not finish within ten seconds. It may be busy, or your "
          + "program may be taking too long. Check your loops and try again.",
      });
    }
    if (failure && failure.code === "OUTPUT_LIMIT") {
      return res.status(200).json({
        status: "error",
        message: "The program returned too much output. Remove debug printing and check your loops.",
      });
    }
    console.error("every runner failed");
    return res.status(200).json({
      status: "error",
      message: "Every service we use to compile code is unavailable right now. This is not a "
        + "problem with your program, and there is nothing for you to fix. Your code is saved "
        + "in this browser, so come back and run it later.",
    });
  }

  // Each host names the file after its own runner, and GCC colors its diagnostics, which
  // arrive as escape codes that would land in the page as garbage. Point both back at
  // something the student recognizes.
  const ESC = String.fromCharCode(27);
  const CSI = new RegExp(ESC + "\\[[0-9;?]*[ -/]*[@-~]", "g");
  const OSC = new RegExp(ESC + "\\][^\\u0007" + ESC + "]*(?:\\u0007|" + ESC + "\\\\)", "g");
  const rename = (t) =>
    String(t || "")
      .replace(CSI, "")
      .replace(OSC, "")
      .replace(/\bprog\.java\b/g, "Solution.java")
      .replace(/\bprog\.(cc|cpp)\b/g, "solution.cpp")
      .replace(/\bprog\.py\b/g, "solution.py")
      .replace(/<source>/g, spec.source)
      .replace(/(?:\/app\/)?\boutput\.s\b/g, spec.source)
      .replace(/(?:\/box\/)?\bscript\.py\b/g, spec.source)
      .replace(/\bMain\.java\b/g, "Solution.java")
      .replace(/\bmain\.cpp\b/g, "solution.cpp");

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

  const compileErr = (data.compileErr || "").trim();
  if (!data.built) {
    return res.status(200).json({
      status: "compile_error",
      message: cap(rename(compileErr)) || "Compilation failed, but the service returned no diagnostics.",
    });
  }

  return res.status(200).json({
    status: data.exit === 0 ? "ok" : "runtime_error",
    stdout: cap(data.stdout),
    stderr: cap(rename(data.stderr)),
    exit: data.exit,
  });
};
