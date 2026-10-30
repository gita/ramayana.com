import data from "@/content/feelings.json";
import { englishForVerse, verseById, type Lang } from "@/lib/content";

export const feelings = [
  { id: "courage", en: "Courage", hi: "साहस", art: "hanuman-mountain" },
  { id: "devotion", en: "Devotion", hi: "भक्ति", art: "hanuman-heart-darshan" },
  { id: "dharma", en: "Dharma", hi: "धर्म", art: "ram-kodanda" },
  { id: "peace", en: "Peace", hi: "शांति", art: "sita-mata" },
  { id: "love", en: "Love", hi: "प्रेम", art: "bharat-milap" },
  { id: "surrender", en: "Surrender", hi: "शरणागति", art: "kevat-charan" },
] as const;
export const feelingPath = (lang: Lang, id: string) => `${lang === "hi" ? "/hi" : ""}/feelings/${id}`;
export const feelingVerses = (id: string, limit = 12) =>
  ((data as Record<string, string[]>)[id] ?? []).slice(0, limit).map((vid) => {
    const r = verseById(vid);
    return r ? { ...r, english: englishForVerse(r.verse, r.en) } : null;
  }).filter((x) => x !== null);
