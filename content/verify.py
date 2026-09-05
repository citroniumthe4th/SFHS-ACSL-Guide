#!/usr/bin/env python3
"""Recomputes every multiple choice answer that can be recomputed.

A question may carry a `check` field holding a Python expression, or a snippet ending in a
variable called RESULT. It is evaluated against the solvers in solvers.py and its value has to
equal the text of the choice marked correct. When the marked answer is None of the above, the
computed value has to be absent from choices A through D instead.

Checks are questions, and a question is data. Each one runs under a wall clock alarm and a
memory cap so a runaway expression fails loudly rather than taking the machine down.
"""
import json
import os
import random
import re
import resource
import signal
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "public", "data")
sys.path.insert(0, HERE)

import solvers  # noqa: E402

NONE = "None of the above"
CHECK_TIMEOUT = 5

ENV = {k: v for k, v in vars(solvers).items() if not k.startswith("_")}
ENV.update(abs=abs, len=len, int=int, str=str, sum=sum, sorted=sorted, range=range,
           list=list, set=set, min=min, max=max, enumerate=enumerate, reversed=reversed,
           map=map, any=any, all=all, format=format)


class CheckTimeout(Exception):
    pass


def _alarm(signum, frame):
    raise CheckTimeout()


def run_check(src, scope):
    signal.signal(signal.SIGALRM, _alarm)
    signal.alarm(CHECK_TIMEOUT)
    try:
        if "\n" in src:
            exec(src, scope)
            return str(scope["RESULT"])
        return str(eval(src, scope))
    finally:
        signal.alarm(0)


def load_bank():
    files = sorted(f for f in os.listdir(DATA)
                   if re.match(r"^mcq\d+\.js$", f))
    files.sort(key=lambda f: int(re.findall(r"\d+", f)[0]))
    js = ("global.window={};"
          + "".join("require('%s');" % os.path.join(DATA, f) for f in files)
          + "console.log(JSON.stringify(window.MCQ));")
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit(out.stderr)
    return json.loads(out.stdout)


def check_positions(bank):
    """Fails if the answer a student sees lands in one position too often.

    Every question in this bank was written with its right answer first, which put 195 of the
    219 correct answers in position A. Nothing here caught that, because each answer was
    individually correct; the defect only exists across the set. A student could have scored
    89 percent by pressing A and learned nothing.

    app.js now shuffles the choices before showing them, so what matters is the distribution
    of the presented order, not the stored one. This reproduces that shuffle over the whole
    bank and checks the result is somewhere near even.
    """
    rounds, counts, longest = 40, {}, max(len(q["choices"]) for q in bank)
    rng = random.Random(20260904)
    for _ in range(rounds):
        for q in bank:
            n = len(q["choices"])
            fixed = 1 if str(q["choices"][-1]).strip().lower() == NONE.lower() else 0
            order = list(range(n - fixed))
            rng.shuffle(order)
            order += list(range(n - fixed, n))
            seen = order.index(q["ans"])
            counts[seen] = counts.get(seen, 0) + 1

    total = sum(counts.values())
    worst = max(counts.values())
    share = 100.0 * worst / total
    spread = " ".join("%s %.0f%%" % ("ABCDE"[i], 100.0 * counts.get(i, 0) / total)
                      for i in range(longest))
    print("answer positions as shown: %s" % spread)
    if share > 35.0:
        print("  FAIL one position holds %.0f%% of the answers, over the 35%% ceiling" % share)
        sys.exit(1)


def main():
    try:
        resource.setrlimit(resource.RLIMIT_AS, (2 << 30, 2 << 30))
    except (ValueError, OSError):
        pass
    sys.setrecursionlimit(3000)

    # The conventions the whole bank is checked against get checked themselves first. A wrong
    # solver agrees with a wrong question, and both look verified.
    solvers._selfcheck()

    bank = load_bank()
    seen, bad, checked = set(), [], 0
    for q in bank:
        qid = q["id"]
        if qid in seen:
            bad.append((qid, "duplicate id"))
        seen.add(qid)

        if len(q["choices"]) != 5:
            bad.append((qid, "needs exactly five choices"))
            continue
        if q["choices"][4] != NONE:
            bad.append((qid, "choice E must be " + NONE))
        if len(set(q["choices"])) != 5:
            bad.append((qid, "repeated choice text"))
        if not 0 <= q["ans"] < 5:
            bad.append((qid, "answer index out of range"))
            continue
        # A floor, not a target. Every explanation currently clears it with room to spare,
        # so it costs nothing to keep and it catches a question shipped with a stub.
        if len((q.get("why") or "").strip()) < 120:
            bad.append((qid, "explanation is missing or too thin"))

        if "check" not in q:
            continue
        checked += 1
        try:
            got = run_check(q["check"], dict(ENV, CHOICES=q["choices"]))
        except CheckTimeout:
            bad.append((qid, "check did not finish in %ds, so it is not a usable check"
                        % CHECK_TIMEOUT))
            continue
        except Exception as e:
            bad.append((qid, "check raised %s: %s" % (type(e).__name__, e)))
            continue

        want = str(q["choices"][q["ans"]])
        if want == NONE:
            if got in [str(c) for c in q["choices"][:4]]:
                bad.append((qid, "marked None of the above but %r is listed" % got))
        elif got != want:
            bad.append((qid, "check says %r, marked answer is %r" % (got, want)))

    check_positions(bank)

    none_ans = sum(1 for q in bank if q["choices"][q["ans"]] == NONE)
    print("%d questions, %d machine checked, %d conceptual, %d answer None of the above (%.0f%%)"
          % (len(bank), checked, len(bank) - checked, none_ans,
             100.0 * none_ans / max(len(bank), 1)))
    for qid, msg in bad:
        print("  FAIL %-10s %s" % (qid, msg))
    if bad:
        sys.exit(1)
    print("all good")


if __name__ == "__main__":
    main()
