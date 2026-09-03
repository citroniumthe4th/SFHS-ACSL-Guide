#!/usr/bin/env python3
"""Replaces the `why` text of named questions and touches nothing else.

The stem, the choices, the answer index, and the check are all left byte for byte alone,
so a prose pass cannot quietly change what a question claims is correct.
"""
import os
import re
import sys

DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "data")


def apply(filename, replacements):
    path = os.path.join(DATA, filename)
    src = open(path).read()
    missed = []
    for qid, text in replacements.items():
        pat = re.compile(r'(\{ id:"%s",.*?why:`)(.*?)(` \},?\n)' % re.escape(qid), re.S)
        m = pat.search(src)
        if not m:
            missed.append(qid)
            continue
        if "`" in text or "${" in text:
            raise SystemExit("%s: backtick or template hole in replacement text" % qid)
        src = src[:m.start(2)] + text.strip("\n") + src[m.end(2):]
    if missed:
        raise SystemExit("not found in %s: %s" % (filename, ", ".join(missed)))
    open(path, "w").write(src)
    print("rewrote %d explanations in %s" % (len(replacements), filename))
