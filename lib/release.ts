import schedule from "@/content/release-schedule.json";

/**
 * Staged release of verse pages. Every page exists and can be read from day one.
 * Pages not yet released carry noindex and stay out of the sitemap. A batch goes
 * live on its date at the next deploy, which the daily GitHub Action triggers.
 * Set `pausedFrom` in content/release-schedule.json to hold the release.
 */
type Book = "rcm" | "val";
export const HOLD = { index: false, follow: true } as const;

const today = () => (process.env.RELEASE_NOW ?? new Date().toISOString()).slice(0, 10);

/** Is the unit at this 1-based position in its kand released? */
export function isReleased(book: Book, kand: string, position: number) {
  if (schedule.always.some((a) => a.book === book && a.kand === kand)) return true;
  const paused = schedule.pausedFrom as string | null;
  const now = paused && paused < today() ? paused : today();
  return schedule.batches.some((b) => b.date <= now && b.release.some((r) => r.book === book && r.kand === kand && r.through >= position));
}
