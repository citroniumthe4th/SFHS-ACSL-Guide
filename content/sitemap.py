#!/usr/bin/env python3
"""Writes public/sitemap.xml and public/robots.txt from the shipped content.

Every guide, practice category, and programming problem is its own URL now, so the list
has to come from the data rather than from someone remembering to add a line. Run it after
content/build.py.
"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(os.path.dirname(HERE), "public")
ORIGIN = "https://www.sfhsacsl.org"


def ids(filename):
    text = open(os.path.join(PUBLIC, "data", filename)).read()
    seen, out = set(), []
    for m in re.finditer(r'"?\bid"?\s*:\s*"([^"]+)"', text):
        if m.group(1) not in seen:
            seen.add(m.group(1))
            out.append(m.group(1))
    return out


def main():
    topics = ids("topics.js")
    problems = ids("frq.js")
    if not topics or not problems:
        raise SystemExit("sitemap: found %d topics and %d problems, expected both"
                         % (len(topics), len(problems)))

    # The mock exam, the missed list and the bookmarks are per person and hold nothing to index.
    urls = ["/", "/guide", "/practice", "/problems", "/privacy"]
    urls += ["/guide/%s" % t for t in topics]
    urls += ["/practice/%s" % t for t in topics]
    urls += ["/problem/%s" % p for p in problems]

    body = "\n".join("  <url><loc>%s%s</loc></url>" % (ORIGIN, u) for u in urls)
    open(os.path.join(PUBLIC, "sitemap.xml"), "w").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' % body)

    open(os.path.join(PUBLIC, "robots.txt"), "w").write(
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /api/\n"
        "Disallow: /exam\n"
        "Disallow: /missed\n"
        "Disallow: /bookmarks\n"
        "\n"
        "Sitemap: %s/sitemap.xml\n" % ORIGIN)

    print("sitemap: %d urls (%d topics, %d problems)" % (len(urls), len(topics), len(problems)))


if __name__ == "__main__":
    main()
