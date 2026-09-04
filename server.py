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
MAX_STDIN = 100_000
MAX_BODY = 1_000_000

# Mirrors what vercel.json sends in production, so a policy that breaks the editor breaks
# it here first rather than after a deploy.
HEADERS = [
    ("Cache-Control", "no-store"),
    ("Content-Security-Policy",
     "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; "
     "img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; "
     "form-action 'none'; frame-ancestors 'none'; object-src 'none'"),
    ("X-Content-Type-Options", "nosniff"),
    ("Referrer-Policy", "no-referrer"),
    ("X-Frame-Options", "DENY"),
]

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


# The app's own sections, which serve the shell and are routed in the browser. Mirrors the
# rewrites in vercel.json; anything outside this list is a real 404 in both places.
APP_ROUTES = ("guide", "practice", "exam", "missed", "problems", "problem")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def translate_path(self, path):
        parts = path.split("?")[0].strip("/").split("/")
        if parts and parts[0] in APP_ROUTES and len(parts) <= 2:
            return os.path.join(ROOT, "index.html")
        return super().translate_path(path)

    def log_message(self, *a):
        pass

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path.rstrip("/") not in ("/run", "/api/run"):
            return self._json({"status": "error", "message": "unknown endpoint"}, 404)
        try:
            n = int(self.headers.get("Content-Length", 0))
            if n > MAX_BODY:
                raise ValueError("body too large")
            req = json.loads(self.rfile.read(n))
            lang = req["lang"]
            code = req["code"]
            stdin_text = req.get("stdin", "")
            if lang not in LANGS:
                raise ValueError("unsupported language")
            if not isinstance(code, str) or len(code) > MAX_CODE:
                raise ValueError("bad source")
            if not isinstance(stdin_text, str) or len(stdin_text) > MAX_STDIN:
                raise ValueError("bad input")
        except Exception as e:
            return self._json({"status": "error", "message": "Bad request: %s" % e}, 400)
        self._json(run_code(lang, code, stdin_text))

    def send_error(self, code, message=None, explain=None):
        # Vercel serves public/404.html for anything it cannot match. Do the same here so a
        # missing path looks the same locally as it will once deployed.
        page = os.path.join(ROOT, "404.html")
        if code != 404 or not os.path.exists(page):
            return super().send_error(code, message, explain)
        body = open(page, "rb").read()
        self.send_response(404, message)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def end_headers(self):
        for k, v in HEADERS:
            self.send_header(k, v)
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
