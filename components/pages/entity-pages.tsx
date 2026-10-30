import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { kandPath, unitPath } from "@/lib/content";
import { artSrc, entities, entity, entityVerses, type Kind } from "@/lib/entities";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb, orgNode } from "@/components/json-ld";
import { LongPage } from "@/components/long-page";
import { VerseBlock } from "@/components/reader";
import { AppCard } from "@/components/app-card";

const hub = {
  characters: { title: "Characters of the Ramayana", short: "Characters", lede: "The people of the Ramayana, their stories and their verses.", desc: "Who is who in the Ramayana: Shri Ram, Mata Sita, Lakshman, Hanumanji, Ravan, Urmila, Jatayu, Shabari and more, with their stories and verses." },
  places: { title: "Holy places of the Ramayana", short: "Places", lede: "Where the story happens, from Ayodhya to Lanka.", desc: "The holy places of the Ramayana: Ayodhya, Chitrakoot, Panchavati, Kishkindha, Rameshwaram, Lanka and more, with what happened there and the verses." },
};
const ogFor = (e: { art: string }) => `${artSrc(e.art)}-og.jpg`;

export function hubMetadata(kind: Kind): Metadata {
  const h = hub[kind];
  return { title: h.title, description: h.desc, alternates: { canonical: `/${kind}`, types: { "text/markdown": `/${kind}.md` } }, openGraph: { siteName: site.name, title: h.title, description: h.desc, images: [{ url: "/images/hero/ram-darbar-og.jpg", width: 1200, height: 630 }] } };
}
export function EntityHub({ kind }: { kind: Kind }) {
  const h = hub[kind], list = entities(kind);
  const crumbs = [{ name: "Home", url: "/" }, { name: h.short, url: `/${kind}` }];
  return (
    <div className="wrap pt-10">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "ItemList", name: h.title, itemListElement: list.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: `${site.url}/${kind}/${e.slug}` })) }] }} />
      <h1 className="t-display">{h.title}</h1>
      <p className="t-lede mt-4 max-w-2xl">{h.lede}</p>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((e, i) => (
          <li key={e.slug}>
            <Link href={`/${kind}/${e.slug}`} className="press group block">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-3xl"><Image src={`${artSrc(e.art)}.webp`} alt="" fill preload={i < 2} sizes="(min-width: 1024px) 270px, 50vw" className="object-cover object-top" /></span>
              <span className="mt-2.5 block font-serif text-[1.1875rem] font-semibold leading-tight group-hover:text-accent">{e.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function entityMetadata(kind: Kind, slug: string): Metadata {
  const e = entity(kind, slug);
  if (!e) return {};
  return { title: { absolute: `${e.title} · ${site.name}` }, description: e.description, alternates: { canonical: `/${kind}/${slug}`, types: { "text/markdown": `/${kind}/${slug}.md` } }, openGraph: { type: "article", siteName: site.name, title: e.title, description: e.description, images: [{ url: ogFor(e), width: 1200, height: 630 }] } };
}
export function EntityPage({ kind, slug }: { kind: Kind; slug: string }) {
  const e = entity(kind, slug);
  if (!e) notFound();
  const h = hub[kind], vs = entityVerses(e), url = `${site.url}/${kind}/${slug}`;
  const crumbs = [{ name: "Home", url: "/" }, { name: h.short, url: `/${kind}` }, { name: e.name, url: `/${kind}/${slug}` }];
  const others = entities(kind).filter((x) => x.slug !== slug).slice(0, 3).map((x) => ({ label: x.name, href: `/${kind}/${x.slug}` }));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "Article", headline: e.title, description: e.description, url, image: `${site.url}${ogFor(e)}`, inLanguage: "en", about: { "@type": kind === "places" ? "Place" : "Thing", name: e.name }, author: { "@id": orgNode["@id"] }, publisher: { "@id": orgNode["@id"] }, datePublished: "2026-10-30", dateModified: "2026-10-30", isAccessibleForFree: true }, { "@type": "FAQPage", mainEntity: e.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] }} />
      <LongPage title={e.title} lede={e.answer} image={`${artSrc(e.art)}.webp`} crumbs={crumbs} wide={e.art.startsWith("kand:")} related={[...others, { label: `All ${h.short.toLowerCase()}`, href: `/${kind}` }, { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" }]}>
        <div className="prose-ram">
          {e.sections.map((s) => (<section key={s.h2}><h2>{s.h2}</h2><div dangerouslySetInnerHTML={{ __html: marked.parse(s.md, { async: false }) as string }} /></section>))}
        </div>
        {vs.length > 0 && (
          <section className="mt-12">
            <h2 className="t-sub">Verses</h2>
            <div className="mt-6 space-y-10">
              {vs.map((x) => (
                <div key={x.verse.id}>
                  <VerseBlock verse={x.verse} lang="en" />
                  <p className="meaning-en mt-3 whitespace-pre-line">{x.english}</p>
                  <Link href={`${unitPath("en", x.kand.slug, x.unit.slug)}#${x.verse.id}`} className="tap text-[0.9375rem] text-accent hover:text-accent-ink">{x.kand.title_en}, {x.unit.label_en}</Link>
                </div>
              ))}
            </div>
          </section>
        )}
        <AppCard place={`${kind}-${slug}`} compact className="mt-10" />
        <section className="mt-12">
          <h2 className="t-sub">Questions people ask</h2>
          <div className="mt-3 divide-y divide-border border-y border-border">
            {e.faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden"><h3 className="text-[1.0625rem] font-medium leading-snug">{f.q}</h3><span aria-hidden className="text-[1.5rem] leading-none text-muted transition-transform group-open:rotate-45">+</span></summary>
                <p className="pb-4 text-[1.0625rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </LongPage>
    </>
  );
}
