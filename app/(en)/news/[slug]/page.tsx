import { NewsPage, newsMetadata } from "@/components/pages/news-pages";
import { news } from "@/lib/news";
export const dynamicParams = false;
export function generateStaticParams() { return news().map((n) => ({ slug: n.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return newsMetadata(slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <NewsPage slug={slug} />; }
