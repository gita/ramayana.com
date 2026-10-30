import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Every search and answer engine is welcome, by name, so the intent is unambiguous.
const agents = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "ClaudeBot", "Google-Extended", "Applebot", "Applebot-Extended", "DuckDuckBot", "YandexBot"];
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search?", "/api/"] }, ...agents.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
