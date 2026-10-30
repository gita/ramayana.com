import { VKandPage, vKandMetadata } from "@/components/pages/valmiki-pages";
import { vIndex } from "@/lib/valmiki";
export const dynamicParams = false;
export function generateStaticParams() { return vIndex().kands.map((k) => ({ kand: k.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ kand: string }> }) { const { kand } = await params; return vKandMetadata("hi", kand); }
export default async function Page({ params }: { params: Promise<{ kand: string }> }) { const { kand } = await params; return <VKandPage lang="hi" slug={kand} />; }
