import { index, kandPath, unitPath } from "@/lib/content";
import { chaupais, chaupaiPath } from "@/lib/chaupai";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt (v2 convention): an index for agents. Every page also has a Markdown twin at <path>.md */
export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const i = index();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description} Every page has a Markdown twin at the same URL with .md appended, or by requesting it with Accept: text/markdown.`,
    "",
    "The Ramcharitmanas text follows Gita Press, Gorakhpur editions (code 790 Hindi tika by Hanuman Prasad Poddar, code 1318 original text and English translation). Verse IDs are stable and shared with the Ramayan Android app. English pages are at the root, Hindi pages under /hi/.",
    "",
    "## Start here",
    `- [Sunderkand, complete with meaning](${u("/sunderkand.md")}): the fifth kand on one page, 60 dohas`,
    `- [Ramcharitmanas index](${u("/ramcharitmanas.md")}): the seven kands`,
    `- [Famous chaupais with meaning](${u("/chaupai.md")})`,
    ...articles.filter((a) => !["privacy", "support"].includes(a.slug)).map((a) => `- [${a.slug.replace(/-/g, " ")}](${u(`/${a.slug}.md`)})`),
    "",
    "## Ramcharitmanas, kand by kand",
    ...i.kands.map((k) => `- [${k.title_en}](${u(`${kandPath("en", k.slug)}.md`)}): ${k.dohas} dohas, contents and links to every doha`),
    "",
    "## Hindi",
    ...i.kands.map((k) => `- [${k.title_hi}](${u(`${kandPath("hi", k.slug)}.md`)})`),
    `- [सुन्दरकाण्ड पाठ](${u("/hi/sunderkand.md")})`,
    "",
    "## Optional",
    ...chaupais.map((c) => `- [${c.title}](${u(`${chaupaiPath("en", c.slug)}.md`)})`),
    `- [Bal Kand, first doha](${u(`${unitPath("en", "bal-kand", "mangalacharan")}.md`)}): the reading order begins here`,
    `- [Privacy](${u("/privacy.md")})`,
    `- [Support](${u("/support.md")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
