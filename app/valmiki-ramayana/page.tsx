import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Valmiki Ramayana online: Sanskrit with Hindi and English, in preparation",
  description:
    "The complete Valmiki Ramayana, all seven kandas in Sanskrit with Hindi and English meaning, is being prepared for Ramayana.com. Read the Ramcharitmanas now, and about Maharshi Valmiki and his poem.",
  alternates: { canonical: "/valmiki-ramayana" },
};

const kandas = [
  [
    "Bala Kanda",
    "Shri Ram's birth and youth, Vishwamitra, Ahilya, the breaking of the bow, the wedding at Mithila",
  ],
  [
    "Ayodhya Kanda",
    "The planned coronation, Kaikeyi's boons, the exile, Dashrath's grief, Bharat at Chitrakoot",
  ],
  [
    "Aranya Kanda",
    "Forest life, Shurpanakha, the golden deer, Sita's abduction, Jatayu, Shabari",
  ],
  [
    "Kishkindha Kanda",
    "Hanuman and Sugriv, Bali, the monsoon, the search parties sent out",
  ],
  [
    "Sundara Kanda",
    "Hanuman crosses the sea, finds Sita in the Ashok Vatika, burns Lanka, returns",
  ],
  [
    "Yuddha Kanda",
    "The bridge, the war, Kumbhkaran and Indrajit, Ravan's fall, the return to Ayodhya",
  ],
  ["Uttara Kanda", "Ram Rajya, the later years, Lava and Kusha"],
];

export default function Page() {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Valmiki Ramayana", url: "/valmiki-ramayana" },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb(crumbs),
            {
              "@type": "Book",
              "@id": `${site.url}/valmiki-ramayana#book`,
              name: "Valmiki Ramayana",
              alternateName: [
                "Ramayanam",
                "Srimad Valmiki Ramayana",
                "वाल्मीकि रामायण",
              ],
              author: {
                "@type": "Person",
                name: "Maharshi Valmiki",
                url: `${site.url}/valmiki`,
              },
              inLanguage: "sa",
              url: `${site.url}/valmiki-ramayana`,
              isAccessibleForFree: true,
            },
          ],
        }}
      />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
            Maharshi Valmiki · the Adi Kavya
          </p>
          <h1 className="mt-2 font-serif text-[2.5rem] sm:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
            Valmiki Ramayana
          </h1>
          <p className="mt-4 font-serif text-[1.1875rem] leading-relaxed text-muted">
            The Sanskrit original, about 24,000 shlokas in seven kandas, is
            being prepared for this site with Hindi and English meaning, sarga
            by sarga, from named printed editions. It opens kanda by kanda over
            the coming weeks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ramcharitmanas"
              className="press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[1rem] font-medium text-white hover:bg-accent-ink"
            >
              Read the Ramcharitmanas now
            </Link>
            <Link
              href="/valmiki"
              className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-[1rem] hover:border-accent/40"
            >
              About Valmiki
            </Link>
          </div>
        </div>
        <figure className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] ring-1 ring-gold/25">
          <Image
            src="/images/authors/valmiki.webp"
            alt="Maharshi Valmiki in his forest ashram by the Tamasa river."
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
      <section className="mt-16 max-w-3xl">
        <h2 className="font-serif text-[1.75rem] font-semibold">
          The seven kandas
        </h2>
        <ol className="mt-5 divide-y divide-border rounded-3xl border border-border bg-surface">
          {kandas.map(([name, what], i) => (
            <li key={name} className="flex items-baseline gap-4 px-5 py-4">
              <span className="w-6 shrink-0 text-[0.8125rem] text-faint">
                {i + 1}
              </span>
              <div>
                <p className="font-serif text-[1.1875rem] font-semibold">
                  {name}{" "}
                  <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 align-middle text-[0.6875rem] font-sans font-medium uppercase tracking-[0.06em] text-muted">
                    Coming soon
                  </span>
                </p>
                <p className="mt-0.5 text-[0.9375rem] text-muted">{what}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[0.9375rem] text-muted">
          Until then:{" "}
          <Link
            href="/read-valmiki-ramayana-online"
            className="text-accent hover:text-accent-ink"
          >
            where to read the Valmiki Ramayana online
          </Link>
          , and{" "}
          <Link
            href="/who-wrote-the-ramayana"
            className="text-accent hover:text-accent-ink"
          >
            who wrote the Ramayana
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
