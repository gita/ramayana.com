#!/usr/bin/env node
/** App preview images (real app screens) and the install QR code for desktop. */
import sharp from "sharp";
import QRCode from "qrcode";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
const S = join(homedir(), "Documents/ramayan-app/brand/store");
const OUT = join(import.meta.dirname, "..", "public", "images", "app");
for (const [src, name] of [["captures-2026-10-30/home-en.png", "today"], ["captures-2026-10-30/library-en.png", "read"], ["captures-2026-10-30/library-hi.png", "read-hi"], ["screens/2.png", "reader"], ["screens/4.png", "plans"]])
  await sharp(join(S, src)).resize({ width: 640 }).webp({ quality: 84, effort: 6 }).toFile(join(OUT, `${name}.webp`));
await sharp(join(import.meta.dirname, "..", "assets", "_icon-master.png")).resize(160).webp({ quality: 86 }).toFile(join(OUT, "icon.webp"));
const url = "https://play.google.com/store/apps/details?id=com.ramayana.ramcharitmanas&referrer=utm_source%3Dramayana.com%26utm_medium%3Dqr";
writeFileSync(join(OUT, "install-qr.svg"), await QRCode.toString(url, { type: "svg", margin: 1, color: { dark: "#14213f", light: "#ffffff" } }));
