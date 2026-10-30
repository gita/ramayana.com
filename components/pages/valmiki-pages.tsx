import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Lang } from "@/lib/content";
import { vArt, vHub, vIndex, vKand, vKandPath, vSarga, vSargaPath, vTitle } from "@/lib/valmiki";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb, orgNode } from "@/components/json-ld";
import { SourceLine, UnitNav } from "@/components/reader";
import { AppCard } from "@/components/app-card";
import { Article } from "@/components/article";
import { isReleased, HOLD } from "@/lib/release";
import { KandProgress, TrackRead } from "@/components/progress";

const book = (lang: Lang) => ({ "@type": "Book", "@id": `${site.url}/valmiki-ramayana#book`, name: lang === "hi" ? "श्रीमद्वाल्मीकीय रामायण" : "Valmiki Ramayana", alternateName: ["Ramayanam", "Srimad Valmiki Ramayana", "वाल्मीकि रामायण"], author: { "@type": "Person", name: "Maharshi Valmiki", url: `${site.url}/valmiki` }, inLanguage: "sa", url: `${site.url}/valmiki-ramayana`, isAccessibleForFree: true });
const alt = (en: string, hi: string, lang: Lang) => ({ canonical: lang === "hi" ? hi : en, languages: { en, hi, "x-default": en }, types: { "text/markdown": `${lang === "hi" ? hi : en}.md` } });
const og = (title: string, description: string, art: string, lang: Lang) => ({ title, description, siteName: site.name, locale: lang === "hi" ? "hi_IN" : "en_IN", images: [{ url: `/images/kand/${art}-og.jpg`, width: 1200, height: 630 }] });
const name = (lang: Lang) => (lang === "hi" ? "वाल्मीकि रामायण" : "Valmiki Ramayana");

export function vHubMetadata(lang: Lang): Metadata {
  const title = lang === "hi" ? "वाल्मीकि रामायण ऑनलाइन: संस्कृत श्लोक, हिंदी अर्थ सहित" : "Valmiki Ramayana online: Sanskrit shlokas with English meaning";
  const description = lang === "hi" ? "सम्पूर्ण वाल्मीकि रामायण, सातों काण्ड और 648 सर्ग, हर श्लोक गीताप्रेस के हिंदी अनुवाद के साथ। निःशुल्क।" : "The complete Valmiki Ramayana, all seven kandas and 648 sargas, every shloka in Sanskrit with the Gita Press English translation. Free, no ads.";
  return { title, description, alternates: alt("/valmiki-ramayana", "/hi/valmiki-ramayana", lang), openGraph: og(title, description, "sunderkand", lang) };
}
export async function VHubPage({ lang }: { lang: Lang }) {
  const crumbs = [{ name: lang === "hi" ? "मुखपृष्ठ" : "Home", url: lang === "hi" ? "/hi" : "/" }, { name: name(lang), url: vHub(lang) }];
  const intro = lang === "en" ? await Article.html("valmiki-intro") : null;
  return (
    <div lang={lang} className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), book(lang)] }} />
      <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.5rem]">{name(lang)}</h1>
      <p className="mt-3 font-serif text-[1.25rem] text-muted">{lang === "hi" ? "महर्षि वाल्मीकि कृत, हर श्लोक अर्थ सहित।" : "By Maharshi Valmiki, every shloka with its meaning."}</p>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vIndex().kands.map((k) => (
          <li key={k.slug}>
            <Link href={vKandPath(lang, k.slug)} className="press relative block aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={`/images/kand/${vArt[k.slug]}.webp`} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-[50%_30%]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-4 pt-14 text-white"><span className="block font-serif text-[1.375rem] font-semibold">{vTitle(k, lang)}</span><span className="text-[0.9375rem] text-white/80">{k.sargas[lang].length} {lang === "hi" ? "सर्ग" : "sargas"}</span></span>
            </Link>
          </li>
        ))}
      </ol>
      {intro && <div className="prose-ram mt-14" dangerouslySetInnerHTML={{ __html: intro }} />}
      <AppCard place="valmiki-hub" compact className="mt-10 max-w-3xl" />
    </div>
  );
}

export function vKandMetadata(lang: Lang, slug: string): Metadata {
  const k = vKand(slug);
  if (!k) return {};
  const t = vTitle(k, lang), count = k.editions[lang].length;
  const title = lang === "hi" ? `${t}: वाल्मीकि रामायण के ${count} सर्ग, हिंदी अर्थ सहित` : `${t} of the Valmiki Ramayana: ${count} sargas with meaning`;
  const description = lang === "hi" ? `वाल्मीकि रामायण का ${t}, सभी ${count} सर्ग संस्कृत श्लोक और हिंदी अनुवाद के साथ। निःशुल्क।` : `The ${t} of the Valmiki Ramayana, all ${count} sargas in Sanskrit with English meaning. Free, no ads.`;
  return { title, description, alternates: alt(vKandPath("en", slug), vKandPath("hi", slug), lang), openGraph: og(title, description, vArt[slug], lang) };
}
export async function VKandPage({ lang, slug }: { lang: Lang; slug: string }) {
  const k = vKand(slug);
  if (!k) notFound();
  const t = vTitle(k, lang), list = k.editions[lang];
  const crumbs = [{ name: lang === "hi" ? "मुखपृष्ठ" : "Home", url: lang === "hi" ? "/hi" : "/" }, { name: name(lang), url: vHub(lang) }, { name: t, url: vKandPath(lang, slug) }];
  const intro = lang === "en" ? await Article.section("valmiki-kand-intros", k.title_en) : null;
  return (
    <div lang={lang}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "Chapter", name: t, position: k.number, isPartOf: book(lang), isAccessibleForFree: true, url: `${site.url}${vKandPath(lang, slug)}` }] }} />
      <div className="art-fade relative aspect-[16/9] max-h-[52vh] w-full overflow-hidden sm:aspect-[21/9]"><Image src={`/images/kand/${vArt[slug]}.webp`} alt="" fill priority sizes="100vw" className="object-cover object-[50%_30%]" /></div>
      <div className="relative mx-auto -mt-4 max-w-3xl px-4 sm:-mt-10 sm:px-6">
        <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.25rem]">{t}</h1>
        <p className="mt-2 text-[1.0625rem] text-muted">{name(lang)} · {list.length} {lang === "hi" ? "सर्ग" : "sargas"}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={vSargaPath(lang, slug, list[0].n)} className="press inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-white hover:bg-accent-ink">{lang === "hi" ? "पढ़ना शुरू करें" : "Start reading"}</Link>
          <Link href={vKandPath(lang === "hi" ? "en" : "hi", slug)} lang={lang === "hi" ? "en" : "hi"} className="tap px-2 text-accent">{lang === "hi" ? "Read in English" : "हिंदी में पढ़ें"}</Link>
        </div>
        <KandProgress prefix={`val:${slug}:`} total={list.length} lang={lang} />
        {intro && <div className="prose-ram mt-10" dangerouslySetInnerHTML={{ __html: intro }} />}
        <h2 className="mt-12 font-serif text-[1.5rem] font-semibold">{lang === "hi" ? "सर्ग" : "Sargas"}</h2>
        <ol className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {list.map((s) => (<li key={s.n}><Link href={vSargaPath(lang, slug, s.n)} data-unit={`val:${slug}:${s.n}`} className="press flex h-12 items-center justify-center rounded-xl border border-border bg-surface tabular-nums hover:border-accent/50">{s.n}</Link></li>))}
        </ol>
        <AppCard place="valmiki-kand" compact className="mt-10" />
      </div>
    </div>
  );
}

const sargaTitle = (lang: Lang, t: string, n: number) => (lang === "hi" ? `${t} सर्ग ${n}, हिंदी अर्थ सहित · वाल्मीकि रामायण` : `${t} Sarga ${n} with English meaning · Valmiki Ramayana`);
export function vSargaMetadata(lang: Lang, slug: string, sarga: string): Metadata {
  const r = vSarga(lang, slug, sarga);
  if (!r) return {};
  const title = sargaTitle(lang, vTitle(r.kand, lang), r.sarga.n);
  const description = `${r.sarga.verses[0]?.text.split("\n")[0] ?? ""} ${(r.sarga.verses[0]?.m ?? "").slice(0, 110)}`.trim();
  const robots = isReleased("val", slug, r.kand.editions[lang].indexOf(r.sarga) + 1) ? undefined : HOLD;
  return { title, description, robots, alternates: alt(vSargaPath("en", slug, r.sarga.n), vSargaPath("hi", slug, r.sarga.n), lang), openGraph: og(title, description, vArt[slug], lang) };
}
export function VSargaPage({ lang, slug, sarga }: { lang: Lang; slug: string; sarga: string }) {
  const r = vSarga(lang, slug, sarga);
  if (!r) notFound();
  const { kand: k, sarga: s, prev, next } = r;
  const t = vTitle(k, lang), label = (n: number) => (lang === "hi" ? `सर्ग ${n}` : `Sarga ${n}`), here = vSargaPath(lang, slug, s.n);
  const crumbs = [{ name: lang === "hi" ? "मुखपृष्ठ" : "Home", url: lang === "hi" ? "/hi" : "/" }, { name: name(lang), url: vHub(lang) }, { name: t, url: vKandPath(lang, slug) }, { name: label(s.n), url: here }];
  const mHead = lang === "hi" ? "भावार्थ" : "Meaning";
  return (
    <article lang={lang} className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
      <TrackRead id={`val:${slug}:${s.n}`} href={here} label={`${t}, ${label(s.n)}`} />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "Chapter", name: `${t} ${label(s.n)}`, position: s.n, isPartOf: { "@type": "Chapter", name: t, isPartOf: book(lang) }, inLanguage: ["sa", lang], isAccessibleForFree: true, url: `${site.url}${here}`, publisher: { "@id": orgNode["@id"] } }] }} />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted"><ol className="flex flex-wrap items-center gap-1.5">{crumbs.slice(0, -1).map((c, i) => (<li key={c.url} className="flex items-center gap-1.5">{i > 0 && <span aria-hidden>›</span>}<Link href={c.url} className="hover:text-foreground">{c.name}</Link></li>))}</ol></nav>
      <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.5rem]">{t}, {label(s.n)}</h1>
      <Link href={vSargaPath(lang === "hi" ? "en" : "hi", slug, s.n)} lang={lang === "hi" ? "en" : "hi"} className="tap text-[0.9375rem] text-accent">{lang === "hi" ? "Read in English" : "हिंदी में पढ़ें"}</Link>
      <div className="mt-6 space-y-8">
        {s.verses.map((v) => (
          <section key={v.n} id={`shloka-${v.n.split(".").pop()}`} className="scroll-mt-20">
            <p lang="sa" className="verse">{v.text}</p>
            {v.m && <div className="mt-3 rounded-2xl bg-surface px-5 py-4 ring-1 ring-border/70"><p className="mb-1 text-[0.9375rem] font-semibold text-gold">{mHead}</p><p className={`${lang === "hi" ? "meaning-hi" : "meaning-en"} whitespace-pre-line`}>{v.m}</p></div>}
          </section>
        ))}
      </div>
      <UnitNav lang={lang} up={{ href: vKandPath(lang, slug), label: t }} prev={prev ? { href: vSargaPath(lang, prev.slug, prev.n), label: label(prev.n) } : null} next={next ? { href: vSargaPath(lang, next.slug, next.n), label: label(next.n) } : null} />
      <AppCard place="valmiki-sarga" compact className="mt-10" />
      <SourceLine lang={lang} />
    </article>
  );
}
