#!/usr/bin/env python3
"""Builds the Valmiki Ramayana from the app's pack. English pages use the Gita Press
Sanskrit-English edition, Hindi pages the Sanskrit-Hindi edition. The editions are never mixed."""
import json, pathlib, re, sqlite3
PACK = pathlib.Path("~/Documents/ramayan-app/app/assets/packs/ramayan/pack.db").expanduser()
OUT = pathlib.Path(__file__).resolve().parent.parent / "content" / "valmiki"; OUT.mkdir(parents=True, exist_ok=True)
SLUG = {1: ("bala-kanda", "Bala Kanda", "बालकाण्ड"), 2: ("ayodhya-kanda", "Ayodhya Kanda", "अयोध्याकाण्ड"), 3: ("aranya-kanda", "Aranya Kanda", "अरण्यकाण्ड"),
        4: ("kishkindha-kanda", "Kishkindha Kanda", "किष्किन्धाकाण्ड"), 5: ("sundara-kanda", "Sundara Kanda", "सुन्दरकाण्ड"), 6: ("yuddha-kanda", "Yuddha Kanda", "युद्धकाण्ड"), 7: ("uttara-kanda", "Uttara Kanda", "उत्तरकाण्ड")}
c = sqlite3.connect(PACK); c.row_factory = sqlite3.Row
index = {"kands": []}
for ord_, (slug, en, hi) in SLUG.items():
    k = {"number": ord_, "slug": slug, "title_en": en, "title_hi": hi, "editions": {}}
    for tid, lang in (("valmiki-gpe", "en"), ("valmiki-gp", "hi")):
        kr = c.execute("select * from kands where text_id=? and ord=?", (tid, ord_)).fetchone()
        if not kr:
            kr = c.execute("select * from kands where text_id=? order by ord limit 1 offset ?", (tid, ord_ - 1)).fetchone()
        units = []
        for u in c.execute("select * from units where kand_id=? order by ord", (kr["id"],)).fetchall():
            vs = []
            rows = c.execute("select * from verses where unit_id=? order by ord", (u["id"],)).fetchall()
            tr = {}
            for t in c.execute("select t.* from translations t join verses v on v.id=t.verse_id where v.unit_id=? and t.language=?", (u["id"], lang)).fetchall():
                tr.setdefault(t["verse_id"], t["body"])
            for v in rows:
                vs.append({"n": v["verse_number"], "text": (v["devanagari"] or "").strip(), "m": (tr.get(v["id"]) or "").strip()})
            units.append({"n": u["ord"], "title_en": u["title_en"] or "", "title_hi": u["title_dev"] or "", "verses": vs})
        k["editions"][lang] = units
        print(slug, lang, "sargas", len(units), "verses", sum(len(x["verses"]) for x in units), "with meaning", sum(1 for x in units for v in x["verses"] if v["m"]))
    json.dump(k, open(OUT / f"{slug}.json", "w"), ensure_ascii=False, separators=(",", ":"))
    index["kands"].append({a: k[a] for a in ("number", "slug", "title_en", "title_hi")} | {"sargas": {l: [{"n": u["n"], "title_en": u["title_en"], "title_hi": u["title_hi"], "verses": len(u["verses"])} for u in k["editions"][l]] for l in k["editions"]}})
json.dump(index, open(OUT / "index.json", "w"), ensure_ascii=False)
