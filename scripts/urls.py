#!/usr/bin/env python3
"""Rebuild docs/urls.md: every live URL from the sitemap, grouped by type. The change log at the top
(docs/urls-changelog.md) is kept by hand and copied in. Run: python3 scripts/urls.py"""
import re, requests, pathlib, collections, datetime as dt
ROOT = pathlib.Path(__file__).resolve().parent.parent
urls = re.findall(r"<loc>([^<]+)", requests.get("https://ramayana.com/sitemap.xml", timeout=30).text)
def kind(u):
    p = u.replace("https://ramayana.com", "") or "/"
    hi = p.startswith("/hi")
    q = p[3:] if hi else p
    for k, r in [("Chaupai", r"^/chaupai"), ("Stuti", r"^/stuti"), ("Ramcharitmanas doha pages", r"^/ramcharitmanas/[^/]+/"), ("Ramcharitmanas hub and kands", r"^/ramcharitmanas"),
                 ("Valmiki sargas", r"^/valmiki-ramayana/[^/]+/"), ("Valmiki hub and kandas", r"^/valmiki-ramayana"), ("Sunderkand", r"^/sunderkand"), ("Characters", r"^/characters"),
                 ("Places", r"^/places"), ("News", r"^/news"), ("Feelings", r"^/feelings")]:
        if re.match(r, q): return ("Hindi: " if hi else "") + k
    return ("Hindi: " if hi else "") + "Articles and core pages"
g = collections.defaultdict(list)
for u in urls: g[kind(u)].append(u)
log = (ROOT / "docs/urls-changelog.md").read_text() if (ROOT / "docs/urls-changelog.md").exists() else ""
out = [f"# ramayana.com URLs\n\nGenerated {dt.date.today()} from the live sitemap: {len(urls)} URLs.\n", log, "\n## All URLs by type\n"]
for k in sorted(g, key=lambda k: (k.startswith("Hindi"), k)):
    big = len(g[k]) > 40
    out.append(f"\n### {k} ({len(g[k])})\n")
    out += [f"- {u}" for u in (g[k][:10] if big else g[k])]
    if big: out.append(f"- ... and {len(g[k]) - 10} more")
(ROOT / "docs/urls.md").write_text("\n".join(out) + "\n"); print(len(urls), {k: len(v) for k, v in g.items()})
