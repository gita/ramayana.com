import list from "@/content/stuti/index.json";
import { kand, type Lang } from "@/lib/content";

export type Stuti = {
  slug: string; title: string; title_hi: string; kand: string; ids: string[];
  roman: Record<string, string[]>; spellings: string[];
  intro_en: string; intro_hi: string; scene_en: string; scene_hi: string;
  teaching_en: string; teaching_hi: string; how_en: string; how_hi: string;
  faq: { q_en: string; a_en: string; q_hi: string; a_hi: string }[];
};
export const stutis = list as unknown as Stuti[];
export const stutiPath = (lang: Lang, slug: string) => `${lang === "hi" ? "/hi" : ""}/stuti/${slug}`;

/** The stuti with each verse resolved from the Ramcharitmanas text, and its English block. */
export function stuti(slug: string) {
  const s = stutis.find((x) => x.slug === slug);
  if (!s) return null;
  const k = kand(s.kand);
  if (!k) return null;
  const verses = s.ids.map((id) => {
    for (const u of k.units) {
      const v = u.verses.find((x) => x.id === id);
      if (v) return { v, u };
    }
    return null;
  }).filter((x) => x !== null);
  return { ...s, k, verses };
}
