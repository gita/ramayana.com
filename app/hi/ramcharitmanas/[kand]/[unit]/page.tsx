import { UnitPage, unitMetadata } from "@/components/pages/reader-pages";
import { kand, kandSlugs } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return kandSlugs().flatMap((k) => kand(k)!.units.map((u) => ({ kand: k, unit: u.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ kand: string; unit: string }> }) { const p = await params; return unitMetadata("hi", p.kand, p.unit); }
export default async function Page({ params }: { params: Promise<{ kand: string; unit: string }> }) { const p = await params; return <UnitPage lang="hi" kandSlug={p.kand} unitSlug={p.unit} />; }
