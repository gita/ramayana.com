import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stuti, stutiPath } from "@/lib/stuti";
import { englishForVerse, kandTitle, unitPath, type Lang } from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, bookNode, breadcrumb } from "@/components/json-ld";
import { AppCard } from "@/components/app-card";
import { SourceLine } from "@/components/reader";

export function stutiMetadata(lang: Lang, slug: string): Metadata {
  const s = stuti(slug);
  if (!s) return {};
  const hi = lang === "hi";
  const title = hi ? `${s.title_hi}: सम्पूर्ण पाठ, अर्थ सहित` : `${s.title} lyrics with meaning`;
  const description = hi
    ? `${s.title_hi} का सम्पूर्ण पाठ देवनागरी और रोमन में, हर पद का गीताप्रेस हिंदी अर्थ, प्रसंग और पाठ की विधि।`
    : `${s.title} full lyrics in Hindi and English transliteration, the meaning of every verse, where it appears in the Ramcharitmanas, and how to recite it.`;
  return {
    title, description,
    alternates: { canonical: stutiPath(lang, slug), languages: { en: stutiPath("en", slug), hi: stutiPath("hi", slug), "x-default": stutiPath("en", slug) } },
    openGraph: { siteName: site.name, title, description, images: [{ url: `/images/kand/${s.kand}-og.jpg`, width: 1200, height: 630 }] },
  };
}

export function StutiPage({ lang, slug }: { lang: Lang; slug: string }) {
  const s = stuti(slug);
  if (!s) notFound();
  const hi = lang === "hi";
  const name = hi ? s.title_hi : s.title;
  const here = stutiPath(lang, slug);
  const kt = kandTitle(s.k, lang);
  const crumbs = [{ name: hi ? "मुखपृष्ठ" : "Home", url: hi ? "/hi" : "/" }, { name, url: here }];
  const faq = s.faq.map((f) => ({ q: hi ? f.q_hi : f.q_en, a: hi ? f.a_hi : f.a_en }));
  const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => <h2 id={id} className="t-sub mt-14 mb-4 scroll-mt-20">{children}</h2>;
  const prose = hi ? "meaning-hi" : "meaning-en";
  const paras = (t: string) => t.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>);
  return (
    <article lang={lang} className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 pt-6">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        breadcrumb(crumbs),
        { "@type": "CreativeWork", "@id": `${site.url}${here}#work`, name: s.title, alternateName: s.title_hi, inLanguage: s.slug === "rudrashtakam" ? "sa" : "awa", text: s.verses.map((x) => x.v.text).join("\n\n"), creator: { "@type": "Person", name: "Goswami Tulsidas", url: `${site.url}/tulsidas` }, isPartOf: bookNode(lang), isAccessibleForFree: true, url: `${site.url}${here}` },
        { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ] }} />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <Link href={crumbs[0].url} className="hover:text-foreground">{crumbs[0].name}</Link>
      </nav>
      <header className="mt-5">
        <h1 className="t-title">{name}</h1>
        <p className="mt-3 text-[0.9375rem] text-muted">{hi ? "श्रीरामचरितमानस" : "Ramcharitmanas"} · {kt} · {hi ? "गोस्वामी तुलसीदास" : "Goswami Tulsidas"}</p>
        <div className={`${prose} mt-6 space-y-4`}>{paras(hi ? s.intro_hi : s.intro_en)}</div>
        <nav className="mt-6 flex flex-wrap gap-2 text-[0.9375rem]">
          {[["lyrics", hi ? "पाठ" : "Lyrics"], ["meaning", hi ? "अर्थ" : "Meaning"], ["scene", hi ? "प्रसंग" : "The scene"], ["faq", hi ? "प्रश्न" : "Questions"]].map(([id, l]) => (
            <a key={id} href={`#${id}`} className="tap rounded-full bg-surface-2 px-4 py-1.5 hover:bg-surface">{l}</a>
          ))}
        </nav>
      </header>

      <H2 id="lyrics">{hi ? "सम्पूर्ण पाठ" : "Full lyrics"}</H2>
      <section className="space-y-6 rounded-3xl bg-surface px-5 py-6 ring-1 ring-border/70 sm:px-8 sm:py-8">
        {s.verses.map(({ v }) => (
          <div key={v.id}>
            <p lang={s.slug === "rudrashtakam" ? "sa" : "awa"} className="verse whitespace-pre-line">{v.text}</p>
            {s.roman[v.id] && (
              <p lang="en" className="mt-2 font-serif text-[1rem] italic leading-relaxed text-muted">
                {s.roman[v.id].map((l, i) => <span key={i} className="block">{l}</span>)}
              </p>
            )}
          </div>
        ))}
      </section>

      <H2 id="meaning">{hi ? "हर पद का अर्थ" : "Meaning of each verse"}</H2>
      <div className="space-y-8">
        {s.verses.map(({ v, u }) => {
          const en = englishForVerse(v, (u.en ?? []).find((e) => e.verses.includes(v.id)) ?? null);
          return (
            <div key={v.id} className="border-l-2 border-accent/25 pl-4">
              <p lang={s.slug === "rudrashtakam" ? "sa" : "awa"} className="font-verse text-[1.125rem] text-scripture whitespace-pre-line">{v.text}</p>
              {hi ? <p lang="hi" className="meaning-hi mt-2 whitespace-pre-line">{v.hi}</p> : (
                <>
                  {en && <p lang="en" className="meaning-en mt-2 whitespace-pre-line">{en}</p>}
                  <p lang="hi" className="meaning-hi mt-2 whitespace-pre-line text-muted">{v.hi}</p>
                </>
              )}
              <Link href={`${unitPath(lang, s.kand, u.slug)}#${v.id}`} className="tap mt-1 inline-block text-[0.875rem] text-accent">{hi ? u.label_hi : u.label_en} →</Link>
            </div>
          );
        })}
      </div>

      <H2 id="scene">{hi ? "प्रसंग" : "The scene"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.scene_hi : s.scene_en)}</div>
      <H2>{hi ? "इस स्तुति की सीख" : "What it teaches"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.teaching_hi : s.teaching_en)}</div>
      <H2>{hi ? "पाठ कैसे करें" : "How to recite it"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.how_hi : s.how_en)}</div>

      <H2 id="faq">{hi ? "अक्सर पूछे जाने वाले प्रश्न" : "Questions people ask"}</H2>
      <div className="divide-y divide-border/70 border-y border-border/70">
        {faq.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="tap flex w-full cursor-pointer list-none items-start gap-4 font-medium [&::-webkit-details-marker]:hidden"><span className="flex-1">{f.q}</span><span aria-hidden className="shrink-0 text-[1.25rem] leading-none text-faint transition-transform group-open:rotate-45">+</span></summary>
            <p className={`mt-2 ${prose} text-[1rem]`}>{f.a}</p>
          </details>
        ))}
      </div>
      {s.spellings.length > 0 && <p className="mt-8 text-[0.8125rem] text-faint">{hi ? "इसे ऐसे भी लिखा जाता है: " : "Also written as: "}{s.spellings.join(" · ")}</p>}
      <AppCard place="reader" compact className="mt-10" />
      <SourceLine lang={lang} />
    </article>
  );
}
