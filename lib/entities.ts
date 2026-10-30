import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { englishForVerse, verseById } from "@/lib/content";

export type Kind = "characters" | "places";
export type Entity = { slug: string; name: string; art: string; title: string; description: string; answer: string; sections: { h2: string; md: string }[]; verses: string[]; faq: { q: string; a: string }[] };
const dir = (k: Kind) => join(process.cwd(), "content", "entities", k);

export function entities(kind: Kind): Entity[] {
  if (!existsSync(dir(kind))) return [];
  return readdirSync(dir(kind)).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(dir(kind), f), "utf8")) as Entity).sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
}
const ORDER = ["ram", "sita", "lakshman", "hanuman", "bharat", "ravan", "dashrath", "kaikeyi", "urmila", "jatayu", "shabari", "sugriv", "vibhishan", "kumbhkaran", "mandodari", "kevat", "ayodhya", "janakpur", "prayag", "chitrakoot", "panchavati", "kishkindha", "rameshwaram", "lanka", "ashok-vatika"];
export const entity = (kind: Kind, slug: string) => entities(kind).find((e) => e.slug === slug) ?? null;
export const artSrc = (art: string) => (art.startsWith("kand:") ? `/images/kand/${art.slice(5)}` : `/images/deity/${art}`);
export const entityVerses = (e: Entity) => e.verses.map((id) => { const r = verseById(id); return r ? { ...r, english: englishForVerse(r.verse, r.en) } : null; }).filter((x) => x !== null);
