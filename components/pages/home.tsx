import Image from "next/image";
import Link from "next/link";
import home from "@/content/home.json";
import { englishForVerse, index, kandPath, kandTitle, unitPath, type Lang } from "@/lib/content";
import { dailyChaupai } from "@/lib/chaupai";
import { feelings, feelingPath } from "@/lib/feelings";
import { vArt, vHub, vIndex, vKandPath, vTitle } from "@/lib/valmiki";
import { JsonLd, bookNode } from "@/components/json-ld";
import { Phone, PlayButton } from "@/components/app-card";
import { ContinueReading } from "@/components/progress";

const t = {
  en: {
    h1: "The official home of the Ramayana", sub: "Read the Ramcharitmanas and the Valmiki Ramayana, every verse with Hindi and English meaning. Free.",
    rcm: "Ramcharitmanas", val: "Valmiki Ramayana", read: "Read the Ramayana online", rcmH: "Ramcharitmanas", rcmBy: "Goswami Tulsidas", valH: "Valmiki Ramayana", valBy: "Maharshi Valmiki",
    popular: "Popular", today: "Today's Ramayan verse", feel: "Ramayan verses about", about: "About the Ramayana",
    app: "The free Ramayan app", appSub: "The whole book on your phone. No ads. Works offline.",
    pop: [["Sunderkand", "/sunderkand"], ["Famous chaupais", "/chaupai"], ["Goswami Tulsidas", "/tulsidas"], ["Maharshi Valmiki", "/valmiki"], ["The 2026 film", "/ramayana-movie"]],
  },
  hi: {
    h1: "रामायण का आधिकारिक घर", sub: "श्रीरामचरितमानस और वाल्मीकि रामायण, हर श्लोक हिंदी अर्थ सहित। निःशुल्क।",
    rcm: "रामचरितमानस", val: "वाल्मीकि रामायण", read: "रामायण ऑनलाइन पढ़ें", rcmH: "रामचरितमानस", rcmBy: "गोस्वामी तुलसीदास", valH: "वाल्मीकि रामायण", valBy: "महर्षि वाल्मीकि",
    popular: "लोकप्रिय", today: "आज का रामायण पद", feel: "इन भावों की चौपाइयाँ", about: "रामायण के बारे में",
    app: "निःशुल्क रामायण ऐप", appSub: "पूरा ग्रंथ आपके फ़ोन में। विज्ञापन नहीं। बिना इंटरनेट।",
    pop: [["सुन्दरकाण्ड", "/hi/sunderkand"], ["प्रसिद्ध चौपाइयाँ", "/hi/chaupai"], ["गोस्वामी तुलसीदास", "/tulsidas"], ["महर्षि वाल्मीकि", "/valmiki"], ["2026 की फ़िल्म", "/ramayana-movie"]],
  },
};
const pre = (l: Lang) => (l === "hi" ? "/hi" : "");

/** One book as a table of contents. Both books share this exact shape, so the columns align row for row. */
function Book({ art, title, by, intro, href, items }: { art: string; title: string; by: string; intro: string; href: string; items: { href: string; name: string; line: string }[] }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border/70">
      <Link href={href} className="relative block aspect-[3/2]"><Image src={art} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" /></Link>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="t-sub"><Link href={href}>{title}</Link></h3>
        <p className="mt-0.5 text-[1rem] text-muted">{by}</p>
        <p className="mt-3 min-h-[5.4em] text-[1.0625rem] leading-relaxed text-foreground">{intro}</p>
        <ol className="mt-4 divide-y divide-border border-t border-border">
          {items.map((k) => (
            <li key={k.href}>
              <Link href={k.href} className="group flex min-h-[4.25rem] items-center justify-between gap-4 py-2.5">
                <span className="min-w-0">
                  <span className="block font-medium text-foreground group-hover:text-accent">{k.name}</span>
                  <span className="block text-[0.9375rem] leading-snug text-muted">{k.line}</span>
                </span>
                <span aria-hidden className="text-faint group-hover:text-accent">›</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  const s = t[lang], c = home[lang] as (typeof home)["en"];
  const today = dailyChaupai();
  const rcmHref = `${pre(lang)}/ramcharitmanas`;
  const lines = today.verse.text;
  return (
    <div lang={lang}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [bookNode(lang), { "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] }} />

      <section className="wrap pt-12 text-center sm:pt-20">
        <h1 className="t-display mx-auto max-w-4xl">{s.h1}</h1>
        <p className="t-lede mx-auto mt-5 max-w-2xl">{s.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={rcmHref} className="press inline-flex h-12 items-center rounded-full bg-accent px-7 text-[1.0625rem] font-medium text-white hover:bg-accent-ink">{s.rcm}</Link>
          <Link href={vHub(lang)} className="press inline-flex h-12 items-center rounded-full bg-accent-soft px-7 text-[1.0625rem] font-medium text-accent-ink">{s.val}</Link>
        </div>
        <div className="mx-auto max-w-md text-left"><ContinueReading lang={lang} /></div>
        <figure className="relative mt-12 aspect-[3/2] overflow-hidden rounded-3xl sm:mt-16 sm:aspect-[16/8]">
          <Image src="/images/hero/ram-darbar.webp" alt="Shri Ram and Mata Sita enthroned at Ayodhya, with Lakshman, Bharat and Shatrughna standing behind and Hanumanji kneeling before them." fill priority sizes="(min-width: 1168px) 1120px, 100vw" className="object-cover object-[50%_40%]" />
        </figure>
      </section>

      <section className="wrap band" aria-labelledby="read">
        <h2 id="read" className="t-title">{s.read}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Book art="/images/authors/tulsidas.webp" title={s.rcmH} by={s.rcmBy} intro={c.rcm_intro} href={rcmHref}
            items={index().kands.map((k) => ({ href: kandPath(lang, k.slug), name: kandTitle(k, lang), line: (c.rcm_kands as Record<string, string>)[k.slug] }))} />
          <Book art="/images/authors/valmiki.webp" title={s.valH} by={s.valBy} intro={c.val_intro} href={vHub(lang)}
            items={vIndex().kands.map((k) => ({ href: vKandPath(lang, k.slug), name: vTitle(k, lang), line: (c.val_kands as Record<string, string>)[k.slug] }))} />
        </div>
        <nav aria-label={s.popular} className="mt-6 flex flex-wrap gap-2">
          {s.pop.map(([label, href]) => (<Link key={href} href={href} className="press flex h-12 items-center rounded-full bg-surface-2 px-5 text-[0.9375rem] text-foreground hover:text-accent">{label}</Link>))}
        </nav>
      </section>

      <section className="wrap band" aria-labelledby="today">
        <div className="rounded-3xl bg-surface-2 px-6 py-14 text-center sm:px-16 sm:py-20">
          <h2 id="today" className="t-title">{s.today}</h2>
          <p lang="awa" className="verse verse-lg mx-auto mt-8 max-w-3xl">{lines}</p>
          <p lang={lang} className={`${lang === "hi" ? "meaning-hi" : "meaning-en"} mx-auto mt-6 max-w-2xl whitespace-pre-line text-muted`}>{lang === "hi" ? today.verse.hi : englishForVerse(today.verse, today.en)}</p>
          <Link href={`${unitPath(lang, today.kand.slug, today.unit.slug)}#${today.verse.id}`} className="tap mt-2 text-accent hover:text-accent-ink">{kandTitle(today.kand, lang)}, {lang === "hi" ? today.unit.label_hi : today.unit.label_en}</Link>
        </div>
      </section>

      <section className="wrap band" aria-labelledby="feel">
        <h2 id="feel" className="t-title">{s.feel}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {feelings.map((f) => (
            <li key={f.id}>
              <Link href={feelingPath(lang, f.id)} className="press relative block aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={`/images/deity/${f.art}.webp`} alt="" fill sizes="(min-width: 1024px) 180px, 50vw" className="object-cover object-top" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3.5 pt-12 font-serif text-[1.125rem] font-semibold text-white">{f[lang]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap band" aria-labelledby="app">
        <div data-app-cta className="grid items-center gap-8 overflow-hidden rounded-3xl bg-[#14213f] px-6 pt-12 text-white sm:px-14 md:grid-cols-2 md:py-0">
          <div className="md:py-16">
            <h2 id="app" className="t-title">{s.app}</h2>
            <p className="mt-3 text-[1.125rem] text-white/70">{s.appSub}</p>
            <PlayButton place="home" className="mt-7 !bg-white !text-[#14213f]" />
          </div>
          <div className="flex h-72 justify-center gap-4 overflow-hidden md:h-[26rem] md:self-end" aria-hidden>
            <Phone src="/images/app/today.webp" alt="" className="mt-6 w-44 shrink-0 sm:w-52" />
            <Phone src="/images/app/read.webp" alt="" className="mt-16 w-44 shrink-0 sm:w-52" />
          </div>
        </div>
      </section>

      <section className="wrap band grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12" aria-labelledby="about">
        <h2 id="about" className="t-title">{s.about}</h2>
        <div className="divide-y divide-border border-y border-border">
          {c.faq.map((f, i) => (
            <details key={f.q} open={i === 0} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.125rem] font-medium leading-snug">{f.q}</h3>
                <span aria-hidden className="text-[1.5rem] leading-none text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-1 text-[1.0625rem] leading-relaxed text-muted">{f.a}</p>
              <Link href={f.href} className="tap mb-1 text-accent hover:text-accent-ink">{f.link}</Link>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
