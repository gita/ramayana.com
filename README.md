# ramayana.com

The free, ad-free home of the Ramayana online, a project of Ved Vyas Foundation alongside
[bhagavadgita.com](https://bhagavadgita.com), [radhakrishna.com](https://radhakrishna.com) and
[hanumanchalisa.net](https://hanumanchalisa.net). Next.js 16, App Router, static generation,
English at the root and Hindi under `/hi/`.

## What is here

```
app/                      routes (reader, Sunderkand, chaupai, articles, api/md twins, sitemap, robots, manifest, llms.txt)
components/               header, footer, reader blocks, JSON-LD, page modules under components/pages/
content/ramcharitmanas/   built from the app's verified Gita Press dataset (scripts/build-content.py)
content/articles/         markdown pages drafted with Codex gpt-6.1-sol from a verified brief, human-edited
content/chaupai.json      the famous chaupai registry (slug -> stable verse id)
lib/                      site constants, content loaders, release gating (lib/release.ts)
public/images/            derived from the app's paintings (scripts/build-images.mjs); never regenerate art here
docs/                     the search strategy and the raw keyword research
```

## Working on it

```sh
npm install
npm run content          # rebuilds content/ramcharitmanas from ~/Documents/ramayan-app/data/verified
npm run images           # rebuilds public/images from ~/Documents/ramayan-app/brand and assets/
npm run dev              # http://localhost:3000
npm run build
```

Every page has a Markdown twin at `<path>.md`, also served for `Accept: text/markdown`.
`/llms.txt` indexes them. `lib/release.ts` controls which kands appear in the sitemap, so the
book is released a few hundred URLs at a time (see `docs/seo-strategy-2026-10-30.md`).

## House rules

Calm and Apple as the bar. Light theme only. No em dashes, no semicolons, no exclamation marks in
copy. Tiro Devanagari for the verse with word tracking only, never letter tracking and never a hard
clip. The verse, its meaning and its notes are the page: no model-written essay on verse pages.
Shri Ram is drawn with a jewelled crown, tilak and the bow Kodanda, never a peacock feather.
Every meaning names its Gita Press edition with a link to buy the book.

## Deploying

Pushes to `main` deploy to production through the Vercel Git integration. DNS for the domain is at
Cloudflare, DNS only, so Vercel terminates TLS.
