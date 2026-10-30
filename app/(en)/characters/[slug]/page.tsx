import { EntityPage, entityMetadata } from "@/components/pages/entity-pages";
import { entities } from "@/lib/entities";
export const dynamicParams = false;
export function generateStaticParams() { return entities("characters").map((e) => ({ slug: e.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return entityMetadata("characters", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <EntityPage kind="characters" slug={slug} />; }
