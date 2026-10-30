import { EntityPage, entityMetadata } from "@/components/pages/entity-pages";
import { entities } from "@/lib/entities";
export const dynamicParams = false;
export function generateStaticParams() { return entities("places").map((e) => ({ slug: e.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return entityMetadata("places", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <EntityPage kind="places" slug={slug} />; }
