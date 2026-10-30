import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export type Lang = "en" | "hi";
export type VerseType = "chaupai" | "doha" | "soratha" | "chhand" | "shloka";
export type Verse = {
  id: string;
  type: VerseType;
  text: string;
  hi: string;
  notes_hi: string[];
};
export type Section = { n: number; hi: string; en: string };
export type Unit = {
  n: number;
  slug: string;
  label_en: string;
  label_hi: string;
  sections: Section[];
  verses: Verse[];
  en: { verses: string[]; text: string }[];
};
export type Kand = {
  number: number;
  slug: string;
  title_en: string;
  title_hi: string;
  title_iast: string;
  units: Unit[];
};
export type KandSummary = Omit<Kand, "units"> & {
  units: number;
  dohas: number;
  verses: number;
  sections: (Section & { unit: string })[];
};
export type Index = {
  work: {
    title_en: string;
    title_hi: string;
    author_en: string;
    author_hi: string;
  };
  kands: KandSummary[];
  totals: { units: number; verses: number };
};

const ROOT = join(process.cwd(), "content", "ramcharitmanas");
const cache = new Map<string, unknown>();
function load<T>(file: string): T {
  if (!cache.has(file))
    cache.set(file, JSON.parse(readFileSync(join(ROOT, file), "utf8")));
  return cache.get(file) as T;
}

export const index = (): Index => load<Index>("index.json");
export const kand = (slug: string): Kand | null =>
  existsSync(join(ROOT, `${slug}.json`)) ? load<Kand>(`${slug}.json`) : null;
export const kandSlugs = () => index().kands.map((k) => k.slug);

export function unit(kandSlug: string, unitSlug: string) {
  const k = kand(kandSlug);
  if (!k) return null;
  const i = k.units.findIndex((u) => u.slug === unitSlug);
  if (i < 0) return null;
  const ki = index().kands.findIndex((x) => x.slug === kandSlug);
  const prev =
    i > 0
      ? { kand: k, unit: k.units[i - 1] }
      : ki > 0
        ? lastUnit(index().kands[ki - 1].slug)
        : null;
  const next =
    i < k.units.length - 1
      ? { kand: k, unit: k.units[i + 1] }
      : ki < index().kands.length - 1
        ? firstUnit(index().kands[ki + 1].slug)
        : null;
  return { kand: k, unit: k.units[i], prev, next };
}
const firstUnit = (slug: string) => {
  const k = kand(slug)!;
  return { kand: k, unit: k.units[0] };
};
const lastUnit = (slug: string) => {
  const k = kand(slug)!;
  return { kand: k, unit: k.units[k.units.length - 1] };
};

export function verseById(id: string) {
  const m = /^rcm-(\d)\./.exec(id);
  if (!m) return null;
  const k = index().kands.find((x) => x.number === Number(m[1]));
  const kk = k && kand(k.slug);
  if (!kk) return null;
  for (const u of kk.units) {
    const v = u.verses.find((x) => x.id === id);
    if (v)
      return {
        kand: kk,
        unit: u,
        verse: v,
        en: u.en.find((e) => e.verses.includes(id)) ?? null,
      };
  }
  return null;
}

/** The form marker printed before a verse in the Gita Press book. */
export const marker: Record<VerseType, { hi: string; en: string }> = {
  chaupai: { hi: "चौ०", en: "Chaupai" },
  doha: { hi: "दो०", en: "Doha" },
  soratha: { hi: "सो०", en: "Soratha" },
  chhand: { hi: "छं०", en: "Chhand" },
  shloka: { hi: "श्लोक", en: "Shloka" },
};

export const kandPath = (lang: Lang, k: string) =>
  `${lang === "hi" ? "/hi" : ""}/ramcharitmanas/${k}`;
export const unitPath = (lang: Lang, k: string, u: string) =>
  `${kandPath(lang, k)}/${u}`;
export const kandTitle = (
  k: { title_en: string; title_hi: string },
  lang: Lang,
) => (lang === "hi" ? k.title_hi : k.title_en);

/**
 * The English paragraph that renders one verse, out of a translation block that
 * covers a run of verses. Gita Press ends each paragraph with the verse counter,
 * "(2)" or "(2-3)". Falls back to the whole block.
 */
export function englishForVerse(verse: Verse, block: { verses: string[]; text: string } | null) {
  if (!block) return null;
  if (block.verses.length === 1) return block.text;
  const m = /\.(?:c|ch|sh|so)?(\d+)[ab]?$/.exec(verse.id) ?? /\.(\d+)[ab]?$/.exec(verse.id);
  const n = m ? Number(m[1]) : NaN;
  const paras = block.text.split(/\n\s*\n/);
  const hit = paras.find((para) => {
    const c = /\((\d+)(?:-(\d+))?\)\s*$/.exec(para.trim());
    if (!c) return false;
    const a = Number(c[1]), b = c[2] ? Number(c[2]) : a;
    return n >= a && n <= b;
  });
  return hit?.trim() ?? block.text;
}
