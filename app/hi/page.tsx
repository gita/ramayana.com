import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
const title = "Ramayana.com · रामायण का आधिकारिक घर";
const description = "श्रीरामचरितमानस और वाल्मीकि रामायण, हर श्लोक हिंदी अर्थ सहित। निःशुल्क, विज्ञापन रहित।";
export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/hi", languages: { en: "/", hi: "/hi", "x-default": "/" } }, openGraph: { title, description, siteName: "Ramayana.com", locale: "hi_IN", images: [{ url: "/images/hero/ram-darbar-og.jpg", width: 1200, height: 630 }] } };
export default function Page() { return <HomePage lang="hi" />; }
