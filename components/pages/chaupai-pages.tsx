import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chaupai, chaupaiDetail, chaupaiPath, chaupais } from "@/lib/chaupai";
import { stutis, stutiPath } from "@/lib/stuti";
import { englishForVerse, kandTitle, unitPath, type Lang } from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, bookNode, breadcrumb } from "@/components/json-ld";
import { AppCard } from "@/components/app-card";
import { SourceLine } from "@/components/reader";

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
    title: (s: string) => `${s}: lyrics, meaning and story`,
    desc: (s: string, k: string) =>
      `${s} lyrics in Hindi and English with word-by-word meaning, the scene in the ${k} of the Ramcharitmanas, and what it teaches.`,
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
      `${s}: श्रीरामचरितमानस के ${k} से, अर्थ, शब्दार्थ, प्रसंग और भावार्थ सहित।`,
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
    <div lang={lang} className="wrap pt-10">
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
              <span className="font-serif text-[1.25rem] font-semibold leading-snug">
                {lang === "hi" ? c.title_hi : c.title}
              </span>
              <span lang="awa" className="verse mt-2 text-[1.0625rem] text-muted">
                {c.verse.text
                  .split("\n")
                  .find((l) => l.includes(c.title_hi.split(" ")[0])) ??
                  c.verse.text.split("\n")[0]}
              </span>
              <span className="mt-3 text-[0.8125rem] text-faint">
                {lang === "hi" ? c.theme_hi : c.theme} · {kandTitle(c.kand, lang)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="t-sub mt-16">{lang === "hi" ? "तुलसीदासजी की स्तुतियाँ" : "Stutis of Goswami Tulsidas"}</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {stutis.map((x) => (
          <li key={x.slug}>
            <Link href={stutiPath(lang, x.slug)} className="press flex h-full flex-col rounded-3xl border border-border bg-surface px-6 py-5 hover:border-accent/40">
              <span className="font-serif text-[1.25rem] font-semibold leading-snug">{lang === "hi" ? x.title_hi : x.title}</span>
              <span className="mt-2 text-[0.9375rem] text-muted">{lang === "hi" ? "सम्पूर्ण पाठ, अर्थ सहित" : "Full lyrics with meaning"}</span>
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
    openGraph: { siteName: "Ramayana.com", 
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
  const d = chaupaiDetail(slug);
  const hi = lang === "hi";
  const s = t[lang];
  const name = hi ? c.title_hi : c.title;
  const kt = kandTitle(c.kand, lang);
  const ul = hi ? c.unit.label_hi : c.unit.label_en;
  const here = chaupaiPath(lang, slug);
  const crumbs = [
    { name: s.home, url: hi ? "/hi" : "/" },
    { name: s.crumb, url: hi ? "/hi/chaupai" : "/chaupai" },
    { name, url: here },
  ];
  const i = chaupais.findIndex((x) => x.slug === slug);
  const prev = chaupais[(i + chaupais.length - 1) % chaupais.length],
    next = chaupais[(i + 1) % chaupais.length];
  const english = c.en ? englishForVerse(c.verse, c.en) : null;
  const faq = d?.faq.map((f) => ({ q: hi ? f.q_hi : f.q_en, a: hi ? f.a_hi : f.a_en })) ?? [];
  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="t-sub mt-14 mb-4">{children}</h2>
  );
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
              creator: { "@type": "Person", name: "Goswami Tulsidas", url: `${site.url}/tulsidas` },
              isAccessibleForFree: true,
              url: `${site.url}${here}`,
            },
            ...(faq.length
              ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
              : []),
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.slice(0, -1).map((x, j) => (
            <li key={x.url} className="flex items-center gap-1.5">
              {j > 0 && <span aria-hidden>›</span>}
              <Link href={x.url} className="hover:text-foreground">{x.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <header className="mt-5">
        <h1 className="t-title">{name}</h1>
        <p className="mt-3 text-[0.9375rem] text-muted">
          {hi ? "श्रीरामचरितमानस" : "Ramcharitmanas"} · {kt} · {ul}
        </p>
      </header>

      <section className="mt-8 rounded-3xl bg-surface px-5 py-6 ring-1 ring-border/70 sm:px-8 sm:py-8">
        <p lang="awa" className="verse verse-lg whitespace-pre-line">{c.verse.text}</p>
        {d && (
          <p lang="en" className="mt-4 border-t border-border/70 pt-4 font-serif text-[1.0625rem] italic leading-relaxed text-muted">
            {d.roman.map((l, k) => (<span key={k} className="block">{l}</span>))}
          </p>
        )}
      </section>

      <H2>{hi ? "अर्थ" : "Meaning"}</H2>
      {hi ? (
        <>
          <p lang="hi" className="meaning-hi whitespace-pre-line">{c.verse.hi}</p>
          {english && (
            <details className="mt-4 text-muted">
              <summary className="tap cursor-pointer text-[0.9375rem] text-accent">English meaning</summary>
              <p lang="en" className="meaning-en mt-2 whitespace-pre-line">{english}</p>
            </details>
          )}
        </>
      ) : (
        <>
          {english && <p lang="en" className="meaning-en whitespace-pre-line">{english}</p>}
          <p lang="hi" className="meaning-hi mt-4 whitespace-pre-line text-muted">{c.verse.hi}</p>
        </>
      )}

      {d && d.words.length > 0 && (
        <>
          <H2>{hi ? "शब्दार्थ" : "Word by word"}</H2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {d.words.map((w) => (
              <div key={w.w}>
                <dt><span lang="awa" className="font-verse text-[1.25rem] text-scripture">{w.w}</span> <span className="text-[0.8125rem] text-faint">{w.r}</span></dt>
                <dd className="mt-0.5 text-[0.9375rem] leading-snug">{hi ? w.hi : w.en}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {d && (
        <>
          <H2>{hi ? "प्रसंग" : "The scene"}</H2>
          <p className={hi ? "meaning-hi" : "meaning-en"}>{hi ? d.scene_hi : d.scene_en}</p>
          <H2>{hi ? "यह चौपाई क्या सिखाती है" : "What it teaches"}</H2>
          <div className={`${hi ? "meaning-hi" : "meaning-en"} space-y-4`}>
            {(hi ? d.teaching_hi : d.teaching_en).split(/\n\s*\n/).map((para, k) => (<p key={k}>{para}</p>))}
          </div>
        </>
      )}

      <H2>{hi ? `पूरा प्रसंग: ${kt}, ${ul}` : `The full passage: ${kt}, ${ul}`}</H2>
      <div className="space-y-3">
        {c.unit.verses.map((v) => (
          <p
            key={v.id}
            lang="awa"
            className={`verse whitespace-pre-line rounded-2xl px-4 py-3 ${v.id === c.verse.id ? "bg-accent/8 ring-1 ring-accent/25" : ""}`}
          >
            {v.text}
          </p>
        ))}
      </div>
      <Link
        href={`${unitPath(lang, c.kand.slug, c.unit.slug)}#${c.verse.id}`}
        className="press mt-6 inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
      >
        {hi ? "हर पंक्ति का अर्थ पढ़ें" : "Read every line with meaning"}
      </Link>

      {faq.length > 0 && (
        <>
          <H2>{hi ? "अक्सर पूछे जाने वाले प्रश्न" : "Questions people ask"}</H2>
          <div className="divide-y divide-border/70 border-y border-border/70">
            {faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="tap flex w-full cursor-pointer list-none items-start gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{f.q}</span><span aria-hidden className="shrink-0 text-[1.25rem] leading-none text-faint transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className={`mt-2 ${hi ? "meaning-hi" : "meaning-en"} text-[1rem]`}>{f.a}</p>
              </details>
            ))}
          </div>
        </>
      )}

      {d && d.spellings.length > 0 && (
        <p className="mt-8 text-[0.8125rem] text-faint">
          {hi ? "इसे ऐसे भी लिखा जाता है: " : "Also written as: "}{d.spellings.join(" · ")}
        </p>
      )}

      <nav aria-label="More chaupais" className="mt-12 grid grid-cols-2 gap-2 text-[0.9375rem]">
        <Link href={chaupaiPath(lang, prev.slug)} className="press rounded-2xl border border-border bg-surface px-4 py-3 hover:border-accent/40">
          <span className="block text-[0.75rem] text-faint">← {hi ? "पिछली" : "Previous"}</span>
          <span className="font-medium">{hi ? prev.title_hi : prev.title}</span>
        </Link>
        <Link href={chaupaiPath(lang, next.slug)} className="press rounded-2xl border border-border bg-surface px-4 py-3 text-right hover:border-accent/40">
          <span className="block text-[0.75rem] text-faint">{hi ? "अगली" : "Next"} →</span>
          <span className="font-medium">{hi ? next.title_hi : next.title}</span>
        </Link>
      </nav>
      <AppCard place="reader" compact className="mt-10" />
      <SourceLine lang={lang} />
    </article>
  );
}
