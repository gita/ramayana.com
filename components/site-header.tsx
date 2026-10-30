"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { MobileMenu } from "@/components/mobile-menu";
import { LanguageSwitch } from "@/components/language-switch";

const navHi = [
  { label: "रामचरितमानस", href: "/hi/ramcharitmanas" },
  { label: "वाल्मीकि रामायण", href: "/hi/valmiki-ramayana" },
  { label: "सुन्दरकाण्ड", href: "/hi/sunderkand" },
  { label: "2026 की फ़िल्म", href: "/ramayana-movie" },
  { label: "ऐप", href: "/app" },
];

export function SiteHeader() {
  const path = usePathname();
  const hi = path === "/hi" || path.startsWith("/hi/");
  const items = hi ? navHi : nav;
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href={hi ? "/hi" : "/"} className="press flex h-12 items-center gap-1.5 font-serif text-[1.25rem] font-semibold tracking-tight text-foreground">
          <span className="text-gold" aria-hidden>ॐ</span>
          <span>Ramayana<span className="text-muted font-normal">.com</span></span>
        </Link>
        <div className="flex items-center gap-5">
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 text-[0.9375rem] text-muted">
            {items.map((n) => (<Link key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</Link>))}
          </nav>
          <LanguageSwitch />
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
