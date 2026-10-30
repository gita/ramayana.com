import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
const title = "Ramayana: Read Ramcharitmanas & Valmiki Ramayana in Hindi & English | Ramayana.com";
const description = "The official home of the Ramayana online. Read the complete Ramcharitmanas of Goswami Tulsidas and the Valmiki Ramayana, every verse with Hindi and English meaning. Free, no ads.";
export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/", languages: { en: "/", hi: "/hi", "x-default": "/" }, types: { "text/markdown": "/index.md" } }, openGraph: { title, description, siteName: "Ramayana.com", url: "/", locale: "en_IN", images: [{ url: "/images/hero/ram-darbar-og.jpg", width: 1200, height: 630 }] } };
export default function Page() { return <HomePage lang="en" />; }
