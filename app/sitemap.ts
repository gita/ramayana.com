import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { index, kand, kandPath, unitPath } from "@/lib/content";
import { chaupais, chaupaiPath } from "@/lib/chaupai";
import { articles } from "@/lib/articles";
import { released } from "@/lib/release";

const now = new Date("2026-10-30");
const url = (p: string) => `${site.url}${p}`;
const pair = (en: string, hi: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"): MetadataRoute.Sitemap => [
  { url: url(en), lastModified: now, changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
  { url: url(hi), lastModified: now, changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
];

/** Only released sections are listed. Release cadence lives in lib/release.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    ...pair("/sunderkand", "/hi/sunderkand", 0.95, "weekly"),
    ...pair("/ramcharitmanas", "/hi/ramcharitmanas", 0.9, "weekly"),
    ...pair("/chaupai", "/hi/chaupai", 0.8),
    ...articles.filter((a) => !a.noindex).map((a) => ({ url: url(`/${a.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: a.slug === "ramayana-movie" ? 0.9 : 0.7 })),
    { url: url("/valmiki-ramayana"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/app"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/acknowledgements"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...chaupais.flatMap((c) => pair(chaupaiPath("en", c.slug), chaupaiPath("hi", c.slug), 0.7)),
  ];
  for (const k of index().kands) {
    if (!released.kands.includes(k.slug)) continue;
    out.push(...pair(kandPath("en", k.slug), kandPath("hi", k.slug), 0.85, "weekly"));
    if (!released.units.includes(k.slug)) continue;
    for (const u of kand(k.slug)!.units) out.push(...pair(unitPath("en", k.slug, u.slug), unitPath("hi", k.slug, u.slug), 0.6));
  }
  return out;
}
