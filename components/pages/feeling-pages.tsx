import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kandTitle, unitPath, type Lang } from "@/lib/content";
import { feelings, feelingPath, feelingVerses } from "@/lib/feelings";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { VerseBlock } from "@/components/reader";
import { AppCard } from "@/components/app-card";
import { Article } from "@/components/article";

export function feelingMetadata(lang: Lang, id: string): Metadata {
  const f = feelings.find((x) => x.id === id);
  if (!f) return {};
  const title = lang === "hi" ? `${f.hi} के लिए रामायण की चौपाइयाँ, अर्थ सहित` : `Ramayan verses for ${f.en.toLowerCase()}, with meaning`;
  const description = lang === "hi" ? `रामचरितमानस के वे दोहे और चौपाइयाँ जो ${f.hi} देते हैं, हिंदी अर्थ सहित।` : `Dohas and chaupais of the Ramcharitmanas on ${f.en.toLowerCase()}, each with its meaning and its place in the text.`;
  const en = feelingPath("en", id), hi = feelingPath("hi", id);
  return { title, description, alternates: { canonical: lang === "hi" ? hi : en, languages: { en, hi, "x-default": en } }, openGraph: { title, description, siteName: site.name, locale: lang === "hi" ? "hi_IN" : "en_IN", images: [{ url: `/images/deity/${f.art}-og.jpg`, width: 1200, height: 630 }] } };
}
export async function FeelingPage({ lang, id }: { lang: Lang; id: string }) {
  const f = feelings.find((x) => x.id === id);
  if (!f) notFound();
  const items = feelingVerses(id);
  const intro = lang === "en" ? await Article.section("feeling-intros", f.en) : null;
  const crumbs = [{ name: lang === "hi" ? "मुखपृष्ठ" : "Home", url: lang === "hi" ? "/hi" : "/" }, { name: f[lang], url: feelingPath(lang, id) }];
  return (
    <article lang={lang} className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "ItemList", name: f[lang], itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}${unitPath(lang, x.kand.slug, x.unit.slug)}#${x.verse.id}` })) }] }} />
      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl"><Image src={`/images/deity/${f.art}.webp`} alt="" fill priority sizes="6rem" className="object-cover object-top" /></div>
        <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.25rem]">{f[lang]}</h1>
      </div>
      {intro && <div className="prose-ram mt-8" dangerouslySetInnerHTML={{ __html: intro }} />}
      <div className="mt-10 space-y-10">
        {items.map((x) => (
          <section key={x.verse.id}>
            <VerseBlock verse={x.verse} lang={lang} />
            <p className={`${lang === "hi" ? "meaning-hi" : "meaning-en"} mt-3 whitespace-pre-line`}>{lang === "hi" ? x.verse.hi : x.english}</p>
            <Link href={`${unitPath(lang, x.kand.slug, x.unit.slug)}#${x.verse.id}`} className="tap text-[0.9375rem] text-accent">{kandTitle(x.kand, lang)}, {lang === "hi" ? x.unit.label_hi : x.unit.label_en}</Link>
          </section>
        ))}
      </div>
      <nav aria-label={lang === "hi" ? "अन्य भाव" : "Other feelings"} className="mt-10 flex flex-wrap gap-2">
        {feelings.filter((o) => o.id !== id).map((o) => (<Link key={o.id} href={feelingPath(lang, o.id)} className="press flex h-12 items-center rounded-full border border-border bg-surface px-5 hover:border-accent/40">{o[lang]}</Link>))}
      </nav>
      <AppCard place={`feeling-${id}`} compact className="mt-10" />
    </article>
  );
}
