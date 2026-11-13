import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { index, kand, kandPath, unitPath } from "@/lib/content";
import { chaupais, chaupaiPath } from "@/lib/chaupai";
import { stutis, stutiPath } from "@/lib/stuti";
import { songs, songPath } from "@/lib/songs";
import { articles } from "@/lib/articles";
import { isReleased, releasedOn } from "@/lib/release";
import { entities } from "@/lib/entities";
import { news } from "@/lib/news";
import { vIndex, vHub, vKandPath, vSargaPath } from "@/lib/valmiki";
import { feelings, feelingPath } from "@/lib/feelings";

const now = new Date("2026-10-30");
const url = (p: string) => `${site.url}${p}`;
/** Last real change per path. Update when a page's content changes so crawlers come back. */
const CHANGED: [RegExp, string][] = [
  [/^\/(hi\/)?(chaupai|stuti|songs)(\/|$)/, "2026-11-08"],
  [/^\/did-ravan-love-sita$/, "2026-11-09"],
  [/^\/(was-sita-a-warrior|surpanakha)$/, "2026-11-11"],
  [/^\/(when-was-ramcharitmanas-written|ramayana-vs-ramcharitmanas)$/, "2026-11-12"],
  [/^\/(how-does-the-ramayana-end|was-sita-a-warrior)$/, "2026-11-13"],
  [/^\/(why-did-ravan-kidnap-sita|was-ravan-at-sita-swayamvar|surpanakha|lakshman-avatar|ravan-boon|ramayana-movie)$/, "2026-11-08"],
  [/^\/(hi\/)?sunderkand$/, "2026-11-08"],
  [/^\/(characters|places)(\/|$)/, "2026-11-08"],
  [/^\/(hi)?$/, "2026-11-08"],
];
const mod = (p: string, d?: string) => new Date(d ?? CHANGED.find(([r]) => r.test(p))?.[1] ?? "2026-10-30");
const pair = (en: string, hi: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", date?: string): MetadataRoute.Sitemap => [
  { url: url(en), lastModified: mod(en, date), changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
  { url: url(hi), lastModified: mod(hi, date), changeFrequency, priority, alternates: { languages: { en: url(en), hi: url(hi) } } },
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
    ...articles.filter((a) => !a.noindex).map((a) => ({ url: url(`/${a.slug}`), lastModified: mod(`/${a.slug}`), changeFrequency: "monthly" as const, priority: a.slug === "ramayana-movie" ? 0.9 : 0.7 })),
        { url: url("/app"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/acknowledgements"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...chaupais.flatMap((c) => pair(chaupaiPath("en", c.slug), chaupaiPath("hi", c.slug), 0.7)),
    ...stutis.flatMap((s) => pair(stutiPath("en", s.slug), stutiPath("hi", s.slug), 0.8)),
    ...(songs.length ? pair("/songs", "/hi/songs", 0.8) : []),
    ...songs.flatMap((s) => pair(songPath("en", s.slug), songPath("hi", s.slug), 0.8)),
  ];
  for (const k of index().kands) {
    out.push(...pair(kandPath("en", k.slug), kandPath("hi", k.slug), 0.85, "weekly"));
    for (const [i, u] of kand(k.slug)!.units.entries()) if (isReleased("rcm", k.slug, i + 1)) out.push(...pair(unitPath("en", k.slug, u.slug), unitPath("hi", k.slug, u.slug), 0.6, "monthly", releasedOn("rcm", k.slug, i + 1)));
  }
  for (const k of vIndex().kands) {
    out.push(...pair(vKandPath("en", k.slug), vKandPath("hi", k.slug), 0.8, "weekly"));
    for (const [i, g] of k.sargas.en.entries()) if (isReleased("val", k.slug, i + 1)) out.push(...pair(vSargaPath("en", k.slug, g.n), vSargaPath("hi", k.slug, g.n), 0.6, "monthly", releasedOn("val", k.slug, i + 1)));
  }
  for (const k of ["characters", "places"] as const) {
    out.push({ url: url(`/${k}`), lastModified: mod(`/${k}`), changeFrequency: "monthly", priority: 0.8 });
    for (const e of entities(k)) out.push({ url: url(`/${k}/${e.slug}`), lastModified: mod(`/${k}/${e.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  const stories = news();
  if (stories.length) out.push({ url: url("/news"), lastModified: new Date(stories[0].date), changeFrequency: "hourly", priority: 0.7 });
  for (const n of stories) out.push({ url: url(`/news/${n.slug}`), lastModified: new Date(n.date), changeFrequency: "weekly", priority: 0.6 });
  return out;
}
