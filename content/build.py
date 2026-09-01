#!/usr/bin/env python3
"""Builds public/data/frq.js.

Expected outputs are never typed by hand. They come from running the Python reference
solution, and the Java and C++ references then have to reproduce them exactly or the build
fails. That is the only thing keeping the three starter templates honest.
"""
import importlib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))

import codegen  # noqa: E402
import server   # noqa: E402

LANGS = ["python", "java", "cpp"]
MODULES = ("frq_a", "frq_b", "frq_c")


def as_block(case):
    """A test case is one line per parameter. A bare string is the one parameter shorthand."""
    return [case] if isinstance(case, str) else list(case)


def run_all(lang, program, blocks):
    stdin = "\n".join("\n".join(b) for b in blocks) + "\n"
    r = server.run_code(lang, program, stdin)
    if r["status"] != "ok":
        raise SystemExit("%s failed: %s" % (lang, r.get("message") or r.get("stderr")))
    out = r["stdout"].split("\n")
    if out and out[-1] == "":
        out.pop()
    if len(out) != len(blocks):
        raise SystemExit("%s produced %d lines for %d cases:\n%s"
                         % (lang, len(out), len(blocks), r["stdout"][:800]))
    return out


def build(only=None):
    problems = [p for m in MODULES for p in importlib.import_module(m).PROBLEMS]
    seen = set()
    out = []
    for p in problems:
        if p["id"] in seen:
            raise SystemExit("duplicate problem id %s" % p["id"])
        seen.add(p["id"])
        if only and p["id"] not in only:
            continue

        fname, params, ret = p["fname"], p["params"], p["ret"]
        samples = [as_block(c) for c in p["samples"]]
        tests = [as_block(c) for c in p["tests"]]
        if len(samples) != 3:
            raise SystemExit("%s: ACSL ships 3 sample sets, found %d" % (p["id"], len(samples)))
        if len(tests) != 12:
            raise SystemExit("%s: needs 12 test cases, found %d" % (p["id"], len(tests)))
        for b in samples + tests:
            if len(b) != len(params):
                raise SystemExit("%s: a case has %d lines but the function takes %d parameters"
                                 % (p["id"], len(b), len(params)))

        refs = {L: codegen.reference(L, fname, params, ret, p["sol"]) for L in LANGS}
        blocks = samples + tests
        expected = run_all("python", refs["python"], blocks)
        for L in ("java", "cpp"):
            got = run_all(L, refs[L], blocks)
            if got != expected:
                bad = [(i, blocks[i], expected[i], got[i])
                       for i in range(len(got)) if got[i] != expected[i]]
                raise SystemExit("%s: %s disagrees with python on %d case(s):\n%s"
                                 % (p["id"], L, len(bad), "\n".join(map(str, bad[:4]))))

        rec = {k: p[k] for k in ("id", "division", "contest", "title", "blurb", "statement",
                                 "example", "input_spec", "output_spec", "constraints",
                                 "approach")}
        rec["fname"] = fname
        rec["task"] = p["task"]
        rec["samples"] = [{"in": b, "out": o} for b, o in zip(samples, expected[:3])]
        rec["tests"] = [{"in": b, "out": o} for b, o in zip(tests, expected[3:])]
        rec["starter"] = {L: codegen.starter(L, fname, params, ret) for L in LANGS}
        rec["solution"] = refs
        out.append(rec)
        print("  ok  %-18s %s" % (p["id"], expected[3:6]))
    return out


if __name__ == "__main__":
    only = set(sys.argv[1:]) or None
    data = build(only)
    if only:
        print("\n(partial build, not writing frq.js)")
        sys.exit(0)
    dest = os.path.join(os.path.dirname(HERE), "public", "data", "frq.js")
    with open(dest, "w") as f:
        f.write("window.FRQ = ")
        json.dump(data, f, indent=1)
        f.write(";\n")
    print("\nwrote %s (%d problems)" % (dest, len(data)))
