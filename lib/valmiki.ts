import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "@/lib/content";

export type VVerse = { n: string; text: string; m: string };
export type Sarga = { n: number; title_en: string; title_hi: string; verses: VVerse[] };
export type VKand = { number: number; slug: string; title_en: string; title_hi: string; editions: Record<Lang, Sarga[]> };
type SargaMeta = { n: number; verses: number };
export type VIndex = { kands: { number: number; slug: string; title_en: string; title_hi: string; sargas: Record<Lang, SargaMeta[]> }[] };

const ROOT = join(process.cwd(), "content", "valmiki");
const cache = new Map<string, unknown>();
const load = <T,>(f: string): T => {
  if (!cache.has(f)) cache.set(f, JSON.parse(readFileSync(join(ROOT, f), "utf8")));
  return cache.get(f) as T;
};
export const vIndex = () => load<VIndex>("index.json");
export const vKand = (slug: string) => (existsSync(join(ROOT, `${slug}.json`)) && slug !== "index" ? load<VKand>(`${slug}.json`) : null);
export const vHub = (lang: Lang) => `${lang === "hi" ? "/hi" : ""}/valmiki-ramayana`;
export const vKandPath = (lang: Lang, k: string) => `${vHub(lang)}/${k}`;
export const vSargaPath = (lang: Lang, k: string, n: number) => `${vKandPath(lang, k)}/sarga-${n}`;
export const vTitle = (k: { title_en: string; title_hi: string }, lang: Lang) => (lang === "hi" ? k.title_hi : k.title_en);
/** Valmiki kandas share the seven kand paintings. */
export const vArt: Record<string, string> = { "bala-kanda": "bal-kand", "ayodhya-kanda": "ayodhya-kand", "aranya-kanda": "aranya-kand", "kishkindha-kanda": "kishkindha-kand", "sundara-kanda": "sunderkand", "yuddha-kanda": "lanka-kand", "uttara-kanda": "uttar-kand" };

export function vSarga(lang: Lang, slug: string, sarga: string) {
  const k = vKand(slug);
  const n = Number(sarga.replace("sarga-", ""));
  if (!k) return null;
  const list = k.editions[lang];
  const i = list.findIndex((s) => s.n === n);
  if (i < 0) return null;
  const kands = vIndex().kands, ki = kands.findIndex((x) => x.slug === slug);
  const prev = i > 0 ? { slug, n: list[i - 1].n } : ki > 0 ? { slug: kands[ki - 1].slug, n: kands[ki - 1].sargas[lang].at(-1)!.n } : null;
  const next = i < list.length - 1 ? { slug, n: list[i + 1].n } : ki < kands.length - 1 ? { slug: kands[ki + 1].slug, n: kands[ki + 1].sargas[lang][0].n } : null;
  return { kand: k, sarga: list[i], prev, next };
}
