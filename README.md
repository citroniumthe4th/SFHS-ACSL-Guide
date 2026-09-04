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
question shows its reasoning once you answer. Anything you get wrong lands in a missed questions
list, and getting it right later takes it off again.

**Mock exam.** Two questions from each of a contest's three topics, six in all, in thirty
minutes. acsl.org states both halves of that outright: "Each contest has 6 problems: two problems
from each of the 3 topics", and the student guide gives the thirty minute limit. Nothing is marked
while the clock runs. At the end you get a score and every question back with the reasoning, and
the ones you missed go to the missed list. An unfinished exam survives a refresh, deadline
included.

Because the paper follows the published topic table, What Does This Program Do appears in every
Junior contest, as branching, looping, arrays, and strings respectively, and in Senior only in
Contest 1. Senior Contest 2 is LISP. Where it does appear it is sorted to the end of the paper.

**Programming.** Twenty four problems, twelve Junior and twelve Senior, three per contest each,
written the way the finals problems are written: a narrative statement, a worked example, an input and output spec, three sets of
sample data, twelve test cases with the last six sealed, a named function to complete, and
constraints. You write inside the function, a visible driver reads the test data and prints what
you return, and the editor really compiles and runs your code in Python, Java, or C++.

The sealed cases show nothing at all until you give up. Submitting tells you which of them pass
without revealing the inputs or the answers. There is also a custom input box, since every ACSL
problem tells you to make up test data of your own, and it runs your code against whatever you
type without checking it against anything.

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

## What the site does and does not protect

Worth knowing before you point a class at it.

`api/run.js` compiles whatever it is handed, so it is the only part of this that a stranger can
make do work. Standing between it and abuse: cross site posts are refused, the source and input
sizes are capped, each returned stream is truncated at 64 KB, the upstream request is abandoned
after twelve seconds, and each address gets 120 runs a minute with a `Retry-After` on the 429.

The rate limit is the one to be honest about. It is an in-memory counter, so it catches a flood
from one address while an instance stays warm and resets on a cold start, and a second instance
counts separately. It cannot enforce a site-wide limit. The ceiling is set high on purpose,
because a school NAT puts a whole lab behind one address and a limit tuned to one student would
lock out the class. `MAX_PER_WINDOW` in `api/run.js` is the dial. **The real fix is a Vercel WAF
rate-limit rule**, which is configured in the Vercel dashboard rather than in this repo, and is
worth adding before the site is promoted anywhere public.

Errors from the compile service are logged with `console.error` and reported to the browser as a
short stable message, so an upstream stack trace never reaches a student.

Everything the site knows ships to the browser in `public/data/`. The hidden test inputs, the
answer keys, and the reference solutions are all in there, and the give up gate is drawn in
JavaScript rather than enforced anywhere. The rendered page is honest about it, the DOM holds
nothing for the sealed cases, but anyone who opens the network tab can read the lot. That is
inherent to a static site with no grader behind it, so treat scores as practice rather than as
anything to grade on.

Responses carry a content security policy that allows scripts only from the site itself. There
are no inline scripts and no CDN, so nothing legitimate needs an exception, and the policy means
an injected `<script>` would not run even if some content slipped through unescaped. `server.py`
sends the same headers, so a policy that breaks the editor breaks it locally first.

## Regenerating the content

Test case outputs are never typed by hand. `content/build.py` runs the Python reference solution
for each problem to produce them, then runs the Java and C++ references and fails the build if
any of the three disagree. It also re-derives the worked Example in each problem statement and
fails if the trace disagrees with what the code actually does, because a stale hand written trace
is worse than none: a student will trust it over their own arithmetic.

```bash
python3 content/build.py     # rewrites public/data/frq.js
python3 content/verify.py    # rechecks every computable multiple choice answer
python3 content/checkgen.py  # rechecks the generated questions
python3 content/sitemap.py   # rewrites sitemap.xml and robots.txt
python3 content/stamp.py     # cache keys, then the per URL copies
```

`stamp.py` calls `content/prerender.py` itself, which writes a copy of the shell for each of
the sixty content URLs with its own title, description, canonical, and og tags already in the
head. The router sets all of that on every navigation anyway, which is enough for Google since
it runs the page, but Slack, Discord, iMessage, and Bing read the markup and stop. Without the
copies every URL previews as the same generic card. They are made from `index.html` after it is
stamped, which is why the two steps are chained rather than left to be remembered separately.

`verify.py` re-derives 200 of the 219 answers using `content/solvers.py`, which holds its own
implementations of everything the bank asks about. The remaining 19 are definitional and have no
computation to check. Checks run under a five second alarm and a memory cap, because a question
is data and a runaway expression in one should fail loudly rather than take the machine down.

Run all five after editing anything under `content/` or `public/`.

## Generated questions

Six categories are pure mechanics, with one right answer and a procedure that always finds it:
number systems, bit-string flicking, prefix and postfix, boolean algebra, digital electronics,
and graph theory. Those do not need a hand written bank so much as a machine, and
`public/data/gen.js` is that machine. Practice on any of the six offers an Endless mode that
builds a question from a seed, complete with worked steps derived from the same structure that
produced the question. Across four thousand seeds each category yields between 3,100 and 4,000
distinct questions, so in practice it does not repeat.

A generator that writes both the question and the answer key is exactly the arrangement in which
a bug stays invisible, since one mistake produces both halves. So every generated question also
carries a `check`, a Python expression in the same form the hand written bank uses, and
`content/checkgen.py` runs four hundred seeds per category through it against the independent
implementations in `solvers.py`. Where it can, the generator computes over the expression tree it
built and leaves the parsing of the rendered string to the Python side, so a precedence bug in
the renderer surfaces as a disagreement rather than as a question that is quietly wrong in both
places. It caught two real bugs the first time it ran.

Generated answers are deliberately not recorded. They would fill localStorage with thousands of
keys for questions nobody will see twice, and the missed list is only meaningful over a fixed
bank.

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
