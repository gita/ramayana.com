import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Ramayan app: the Ramcharitmanas offline, free, no ads",
  description:
    "The free Ramayan app from Ved Vyas Foundation: the complete Ramcharitmanas with Hindi and English meaning, offline, with reading plans, bookmarks and a daily verse. Android now, iPhone soon.",
  alternates: { canonical: "/app" },
};

const points = [
  [
    "The whole book, offline",
    "All seven kands with the Gita Press Hindi tika and English translation, inside the app. No connection needed.",
  ],
  [
    "Reading plans",
    "Navah parayan in nine days, maas parayan in thirty, or Sunderkand on its own. Pick a time and the app reminds you.",
  ],
  [
    "A verse every morning",
    "One verse a day, the same for everyone, with its meaning. Tap to read the whole doha.",
  ],
  [
    "Made to be read",
    "Tiro Devanagari for the verse, a clear heading for every meaning, text size that goes as large as you need.",
  ],
  [
    "No ads, no payments, no account",
    "Nothing to buy and nothing to sign up for. Your bookmarks and progress stay on your phone.",
  ],
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumb([
              { name: "Home", url: "/" },
              { name: "App", url: "/app" },
            ]),
            {
              "@type": "MobileApplication",
              name: site.app.name,
              operatingSystem: "Android",
              applicationCategory: "BookApplication",
              isAccessibleForFree: true,
              offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
              installUrl: site.app.android,
              author: { "@id": site.foundation.id },
              url: `${site.url}/app`,
            },
          ],
        }}
      />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
            The app
          </p>
          <h1 className="mt-2 font-serif text-[2.5rem] sm:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
            Ramayan, in your pocket
          </h1>
          <p className="mt-4 font-serif text-[1.1875rem] leading-relaxed text-muted">
            The same Ramcharitmanas as this site, offline, with plans and a
            daily verse. Free, with no ads and nothing to pay. Android today,
            iPhone to follow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.app.android}
              rel="noopener"
              className="press inline-flex h-12 items-center rounded-full bg-foreground px-6 text-[1rem] font-medium text-background"
            >
              Get it on Google Play
            </a>
            <Link
              href="/sunderkand"
              className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-[1rem] hover:border-accent/40"
            >
              Read on the web instead
            </Link>
          </div>
          <p className="mt-5 text-[0.875rem] text-muted">
            This website also installs as an app. In Chrome on Android choose
            Install app from the menu. On iPhone, Share, then Add to Home
            Screen.
          </p>
        </div>
        <figure className="relative aspect-[4/5] max-h-[34rem] overflow-hidden rounded-[1.75rem] ring-1 ring-gold/25">
          <Image
            src="/images/deity/hanuman-heart-darshan.webp"
            alt="Hanumanji showing Shri Ram and Mata Sita in his heart."
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </figure>
      </div>
      <section className="mt-16 max-w-3xl">
        <h2 className="font-serif text-[1.75rem] font-semibold">
          What it does
        </h2>
        <dl className="mt-5 divide-y divide-border rounded-3xl border border-border bg-surface">
          {points.map(([h, d]) => (
            <div key={h} className="px-5 py-4">
              <dt className="font-serif text-[1.1875rem] font-semibold">{h}</dt>
              <dd className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted">
                {d}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[0.9375rem] text-muted">
          <Link href="/privacy" className="text-accent">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/support" className="text-accent">
            Support
          </Link>
        </p>
      </section>
    </div>
  );
}
