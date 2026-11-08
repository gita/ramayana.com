import list from "@/content/songs/index.json";
import { verseById, englishForVerse, type Lang } from "@/lib/content";

/** A song page. Lines are either Ramcharitmanas verses (by id), Valmiki text copied verbatim
 *  from content/valmiki, or traditional public-domain lines. Copyrighted lyrics are never stored. */
export type SongLine = { ref?: string; text?: string; source?: string; roman: string[]; sung?: string; sung_hi?: string; meaning_en?: string; meaning_hi?: string };
export type Song = {
  slug: string; title: string; title_hi: string; kind: "full" | "explainer" | "hymn";
  from_en: string; from_hi: string; credits: string; video?: string; channel?: string;
  lines: SongLine[];
  intro_en: string; intro_hi: string; about_en: string; about_hi: string;
  scene_en: string; scene_hi: string; teaching_en: string; teaching_hi: string;
  faq: { q_en: string; a_en: string; q_hi: string; a_hi: string }[];
  spellings: string[];
};
export const songs = list as unknown as Song[];
export const songPath = (lang: Lang, slug: string) => `${lang === "hi" ? "/hi" : ""}/songs/${slug}`;
export function song(slug: string) {
  const s = songs.find((x) => x.slug === slug);
  if (!s) return null;
  const lines = s.lines.map((l) => {
    if (!l.ref) return { ...l, verse: null as null | { text: string; hi: string; en: string | null; path: string; label_en: string; label_hi: string } };
    const r = verseById(l.ref);
    if (!r) return { ...l, verse: null };
    return { ...l, verse: { text: r.verse.text, hi: r.verse.hi, en: englishForVerse(r.verse, r.en), path: `/ramcharitmanas/${r.kand.slug}/${r.unit.slug}#${r.verse.id}`, label_en: `${r.kand.title_en}, ${r.unit.label_en}`, label_hi: `${r.kand.title_hi}, ${r.unit.label_hi}` } };
  });
  return { ...s, lines };
}
