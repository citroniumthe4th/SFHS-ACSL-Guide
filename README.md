# SFHS ACSL Guide

A study guide and practice environment for the American Computer Science League, split by
division.

Junior and Senior share eight categories. Where they differ, Junior gets the four flavors of
What Does This Program Do and Senior gets LISP, FSAs and Regular Expressions, and Assembly
Language. The division toggle in the header switches both sections at once.

## What is in it

**Guide.** Sixteen pages, one per category per division, covering the material and the mistakes
that actually cost points.

**Practice.** 219 short answer questions in the format ACSL uses on the contest: five choices
with "None of the above" as E, which is the correct answer about 11 percent of the time. Every
question shows its reasoning once you answer.

**Programming.** Twelve problems, six Junior and six Senior, written the way the finals problems
are written: a narrative statement, a worked example, an input and output spec, three sets of
sample data, twelve test cases with the last six sealed, a named function to complete, and
constraints. You write inside the function, a visible driver reads the test data and prints what
you return, and the editor really compiles and runs your code in Python, Java, or C++.

The sealed cases show nothing at all until you give up. Submitting tells you which of them pass
without revealing the inputs or the answers.

## Storage

Everything is kept in `localStorage` in the visitor's own browser: which division they picked,
which questions they got right, whether they solved or gave up on a problem, and the code they
typed for each problem and language. No cookies, no accounts, and nothing leaves the browser
except the source code sent to the compiler when someone presses Run or Submit. A line in the
footer says so, with a button that wipes all of it.

## Running it locally

```bash
python3 server.py
```

Then open http://127.0.0.1:8777. The local server compiles with whatever toolchain is on your
machine (`python3`, `javac`, `c++`), so it works offline but needs those installed.

## Deploying to Vercel

Push the repo and import it. `vercel.json` points the static host at `public/` and Vercel picks
up `api/run.js` automatically. No environment variables are required.

Vercel's Node runtime has no JDK and no g++, so `api/run.js` sends submissions to a remote
sandbox instead. It defaults to [Wandbox](https://wandbox.org), which needs no API key. If you
would rather not lean on a free community service, run your own
[Piston](https://github.com/engineer-man/piston) instance and set `RUNNER_URL` to its endpoint.

If the deploy rejects `maxDuration`, drop the `functions` block from `vercel.json`. Compiles
usually finish in a few seconds, so the 10 second default is workable.

## Regenerating the content

Test case outputs are never typed by hand. `content/build.py` runs the Python reference solution
for each problem to produce them, then runs the Java and C++ references and fails the build if
any of the three disagree:

```bash
python3 content/build.py     # rewrites public/data/frq.js
python3 content/verify.py    # rechecks every computable multiple choice answer
python3 content/stamp.py     # rewrites the ?v= cache keys in index.html
```

`verify.py` re-derives 200 of the 219 answers using `content/solvers.py`, which holds its own
implementations of everything the bank asks about. The remaining 19 are definitional and have no
computation to check. Checks run under a five second alarm and a memory cap, because a question
is data and a runaway expression in one should fail loudly rather than take the machine down.

Run all three after editing anything under `content/` or `public/`.

## Layout

```
server.py            local dev server, compiles with your own toolchain
api/run.js           Vercel function, compiles through a remote sandbox
vercel.json          static host config
cppinclude/          a <bits/stdc++.h> shim, since libc++ does not ship one
content/
  frq_a|b|c.py       the twelve programming problems
  codegen.py         turns a task signature into starter code and a driver
  build.py           generates and cross checks public/data/frq.js
  solvers.py         reference implementations used to check the question bank
  verify.py          rechecks every computable multiple choice answer
  stamp.py           content hashes the asset URLs in index.html
public/              the site
  data/              topics, guide text, question bank, generated problems
  vendor/codemirror  editor, vendored so the site works offline
```

## A note on sources

The category list and contest schedule come from acsl.org, and the problem format follows the
published finals papers. Everything here, including the explanations, the questions, and the
programming problems, is written for this site. No ACSL contest material is reproduced.

## License

The site content, problems, questions, and code are released under the MIT License, see
[LICENSE](LICENSE). CodeMirror is vendored under `public/vendor/codemirror` and carries its own
MIT license, included there.
