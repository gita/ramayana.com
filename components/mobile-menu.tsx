"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Closes after navigating and on a tap outside, which a bare <details> does not do. */
export function MobileMenu({ items }: { items: readonly { label: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
  return (
    <details ref={ref} className="md:hidden relative">
      <summary className="list-none cursor-pointer -mr-2 flex h-12 w-12 items-center justify-center rounded-full text-foreground [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </summary>
      <nav aria-label="Primary" className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-black/10">
        {items.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => { if (ref.current) ref.current.open = false; }} className="block rounded-xl px-4 py-3 text-[1.0625rem] text-foreground hover:bg-surface-2">{n.label}</Link>
        ))}
      </nav>
    </details>
  );
}
