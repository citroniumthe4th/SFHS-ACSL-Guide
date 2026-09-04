#!/usr/bin/env python3
"""Rewrites the ?v= query on every local asset in the site's HTML to its content hash.

Browsers, and the preview pane in particular, will happily serve a stale app.js after an
edit. Hashing the URL makes a changed file a different URL, so that cannot happen.
Run it after editing anything under public/.
"""
import hashlib
import os
import re
import sys

PUBLIC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
PAGES = ("index.html", "404.html")


def main():
    changed = []

    def fix(m):
        path = m.group(2).split("?")[0]
        # 404.html has to use root relative hrefs, since it is served for nested paths too.
        full = os.path.join(PUBLIC, path.lstrip("/"))
        if not os.path.exists(full):
            print("missing asset: %s" % path)
            sys.exit(1)
        digest = hashlib.sha1(open(full, "rb").read()).hexdigest()[:8]
        new = '%s"%s?v=%s"' % (m.group(1), path, digest)
        if new != m.group(0):
            changed.append(path)
        return new

    for page in PAGES:
        path = os.path.join(PUBLIC, page)
        html = open(path).read()
        html = re.sub(r'(<script src=)"([^"]+)"', fix, html)
        html = re.sub(r'(<link rel="stylesheet" href=)"([^"]+)"', fix, html)
        open(path, "w").write(html)
    print("stamped %d asset(s)%s" % (len(changed),
                                     (": " + ", ".join(changed)) if changed else ""))


if __name__ == "__main__":
    main()
