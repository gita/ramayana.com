/**
 * Single source of truth for site metadata, navigation and the foundation's network.
 * Metadata, JSON-LD, sitemap, header and footer all derive from here.
 */
export const site = {
  name: "Ramayana.com",
  domain: "ramayana.com",
  url: "https://ramayana.com",
  tagline: "The official home of the Ramayana online",
  description:
    "Read the complete Ramcharitmanas of Goswami Tulsidas with Hindi and English meaning, verse by verse, and the Valmiki Ramayana. Free, no ads, no payments. A Ved Vyas Foundation project.",
  foundation: {
    name: "Ved Vyas Foundation",
    url: "https://vedvyas.com",
    id: "https://vedvyas.com/#organization",
  },
  app: {
    android:
      "https://play.google.com/store/apps/details?id=com.ramayana.ramcharitmanas",
    name: "Ramayan: Ramcharitmanas Hindi",
  },
  gitaPress: {
    product: "https://gitapress.org/product/sri-ramcharitmanas-special-edition",
    category:
      "https://gitapressbookshop.in/?route=product/category&language=en-gb&path=83",
    home: "https://gitapress.org",
  },
  contact: "contact@bhagavadgita.io",
  indexNowKey: "07b923ade2fa10960745ae1211116197",
} as const;

/** Play Store link tagged with where the tap came from, so installs can be measured per placement. */
export const playUrl = (place: string) => `${site.app.android}&referrer=${encodeURIComponent(`utm_source=ramayana.com&utm_medium=web&utm_content=${place}`)}`;

export const nav = [
  { label: "Ramcharitmanas", href: "/ramcharitmanas" },
  { label: "Valmiki Ramayana", href: "/valmiki-ramayana" },
  { label: "Sunderkand", href: "/sunderkand" },
  { label: "The 2026 film", href: "/ramayana-movie" },
  { label: "App", href: "/app" },
] as const;

export const network = [
  {
    label: "Bhagavad Gita",
    note: "The Gita, verse by verse",
    href: "https://bhagavadgita.com",
  },
  {
    label: "Radha Krishna",
    note: "Stories, prayers and festivals",
    href: "https://radhakrishna.com",
  },
  {
    label: "Hanuman Chalisa",
    note: "Chant along, with meaning",
    href: "https://hanumanchalisa.net",
  },
  {
    label: "Ved Vyas Foundation",
    note: "The family of free scripture sites",
    href: "https://vedvyas.com",
  },
] as const;

/** Trust line, shown in the footer and on the home page. Exact wording is a house rule. */
export const trust =
  "Free. No ads. No payments. A non-profit project of Ved Vyas Foundation.";
