import Link from "next/link";
import { nav, site } from "@/lib/site";

/** Slim frosted header. The mobile menu is a native <details>, so the header ships no JavaScript. */
export function SiteHeader({ lang = "en" }: { lang?: "en" | "hi" }) {
  const home = lang === "hi" ? "/hi" : "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={home}
          className="press flex items-baseline gap-1.5 font-serif text-[1.25rem] font-semibold tracking-tight text-foreground"
          aria-label={`${site.name} home`}
        >
          <span className="text-gold" aria-hidden>
            ॐ
          </span>
          <span>
            Ramayana<span className="text-muted font-normal">.com</span>
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 text-[0.9375rem] text-muted"
        >
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <details className="md:hidden relative">
          <summary
            className="list-none cursor-pointer -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-black/10"
          >
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block rounded-xl px-4 py-3 text-[1.0625rem] text-foreground hover:bg-surface-2"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
