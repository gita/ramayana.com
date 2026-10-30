import { ChaupaiPage, chaupaiMetadata } from "@/components/pages/chaupai-pages";
import { chaupais } from "@/lib/chaupai";
export const dynamicParams = false;
export function generateStaticParams() { return chaupais.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return chaupaiMetadata("en", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ChaupaiPage lang="en" slug={slug} />; }
