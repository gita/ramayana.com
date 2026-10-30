import Link from "next/link";
import { marker, type Lang, type Unit, type Verse } from "@/lib/content";
import { site } from "@/lib/site";

const t = {
  en: {
    meaning: "Meaning",
    note: "Note",
    source_hi: "Hindi tika: Hanuman Prasad Poddar, Gita Press code 790",
    source_en: "English: Gita Press code 1318, Romanised edition (2019)",
    buy: "Buy the book from Gita Press",
    original: "Original text: Gita Press code 1318",
  },
  hi: {
    meaning: "भावार्थ",
    note: "टिप्पणी",
    source_hi: "हिंदी टीका: हनुमानप्रसाद पोद्दार, गीताप्रेस कोड ७९०",
    source_en: "अंग्रेज़ी: गीताप्रेस कोड १३१८",
    buy: "गीताप्रेस से पुस्तक खरीदें",
    original: "मूल पाठ: गीताप्रेस कोड १३१८",
  },
};

export function VerseBlock({
  verse,
  lang,
  size = "md",
  id,
}: {
  verse: Verse;
  lang: Lang;
  size?: "md" | "lg";
  id?: string;
}) {
  const m = marker[verse.type];
  return (
    <div
      id={id}
      className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-2 scroll-mt-20"
    >
      <span
        className="pt-[0.45em] font-dev text-[0.9375rem] text-faint select-none"
        aria-label={m.en}
      >
        {m.hi}
      </span>
      <p lang="awa" className={`verse ${size === "lg" ? "verse-lg" : ""}`}>
        {verse.text}
      </p>
    </div>
  );
}

function Meaning({
  children,
  lang,
  heading = true,
}: {
  children: React.ReactNode;
  lang: Lang;
  heading?: boolean;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-surface px-5 py-4 ring-1 ring-border/70">
      {heading && (
        <p
          className="mb-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-gold"
          lang={lang}
        >
          {t[lang].meaning}
        </p>
      )}
      <div lang={lang} className={lang === "hi" ? "meaning-hi" : "meaning-en"}>
        {children}
      </div>
    </div>
  );
}

/**
 * One reader unit (a doha group) laid out as the printed Gita Press page: in Hindi,
 * each verse followed by its tika; in English, a run of verses followed by the
 * translation block that covers them.
 */
export function UnitBody({
  unit,
  lang,
  anchorPrefix = "",
}: {
  unit: Unit;
  lang: Lang;
  anchorPrefix?: string;
}) {
  if (lang === "hi") {
    return (
      <div className="space-y-8">
        {unit.verses.map((v) => (
          <section
            key={v.id}
            id={`${anchorPrefix}${v.id}`}
            className="scroll-mt-20"
          >
            <VerseBlock verse={v} lang={lang} />
            {v.hi && (
              <Meaning lang="hi">
                <p className="whitespace-pre-line">{v.hi}</p>
                {v.notes_hi.map((n, i) => (
                  <p
                    key={i}
                    className="mt-3 text-[0.95em] text-muted whitespace-pre-line"
                  >
                    {n}
                  </p>
                ))}
              </Meaning>
            )}
          </section>
        ))}
      </div>
    );
  }
  // English: group verses by the presentation that covers them, in order.
  const groups: { verses: Verse[]; text: string | null }[] = [];
  const covered = new Map<string, number>();
  unit.en.forEach((p, i) => p.verses.forEach((id) => covered.set(id, i)));
  let current: number | null = null;
  for (const v of unit.verses) {
    const g = covered.get(v.id) ?? -1;
    if (current === null || g !== current) {
      groups.push({ verses: [], text: g >= 0 ? unit.en[g].text : null });
      current = g;
    }
    groups[groups.length - 1].verses.push(v);
  }
  return (
    <div className="space-y-10">
      {groups.map((g, i) => (
        <section key={i} className="scroll-mt-20">
          <div className="space-y-5">
            {g.verses.map((v) => (
              <VerseBlock
                key={v.id}
                verse={v}
                lang={lang}
                id={`${anchorPrefix}${v.id}`}
              />
            ))}
          </div>
          {g.text && (
            <Meaning lang="en">
              <p className="whitespace-pre-line">{g.text}</p>
            </Meaning>
          )}
        </section>
      ))}
    </div>
  );
}

export function SourceLine({ lang }: { lang: Lang }) {
  const s = t[lang];
  return (
    <aside className="mt-10 rounded-2xl border border-border bg-surface-2/60 px-5 py-4 text-[0.875rem] leading-relaxed text-muted">
      <p>
        {s.original}. {lang === "hi" ? s.source_hi : s.source_en}.
      </p>
      <p className="mt-1">
        <a
          href={site.gitaPress.product}
          className="font-medium text-accent hover:text-accent-ink"
          rel="noopener"
        >
          {s.buy} →
        </a>
      </p>
    </aside>
  );
}

export function UnitNav({
  lang,
  prev,
  next,
  up,
}: {
  lang: Lang;
  up: { href: string; label: string };
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
}) {
  return (
    <nav
      aria-label={lang === "hi" ? "पढ़ने का क्रम" : "Reading order"}
      className="mt-10 grid grid-cols-3 gap-2 text-[0.9375rem]"
    >
      <NavCell
        item={prev}
        align="left"
        hint={lang === "hi" ? "पिछला" : "Previous"}
      />
      <Link
        href={up.href}
        className="press flex items-center justify-center rounded-2xl border border-border bg-surface px-3 py-3 text-center text-muted hover:text-foreground"
      >
        {up.label}
      </Link>
      <NavCell
        item={next}
        align="right"
        hint={lang === "hi" ? "अगला" : "Next"}
      />
    </nav>
  );
}
function NavCell({
  item,
  align,
  hint,
}: {
  item: { href: string; label: string } | null;
  align: "left" | "right";
  hint: string;
}) {
  if (!item) return <span />;
  return (
    <Link
      href={item.href}
      className={`press flex flex-col rounded-2xl border border-border bg-surface px-4 py-3 hover:border-accent/40 ${align === "right" ? "items-end text-right" : ""}`}
    >
      <span className="text-[0.75rem] uppercase tracking-[0.06em] text-faint">
        {align === "left" ? "← " : ""}
        {hint}
        {align === "right" ? " →" : ""}
      </span>
      <span className="font-medium text-foreground">{item.label}</span>
    </Link>
  );
}
