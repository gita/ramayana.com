import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { song, songPath, songs } from "@/lib/songs";
import { type Lang } from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { AppCard } from "@/components/app-card";

const hub = {
  en: { title: "Ramayan songs: lyrics, meaning and the scripture behind them", h1: "Ramayan songs", lede: "Songs from the Ramayan serial, the 2026 film and the bhajans families sing, traced back to the verses of Tulsidas and Valmiki." },
  hi: { title: "रामायण के गीत: बोल, अर्थ और उनके पीछे की चौपाइयाँ", h1: "रामायण के गीत", lede: "रामायण धारावाहिक, 2026 की फ़िल्म और घर-घर गाए जाने वाले भजन, तुलसीदासजी और वाल्मीकिजी के मूल पदों के साथ।" },
};
export function songHubMetadata(lang: Lang): Metadata {
  const h = hub[lang];
  return { title: h.title, description: h.lede, alternates: { canonical: lang === "hi" ? "/hi/songs" : "/songs", languages: { en: "/songs", hi: "/hi/songs", "x-default": "/songs" } } };
}
export function SongHub({ lang }: { lang: Lang }) {
  const h = hub[lang], hi = lang === "hi";
  return (
    <div lang={lang} className="wrap pt-10 pb-16">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb([{ name: hi ? "मुखपृष्ठ" : "Home", url: hi ? "/hi" : "/" }, { name: h.h1, url: hi ? "/hi/songs" : "/songs" }])] }} />
      <h1 className="t-display">{h.h1}</h1>
      <p className="t-lede mt-4 max-w-2xl">{h.lede}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {songs.map((s) => (
          <li key={s.slug}>
            <Link href={songPath(lang, s.slug)} className="press flex h-full flex-col rounded-3xl border border-border bg-surface px-6 py-5 hover:border-accent/40">
              <span className="font-serif text-[1.25rem] font-semibold leading-snug">{hi ? s.title_hi : s.title}</span>
              <span className="mt-2 text-[0.9375rem] text-muted">{hi ? s.from_hi : s.from_en}</span>
              <span className="mt-3 text-[0.9375rem] text-accent" aria-hidden>{hi ? "बोल और अर्थ →" : "Lyrics and meaning →"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function songMetadata(lang: Lang, slug: string): Metadata {
  const s = song(slug);
  if (!s) return {};
  const hi = lang === "hi";
  const full = s.kind === "full";
  const title = hi ? `${s.title_hi}: ${full ? "बोल और अर्थ" : "अर्थ और मूल प्रसंग"}` : `${s.title}: ${full ? "lyrics and meaning" : "meaning and the scripture behind it"}`;
  const description = hi
    ? `${s.title_hi} (${s.from_hi}) के पीछे की चौपाइयाँ और श्लोक, हर पंक्ति का अर्थ, प्रसंग और आधिकारिक वीडियो।`
    : `${s.title} from ${s.from_en}: ${full ? "full lyrics in Hindi and English transliteration, " : ""}the meaning of each line, the scripture it comes from, and the official video.`;
  return { title, description, alternates: { canonical: songPath(lang, slug), languages: { en: songPath("en", slug), hi: songPath("hi", slug), "x-default": songPath("en", slug) } }, openGraph: { siteName: site.name, title, description } };
}

export function SongPage({ lang, slug }: { lang: Lang; slug: string }) {
  const s = song(slug);
  if (!s) notFound();
  const hi = lang === "hi";
  const name = hi ? s.title_hi : s.title;
  const here = songPath(lang, slug);
  const crumbs = [{ name: hi ? "मुखपृष्ठ" : "Home", url: hi ? "/hi" : "/" }, { name: hi ? "गीत" : "Songs", url: hi ? "/hi/songs" : "/songs" }, { name, url: here }];
  const faq = s.faq.map((f) => ({ q: hi ? f.q_hi : f.q_en, a: hi ? f.a_hi : f.a_en }));
  const prose = hi ? "meaning-hi" : "meaning-en";
  const em = (t: string) => t.split(/(\*[^*]+\*)/).map((x, k) => (/^\*[^*]+\*$/.test(x) ? <em key={k}>{x.slice(1, -1)}</em> : x));
  const paras = (t: string) => t.split(/\n\s*\n/).map((p, i) => <p key={i}>{em(p)}</p>);
  const clean = (t?: string | null) => t?.replace(/\s*\(\d+(?:[-—–]\d+)?\)\s*$/gm, "").replace(/॥\s*[\d२-९०१ -]+\s*॥\s*$/gm, "॥").trim();
  const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => <h2 id={id} className="t-sub mt-14 mb-4 scroll-mt-20">{children}</h2>;
  const full = s.kind === "full";
  return (
    <article lang={lang} className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 pt-6">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        breadcrumb(crumbs),
        { "@type": "MusicComposition", name: s.title, alternateName: s.title_hi, url: `${site.url}${here}`, ...(full ? { lyrics: { "@type": "CreativeWork", text: s.lines.map((l) => l.verse?.text ?? l.text ?? "").join("\n\n") } } : {}) },
        ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
      ] }} />
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.slice(0, -1).map((x, j) => (<li key={x.url} className="flex items-center gap-1.5">{j > 0 && <span aria-hidden>›</span>}<Link href={x.url} className="hover:text-foreground">{x.name}</Link></li>))}
        </ol>
      </nav>
      <header className="mt-5">
        <h1 className="t-title">{name}</h1>
        <p className="mt-3 text-[0.9375rem] text-muted">{hi ? s.from_hi : s.from_en}</p>
        <div className={`${prose} mt-6 space-y-4`}>{paras(hi ? s.intro_hi : s.intro_en)}</div>
        {s.video && (
          <a href={s.video} target="_blank" rel="noopener" className="press mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink">
            {hi ? "आधिकारिक वीडियो देखें" : "Watch the official video"}{s.channel ? ` · ${s.channel}` : ""}
          </a>
        )}
      </header>

      <H2 id="lyrics">{full ? (hi ? "सम्पूर्ण बोल" : "Full lyrics") : (hi ? "इस गीत के पीछे के पद" : "The verses behind the song")}</H2>
      <section className="space-y-6 rounded-3xl bg-surface px-5 py-6 ring-1 ring-border/70 sm:px-8 sm:py-8">
        {s.lines.map((l, i) => (
          <div key={i}>
            <p lang="awa" className="verse whitespace-pre-line">{l.verse?.text ?? l.text}</p>
            <p lang="en" className="mt-2 font-serif text-[1rem] italic leading-relaxed text-muted">{l.roman.map((r, k) => <span key={k} className="block">{r}</span>)}</p>
            {l.sung && <p className="mt-1 text-[0.8125rem] text-faint">{hi ? "गाया जाता है: " : "Commonly sung as: "}<span className="italic">{l.sung}</span></p>}
          </div>
        ))}
      </section>

      <H2 id="meaning">{hi ? "हर पंक्ति का अर्थ" : "Meaning, line by line"}</H2>
      <div className="space-y-8">
        {s.lines.map((l, i) => {
          const mhi = clean(l.verse?.hi ?? l.meaning_hi), men = clean(l.verse?.en ?? l.meaning_en);
          return (
            <div key={i} className="border-l-2 border-accent/25 pl-4">
              <p lang="awa" className="font-verse text-[1.125rem] text-scripture whitespace-pre-line">{l.verse?.text ?? l.text}</p>
              {hi ? mhi && <p lang="hi" className="meaning-hi mt-2 whitespace-pre-line">{mhi}</p> : (<>{men && <p className="meaning-en mt-2 whitespace-pre-line">{men}</p>}{mhi && <p lang="hi" className="meaning-hi mt-2 whitespace-pre-line text-muted">{mhi}</p>}</>)}
              <p className="mt-1 text-[0.875rem] text-faint">
                {l.verse ? <Link href={`${hi ? "/hi" : ""}${l.verse.path}`} className="tap text-accent">{hi ? l.verse.label_hi : l.verse.label_en} →</Link> : l.source}
              </p>
            </div>
          );
        })}
      </div>

      <H2>{hi ? "गीत के बारे में" : "About the song"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.about_hi : s.about_en)}</div>
      <p className="mt-3 text-[0.875rem] text-muted">{s.credits}</p>
      <H2>{hi ? "प्रसंग" : "The scene in the Ramayana"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.scene_hi : s.scene_en)}</div>
      <H2>{hi ? "यह गीत क्या सिखाता है" : "What it teaches"}</H2>
      <div className={`${prose} space-y-4`}>{paras(hi ? s.teaching_hi : s.teaching_en)}</div>

      {faq.length > 0 && (<>
        <H2 id="faq">{hi ? "अक्सर पूछे जाने वाले प्रश्न" : "Questions people ask"}</H2>
        <div className="divide-y divide-border/70 border-y border-border/70">
          {faq.map((f) => (<details key={f.q} className="group py-4"><summary className="tap flex w-full cursor-pointer list-none items-start gap-4 font-medium [&::-webkit-details-marker]:hidden"><span className="flex-1">{f.q}</span><span aria-hidden className="shrink-0 text-[1.25rem] leading-none text-faint transition-transform group-open:rotate-45">+</span></summary><p className={`mt-2 ${prose} text-[1rem]`}>{f.a}</p></details>))}
        </div>
      </>)}
      {s.spellings.length > 0 && <p className="mt-8 text-[0.8125rem] text-faint">{hi ? "इसे ऐसे भी लिखा जाता है: " : "Also written as: "}{s.spellings.join(" · ")}</p>}
      <AppCard place="reader" compact className="mt-10" />
    </article>
  );
}
