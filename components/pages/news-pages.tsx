import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { news, newsItem } from "@/lib/news";
import { site } from "@/lib/site";
import { JsonLd, breadcrumb, orgNode } from "@/components/json-ld";
import { LongPage } from "@/components/long-page";
import { AppCard } from "@/components/app-card";

const when = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const title = "Ramayana film news", desc = "News about the 2026 Ramayana film, read alongside the scripture it comes from.";
export const newsListMetadata: Metadata = { title, description: desc, alternates: { canonical: "/news" }, openGraph: { siteName: site.name, title, description: desc, images: [{ url: "/images/deity/ram-kodanda-og.jpg", width: 1200, height: 630 }] } };
export function NewsList() {
  const items = news();
  return (
    <div className="wrap pt-10">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb([{ name: "Home", url: "/" }, { name: "News", url: "/news" }])] }} />
      <div className="mx-auto max-w-[44rem]">
        <h1 className="t-display">{title}</h1>
        <p className="t-lede mt-4">{desc}</p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {items.map((n) => (
            <li key={n.slug}>
              <Link href={`/news/${n.slug}`} className="group block py-5">
                <time dateTime={n.date} className="text-[0.875rem] text-muted">{when(n.date)}</time>
                <h2 className="t-sub mt-1 group-hover:text-accent">{n.title}</h2>
                <p className="mt-1 text-[1.0625rem] leading-relaxed text-muted">{n.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function newsMetadata(slug: string): Metadata {
  const n = newsItem(slug);
  if (!n) return {};
  return { title: n.title, description: n.description, alternates: { canonical: `/news/${slug}` }, openGraph: { type: "article", siteName: site.name, title: n.title, description: n.description, publishedTime: n.date, images: [{ url: "/images/deity/ram-kodanda-og.jpg", width: 1200, height: 630 }] } };
}
export function NewsPage({ slug }: { slug: string }) {
  const n = newsItem(slug);
  if (!n) notFound();
  const crumbs = [{ name: "Home", url: "/" }, { name: "News", url: "/news" }, { name: n.title, url: `/news/${slug}` }];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb(crumbs), { "@type": "NewsArticle", headline: n.title, description: n.description, datePublished: n.date, dateModified: n.date, url: `${site.url}/news/${slug}`, image: [`${site.url}/images/deity/ram-kodanda-og.jpg`], author: { "@id": orgNode["@id"] }, publisher: { "@id": orgNode["@id"] }, inLanguage: "en" }] }} />
      <LongPage title={n.title} lede={n.description} crumbs={crumbs} related={[{ label: "The 2026 film and the original story", href: "/ramayana-movie" }, { label: "All film news", href: "/news" }, { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" }]}>
        <time dateTime={n.date} className="text-[0.9375rem] text-muted">{when(n.date)}</time>
        <div className="prose-ram mt-4" dangerouslySetInnerHTML={{ __html: (marked.parse(n.body, { async: false }) as string).replace(/<a href="https?:/g, (m) => m.replace("<a ", '<a target="_blank" rel="noopener" ')) }} />
        <AppCard place={`news-${slug}`} headline="Read the original in the app" className="mt-10" />
        <p className="mt-8 text-[0.9375rem] text-muted">Reported by {n.sources.map((s, i) => (<span key={s.url}>{i > 0 && ", "}<a href={s.url} target="_blank" rel="noopener" className="text-accent">{s.name}</a></span>))}. Ramayana.com is independent of the film.</p>
      </LongPage>
    </>
  );
}
