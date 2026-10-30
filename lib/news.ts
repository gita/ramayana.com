import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export type NewsItem = { slug: string; title: string; description: string; date: string; sources: { name: string; url: string }[]; body: string };
const DIR = join(process.cwd(), "content", "news");

/** Each story is content/news/<slug>.md with JSON front matter between --- lines. */
export function news(): NewsItem[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR).filter((f) => f.endsWith(".md")).map((f) => {
    const raw = readFileSync(join(DIR, f), "utf8");
    const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
    if (!m) throw new Error(`Bad front matter in ${f}`);
    return { slug: f.replace(/\.md$/, ""), ...JSON.parse(m[1]), body: m[2] } as NewsItem;
  }).sort((a, b) => b.date.localeCompare(a.date));
}
export const newsItem = (slug: string) => news().find((n) => n.slug === slug) ?? null;
