#!/usr/bin/env python3
"""Writes a real HTML file for every content URL, with its own title and description.

The router sets the title, description, and og tags on every navigation, which is enough
for Google, since it runs the page. It is not enough for anything that only reads the
markup: Slack, Discord, iMessage, and Bing all fetch the HTML and stop there. Without this,
all sixty URLs preview as the same generic site card, which defeats most of the point of
having given them their own addresses.

So each one gets a copy of the shell with its own metadata already in the head. The copy is
otherwise byte for byte the same document, loads the same app.js, and hands over to the
router the moment it runs, which then sets the same values again.

Run it after content/stamp.py, which is what calls it, so the copies always carry the same
asset hashes as the page they were made from.
"""
import html
import json
import os
import re
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(os.path.dirname(HERE), "public")
ORIGIN = "https://www.sfhsacsl.org"
SUFFIX = " | SFHS ACSL Guide"

# Kept in step with metaFor() in public/app.js. The router overwrites all of this the moment
# it runs, so a drift here shows up to crawlers only, never to a reader.
INDEXES = {
    "guide": ("Study guide",
              "Sixteen ACSL categories across four contests, from number systems to "
              "assembly, with worked examples throughout."),
    "practice": ("Practice",
                 "Short answer practice across every ACSL category, with the reasoning "
                 "shown for each question."),
    "problems": ("Programming problems",
                 "ACSL style programming problems with twelve test cases, solvable in "
                 "Python, Java, or C++ in the browser."),
}


def load(name, var):
    """Reads one of the shipped data files by running it, rather than parsing it."""
    path = os.path.join(PUBLIC, "data", name)
    script = ("global.window={};require(%s);"
              "process.stdout.write(JSON.stringify(global.window.%s));"
              % (json.dumps(path), var))
    p = subprocess.run(["node", "-e", script], capture_output=True, text=True)
    if p.returncode != 0:
        raise SystemExit("prerender: could not read %s\n%s" % (name, p.stderr))
    return json.loads(p.stdout)


def head(shell, title, desc, path):
    """Swaps the four metadata values a preview card actually reads."""
    out = shell
    subs = [
        (r"(<title>).*?(</title>)", html.escape(title)),
        (r'(<meta name="description" content=").*?(">)', html.escape(desc, quote=True)),
        (r'(<meta property="og:title" content=").*?(">)', html.escape(title, quote=True)),
        (r'(<meta property="og:description" content=").*?(">)',
         html.escape(desc, quote=True)),
        (r'(<meta property="og:url" content=").*?(">)', ORIGIN + path),
        (r'(<link rel="canonical" href=").*?(">)', ORIGIN + path),
    ]
    for pattern, value in subs:
        out, n = re.subn(pattern, lambda m: m.group(1) + value + m.group(2), out, count=1)
        if not n:
            raise SystemExit("prerender: %s matched nothing in index.html" % pattern)
    return out


def write(rel, text):
    full = os.path.join(PUBLIC, rel)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w").write(text)


def main():
    shell = open(os.path.join(PUBLIC, "index.html")).read()
    topics = load("topics.js", "TOPICS")
    problems = load("frq.js", "FRQ")

    pages = []
    for section, (title, desc) in INDEXES.items():
        pages.append(("%s.html" % section, title + SUFFIX, desc, "/" + section))

    for t in topics:
        who = "Junior and Senior" if t["div"] == "both" else t["div"]
        pages.append(("guide/%s.html" % t["id"], t["name"] + SUFFIX,
                      "%s Worked examples and the mistakes that cost points, written for "
                      "ACSL %s." % (t["blurb"], who), "/guide/%s" % t["id"]))
        pages.append(("practice/%s.html" % t["id"], t["name"] + " practice" + SUFFIX,
                      "Short answer practice on %s, with the reasoning for every answer."
                      % t["name"].lower(), "/practice/%s" % t["id"]))

    for p in problems:
        pages.append(("problem/%s.html" % p["id"], p["title"] + SUFFIX,
                      "%s An ACSL style programming problem you can solve in Python, Java, "
                      "or C++ in the browser." % p["blurb"], "/problem/%s" % p["id"]))

    for rel, title, desc, path in pages:
        write(rel, head(shell, title, desc, path))

    print("prerendered %d pages" % len(pages))


if __name__ == "__main__":
    main()
