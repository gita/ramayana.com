#!/usr/bin/env python3
"""Builds the site's Ramcharitmanas content from the app's verified dataset.

Source: ~/Documents/ramayan-app/data/verified (Gita Press code 790 Hindi tika,
code 1318 original text and English). Output: content/ramcharitmanas/*.json,
one compact file per kand plus an index. The verse IDs are the app's stable
IDs, so a verse deep-links the same way in the app and on the site.

Run: python3 scripts/build-content.py [path-to-verified-dir]
"""
import json, pathlib, re, sys

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "~/Documents/ramayan-app/data/verified").expanduser()
OUT = pathlib.Path(__file__).resolve().parent.parent / "content" / "ramcharitmanas"
OUT.mkdir(parents=True, exist_ok=True)

KANDS = [
    (1, "bal-kand", "Bal Kand", "बालकाण्ड", "Bāla-Kāṇḍa"),
    (2, "ayodhya-kand", "Ayodhya Kand", "अयोध्याकाण्ड", "Ayodhyā-Kāṇḍa"),
    (3, "aranya-kand", "Aranya Kand", "अरण्यकाण्ड", "Araṇya-Kāṇḍa"),
    (4, "kishkindha-kand", "Kishkindha Kand", "किष्किन्धाकाण्ड", "Kiṣkindhā-Kāṇḍa"),
    (5, "sunderkand", "Sunderkand", "सुन्दरकाण्ड", "Sundara-Kāṇḍa"),
    (6, "lanka-kand", "Lanka Kand", "लंकाकाण्ड", "Laṅkā-Kāṇḍa"),
    (7, "uttar-kand", "Uttar Kand", "उत्तरकाण्ड", "Uttara-Kāṇḍa"),
]
FILES = {1: "01-bala-kanda", 2: "02-ayodhya-kanda", 3: "03-aranya-kanda", 4: "04-kishkindha-kanda",
         5: "05-sundara-kanda", 6: "06-lanka-kanda", 7: "07-uttara-kanda"}

nav = json.load(open(SRC / "navigation.json"))
notes = json.load(open(SRC / "notes.json"))
hindi_notes = {n["id"]: n["body"] for n in notes.get("hindi", [])}
edocs = json.load(open(SRC / "edition-documents.json"))["documents"]

# Hindi section titles: printed_number per kand -> reader_unit_id + title.
hi_sections = {}  # (kand, number) -> dict
for c in nav["contents"]:
    if c.get("scope") != "kand_body" or not c.get("reader_unit_id"):
        continue
    k = int(c["reader_unit_id"].split("-")[1][1:])
    num = int(re.sub(r"\D", "", c.get("printed_number") or str(c["number"])) or c["number"])
    hi_sections[(k, num)] = {"unit": c["reader_unit_id"], "title_hi": c["title"].strip()}

# English section titles from the 1318 edition's Contents, numbered per Descent.
en_contents = next(d for d in edocs if d.get("title") == "Contents")["body"]
en_sections = {}
kand = None
cur = None
for raw in en_contents.splitlines():
    line = raw.rstrip()
    m = re.match(r"\s*Descent\s+([IVX]+)\s*\(", line)
    if m:
        kand = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7}[m.group(1)]
        cur = None
        continue
    if kand is None:
        continue
    m = re.match(r"\s*(\d+)\.\s+(.*)", line)
    if m:
        cur = int(m.group(1))
        en_sections[(kand, cur)] = m.group(2)
    elif cur and line.strip():
        en_sections[(kand, cur)] += " " + line.strip()
for key, t in list(en_sections.items()):
    t = re.sub(r"\s*\.{2,}\s*\S*\s*$", "", t)           # drop dot leaders and page numbers
    t = re.sub(r"\s+\d{1,4}$", "", t)                      # a bare trailing page number
    t = re.sub(r"\s+", " ", t).strip(" .")
    en_sections[key] = t

# Both editions number topics continuously through the book but the kand
# boundaries differ by a few items, so map by ordinal within each kand.
def ordinal_map(d):
    out = {}
    for k in range(1, 8):
        for j, (key, val) in enumerate(sorted((x for x in d.items() if x[0][0] == k), key=lambda x: x[0][1]), 1):
            out[(k, j)] = val
    return out
hi_by_ord = ordinal_map(hi_sections)
en_by_ord = ordinal_map(en_sections)

# Name-based alignment for kands where the two contents lists differ by an item:
# score titles by shared named entities, then align with a small DP (gaps allowed).
NAMES = {"हनुमान": "hanum", "सीता": "sita", "राम": "rama", "लक्ष्मण": "laksm", "भरत": "bharat", "रावण": "ravan", "विभीषण": "vibhis",
 "सुग्रीव": "sugriv", "बालि": "vali", "अङ्गद": "angad", "अंगद": "angad", "जाम्बवान": "jamb", "त्रिजटा": "trijat", "शबरी": "sabar", "जटायु": "jatay",
 "शूर्पणखा": "surpa", "खर": "khara", "मारीच": "maric", "कुम्भकर्ण": "kumbh", "मेघनाद": "meghan", "नारद": "narad", "लङ्का": "lanka", "लंका": "lanka",
 "अशोक": "asoka", "समुद्र": "ocean", "सेतु": "bridge", "अक्षय": "aksay", "मन्दोदरी": "mandod", "दशरथ": "dasar", "कैकेयी": "kaike", "मन्थरा": "manth",
 "चित्रकूट": "citrak", "केवट": "boatm", "निषाद": "guha", "वाल्मीकि": "valmik", "अत्रि": "atri", "अगस्त्य": "agast", "पम्पा": "pampa", "वर्षा": "rain",
 "शरद": "autumn", "कबन्ध": "kaband", "काकभुशुण्डि": "bhusun", "गरुड़": "garud", "सुरसा": "suras", "लङ्किनी": "lankin", "अङ्गूठी": "ring", "मुद्रिका": "ring",
 "दहन": "burn", "अग्नि": "fire", "युद्ध": "battle", "वध": "kill", "संवाद": "dialog", "राज्याभिषेक": "coron", "अयोध्या": "ayodh", "पुष्पक": "puspak",
 "इन्द्रजित": "meghan", "नागपाश": "noose", "शक्ति": "sakti", "संजीवनी": "sanjiv", "कालनेमि": "kalanem", "अहिरावण": "ahirav", "मंगलाचरण": "invoc", "वन्दना": "salut"}
EN = {"hanum": ["hanum"], "sita": ["sītā", "sita"], "rama": ["rāma", "rama"], "laksm": ["lakṣm", "laksm"], "bharat": ["bharat"], "ravan": ["rāvaṇ", "ravan"],
 "vibhis": ["vibhīṣ", "vibhis"], "sugriv": ["sugrīv", "sugriv"], "vali": ["vāli", "bali"], "angad": ["aṅgad", "angad"], "jamb": ["jāmbav", "jamb"],
 "trijat": ["trijaṭ", "trijat"], "sabar": ["śabar", "sabar"], "jatay": ["jaṭāy", "jatay"], "surpa": ["śūrpaṇ", "surpa"], "khara": ["khara"], "maric": ["mārīc", "maric"],
 "kumbh": ["kumbhak"], "meghan": ["meghan", "indrajit"], "narad": ["nārad", "narad"], "lanka": ["laṅkā", "lanka"], "asoka": ["aśoka", "asoka"], "ocean": ["ocean", "sea"],
 "bridge": ["bridge"], "aksay": ["akṣay", "aksay"], "mandod": ["mandodar"], "dasar": ["daśarath", "dasarath"], "kaike": ["kaikey"], "manth": ["manthar"],
 "citrak": ["citrakūṭ", "chitrak"], "boatm": ["boatm", "kevaṭ"], "guha": ["guha", "niṣād"], "valmik": ["vālmīk", "valmik"], "atri": ["atri"], "agast": ["agast"],
 "pampa": ["pampā", "pampa"], "rain": ["rain", "monsoon"], "autumn": ["autumn"], "kaband": ["kabandh"], "bhusun": ["bhuśuṇḍ", "bhusund"], "garud": ["garuḍ", "garud"],
 "suras": ["suras"], "lankin": ["laṅkin", "lankin"], "ring": ["ring"], "burn": ["burn", "fire"], "fire": ["fire"], "battle": ["battle", "fight", "war"], "kill": ["kill", "slay", "death"],
 "dialog": ["dialogue", "colloquy", "convers"], "coron": ["coronat", "installat"], "ayodh": ["ayodhy"], "puspak": ["puṣpak", "pushpak"], "noose": ["noose"],
 "sakti": ["śakti", "spear", "lance"], "sanjiv": ["sañjīv", "sanjiv", "herb"], "kalanem": ["kālanem", "kalanem"], "ahirav": ["ahirāv", "ahirav"], "invoc": ["invocat"], "salut": ["salutat"]}
def sig_hi(t): return {v for k, v in NAMES.items() if k in t}
def sig_en(t):
    t = t.lower(); return {k for k, pats in EN.items() if any(p in t for p in pats)}
def sim(h, e):
    a, b = sig_hi(h), sig_en(e)
    return (len(a & b) / len(a | b)) if (a or b) else 0.3
def align(hi, en):
    n, m = len(hi), len(en); GAP = -0.15
    dp = [[0.0] * (m + 1) for _ in range(n + 1)]; bt = [[None] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1): dp[i][0] = i * GAP; bt[i][0] = "u"
    for j in range(1, m + 1): dp[0][j] = j * GAP; bt[0][j] = "l"
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            best = (dp[i - 1][j - 1] + sim(hi[i - 1], en[j - 1]) - 0.05, "d")
            if dp[i - 1][j] + GAP > best[0]: best = (dp[i - 1][j] + GAP, "u")
            if dp[i][j - 1] + GAP > best[0]: best = (dp[i][j - 1] + GAP, "l")
            dp[i][j], bt[i][j] = best
    out = {}; i, j = n, m
    while i > 0 or j > 0:
        mv = bt[i][j]
        if mv == "d": out[i - 1] = j - 1; i -= 1; j -= 1
        elif mv == "u": i -= 1
        else: j -= 1
    return out
for k in range(1, 8):
    hk = [key for key in sorted(hi_by_ord) if key[0] == k]; ek = [key for key in sorted(en_by_ord) if key[0] == k]
    if len(hk) == len(ek):
        for h, e in zip(hk, ek): hi_by_ord[h]["en"] = en_by_ord[e]
    else:
        a = align([hi_by_ord[key]["title_hi"] for key in hk], [en_by_ord[key] for key in ek])
        for i, key in enumerate(hk): hi_by_ord[key]["en"] = en_by_ord[ek[a[i]]] if i in a else ""
        print(f"kand {k}: {len(hk)} Hindi vs {len(ek)} English topics, aligned by name ({len(a)} matched)")
hi_sections = hi_by_ord

def unit_index(uid):
    return int(uid.rsplit("-u", 1)[1])

index = {"work": {"title_en": "Shri Ramcharitmanas", "title_hi": "श्रीरामचरितमानस", "author_en": "Goswami Tulsidas",
                  "author_hi": "गोस्वामी तुलसीदास"}, "kands": []}
total_units = total_verses = 0
for num, slug, title_en, title_hi, title_iast in KANDS:
    d = json.load(open(SRC / "kands" / f"{FILES[num]}.json"))
    hm = {m["id"]: m for m in d["hindi_meanings"]}
    units = {}
    for v in d["original_verses"]:
        units.setdefault(v["reader_unit_id"], []).append(v)
    presentations = {}
    for p in d["reader_presentations"]:
        presentations.setdefault(p["reader_unit_id"], []).append(p)
    # Section titles keyed by the unit they start at.
    sections = {}
    for (k, n), s in sorted(hi_sections.items()):
        if k != num:
            continue
        sections.setdefault(s["unit"], []).append({"n": n, "hi": s["title_hi"], "en": s.get("en", "")})
    out_units = []
    for uid in sorted(units, key=unit_index):
        i = unit_index(uid)
        verses = []
        for v in units[uid]:
            m = hm.get(v["id"], {})
            verses.append({
                "id": v["id"],
                "type": v["verse_type"],
                "text": v["display_text"].strip(),
                "hi": (m.get("meaning_main") or "").strip(),
                "notes_hi": [hindi_notes[n] for n in m.get("note_ids", []) if n in hindi_notes],
            })
        en = [{"verses": p["app_verse_ids"], "text": p["body"].strip()} for p in presentations.get(uid, [])]
        closing = next((v for v in reversed(verses) if v["type"] in ("doha", "soratha")), None)
        label = closing["id"].split(".")[-1] if closing and i > 0 else None
        out_units.append({
            "n": i,
            "slug": "mangalacharan" if i == 0 else f"doha-{label or i}",
            "label_en": "Invocation" if i == 0 else f"Doha {label or i}",
            "label_hi": "मंगलाचरण" if i == 0 else f"दोहा {label or i}",
            "sections": sections.get(uid, []),
            "verses": verses,
            "en": en,
        })
    kand_out = {"number": num, "slug": slug, "title_en": title_en, "title_hi": title_hi, "title_iast": title_iast,
                "units": out_units}
    json.dump(kand_out, open(OUT / f"{slug}.json", "w"), ensure_ascii=False, separators=(",", ":"))
    nverses = sum(len(u["verses"]) for u in out_units)
    total_units += len(out_units); total_verses += nverses
    index["kands"].append({"number": num, "slug": slug, "title_en": title_en, "title_hi": title_hi, "title_iast": title_iast,
                           "units": len(out_units), "dohas": len(out_units) - 1, "verses": nverses,
                           "sections": [{"unit": u["slug"], **s} for u in out_units for s in u["sections"]]})
    missing_en = sum(1 for u in out_units for s in u["sections"] if not s["en"])
    print(f"{slug:16} units {len(out_units):4}  verses {nverses:5}  sections {sum(len(u['sections']) for u in out_units):3}  (en titles missing {missing_en})")
index["totals"] = {"units": total_units, "verses": total_verses}
json.dump(index, open(OUT / "index.json", "w"), ensure_ascii=False, indent=1)
print("total units", total_units, "verses", total_verses)
