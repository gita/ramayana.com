import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleBySlug, articles } from "@/lib/articles";
import { Article } from "@/components/article";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { site } from "@/lib/site";
import { AppCard } from "@/components/app-card";
import { LongPage } from "@/components/long-page";

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
    openGraph: { siteName: "Ramayana.com", 
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
  const showApp = !["privacy", "support"].includes(slug);
  const cut = html.indexOf("<h2", html.indexOf("<h2") + 1);
  const first = cut > 0 ? html.slice(0, cut) : html;
  const rest = cut > 0 ? html.slice(cut) : "";
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <LongPage title={meta.title} image={showApp ? def.image : undefined} imageAlt={def.imageAlt} crumbs={crumbs} related={def.related}>
        <div className="prose-ram" dangerouslySetInnerHTML={{ __html: first }} />
        {showApp && <AppCard place={slug} className="my-10" headline={slug === "ramayana-movie" ? "Watched the film? Read the original." : undefined} />}
        {rest && <div className="prose-ram" dangerouslySetInnerHTML={{ __html: rest }} />}
      </LongPage>
    </>
  );
}
