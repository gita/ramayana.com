import Link from "next/link";
import { network, site, trust } from "@/lib/site";

const read = [
  { label: "Ramcharitmanas", href: "/ramcharitmanas" },
  { label: "Sunderkand", href: "/sunderkand" },
  { label: "Famous chaupais", href: "/chaupai" },
  { label: "Valmiki Ramayana", href: "/valmiki-ramayana" },
  { label: "हिंदी में पढ़ें", href: "/hi/ramcharitmanas" },
  { label: "The 2026 film", href: "/ramayana-movie" },
];
const about = [
  { label: "About", href: "/about" },
  { label: "How we verify the text", href: "/how-we-verify" },
  { label: "Gita Press editions", href: "/gita-press" },
  { label: "Acknowledgements", href: "/acknowledgements" },
  { label: "Android app", href: "/app" },
  { label: "Privacy", href: "/privacy" },
  { label: "Support", href: "/support" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <p className="font-serif text-[1.0625rem] text-foreground">{trust}</p>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
          Every meaning on this site is credited to its printed edition, with a
          link to buy the book. We publish the scripture so that people read it,
          and then go on to own it.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterCol title="Read" items={read} />
          <FooterCol title="About" items={about} />
          <div className="col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Ved Vyas Foundation
            </h2>
            <ul className="mt-3 space-y-2.5">
              {network.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group text-[0.9375rem] text-foreground hover:text-accent"
                  >
                    {n.label}{" "}
                    <span className="text-muted group-hover:text-accent/80">
                      · {n.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href={site.foundation.url} className="hover:text-foreground">
              {site.foundation.name}
            </a>
            . The Ramcharitmanas text and meanings follow the Gita Press,
            Gorakhpur editions named on each page.
          </p>
          <p>Ramayana.com is independent of the 2026 film and its makers.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
        {title}
      </h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-[0.9375rem] text-foreground hover:text-accent"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
