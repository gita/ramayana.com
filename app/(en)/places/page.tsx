import { EntityHub, hubMetadata } from "@/components/pages/entity-pages";
export const metadata = hubMetadata("places");
export default function Page() { return <EntityHub kind="places" />; }
