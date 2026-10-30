import { VSargaPage, vSargaMetadata } from "@/components/pages/valmiki-pages";
import { vIndex } from "@/lib/valmiki";
export const dynamicParams = false;
export function generateStaticParams() { return vIndex().kands.flatMap((k) => k.sargas["en"].map((s) => ({ kand: k.slug, sarga: `sarga-${s.n}` }))); }
export async function generateMetadata({ params }: { params: Promise<{ kand: string; sarga: string }> }) { const p = await params; return vSargaMetadata("en", p.kand, p.sarga); }
export default async function Page({ params }: { params: Promise<{ kand: string; sarga: string }> }) { const p = await params; return <VSargaPage lang="en" slug={p.kand} sarga={p.sarga} />; }
