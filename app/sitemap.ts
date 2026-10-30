import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { index, kand, kandPath, unitPath } from "@/lib/content";
import { chaupais, chaupaiPath } from "@/lib/chaupai";
import { articles } from "@/lib/articles";
import { isReleased } from "@/lib/release";
import { entities } from "@/lib/entities";
import { news } from "@/lib/news";
import { vIndex, vHub, vKandPath, vSargaPath } from "@/lib/valmiki";
import { feelings, feelingPath } from "@/lib/feelings";

const now = new Date("2026-10-30");
const url = (p: string) => `${site.url}${p}`;
const pair = (en: string, hi: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"): MetadataRoute.Sitemap => [
  { url: url(en), lastModified: now, changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
  { url: url(hi), lastModified: now, changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
];

/** Only released sections are listed. Release cadence lives in lib/release.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    ...pair("/", "/hi", 1, "daily"),
    ...pair(vHub("en"), vHub("hi"), 0.9, "weekly"),
    ...feelings.flatMap((f) => pair(feelingPath("en", f.id), feelingPath("hi", f.id), 0.7)),
    ...pair("/sunderkand", "/hi/sunderkand", 0.95, "weekly"),
    ...pair("/ramcharitmanas", "/hi/ramcharitmanas", 0.9, "weekly"),
    ...pair("/chaupai", "/hi/chaupai", 0.8),
    ...articles.filter((a) => !a.noindex).map((a) => ({ url: url(`/${a.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: a.slug === "ramayana-movie" ? 0.9 : 0.7 })),
        { url: url("/app"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/acknowledgements"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...chaupais.flatMap((c) => pair(chaupaiPath("en", c.slug), chaupaiPath("hi", c.slug), 0.7)),
  ];
  for (const k of index().kands) {
    out.push(...pair(kandPath("en", k.slug), kandPath("hi", k.slug), 0.85, "weekly"));
    for (const [i, u] of kand(k.slug)!.units.entries()) if (isReleased("rcm", k.slug, i + 1)) out.push(...pair(unitPath("en", k.slug, u.slug), unitPath("hi", k.slug, u.slug), 0.6));
  }
  for (const k of vIndex().kands) {
    out.push(...pair(vKandPath("en", k.slug), vKandPath("hi", k.slug), 0.8, "weekly"));
    for (const [i, g] of k.sargas.en.entries()) if (isReleased("val", k.slug, i + 1)) out.push(...pair(vSargaPath("en", k.slug, g.n), vSargaPath("hi", k.slug, g.n), 0.6));
  }
  for (const k of ["characters", "places"] as const) {
    out.push({ url: url(`/${k}`), lastModified: now, changeFrequency: "monthly", priority: 0.8 });
    for (const e of entities(k)) out.push({ url: url(`/${k}/${e.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  const stories = news();
  if (stories.length) out.push({ url: url("/news"), lastModified: new Date(stories[0].date), changeFrequency: "hourly", priority: 0.7 });
  for (const n of stories) out.push({ url: url(`/news/${n.slug}`), lastModified: new Date(n.date), changeFrequency: "weekly", priority: 0.6 });
  return out;
}
