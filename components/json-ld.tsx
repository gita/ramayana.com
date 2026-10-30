import { site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const orgNode = {
  "@type": ["Organization", "NGO"],
  "@id": site.foundation.id,
  name: site.foundation.name,
  url: site.foundation.url,
  sameAs: [
    "https://bhagavadgita.com",
    "https://radhakrishna.com",
    "https://hanumanchalisa.net",
    site.app.android,
  ],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: ["en", "hi"],
  isAccessibleForFree: true,
  publisher: { "@id": site.foundation.id },
};

export const bookNode = (lang: "en" | "hi" = "en") => ({
  "@type": "Book",
  "@id": `${site.url}/ramcharitmanas#book`,
  name: lang === "hi" ? "श्रीरामचरितमानस" : "Shri Ramcharitmanas",
  alternateName: [
    "Ramcharitmanas",
    "Ram Charit Manas",
    "Tulsi Ramayan",
    "रामचरितमानस",
  ],
  author: {
    "@type": "Person",
    "@id": `${site.url}/tulsidas#person`,
    name: "Goswami Tulsidas",
    url: `${site.url}/tulsidas`,
  },
  inLanguage: "awa",
  url: `${site.url}/ramcharitmanas`,
  isAccessibleForFree: true,
  numberOfPages: 7,
  workExample: [
    {
      "@type": "Book",
      bookEdition: "Hindi tika by Hanuman Prasad Poddar",
      inLanguage: "hi",
      publisher: {
        "@type": "Organization",
        name: "Gita Press, Gorakhpur",
        url: site.gitaPress.home,
      },
      url: site.gitaPress.product,
    },
    {
      "@type": "Book",
      bookEdition:
        "Romanised edition with English translation",
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: "Gita Press, Gorakhpur",
        url: site.gitaPress.home,
      },
      url: site.gitaPress.category,
    },
  ],
});

export function OrgJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [orgNode, websiteNode],
      }}
    />
  );
}

export const breadcrumb = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.url}`,
  })),
});
