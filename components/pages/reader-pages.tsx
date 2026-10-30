import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  index,
  kand,
  kandPath,
  kandTitle,
  unit,
  unitPath,
  type Lang,
  type Unit,
} from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, bookNode, breadcrumb } from "@/components/json-ld";
import { SourceLine, UnitBody, UnitNav } from "@/components/reader";
import { Article } from "@/components/article";
import { isReleased, HOLD } from "@/lib/release";
import { AppCard } from "@/components/app-card";
import { KandProgress, TrackRead } from "@/components/progress";

const t = {
  en: {
    rcm: "Ramcharitmanas",
    home: "Home",
    dohas: "dohas",
    verses: "verses",
    sections: "In this kand",
    start: "Start reading",
    contents: "Contents",
    kands: "The seven kands",
    read_hi: "हिंदी में पढ़ें",
    read_en: "Read in English",
    unitTitle: (k: string, u: string) =>
      `${k} ${u} with Hindi and English meaning`,
    kandTitle: (k: string) => `${k}: complete, with Hindi and English meaning`,
    by: "by Goswami Tulsidas",
    free: "Free. No ads. Gita Press editions, credited on every page.",
  },
  hi: {
    rcm: "रामचरितमानस",
    home: "मुखपृष्ठ",
    dohas: "दोहे",
    verses: "पद",
    sections: "इस काण्ड में",
    start: "पढ़ना शुरू करें",
    contents: "विषय-सूची",
    kands: "सातों काण्ड",
    read_hi: "हिंदी में पढ़ें",
    read_en: "Read in English",
    unitTitle: (k: string, u: string) => `${k} ${u} अर्थ सहित`,
    kandTitle: (k: string) => `${k}: सम्पूर्ण, हिंदी अर्थ सहित`,
    by: "गोस्वामी तुलसीदास कृत",
    free: "निःशुल्क। विज्ञापन नहीं। गीताप्रेस संस्करण, हर पृष्ठ पर उल्लेख सहित।",
  },
};

const alt = (en: string, hi: string) => ({
  languages: { en: en, hi: hi, "x-default": en },
});
const sectionTitle = (s: { en: string; hi: string }, lang: Lang) =>
  lang === "hi" ? s.hi : s.en || s.hi;
const firstLine = (u: Unit) => u.verses[0]?.text.split("\n")[0] ?? "";

/* ---------- Unit page ---------- */
export function unitMetadata(
  lang: Lang,
  kandSlug: string,
  unitSlug: string,
): Metadata {
  const r = unit(kandSlug, unitSlug);
  if (!r) return {};
  const k = kandTitle(r.kand, lang);
  const u = lang === "hi" ? r.unit.label_hi : r.unit.label_en;
  const title = t[lang].unitTitle(k, u);
  const robots = isReleased("rcm", kandSlug, r.kand.units.indexOf(r.unit) + 1) ? undefined : HOLD;
  const desc = `${firstLine(r.unit)} ${lang === "hi" ? "गीताप्रेस की हिंदी टीका के साथ, निःशुल्क।" : "Read online with the Gita Press Hindi tika and English translation. Free, no ads."}`;
  const en = unitPath("en", kandSlug, unitSlug),
    hi = unitPath("hi", kandSlug, unitSlug);
  return {
    title,
    robots,
    description: desc,
    alternates: { canonical: lang === "hi" ? hi : en, ...alt(en, hi), types: { "text/markdown": `${lang === "hi" ? hi : en}.md` } },
    openGraph: { siteName: "Ramayana.com", 
      title,
      description: desc,
      images: [
        { url: `/images/kand/${kandSlug}-og.jpg`, width: 1200, height: 630 },
      ],
    },
  };
}

export function UnitPage({
  lang,
  kandSlug,
  unitSlug,
}: {
  lang: Lang;
  kandSlug: string;
  unitSlug: string;
}) {
  const r = unit(kandSlug, unitSlug);
  if (!r) notFound();
  const { kand: k, unit: u, prev, next } = r;
  const s = t[lang];
  const kt = kandTitle(k, lang);
  const ul = lang === "hi" ? u.label_hi : u.label_en;
  const label = (x: { kand: typeof k; unit: Unit }) =>
    x.kand.slug === k.slug
      ? lang === "hi"
        ? x.unit.label_hi
        : x.unit.label_en
      : `${kandTitle(x.kand, lang)} · ${lang === "hi" ? x.unit.label_hi : x.unit.label_en}`;
  const crumbs = [
    { name: s.home, url: lang === "hi" ? "/hi" : "/" },
    {
      name: s.rcm,
      url: lang === "hi" ? "/hi/ramcharitmanas" : "/ramcharitmanas",
    },
    { name: kt, url: kandPath(lang, k.slug) },
    { name: ul, url: unitPath(lang, k.slug, u.slug) },
  ];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb(crumbs),
      {
        "@type": "Chapter",
        "@id": `${site.url}${unitPath(lang, k.slug, u.slug)}#chapter`,
        name: `${kt} ${ul}`,
        position: u.n,
        isPartOf: { "@type": "Chapter", name: kt, isPartOf: bookNode(lang) },
        inLanguage: lang === "hi" ? ["awa", "hi"] : ["awa", "en"],
        isAccessibleForFree: true,
        url: `${site.url}${unitPath(lang, k.slug, u.slug)}`,
        text: u.verses.map((v) => v.text).join("\n"),
        publisher: { "@id": site.foundation.id },
      },
    ],
  };
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 pt-6" lang={lang}>
      <JsonLd data={graph} />
      <TrackRead id={`rcm:${k.slug}:${u.slug}`} href={unitPath(lang, k.slug, u.slug)} label={`${kt}, ${ul}`} />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.slice(0, -1).map((c, i) => (
            <li key={c.url} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>›</span>}
              <Link href={c.url} className="hover:text-foreground">
                {c.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <header className="mt-5">
        <h1 className="mt-1 font-serif text-[2rem] sm:text-[2.5rem] font-semibold leading-[1.1] tracking-tight">
          {ul}
        </h1>
        {u.sections.length > 0 && (
          <p className="mt-3 text-[1.0625rem] leading-snug text-muted">
            {u.sections.map((x) => sectionTitle(x, lang)).join(" · ")}
          </p>
        )}
        </header>
      <div className="mt-10">
        <UnitBody unit={u} lang={lang} />
      </div>
      <UnitNav
        lang={lang}
        up={{ href: kandPath(lang, k.slug), label: kt }}
        prev={
          prev
            ? {
                href: unitPath(lang, prev.kand.slug, prev.unit.slug),
                label: label(prev),
              }
            : null
        }
        next={
          next
            ? {
                href: unitPath(lang, next.kand.slug, next.unit.slug),
                label: label(next),
              }
            : null
        }
      />
      <AppCard place="reader" compact className="mt-10" />
<SourceLine lang={lang} />
    </article>
  );
}

/* ---------- Kand page ---------- */
export function kandMetadata(lang: Lang, slug: string): Metadata {
  const k = kand(slug);
  if (!k) return {};
  const title = t[lang].kandTitle(kandTitle(k, lang));
  const desc =
    lang === "hi"
      ? `${k.title_hi} के सभी ${k.units.length - 1} दोहे और चौपाइयाँ, गीताप्रेस की हिंदी टीका के साथ। निःशुल्क, विज्ञापन रहित।`
      : `All ${k.units.length - 1} dohas of the ${k.title_en} of Tulsidas's Ramcharitmanas with the Gita Press Hindi tika and English translation. Free, no ads.`;
  return {
    title,
    description: desc,
    alternates: { canonical: kandPath(lang, slug), ...alt(kandPath("en", slug), kandPath("hi", slug)), types: { "text/markdown": `${kandPath(lang, slug)}.md` } },
    openGraph: { siteName: "Ramayana.com", 
      title,
      description: desc,
      images: [
        { url: `/images/kand/${slug}-og.jpg`, width: 1200, height: 630 },
      ],
    },
  };
}

export async function KandPage({ lang, slug }: { lang: Lang; slug: string }) {
  const k = kand(slug);
  if (!k) notFound();
  const s = t[lang];
  const kt = kandTitle(k, lang);
  const idx = index().kands;
  const me = idx.find((x) => x.slug === slug)!;
  const crumbs = [
    { name: s.home, url: lang === "hi" ? "/hi" : "/" },
    {
      name: s.rcm,
      url: lang === "hi" ? "/hi/ramcharitmanas" : "/ramcharitmanas",
    },
    { name: kt, url: kandPath(lang, slug) },
  ];
  const intro =
    lang === "en" ? await Article.section("kand-intros", k.title_en) : null;
  return (
    <div lang={lang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb(crumbs),
            {
              "@type": "Chapter",
              name: kt,
              position: k.number,
              isPartOf: bookNode(lang),
              url: `${site.url}${kandPath(lang, slug)}`,
              isAccessibleForFree: true,
              hasPart: k.units.map((u) => ({
                "@type": "Chapter",
                name: lang === "hi" ? u.label_hi : u.label_en,
                url: `${site.url}${unitPath(lang, slug, u.slug)}`,
              })),
            },
          ],
        }}
      />
      <div className="relative">
        <div className="art-fade relative aspect-[16/9] max-h-[52vh] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={`/images/kand/${slug}.webp`}
            alt=""
            fill
            preload fetchPriority="high" quality={60}
            sizes="100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="mx-auto -mt-4 max-w-3xl px-4 sm:px-6 sm:-mt-10 relative">
          <h1 className="mt-1 font-serif text-[2.5rem] sm:text-[3.25rem] font-semibold leading-[1.05] tracking-tight">
            {kt}
          </h1>
          <p className="mt-2 text-[1.0625rem] text-muted">
            {lang === "hi" ? k.title_iast : k.title_hi} · {me.dohas} {s.dohas} ·{" "}
            {me.verses} {s.verses}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={unitPath(lang, slug, k.units[0].slug)}
              className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
            >
              {s.start}
            </Link>
            
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {intro && (
          <div
            className="prose-ram mt-12"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        )}
        <section className="mt-12">
          <h2 className="t-title">
            {s.sections}
          </h2>
          <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
            {me.sections.map((x, i) => {
              const u = k.units.find((uu) => uu.slug === x.unit)!;
              return (
                <li key={`${x.unit}-${i}`}>
                  <Link
                    href={unitPath(lang, slug, x.unit)}
                    className="flex items-baseline gap-4 px-5 py-3.5 hover:bg-surface-2/70"
                  >
                    <span className="w-16 shrink-0 text-[0.8125rem] text-faint">
                      {lang === "hi" ? u.label_hi : u.label_en}
                    </span>
                    <span className="text-[1rem] leading-snug text-foreground">
                      {sectionTitle(x, lang)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="mt-12">
          <h2 className="t-title">
            {s.contents}
          </h2>
          <ol className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {k.units.map((u) => (
              <li key={u.slug}>
                <Link
                  href={unitPath(lang, slug, u.slug)}
                  data-unit={`rcm:${slug}:${u.slug}`}
                  className="press flex h-11 items-center justify-center rounded-xl border border-border bg-surface text-[0.9375rem] tabular-nums text-foreground hover:border-accent/50 hover:text-accent"
                  title={lang === "hi" ? u.label_hi : u.label_en}
                >
                  {u.n === 0 ? "ॐ" : u.slug.replace("doha-", "")}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-14">
          <h2 className="t-title">{s.kands}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {idx.map((x) => (
              <li key={x.slug}>
                <Link
                  href={kandPath(lang, x.slug)}
                  aria-current={x.slug === slug ? "page" : undefined}
                  className={`press block rounded-2xl border px-3 py-3 text-center text-[0.9375rem] ${x.slug === slug ? "border-accent bg-accent-soft text-accent-ink" : "border-border bg-surface text-foreground hover:border-accent/40"}`}
                >
                  <span className="block text-[0.75rem] text-faint">
                    {x.number}
                  </span>
                  {kandTitle(x, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <SourceLine lang={lang} />
      </div>
    </div>
  );
}

/* ---------- Hub ---------- */
export function hubMetadata(lang: Lang): Metadata {
  const title =
    lang === "hi"
      ? "श्रीरामचरितमानस ऑनलाइन पढ़ें: सम्पूर्ण, हिंदी अर्थ सहित"
      : "Read the Ramcharitmanas online: complete, with Hindi and English meaning";
  const desc =
    lang === "hi"
      ? "गोस्वामी तुलसीदास कृत सम्पूर्ण श्रीरामचरितमानस, सातों काण्ड, हर चौपाई और दोहा गीताप्रेस की हिंदी टीका के साथ। निःशुल्क, विज्ञापन रहित, वेदव्यास फ़ाउंडेशन की ओर से।"
      : "The complete Shri Ramcharitmanas of Goswami Tulsidas, all seven kands, every chaupai and doha with the Gita Press Hindi tika and English translation. Free, no ads, from Ved Vyas Foundation.";
  const en = "/ramcharitmanas",
    hi = "/hi/ramcharitmanas";
  return {
    title,
    description: desc,
    alternates: { canonical: lang === "hi" ? hi : en, ...alt(en, hi), types: { "text/markdown": `${lang === "hi" ? hi : en}.md` } },
    openGraph: { siteName: "Ramayana.com", 
      title,
      description: desc,
      images: [
        { url: "/images/hero/ram-darbar-og.jpg", width: 1200, height: 630 },
      ],
    },
  };
}

export async function HubPage({ lang }: { lang: Lang }) {
  const s = t[lang];
  const idx = index();
  const intro =
    lang === "en" ? await Article.html("ramcharitmanas-intro") : null;
  const crumbs = [
    { name: s.home, url: lang === "hi" ? "/hi" : "/" },
    {
      name: s.rcm,
      url: lang === "hi" ? "/hi/ramcharitmanas" : "/ramcharitmanas",
    },
  ];
  return (
    <div lang={lang} className="wrap pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumb(crumbs), bookNode(lang)],
        }}
      />
      <header className="max-w-3xl">
        <h1 className="mt-2 font-serif text-[2.5rem] sm:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
          {lang === "hi" ? "श्रीरामचरितमानस" : "Shri Ramcharitmanas"}
        </h1>
        <p className="mt-4 font-serif text-[1.1875rem] sm:text-[1.3125rem] leading-relaxed text-muted">
          {lang === "hi" ? "सातों काण्ड, हर चौपाई और दोहा अर्थ सहित।" : "All seven kands, every verse with its meaning."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={unitPath(lang, "bal-kand", "mangalacharan")}
            className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
          >
            {lang === "hi" ? "बालकाण्ड से शुरू करें" : "Start from Bal Kand"}
          </Link>
          <Link
            href={lang === "hi" ? "/hi/sunderkand" : "/sunderkand"}
            className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-[1rem] text-foreground hover:border-accent/40"
          >
            {lang === "hi" ? "सुन्दरकाण्ड पाठ" : "Sunderkand paath"}
          </Link>
          
        </div>
      </header>
      <section className="mt-14">
        <h2 className="t-title">{s.kands}</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {idx.kands.map((k) => (
            <li key={k.slug}>
              <Link
                href={kandPath(lang, k.slug)}
                className="press group block overflow-hidden rounded-3xl border border-border bg-surface hover:border-accent/40"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={`/images/kand/${k.slug}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-[0.75rem] text-faint">
                    {lang === "hi" ? `काण्ड ${k.number}` : `Kand ${k.number}`}
                  </p>
                  <h3 className="mt-0.5 font-serif text-[1.375rem] font-semibold leading-tight text-foreground">
                    {kandTitle(k, lang)}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">
                    {lang === "hi" ? k.title_iast : k.title_hi} · {k.dohas}{" "}
                    {s.dohas}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      {intro && (
        <div
          className="prose-ram mt-16"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}
      <div className="max-w-3xl">
        <SourceLine lang={lang} />
      </div>
    </div>
  );
}
