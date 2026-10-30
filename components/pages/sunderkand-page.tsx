import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { kand, kandPath, unitPath, type Lang } from "@/lib/content";
import { site } from "@/lib/site";
import { JsonLd, bookNode, breadcrumb } from "@/components/json-ld";
import { SourceLine, UnitBody } from "@/components/reader";
import { Article } from "@/components/article";
import { AppCard } from "@/components/app-card";

export function sunderkandMetadata(lang: Lang): Metadata {
  const title =
    lang === "hi"
      ? "सुन्दरकाण्ड पाठ: सम्पूर्ण, हिंदी अर्थ सहित, निःशुल्क"
      : "Sunderkand: the complete path with Hindi and English meaning, free";
  const desc =
    lang === "hi"
      ? "श्रीरामचरितमानस का सम्पूर्ण सुन्दरकाण्ड, सभी 60 दोहे और चौपाइयाँ, हर पद के नीचे गीताप्रेस की हिंदी टीका। मोबाइल पर पढ़ें, पीडीएफ की ज़रूरत नहीं। निःशुल्क, विज्ञापन रहित।"
      : "The complete Sunderkand of Tulsidas's Ramcharitmanas, all 60 dohas and 343 verses with the Gita Press Hindi tika and English translation. Read on your phone, no PDF needed. Free, no ads.";
  return {
    title,
    description: desc,
    alternates: {
      canonical: lang === "hi" ? "/hi/sunderkand" : "/sunderkand",
      languages: {
        en: "/sunderkand",
        hi: "/hi/sunderkand",
        "x-default": "/sunderkand" }, types: { "text/markdown": lang === "hi" ? "/hi/sunderkand.md" : "/sunderkand.md" } },
    openGraph: { siteName: "Ramayana.com", 
      title,
      description: desc,
      images: [
        { url: "/images/kand/sunderkand-og.jpg", width: 1200, height: 630 },
      ],
    },
  };
}

/** The whole Sunderkand on one page: the paath form. Unit pages carry the same text with both languages. */
export async function SunderkandPage({ lang }: { lang: Lang }) {
  const k = kand("sunderkand")!;
  const hi = lang === "hi";
  const intro = lang === "en" ? await Article.html("sunderkand-intro") : null;
  const crumbs = [
    { name: hi ? "मुखपृष्ठ" : "Home", url: hi ? "/hi" : "/" },
    {
      name: hi ? "सुन्दरकाण्ड" : "Sunderkand",
      url: hi ? "/hi/sunderkand" : "/sunderkand",
    },
  ];
  const faq = hi
    ? []
    : [
        {
          q: "What is Sunderkand about?",
          a: "Sunderkand is the fifth kand of Tulsidas's Ramcharitmanas. Hanumanji leaps across the sea to Lanka, meets Vibhishan, finds Mata Sita in the Ashok Vatika and gives her Shri Ram's ring, burns Lanka, returns with her message, and Vibhishan takes refuge with Shri Ram, who then asks the ocean for a way across. It has 60 dohas.",
        },
        {
          q: "How long does a Sunderkand paath take?",
          a: "Read aloud at an unhurried pace, the whole kand takes about two to three hours. Many families split it across days, or read it in full on a Tuesday or Saturday. On this page every doha has an anchor, so you can stop and return to the same place.",
        },
        {
          q: "Why is Sunderkand read on Tuesdays and Saturdays?",
          a: "Tuesday and Saturday are the days associated with Hanumanji, and Sunderkand is the kand in which he is the hero. It is also read in times of difficulty, when a family wants courage, and at the start of something new.",
        },
        {
          q: "Is this the Gita Press Sunderkand?",
          a: "Yes. The text, the Hindi tika of Hanuman Prasad Poddar and the English translation all come from Gita Press, Gorakhpur editions. The printed book is linked at the end of this page.",
        },
      ];
  return (
    <div lang={lang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb(crumbs),
            {
              "@type": "Chapter",
              "@id": `${site.url}${hi ? "/hi" : ""}/sunderkand#chapter`,
              name: hi ? "सुन्दरकाण्ड" : "Sunderkand",
              alternateName: [
                "Sundar Kand",
                "Sundarkand",
                "Sundara Kanda",
                "सुंदरकांड",
              ],
              position: 5,
              isPartOf: bookNode(lang),
              isAccessibleForFree: true,
              inLanguage: hi ? ["awa", "hi"] : ["awa", "en"],
              url: `${site.url}${hi ? "/hi" : ""}/sunderkand`,
              publisher: { "@id": site.foundation.id },
            },
            ...(faq.length
              ? [
                  {
                    "@type": "FAQPage",
                    mainEntity: faq.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ]
              : []),
          ],
        }}
      />
      <div className="relative">
        <div className="art-fade relative aspect-[16/9] max-h-[56vh] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src="/images/kand/sunderkand.webp"
            alt=""
            fill
            preload fetchPriority="high" quality={60}
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
        <div className="relative mx-auto -mt-4 max-w-3xl px-4 sm:-mt-10 sm:px-6">
          <h1 className="mt-1 font-serif text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.5rem]">
            {hi ? "सुन्दरकाण्ड" : "Sunderkand"}
          </h1>
          <p className="mt-3 max-w-2xl font-serif text-[1.1875rem] leading-relaxed text-muted">
            {hi
              ? "सम्पूर्ण पाठ, अर्थ सहित।"
              : "The complete paath, with meaning."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#paath"
              className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
            >
              {hi ? "पाठ शुरू करें" : "Begin the paath"}
            </a>
            <Link
              href={kandPath(lang, "sunderkand")}
              className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-[1rem] text-foreground hover:border-accent/40"
            >
              {hi ? "दोहा-दर-दोहा पढ़ें" : "Read doha by doha"}
            </Link>
            
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {intro && (
          <div
            className="prose-ram mt-12"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        )}
        <nav aria-label={hi ? "दोहे" : "Dohas"} className="mt-12">
          <h2 className="t-title">
            {hi ? "दोहे" : "Jump to a doha"}
          </h2>
          <ol className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-10">
            {k.units.map((u) => (
              <li key={u.slug}>
                <a
                  href={`#${u.slug}`}
                  className="press flex h-11 items-center justify-center rounded-xl border border-border bg-surface text-[0.9375rem] tabular-nums text-foreground hover:border-accent/50 hover:text-accent"
                >
                  {u.n === 0 ? "ॐ" : u.slug.replace("doha-", "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div id="paath" className="mt-14 space-y-16 scroll-mt-20">
          {k.units.map((u) => (
            <section key={u.slug} id={u.slug} className="scroll-mt-20">
              <header className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h2 className="font-serif text-[1.375rem] font-semibold">
                  {hi ? u.label_hi : u.label_en}
                </h2>
                
              </header>
              {u.sections.length > 0 && (
                <p className="mb-6 font-serif text-[1.0625rem] text-muted">
                  {u.sections
                    .map((s) => (hi ? s.hi : s.en || s.hi))
                    .join(" · ")}
                </p>
              )}
              <UnitBody unit={u} lang={lang} anchorPrefix="v-" />
            </section>
          ))}
        </div>
        {faq.length > 0 && (
          <section className="mt-16">
            <h2 className="t-title">
              Questions people ask
            </h2>
            <dl className="mt-6 space-y-6">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-serif text-[1.25rem] font-semibold">
                    {f.q}
                  </dt>
                  <dd className="prose-ram mt-2 text-[1.125rem]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <AppCard place="reader" compact className="mt-10" />
<SourceLine lang={lang} />
      </div>
    </div>
  );
}
