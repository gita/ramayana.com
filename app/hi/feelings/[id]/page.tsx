import { FeelingPage, feelingMetadata } from "@/components/pages/feeling-pages";
import { feelings } from "@/lib/feelings";
export const dynamicParams = false;
export function generateStaticParams() { return feelings.map((f) => ({ id: f.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return feelingMetadata("hi", id); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <FeelingPage lang="hi" id={id} />; }
