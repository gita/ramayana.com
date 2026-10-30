import Image from "next/image";
import { playUrl, site } from "@/lib/site";

export function PlayButton({
  place,
  className = "",
}: {
  place: string;
  className?: string;
}) {
  return (
    <a
      href={playUrl(place)}
      target="_blank"
      rel="noopener"
      className={`press inline-flex h-12 items-center gap-2.5 rounded-full bg-foreground px-6 text-[1rem] font-medium text-background ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 3.5v17a1 1 0 0 0 1.5.86l14.6-8.5a1 1 0 0 0 0-1.72L5.5 2.64A1 1 0 0 0 4 3.5Z" />
      </svg>
      Get the app
    </a>
  );
}

export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] bg-[#1b1b1f] p-[5px] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.5)] ${className}`}>
      <Image src={src} alt={alt} width={320} height={693} sizes="(min-width: 768px) 240px, 45vw" className="block h-auto w-full rounded-[1.45rem]" />
    </div>
  );
}

/** The app nudge. Real app screens, one line, one button. */
export function AppCard({
  place,
  headline = "Read it in the Ramayan app",
  compact = false,
  className = "",
}: {
  place: string;
  headline?: string;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <a
        href={playUrl(place)}
        target="_blank"
        rel="noopener"
        className={`press flex items-center gap-4 rounded-2xl bg-surface px-4 py-3.5 ring-1 ring-border/70 ${className}`}
      >
        <Image
          src="/images/app/icon.webp"
          alt=""
          width={52}
          height={52}
          className="rounded-[0.8rem]"
        />
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-foreground">Ramayan app</span>
          <span className="block text-[0.875rem] text-muted">
            Free. No ads. Works offline.
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-accent px-4 py-2 text-[0.9375rem] font-medium text-white">
          Install
        </span>
      </a>
    );
  }
  return (
    <aside
      aria-label={site.app.name}
      className={`relative overflow-hidden rounded-[1.75rem] bg-[#14213f] text-white ${className}`}
    >
      <div className="px-6 pt-7 sm:px-8 sm:pt-8">
        <h2 className="font-serif text-[1.625rem] font-semibold leading-tight tracking-tight">
          {headline}
        </h2>
        <p className="mt-1.5 text-[1rem] text-white/70">
          Free. No ads. Works offline.
        </p>
        <a
          href={playUrl(place)}
          target="_blank"
          rel="noopener"
          className="press mt-5 inline-flex h-12 items-center rounded-full bg-white px-6 font-medium text-[#14213f]"
        >
          Get the app
        </a>
      </div>
      <div
        className="mt-6 flex h-52 justify-center gap-3 overflow-hidden px-6"
        aria-hidden
      >
        <Phone
          src="/images/app/today.webp"
          alt=""
          className="w-36 shrink-0 sm:w-40"
        />
        <Phone
          src="/images/app/reader.webp"
          alt=""
          className="mt-6 w-36 shrink-0 sm:w-40"
        />
      </div>
    </aside>
  );
}
