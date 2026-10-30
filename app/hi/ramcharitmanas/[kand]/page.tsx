import { KandPage, kandMetadata } from "@/components/pages/reader-pages";
import { kandSlugs } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return kandSlugs().map((kand) => ({ kand })); }
export async function generateMetadata({ params }: { params: Promise<{ kand: string }> }) { const { kand } = await params; return kandMetadata("hi", kand); }
export default async function Page({ params }: { params: Promise<{ kand: string }> }) { const { kand } = await params; return <KandPage lang="hi" slug={kand} />; }
