"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { playUrl } from "@/lib/site";

const KEY = "app-nudge-dismissed";
const WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Floating install nudge. Appears once the reader has scrolled a little, never over
 * the first screen, so it stays clear of Google's intrusive interstitial guidance.
 * Android: a bar with an install button. Desktop: a card with a QR code. iPhone: nothing yet.
 */
export function AppNudge() {
  const [show, setShow] = useState(false);
  const [covered, setCovered] = useState(false);
  const [mode, setMode] = useState<"android" | "desktop" | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return;
    try {
      if (Date.now() - Number(localStorage.getItem(KEY) ?? 0) < WEEK) return;
    } catch {}
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    setMode(
      /Android/.test(ua)
        ? "android"
        : window.innerWidth >= 768
          ? "desktop"
          : "android",
    );
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Step aside while another app call to action or the footer is on screen.
    const seen = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    document.querySelectorAll("[data-app-cta], footer").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
  };
  if (!mode) return null;
  const moved = show && !covered ? "translate-y-0 opacity-100"
    : "pointer-events-none translate-y-6 opacity-0";
  const motion =
    "transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-opacity";
  const close = (
    <button
      onClick={dismiss}
      aria-label="Dismiss"
      className="press flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
  if (mode === "desktop") {
    return (
      <aside aria-label="Get the Ramayan app" className={`fixed bottom-5 right-5 z-40 ${moved} ${motion}`}>
        <a href={playUrl("floating-card")} target="_blank" rel="noopener" className="press flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 py-2 pl-2 pr-12 shadow-xl shadow-black/15 backdrop-blur-xl transition-shadow hover:shadow-black/25">
          <Image src="/images/app/install-qr.svg" alt="QR code to install the Ramayan app from Google Play" width={64} height={64} unoptimized className="rounded-lg" />
          <span className="leading-tight"><span className="block font-medium">Get the Ramayan app</span><span className="block text-[0.875rem] text-accent">Scan, or open Google Play</span></span>
        </a>
        <button onClick={dismiss} aria-label="Dismiss" className="press absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-foreground">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </aside>
    );
  }
  return (
    <aside
      aria-label="Get the Ramayan app"
      className={`fixed inset-x-3 z-40 flex items-center gap-3 rounded-[1.25rem] border border-white/50 bg-white/85 py-2 pl-2.5 pr-1.5 shadow-xl shadow-black/15 backdrop-blur-xl ${moved} ${motion}`}
      style={{ bottom: "max(12px, env(safe-area-inset-bottom, 0px))" }}
    >
      <Image
        src="/images/app/icon.webp"
        alt=""
        width={44}
        height={44}
        className="rounded-[0.7rem]"
      />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[0.9375rem] font-medium">Ramayan app</span>
        <span className="block text-[0.8125rem] text-muted">Free. No ads.</span>
      </span>
      <a
        href={playUrl("floating-bar")}
        target="_blank"
        rel="noopener"
        className="press flex h-10 shrink-0 items-center rounded-full bg-accent px-4 text-[0.9375rem] font-medium text-white"
      >
        Install
      </a>
      {close}
    </aside>
  );
}
