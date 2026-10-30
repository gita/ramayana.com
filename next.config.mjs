/** @type {import('next').NextConfig} */
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Our preference for AI systems, stated explicitly (Cloudflare Content Signals convention).
  { key: "Content-Signal", value: "ai-train=yes, search=yes, ai-input=yes" },
];
// The 2001 to 2015 site. These URLs still carry links (Wikipedia among them), so they live on.
const legacy = [
  ["/holy_places.htm", "/places"], ["/hanuman.htm", "/characters/hanuman"], ["/who_is_rama.htm", "/characters/ram"],
  ["/books_excerpts.htm", "/valmiki-ramayana"], ["/books_excerpts_pro.htm", "/valmiki-ramayana"], ["/books&comics.htm", "/gita-press"],
  ["/s/1/index", "/valmiki-ramayana"], ["/gallery.htm", "/"], ["/about_us.htm", "/about"], ["/index.html", "/"], ["/comingsoon.htm", "/"],
  ["/dates&festivals.htm", "/"], ["/crossword.htm", "/"], ["/coloring.htm", "/"], ["/contests&games.htm", "/"], ["/privacy.htm", "/privacy"],
];
const kandaImage = { bala: "bal-kand", ayodhya: "ayodhya-kand", aranya: "aranya-kand", kishkindha: "kishkindha-kand", sundara: "sunderkand", yuddha: "lanka-kand", uttara: "uttar-kand" };

const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: import.meta.dirname },
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000, deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920] },
  async headers() {
    return [
      { source: "/images/:path*", headers: immutable },
      { source: "/:path*", headers: security },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Markdown twins: /path.md, or Accept: text/markdown on the HTML URL (same content, second format).
        { source: "/:path*.md", destination: "/api/md/:path*" },
        { source: "/:path*", has: [{ type: "header", key: "accept", value: "(.*text/markdown.*)" }], destination: "/api/md/:path*" },
      ],
    };
  },
  async redirects() {
    // Pending pages (/places, /characters) resolve to the nearest live page until they exist.
    const interim = { "/places": "/ramayana-movie", "/characters/hanuman": "/sunderkand", "/characters/ram": "/ramcharitmanas" };
    const map = legacy.map(([source, destination]) => [source, interim[destination] ?? destination]);
    return [
      ...map.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
      { source: "/holy_places.htm", has: [{ type: "query", key: "lang" }], destination: interim["/places"], statusCode: 301 },
      { source: "/k/:kanda(bala|ayodhya|aranya|kishkindha|sundara|yuddha|uttara)-kanda", destination: "/valmiki-ramayana", statusCode: 301 },
      { source: "/k/:kanda(bala|ayodhya|aranya|kishkindha|sundara|yuddha|uttara)-kanda/:n", destination: "/valmiki-ramayana", statusCode: 301 },
      ...Object.entries(kandaImage).flatMap(([k, slug]) => ["jpg", "gif"].map((ext) => ({ source: `/images/ramayana-${k}-kanda-1.${ext}`, destination: `/images/kand/${slug}.webp`, statusCode: 301 }))),
      { source: "/images/lord-rama.jpg", destination: "/images/deity/ram-kodanda.webp", statusCode: 301 },
      { source: "/images/rama-hanuman.jpg", destination: "/images/deity/hanuman-kneeling.webp", statusCode: 301 },
    ];
  },
};
export default nextConfig;
