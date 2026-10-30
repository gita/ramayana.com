import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ramayana.com",
    short_name: "Ramayana",
    description: "The Ramcharitmanas and the Valmiki Ramayana with meaning. Free, no ads.",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#faf8f3",
    lang: "en",
    categories: ["books", "education", "lifestyle"],
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
