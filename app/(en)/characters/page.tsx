import { EntityHub, hubMetadata } from "@/components/pages/entity-pages";
export const metadata = hubMetadata("characters");
export default function Page() { return <EntityHub kind="characters" />; }
