import Image from "next/image";
import Link from "next/link";
import { englishForVerse, index, kandPath, unitPath } from "@/lib/content";
import { chaupais, chaupai, chaupaiPath, dailyChaupai } from "@/lib/chaupai";
import { site, trust } from "@/lib/site";
import { JsonLd, bookNode } from "@/components/json-ld";
import { VerseBlock } from "@/components/reader";

export default function Home() {
  const idx = index();
  const today = dailyChaupai();
  const picks = [
    "mangal-bhavan-amangal-hari",
    "hoihi-soi-jo-ram-rachi-rakha",
    "raghukul-reeti-sada-chali-aai",
    "kavan-so-kaj-kathin-jag-mahi",
    "dheeraj-dharam-mitra-aru-nari",
    "prabisi-nagar-kije-sab-kaja",
  ].map((s) => chaupai(s)!);
  return (
    <>
      <JsonLd
        data={{ "@context": "https://schema.org", "@graph": [bookNode("en")] }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
              {site.name} · {site.tagline}
            </p>
            <h1
              className="mt-3 font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-[3.75rem] lg:text-[4.25rem]"
              style={{ textWrap: "balance" }}
            >
              The Ramayana, complete, with meaning.
            </h1>
            <p className="mt-5 max-w-xl font-serif text-[1.1875rem] leading-relaxed text-muted sm:text-[1.3125rem]">
              Goswami Tulsidas's Ramcharitmanas, every chaupai and doha, with
              the Gita Press Hindi tika and English translation. The Valmiki
              Ramayana follows. Read in English or Hindi, on any phone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/sunderkand"
                className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1.0625rem] font-medium text-white hover:bg-accent-ink"
              >
                Read Sunderkand
              </Link>
              <Link
                href="/ramcharitmanas"
                className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-[1.0625rem] text-foreground hover:border-accent/40"
              >
                Open the Ramcharitmanas
              </Link>
            </div>
            <p className="mt-6 text-[0.9375rem] text-muted">{trust}</p>
          </div>
          <figure className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,hsl(46_68%_60%/0.25),transparent_70%)] blur-2xl"
              aria-hidden
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] ring-1 ring-gold/25 shadow-[0_30px_60px_-30px_rgba(60,40,10,0.35)]">
              <Image
                src="/images/hero/ram-darbar.webp"
                alt="Shri Ram and Mata Sita enthroned at Ayodhya, with Lakshman, Bharat and Shatrughna standing behind and Hanumanji kneeling before them."
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Today's verse */}
      <section
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        aria-labelledby="today"
      >
        <div className="rounded-[2rem] border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              id="today"
              className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold"
            >
              Today's verse ·{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
              })}
            </h2>
            <span className="text-[0.8125rem] text-faint">
              {today.kand.title_en} · {today.unit.label_en} · {today.theme}
            </span>
          </div>
          <div className="mt-5">
            <VerseBlock verse={today.verse} lang="en" size="lg" />
          </div>
          {today.en && (
            <p className="meaning-en mt-5 max-w-3xl whitespace-pre-line text-muted">
              {englishForVerse(today.verse, today.en)}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-4 text-[0.9375rem]">
            <Link
              href={chaupaiPath("en", today.slug)}
              className="text-accent hover:text-accent-ink"
            >
              Meaning in Hindi and English →
            </Link>
            <Link
              href={`${unitPath("en", today.kand.slug, today.unit.slug)}#${today.verse.id}`}
              className="text-accent hover:text-accent-ink"
            >
              Read it in context →
            </Link>
          </div>
        </div>
      </section>

      {/* Seven kands */}
      <section
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        aria-labelledby="kands"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="kands"
              className="font-serif text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]"
            >
              The seven kands
            </h2>
            <p className="mt-2 max-w-2xl text-[1.0625rem] text-muted">
              From the invocation in Bal Kand to Ram Rajya in Uttar Kand.{" "}
              {idx.totals.verses.toLocaleString("en-IN")} verses, each with its
              meaning.
            </p>
          </div>
          <Link
            href="/hi/ramcharitmanas"
            lang="hi"
            className="text-[1rem] text-accent hover:text-accent-ink"
          >
            हिंदी में पढ़ें →
          </Link>
        </div>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {idx.kands.map((k) => (
            <li key={k.slug} className={k.number === 5 ? "lg:col-span-2" : ""}>
              <Link
                href={kandPath("en", k.slug)}
                className="press group block h-full overflow-hidden rounded-3xl border border-border bg-surface hover:border-accent/40"
              >
                <div
                  className={`relative ${k.number === 5 ? "aspect-[2/1]" : "aspect-[16/10]"}`}
                >
                  <Image
                    src={`/images/kand/${k.slug}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-[0.75rem] uppercase tracking-[0.08em] text-faint">
                    Kand {k.number}
                  </p>
                  <h3 className="mt-0.5 font-serif text-[1.375rem] font-semibold leading-tight">
                    {k.title_en}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-muted" lang="hi">
                    {k.title_hi} · {k.dohas} दोहे
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Film */}
      <section
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        aria-labelledby="film"
      >
        <Link
          href="/ramayana-movie"
          className="press group grid overflow-hidden rounded-[2rem] border border-border bg-surface hover:border-accent/40 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div className="relative aspect-[4/5] sm:aspect-auto">
            <Image
              src="/images/deity/ram-kodanda.webp"
              alt="Shri Ram with the bow Kodanda."
              fill
              sizes="(min-width: 640px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
              Diwali 2026
            </p>
            <h2
              id="film"
              className="mt-2 font-serif text-[1.875rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]"
            >
              Watching Ramayana this Diwali? Read the original.
            </h2>
            <p className="mt-4 max-w-xl font-serif text-[1.125rem] leading-relaxed text-muted">
              Which text is the film based on, what happens in each of the seven
              kands, and where to start reading after the credits roll.
              Ramayana.com is independent of the film.
            </p>
            <span className="mt-6 inline-flex items-center text-[1rem] font-medium text-accent group-hover:text-accent-ink">
              The film and the scripture →
            </span>
          </div>
        </Link>
      </section>

      {/* Chaupais */}
      <section
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        aria-labelledby="chaupai"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="chaupai"
              className="font-serif text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]"
            >
              Chaupais every home knows
            </h2>
            <p className="mt-2 max-w-2xl text-[1.0625rem] text-muted">
              The lines sung at weddings, before journeys and in hard times,
              with their meaning and their place in the text.
            </p>
          </div>
          <Link
            href="/chaupai"
            className="text-[1rem] text-accent hover:text-accent-ink"
          >
            All {chaupais.length} →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((c) => (
            <li key={c.slug}>
              <Link
                href={chaupaiPath("en", c.slug)}
                className="press flex h-full flex-col rounded-3xl border border-border bg-surface px-6 py-5 hover:border-accent/40"
              >
                <span className="text-[0.75rem] uppercase tracking-[0.08em] text-faint">
                  {c.theme} · {c.kand.title_en}
                </span>
                <span lang="awa" className="verse mt-2 text-[1.25rem]">
                  {c.verse.text
                    .split("\n")
                    .find((l) => l.includes(c.title_hi.split(" ")[0])) ??
                    c.verse.text.split("\n")[0]}
                </span>
                <span className="mt-3 text-[0.9375rem] text-accent">
                  Meaning →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Two poets */}
      <section
        className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
        aria-labelledby="poets"
      >
        <h2
          id="poets"
          className="font-serif text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]"
        >
          Two poets, one story
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            {
              href: "/valmiki",
              img: "/images/authors/valmiki.webp",
              name: "Maharshi Valmiki",
              note: "The first poet. The Sanskrit Ramayana, about 24,000 shlokas in seven kandas. Reader in preparation.",
            },
            {
              href: "/tulsidas",
              img: "/images/authors/tulsidas.webp",
              name: "Goswami Tulsidas",
              note: "The Ramcharitmanas, begun in Ayodhya on Ram Navami 1574, in the language of the people. Read it here in full.",
            },
          ].map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="press group overflow-hidden rounded-3xl border border-border bg-surface hover:border-accent/40"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-5">
                <h3 className="font-serif text-[1.5rem] font-semibold">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-[1rem] leading-relaxed text-muted">
                  {p.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* App + Gita Press */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-surface px-6 py-8 sm:px-8">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
              On your phone
            </p>
            <h2 className="mt-2 font-serif text-[1.75rem] font-semibold leading-tight">
              The Ramayan app, free on Android
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              The same text, offline, with reading plans, bookmarks and a daily
              verse. No ads, no payments. iPhone soon. Or install this site: it
              works offline too.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.app.android}
                rel="noopener"
                className="press inline-flex h-11 items-center rounded-full bg-foreground px-5 text-[0.9375rem] font-medium text-background"
              >
                Get it on Google Play
              </a>
              <Link
                href="/app"
                className="inline-flex h-11 items-center px-2 text-[0.9375rem] text-accent hover:text-accent-ink"
              >
                About the app →
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-border bg-surface px-6 py-8 sm:px-8">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
              From the printed page
            </p>
            <h2 className="mt-2 font-serif text-[1.75rem] font-semibold leading-tight">
              Gita Press, Gorakhpur
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              The Hindi tika of Hanuman Prasad Poddar and the English
              translation on this site come from Gita Press editions, named
              under every page. Read here, then own the book.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.gitaPress.product}
                rel="noopener"
                className="press inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-[0.9375rem] text-foreground hover:border-accent/40"
              >
                Buy the Ramcharitmanas
              </a>
              <Link
                href="/gita-press"
                className="inline-flex h-11 items-center px-2 text-[0.9375rem] text-accent hover:text-accent-ink"
              >
                The editions we use →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
