#!/usr/bin/env node
/**
 * Run daily by .github/workflows/release.yml. If a batch is due and not yet logged,
 * records it in content/release-log.json (the workflow commits that, which deploys).
 * With --ping, waits for the new pages to go live and submits them to IndexNow.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = join(import.meta.dirname, "..");
const read = (f) => JSON.parse(readFileSync(join(root, f), "utf8"));
const SITE = "https://ramayana.com";
const schedule = read("content/release-schedule.json"), log = read("content/release-log.json");
const today = (process.env.RELEASE_NOW ?? new Date().toISOString()).slice(0, 10);
const now = schedule.pausedFrom && schedule.pausedFrom < today ? schedule.pausedFrom : today;
const due = schedule.batches.filter((b) => b.date <= now && !log.released.includes(b.date));

function urls(batch) {
  const out = [];
  const previous = (r) => Math.max(0, ...schedule.batches.filter((b) => b.date < batch.date).flatMap((b) => b.release).filter((x) => x.book === r.book && x.kand === r.kand).map((x) => x.through));
  for (const r of batch.release) {
    if (r.book === "rcm") {
      const units = read(`content/ramcharitmanas/${r.kand}.json`).units.slice(previous(r), r.through);
      for (const u of units) out.push(`/ramcharitmanas/${r.kand}/${u.slug}`, `/hi/ramcharitmanas/${r.kand}/${u.slug}`);
    } else {
      const list = read("content/valmiki/index.json").kands.find((k) => k.slug === r.kand).sargas.en.slice(previous(r), r.through);
      for (const s of list) out.push(`/valmiki-ramayana/${r.kand}/sarga-${s.n}`, `/hi/valmiki-ramayana/${r.kand}/sarga-${s.n}`);
    }
  }
  return out.map((u) => SITE + u);
}

if (process.argv.includes("--ping")) {
  const pending = schedule.batches.filter((b) => process.env.PING_DATES?.split(",").includes(b.date));
  const list = pending.flatMap(urls);
  if (!list.length) process.exit(0);
  const key = /indexNowKey: "(\w+)"/.exec(readFileSync(join(root, "lib/site.ts"), "utf8"))[1];
  for (let i = 0; i < 30; i++) {
    const html = await (await fetch(list[0])).text();
    if (!/noindex/.test(html.slice(0, 20000))) break;
    await new Promise((r) => setTimeout(r, 30000));
  }
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ host: "ramayana.com", key, urlList: list }) });
  console.log("IndexNow", res.status, list.length, "urls");
} else {
  for (const b of due) { log.released.push(b.date); console.log("releasing", b.date, urls(b).length, "urls"); }
  if (due.length && !process.env.DRY_RUN) writeFileSync(join(root, "content/release-log.json"), JSON.stringify(log, null, 1) + "\n");
  console.log(`dates=${due.map((b) => b.date).join(",")}`);
}
