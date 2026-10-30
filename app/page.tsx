import { HomePage } from "@/components/pages/home";
export const metadata = { alternates: { canonical: "/", languages: { en: "/", hi: "/hi", "x-default": "/" }, types: { "text/markdown": "/index.md" } } };
export default function Page() { return <HomePage lang="en" />; }
