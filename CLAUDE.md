@AGENTS.md

# ramayana.com content rules

These rules apply to every page, story, FAQ, caption and description on the site.

## Who writes
- All original prose is written by **GPT-6.1 Sol through Codex** (`codex exec -m gpt-6.1-sol --skip-git-repo-check --sandbox read-only`). Claude plans, researches, grounds, checks and integrates. Claude does not write site prose itself.
- Every Codex writing prompt includes: the `mukundananda-voice` skill (`~/.claude/skills/mukundananda-voice/SKILL.md`), the style samples and notes in `~/.claude/skills/mukundananda-voice/samples/` (Swami Mukundananda plus other simple spiritual writers), the exact source verses with Gita Press Hindi tika and English, the facts allowed, the target language, word counts and output format.
- Language follows the reader: English pages in English, Hindi pages in natural Hindi, Hinglish for lyrics transliteration and search spellings.

## How it must read
- Like a warm, knowledgeable person wrote it. Simple words, short sentences, a story or daily-life example, scripture quoted with its reference, a small practice at the end.
- Never: em or en dashes, semicolons, exclamation marks, rhetorical-question headings, "not just X but Y", filler and AI vocabulary (see `~/.claude/skills/mukundananda-voice/slop/banned.json`).
- Never process language: no "supplied passage", "the text above", "दिए गए अंश", no mention of AI, datasets, transcription or verification.
- Ground every factual claim in `content/ramcharitmanas` or `content/valmiki`. Quote verses exactly as in the data. Where the two texts differ, say so. Later traditions are labelled as such.

## Pipeline: nothing goes live without passing every gate
1. **Ground**: collect the verse ids and text the page relies on.
2. **Draft**: Codex GPT-6.1 Sol with the full prompt above.
3. **Slop gate**: `python3 ~/.claude/skills/mukundananda-voice/slop/check.py <files>` must exit 0. Flagged sentences go back to Codex with `slop/REVIEW-PROMPT.md`.
4. **Fact gate**: every Devanagari quote matches the data verbatim, every reference names the right kand, doha or sarga.
5. **Editorial review**: a second Codex pass reads the page as an editor (accuracy, tone, repetition, reading level, respect) and lists fixes. Apply them.
6. **Build**: `npx next build` passes.
7. **Visual QA**: screenshot the page at 390px and 1440px, review the screenshots yourself and with Codex (`codex exec -i shot.png`) for layout breaks, hierarchy, overlap, broken Hindi rendering, wrong or disrespectful images.
8. **Images**: any image shown must correctly depict what the page says. Check new images yourself and with Codex. Wrong depictions are replaced or removed, never left.
9. **Publish**: push to main, confirm the live URL returns 200, ping IndexNow, add the URL to `docs/urls.md`.

## Copyright
- Public-domain scripture and bhajans (Tulsidas, Valmiki, Meera, traditional) may be printed in full.
- Copyrighted film and TV song lyrics are not reproduced in full. Song pages print the scripture lines the song uses, explain meaning and scene, credit the song and link the official video.

## Never chase
Box office, gossip, piracy ("download", "watch free"), cast rumours.
