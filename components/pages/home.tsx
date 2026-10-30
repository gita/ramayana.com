import Image from "next/image";
import Link from "next/link";
import home from "@/content/home.json";
import { englishForVerse, index, kandPath, kandTitle, unitPath, type Lang } from "@/lib/content";
import { dailyChaupai } from "@/lib/chaupai";
import { feelings, feelingPath } from "@/lib/feelings";
import { vArt, vHub, vIndex, vKandPath, vTitle } from "@/lib/valmiki";
import { JsonLd, bookNode } from "@/components/json-ld";
import { VerseBlock } from "@/components/reader";
import { Phone, PlayButton } from "@/components/app-card";
import { ContinueReading } from "@/components/progress";

const t = {
  en: {
    h1: "The official home of the Ramayana", sub: "Read the Ramcharitmanas and the Valmiki Ramayana, every verse with Hindi and English meaning. Free.",
    rcm: "Ramcharitmanas", val: "Valmiki Ramayana", read: "Read the Ramayana online", rcmH: "Ramcharitmanas by Goswami Tulsidas", valH: "Valmiki Ramayana by Maharshi Valmiki",
    openRcm: "Open the Ramcharitmanas", openVal: "Open the Valmiki Ramayana", popular: "Popular", today: "Today's Ramayan verse", feel: "Ramayan verses about", about: "About the Ramayana",
    app: "The free Ramayan app", appSub: "The whole book on your phone. No ads. Works offline.",
    pop: [["Sunderkand", "/sunderkand"], ["Famous chaupais", "/chaupai"], ["Goswami Tulsidas", "/tulsidas"], ["Maharshi Valmiki", "/valmiki"], ["The 2026 film", "/ramayana-movie"]],
  },
  hi: {
    h1: "रामायण का आधिकारिक घर", sub: "श्रीरामचरितमानस और वाल्मीकि रामायण, हर श्लोक हिंदी अर्थ सहित। निःशुल्क।",
    rcm: "रामचरितमानस", val: "वाल्मीकि रामायण", read: "रामायण ऑनलाइन पढ़ें", rcmH: "गोस्वामी तुलसीदास कृत रामचरितमानस", valH: "महर्षि वाल्मीकि कृत वाल्मीकि रामायण",
    openRcm: "रामचरितमानस खोलें", openVal: "वाल्मीकि रामायण खोलें", popular: "लोकप्रिय", today: "आज का रामायण पद", feel: "इन भावों की चौपाइयाँ", about: "रामायण के बारे में",
    app: "निःशुल्क रामायण ऐप", appSub: "पूरा ग्रंथ आपके फ़ोन में। विज्ञापन नहीं। बिना इंटरनेट।",
    pop: [["सुन्दरकाण्ड", "/hi/sunderkand"], ["प्रसिद्ध चौपाइयाँ", "/hi/chaupai"], ["गोस्वामी तुलसीदास", "/tulsidas"], ["महर्षि वाल्मीकि", "/valmiki"], ["2026 की फ़िल्म", "/ramayana-movie"]],
  },
};
const pre = (l: Lang) => (l === "hi" ? "/hi" : "");

function Rail({ items }: { items: { href: string; art: string; name: string; line: string }[] }) {
  return (
    <ol className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6">
      {items.map((k) => (
        <li key={k.href} className="w-[64vw] max-w-[15rem] shrink-0 snap-start scroll-ml-4">
          <Link href={k.href} className="press group block">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl"><Image src={`/images/kand/${k.art}.webp`} alt="" fill sizes="(min-width: 640px) 15rem, 64vw" className="object-cover object-[50%_30%]" /></span>
            <span className="mt-2.5 block font-serif text-[1.1875rem] font-semibold leading-tight">{k.name}</span>
            <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">{k.line}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function Book({ id, title, intro, cta, href, items }: { id: string; title: string; intro: string; cta: string; href: string; items: { href: string; art: string; name: string; line: string }[] }) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h3 id={id} className="font-serif text-[1.5rem] font-semibold leading-tight tracking-tight"><Link href={href}>{title}</Link></h3>
      <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{intro}</p>
      <Rail items={items} />
      <Link href={href} className="tap font-medium text-accent hover:text-accent-ink">{cta}</Link>
    </section>
  );
}

/** Modelled on bible.com: short sections whose headings say what they are. Questions collapse, as on Monarch and Mercury. */
export function HomePage({ lang }: { lang: Lang }) {
  const s = t[lang], c = home[lang] as (typeof home)["en"];
  const today = dailyChaupai();
  const rcmHref = `${pre(lang)}/ramcharitmanas`;
  return (
    <div lang={lang}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [bookNode(lang), { "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] }} />
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-serif text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[4rem]" style={{ textWrap: "balance" }}>{s.h1}</h1>
            <p className="mt-4 font-serif text-[1.25rem] leading-snug text-muted sm:text-[1.5rem]">{s.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={rcmHref} className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1.0625rem] font-medium text-white hover:bg-accent-ink">{s.rcm}</Link>
              <Link href={vHub(lang)} className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1.0625rem] font-medium text-white hover:bg-accent-ink">{s.val}</Link>
            </div>
            <ContinueReading lang={lang} />
          </div>
          <figure className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(60,40,10,0.35)]">
            <Image src="/images/hero/ram-darbar.webp" alt="Shri Ram and Mata Sita enthroned at Ayodhya, with Lakshman, Bharat and Shatrughna standing behind and Hanumanji kneeling before them." fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl overflow-hidden px-4 sm:px-6" aria-labelledby="read">
        <h2 id="read" className="font-serif text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]">{s.read}</h2>
        <Book id="book-rcm" title={s.rcmH} intro={c.rcm_intro} cta={s.openRcm} href={rcmHref}
          items={index().kands.map((k) => ({ href: kandPath(lang, k.slug), art: k.slug, name: kandTitle(k, lang), line: (c.rcm_kands as Record<string, string>)[k.slug] }))} />
        <Book id="book-val" title={s.valH} intro={c.val_intro} cta={s.openVal} href={vHub(lang)}
          items={vIndex().kands.map((k) => ({ href: vKandPath(lang, k.slug), art: vArt[k.slug], name: vTitle(k, lang), line: (c.val_kands as Record<string, string>)[k.slug] }))} />
        <nav aria-label={s.popular} className="mt-8 flex flex-wrap gap-2">
          {s.pop.map(([label, href]) => (<Link key={href} href={href} className="press flex h-12 items-center rounded-full border border-border bg-surface px-5 hover:border-accent/40">{label}</Link>))}
        </nav>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6" aria-labelledby="today">
        <h2 id="today" className="font-serif text-[1.75rem] font-semibold tracking-tight">{s.today}</h2>
        <div className="mt-5"><VerseBlock verse={today.verse} lang={lang} size="lg" /></div>
        <p lang={lang} className={`${lang === "hi" ? "meaning-hi" : "meaning-en"} mt-4 whitespace-pre-line text-muted`}>{lang === "hi" ? today.verse.hi : englishForVerse(today.verse, today.en)}</p>
        <Link href={`${unitPath(lang, today.kand.slug, today.unit.slug)}#${today.verse.id}`} className="tap text-accent hover:text-accent-ink">{kandTitle(today.kand, lang)}, {lang === "hi" ? today.unit.label_hi : today.unit.label_en}</Link>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="feel">
        <h2 id="feel" className="font-serif text-[1.75rem] font-semibold tracking-tight">{s.feel}</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {feelings.map((f) => (
            <li key={f.id}>
              <Link href={feelingPath(lang, f.id)} className="press relative block aspect-square overflow-hidden rounded-3xl">
                <Image src={`/images/deity/${f.art}.webp`} alt="" fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover object-top" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-10 font-serif text-[1.1875rem] font-semibold text-white">{f[lang]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="app">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[#14213f] px-6 pt-10 text-white sm:px-12 md:grid-cols-2 md:py-0" data-app-cta>
          <div className="md:py-14">
            <h2 id="app" className="font-serif text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[3rem]">{s.app}</h2>
            <p className="mt-3 text-[1.125rem] text-white/70">{s.appSub}</p>
            <PlayButton place="home" className="mt-6 !bg-white !text-[#14213f]" />
          </div>
          <div className="flex h-80 justify-center gap-4 overflow-hidden sm:h-[28rem]" aria-hidden>
            <Phone src="/images/app/today.webp" alt="" className="mt-8 w-44 shrink-0 sm:w-56" />
            <Phone src="/images/app/read.webp" alt="" className="w-44 shrink-0 sm:mt-16 sm:w-56" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6" aria-labelledby="about">
        <h2 id="about" className="font-serif text-[1.75rem] font-semibold tracking-tight">{s.about}</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {c.faq.map((f, i) => (
            <details key={f.q} open={i === 0} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-serif text-[1.1875rem] font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <span aria-hidden className="text-[1.5rem] leading-none text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-2 text-[1.0625rem] leading-relaxed text-foreground">{f.a}</p>
              <Link href={f.href} className="tap mb-1 text-accent hover:text-accent-ink">{f.link}</Link>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
