import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";

const ROOT = join(process.cwd(), "content", "articles");

/** Markdown article drafts (Codex gpt-6.1-sol) rendered to HTML on the server. */
export const Article = {
  async raw(slug: string): Promise<string | null> {
    try {
      return await readFile(join(ROOT, `${slug}.md`), "utf8");
    } catch {
      return null;
    }
  },
  async html(slug: string, { stripH1 = true } = {}): Promise<string | null> {
    const md = await Article.raw(slug);
    if (!md) return null;
    return marked.parse(stripH1 ? md.replace(/^# .*\n+/, "") : md, {
      async: false,
    }) as string;
  },
  /** One H2 section of a multi-section draft (e.g. kand-intros), without its heading. */
  async section(slug: string, heading: string): Promise<string | null> {
    const md = await Article.raw(slug);
    if (!md) return null;
    const re = new RegExp(
      `^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$([\\s\\S]*?)(?=^## |\\s*$(?![\\s\\S]))`,
      "m",
    );
    const m = re.exec(md);
    return m ? (marked.parse(m[1].trim(), { async: false }) as string) : null;
  },
  /** Title (H1) and the first paragraph, for metadata. */
  async meta(
    slug: string,
  ): Promise<{
    title: string;
    description: string;
    faq: { q: string; a: string }[];
  } | null> {
    const md = await Article.raw(slug);
    if (!md) return null;
    const title = /^# (.+)$/m.exec(md)?.[1]?.trim() ?? slug;
    const body = md.replace(/^# .*\n+/, "");
    const description = (body.split(/\n\s*\n/)[0] ?? "")
      .replace(/\s+/g, " ")
      .replace(/[*_`]/g, "")
      .trim()
      .slice(0, 300);
    const faq: { q: string; a: string }[] = [];
    const faqBlock = md.split(/^## Questions people ask\s*$/m)[1];
    if (faqBlock)
      for (const m of faqBlock.matchAll(
        /^### (.+)$\n+([\s\S]*?)(?=^### |\s*$(?![\s\S]))/gm,
      ))
        faq.push({ q: m[1].trim(), a: m[2].replace(/\s+/g, " ").trim() });
    return { title, description, faq };
  },
};
