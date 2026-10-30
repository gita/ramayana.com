import type { Metadata, Viewport } from "next";
import {
  Inter,
  Literata,
  Noto_Sans_Devanagari,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrgJsonLd } from "@/components/json-ld";
import { Pwa } from "@/components/pwa";
import { AppNudge } from "@/components/app-nudge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
  axes: ["opsz"],
});
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});
const notoDev = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-dev",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_ENV &&
      process.env.VERCEL_ENV !== "production" &&
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : site.url),
  ),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  verification: { other: { "msvalidate.01": "EF3B38F33E672B692B353CA5266FDA18" } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero/ram-darbar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Shri Ram and Mata Sita enthroned at Ayodhya, with Lakshman, Bharat and Shatrughna standing behind and Hanumanji kneeling before them.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  appleWebApp: { capable: true, title: "Ramayana", statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/icon-512.png", sizes: "512x512" },
      { url: "/favicon-32.png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${literata.variable} ${tiro.variable} ${notoDev.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <OrgJsonLd />
        <Pwa />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <AppNudge />
      </body>
    </html>
  );
}
