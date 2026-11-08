import { SongHub, songHubMetadata } from "@/components/pages/song-pages";
export const metadata = songHubMetadata("en");
export default function Page() { return <SongHub lang="en" />; }
