# SFHS ACSL Guide

A study guide and practice environment for the American Computer Science League, split by
division. Live at [sfhsacsl.org](https://www.sfhsacsl.org/).

Junior and Senior share eight categories. Where they differ, Junior gets the four flavors of
What Does This Program Do and Senior gets LISP, FSAs and Regular Expressions, and Assembly
Language. The division toggle in the header switches both sections at once, and opening a
category that belongs to one division switches you into that division rather than mislabelling
the page.

## What is in it

**Guide.** Sixteen pages, one per category per division, covering the material and ending with
the checks to run before writing an answer down.

**Practice.** 219 short answer questions in the format ACSL uses on the contest: five choices
with "None of the above" as E, which is the correct answer about 11 percent of the time. Choices
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

**Programming.** Twenty four problems, twelve Junior and twelve Senior, three per contest each,
written the way the finals problems are written: a narrative statement, a worked example, an input
and output spec, three sets of sample data, twelve test cases with the last six hidden, a named
function to complete, and constraints. You write inside the function, a visible driver reads the
test data and prints what you return, and the editor really compiles and runs your code in
Python, Java, or C++.

The last six cases render nothing at all until you ask for the solution. Submitting tells you
which of them pass without showing the inputs or the answers. They are hidden in the interface
rather than secret, and the site says so, because the whole bundle reaches every browser. There
is also a custom input box, since every ACSL problem tells you to make up test data of your own,
and it runs your code against whatever you type without checking it against anything.

The editor closes brackets and quotes as you type, matches them, indents for you, comments a
selection with Ctrl-/ or Cmd-/, and runs on Ctrl-Enter or submits on Ctrl-Shift-Enter. It does not
complete anything: no method lists, no identifier suggestions, nothing that would answer the
problem for you. Editing aids yes, hints no.

On a screen narrower than 780px the editor is replaced by a note asking you to open the problem
on a computer. The statement, the samples, and the visible test cases stay readable there.

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
editor contents, and the test input to `/api/run`, which forwards them to Wandbox. The footer says
this and links [/privacy](public/privacy.html), which lists every stored key, names Wandbox as a
third party executing the code, and says Vercel receives ordinary request metadata including IP
addresses. Saying anything less would be inaccurate rather than merely brief.

Generated questions are deliberately not recorded, since they would fill storage with thousands of
keys for questions nobody sees twice.

## Running it locally

```bash
python3 server.py
```

Then open http://127.0.0.1:8777. The local server compiles with whatever toolchain is on your
machine (`python3`, `javac`, `c++`), so it works offline but needs those installed. It mirrors the
production routing, headers, and 404 behaviour, so a policy that breaks the site breaks it here
first.

## Deploying to Vercel

Push the repo and import it. `vercel.json` points the static host at `public/` and Vercel picks
up `api/run.js` automatically. No environment variables are required.

Vercel's Node runtime has no JDK and no g++, so `api/run.js` sends submissions to a remote
sandbox instead. It defaults to [Wandbox](https://wandbox.org), which needs no API key. If you
would rather not lean on a free community service, run your own
[Piston](https://github.com/engineer-man/piston) instance and set `RUNNER_URL` to its endpoint.

`vercel.json` caps the function at 20 seconds. The proxy itself gives up on Wandbox after 12, so
20 is a backstop rather than the working timeout: it bounds an invocation that wedges somewhere
the abort cannot reach. If a deploy ever rejects `maxDuration`, dropping the `functions` block is
safe, since Hobby's 10 second default still clears a normal compile.

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
sizes are capped, each returned stream is truncated at 64 KB with a note saying so, the upstream
request is abandoned after twelve seconds, and each address gets 120 runs a minute from an
in-function counter, with `Retry-After` on the 429.

That counter is best effort by construction. It lives in memory, so it catches a flood from one
address while an instance stays warm, resets on a cold start, and counts separately on a second
instance. It cannot bind the site as a whole. `MAX_PER_WINDOW` in `api/run.js` is its dial.

The durable limit is a **Vercel WAF rate limit rule**, which runs at the edge before a request
reaches the function. It cannot live in this repo; the dashboard is the source of truth for it.
It matches request path `/api/run`, keyed by IP address. Sixty requests per ten seconds suits a
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
python3 content/verify.py     # rechecks every computable multiple choice answer
python3 content/checkgen.py   # rechecks the generated questions
python3 content/sitemap.py    # rewrites sitemap.xml and robots.txt
python3 content/stamp.py      # cache keys, then the per URL copies
```

Run them after editing anything under `content/` or `public/`. `stamp.py` calls
`content/prerender.py` itself, so the per URL copies can never drift onto a stale asset hash.

`verify.py` re-derives 200 of the 219 answers using `content/solvers.py`, which holds its own
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
  towards; two bounds are positions with the second one included. `S[4:]` is the last four
  characters, and `S[2:6]` is five characters.
- **Duplicate keys go left** in a binary search tree, and deleting a node with two children
  promotes the left child and grafts the right subtree onto it. Both differ from what most
  textbooks teach.
- **LISP `DIV` is ordinary division**, so `(DIV 100 8)` is 12.5, and `SUB` and `DIV` take exactly
  two arguments while `ADD` and `MULT` take any number.
- **Assembly `READ`, `ADD`, `SUB` and `MULT` are modulo 1,000,000**, and `DIV` is not. The
  reference does not say what the modulus does to a negative; the magnitude wraps and the sign
  stays, which is the only reading that leaves `BL` able to fire.

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
  frq_a..frq_f.py      the twenty four programming problems, four to a file
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
                       editing aids: close and match brackets, comment toggle, active line.
                       show-hint is deliberately absent.
```

## Accessibility

Skip link, a visible focus ring on everything interactive, `aria-current` on the active tab and
sidebar link, `aria-pressed` on the division buttons, a theme button that names what pressing it
will do, a labelled language selector, and polite live regions for run results and answer
feedback. Headings run in sequence with nothing skipped. Body and faint text clear 4.5:1 against
every surface they sit on, in both themes.

## A note on sources

The category list and contest schedule come from acsl.org, and the problem format follows the
published finals papers. Everything here, including the explanations, the questions, and the
programming problems, is written for this site. No ACSL contest material is reproduced. The site
carries a notice that it is not affiliated with or endorsed by ACSL.

Contest rules change between seasons. `security.txt` carries an `Expires` date for the same
reason the guides carry ACSL's conventions: both are worth rechecking each September.

## License

The site content, problems, questions, and code are released under the MIT License, see
[LICENSE](LICENSE). CodeMirror is vendored under `public/vendor/codemirror` and carries its own
MIT license, included there.
