#!/usr/bin/env python3
"""Replaces the `approach` text of named problems and touches nothing else.

Statement, example, specs, constraints, test data, and all three reference solutions are
left byte for byte alone, so a prose pass cannot change what a problem asks for.
"""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))


def apply(replacements):
    files = {f: open(f).read() for f in sorted(glob.glob(os.path.join(HERE, "frq_*.py")))}
    done, missed = 0, list(replacements)
    for pid, text in replacements.items():
        pat = re.compile(r'(id="%s",.*?approach="""\n)(.*?)(\n""",)' % re.escape(pid), re.S)
        for f, src in files.items():
            m = pat.search(src)
            if not m:
                continue
            if '"""' in text:
                raise SystemExit("%s: triple quote in replacement text" % pid)
            files[f] = src[:m.start(2)] + text.strip("\n") + src[m.end(2):]
            missed.remove(pid)
            done += 1
            break
    if missed:
        raise SystemExit("not found: %s" % ", ".join(missed))
    for f, src in files.items():
        open(f, "w").write(src)
    print("rewrote %d approach sections" % done)
