#!/usr/bin/env python3
"""Daily health report: Search Console performance and sitemap status, indexing of priority
pages, Plausible traffic, and live checks. Writes monitoring/YYYY-MM-DD.md (not committed).
Run: python3 scripts/monitor.py   (reads ~/Documents/writesonic-marketing/.env)"""
import datetime as dt, json, os, pathlib, re, requests
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession
ROOT = pathlib.Path(__file__).resolve().parent.parent; MK = pathlib.Path("~/Documents/writesonic-marketing").expanduser()
for l in (MK / ".env").read_text().splitlines():
    m = re.match(r'^([A-Z_]+)="?([^"\n]*)"?$', l)
    if m: os.environ.setdefault(*m.groups())
SITE = "sc-domain:ramayana.com"; enc = requests.utils.quote(SITE, safe="")
s = AuthorizedSession(service_account.Credentials.from_service_account_file(str(MK / "google-service-account.json"), scopes=["https://www.googleapis.com/auth/webmasters"]))
today = dt.date.today(); out = [f"# ramayana.com report {today}\n"]
try:
    q = lambda body: s.post(f"https://www.googleapis.com/webmasters/v3/sites/{enc}/searchAnalytics/query", json=body).json().get("rows", [])
    start, end = str(today - dt.timedelta(days=9)), str(today - dt.timedelta(days=1))
    tot = q({"startDate": start, "endDate": end})
    out.append(f"## Search, {start} to {end}\n\n" + (f"Clicks {tot[0]['clicks']:.0f}, impressions {tot[0]['impressions']:.0f}, position {tot[0]['position']:.1f}\n" if tot else "No search data yet.\n"))
    for dim in ("page", "query"):
        rows = q({"startDate": start, "endDate": end, "dimensions": [dim], "rowLimit": 10})
        if rows: out.append(f"\nTop {dim}s:\n" + "\n".join(f"- {r['keys'][0]}: {r['clicks']:.0f} clicks, {r['impressions']:.0f} impressions, pos {r['position']:.1f}" for r in rows) + "\n")
    sm = s.get(f"https://www.googleapis.com/webmasters/v3/sites/{enc}/sitemaps").json().get("sitemap", [])
    out.append("\n## Sitemaps\n\n" + "\n".join(f"- {x['path']}: submitted {sum(int(c.get('submitted', 0)) for c in x.get('contents', []))}, errors {x.get('errors', 0)}, warnings {x.get('warnings', 0)}, read {x.get('lastDownloaded', 'never')}" for x in sm) + "\n")
    out.append("\n## Indexing of priority pages\n")
    for p in ["/", "/ramcharitmanas", "/valmiki-ramayana", "/sunderkand", "/ramayana-movie", "/hi", "/hi/ramcharitmanas", "/hi/sunderkand", "/chaupai", "/characters", "/places", "/news", "/ramcharitmanas/sunderkand/doha-1", "/hi/ramcharitmanas/sunderkand/doha-1"]:
        r = s.post("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", json={"inspectionUrl": "https://ramayana.com" + p, "siteUrl": SITE}).json()
        i = r.get("inspectionResult", {}).get("indexStatusResult", {})
        out.append(f"- {p}: {i.get('verdict', r.get('error', {}).get('message', '?'))}, {i.get('coverageState', '')}, crawled {i.get('lastCrawlTime', 'never')[:10]}")
    out.append("")
except Exception as e:
    out.append(f"Search Console error: {e}\n")
try:
    h = {"Authorization": "Bearer " + os.environ["PLAUSIBLE_API_KEY"]}
    a = requests.get("https://plausible.io/api/v1/stats/aggregate", headers=h, params={"site_id": "ramayana.com", "period": "day", "metrics": "visitors,pageviews,bounce_rate"}, timeout=30).json().get("results", {})
    pg = requests.get("https://plausible.io/api/v1/stats/breakdown", headers=h, params={"site_id": "ramayana.com", "period": "7d", "property": "event:page", "limit": 8}, timeout=30).json().get("results", [])
    src = requests.get("https://plausible.io/api/v1/stats/breakdown", headers=h, params={"site_id": "ramayana.com", "period": "7d", "property": "visit:source", "limit": 6}, timeout=30).json().get("results", [])
    out.append(f"## Traffic\n\nToday: {a.get('visitors', {}).get('value')} visitors, {a.get('pageviews', {}).get('value')} pageviews\n\nTop pages, 7 days: " + ", ".join(f"{p['page']} ({p['visitors']})" for p in pg) + "\n\nSources: " + ", ".join(f"{p['source']} ({p['visitors']})" for p in src) + "\n")
except Exception as e:
    out.append(f"Plausible error: {e}\n")
bad = [f"{u} {requests.get('https://ramayana.com' + u, timeout=30, allow_redirects=False).status_code}" for u in ["/", "/hi", "/sunderkand", "/privacy", "/support", "/sitemap.xml", "/robots.txt", "/news"] if requests.get("https://ramayana.com" + u, timeout=30, allow_redirects=False).status_code != 200]
out.append("## Live checks\n\n" + ("All key URLs return 200.\n" if not bad else "PROBLEM: " + ", ".join(bad) + "\n"))
d = ROOT / "monitoring"; d.mkdir(exist_ok=True); f = d / f"{today}.md"; f.write_text("\n".join(out)); print(f); print("\n".join(out))
