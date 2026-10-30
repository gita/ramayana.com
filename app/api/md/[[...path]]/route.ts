import { NextRequest, NextResponse } from "next/server";
import {
  index,
  kand,
  kandTitle,
  marker,
  unit,
  unitPath,
  kandPath,
  type Lang,
} from "@/lib/content";
import { chaupai, chaupaiPath, englishForVerseSafe } from "@/lib/chaupai";
import { Article } from "@/components/article";
import { articleBySlug } from "@/lib/articles";
import { site } from "@/lib/site";
import { vHub, vIndex, vKand, vKandPath, vSarga, vSargaPath, vTitle } from "@/lib/valmiki";
import { feelings, feelingVerses } from "@/lib/feelings";

/**
 * Markdown twin of a page: the same content as the HTML, without chrome.
 * Reached as /<path>.md or by `Accept: text/markdown` on the HTML URL (rewrites in next.config).
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path: segs } = await ctx.params;
  const raw = "/" + (segs ?? []).join("/");
  const path = raw.replace(/\.md$/, "").replace(/\/$/, "") || "/";
  const md = await render(path);
  if (md === null) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept", "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Link: `<${site.url}${path}>; rel="canonical"`,
    },
  });
}

const fm = (o: Record<string, string>) =>
  "---\n" +
  Object.entries(o)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n") +
  "\n---\n\n";
const source = (lang: Lang) =>
  lang === "hi"
    ? `\n\n---\n\nस्रोत: गीताप्रेस, गोरखपुर। पुस्तक खरीदें: ${site.gitaPress.product}\n\nRamayana.com, वेदव्यास फ़ाउंडेशन। निःशुल्क, विज्ञापन रहित।\n`
    : `\n\n---\n\nSource: Gita Press, Gorakhpur editions. Buy the book: ${site.gitaPress.product}\n\nRamayana.com, a free, ad-free project of Ved Vyas Foundation.\n`;

async function render(path: string): Promise<string | null> {
  const lang: Lang = path.startsWith("/hi/") || path === "/hi" ? "hi" : "en";
  const p = lang === "hi" ? path.slice(3) || "/" : path;
  let m: RegExpExecArray | null;
  if ((m = /^\/ramcharitmanas\/([a-z-]+)\/([a-z0-9-]+)$/.exec(p))) {
    const r = unit(m[1], m[2]);
    if (!r) return null;
    const kt = kandTitle(r.kand, lang),
      ul = lang === "hi" ? r.unit.label_hi : r.unit.label_en;
    let out =
      fm({ title: `${kt} ${ul}`, canonical: `${site.url}${path}`, lang }) +
      `# ${kt} · ${ul}\n\n`;
    if (r.unit.sections.length)
      out +=
        r.unit.sections
          .map((s) => (lang === "hi" ? s.hi : s.en || s.hi))
          .join(" · ") + "\n\n";
    for (const v of r.unit.verses) {
      out += `**${marker[v.type].hi}** \n> ${v.text.replace(/\n/g, "  \n> ")}\n\n`;
      if (lang === "hi" && v.hi) out += `भावार्थ: ${v.hi}\n\n`;
      if (lang === "en") {
        const e = r.unit.en.find((x) => x.verses.includes(v.id));
        if (e && e.verses[e.verses.length - 1] === v.id)
          out += `Meaning: ${e.text}\n\n`;
      }
    }
    const nav = [
      r.prev &&
        `Previous: ${site.url}${unitPath(lang, r.prev.kand.slug, r.prev.unit.slug)}`,
      `Kand: ${site.url}${kandPath(lang, r.kand.slug)}`,
      r.next &&
        `Next: ${site.url}${unitPath(lang, r.next.kand.slug, r.next.unit.slug)}`,
    ]
      .filter(Boolean)
      .join("  \n");
    return out + nav + source(lang);
  }
  if ((m = /^\/ramcharitmanas\/([a-z-]+)$/.exec(p)) || p === "/sunderkand") {
    const slug = p === "/sunderkand" ? "sunderkand" : m![1];
    const k = kand(slug);
    if (!k) return null;
    const kt = kandTitle(k, lang);
    let out =
      fm({ title: kt, canonical: `${site.url}${path}`, lang }) +
      `# ${kt}\n\n${k.units.length - 1} ${lang === "hi" ? "दोहे" : "dohas"}.\n\n## ${lang === "hi" ? "विषय-सूची" : "Contents"}\n\n`;
    const me = index().kands.find((x) => x.slug === slug)!;
    out +=
      me.sections
        .map(
          (s) =>
            `- [${lang === "hi" ? s.hi : s.en || s.hi}](${site.url}${unitPath(lang, slug, s.unit)})`,
        )
        .join("\n") +
      "\n\n## " +
      (lang === "hi" ? "दोहे" : "Dohas") +
      "\n\n";
    out += k.units
      .map(
        (u) =>
          `- [${lang === "hi" ? u.label_hi : u.label_en}](${site.url}${unitPath(lang, slug, u.slug)})`,
      )
      .join("\n");
    return out + source(lang);
  }
  if (p === "/ramcharitmanas") {
    const i = index();
    return (
      fm({ title: i.work.title_en, canonical: `${site.url}${path}`, lang }) +
      `# ${lang === "hi" ? i.work.title_hi : i.work.title_en}\n\n` +
      i.kands
        .map(
          (k) =>
            `- [${kandTitle(k, lang)}](${site.url}${kandPath(lang, k.slug)}) · ${k.dohas} ${lang === "hi" ? "दोहे" : "dohas"}`,
        )
        .join("\n") +
      source(lang)
    );
  }
  if (p === "/" || p === "/index") {
    return fm({ title: site.name, canonical: site.url, lang }) + `# ${site.name}\n\n${site.description}\n\n- [Ramcharitmanas](${site.url}/ramcharitmanas)\n- [Valmiki Ramayana](${site.url}/valmiki-ramayana)\n- [Sunderkand](${site.url}/sunderkand)\n- [The app](${site.url}/app)\n`;
  }
  if (p === "/valmiki-ramayana") {
    return fm({ title: "Valmiki Ramayana", canonical: `${site.url}${path}`, lang }) + `# Valmiki Ramayana\n\n` + vIndex().kands.map((k) => `- [${vTitle(k, lang)}](${site.url}${vKandPath(lang, k.slug)}) · ${k.sargas[lang].length} sargas`).join("\n") + source(lang);
  }
  if ((m = /^\/valmiki-ramayana\/([a-z-]+)$/.exec(p))) {
    const k = vKand(m[1]);
    if (!k) return null;
    return fm({ title: vTitle(k, lang), canonical: `${site.url}${path}`, lang }) + `# ${vTitle(k, lang)}\n\n` + k.editions[lang].map((g) => `- [Sarga ${g.n}](${site.url}${vSargaPath(lang, k.slug, g.n)})`).join("\n") + source(lang);
  }
  if ((m = /^\/valmiki-ramayana\/([a-z-]+)\/(sarga-\d+)$/.exec(p))) {
    const r = vSarga(lang, m[1], m[2]);
    if (!r) return null;
    const t = `${vTitle(r.kand, lang)}, Sarga ${r.sarga.n}`;
    return fm({ title: t, canonical: `${site.url}${path}`, lang }) + `# ${t}\n\n` + r.sarga.verses.map((v) => `> ${v.text.replace(/\n/g, "  \n> ")}\n\n${v.m}`).join("\n\n") + `\n\nBook: ${site.url}${vHub(lang)}` + source(lang);
  }
  if ((m = /^\/feelings\/([a-z]+)$/.exec(p))) {
    const f = feelings.find((x) => x.id === m![1]);
    if (!f) return null;
    return fm({ title: f[lang], canonical: `${site.url}${path}`, lang }) + `# ${f[lang]}\n\n` + feelingVerses(f.id).map((x) => `> ${x.verse.text.replace(/\n/g, "  \n> ")}\n\n${lang === "hi" ? x.verse.hi : x.english}\n\n${site.url}${unitPath(lang, x.kand.slug, x.unit.slug)}#${x.verse.id}`).join("\n\n") + source(lang);
  }
  if ((m = /^\/chaupai\/([a-z0-9-]+)$/.exec(p))) {
    const c = chaupai(m[1]);
    if (!c) return null;
    const name = lang === "hi" ? c.title_hi : c.title;
    return (
      fm({ title: name, canonical: `${site.url}${path}`, lang }) +
      `# ${name}\n\n${kandTitle(c.kand, lang)} · ${lang === "hi" ? c.unit.label_hi : c.unit.label_en}\n\n> ${c.verse.text.replace(/\n/g, "  \n> ")}\n\nभावार्थ: ${c.verse.hi}\n\n${c.en ? `Meaning: ${englishForVerseSafe(c.verse, c.en)}\n\n` : ""}In context: ${site.url}${unitPath(lang, c.kand.slug, c.unit.slug)}#${c.verse.id}` +
      source(lang)
    );
  }
  if (p === "/chaupai") {
    const { chaupais } = await import("@/lib/chaupai");
    return (
      fm({ title: "Famous chaupais", canonical: `${site.url}${path}`, lang }) +
      "# " +
      (lang === "hi"
        ? "प्रसिद्ध चौपाइयाँ और दोहे"
        : "Famous chaupais and dohas") +
      "\n\n" +
      chaupais
        .map(
          (c) =>
            `- [${lang === "hi" ? c.title_hi : c.title}](${site.url}${chaupaiPath(lang, c.slug)})`,
        )
        .join("\n") +
      source(lang)
    );
  }
  if ((m = /^\/([a-z0-9-]+)$/.exec(p)) && articleBySlug(m[1])) {
    const raw = await Article.raw(m[1]);
    if (!raw) return null;
    return (
      fm({ canonical: `${site.url}${path}`, lang: "en" }) +
      raw +
      "\n\n---\n\nRamayana.com, a free, ad-free project of Ved Vyas Foundation.\n"
    );
  }
  return null;
}
