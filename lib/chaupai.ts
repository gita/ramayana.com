import list from "@/content/chaupai.json";
import details from "@/content/chaupai-detail/index.json";
import { verseById, type Lang } from "@/lib/content";

export type ChaupaiEntry = (typeof list)[number];
export const chaupais: ChaupaiEntry[] = list;

export function chaupai(slug: string) {
  const c = chaupais.find((x) => x.slug === slug);
  if (!c) return null;
  const v = verseById(c.id);
  if (!v) return null;
  return { ...c, ...v };
}

/** The same verse for everyone on the same day: a deterministic walk through the list. */
export function dailyChaupai(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = Math.floor(
    (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      start) /
      86400000,
  );
  return chaupai(chaupais[day % chaupais.length].slug)!;
}

export const chaupaiPath = (lang: Lang, slug: string) =>
  `${lang === "hi" ? "/hi" : ""}/chaupai/${slug}`;

import { englishForVerse, type Verse } from "@/lib/content";
export const englishForVerseSafe = (v: Verse, e: { verses: string[]; text: string } | null) => englishForVerse(v, e) ?? "";

export type ChaupaiDetail = {
  roman: string[];
  spellings: string[];
  words: { w: string; r: string; en: string; hi: string }[];
  scene_en: string; scene_hi: string;
  teaching_en: string; teaching_hi: string;
  faq: { q_en: string; a_en: string; q_hi: string; a_hi: string }[];
};
export const chaupaiDetail = (slug: string) =>
  ((details as Record<string, ChaupaiDetail>)[slug] ?? null);
