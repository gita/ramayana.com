"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BILINGUAL = /^\/(ramcharitmanas|valmiki-ramayana|sunderkand|chaupai|feelings)(\/|$)/;

/** The site's only language control. Stays on the same page where a translation exists. */
export function LanguageSwitch() {
  const path = usePathname();
  const hi = path === "/hi" || path.startsWith("/hi/");
  const base = hi ? path.slice(3) || "/" : path;
  const en = base;
  const hiHref = base === "/" ? "/hi" : BILINGUAL.test(base) ? `/hi${base}` : "/hi";
  useEffect(() => { document.documentElement.lang = hi ? "hi" : "en"; }, [hi]);
  const cell = (on: boolean) => `flex h-8 min-w-11 items-center justify-center rounded-full px-2.5 text-[0.875rem] transition-colors ${on ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"}`;
  return (
    <div role="group" aria-label="Language" className="flex rounded-full bg-surface-2 p-0.5">
      <Link href={en} prefetch={false} hrefLang="en" aria-current={!hi ? "true" : undefined} className={cell(!hi)}>EN</Link>
      <Link href={hiHref} prefetch={false} hrefLang="hi" lang="hi" style={{ fontFamily: "system-ui, sans-serif" }} aria-current={hi ? "true" : undefined} className={cell(hi)}>हिंदी</Link>
    </div>
  );
}
