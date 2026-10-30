import Link from "next/link";
import { nav, site } from "@/lib/site";
import { MobileMenu } from "@/components/mobile-menu";

/** Slim frosted header. */
export function SiteHeader({ lang = "en" }: { lang?: "en" | "hi" }) {
  const home = lang === "hi" ? "/hi" : "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={home} className="press flex h-12 items-center gap-1.5 font-serif text-[1.25rem] font-semibold tracking-tight text-foreground" aria-label={`${site.name} home`}>
          <span className="text-gold" aria-hidden>ॐ</span>
          <span>Ramayana<span className="text-muted font-normal">.com</span></span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-[0.9375rem] text-muted">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</Link>
          ))}
        </nav>
        <MobileMenu items={nav} />
      </div>
    </header>
  );
}
