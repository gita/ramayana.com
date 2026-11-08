/**
 * Registry of markdown article pages at the site root. The body lives in
 * content/articles/<slug>.md.
 */
export type ArticleDef = {
  slug: string;
  image: string; // under /images, 16:9 or portrait
  imageAlt: string;
  eyebrow: string;
  type: "Article" | "AboutPage" | "FAQPage";
  related?: { label: string; href: string }[];
  noindex?: boolean;
};

export const articles: ArticleDef[] = [
  {
    slug: "why-did-ravan-kidnap-sita",
    image: "/images/kand/aranya-kand.webp",
    imageAlt: "Panchavati in the forest, the setting of Aranya Kand.",
    eyebrow: "Aranya Kand",
    type: "Article",
    related: [
      { label: "Characters: Ravan", href: "/characters/ravan" },
      { label: "Aranya Kand", href: "/ramcharitmanas/aranya-kand" },
      { label: "The 2026 Ramayana film", href: "/ramayana-movie" },
    ],
  },
  {
    slug: "was-ravan-at-sita-swayamvar",
    image: "/images/kand/bal-kand.webp",
    imageAlt: "Shri Ram with Shiv's bow in King Janak's assembly.",
    eyebrow: "Bal Kand",
    type: "Article",
    related: [
      { label: "Mata Sita", href: "/characters/sita" },
      { label: "Janakpur", href: "/places/janakpur" },
      { label: "Bal Kand", href: "/ramcharitmanas/bal-kand" },
    ],
  },
  {
    slug: "surpanakha",
    image: "/images/kand/aranya-kand.webp",
    imageAlt: "The forest of Panchavati.",
    eyebrow: "Characters",
    type: "Article",
    related: [
      { label: "Panchavati", href: "/places/panchavati" },
      { label: "Ravan", href: "/characters/ravan" },
      { label: "Why did Ravan kidnap Sita?", href: "/why-did-ravan-kidnap-sita" },
    ],
  },
  {
    slug: "lakshman-avatar",
    image: "/images/deity/lakshman.webp",
    imageAlt: "Shri Ram, Mata Sita and Lakshmanji in the forest, with Hanumanji at their feet.",
    eyebrow: "Characters",
    type: "Article",
    related: [
      { label: "Lakshman", href: "/characters/lakshman" },
      { label: "Urmila", href: "/characters/urmila" },
      { label: "Shri Ram", href: "/characters/ram" },
    ],
  },
  {
    slug: "ravan-boon",
    image: "/images/kand/lanka-kand.webp",
    imageAlt: "The bridge to Lanka built by the vanara army.",
    eyebrow: "Characters",
    type: "Article",
    related: [
      { label: "Ravan", href: "/characters/ravan" },
      { label: "Lanka", href: "/places/lanka" },
      { label: "Why did Ravan kidnap Sita?", href: "/why-did-ravan-kidnap-sita" },
    ],
  },
  {
    slug: "ramayana-movie",
    image: "/images/deity/ram-kodanda.webp",
    imageAlt: "Shri Ram with his bow Kodanda.",
    eyebrow: "The 2026 film and the original",
    type: "Article",
    related: [
      {
        label: "Ramayana and Ramcharitmanas: the difference",
        href: "/ramayana-vs-ramcharitmanas",
      },
      { label: "Who wrote the Ramayana?", href: "/who-wrote-the-ramayana" },
      { label: "Why did Ravan kidnap Sita?", href: "/why-did-ravan-kidnap-sita" },
      { label: "Was Ravan at Sita's swayamvar?", href: "/was-ravan-at-sita-swayamvar" },
      { label: "Who gave Ravan his boon?", href: "/ravan-boon" },
      { label: "Whose avatar was Lakshman?", href: "/lakshman-avatar" },
      { label: "Who was Surpanakha?", href: "/surpanakha" },
      { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" },
    ],
  },
  {
    slug: "ramayana-vs-ramcharitmanas",
    image: "/images/authors/tulsidas.webp",
    imageAlt: "Goswami Tulsidas writing on the ghats of Varanasi.",
    eyebrow: "The two texts",
    type: "Article",
    related: [
      { label: "Goswami Tulsidas", href: "/tulsidas" },
      { label: "Maharshi Valmiki", href: "/valmiki" },
      { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" },
    ],
  },
  {
    slug: "who-wrote-the-ramayana",
    image: "/images/authors/valmiki.webp",
    imageAlt: "Maharshi Valmiki in his forest ashram by the Tamasa river.",
    eyebrow: "The poets",
    type: "Article",
    related: [
      { label: "Maharshi Valmiki", href: "/valmiki" },
      { label: "Goswami Tulsidas", href: "/tulsidas" },
      {
        label: "Ramayana and Ramcharitmanas",
        href: "/ramayana-vs-ramcharitmanas",
      },
    ],
  },
  {
    slug: "read-ramcharitmanas-online",
    image: "/images/kand/bal-kand.webp",
    imageAlt: "Shri Ram with Shiv's bow in King Janak's assembly.",
    eyebrow: "Reading online",
    type: "Article",
    related: [
      { label: "Open the Ramcharitmanas", href: "/ramcharitmanas" },
      { label: "Sunderkand", href: "/sunderkand" },
      { label: "The Gita Press editions", href: "/gita-press" },
    ],
  },
  {
    slug: "read-valmiki-ramayana-online",
    image: "/images/authors/valmiki.webp",
    imageAlt: "Maharshi Valmiki in his forest ashram.",
    eyebrow: "Reading online",
    type: "Article",
    related: [
      { label: "Valmiki Ramayana on Ramayana.com", href: "/valmiki-ramayana" },
      { label: "Maharshi Valmiki", href: "/valmiki" },
      { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" },
    ],
  },
  {
    slug: "tulsidas",
    image: "/images/authors/tulsidas.webp",
    imageAlt:
      "Goswami Tulsidas composing the Ramcharitmanas beside the Ganga at sunrise.",
    eyebrow: "Goswami Tulsidas",
    type: "Article",
    related: [
      { label: "Read the Ramcharitmanas", href: "/ramcharitmanas" },
      { label: "Famous chaupais", href: "/chaupai" },
      { label: "Hanuman Chalisa", href: "https://hanumanchalisa.net" },
    ],
  },
  {
    slug: "valmiki",
    image: "/images/authors/valmiki.webp",
    imageAlt:
      "Maharshi Valmiki writing the Ramayana in his ashram.",
    eyebrow: "Maharshi Valmiki",
    type: "Article",
    related: [
      { label: "Valmiki Ramayana on Ramayana.com", href: "/valmiki-ramayana" },
      { label: "Who wrote the Ramayana?", href: "/who-wrote-the-ramayana" },
    ],
  },
  {
    slug: "gita-press",
    image: "/images/share/temple-lamps.webp",
    imageAlt: "Temple lamps.",
    eyebrow: "The editions",
    type: "Article",
    related: [
      { label: "Acknowledgements", href: "/acknowledgements" },
    ],
  },
  {
    slug: "about",
    image: "/images/hero/ram-darbar.webp",
    imageAlt:
      "Shri Ram and Mata Sita enthroned at Ayodhya with Hanumanji kneeling.",
    eyebrow: "Ramayana.com",
    type: "AboutPage",
    related: [
      { label: "The Gita Press editions", href: "/gita-press" },
      { label: "The Android app", href: "/app" },
    ],
  },
    {
    slug: "privacy",
    image: "/images/share/flower-mandala.webp",
    imageAlt: "A flower mandala.",
    eyebrow: "Privacy",
    type: "Article",
  },
  {
    slug: "support",
    image: "/images/share/flower-mandala.webp",
    imageAlt: "A flower mandala.",
    eyebrow: "Support",
    type: "Article",
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug) ?? null;
