import requests, json, sys, time, urllib.parse
seeds=sys.argv[1:]
out={}
def sug(q, hl, gl):
    r=requests.get("https://suggestqueries.google.com/complete/search",params={"client":"firefox","q":q,"hl":hl,"gl":gl},headers={"User-Agent":"Mozilla/5.0"},timeout=10)
    try: return r.json()[1]
    except Exception: return []
for s in seeds:
    res=set()
    for hl,gl in [("en","in"),("hi","in"),("en","us")]:
        res.update(sug(s,hl,gl))
        for suf in " abcdefghijklmnopqrstuvwxyz":
            res.update(sug(s+" "+suf.strip() if suf.strip() else s+" ",hl,gl)); time.sleep(0.15)
    out[s]=sorted(res)
    print("==",s,len(res)); print("\n".join(sorted(res)))
json.dump(out,open("autocomplete.json","w"),indent=1,ensure_ascii=False)
