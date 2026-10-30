import os, json, sys, requests, time
KEY=os.environ['KE_API_KEY']
def fetch(kws, country):
    out=[]
    for i in range(0,len(kws),100):
        chunk=kws[i:i+100]
        r=requests.post("https://api.keywordseverywhere.com/v1/get_keyword_data",
            headers={"Authorization":f"Bearer {KEY}"},
            data=[("country",country),("currency","inr" if country=="in" else "usd"),("dataSource","gkp")]+[("kw[]",k) for k in chunk])
        j=r.json()
        if 'data' not in j: print(j, file=sys.stderr); continue
        for d in j['data']:
            tr={f"{t['year']}-{t['month'][:3]}":t['value'] for t in d.get('trend',[])}
            out.append({"keyword":d['keyword'],"vol":d['vol'],"cpc":d['cpc']['value'],"comp":d['competition'],"trend":tr})
        time.sleep(0.5)
    return out
kws=[l.strip() for l in open(sys.argv[1]) if l.strip() and not l.startswith('#')]
res={c:fetch(kws,c) for c in sys.argv[2].split(',')}
json.dump(res,open(sys.argv[3],'w'),indent=1,ensure_ascii=False)
for c in res:
    print("==",c)
    for d in sorted(res[c],key=lambda x:-x['vol'])[:400]:
        if d['vol']>0: print(f"{d['vol']:>9}  {d['keyword']}")
