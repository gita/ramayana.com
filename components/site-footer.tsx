"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { network, site, trust } from "@/lib/site";
import { PlayButton } from "@/components/app-card";

const read = [
  { label: "Ramcharitmanas", href: "/ramcharitmanas" },
  { label: "Valmiki Ramayana", href: "/valmiki-ramayana" },
  { label: "Sunderkand", href: "/sunderkand" },
  { label: "Chaupai", href: "/chaupai" },
  { label: "Characters", href: "/characters" },
  { label: "Places", href: "/places" },
  { label: "Film news", href: "/news" },
];
const more = [
  { label: "About", href: "/about" },
  { label: "Gita Press", href: "/gita-press" },
  { label: "Acknowledgements", href: "/acknowledgements" },
  { label: "Privacy", href: "/privacy" },
  { label: "Support", href: "/support" },
];

const readHi = [
  { label: "रामचरितमानस", href: "/hi/ramcharitmanas" },
  { label: "वाल्मीकि रामायण", href: "/hi/valmiki-ramayana" },
  { label: "सुन्दरकाण्ड", href: "/hi/sunderkand" },
  { label: "चौपाई", href: "/hi/chaupai" },
  { label: "पात्र", href: "/characters" },
  { label: "स्थान", href: "/places" },
];
const moreHi = [
  { label: "परिचय", href: "/about" },
  { label: "गीताप्रेस", href: "/gita-press" },
  { label: "आभार", href: "/acknowledgements" },
  { label: "गोपनीयता", href: "/privacy" },
  { label: "सहायता", href: "/support" },
];

export function SiteFooter() {
  const path = usePathname();
  const hi = path === "/hi" || path.startsWith("/hi/");
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#14213f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_85%_0%,rgba(214,170,70,0.2),transparent_65%)]" aria-hidden />
      <div className="relative wrap pb-24 pt-14 md:pb-10">
        <p lang="awa" className="font-verse text-[1.75rem] leading-snug text-[#f0d48f] sm:text-[2.25rem]">मंगल भवन अमंगल हारी</p>
        <p className="mt-3 text-[1rem] text-white/70">{hi ? "निःशुल्क। विज्ञापन नहीं। कोई भुगतान नहीं। वेदव्यास फ़ाउंडेशन की गैर-लाभकारी परियोजना।" : trust}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PlayButton place="footer" className="!bg-white !text-[#14213f]" />
          <a href={site.gitaPress.product} target="_blank" rel="noopener" className="press inline-flex h-12 items-center rounded-full px-6 text-white ring-1 ring-white/30">{hi ? "पुस्तक खरीदें" : "Buy the book"}</a>
        </div>
        <nav aria-label="Footer" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3">
          <FooterCol items={hi ? readHi : read} />
          <FooterCol items={hi ? moreHi : more} />
          <ul>
            {network.map((n) => (
              <li key={n.href}><a href={n.href} target="_blank" rel="noopener" className="text-[0.9375rem] text-white/80 hover:text-white">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-[0.875rem] text-white/60">
          © {new Date().getFullYear()} <a href={site.foundation.url} target="_blank" rel="noopener" className="hover:text-white">{site.foundation.name}</a>
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ items }: { items: readonly { label: string; href: string }[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.href}><Link href={i.href} className="text-[0.9375rem] text-white/80 hover:text-white">{i.label}</Link></li>
      ))}
    </ul>
  );
}
