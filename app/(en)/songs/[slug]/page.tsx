import { SongPage, songMetadata } from "@/components/pages/song-pages";
import { songs } from "@/lib/songs";
export const dynamicParams = false;
export function generateStaticParams() { return songs.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return songMetadata("en", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <SongPage lang="en" slug={slug} />; }
