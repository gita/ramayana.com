#!/usr/bin/env node
/**
 * Derives the site's images from the app's paintings and the holding page masters.
 * Sources stay in the app repo (never regenerated here, AI credits cost money).
 * Output: public/images/<group>/<name>.webp at 1600px wide (next/image makes the rest),
 * plus a 1200x630 JPEG per painting for Open Graph cards.
 *
 *   node scripts/build-images.mjs
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { homedir } from "node:os";

const APP = join(homedir(), "Documents/ramayan-app/brand");
const OUT = join(import.meta.dirname, "..", "public", "images");
const KAND = {
  "1-bal": "bal-kand", "2-ayodhya": "ayodhya-kand", "3-aranya": "aranya-kand",
  "4-kishkindha": "kishkindha-kand", "5-sundar": "sunderkand", "6-lanka": "lanka-kand", "7-uttar": "uttar-kand",
};
const jobs = [
  ...Object.entries(KAND).map(([src, slug]) => [join(APP, "kand", `${src}.png`), "kand", slug]),
  ...["ram-darbar", "ram-kodanda", "sita-mata", "hanuman-heart-darshan", "hanuman-kneeling", "hanuman-mountain",
     "lakshman", "bharat-milap", "kevat-charan", "shabari-berries"].map((n) => [join(APP, "deity", `${n}.png`), "deity", n]),
  [join(APP, "v3", "choice-ramcharitmanas.png"), "authors", "tulsidas"],
  [join(APP, "v3", "choice-valmiki.png"), "authors", "valmiki"],
  [join(APP, "v3", "hanuman-sanjeevani.png"), "story", "hanuman-sanjeevani"],
  [join(APP, "v3", "story-lankini-gate.png"), "story", "lankini-gate"],
  [join(APP, "share", "01-sunrise-sarayu.png"), "share", "sunrise-sarayu"],
  [join(APP, "share", "02-temple-lamps.png"), "share", "temple-lamps"],
  [join(APP, "share", "03-flower-mandala.png"), "share", "flower-mandala"],
  [join(import.meta.dirname, "..", "assets", "_hero-master.png"), "hero", "ram-darbar"],
];

for (const [src, group, name] of jobs) {
  if (!existsSync(src)) { console.warn("missing", src); continue; }
  const dir = join(OUT, group); mkdirSync(dir, { recursive: true });
  const img = sharp(src);
  const meta = await img.metadata();
  await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(join(dir, `${name}.webp`));
  // OG: crop biased upward so faces survive the wide ratio.
  await img.clone().resize({ width: 1200, height: 630, fit: "cover", position: "attention" }).jpeg({ quality: 86, progressive: true }).toFile(join(dir, `${name}-og.jpg`));
  console.log(group, name, `${meta.width}x${meta.height}`);
}
