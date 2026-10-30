import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chaupai, chaupaiPath, chaupais } from "@/lib/chaupai";
import { englishForVerse, kandTitle, unitPath, type Lang } from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, bookNode, breadcrumb } from "@/components/json-ld";
import { SourceLine, VerseBlock } from "@/components/reader";

const t = {
  en: {
    list: "Famous chaupais and dohas of the Ramcharitmanas, with meaning",
    listDesc:
      "The chaupais and dohas of Tulsidas that families know by heart, each with the Gita Press Hindi tika and English translation and a link to its place in the text.",
    crumb: "Chaupai",
    home: "Home",
    meaning_hi: "भावार्थ (Hindi)",
    meaning_en: "Meaning",
    inText: "Read it in context",
    from: "From",
    title: (s: string) => `${s}: lyrics and meaning`,
    desc: (s: string, k: string) =>
      `${s}, from the ${k} of Tulsidas's Ramcharitmanas, in Devanagari with the Gita Press Hindi tika and English translation.`,
  },
  hi: {
    list: "रामचरितमानस की प्रसिद्ध चौपाइयाँ और दोहे, अर्थ सहित",
    listDesc:
      "तुलसीदासजी की वे चौपाइयाँ और दोहे जो हर घर में गूँजते हैं, हर एक गीताप्रेस की हिंदी टीका और पाठ में उसके स्थान की कड़ी के साथ।",
    crumb: "चौपाई",
    home: "मुखपृष्ठ",
    meaning_hi: "भावार्थ",
    meaning_en: "Meaning (English)",
    inText: "पाठ में पढ़ें",
    from: "स्रोत",
    title: (s: string) => `${s}: चौपाई अर्थ सहित`,
    desc: (s: string, k: string) =>
      `${s}, श्रीरामचरितमानस के ${k} से, देवनागरी में गीताप्रेस की हिंदी टीका और अंग्रेज़ी अनुवाद के साथ।`,
  },
};

export function chaupaiListMetadata(lang: Lang): Metadata {
  const s = t[lang];
  return {
    title: s.list,
    description: s.listDesc,
    alternates: {
      canonical: lang === "hi" ? "/hi/chaupai" : "/chaupai",
      languages: { en: "/chaupai", hi: "/hi/chaupai", "x-default": "/chaupai" },
    },
  };
}
export function ChaupaiListPage({ lang }: { lang: Lang }) {
  const s = t[lang];
  const items = chaupais.map((c) => chaupai(c.slug)!);
  return (
    <div lang={lang} className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb([
              { name: s.home, url: lang === "hi" ? "/hi" : "/" },
              {
                name: s.crumb,
                url: lang === "hi" ? "/hi/chaupai" : "/chaupai",
              },
            ]),
            {
              "@type": "ItemList",
              name: s.list,
              itemListElement: items.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${site.url}${chaupaiPath(lang, c.slug)}`,
                name: lang === "hi" ? c.title_hi : c.title,
              })),
            },
          ],
        }}
      />
      <header className="max-w-3xl">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
          {lang === "hi" ? "श्रीरामचरितमानस" : "Shri Ramcharitmanas"}
        </p>
        <h1 className="mt-2 font-serif text-[2.25rem] sm:text-[3rem] font-semibold leading-[1.08] tracking-tight">
          {lang === "hi"
            ? "प्रसिद्ध चौपाइयाँ और दोहे"
            : "Famous chaupais and dohas"}
        </h1>
        <p className="mt-4 font-serif text-[1.1875rem] leading-relaxed text-muted">
          {s.listDesc}
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={chaupaiPath(lang, c.slug)}
              className="press flex h-full flex-col rounded-3xl border border-border bg-surface px-6 py-5 hover:border-accent/40"
            >
              <span className="text-[0.75rem] uppercase tracking-[0.08em] text-faint">
                {lang === "hi" ? c.theme_hi : c.theme} ·{" "}
                {kandTitle(c.kand, lang)}
              </span>
              <span lang="awa" className="verse mt-2 text-[1.25rem]">
                {c.verse.text
                  .split("\n")
                  .find((l) => l.includes(c.title_hi.split(" ")[0])) ??
                  c.verse.text.split("\n")[0]}
              </span>
              <span className="mt-3 text-[0.9375rem] text-accent">
                {lang === "hi" ? "अर्थ पढ़ें →" : "Read the meaning →"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function chaupaiMetadata(lang: Lang, slug: string): Metadata {
  const c = chaupai(slug);
  if (!c) return {};
  const s = t[lang];
  const name = lang === "hi" ? c.title_hi : c.title;
  const title = s.title(name);
  const description = s.desc(name, kandTitle(c.kand, lang));
  return {
    title,
    description,
    alternates: { canonical: chaupaiPath(lang, slug), languages: {
        en: chaupaiPath("en", slug),
        hi: chaupaiPath("hi", slug),
        "x-default": chaupaiPath("en", slug),
      }, types: { "text/markdown": `${chaupaiPath(lang, slug)}.md` } },
    openGraph: {
      title,
      description,
      images: [
        { url: `/images/kand/${c.kand.slug}-og.jpg`, width: 1200, height: 630 },
      ],
    },
  };
}

export function ChaupaiPage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = chaupai(slug);
  if (!c) notFound();
  const s = t[lang];
  const name = lang === "hi" ? c.title_hi : c.title;
  const kt = kandTitle(c.kand, lang);
  const ul = lang === "hi" ? c.unit.label_hi : c.unit.label_en;
  const here = chaupaiPath(lang, slug);
  const crumbs = [
    { name: s.home, url: lang === "hi" ? "/hi" : "/" },
    { name: s.crumb, url: lang === "hi" ? "/hi/chaupai" : "/chaupai" },
    { name, url: here },
  ];
  const i = chaupais.findIndex((x) => x.slug === slug);
  const prev = chaupais[(i + chaupais.length - 1) % chaupais.length],
    next = chaupais[(i + 1) % chaupais.length];
  return (
    <article lang={lang} className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 pt-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb(crumbs),
            {
              "@type": "Quotation",
              "@id": `${site.url}${here}#quotation`,
              name,
              text: c.verse.text,
              inLanguage: "awa",
              isPartOf: {
                "@type": "Chapter",
                name: `${kt} ${ul}`,
                url: `${site.url}${unitPath(lang, c.kand.slug, c.unit.slug)}`,
                isPartOf: bookNode(lang),
              },
              creator: {
                "@type": "Person",
                name: "Goswami Tulsidas",
                url: `${site.url}/tulsidas`,
              },
              isAccessibleForFree: true,
              url: `${site.url}${here}`,
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap gap-1.5">
          {crumbs.slice(0, -1).map((x, j) => (
            <li key={x.url} className="flex gap-1.5">
              {j > 0 && <span aria-hidden>›</span>}
              <Link href={x.url} className="hover:text-foreground">
                {x.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <header className="mt-5">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
          {lang === "hi" ? c.theme_hi : c.theme} · {kt} · {ul}
        </p>
        <h1 className="mt-1 font-serif text-[2rem] sm:text-[2.5rem] font-semibold leading-[1.1] tracking-tight">
          {name}
        </h1>
      </header>
      <div className="mt-8">
        <VerseBlock verse={c.verse} lang={lang} size="lg" />
      </div>
      <section className="mt-8 rounded-2xl bg-surface px-5 py-4 ring-1 ring-border/70">
        <h2
          className="mb-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-gold"
          lang="hi"
        >
          {s.meaning_hi}
        </h2>
        <p lang="hi" className="meaning-hi whitespace-pre-line">
          {c.verse.hi}
        </p>
      </section>
      {c.en && (
        <section className="mt-4 rounded-2xl bg-surface px-5 py-4 ring-1 ring-border/70">
          <h2
            className="mb-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-gold"
            lang="en"
          >
            {s.meaning_en}
          </h2>
          <p lang="en" className="meaning-en whitespace-pre-line">
            {englishForVerse(c.verse, c.en)}
          </p>
          
        </section>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`${unitPath(lang, c.kand.slug, c.unit.slug)}#${c.verse.id}`}
          className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
        >
          {s.inText}: {kt} {ul}
        </Link>
        <Link
          href={chaupaiPath(lang === "hi" ? "en" : "hi", slug)}
          lang={lang === "hi" ? "en" : "hi"}
          className="inline-flex h-12 items-center px-2 text-[1rem] text-accent hover:text-accent-ink"
        >
          {lang === "hi" ? "Read in English" : "हिंदी में पढ़ें"}
        </Link>
      </div>
      <nav
        aria-label="More chaupais"
        className="mt-10 grid grid-cols-2 gap-2 text-[0.9375rem]"
      >
        <Link
          href={chaupaiPath(lang, prev.slug)}
          className="press rounded-2xl border border-border bg-surface px-4 py-3 hover:border-accent/40"
        >
          <span className="block text-[0.75rem] uppercase tracking-[0.06em] text-faint">
            ← {lang === "hi" ? "पिछली" : "Previous"}
          </span>
          <span className="font-medium">
            {lang === "hi" ? prev.title_hi : prev.title}
          </span>
        </Link>
        <Link
          href={chaupaiPath(lang, next.slug)}
          className="press rounded-2xl border border-border bg-surface px-4 py-3 text-right hover:border-accent/40"
        >
          <span className="block text-[0.75rem] uppercase tracking-[0.06em] text-faint">
            {lang === "hi" ? "अगली" : "Next"} →
          </span>
          <span className="font-medium">
            {lang === "hi" ? next.title_hi : next.title}
          </span>
        </Link>
      </nav>
      <SourceLine lang={lang} />
    </article>
  );
}
