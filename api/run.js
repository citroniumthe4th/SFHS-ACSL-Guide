// Vercel serverless function: compiles and runs a student submission.
//
// Vercel's Node runtime has no JDK and no g++, so the actual compiling happens on a
// remote sandbox. Wandbox is the default because it needs no API key. Point RUNNER_URL
// at your own Piston instance if you'd rather not lean on a free community service.

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

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "POST only" });
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
  const spec = COMPILERS[lang];
  if (!spec) return res.status(400).json({ status: "error", message: "Unsupported language" });
  if (typeof code !== "string" || code.length > 200000) {
    return res.status(400).json({ status: "error", message: "Bad source" });
  }

  const payload = {
    compiler: spec.compiler,
    code: lang === "java" ? shimJava(code) : code,
    stdin: String(stdin),
    "compiler-option-raw": spec.raw || "",
  };

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 45000);
  let data;
  try {
    const r = await fetch(WANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "sfhs-acsl-guide/1.0" },
      body: JSON.stringify(payload),
      signal: ctl.signal,
    });
    if (!r.ok) {
      const text = await r.text();
      return res.status(200).json({
        status: "error",
        message: `Compile service returned ${r.status}. ${text.slice(0, 300)}`,
      });
    }
    data = await r.json();
  } catch (e) {
    return res.status(200).json({
      status: "error",
      message:
        e.name === "AbortError"
          ? "The compile service did not answer in time. Try running again."
          : `Could not reach the compile service: ${e.message}`,
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

const compileErr = (data.compiler_error || "").trim();
  if (compileErr && !data.program_output && !data.program_error && data.status !== "0") {
    return res.status(200).json({
      status: "compile_error",
      message: rename(compileErr),
    });
  }

  const exit = parseInt(data.status, 10);
  return res.status(200).json({
    status: exit === 0 ? "ok" : "runtime_error",
    stdout: data.program_output || "",
    stderr: rename(data.program_error),
    exit: Number.isNaN(exit) ? 1 : exit,
  });
};
