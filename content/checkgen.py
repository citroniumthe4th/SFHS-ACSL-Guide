#!/usr/bin/env python3
"""Recomputes generated questions against solvers.py.

The generator in public/data/gen.js builds a question and its own answer. That is exactly
the arrangement where a bug is invisible, because the same mistake produces both the
question and the key. So every generated question also carries a `check`, a Python
expression in the same form the hand written bank uses, and this runs a few hundred seeds
per category through it: the expression is evaluated against the independent
implementations in solvers.py, and its value has to equal the option the generator marked
correct.

Where it can, the generator works over the expression tree it built and leaves the parsing
of the rendered string to this side. A precedence bug in the renderer then shows up here as
a disagreement rather than as a question that is quietly wrong in both places.

Usage: python3 content/checkgen.py [seeds per topic]
"""
import json
import os
import re
import resource
import signal
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(os.path.dirname(HERE), "public")
sys.path.insert(0, HERE)

import solvers  # noqa: E402

CHECK_TIMEOUT = 5
DEFAULT_SEEDS = 400

ENV = {k: v for k, v in vars(solvers).items() if not k.startswith("_")}
ENV.update(abs=abs, len=len, int=int, str=str, sum=sum, sorted=sorted, range=range,
           list=list, set=set, min=min, max=max, enumerate=enumerate, reversed=reversed,
           map=map, any=any, all=all, format=format)


class CheckTimeout(Exception):
    pass


def _alarm(signum, frame):
    raise CheckTimeout()


def guard():
    """Checks are questions, and a question is data. Cap what a runaway one can take."""
    sys.setrecursionlimit(3000)
    try:
        resource.setrlimit(resource.RLIMIT_AS, (2 << 30, 2 << 30))
    except (ValueError, OSError):
        pass


def generate(seeds):
    """Runs gen.js under node and returns every question it built."""
    script = """
      global.window = {};
      require(%s);
      const G = global.window.GEN;
      const out = [];
      for (const topic of G.topics) {
        for (let s = 1; s <= %d; s++) {
          const q = G.make(topic, s * 2654435761 %% 4294967296);
          out.push({ id: q.id, topic: q.topic, check: q.check,
                     answer: q.choices[q.ans], choices: q.choices });
        }
      }
      process.stdout.write(JSON.stringify(out));
    """ % (json.dumps(os.path.join(PUBLIC, "data", "gen.js")), seeds)
    p = subprocess.run(["node", "-e", script], capture_output=True, text=True)
    if p.returncode != 0:
        raise SystemExit("gen.js failed to run:\n" + (p.stderr or p.stdout))
    return json.loads(p.stdout)


def main():
    seeds = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SEEDS
    questions = generate(seeds)
    guard()
    signal.signal(signal.SIGALRM, _alarm)

    if not questions:
        raise SystemExit("checkgen: gen.js produced nothing")

    bad, by_topic = [], {}
    for q in questions:
        by_topic[q["topic"]] = by_topic.get(q["topic"], 0) + 1

        # A question whose options are not distinct is a broken question even when the
        # marked answer is right, so it fails here too.
        if len(set(q["choices"])) != len(q["choices"]):
            bad.append((q["id"], "duplicate options", q["choices"]))
            continue

        signal.alarm(CHECK_TIMEOUT)
        try:
            got = str(eval(q["check"], dict(ENV)))
        except CheckTimeout:
            bad.append((q["id"], "check timed out", q["check"]))
            continue
        except Exception as e:
            bad.append((q["id"], "check raised %s: %s" % (type(e).__name__, e), q["check"]))
            continue
        finally:
            signal.alarm(0)

        if got != q["answer"]:
            bad.append((q["id"], "generator says %r, solvers say %r" % (q["answer"], got),
                        q["check"]))

    for qid, why, detail in bad[:20]:
        print("%s\n    %s\n    %s" % (qid, why, detail))
    if bad:
        raise SystemExit("\n%d of %d generated questions disagree with solvers.py"
                         % (len(bad), len(questions)))

    order = sorted(by_topic)
    print("%d generated questions checked against solvers.py, all agree"
          % len(questions))
    for t in order:
        print("  %-22s %d" % (t, by_topic[t]))


if __name__ == "__main__":
    main()
