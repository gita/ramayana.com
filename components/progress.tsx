"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Last = { href: string; label: string };
const LAST = "rm-last", READ = "rm-read";
const get = <T,>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) ?? "") as T; } catch { return d; } };
const set = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

/** Remembers the place and marks this unit read. Stays on the reader's own device. */
export function TrackRead({ id, href, label }: { id: string; href: string; label: string }) {
  useEffect(() => {
    set(LAST, { href, label });
    const read = get<string[]>(READ, []);
    if (!read.includes(id)) set(READ, [...read, id]);
  }, [id, href, label]);
  return null;
}

export function ContinueReading({ lang }: { lang: "en" | "hi" }) {
  const [last, setLast] = useState<Last | null>(null);
  useEffect(() => setLast(get<Last | null>(LAST, null)), []);
  if (!last) return null;
  return (
    <Link href={last.href} className="press mt-5 flex items-center justify-between gap-3 rounded-2xl bg-accent-soft px-5 py-3.5 text-accent-ink">
      <span><span className="block text-[0.875rem]">{lang === "hi" ? "जहाँ छोड़ा था" : "Continue reading"}</span><span className="font-medium">{last.label}</span></span>
      <span aria-hidden>→</span>
    </Link>
  );
}

/** Progress for one kand: a thin bar, and read numbers tinted in the grid below it. */
export function KandProgress({ prefix, total, lang }: { prefix: string; total: number; lang: "en" | "hi" }) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const read = get<string[]>(READ, []).filter((x) => x.startsWith(prefix));
    setDone(read.length);
    read.forEach((id) => document.querySelector(`[data-unit="${id}"]`)?.classList.add("is-read"));
  }, [prefix]);
  if (!done) return null;
  return (
    <div className="mt-4" aria-label={lang === "hi" ? `${total} में से ${done} पढ़े` : `${done} of ${total} read`}>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(3, (done / total) * 100)}%` }} /></div>
      <p className="mt-1.5 text-[0.875rem] text-muted">{lang === "hi" ? `${total} में से ${done} पढ़े` : `${done} of ${total} read`}</p>
    </div>
  );
}
