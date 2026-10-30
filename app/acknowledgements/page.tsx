import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Acknowledgements: the editions, people and tools behind the text",
  description:
    "The printed editions, publishers, commentators, datasets and artists whose work Ramayana.com rests on, with links to buy the books.",
  alternates: { canonical: "/acknowledgements" },
};

const rows: [string, string, string?][] = [
  [
    "Shri Ramcharitmanas, original text and English translation",
    "Gita Press, Gorakhpur. Publication code 1318, Romanised edition with English translation, revised edition prepared by J.P. Agarwal, sixteenth reprint 2019. The English Ramayana Aarti is rendered by Madhava Sharana. The first consolidated English edition appeared in 1968.",
    site.gitaPress.category,
  ],
  [
    "Shri Ramcharitmanas, Hindi tika",
    "Gita Press, Gorakhpur. Publication code 790, Hindi tika by Hanuman Prasad Poddar, fifth reprint, Vikram Samvat 2073.",
    site.gitaPress.product,
  ],
  [
    "Goswami Tulsidas",
    "The author of the Ramcharitmanas, composed in Awadhi from Vikram Samvat 1631 (1574 CE).",
  ],
  ["Gobind Bhavan Karyalaya, Kolkata", "The publishing trust of Gita Press."],
  [
    "Section titles",
    "The 218 topic headings follow the contents of the Gita Press editions, in Hindi from code 790 and in English from code 1318.",
  ],
  [
    "Paintings",
    "Original devotional art commissioned by Ved Vyas Foundation for the Ramayan app and this site, in the manner of Raja Ravi Varma and the Kangra school. No film imagery is used.",
  ],
  [
    "Typefaces",
    "Literata and Inter for Latin text, Tiro Devanagari Hindi for the verse, Noto Sans Devanagari for Hindi meaning and interface, all under the SIL Open Font License.",
  ],
  [
    "Verification",
    "AI-assisted transcription of the printed pages, with disagreements adjudicated against the page image. It is not a human editorial certification. See how we verify the text.",
  ],
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb([
              { name: "Home", url: "/" },
              { name: "Acknowledgements", url: "/acknowledgements" },
            ]),
          ],
        }}
      />
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
        Ramayana.com
      </p>
      <h1 className="mt-2 font-serif text-[2.25rem] sm:text-[3rem] font-semibold leading-[1.08] tracking-tight">
        Acknowledgements
      </h1>
      <p className="mt-4 font-serif text-[1.1875rem] leading-relaxed text-muted">
        Nothing on this site is ours alone. The scripture is Tulsidas's, the
        meanings are Gita Press's, and the site exists so that readers go on to
        own the books. Every page names its edition, and this page gathers them.
      </p>
      <dl className="mt-10 divide-y divide-border rounded-3xl border border-border bg-surface">
        {rows.map(([h, d, href]) => (
          <div key={h} className="px-5 py-4">
            <dt className="font-serif text-[1.1875rem] font-semibold">{h}</dt>
            <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
              {d}
              {href && (
                <>
                  {" "}
                  <a
                    href={href}
                    rel="noopener"
                    className="text-accent hover:text-accent-ink"
                  >
                    Buy the book →
                  </a>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-[0.9375rem] text-muted">
        Ramayana.com is a non-profit project of{" "}
        <a href={site.foundation.url} className="text-accent">
          {site.foundation.name}
        </a>
        . It is free, carries no advertising and takes no payments. Read{" "}
        <Link href="/gita-press" className="text-accent">
          about the Gita Press editions
        </Link>{" "}
        and{" "}
        <Link href="/how-we-verify" className="text-accent">
          how the text was checked
        </Link>
        .
      </p>
    </div>
  );
}
