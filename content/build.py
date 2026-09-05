#!/usr/bin/env python3
"""Builds public/data/frq.js.

Practice outputs come from the Python reference; Java and C++ must reproduce them.
Additional boundary cases have independently derived expectations, so agreement between
three implementations is not the only check of correctness.
"""
import importlib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))

import codegen  # noqa: E402
from hints import HINTS  # noqa: E402
from boundary_cases import CASES  # noqa: E402
import server   # noqa: E402

import html as _html
import re as _re

LANGS = ["python", "java", "cpp"]
MODULES = ("frq_a", "frq_b", "frq_c", "frq_d", "frq_e", "frq_f")


def as_block(case):
    """A test case is one line per parameter. A bare string is the one parameter shorthand."""
    return [case] if isinstance(case, str) else list(case)


def cell(example, label):
    """Pull one row out of the worked Example table as plain text."""
    m = _re.search(r"<tr><th>%s</th><td>(.*?)</td></tr>" % label, example, _re.S)
    if not m:
        return None
    text = m.group(1).replace("<br>", "\n")
    text = _re.sub(r"<[^>]+>", "", text)
    return _html.unescape(text).strip()


def check_example(pid, example, sample_in, sample_out):
    """The worked Example has to agree with what the reference solution actually does.

    Every Example in this file states sample 1. A hand written trace that drifts from the
    code is worse than no trace at all, because a student will trust it over their own
    arithmetic, so a mismatch fails the build.
    """
    shown_in, shown_out = cell(example, "Input"), cell(example, "Output")
    if shown_in is None or shown_out is None:
        raise SystemExit("%s: Example needs both an Input row and an Output row" % pid)
    if shown_in != "\n".join(sample_in):
        raise SystemExit("%s: Example Input is %r but sample 1 is %r"
                         % (pid, shown_in, "\n".join(sample_in)))
    if shown_out != sample_out:
        raise SystemExit("%s: Example says the output is %r, the solution produces %r"
                         % (pid, shown_out, sample_out))


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
        boundaries = CASES[p["id"]]
        blocks = samples + tests + [case for case, _ in boundaries]
        expected = run_all("python", refs["python"], blocks)
        # Everything else in this file fails through SystemExit, and an assert would go away
        # under python -O, which is not something a correctness gate should depend on.
        got = expected[len(samples) + len(tests):]
        want = [out for _, out in boundaries]
        if got != want:
            wrong = [(case, w, g) for (case, w), g in zip(boundaries, got) if w != g]
            raise SystemExit("%s: %d boundary case(s) disagree with the statement:\n%s"
                             % (p["id"], len(wrong), "\n".join(map(str, wrong))))
        for L in ("java", "cpp"):
            got = run_all(L, refs[L], blocks)
            if got != expected:
                bad = [(i, blocks[i], expected[i], got[i])
                       for i in range(len(got)) if got[i] != expected[i]]
                raise SystemExit("%s: %s disagrees with python on %d case(s):\n%s"
                                 % (p["id"], L, len(bad), "\n".join(map(str, bad[:4]))))

        check_example(p["id"], p["example"], samples[0], expected[0])

        rec = {k: p[k] for k in ("id", "division", "contest", "title", "blurb", "statement",
                                 "example", "input_spec", "output_spec", "constraints",
                                 "approach")}
        assert len(HINTS[p["id"]]) == 2, p["id"]
        rec["hints"] = HINTS[p["id"]]
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
    from test_drivers import check_drivers
    check_drivers()
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
