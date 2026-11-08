import { SongHub, songHubMetadata } from "@/components/pages/song-pages";
export const metadata = songHubMetadata("hi");
export default function Page() { return <SongHub lang="hi" />; }
