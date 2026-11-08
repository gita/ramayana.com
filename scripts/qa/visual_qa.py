#!/usr/bin/env python3
"""Visual QA gate. Screenshots each URL at phone (390px) and desktop (1440px), then asks
GPT-6.1 Sol (Codex, with the screenshots attached) to review design, layout, Hindi rendering,
images and content. Writes a report and exits 1 if any page gets a FAIL verdict.
Run: python3 scripts/qa/visual_qa.py http://localhost:3100/songs/x ...  (Playwright lives in radhakrishna.net)
"""
import json, pathlib, re, subprocess, sys, tempfile, textwrap
PW = pathlib.Path("~/Documents/radhakrishna.net/scripts").expanduser()
OUT = pathlib.Path(tempfile.gettempdir()) / "ramayana-visual-qa"; OUT.mkdir(exist_ok=True)
urls = sys.argv[1:]
js = PW / "tmp-visual-qa.mjs"
js.write_text(textwrap.dedent(f"""
import {{ chromium }} from "playwright";
const urls = {json.dumps(urls)}; const out = {json.dumps(str(OUT))};
const b = await chromium.launch();
for (const [vw, tag, dpr] of [[{{width:390,height:844}},"phone",2],[{{width:1440,height:900}},"desktop",1]]) {{
  const c = await b.newContext({{ viewport: vw, deviceScaleFactor: dpr }}); const p = await c.newPage();
  for (const [i,u] of urls.entries()) {{
    await p.goto(u, {{ waitUntil: "networkidle" }});
    await p.addStyleTag({{ content: "aside[aria-label='Get the Ramayan app']{{display:none!important}}" }});
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let k = 0, y = 0; k < 4 && y < h; k++, y += vw.height) {{ await p.evaluate((yy)=>window.scrollTo(0,yy), y); await p.waitForTimeout(250); await p.screenshot({{ path: `${{out}}/${{i}}-${{tag}}-${{k}}.png` }}); }}
  }}
  await c.close();
}}
await b.close();
"""))
subprocess.run(["node", js.name], cwd=PW, check=True); js.unlink()
PROMPT = """You are a senior product designer and editor reviewing a page of ramayana.com, a calm, reverent scripture site (Literata serif for reading, Inter for UI, Devanagari verses in deep red). Quality bar: Apple, Stripe, Airbnb. The attached screenshots show the page at phone and desktop width, top to bottom.
Check: layout breaks, overlapping or clipped elements, uneven spacing or widths, weak hierarchy, walls of text, broken or ugly Devanagari rendering, images that are wrong, disrespectful, cropped badly or depict the wrong scene, inconsistent buttons, anything that looks unfinished, and copy that sounds machine-written or contains process words.
Answer in JSON only: {"verdict": "PASS" | "FIX" | "FAIL", "issues": [{"severity": "broken|weak|polish", "where": "...", "what": "...", "fix": "..."}]}. FAIL only for broken layout, wrong images or embarrassing copy."""
bad = 0; report = []
for i, u in enumerate(urls):
    imgs = sorted(OUT.glob(f"{i}-*.png"))
    args = ["codex", "exec", "-m", "gpt-6.1-sol", "--sandbox", "read-only", "--skip-git-repo-check"]
    for im in imgs: args += ["-i", str(im)]
    o = OUT / f"{i}.txt"
    subprocess.run(args + ["--output-last-message", str(o), "-"], input=PROMPT + f"\nURL: {u}", text=True, capture_output=True, timeout=900)
    t = re.sub(r"^```(?:json)?|```$", "", o.read_text().strip()).strip()
    try: r = json.loads(t)
    except Exception: r = {"verdict": "FIX", "issues": [{"severity": "weak", "where": "reviewer", "what": t[:300], "fix": ""}]}
    report.append({"url": u, **r}); bad += r.get("verdict") == "FAIL"
    print(f"{r.get('verdict')}: {u}"); [print(f"  [{x.get('severity')}] {x.get('where')}: {x.get('what')} -> {x.get('fix')}") for x in r.get("issues", [])]
(OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1)); print(f"screenshots and report in {OUT}")
sys.exit(1 if bad else 0)
