#!/usr/bin/env python3
"""Derives every shipped image from the two gpt-image-2 masters.

_hero-master.png is the painting at 1536x1024. _icon-master.png is a separate
square composition, not a crop of the painting: cropping the darbar put a half
of Mata Sita's face at the edge, and a busy scene turns to mush at 32px anyway.
Nothing here is hand edited, so re-running after a new master rebuilds the set.
"""
import pathlib
from PIL import Image

HERE = pathlib.Path(__file__).parent
master = Image.open(HERE / "_hero-master.png").convert("RGB")

# Responsive hero. The master is 1536 wide, so that is the largest honest size.
for w in (1536, 1024, 768):
    im = master.resize((w, round(master.height * w / master.width)), Image.LANCZOS)
    im.save(HERE / f"hero-{w}.webp", "WEBP", quality=82, method=6)
    im.save(HERE / f"hero-{w}.jpg", "JPEG", quality=86, optimize=True, progressive=True)

# Open Graph card, 1200x630. Crop biased upward so the faces and the parasol
# survive the wider ratio and only the marble floor is lost.
ow, oh = 1200, 630
ch = round(master.width * oh / ow)
top = round((master.height - ch) * 0.34)
master.crop((0, top, master.width, top + ch)).resize((ow, oh), Image.LANCZOS).save(
    HERE / "og.jpg", "JPEG", quality=88, optimize=True, progressive=True
)

# Icons, from the square master. Judged at 60px and 120px under the iOS
# squircle and the Pixel circle before this one was picked.
icon = Image.open(HERE / "_icon-master.png").convert("RGB")
for size, name in ((512, "icon-512.png"), (180, "apple-touch-icon.png"), (32, "favicon-32.png")):
    icon.resize((size, size), Image.LANCZOS).save(HERE / name)

print("built:", ", ".join(sorted(p.name for p in HERE.glob("*") if p.suffix in {".webp", ".jpg", ".png"})))
