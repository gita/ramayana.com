# ramayana.com

Holding page for [ramayana.com](https://ramayana.com), the coming digital home of the
Ramayana. A project of Ved Vyas Foundation, alongside
[bhagavadgita.com](https://bhagavadgita.com), [radhakrishna.com](https://radhakrishna.com)
and [hanumanchalisa.net](https://hanumanchalisa.net).

This is deliberately a single static `index.html` with no build step and no
dependencies. The real site will be Next.js, built in this same repo, and this
page gets deleted when it lands.

## Layout

```
index.html            the whole page, styles inlined
assets/
  _hero-master.png    gpt-image-2 original, 1536x1024, the only hand-held file
  build.py            derives every other image from the master
  hero-*.{webp,jpg}   responsive hero
  og.jpg              1200x630 social card
  icon-*, favicon-*   square icons
  fonts/              Crimson Pro + Inter, latin subset, self hosted
```

## Working on it

No install, no server needed for a quick look:

```sh
open index.html
```

To serve it the way Vercel will, with absolute `/assets` paths resolving:

```sh
python3 -m http.server 4000
```

After replacing `assets/_hero-master.png`, regenerate the derivatives:

```sh
python3 assets/build.py
```

## Deploying

Pushes to `main` deploy to production through the Vercel Git integration. DNS
for the domain is at Cloudflare, set to DNS only so Vercel terminates TLS.

## House rules

Design and copy follow the network standards: Calm and Apple as the bar,
English-only interface copy, no em dashes or semicolons, light theme only, and
correct iconography for Shri Ram, which means a jewelled crown, tilak, and his
bow Kodanda, and never a peacock feather.
