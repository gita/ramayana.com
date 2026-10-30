import Image from "next/image";
import Link from "next/link";
import { englishForVerse, index, kandPath, kandTitle, unitPath, type Lang } from "@/lib/content";
import { dailyChaupai } from "@/lib/chaupai";
import { feelings, feelingPath } from "@/lib/feelings";
import { vArt, vHub, vIndex, vKandPath, vTitle } from "@/lib/valmiki";
import { JsonLd, bookNode } from "@/components/json-ld";
import { VerseBlock } from "@/components/reader";
import { Phone, PlayButton } from "@/components/app-card";
import { ContinueReading } from "@/components/progress";

const t = {
  en: { h1: "The official home of the Ramayana", sub: "Read every verse, with meaning. Free.", rcm: "Ramcharitmanas", val: "Valmiki Ramayana", today: "Today's verse", read: "Read", tulsi: "Goswami Tulsidas", valmiki: "Maharshi Valmiki", all: "Open the book", feel: "Read by feeling", app: "The Ramayana, in your pocket", appSub: "Free. No ads. Works offline." },
  hi: { h1: "रामायण का आधिकारिक घर", sub: "हर श्लोक, अर्थ सहित। निःशुल्क।", rcm: "रामचरितमानस", val: "वाल्मीकि रामायण", today: "आज का पद", read: "पढ़ें", tulsi: "गोस्वामी तुलसीदास", valmiki: "महर्षि वाल्मीकि", all: "ग्रंथ खोलें", feel: "भाव से पढ़ें", app: "रामायण, आपकी जेब में", appSub: "निःशुल्क। विज्ञापन नहीं। बिना इंटरनेट।" },
};
const pre = (l: Lang) => (l === "hi" ? "/hi" : "");

function Rail({ items }: { items: { href: string; art: string; name: string }[] }) {
  return (
    <ol className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6">
      {items.map((k) => (
        <li key={k.href} className="w-[68vw] max-w-[17rem] shrink-0 snap-start scroll-ml-4">
          <Link href={k.href} className="press relative block aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={`/images/kand/${k.art}.webp`} alt="" fill sizes="(min-width: 640px) 17rem, 68vw" className="object-cover object-[50%_30%]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-4 pt-14 font-serif text-[1.3125rem] font-semibold text-white">{k.name}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Five things: the two books, where you left off, today's verse, feelings, the app. */
export function HomePage({ lang }: { lang: Lang }) {
  const s = t[lang];
  const today = dailyChaupai();
  return (
    <div lang={lang}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [bookNode(lang)] }} />
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-serif text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[4rem]" style={{ textWrap: "balance" }}>{s.h1}</h1>
            <p className="mt-4 font-serif text-[1.25rem] leading-snug text-muted sm:text-[1.5rem]">{s.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${pre(lang)}/ramcharitmanas`} className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1.0625rem] font-medium text-white hover:bg-accent-ink">{s.rcm}</Link>
              <Link href={vHub(lang)} className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1.0625rem] font-medium text-white hover:bg-accent-ink">{s.val}</Link>
            </div>
            <ContinueReading lang={lang} />
          </div>
          <figure className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(60,40,10,0.35)]">
            <Image src="/images/hero/ram-darbar.webp" alt="Shri Ram and Mata Sita enthroned at Ayodhya, with Lakshman, Bharat and Shatrughna standing behind and Hanumanji kneeling before them." fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl overflow-hidden px-4 sm:px-6" aria-label={s.read}>
        <input type="radio" name="book" id="book-rcm" defaultChecked className="sr-only" />
        <input type="radio" name="book" id="book-val" className="sr-only" />
        <div className="book-seg grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1 sm:max-w-md">
          <label htmlFor="book-rcm" className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl px-2 text-center text-[0.9375rem] text-muted">{s.tulsi}</label>
          <label htmlFor="book-val" className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl px-2 text-center text-[0.9375rem] text-muted">{s.valmiki}</label>
        </div>
        <div className="book-panels">
          <div className="book-panel p-rcm"><Rail items={index().kands.map((k) => ({ href: kandPath(lang, k.slug), art: k.slug, name: kandTitle(k, lang) }))} /></div>
          <div className="book-panel p-val"><Rail items={vIndex().kands.map((k) => ({ href: vKandPath(lang, k.slug), art: vArt[k.slug], name: vTitle(k, lang) }))} /></div>
        </div>
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
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[#14213f] px-6 pt-10 text-white sm:px-12 md:grid-cols-2 md:py-0">
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
    </div>
  );
}
