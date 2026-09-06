# SFHS ACSL Guide

A study guide and practice environment for the American Computer Science League, split by
division. Live at [sfhsacsl.org](https://www.sfhsacsl.org/).

Junior and Senior share eight categories. Where they differ, Junior gets the four flavors of
What Does This Program Do and Senior gets LISP, FSAs and Regular Expressions, and Assembly
Language. The division toggle in the header switches both sections at once, and opening a
category that belongs to one division switches you into that division rather than mislabelling
the page.

## What is in it

Lessons link to their official ACSL topic references and have section navigation. Five reused
diagrams have source credits, alt text, and license links. See
[diagram credits](public/assets/diagrams/ATTRIBUTION.md).

The question bank labels conceptual and extension questions. New mock exams omit these
foundational definition questions and the two extensions using bases outside the four core bases.
They use this site's practice bank, so the score is not calibrated to an official ACSL exam.
Question IDs, individual question links, and issue links make corrections easier to report.
Bookmarks save questions for later, and generated questions retain their seeds in missed review.

**Guide.** Sixteen pages, one per category per division, covering the material and ending with
the checks to run before writing an answer down. Full-text search covers both divisions.

**Practice.** 458 multiple-choice practice questions: five choices
with "None of the above" as E, which is the correct answer about 10 percent of the time. Choices
are shuffled on the way to the screen, so the position of the right answer carries no
information. Every question shows its reasoning once you answer. Anything you get wrong lands in
a missed questions list, and getting it right later takes it off again.

**Endless practice.** Six of the categories can also generate questions on demand. See
[Generated questions](#generated-questions).

**Mock exam.** Two questions from each of a contest's three topics, six in all, in thirty
minutes. acsl.org states both halves of that outright: "Each contest has 6 problems: two problems
from each of the 3 topics", and the student guide gives the thirty minute limit. Nothing is marked
while the clock runs. At the end you get a score and every question back with the reasoning, and
the ones you missed go to the missed list. An unfinished exam survives a refresh, deadline and
choice order included, and starting a different contest asks before discarding one in progress.

Because the paper follows the published topic table, What Does This Program Do appears in every
Junior contest, as branching, looping, arrays, and strings respectively, and in Senior only in
Contest 1. Senior Contest 2 is LISP. Where it does appear it is sorted to the end of the paper.

**Programming.** Forty eight problems, twenty four Junior and twenty four Senior, six per contest
each,
written the way the finals problems are written: a narrative statement, a worked example, an input
and output spec, three sets of sample data, twelve test cases with the last six hidden, a named
function to complete, and constraints. You write inside the function, a visible driver reads the
test data and prints what you return, and the editor really compiles and runs your code in
Python, Java, or C++. Two progressively more specific hints precede each solution. Viewing a
solution after solving no longer removes independent completion, and mobile readers can jump
directly to the editor.

The driver ships inside the editable template, so it becomes part of whatever a student saves.
Changing it in `codegen.py` reaches new templates and the reference solutions, and never touches
code somebody has already written. **Reset code** restores the current template at the cost of
the work in the box; copying only the current driver from the reference solution preserves the
student's function. The notice updates as the driver is edited. Saved drivers are not all the same.

The last six cases render nothing at all until you ask for the solution. Submitting tells you
which of them pass without showing the inputs or the answers. They are hidden in the interface
rather than secret, and the site says so, because the whole bundle reaches every browser. There
is also a custom input box, since every ACSL problem tells you to make up test data of your own,
and it runs your code against whatever you type without checking it against anything.

The editor closes brackets and quotes as you type, matches them, indents for you, comments a
selection with Ctrl-/ or Cmd-/, finds with Ctrl-F, and runs on Ctrl-Enter or submits on
Ctrl-Shift-Enter. Ctrl-F matters more than it sounds: CodeMirror only renders the lines near the
viewport, so the browser's own find silently misses anything scrolled off. The divider between
the problem and the editor drags, double clicks back to the middle, and moves with the arrow keys
when focused; A- and A+ set the text size. Both are remembered, the split as a fraction so it
survives a different window. Long lines wrap rather than running off to the right, and reflow as
the divider moves, since the reason to narrow the editor is to read the problem beside it.
Wrapped continuations hang under the line they belong to, because a continuation resting at the
margin reads as a dedent that is not there, which in Python is a real misreading.

It does not complete anything: no method lists, no identifier suggestions, nothing that would
answer the problem for you. Editing aids yes, hints no.

A failed test shows the expected and actual lines with the characters that differ marked, spaces
and tabs drawn as glyphs inside the marked run, and a plain sentence naming the difference when
it has a name: only the surrounding spaces, only the case, the line stopping early. Most failures
here are one invisible character, which is exactly what two plain lines above each other hide.

On narrow screens, the editor stacks below the statement. Its toolbar wraps so code entry,
custom input, and submission stay available on phones. Escape leaves the editor and focuses Run.

## URLs

Every page has a real path. `/guide/bit-string-flicking` is a document the server answers, not a
fragment, and the router reads `location.pathname`. Links shared while the site was hash routed
are rewritten on load, since the server never sees a fragment and nothing else can catch them.

`content/prerender.py` writes a copy of the shell for each of the sixty content URLs with its own
title, description, canonical, and og tags already in the head. The router sets all of that on
every navigation anyway, which is enough for Google since it runs the page, but Slack, Discord,
iMessage, and Bing read the markup and stop.

`vercel.json` maps each section to what serves it. A category or problem id with no page is a real
404 rather than a soft 200; `/exam` and `/missed` have nothing to prerender and get the shell.
`server.py` makes the same distinction, so local matches deployed.

## Storage and disclosure

Everything a visitor does is kept in `localStorage` in their own browser: division, theme,
language, which questions they got right, whether they solved or viewed the solution for a
problem, the code they typed for each problem and language, custom input, and any exam in
progress. No cookies, no accounts.

What does leave the browser is the code itself. Pressing Run or Submit sends the language, the
editor contents, and the test input to `/api/run`, which forwards them to an outside compiler
service. The footer says this and links [/privacy](public/privacy.html), which lists every stored
key, names both third parties that may execute the code, and says Vercel receives ordinary request
metadata including IP addresses. A second runner is a second disclosure, so adding one means
editing that page as well as the handler. Saying anything less would be inaccurate rather than
merely brief.

Generated questions are deliberately not recorded, since they would fill storage with thousands of
keys for questions nobody sees twice.

## Running it locally

```bash
python3 server.py
```

Then open http://127.0.0.1:8777. The local server compiles with whatever toolchain is on your
machine (`python3`, `javac`, `c++`), so it works offline but needs those installed. It mirrors the
production routing, headers, and 404 behavior, so a policy that breaks the site breaks it here
first.

## Deploying to Vercel

Push the repo and import it. `vercel.json` points the static host at `public/` and Vercel picks
up `api/run.js` automatically. No environment variables are required.

Vercel's Node runtime has no JDK and no g++, so `api/run.js` sends submissions to a remote
sandbox instead. It tries three, in order, and none needs an API key:

1. [Wandbox](https://wandbox.org), `cpython-3.11.10`, `openjdk-jdk-21+35`, `gcc-13.2.0`
2. [Compiler Explorer](https://godbolt.org), `python311`, `java2100`, `g132`
3. [Judge0](https://judge0.com) on its public `ce.judge0.com`, language ids `113`, `91`, `105`

The second and third exist because on 5 September 2026 Wandbox spent a day answering every request
with `Failed to get uid`, and the editor had nothing to fall back on. A backup is only worth having
if it is a different service, so all three speak different protocols: each entry in `BACKENDS`
carries its own request body and its own reader, and the handler normalizes them into one shape.
Adding a fourth means adding one more entry, and a line on [/privacy](public/privacy.html).

Two are not on the list. Piston's public API became whitelist-only in February 2026, and Rextester
refuses the request outright. Judge0's public instance is one the project runs for its own
documentation rather than a product, which is exactly why it sits last: it is only ever reached
when both services ahead of it are down, so the traffic it sees from here is close to none. If it
disappears, the first two still work; if you would rather not lean on it at all, delete the entry.

The three do not agree on version. Judge0 was on Python 3.14, JDK 17 and GCC 14 when it was added,
against Wandbox's 3.11, 21 and 13.2. All 24 reference solutions were run through each service in
all three languages against the twelve shipped test cases before it was wired in, so the versions
differ but the answers do not.

Falling through is for the runner's failures, not the program's. A non-2xx reply, a connection
error, or an invalid or failed service response moves to the next service. A timeout or a program that
floods its output stops there, because neither will go better elsewhere and trying doubles the
wait. Explicit timeout and truncated-output flags also stop grading. Judge0's queued and internal
error statuses are service failures, not student runtime errors. C++ uses `-std=c++17 -O2` on
all three services. When every service fails, the student is told it is not their code.

Compiler Explorer needs two things Wandbox does not: its diagnostics arrive with ANSI color
escapes, and it compiles to a file of its own naming, so both are rewritten before the text
reaches the page. Judge0 needs a third: it answers HTTP 400 for any output it cannot read as
UTF-8 unless the transfer is base64, so its source, stdin and three output streams are encoded
both ways. Without that, a program printing one accented character looks like a total outage.

`vercel.json` caps the function at 20 seconds. The handler holds itself to 16 across all attempts
and 10 for any one of them, so a dead first choice cannot eat the budget the second needs. The
platform cap is a backstop for an invocation that wedges somewhere the abort cannot reach. Keep
the platform timeout above the handler's 16-second budget so fallback attempts can finish.

`RUNNER_URL` still overrides the first entry's address for a Wandbox-compatible host.

## Domain and email

DNS is on Cloudflare; the site records point at Vercel. Cloudflare Email Routing forwards
`contact@sfhsacsl.org` and `security@sfhsacsl.org` to a personal inbox, which is why the MX, SPF,
and DKIM records exist alongside the Vercel ones. Both addresses appear on the privacy page and in
`public/.well-known/security.txt`.

DMARC is `p=reject; sp=reject; adkim=s; aspf=s`. That is deliberately the strictest setting,
and it is safe **because nothing sends mail as this domain**. Routing is receive only: a reply
composed in the forwarding inbox goes out under that inbox's own address, not the domain's.

If that ever needs to change, the order matters, because with `p=reject` live a misconfiguration
does not bounce, it silently disappears:

1. Set up an SMTP relay and complete its domain verification.
2. Add the relay to the SPF record and publish its DKIM key.
3. **Drop DMARC to `p=quarantine` before sending a single test.**
4. Confirm delivery from the new address, checking headers for SPF and DKIM pass.
5. Only then put `p=reject` back.

Worth weighing first, though. Adding a relay widens who can send as the domain, and for a site
used by high schoolers a spoofed message carrying the site's name is a worse outcome than a reply
arriving from an ordinary mailbox. Sending is worth setting up when the site itself needs to send
mail; it is not worth it to answer the occasional question.

Vercel's dashboard may warn that the domain has no MX records and can be spoofed. It is reading
its own inert DNS zone, which nothing queries because the nameservers point at Cloudflare. Check
the records themselves before believing it.

## What the site does and does not protect

Worth knowing before you point a class at it.

`api/run.js` compiles whatever it is handed, so it is the only part of this that a stranger can
make do work. Standing between it and abuse: cross site posts are refused, the source and input
sizes are capped, the upstream response is limited to 1 MiB before JSON parsing, each returned stream is truncated at 64 KB with a note saying so, the upstream
request is abandoned after twelve seconds, and each address gets 120 runs a minute from an
in-function counter, with `Retry-After` on the 429.

That counter is best effort by construction. It lives in memory, so it catches a flood from one
address while an instance stays warm, resets on a cold start, and counts separately on a second
instance. It cannot bind the site as a whole. `MAX_PER_WINDOW` in `api/run.js` is its dial.

A durable limit requires a **Vercel WAF rate limit rule**, which runs at the edge before a request
reaches the function. It cannot live in this repo; the dashboard is the source of truth for it.
Configure it to match request path `/api/run`, keyed by IP address. Verify the active rule in the
dashboard before relying on it. Sixty requests per ten seconds suits a
class of about twenty: their busiest moment, including everyone submitting at once, is roughly
twenty to thirty in ten seconds, while a script ignoring the interface exhausts sixty in about a
second. A short window is better than a long one here, because a fixed window lets a burst
straddle the boundary and count twice.

Set a new rule's action to **Log** for a real session before switching it to **Deny**. A school
NAT puts a whole lab behind one address, and the log tells you your actual peak before the rule
can lock out your own team.

Two things it does not do. Rate limiting is included on Hobby at one rule per project, keyed by
IP only, so nothing here bounds a distributed flood or someone rotating addresses. And WAF
counters are per region, so a spread out flood can exceed the configured number in total. The
realistic harm is not a Vercel bill but Wandbox: it is a free service run by volunteers, and if
abuse from this site got Vercel's egress blocked there, the editor would stop working for real
students. Watch the Firewall overview; there is no automated backstop for that at this tier.

Errors from the compile service are logged with `console.error` and reported to the browser as a
short stable message, so an upstream stack trace never reaches a student.

Everything the site knows ships to the browser in `public/data/`. The hidden test inputs, the
answer keys, and the reference solutions are all in there, and the gate on the solution is drawn
in JavaScript rather than enforced anywhere. The rendered page is honest about it, and the DOM
holds nothing for the hidden cases, but anyone who opens the network tab can read the lot. That is
inherent to a static site with no grader behind it, so treat scores as practice rather than as
anything to grade on.

Responses carry a content security policy that allows scripts only from the site itself. There
are no inline scripts and no CDN, so nothing legitimate needs an exception, and the policy means
an injected `<script>` would not run even if some content slipped through unescaped. HSTS,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a narrow `Permissions-Policy`
go out with it. `server.py` sends the same headers.

## Regenerating the content

Test case outputs are never typed by hand. `content/build.py` runs the Python reference solution
for each problem to produce them, then runs the Java and C++ references and fails the build if
any of the three disagree. It also re-derives the worked Example in each problem statement and
fails if the trace disagrees with what the code actually does, because a stale hand written trace
is worse than none: a student will trust it over their own arithmetic.

```bash
python3 content/solvers.py    # the ACSL conventions, checked against the official examples
python3 content/build.py      # rewrites public/data/frq.js
node content/test_runtime.js # grading, stale runs, mock exams, and proxy regressions
python3 content/verify.py     # rechecks every computable multiple choice answer
python3 content/checkgen.py   # rechecks the generated questions
python3 content/sitemap.py    # rewrites sitemap.xml and robots.txt
python3 content/stamp.py      # cache keys, then the per URL copies
```

Run them after editing anything under `content/` or `public/`. `stamp.py` calls
`content/prerender.py` itself, so the per URL copies can never drift onto a stale asset hash.

`verify.py` re-derives 204 of the 223 answers using `content/solvers.py`, which holds its own
implementations of everything the bank asks about. The remaining 19 are definitional and have no
computation to check. Checks run under a five second alarm and a memory cap, because a question is
data and a runaway expression in one should fail loudly rather than take the machine down. It also
reproduces the choice shuffle across the whole bank and fails if any position holds more than 35
percent of the answers.

### The conventions worth distrusting yourself on

`solvers.py` ends in a self check that `verify.py` runs before anything else, pinning four ACSL
rules to the worked examples on the official topic pages. Each was wrong here at some point, and
each was wrong in a way that still produced a confident answer, because the solver agreed with the
question:

- **Substrings are not Python slices.** One bound is a count taken from the end the colon leans
  toward; two bounds are positions with the second one included. `S[4:]` is the last four
  characters, and `S[2:6]` is five characters.
- **Duplicate keys go left** in a binary search tree, and deleting a node with two children
  promotes the left child and grafts the right subtree onto it. Both differ from what most
  textbooks teach.
- **LISP `DIV` is ordinary division**, so `(DIV 100 8)` is 12.5, and `SUB` and `DIV` take exactly
  two arguments while `ADD` and `MULT` take any number.
- **Assembly `READ`, `ADD`, `SUB` and `MULT` are modulo 1,000,000**, and `DIV` is not. The
  reference does not say what the modulus does to a negative; the magnitude wraps and the sign
  stays, which is the only reading that leaves `BL` able to fire.
- **Postfix and prefix division keeps the fraction**, so `8 3 - 2 /` is 2.5. This one is not in the
  reference at all: every worked example on the official page divides exactly, so the case never
  comes up. It follows the rule ACSL does state for LISP rather than the one it states for assembly,
  where `DIV` truncates. A quotient that does not terminate would print all sixteen digits Python
  gives it; no question divides that way, and rounding it would mean inventing a rule nobody
  published, so the honest fix if one ever appears is to reword the question.

## House style

American spelling throughout: color, center, neighbor, practice, recognize, labeled, modeling.
The corpus started out mixed and has drifted twice, so a sweep is worth running before a large
content change lands.

## Generated questions

Six categories are pure mechanics, with one right answer and a procedure that always finds it:
number systems, bit-string flicking, prefix and postfix, boolean algebra, digital electronics,
and graph theory. Those do not need a hand written bank so much as a machine, and
`public/data/gen.js` is that machine. Practice on any of the six offers an Endless mode that
builds a question from a seed, complete with worked steps derived from the same structure that
produced the question. Across four thousand seeds each category yields between 3,100 and 4,000
distinct questions, so a repeat is unlikely rather than impossible.

A generator that writes both the question and the answer key is exactly the arrangement in which
a bug stays invisible, since one mistake produces both halves. So every generated question also
carries a `check`, a Python expression in the same form the hand written bank uses, and
`content/checkgen.py` runs four hundred seeds per category through it against the independent
implementations in `solvers.py`. Where it can, the generator computes over the expression tree it
built and leaves the parsing of the rendered string to the Python side, so a precedence bug in
the renderer surfaces as a disagreement rather than as a question that is quietly wrong in both
places. It caught two real bugs the first time it ran.

## Layout

```
server.py              local dev server: your own toolchain, production routing and headers
api/run.js             Vercel function, compiles through a remote sandbox
vercel.json            static host config, rewrites, response headers
cppinclude/            a <bits/stdc++.h> shim, since libc++ does not ship one
content/
  frq_a..frq_j.py      the forty eight programming problems, grouped by division and contest
  codegen.py           turns a task signature into starter code and a driver
  build.py             generates and cross checks public/data/frq.js
  solvers.py           reference implementations, plus the ACSL convention self check
  verify.py            rechecks every computable multiple choice answer
  checkgen.py          rechecks the generated questions against solvers.py
  sitemap.py           writes sitemap.xml and robots.txt from the shipped data
  prerender.py         per URL copies of the shell, called by stamp.py
  stamp.py             content hashes the asset URLs, then calls prerender
  rewrite_*.py         one-off prose patchers, not part of the pipeline
public/                the site
  index.html           the shell
  guide|practice|problem/   prerendered per URL copies, written by prerender.py
  404.html             served for anything unmatched
  privacy.html         what is stored and what is sent
  .well-known/         security.txt
  data/                topics, guide text, question bank, generated problems, gen.js
  vendor/codemirror    editor, vendored so the site works offline. Addons are limited to
                       editing aids: close and match brackets, comment toggle, search and
                       jump to line, active line. show-hint is deliberately absent.
```

## Accessibility

Skip link, a visible focus ring on everything interactive, `aria-current` on the active tab and
sidebar link, `aria-pressed` on the division buttons, a theme button that names what pressing it
will do, a labeled language selector, and polite live regions for run results and answer
feedback. Headings run in sequence with nothing skipped. Body and faint text clear 4.5:1 against
every surface they sit on, in both themes.

## A note on sources

The category list and contest schedule come from acsl.org, and the problem format follows the
published finals papers. Everything here, including the explanations, the questions, and the
programming problems, is written for this site. No ACSL contest material is reproduced. The site
carries a notice that it is not affiliated with or endorsed by ACSL.

Contest rules change between seasons. `security.txt` carries an `Expires` date for the same
reason the guides carry ACSL's conventions: both are worth rechecking each September.

## Copyright

No license is granted. The lessons, questions, problems, explanations, reference solutions, and
site code are the author's own, and reading them here is not permission to reuse them. See
[LICENSE](LICENSE), and write to contact@sfhsacsl.org if you want to.

Two things that notice cannot cover, because they are not the author's to give away. CodeMirror is
vendored under `public/vendor/codemirror` and stays under its own MIT license, included there. The
diagrams under `public/assets/diagrams` are reused under their own terms, credited in
[ATTRIBUTION.md](public/assets/diagrams/ATTRIBUTION.md) and beside each diagram on the site.

## Backups and verification

Use Export progress and Import progress in the footer to move saved code, answers, bookmarks,
settings, and exam progress between browsers. Files stay on your device. Import validates all
entries before writing and attempts to restore previous values if browser storage fills up.

The explanation floor in `content/verify.py` remains 60 characters. Explicit question kinds
control mock eligibility independently of machine-check coverage. Choice-matching checks require
exactly one answer, and verification rejects checks that return a choice by position.

Run the checks with:

```sh
python3 content/verify.py
python3 content/test_verify.py
python3 content/checkgen.py
node content/test_runtime.js
python3 content/build.py
python3 content/stamp.py
npm ci --ignore-scripts
npx playwright install chromium
npm run test:browser
```

The programming build needs Python, a Java JDK, and a C++17 compiler. Playwright is a development
only dependency. The static site does not load it. Browser tests use fresh, disposable storage
and do not call the production code runner. Automatic GitHub Actions verification remains pending
because the token used for this update cannot create workflow files.
