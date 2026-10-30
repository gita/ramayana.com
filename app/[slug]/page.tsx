import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, articles } from "@/lib/articles";
import { Article } from "@/components/article";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const def = articleBySlug(slug);
  const meta = def && (await Article.meta(slug));
  if (!def || !meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${slug}`, types: { "text/markdown": `/${slug}.md` } },
    robots: def.noindex ? { index: false } : undefined,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: def.image.replace(/\.webp$/, "-og.jpg"),
          width: 1200,
          height: 630,
          alt: def.imageAlt,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = articleBySlug(slug);
  if (!def) notFound();
  const [meta, html] = await Promise.all([
    Article.meta(slug),
    Article.html(slug),
  ]);
  if (!meta || !html) notFound();
  const crumbs = [
    { name: "Home", url: "/" },
    { name: meta.title, url: `/${slug}` },
  ];
  const graph: Record<string, unknown>[] = [
    breadcrumb(crumbs),
    {
      "@type": def.type === "AboutPage" ? "AboutPage" : "Article",
      "@id": `${site.url}/${slug}#article`,
      headline: meta.title,
      description: meta.description,
      url: `${site.url}/${slug}`,
      image: `${site.url}${def.image.replace(/\.webp$/, "-og.jpg")}`,
      inLanguage: "en",
      isAccessibleForFree: true,
      author: { "@id": site.foundation.id },
      publisher: { "@id": site.foundation.id },
      dateModified: "2026-10-30",
      datePublished: "2026-10-30",
    },
  ];
  if (meta.faq.length)
    graph.push({
      "@type": "FAQPage",
      mainEntity: meta.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-gold">
            {def.eyebrow}
          </p>
          <h1 className="mt-2 max-w-[22ch] font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-tight sm:text-[3rem]">
            {meta.title}
          </h1>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-border lg:hidden">
            <Image
              src={def.image}
              alt={def.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div
            className="prose-ram mt-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <p className="mt-12 border-t border-border pt-5 text-[0.875rem] leading-relaxed text-muted">
            Written by the Ramayana.com editorial team of Ved Vyas Foundation
            from the sources named on this site, drafted with AI assistance and
            edited and checked by a person. Last reviewed 30 October 2026. Found
            an error? Write to {site.contact}.
          </p>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <figure className="overflow-hidden rounded-3xl ring-1 ring-border">
              <Image
                src={def.image}
                alt={def.imageAlt}
                width={704}
                height={880}
                priority
                sizes="22rem"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            {def.related && (
              <nav
                aria-label="Related"
                className="rounded-3xl border border-border bg-surface p-5"
              >
                <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
                  Continue
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {def.related.map((r) => (
                    <li key={r.href}>
                      {r.href.startsWith("http") ? (
                        <a
                          href={r.href}
                          className="text-[0.9375rem] text-accent hover:text-accent-ink"
                        >
                          {r.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={r.href}
                          className="text-[0.9375rem] text-accent hover:text-accent-ink"
                        >
                          {r.label} →
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
      {def.related && (
        <nav aria-label="Related" className="mt-12 lg:hidden">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
            Continue
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {def.related.map((r) => (
              <li key={r.href}>
                {r.href.startsWith("http") ? (
                  <a
                    href={r.href}
                    className="block rounded-2xl border border-border bg-surface px-4 py-3 text-accent"
                  >
                    {r.label} ↗
                  </a>
                ) : (
                  <Link
                    href={r.href}
                    className="block rounded-2xl border border-border bg-surface px-4 py-3 text-accent"
                  >
                    {r.label} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
