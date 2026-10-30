# ramayana.com: search strategy and launch plan

Written 2026-10-30, nine days before the film opens. Data sources: Keywords Everywhere (Google Keyword Planner data, India and US, October 2026), Ahrefs (keyword difficulty, SERP overview, backlinks), SerpApi (live Google India SERPs and Google Trends), Google autocomplete (en-IN, hi-IN, en-US), plus the July and October research in the ramayan-app repo. Raw exports are in `docs/research/keyword-data-2026-10-30/`.

No em dashes, no semicolons, light theme, Calm and Apple as the bar: the house rules in the README apply to everything proposed here.

---

## 1. The situation in one screen

**The moment.** _Ramayana: Rise of a Legend_ (Part 1 of Nitesh Tiwari's two-part film, Ranbir Kapoor as Ram, Sai Pallavi as Sita, Yash as Ravan, Sunny Deol as Hanuman) opens internationally on 6 November 2026 and in India on 8 November, Diwali. Part 2 was announced for Diwali 2027. Reports on 24 October say it may slip to 2028, unconfirmed. Google Trends for "ramayana" in India sits at 77 this week against a two-year baseline of about 7. Monthly searches for "ramayana movie" in India went from 135k in July to 823k in August and 673k in September. The demand wave is here and it will come back for Part 2.

**The domain.** ramayana.com is a one-page holding site. Ahrefs: DR 4.8, zero organic keywords, 1,036 live referring domains. The old 1998 to 2015 site earned real links that now 404: `/holy_places.htm` is cited from the Bay of Bengal article on Wikipedia in at least seven languages (291 referring domains). Most other legacy links are spam (payday loans, SEO sellers). The legacy traffic can be recovered with redirects in an hour. The spam should be disavowed once.

**The opportunity.** The scripture side of this topic is almost uncontested. Ahrefs keyword difficulty in India: ramcharitmanas 5, valmiki ramayana 1, sunderkand 0, ram stuti 0, ramayan chaupai 0, mangal bhavan amangal hari 0, tulsidas 15, valmiki 4. What ranks today is archive.org PDFs, Wikipedia, YouTube, Play Store listings and small sites carrying Gita Press text without credit. A DR 6 site (shrirammitramandal.com) pulls an estimated 41k visits a month from one Sundarkand page. Nobody owns verse-level pages with Hindi and English meaning, proper attribution and search.

**The constraint.** The film keywords themselves ("ramayana movie", "ramayana release date", "ramayana cast") are owned by news, YouTube and the knowledge panel. A new domain will not rank for them in November. What a new domain can win is the question people ask after the trailer and after the film: what is the original story, who wrote it, what does the scripture actually say, where can I read it. Those queries are the bridge from the film to the text, and they are ours to take.

**Recommendation.** Ship a real site in three phases: a launch kit before 6 November, the two full readers through December, then Hindi and depth through Ram Navami 2027 (26 March 2027) and the Part 2 window. Details in section 7.

---

## 2. Demand map

Volumes are monthly Google searches, India first, US second. KD is Ahrefs keyword difficulty for India (0 to 100). "Now" is who holds the top organic results in India this week.

### 2.1 Head terms

| Keyword                             |   India |     US |        KD | Now                                                                 | Our page            |
| ----------------------------------- | ------: | -----: | --------: | ------------------------------------------------------------------- | ------------------- |
| ramayan                             | 301,000 |  4,400 |         0 | YouTube serial episodes, film news                                  | Home, `/story`      |
| ramayana                            |  90,500 | 18,100 | 0 (US 47) | Film trailer, Wikipedia characters list, IMDb                       | Home                |
| ramcharitmanas (+ ram charit manas) |  60,500 |  1,000 |         5 | archive.org PDF, Wikipedia, ramcharitmanas.info (DR 12), Play Store | `/ramcharitmanas`   |
| valmiki ramayana / ramayan          |  14,800 |  1,300 |         1 | valmikiramayan.net (DR 50), archive.org, Wikipedia                  | `/valmiki-ramayana` |
| shri ramcharitmanas                 |   4,400 |  1,600 |         5 | same as above                                                       | `/ramcharitmanas`   |
| ramayanam                           |  14,800 |    320 |           | Telugu and Tamil mix                                                | `/valmiki-ramayana` |

Monthly trend for "ramayana" in India: 60k through spring, 165k in May, 201k in August, 246k in September. "ramcharitmanas" is flat at 50k to 74k all year with no film effect, which is exactly why it is the safer core.

### 2.2 Daily devotional texts (the fastest wins)

These are read daily or weekly, searched in Roman Hindi, and currently served by PDFs and lyric sites.

| Keyword                                          |           India |    US |  KD | Now                                                                                            |
| ------------------------------------------------ | --------------: | ----: | --: | ---------------------------------------------------------------------------------------------- |
| sunderkand / sundarkand / sundar kand            |         368,000 | 3,600 |   0 | shrirammitramandal.com (DR 6, est. 41k visits), archive.org PDF, Navbharat Times, hi.wikipedia |
| sunderkand pdf                                   |          74,000 | 2,400 |   0 | archive.org                                                                                    |
| sunderkand lyrics                                |          49,500 |   590 |     | lyric sites                                                                                    |
| sunderkand paath / path                          | 27,100 / 22,200 | 1,000 |   1 | YouTube                                                                                        |
| ram stuti                                        |         201,000 | 1,600 |   0 | lyric sites, YouTube, AI overview                                                              |
| shri ramchandra kripalu bhajman (+ lyrics)       | 33,100 + 22,200 |   170 |   0 | lyric sites                                                                                    |
| mangal bhavan amangal hari (+ lyrics)            | 40,500 + 14,800 |   390 |   0 | YouTube, lyric sites                                                                           |
| ramayan chaupai / ramayan ki chaupai             | 27,100 / 12,100 |   260 |   0 | YouTube, nagarprabha.org, Jansatta                                                             |
| ramcharitmanas chaupai                           |           6,600 |    90 |     | same                                                                                           |
| aarti shri ramayan ji ki / ramayan aarti         |   8,100 / 5,400 |   110 |   0 | lyric sites                                                                                    |
| ramayan doha / ramcharitmanas doha               |   1,600 / 1,000 |       |     | thin                                                                                           |
| akhand ramayan path, navah parayan, maas parayan |           880 + |       |     | thin                                                                                           |

Sundarkand alone is bigger than every scripture head term combined. The Sundarkand page is the single most valuable URL on the site and should be built as a product, not a chapter: full text with Hindi and English meaning, doha navigation, a reading mode, a 30-day plan, printable layout, and later audio.

### 2.3 Authors and publisher (the "official" layer)

| Keyword                             |           India |    US |     KD | Now                                        |
| ----------------------------------- | --------------: | ----: | -----: | ------------------------------------------ |
| tulsidas / goswami tulsidas         |          74,000 | 1,300 | 15 / 6 | Wikipedia, Hindupedia, Britannica, YouTube |
| tulsidas ke dohe                    |           5,400 |       |        | Hindi content sites                        |
| who wrote ramcharitmanas            |           2,900 |       |        | AI overview                                |
| valmiki / maharishi valmiki         |  49,500 / 5,400 | 1,900 |      4 | Wikipedia                                  |
| valmiki jayanti                     |          40,500 |    90 |        | news (seasonal, October)                   |
| who wrote ramayana / ramayan        |          27,100 |   590 |     43 | AI overview, Wikipedia                     |
| ramayana author                     |           1,900 |    90 |        |                                            |
| gita press / gita press gorakhpur   | 40,500 / 18,100 |   880 |        | gitapress.org (DR 57)                      |
| gita press ramcharitmanas / ramayan |       480 / 590 |       |        |                                            |
| hanuman prasad poddar               |           4,400 |   110 |        | Wikipedia                                  |

Author pages for Tulsidas and Valmiki are mid-difficulty and high value: they carry the "who wrote" intent, they are what Google uses to connect our verse pages to the entity, and they are the natural home for the acknowledgement story (Gita Press, Poddar, the editions we use).

### 2.4 Characters and places (the Wikipedia-sized long tail)

| Character            |           India |            US |     | Place        |   India |    US |
| -------------------- | --------------: | ------------: | --- | ------------ | ------: | ----: |
| hanuman              |         673,000 |        74,000 |     | ayodhya      | 823,000 | 9,900 |
| ravan / ravana       | 74,000 / 22,200 | 2,400 / 5,400 |     | chitrakoot   | 246,000 | 1,000 |
| sita / sita mata     |  49,500 / 8,100 |         6,600 |     | ram setu     | 135,000 | 5,400 |
| urmila               |          40,500 |         9,900 |     | lanka        | 110,000 | 4,400 |
| lakshman             |          33,100 |           880 |     | panchavati   | 110,000 |   590 |
| jatayu               |          33,100 |         1,600 |     | kishkindha   |  40,500 | 1,600 |
| lord rama / shri ram | 27,100 / 90,500 | 4,400 / 1,600 |     | ashok vatika |  27,100 |   170 |
| dashrath             |          22,200 |           320 |     |              |         |       |
| mandodari            |          14,800 |           720 |     |              |         |       |
| shatrughan           |          12,100 |           110 |     |              |         |       |
| kumbhkaran, ahilya   |      8,100 each |     260 / 390 |     |              |         |       |
| shabari              |           6,600 |         5,400 |     |              |         |       |
| kaikeyi, manthara    |   5,400 / 3,600 |   1,900 / 210 |     |              |         |       |
| ramayana characters  |           3,600 |           390 | 1   |              |         |       |

Head character and place names are mixed-intent (tourism, baby names, other media) and mostly belong to Wikipedia. We do not chase them as head terms. We build one page per character and place because they are what the verse pages link out to, because the film sends people to look up Ravan and Urmila, and because the long tail ("urmila ramayana", "who was shabari", "jatayu story") is uncontested. The old `/holy_places.htm` page is the ancestor of `/places`.

### 2.5 The film

| Keyword                                        |                  India |          US |  KD | Note                                                                       |
| ---------------------------------------------- | ---------------------: | ----------: | --: | -------------------------------------------------------------------------- |
| ramayana movie / ramayan movie / ramayana film | 246,000 (Sep: 673,000) |      22,200 |   8 | News, knowledge panel, YouTube                                             |
| ramayana 2026                                  |                 74,000 |       8,100 |  15 | Parent topic for cast, budget, release                                     |
| ramayana part 1                                |                 49,500 |       2,900 |  13 |                                                                            |
| ramayana release date                          |                 18,100 |       1,600 |   4 | AI overview answers it                                                     |
| ramayana ranbir kapoor                         |                 18,100 |         320 |  12 |                                                                            |
| ramayana movie budget                          |                 18,100 |       1,000 |   1 |                                                                            |
| ramayana movie cast                            |                 12,100 |         720 |   5 |                                                                            |
| ramayana teaser / trailer                      |          9,900 / 6,600 | 590 / 2,900 |   0 | YouTube                                                                    |
| adipurush                                      |                110,000 |       5,400 |     | The 2023 film still searched: "ramayana vs adipurush" is a live comparison |
| ramayana the legend of prince rama             |                 13,000 |             |   2 | The 1992 anime, re-released. People search for it alongside the new film   |

Autocomplete tells the rest: "ramayana original story", "ramayana vs ramayana rise of a legend", "ramayana film ravana portrayal", "ramayana kandas in order", "ramayana explained", "ramayana ending", "ramayana is it ai", "ramayana book in english", "ramayana gita press", "ramayana for kids", "ramayana quiz", "ramayan is real or fake", "ramayan kisne likhi". The informational long tail around the film is where we play.

### 2.6 Reading intent and formats

| Keyword                                         |                India |        US | Note                                                                                                    |
| ----------------------------------------------- | -------------------: | --------: | ------------------------------------------------------------------------------------------------------- |
| ramcharitmanas pdf / hindi pdf / gita press pdf | 12,100 / 4,400 / 210 |       260 | PDF intent: answer with an online reader and a purchase link, no PDF                                    |
| ramayan pdf / ramayana pdf                      |                6,600 |       210 |                                                                                                         |
| ramayan book / ramayana book                    |               14,800 |     1,300 | Commercial. Our page recommends Gita Press editions with buy links                                      |
| ramayan in hindi / ramayan hindi                |                5,400 |        50 |                                                                                                         |
| ramcharitmanas in hindi                         |                3,600 |        70 |                                                                                                         |
| ramayana in english / ramayan in english        |                1,600 |       170 | KD 16                                                                                                   |
| ramcharitmanas in english                       |                  590 |        90 |                                                                                                         |
| read ramayana online / read ramayan online      |                  210 |        40 | Small, but it is the exact intent of the product and AI overviews answer it                             |
| ramayan katha / ram katha                       |               22,200 |       170 | Mostly katha performers. We serve the story-by-kand pages                                               |
| ramayana story / summary                        |          4,400 / 390 | 880 / 390 | KD 37 and 2                                                                                             |
| ramayana quotes / ramayan quotes                |                  720 |        90 | bhagavadgita.com's Hindi quotes page is its second biggest traffic source. Same play here with chaupais |
| ramayana vs ramcharitmanas / difference between |                  590 |           | People Also Ask on the ramcharitmanas SERP                                                              |
| what is ramayana / what is ramcharitmanas       |            590 / 480 |       590 |                                                                                                         |
| ramayan ke 7 kand, ramayana how many kandas     |            880 / 170 |           | PAA                                                                                                     |

Devanagari-script queries returned no Keyword Planner volume (Google folds them into the Roman forms), so Hindi pages are measured by the Roman keywords they also rank for. The live SERP for "रामचरितमानस" is Hindi Wikipedia, PDFs, Play Store and Wikisource, all weak.

### 2.7 People Also Ask captured this week

Ramcharitmanas: What is the difference between Ramayan and Ramcharitmanas? What does Ramcharitmanas mean? What happens if we read Ramcharitmanas? Why is Ramcharitmanas famous? रामचरितमानस को कैसे पढ़ना चाहिए? रामचरितमानस के कितने कांड हैं? रामायण की सबसे पावरफुल चौपाई कौन सी है? रामचरितमानस की 10 चौपाई कौन सी हैं?

Ramayana and the film: Who are the heroes in the movie Ramayana? When was Ramayana happened? How long is the Ramayana? Is the Ramayana movie released? Where can I watch Ramayana 2026? Is Ramayana budget really 4000 cr?

Tulsidas: Did Tulsidas meet Ram? Who wrote Ramayana first, Valmiki or Tulsidas? What books did Tulsidas write?

Every one of these becomes an FAQ block on the matching page, with FAQPage schema.

---

## 3. Who ranks today, and why they are beatable

| Site                                        |  DR |     Est. IN traffic | What they have                                                                                        | What they lack                                                           |
| ------------------------------------------- | --: | ------------------: | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| valmikiramayan.net                          |  50 |               1,200 | Rao and Murthy English, word meanings, 367 referring domains                                          | 1998 HTML, no Uttara Kanda, copyrighted translation, no Hindi, no mobile |
| ramcharitmanas.info                         |  12 |               1,100 | Full RCM with Gita Press Hindi (uncredited) and own English, `/collection/<kaand>/` URLs, topic pages | No attribution, ads, weak design, English is thin                        |
| ramcharit.in                                |  16 |                 low | Gita Press tika, uncredited                                                                           | Same                                                                     |
| shrirammitramandal.com/sundarkand           |   6 |              41,000 | One long Sundarkand page                                                                              | One page, no meaning layer, no structure                                 |
| readramayana.org                            |  25 |                 130 | Sarga-level Valmiki reading, 1,209 referring domains                                                  | Thin pages, PDF-led                                                      |
| archive.org PDFs                            |  93 | 7,500 (one RCM PDF) | Full Gita Press scans                                                                                 | A PDF: no navigation, no search, no meaning per verse                    |
| Wikipedia (en, hi)                          |  97 |              7,000+ | Encyclopaedic                                                                                         | Not the text                                                             |
| IITK (valmiki / ramcharitmanas .iitk.ac.in) |  79 |           near zero | Scholarly corpus                                                                                      | Mid-migration, unstable, unranked                                        |
| gitapress.org                               |  57 |              16,000 | The publisher                                                                                         | Sells books, does not publish the text online                            |
| bhagavadgita.com (ours)                     |  36 |              11,500 | The model: verse pages, quotes, Hindi                                                                 | Not Ramayana                                                             |

Nobody in the Ramayana space has: verse-level canonical URLs in two languages, named editions with purchase links, a Sundarkand product page, author and character entity pages, structured data, a search box, or a design above 2010. The gap is wide and the authority bar is low.

---

## 4. The film play: "the original"

Position ramayana.com as the text the film is based on. Not the film's site, never implying affiliation, no posters or stills, our own paintings only. The one thing a film cannot be is the original, and the one thing a brand new site can be is the domain that says it.

### 4.1 Pages to publish before 6 November

1. **`/ramayana-movie`**, titled "Ramayana (2026 film): the original story behind it". Factual film block (title, parts, director, cast as Ram, Sita, Ravan, Hanuman, release dates, Part 2 status) kept short and dated. Then the substance: which text the story comes from (Valmiki's Sanskrit epic and Tulsidas's Ramcharitmanas), the seven kands in order with one-paragraph summaries and links into the readers, the characters the film centres on with links to our character pages, and an FAQ from the PAA set. Updated the day of release and after Part 2 news. One evergreen URL, no year in the slug. Hindi twin at `/hi/ramayana-movie`.
2. **`/story`**: the Ramayana story kand by kand (targets ramayana story, summary, ramayan katha, ramayana explained, ramayana ending). Seven child pages `/story/bal-kand` to `/story/uttar-kand`.
3. **`/ramayana-vs-ramcharitmanas`**: the difference, side by side, with the first verse of each.
4. **`/who-wrote-the-ramayana`**: Valmiki, Tulsidas, the many Ramayanas (Kamba, Krittivasi, Ranganatha), the Adhyatma Ramayana. Links to both author pages.
5. **Character pages** for Ram, Sita, Lakshman, Hanuman, Ravan, Bharat, Urmila, Kaikeyi, Dashrath, Jatayu, Shabari, Vibhishan, Kumbhkaran, Mandodari, Sugriv. Each: who they are, their arc kand by kand, the verses where they appear (deep links into the readers), one painting.
6. **`/chaupai`**: 25 famous chaupais and dohas with Hindi and English meaning, each with its own URL (`/chaupai/mangal-bhavan-amangal-hari`, `/chaupai/hoihi-soi-jo-ram-rachi-rakha`). These are the share cards. These are the "ramayan quotes" pages.
7. **`/sunderkand`** as a complete reading page even if the full RCM reader is not ready: Sundarkand is 60 dohas and the data exists.

### 4.2 After release

- Add "What the film shows and what the scripture says" sections to `/ramayana-movie` and to the character pages, written from the text with verse citations, never from memory and never as review or criticism. The question people type is "ramayana film ravana portrayal" and "is ramayana movie accurate": the answer is the verses.
- A "Read the Ramayana after watching the film" guide: a 21-day plan through the kands Part 1 covers, in the app and on the site.
- Keep a dated "Part 2" section current. The Part 2 wave in late 2027 or 2028 will be larger, and by then the domain will have authority.

### 4.3 Guardrails

- The film title and logo are the producers' marks. Use the title factually in text, never in our logo, OG images or ads. Add one line on film pages: an independent reference to the original scripture, not affiliated with the film. The existing Google Ads rule (never name the film in ad copy) stays.
- No film imagery. Our paintings are the visual identity and they are also what makes the pages ours in Google Images and Discover.
- No box office, no reviews, no gossip. Those pages would be thin, off-brand and would pull the site's topical identity toward entertainment.

---

## 5. Site architecture

### 5.1 URL design

English at the root, Hindi under `/hi/`, reciprocal hreflang with `x-default` to English. Kand names use the most searched Roman spelling. Verse units are the edition's own units (Ramcharitmanas: the doha group, which is how the Gita Press book is numbered and how the app already stores 6,157 units. Valmiki: the sarga, with shloka anchors and optional shloka pages later).

```
/                                   home: today's verse, the two texts, Sundarkand, search
/ramcharitmanas                     hub: about, seven kands, how to read, editions, buy
/ramcharitmanas/bal-kand            kand page: sections, doha list, painting
/ramcharitmanas/bal-kand/doha-1     unit page: chaupais + doha, Hindi tika, English, notes
/ramcharitmanas/sunderkand          the Sundarkand kand page (also reachable at /sunderkand)
/sunderkand                         the product page: full paath, plan, printable, audio later
/valmiki-ramayana                   hub
/valmiki-ramayana/bala-kanda        kanda page: sarga list with titles and summaries
/valmiki-ramayana/bala-kanda/sarga-1  sarga page: shlokas, transliteration, meanings
/chaupai                            famous chaupais and dohas with meaning
/chaupai/<slug>                     one chaupai, share card, source verse link
/ram-stuti  /ramayan-aarti  /shri-ramchandra-kripalu-bhajman   standalone prayers
/story  /story/<kand>               the narrative, kand by kand
/characters  /characters/<name>     entity pages
/places  /places/<name>             entity pages (legacy /holy_places.htm redirects here)
/tulsidas  /valmiki                 author pages
/gita-press                         the publisher, the editions, why we use them, buy links
/ramayana-movie                     the film and the original
/ramayana-vs-ramcharitmanas  /who-wrote-the-ramayana  /questions/<slug>
/reading-plans  /reading-plans/navah-parayan  /reading-plans/sunderkand-30-days
/daily-verse                        the app's global daily verse, same selection, shareable
/search                             site search (Devanagari, Roman Hindi, English)
/app                                the app landing page (the ads already point here)
/about  /acknowledgements  /how-we-verify  /privacy  /support
/hi/...                             Hindi mirror of all content pages
```

### 5.2 Page templates and title patterns

| Page      | Title pattern                                                                 | Description pattern                                                                                                    |
| --------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Unit      | `Sunderkand Doha 1 with Hindi and English meaning · Ramcharitmanas`           | First chaupai in Devanagari, then "Hindi tika and English translation from the Gita Press edition. Read online, free." |
| Kand      | `Sunderkand: full Ramcharitmanas Sundar Kand with meaning`                    | Doha count, what happens, how long to read                                                                             |
| Sarga     | `Valmiki Ramayana Bala Kanda Sarga 1: Narada tells Valmiki the story of Rama` |                                                                                                                        |
| Chaupai   | `Mangal Bhavan Amangal Hari: lyrics and meaning`                              |                                                                                                                        |
| Character | `Urmila in the Ramayana: Lakshman's wife, her story and verses`               |                                                                                                                        |
| Author    | `Goswami Tulsidas: life, works and the Ramcharitmanas`                        |                                                                                                                        |

Site suffix "Ramayana.com" on every title. Every unit page carries: the verse block set in Tiro Devanagari (word tracking, never letter tracking, never hard-clipped), a visible "भावार्थ" or "Meaning" heading, the edition line under the meaning with the publisher and purchase link, prev and next, kand breadcrumb, a share card button, two related chaupais, and the FAQ where one exists. The reading rules in the app's CLAUDE.md apply unchanged.

### 5.3 Structured data

One `@graph` per page, extending radhakrishna.net's `lib/schema.ts`:

- `Organization` and `NGO` for Ved Vyas Foundation (same `@id` as the other network sites, `sameAs` to bhagavadgita.com, radhakrishna.com, hanumanchalisa.net, the app listings).
- `WebSite` with `SearchAction` pointing at `/search`.
- `Book` for each text (`name`, `author` as `Person` Tulsidas or Valmiki, `inLanguage`, `workExample` for each edition with `publisher` Gita Press and `isbn` where known). `Chapter` or `CreativeWork` with `isPartOf` for kand and unit pages, `position` for order.
- `Quotation` on chaupai pages (`spokenByCharacter` where the verse is dialogue, `isPartOf` the Book).
- `Person` for Tulsidas, Valmiki, Poddar, with `sameAs` to Wikidata.
- `BreadcrumbList` everywhere, `FAQPage` where there is an FAQ, `ImageObject` with `creditText` for every painting.
- `MobileApplication` on `/app` with the store IDs.

### 5.4 Technical checklist

- Next.js 16 App Router, static generation for every content page, Node runtime, `generateStaticParams` over all units in both languages. The content pages must ship near-zero client JavaScript.
- Reuse radhakrishna.net: tokens and `globals.css` (the holding page already uses the Prakash set), `site-header`, `site-footer`, `content-templates`, `content-blocks` (ShortAnswer, KeyTakeaways, FaqBlock, RelatedCards), `mdx.tsx`, `lightbox-image`, the `/og` route, `sitemap.ts`, `robots.ts`, `lib/schema.ts`, `lib/site.ts`, the IndexNow script, `check-og`, `check-links`, `visual-qa`. Add the verse reader (bhagavadgita.com's `--verse-*` token set and per-script font stacks are the model).
- Fonts: Crimson Pro and Inter (already self-hosted), Tiro Devanagari Hindi for the Manas, Tiro Devanagari Sanskrit for Valmiki, Noto Sans Devanagari for Hindi meaning and Hindi UI. Subset and self-host.
- Data: the app's `verified/` export (6,157 Ramcharitmanas units, Hindi and English) and the Valmiki edition as JSON in `content/`, built to a static index at build time. One source = one dataset. Verse IDs identical to the app so deep links work both ways.
- Sitemaps split by section (`/sitemap.xml` index, then pages, ramcharitmanas-en, ramcharitmanas-hi, valmiki-en, valmiki-hi, images). `lastmod` honest. Robots allows everything including GPTBot, ClaudeBot, PerplexityBot, Google-Extended: the site exists to be cited.
- Canonicals absolute, hreflang reciprocal and enforced in CI (the radhakrishna.net docs already specify this).
- IndexNow on every deploy for Bing (feeds Copilot, ChatGPT, Perplexity). Google through sitemaps only, plus Search Console URL inspection for the launch set.
- Core Web Vitals budget: LCP under 2.0s on a mid-range Android on 4G, CLS under 0.05. Paintings served as AVIF and WebP through `next/image`, sized per slot.
- Search: Pagefind or a prebuilt FlexSearch index shipped as static JSON, with a Roman-Hindi to Devanagari transliteration layer so "mangal bhavan" finds मंगल भवन. The app's search rules apply.
- 410 for the legacy spam targets that should not exist, 301 for everything in the redirect map below.

### 5.5 Legacy URL redirect map (recover the 2001 to 2015 links)

| Legacy URL                                                |                  Referring domains | Redirect to                                                           |
| --------------------------------------------------------- | ---------------------------------: | --------------------------------------------------------------------- |
| `/holy_places.htm` (and `?lang=en`)                       |                           291 + 24 | `/places`                                                             |
| `/hanuman.htm`                                            |                                  4 | `/characters/hanuman`                                                 |
| `/who_is_rama.htm`                                        |                                  3 | `/characters/ram`                                                     |
| `/books_excerpts.htm`, `/books_excerpts_pro.htm`          |                              3 + 1 | `/valmiki-ramayana`                                                   |
| `/k/yuddha-kanda/`, `/k/aranya-kanda/`, `/k/<kanda>/<n>/` |                             2 to 3 | `/valmiki-ramayana/<kanda>` and `/valmiki-ramayana/<kanda>/sarga-<n>` |
| `/s/1/index/`                                             |                                  2 | `/valmiki-ramayana`                                                   |
| `/images/ramayana-<kanda>-kanda-1.jpg` and `.gif`         | 35 (yuddha), 14 (bala), 8, 6, 3, 3 | the matching kand painting at its new path                            |
| `/gallery.htm`                                            |                                  1 | `/images`                                                             |
| `/dates&festivals.htm`                                    |                                    | `/festivals` (later) or `/`                                           |
| `/about_us.htm`, `/index.html`, `/comingsoon.htm`         |                                    | `/about`, `/`                                                         |
| `/crossword.htm`, `/coloring.htm`, `/contests&games.htm`  |                                    | `/` until a kids section exists                                       |

Then upload a disavow file to Search Console for the payday-loan and link-seller domains (the anchors "payday loans", "cash loans", and the SEO-service anchors are the filter). Google says disavow is rarely needed. For an exact-match domain inheriting 1,500 blogspot links and loan spam, it is cheap insurance for the first year.

---

## 6. Content, sources and the Gita Press question

### 6.1 What exists today in the app repo

| Text             | Layers                               | Source                                                                                           | Units        | Web status                                         |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------- |
| Ramcharitmanas   | Original Awadhi                      | Gita Press code 1318 (2019) transcription. The Awadhi text itself is public domain               | 6,157        | Clear to publish                                   |
| Ramcharitmanas   | Hindi tika                           | Gita Press code 790, Hanuman Prasad Poddar, under copyright                                      | 6,157        | Needs written permission                           |
| Ramcharitmanas   | English translation and Romanization | Gita Press code 1318, under copyright                                                            | 2,278 blocks | Needs written permission                           |
| Valmiki Ramayana | Sanskrit                             | IITK corpus (public domain text)                                                                 | 23,562       | Clear to publish                                   |
| Valmiki Ramayana | English                              | IITK (permission route), Dutt 1891 (public domain), AshuVj Uttara (AI-generated, do not publish) | 6 kandas     | Dutt clear. IITK needs a letter. No Uttara in IITK |
| Valmiki Ramayana | Sanskrit and Hindi                   | Gita Press VS 2017 first edition (r14 pack)                                                      | 19,966       | Needs written permission                           |

The HANDOVER notes record that the Gita Press permission is not yet confirmed in writing and that `data/sources.json` points to a `PERMISSION.md` that does not exist. Attribution and purchase links are the right thing to do and they are also the pitch, but they are not a licence. The web is a bigger exposure than the app: every page is indexable, copyable and will be scraped by the same sites that already carry the tika without credit.

### 6.2 Recommendation

1. Build the readers with a per-edition flag. Launch the original Awadhi and Sanskrit text, the Dutt English for Valmiki, and, for Ramcharitmanas English, the public-domain F. S. Growse translation if the OCR cleanup is done, otherwise launch Ramcharitmanas with the original text and the Hindi Wikisource public-domain bhavarth that the July research identified (PD edition, CC BY-SA transcription layer).
2. Send the Gita Press letter this week with the live site as the exhibit: free, no ads, every verse credited to the edition and code number, "Buy the book" on every page pointing at the product URLs already verified (`gitapress.org/product/sri-ramcharitmanas-special-edition` and the Ramcharitmanas category at gitapressbookshop.in), and the unlicensed-carriers report as the goodwill attachment. Ask for the Poddar tika, the 1318 English, and the Valmiki Sanskrit-Hindi edition for web and app, and for a link from gitapress.org.
3. Switch the Gita Press layers on the day the letter arrives. Nothing else in the architecture changes.
4. Write to IITK for the Valmiki English and commentaries, and to the Rao and Murthy estate behind valmikiramayan.net if we ever want that English.

### 6.3 The acknowledgement model as a feature

- `/gita-press`: who they are (Gorakhpur, 1923, Gobind Bhavan Karyalaya), the editions we use with code numbers and reprint years, how the digital text was verified against the printed pages, and buy links by edition and language. This page targets "gita press ramcharitmanas" and gives every verse page a place to link.
- Under every meaning: "Hindi tika: Hanuman Prasad Poddar, Gita Press code 790 · Buy the book". Under every English block: "English: Gita Press code 1318 · Buy the book". The link goes to the product page, never the homepage.
- `/acknowledgements`: publishers, translators, Wikisource volunteers, IITK, artists.
- `/how-we-verify`: the two-witness comparison, the source-page records, the word-for-word policy. This page is what makes "official" credible to a human and to Google's quality raters. It is also the page journalists link to.

### 6.4 Imagery

- Reuse from `ramayan-app/brand/`: the seven kand paintings (`kand/1-bal.png` to `7-uttar.png`), the ten deity paintings (`deity/`), the story and share backgrounds, and the `marketing/google-ads/2026-10-diwali/images/` crops already cut to 1200x628, 1200x1200 and 1200x1500. Note the HANDOVER flag: the Bal and Ayodhya kand paintings show Hanuman, a chronology error. Regenerate those two before they go on the web.
- Generate what the web needs with the same pipeline (`brand/gen_v3.py`, BRAND block plus MATTE line, `gpt-image-2.5-sunburst`, every prompt stating who must not appear): one painting per character page (15), one per place (7), one per chaupai card background family, a 1600px home hero, OG card art. Show samples before a full set. Judge faces at 60px for OG thumbnails.
- Every painting goes in `/images` with credit, `ImageObject` schema and an image sitemap. Devotional art is a real Google Images and Discover channel for this topic.

---

## 7. Phases and deliverables

### Phase A: launch kit, ship by Wednesday 5 November

Goal: be indexed and linkable before the film opens, and recover the legacy links.

1. Next.js skeleton from radhakrishna.net: layout, header, footer, tokens, fonts, `/og`, sitemap, robots, schema, IndexNow, Plausible or GA4, Search Console and Bing Webmaster verified, redirect map live, disavow filed.
2. Home. `/ramayana-movie` (en, hi). `/story` and seven kand story pages. `/ramayana-vs-ramcharitmanas`. `/who-wrote-the-ramayana`. `/tulsidas`. `/valmiki`. `/gita-press`. Fifteen character pages. Seven place pages. `/chaupai` with 25 chaupai pages. `/sunderkand` full text. `/ram-stuti`, `/ramayan-aarti`, `/shri-ramchandra-kripalu-bhajman`. `/daily-verse`. `/app`. `/about`, `/acknowledgements`, `/how-we-verify`.
3. Copy through Codex as the house rule requires, Hindi via the same route, no dashes, verified programmatically.
4. Day of release: the film page updated with the release itself. Share cards of the day's chaupai from the app and site, every day of the Diwali week.
5. Submit the launch sitemap, request indexing for the 30 most important URLs, push IndexNow.

Roughly 80 URLs in English and 80 in Hindi. That is a week of focused work with the data and components that already exist.

### Phase B: the two readers, 6 November to 20 December

1. Ramcharitmanas reader: 7 kand pages, 1,075 doha-group unit pages (English and Hindi, so 2,150 URLs), prev and next, search, share cards. Gita Press layers behind the flag, Growse or Wikisource bhavarth live.
2. Valmiki reader: 7 kanda pages, 648 sarga pages with Dutt English and Sanskrit, shloka anchors.
3. Reading plans with calendar: navah parayan, maas parayan, Sundarkand 30 days, "Ramayana in 21 days".
4. Verse of the day email and WhatsApp card (the app's global daily verse, same selection), the `/api/subscribe` route from radhakrishna.net.
5. Second batch of chaupai pages (to 108: "ramayan chaupai 108" is a live query), the "sabse shaktishali chaupai" question page, the Hanuman Chalisa cross-link to hanumanchalisa.net.

### Phase C: authority and depth, January to Ram Navami (26 March 2027)

1. Gita Press permission landed, layers switched on, press note with Gita Press if they agree.
2. Hindi interface and every page in Hindi. Hindi quotes and chaupai pages are the likely largest traffic source, as the Hindi quotes page is on bhagavadgita.com.
3. Audio: licensed recitations for Sundarkand and the aartis, with `AudioObject` schema and transcripts (the text is the transcript).
4. Kids and students: "ramayana for kids", "ramayana quiz", "ramayan question answer in hindi" (autocomplete shows a large school and quiz cluster). Quizzes are also link bait for schools.
5. Festival pages: Ram Navami, Diwali, Hanuman Jayanti, Vivah Panchami, Dussehra, Valmiki Jayanti, Tulsidas Jayanti. Each with the verses read on that day. Published six weeks before each date.
6. Public dataset and API on GitHub under the foundation, like the Gita repo. Open data earns developer links and citations.

### Phase D: the Part 2 window (Diwali 2027 or 2028)

By then the domain should hold the scripture head terms. Refresh `/ramayana-movie` for Part 2 six weeks out, publish the Lanka Kand and Yuddha Kanda material prominently (Part 2 is the war), and run the same share-card cadence.

---

## 8. Authority: how a DR 5 domain earns the right to rank

1. **Recover what exists.** The redirect map restores roughly 300 referring domains including Wikipedia in seven languages. Do this first.
2. **The network.** Contextual links from bhagavadgita.com (DR 36), hanumanchalisa.net (DR 9), radhakrishna.com (DR 9): the footer network block, plus editorial links (the Gita's Rama references, Hanuman Chalisa's Sundarkand connection, Radha Krishna's Ram Navami page). Same `Organization` entity on all four. The app store listings link here already.
3. **The publisher and the academy.** Ask Gita Press for a link from gitapress.org when permission is granted. Ask IITK's Gita Supersite team to list us. Both are DR 57 and 79.
4. **Wikipedia and Wikisource, honestly.** The Bay of Bengal citation already points at us. Once the Sundarkand and reader pages are live and clearly better than the PDF links in the External links sections of the Ramcharitmanas, Sundara Kanda and Ramayana articles, propose them on the talk pages rather than inserting them. Contribute the proofread Hindi bhavarth back to Hindi Wikisource under the foundation's account.
5. **Press at launch.** The story writes itself: as the biggest Indian film ever made opens, a foundation launches a free, ad-free, fully credited home for the original texts, and points readers to buy the books. Pitch to the religion desks (Navbharat Times, Dainik Jagran, Amar Ujala, Webdunia, The Hindu, Scroll, Swarajya) and the film desks as the "read the original" sidebar. Ten DR 70+ links in November is realistic.
6. **Community.** Answer the "where can I read the Valmiki Ramayana online" threads on Quora and Reddit (r/hinduism, r/india, r/bollywood during release week) with the actual pages. Temple and satsang sites, Ramayana mandals, the Ayodhya Ram Mandir ecosystem, the Ramayan Yatra train pages: each is a relevant link.
7. **Open data.** The GitHub dataset release, an API, and a developer page. The Gita API is why bhagavadgita.com has 1,649 ranking keywords with a small team.
8. **Brand searches.** The app, the share cards and the daily verse all carry "ramayana.com". Brand search volume is the strongest signal a new domain can send. Register the social handles and point them here. Create a Wikidata item for the site and the foundation with matching `sameAs`.

---

## 9. Measurement and honest targets

Track in Ahrefs Rank Tracker (the core list is the keyword set in this document, India and US) and Search Console weekly. GA4 or Plausible for behaviour, with "verse read" (15 seconds on a unit page) as the activation event, matching the app.

| Horizon               | Expectation                                                                                                                                                                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Week 1 (release week) | Site indexed, legacy links redirected, 80 to 160 URLs in the index, first impressions for film long tail and chaupai names. Zero head-term rankings.                                                                                                                                    |
| Weeks 4 to 8          | Top 10 for the KD 0 to 2 devotional terms where the page is best in class: mangal bhavan amangal hari, shri ramchandra kripalu bhajman, ramayan aarti, ramayan chaupai, sunderkand path, valmiki ramayana (English). Character long tail starts.                                        |
| Months 3 to 4         | Top 10 for ramcharitmanas, sunderkand, ram stuti, tulsidas, valmiki. Hindi pages begin ranking for Roman Hindi queries. 50k to 100k monthly visits.                                                                                                                                     |
| Months 6 to 12        | Page one for ramayana in India and the US on the informational intent, sitelinks for the brand, the knowledge panel for Ramcharitmanas citing us. Ramayana as a head term is a Wikipedia and Britannica fight and the film will hold the panel through 2027: treat it as the long game. |

Three things decide whether this happens fast or slowly: the redirects and launch kit shipping before 6 November, the Sundarkand page being genuinely the best on the web, and the readers being complete (every unit, both texts) by Christmas. Content gaps are what competitors' reviews complain about and what Google measures as coverage.

---

---

# Part II: Google's 2026 rules, the writing, and AI search

Added 2026-10-30 after Radhakrishna's note on core and spam updates, AI-generated content, voice, GEO and AEO, and agent-readable pages. Primary sources were read directly: Google's spam policies page (updated 2026-08-28), the helpful content page (updated 2026-10-05), the "AI features and your website" page (updated 2025-12-10), the Search status dashboard, the Search Central documentation changelog, OpenAI's, Anthropic's and Perplexity's crawler pages, the llms.txt v2 specification and Cloudflare's Markdown for Agents documentation. Third-party claims are marked as such.

## 10. Google in October 2026: what the rules actually say

### 10.1 The update calendar

| Update                        | Dates                | Note                             |
| ----------------------------- | -------------------- | -------------------------------- |
| December 2025 core            | 11 to 29 Dec 2025    |                                  |
| February 2026 Discover update | 5 to 26 Feb 2026     | Discover only                    |
| March 2026 spam update        | 24 to 25 Mar 2026    |                                  |
| March 2026 core update        | 27 Mar to 8 Apr 2026 |                                  |
| May 2026 core update          | 21 May to 1 Jun 2026 |                                  |
| June 2026 spam update         | 24 to 26 Jun 2026    |                                  |
| August 2026 spam update       | 18 to 20 Aug 2026    |                                  |
| September 2026 spam update    | 24 Sep to 7 Oct 2026 | Longest spam rollout of the year |

No October update has been announced. Forum chatter about Discover and News volatility since late August is unconfirmed. On the recent pattern a core update in November or December is likely, which means the launch kit will be indexed during or just before one. That is fine for a new site with nothing to lose, and it is a reason to have the editorial identity (10.3) in place from the first crawl rather than bolted on later.

### 10.2 The spam policies, and where this site touches them

Google's spam page is explicit that spam includes attempts to manipulate "generative AI responses in Google Search", and that scaled content abuse applies "no matter how it's created". Four policies are relevant to a scripture site with thousands of verse pages.

- **Scaled content abuse.** "Many pages generated for the primary purpose of manipulating search rankings and not helping users", with "using generative AI tools or other similar tools to generate many pages without adding value" as the first example. Our 1,075 Ramcharitmanas unit pages and 648 Valmiki sarga pages are the primary source text with published meanings, each a distinct unit a reader looks up by number, exactly as Bible Gateway, Sefaria and bhagavadgita.com publish. What would tip them into the policy is thin boilerplate around the verse: an auto-written "In this doha, Tulsidas tells us…" paragraph on every page. The rule is that the verse, the meaning and the notes are the page. Any extra prose on a verse page is written by a person for that verse or not at all.
- **Doorway abuse.** "Substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy." One page per intent, never one per spelling: sunderkand and sundarkand and sundar kand share one URL, ramayan and ramayana share the home page, the variants live in the title, the copy and the search index.
- **Expired domain abuse.** "An expired domain name is purchased and repurposed primarily to manipulate search rankings by hosting content that provides little to no value." ramayana.com was dormant, and it is being used for the Ramayana by a foundation that publishes scripture. Keep it that way: no off-topic pages, no affiliate content, nothing the 2001 site would not have carried.
- **Scraping.** Our text is transcribed from named printed editions with source-page records, not copied from other websites. The `/how-we-verify` page makes that visible.

### 10.3 Helpful content and the 1 October guidance on generative AI

The helpful content page was updated on 5 October, and the changelog records "updated guidance on using generative AI content" on 1 October, drawn from the quality rater guidelines. The sentences that matter:

- "Using generative AI to produce large amounts of text without manual oversight or curation represents little to no effort."
- "Is the use of automation, including AI-generation, self-evident to visitors through disclosures or in other ways? Consider adding these when it would be reasonably expected."
- "Any form of deception makes a page untrustworthy to both users and our automated quality systems." Fabricated author profiles are named as deception.
- The Who, How and Why test: bylines that link to author information, an explanation of how content was made including any automation, and content made primarily for people.
- Raters now evaluate main content for effort, originality, talent or skill, and accuracy, and the October guidance says the review of AI-assisted output covers titles, meta descriptions, structured data and alt text as well as body text.

What this means here:

1. **A real editorial identity.** The publisher is Ved Vyas Foundation. The editor is named (Samanyou), with an author page, a photo, the lineage, and `Person` schema with `sameAs`. Doctrinal pages carry a visible "Reviewed by" once a reviewing scholar is on board. No invented pandits, no stock photos.
2. **A "How this page was made" line** in the footer of every article page: written by the editorial team from the editions named above, drafted with AI assistance, edited and checked by a person, last reviewed on a date. Verse pages carry the source line instead, because their content is the published text.
3. **`/how-we-verify`** explains the transcription method, including that AI models read the scanned pages and that humans adjudicate, with the counts. This is the "How" of Who, How, Why, and it is the page that turns "official" from a claim into a method.
4. **Metadata is checked like body text.** Titles, descriptions and alt text are generated from the data (verse number, kand, first line), reviewed once per template, and never free-written by a model per page.
5. **Visible dates.** `datePublished` and `dateModified` in schema and on the page, and only changed when the content changes.

### 10.4 What Google says about AI Overviews and AI Mode

"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." A page must be indexed and "eligible to be shown in Google Search with a snippet". "There's also no special schema.org structured data that you need to add." The documented practices are the ordinary ones: allow crawling, link internally, good page experience, keep important content as text, verify in Search Console. AI features traffic is reported under the Web search type, not separately. Both features use query fan-out, so a question page that answers the five sub-questions a reader has is more likely to be pulled than five thin pages.

Two consequences. Never use `nosnippet`, `data-nosnippet` or `max-snippet` on content pages: they remove the page from AI Overviews eligibility. And add Google's preferred-sources button (documented 20 August 2026) on the home page and the Sundarkand page, so returning readers can mark ramayana.com as a preferred source in Top Stories and AI features.

### 10.5 Structured data in 2026

Google stopped showing FAQ rich results on 7 May 2026 (reported by several trade outlets, consistent with the Search Console changes since). `FAQPage` markup remains valid schema and other engines still parse it, so it stays where there is a real question list, and the visible FAQ is what matters. The graph in section 5.3 stands: Organization, WebSite, Book, Chapter or CreativeWork, Quotation, Person, BreadcrumbList, ImageObject. Google documented `creator` on `VideoObject` in September, relevant once audio and video exist. Structured data must match visible text, which the data-driven templates guarantee.

## 11. Writing with personality, without the tells

### 11.1 The voice

The devotee-scholar voice defined in radhakrishna.net's CLAUDE.md, in the manner of Swami Mukundananda. What that manner is, concretely, so a model can be briefed on it:

- **Starts from the seeker's question**, the way a satsang answer does. "Why does Tulsidas begin with a prayer to the letters of the alphabet?" is a better opening than "The Ramcharitmanas is a 16th century Awadhi epic."
- **Teaches through a story or a daily-life analogy**, then the verse. The analogy is homely and precise: a mother, a classroom, a mango tree, a train journey. Then the verse in the original, then its meaning, then what it asks of us today.
- **Quotes across the scriptures.** The Gita, the Bhagavatam, the Upanishads and the saints are brought in when they say the same thing, each with its reference. Tulsidas is read alongside Valmiki, never against him.
- **Warm, direct, confident, lightly humorous.** Speaks to "we" and "you". Hindi and Sanskrit words are used naturally and glossed once. No hedging, no academic distance, no debunking register, no sarcasm. Reverence for Ram, Sita, Hanuman and the saints is in the grammar, not in exclamation marks.
- **Ends with practice**, a line to take into the day, not a summary.
- **Never disparages another path** and never writes about a scripture by leading with what it lacks.

### 11.2 How the copy gets written

- **Model:** `codex exec -m gpt-6.1-sol` (verified working from the repo today with `--skip-git-repo-check`). It replaces the `gpt-5.6-sol` reference in the app's CLAUDE.md for web copy.
- **Grounding:** the prompt carries only verified material: the verse data, the Gita Press text, the kand summaries, the sources list and the People Also Ask questions for that page. The model never supplies a verse, a date or an attribution from memory. Every quoted verse is string-matched against the dataset before publish.
- **The brief** (one file, reused): the voice description above, three exemplar passages, the hard bans below, the page's purpose and audience, the answer-first and question-heading structure from section 12.
- **Hard bans, checked by script before anything ships:** em dashes and en dashes, semicolons, exclamation marks, "not just X but Y", triplet adjective stacks, rhetorical question headings, "In conclusion", "whether you're", "delve", "tapestry", "testament", "journey", "unlock", "embark", "landscape", "foster", "harness", "elevate", "profound", "vibrant", "seamless", "pivotal", "crucial", "notably", first-person narration of process ("I could not verify"), curly apostrophes. Sentence lengths must vary (the script flags a passage whose sentences all fall between 15 and 25 words). Bold-label bullet runs are flagged.
- **A person reads every page** before it goes live and logs it (date, reader). The subjective "humanizer" passes are not used: they flatten the voice. The brief and the ban list do the work.
- **Hindi copy** goes through the same model with the same brief in Hindi, written in Hindi, never translated from the English draft.

### 11.3 Where the personality lives, and where it does not

Verse pages are the text and the published meanings. They do not get a model-written essay each. Personality lives in the hubs, the kand introductions, the story pages, the character and place pages, the chaupai pages, the questions, the festival pages and the plans. That is about 200 pages of real writing, which is a scale a person can read and own. Three thousand verse pages carry a few human-written template lines and the scripture.

## 12. Answer engines: ChatGPT, AI Overviews, AI Mode, Perplexity, Claude

### 12.1 How each engine reaches the site

| Engine                          | Crawler to allow                                                       | Index it reads                                                                           | What to do                                                             |
| ------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Google AI Overviews and AI Mode | Googlebot                                                              | Google's index, same as Search                                                           | Rank. Snippet eligible. Preferred-sources button                       |
| ChatGPT search                  | `OAI-SearchBot` (search), `ChatGPT-User` (live fetch when a user asks) | Bing's index is reported as the primary source of its citations, plus OpenAI's own crawl | Bing Webmaster Tools verified, Bing sitemaps, IndexNow on every deploy |
| Perplexity                      | `PerplexityBot` (search), `Perplexity-User` (live fetch)               | Its own index                                                                            | Allow both                                                             |
| Claude                          | `Claude-SearchBot` (search), `Claude-User` (live fetch)                | Its own index                                                                            | Allow both                                                             |
| Gemini                          | Googlebot                                                              | Google                                                                                   | Same as Search                                                         |
| Training                        | `GPTBot`, `ClaudeBot`, `Google-Extended`                               |                                                                                          | Allow. See below                                                       |

Decision on training crawlers: allow them. The foundation's purpose is dissemination, and a model that has read the Gita Press wording with its attribution answers "what does doha 1 of Sundarkand mean" with our rendering and our name. Blocking training keeps the text out of the models that an increasing share of readers ask first. Set the `Content-Signal: ai-train=yes, search=yes, ai-input=yes` response header so the preference is explicit. Revisit if Gita Press asks for a different setting for their layers.

`robots.txt` therefore names each of these agents with `Allow: /`, keeps `Disallow` only for the search results URL pattern and any preview paths, and lists the sitemap index.

### 12.2 The prompts people type into assistants

These are the questions a reader asks ChatGPT, AI Mode or Perplexity rather than Google. Each gets a page or a section whose first paragraph answers it in 40 to 75 words with the verse and the source, so the answer can be lifted whole.

Film season: Which version of the Ramayana is the new film based on, Valmiki or Tulsidas? Is the Ramayana film faithful to the scripture? How much of the story does Part 1 cover? Where does Part 1 end in the epic? Who is Ravan in the scripture, and was he a scholar? What is the real story of Shabari, of Jatayu, of Urmila? Is the Ramayana history or mythology? How old is the Ramayana? Where can I read the original Ramayana in English?

The texts: What is the difference between the Valmiki Ramayana and the Ramcharitmanas? Which should I read first? How many verses are in each? What language is each in? Why did Tulsidas write in Awadhi instead of Sanskrit? What are the seven kands in order? What is the Uttara Kanda and why is it debated? How long does it take to read the Ramcharitmanas? What is navah parayan and maas parayan?

Daily practice: What does "mangal bhavan amangal hari" mean? What is the most powerful chaupai and what does it mean? Why is Sundarkand recited on Tuesdays and Saturdays? What happens in Sundar Kand? What is the Ram Stuti and who wrote it? How do I start reading the Ramcharitmanas at home? Which chaupai is for courage, for fear, for exams, for a new home?

People: Who wrote the Ramayana? Who was Valmiki before he was a sage? Did Tulsidas meet Hanuman? What else did Tulsidas write? What did Hanuman say to Sita in Ashok Vatika?

Buying: Which edition of the Ramcharitmanas should I buy? Is the Gita Press translation good? Which English translation of the Valmiki Ramayana is best?

For the film questions the honest answer is written from what is verifiable (the makers' public statements, the credits once the film is out, the texts themselves), never from a guess about the film's plot. Before release the page explains the two texts and which episodes belong to which, and after release it is updated with what the film showed, cited to the verses.

### 12.3 Page patterns that get extracted

What the citation studies agree on, and what the site does by nature:

- **Answer first.** Under every question heading, a self-contained answer of 40 to 75 words that names the entity in full ("the Valmiki Ramayana", "Goswami Tulsidas", "the Ramcharitmanas"), then the verse, then the explanation.
- **A short summary block** in the first screen of every hub and question page.
- **Question-phrased H2s** that match how the question is asked, in the reader's words.
- **Tables for comparisons.** Valmiki Ramayana against Ramcharitmanas: author, century, language, metre, verse count, kands, where each begins and ends, the best-known passage of each, which edition we use. Kand by kand length and reading time. Which chaupai for which occasion. Tables are reported to be extracted far more often than the same facts in prose.
- **Quotations, numbers, named sources** are the three levers the original GEO study measured, and a scripture site is made of them: the verse is the quotation, the counts and dates are the numbers, the edition and translator are the source. Make all three visible in the first screen.
- **Definitions** for every term on first use: doha, chaupai, soratha, chhand, kand, sarga, parayan, tika, bhavarth.
- **One idea per paragraph, stable anchors per unit** (`#doha-1`), consistent naming across the whole site, visible last-reviewed dates.
- **Off-site corroboration.** Engines trust what is corroborated elsewhere. Wikidata items for the site and the foundation, the Wikipedia external links once earned, the app listings, the GitHub dataset, YouTube (the most cited domain in AI answers, per 2026 citation studies) once kand summaries exist as short videos, and the Reddit and Quora answers from section 8.

### 12.4 Measuring it

- Search Console: AI features are counted inside the Web search type, so track the question pages' impressions and the queries that bring them.
- Bing Webmaster Tools, verified from day one, since ChatGPT's citations track Bing's top results.
- A monthly prompt audit: the forty prompts in 12.2 run in ChatGPT, Google AI Mode, Perplexity, Claude and Gemini, recording whether ramayana.com is cited, which page, and what the competing citations are. Stored in the repo as a dated table.
- Crawler logs from Vercel: hits from OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User and Googlebot per section, weekly.

## 13. Structure for humans and for agents

### 13.1 Every page is complete as HTML

Static server-rendered HTML for every content page, with the verse, the meanings, the source line, the prev and next links and the JSON-LD all present in the HTML response. No content behind a client-side tab, accordion or edition switcher: the default edition renders in HTML and the switcher is progressive enhancement. Semantic landmarks so extractors can strip chrome: `<header>` and `<nav>` for the site chrome, one `<main>` with one `<h1>`, `<article>` per unit, `<footer>` for the site footer. Language attributes on the scripture: `lang="awa"` for the Awadhi, `lang="sa"` for Sanskrit, `lang="hi"` for Hindi meaning. No interstitials, no cookie banner (none is needed), no text in images, no infinite scroll without per-unit URLs.

### 13.2 A Markdown twin for every page

Agents and model-driven fetchers do better with the content alone. Two cheap mechanisms, both serving the identical content that the HTML page shows, so there is no cloaking question (cloaking is showing a crawler different content. This is the same content in a second format, and Googlebot continues to receive HTML).

1. **`.md` twins at the llms.txt v2 convention:** `/ramcharitmanas/sunderkand/doha-1.md` for every page, generated at build time from the same data. Front matter with title, description and canonical URL, then the verse, the meanings, the source line with the purchase link, the prev and next links, and the JSON-LD as a fenced block at the end. Each HTML page carries `<link rel="alternate" type="text/markdown" href="….md">` and a `Link` header.
2. **Content negotiation:** a request with `Accept: text/markdown` on the HTML URL is rewritten in Next.js to the `.md` twin, with `Vary: Accept` and `Content-Type: text/markdown; charset=utf-8`. This is what Cloudflare's Markdown for Agents does at the edge for proxied zones. Our DNS at Cloudflare is DNS-only so Vercel terminates TLS, and doing it in Next.js is simpler than changing that. If the domain is ever proxied through Cloudflare, the zone setting can take over and the origin header `Content-Signal` is preserved.

A `/llms.txt` at the root (H1, a blockquote summary, then link lists for the hubs, the readers' index files, the question pages and the Markdown twins, with an Optional section for the rest), and per-reader index files such as `/ramcharitmanas/llms.txt`. Google has said it does not use llms.txt and the trade data says few crawlers request it. It costs an hour, it is the discovery convention the `.md` twins belong to, and it is read by the coding and research agents that increasingly answer "where can I read…" questions. No `llms-full.txt`: the whole corpus is too large for one file, and the per-section indexes do the job.

### 13.3 Data for agents, not only pages

The open dataset and public API from Phase C are the strongest form of agent readiness: a JSON endpoint per unit and a search endpoint, each response carrying the canonical ramayana.com URL and the source line, so an agent that answers from the API cites the page. An MCP server exposing "get verse", "search", "verse of the day" and "compare editions" lets Claude, ChatGPT apps and other assistants query the text directly with attribution. Build it on the same static data in Phase C, after the readers are complete, and document it on `/developers` so it earns the developer links the Gita API earned.

### 13.4 Changes to the earlier sections

- Section 5.4: add Bing Webmaster Tools verification, the `Content-Signal` header, the agent list in `robots.txt`, the `.md` twins, content negotiation, `/llms.txt`, and the preferred-sources button.
- Section 5.3: `FAQPage` stays only where a real question list exists. Add `Person` for the editor with `sameAs`, and `dateModified` on every page.
- Phase A adds: the editor page, `/how-we-verify`, the "How this page was made" footer line, the writing brief and ban-list script, Bing verification, `robots.txt` with the agent list, `/llms.txt`.
- Phase B adds: the `.md` twins and content negotiation when the readers ship, the first monthly prompt audit.
- Phase C adds: the public API, the MCP server, `/developers`, Wikidata items, short kand videos.

---

# Part III: decisions of 30 October and the duplicate-text test

Radhakrishna's decisions on the evening of 30 October, recorded so they are not re-litigated:

- **Gita Press layers go live now**, with acknowledgements and purchase links, without waiting for the letter. The per-edition switch is no longer a launch condition.
- **Organization** in all schema is Ved Vyas Foundation, `https://vedvyas.com/#organization`, the same id the other network sites use. No social profiles yet. Link bhagavadgita.com and the Android app wherever natural.
- **Fonts follow the app**: Literata, Inter, Tiro Devanagari Hindi, Noto Sans Devanagari.
- **"The official home of the Ramayana online"** is the site's line, as bible.com is for the Bible. The one guardrail stays: the footer and the film page say in plain words that the site is independent of the film, so "official" can never read as the film's official site during release week.
- **Trust line everywhere**: Free. No ads. No payments. A non-profit project of Ved Vyas Foundation.
- **Publishing cadence**: all pages are built, the sitemap releases a kand at a time (`lib/release.ts`), Sunderkand first, then Bal, Ayodhya, Lanka, Uttar, Aranya, Kishkindha, one every two to three days, submitted to Google and Bing as each is released.
- **Markdown twins and llms.txt**: agreed, built.
- **Pages for "where can I read X online"**: built for the Ramcharitmanas and the Valmiki Ramayana.

## 14. The duplicate-text test

**Correction, 30 October.** The first version of this section said only 3 of 28 passages had an exact copy and that the carriers had no traffic. Both statements were wrong, and the test cannot support them.

- Exact-phrase search has poor recall here. The two original Awadhi control lines, which are on countless sites, returned no carrier at all, so a blank result does not mean a passage is unique. The raw data is in `docs/research/keyword-data-2026-10-30/duplicate-text-test.json`.
- The traffic figures came from a wrong Ahrefs mode. With `subdomains`, ramcharit.in has about 9,400 monthly visits in India from about 1,160 keywords. ramcharitmanas.org has about 200. The July fingerprint study found the same tika on at least eight sites, including webdunia.com, a site with about 1.8 million monthly visits in India.
- The bhagavadgita.com lookup for a verse page returned no data, so it is no evidence for how duplicated verse pages rank. Only the domain-level result stands: 1,649 keywords.

**What is known.** The Gita Press text is widely copied, and ramcharit.in shows a site carrying it can earn real traffic. How a duplicated verse page ranks against a better page on a new domain is unmeasured.

**Recommendation: publish the Gita Press text unchanged and do not rewrite it with a model.** This rests on two reasons that do not depend on the test. A paraphrase of a copyrighted translation is a derivative work, so rewriting does not improve the rights position. The app's integrity rule forbids presenting a paraphrase as the published translation. The ranking question is settled by measurement after launch: compare Search Console impressions for Sunderkand doha pages against the original chaupai and article pages over the first month. If verse pages are not indexed, add human-written notes to the most searched verses before considering anything else.

---

## Appendix A: files and where things live

- Keyword exports, autocomplete, Ahrefs and SERP JSON: `docs/research/keyword-data-2026-10-30/`
- Prior research: `~/Documents/ramayan-app/research/` (aso-2026-10-22.md, gita-press-unlicensed-carriers.md, rcm-translation-sources.md, data-sources.md, competitor-content-analysis.md)
- Verified scripture data: `~/Documents/ramayan-app/data/verified/` (manifest, sources, seven kand files, navigation, notes)
- Art and generator: `~/Documents/ramayan-app/brand/` (kand, deity, share, gen_v3.py) and `~/Documents/radhakrishna.net/scripts/generate-art.mjs`
- Components to port: `~/Documents/radhakrishna.net/components/`, `lib/schema.ts`, `lib/site.ts`, `app/og/route.tsx`, `app/sitemap.ts`, `scripts/`
- Reader model: bhagavadgita.com frontend notes in `~/Documents/radhakrishna.net/docs/research/04-bg-frontend.md`

## Appendix B: the launch keyword set for rank tracking

India: ramayan, ramayana, ramcharitmanas, ram charit manas, shri ramcharitmanas, valmiki ramayana, valmiki ramayan, sunderkand, sundarkand, sunderkand path, sunderkand pdf, ram stuti, shri ramchandra kripalu bhajman, mangal bhavan amangal hari, ramayan chaupai, ramayan ki chaupai, ramcharitmanas chaupai, ramayan aarti, aarti shri ramayan ji ki, tulsidas, goswami tulsidas, valmiki, who wrote ramayana, who wrote ramcharitmanas, ramayana story, ramayan katha, ramayana characters, ramayana in english, ramayan in hindi, ramcharitmanas in hindi, ramcharitmanas pdf, ramayan book, gita press ramcharitmanas, ramayana vs ramcharitmanas, ramayana movie original story, ramayana 2026, ramayana part 1, ayodhya kand, kishkindha kand, bal kand, lanka kand, uttar kand, aranya kand, urmila, jatayu, shabari, kaikeyi, mandodari, vibhishan, read ramayana online, read ramcharitmanas online.

US: ramayana, ramayan, ramayana movie, ramayana story, ramayana summary, ramayana in english, valmiki ramayana, ramcharitmanas, sunderkand, ram stuti, ramayana characters, who wrote ramayana, ramayana book, tulsidas, valmiki.
