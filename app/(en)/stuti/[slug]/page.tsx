import { StutiPage, stutiMetadata } from "@/components/pages/stuti-pages";
import { stutis } from "@/lib/stuti";
export const dynamicParams = false;
export function generateStaticParams() { return stutis.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return stutiMetadata("en", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <StutiPage lang="en" slug={slug} />; }
