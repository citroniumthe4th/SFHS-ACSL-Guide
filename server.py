#!/usr/bin/env python3
"""Local server for the ACSL trainer: serves public/ and compiles+runs submitted code.

Binds to 127.0.0.1 only. It runs whatever code you type, on your machine, with your
permissions -- same trust level as running a script yourself. Do not expose it.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "public")
INCLUDE_DIR = os.path.join(HERE, "cppinclude")
COMPILE_TIMEOUT = 30
RUN_TIMEOUT = 12
MAX_CODE = 200_000

# (compile argv or None, run argv, source filename). {d} is the temp dir.
LANGS = {
    "python": {
        "file": "solution.py",
        "compile": None,
        "run": [sys.executable, "{d}/solution.py"],
        "label": "Python 3",
    },
    "java": {
        "file": "Solution.java",
        "compile": ["javac", "--release", "17", "-nowarn", "-d", "{d}", "{d}/Solution.java"],
        "run": ["java", "-XX:+UseSerialGC", "-Xss64m", "-cp", "{d}", "Solution"],
        "label": "Java 17",
    },
    "cpp": {
        "file": "solution.cpp",
        "compile": ["c++", "-std=c++17", "-O1", "-w", "-I", INCLUDE_DIR, "-o", "{d}/solution", "{d}/solution.cpp"],
        "run": ["{d}/solution"],
        "label": "C++17",
    },
}


def _fmt(argv, d):
    return [a.replace("{d}", d) for a in argv]


def run_code(lang, code, stdin_text):
    spec = LANGS[lang]
    d = tempfile.mkdtemp(prefix="acsl-")
    try:
        with open(os.path.join(d, spec["file"]), "w") as f:
            f.write(code)
        if spec["compile"]:
            try:
                p = subprocess.run(_fmt(spec["compile"], d), capture_output=True,
                                   text=True, timeout=COMPILE_TIMEOUT)
            except subprocess.TimeoutExpired:
                return {"status": "compile_error", "message": "Compiler timed out."}
            except FileNotFoundError:
                return {"status": "error",
                        "message": "Toolchain for %s not found on this machine." % spec["label"]}
            if p.returncode != 0:
                return {"status": "compile_error",
                        "message": (p.stderr or p.stdout).replace(d + "/", "").replace(d, "")}
        try:
            p = subprocess.run(_fmt(spec["run"], d), input=stdin_text, capture_output=True,
                               text=True, timeout=RUN_TIMEOUT)
        except subprocess.TimeoutExpired:
            return {"status": "timeout",
                    "message": "Program did not finish within %ds." % RUN_TIMEOUT}
        except FileNotFoundError:
            return {"status": "error",
                    "message": "Runtime for %s not found on this machine." % spec["label"]}
        return {
            "status": "ok" if p.returncode == 0 else "runtime_error",
            "stdout": p.stdout,
            "stderr": (p.stderr or "").replace(d + "/", "").replace(d, ""),
            "exit": p.returncode,
        }
    finally:
        shutil.rmtree(d, ignore_errors=True)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def log_message(self, *a):
        pass

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        # Vercel serves this in production. Locally it would 404 on every page load and
        # bury real errors in the console, so answer it with an empty script.
        if self.path.startswith("/_vercel/insights/"):
            self.send_response(204)
            self.send_header("Content-Type", "application/javascript")
            self.end_headers()
            return
        return super().do_GET()

    def do_POST(self):
        if self.path.rstrip("/") not in ("/run", "/api/run"):
            return self._json({"status": "error", "message": "unknown endpoint"}, 404)
        try:
            n = int(self.headers.get("Content-Length", 0))
            req = json.loads(self.rfile.read(n))
            lang = req["lang"]
            code = req["code"]
            stdin_text = req.get("stdin", "")
            if lang not in LANGS:
                raise ValueError("unsupported language")
            if not isinstance(code, str) or len(code) > MAX_CODE:
                raise ValueError("bad source")
        except Exception as e:
            return self._json({"status": "error", "message": "Bad request: %s" % e}, 400)
        self._json(run_code(lang, code, stdin_text))

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8777
    missing = [s["label"] for s in LANGS.values()
               if shutil.which((s["compile"] or s["run"])[0]) is None
               and not (s["compile"] or s["run"])[0].startswith(("/", "{"))]
    if missing:
        print("warning: toolchain missing for %s" % ", ".join(missing))
    srv = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print("ACSL trainer running at http://127.0.0.1:%d" % port)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
