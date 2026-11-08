#!/usr/bin/env python3
"""Slop gate with automatic repair. For each file: run the checker, send flagged sentences to
Codex GPT-6.1 Sol with the reviewer prompt and style samples, apply the before/after edits,
then re-check. Exits 1 if any error remains.  Run: python3 scripts/qa/deslop.py FILE...
"""
import json, pathlib, re, subprocess, sys, tempfile
K = pathlib.Path("~/.claude/skills/mukundananda-voice").expanduser()
CHECK = K / "slop/check.py"
def flags(f):
    r = subprocess.run([sys.executable, str(CHECK), "--json", str(f)], capture_output=True, text=True)
    try: data = json.loads(r.stdout or "[]")
    except json.JSONDecodeError: return []
    items = data if isinstance(data, list) else data.get("violations", data.get("results", []))
    return [x for x in items if x.get("level", x.get("severity")) == "error"]
def samples(hindi):
    dirs = ["mukundananda-hindi", "ramsukhdas"] if hindi else ["mukundananda", "sivananda"]
    out = []
    for d in dirs:
        out += [p.read_text()[:1800] for p in sorted((K / "samples" / d).glob("*.md"))[:2]]
    return "\n\n---\n\n".join(out)
def fix(f):
    fl = flags(f)
    if not fl: return 0
    text = f.read_text()
    hindi = bool(re.search(r"[ऀ-ॿ]", " ".join(x.get("sentence", "") for x in fl)))
    prompt = (K / "slop/REVIEW-PROMPT.md").read_text() + f"\n\nFILE:\n<<<\n{text}\n>>>\n\nFLAGS:\n{json.dumps(fl, ensure_ascii=False)}\n\nSAMPLES:\n{samples(hindi)}\n"
    with tempfile.NamedTemporaryFile("r", suffix=".txt", delete=False) as o: pass
    subprocess.run(["codex", "exec", "-m", "gpt-6.1-sol", "--sandbox", "read-only", "--skip-git-repo-check", "--output-last-message", o.name, "-"], input=prompt, text=True, capture_output=True, timeout=900)
    raw = re.sub(r"^```(?:json)?|```$", "", pathlib.Path(o.name).read_text().strip()).strip()
    edits = json.loads(raw)
    for e in edits:
        b, a = e.get("before", ""), e.get("after", "")
        if not b or a == b: continue
        enc = (lambda s: json.dumps(s, ensure_ascii=False)[1:-1]) if f.suffix == ".json" else (lambda s: s)
        if enc(b) in text: text = text.replace(enc(b), enc(a), 1)
        else: print(f"  could not place: {b[:80]}")
    if f.suffix == ".json": json.loads(text)
    f.write_text(text)
    left = flags(f)
    print(f"{f}: {len(fl)} flagged, {len(left)} left")
    return len(left)
if __name__ == "__main__":
    bad = sum(fix(pathlib.Path(p)) for p in sys.argv[1:])
    sys.exit(1 if bad else 0)
