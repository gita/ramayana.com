import Image from "next/image";
import Link from "next/link";

/** One layout for every article-style page: a centred reading column, the painting wider than the text. */
export function LongPage({ title, lede, image, imageAlt, wide = true, crumbs, children, related }: { title: string; lede?: string; image?: string; imageAlt?: string; wide?: boolean; crumbs: { name: string; url: string }[]; children: React.ReactNode; related?: { label: string; href: string }[] }) {
  return (
    <article className="wrap pt-6">
      <div className="mx-auto max-w-[44rem]">
        <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            {crumbs.slice(0, -1).map((c, i) => (<li key={c.url} className="flex items-center gap-1.5">{i > 0 && <span aria-hidden>›</span>}<Link href={c.url} className="hover:text-foreground">{c.name}</Link></li>))}
          </ol>
        </nav>
        <h1 className="t-title mt-2 !text-[clamp(2.25rem,5.5vw,3.5rem)]">{title}</h1>
        {lede && <p className="t-lede mt-4">{lede}</p>}
      </div>
      {image && (
        <figure className={`relative mx-auto mt-8 overflow-hidden rounded-3xl ${wide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3] max-w-[44rem]"}`}>
          <Image src={image} alt={imageAlt ?? ""} fill preload fetchPriority="high" quality={60} sizes="(min-width: 1168px) 1120px, 100vw" className="object-cover object-[50%_25%]" />
        </figure>
      )}
      <div className="mx-auto mt-10 max-w-[44rem]">
        {children}
        {related && related.length > 0 && (
          <nav aria-label="Continue reading" className="mt-14 border-t border-border pt-6">
            <h2 className="t-sub">Continue reading</h2>
            <ul className="mt-2 divide-y divide-border">
              {related.map((r) => (
                <li key={r.href}>
                  {r.href.startsWith("http") ? <a href={r.href} target="_blank" rel="noopener" className="flex min-h-14 items-center justify-between gap-4 text-foreground hover:text-accent">{r.label}<span aria-hidden className="text-faint">↗</span></a> : <Link href={r.href} className="flex min-h-14 items-center justify-between gap-4 text-foreground hover:text-accent">{r.label}<span aria-hidden className="text-faint">›</span></Link>}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
