# INZVIEW handover

Written 10 August 2026. Everything below was measured on the running site, not assumed.
Where something is unverified it says so.

## What this is

The INZBC website, rebuilt on Wix Vibe (Astro + React + Tailwind + framer-motion), replacing
an earlier Wix Studio build that was retired. INZBC is the India New Zealand Business
Council: a bilateral trade body founded 1988, and New Zealand's leading platform on the
NZ&ndash;India Free Trade Agreement.

| | |
|---|---|
| Repo | `India-New-Zealand-Business-Council/inzview` (private) |
| Vibe project | `f7cde676-7f27-464a-bbec-c2920efd7398` |
| Live | `https://my-site-9qksqx7j-inzbcsecretariat.wix-vibe-site.com/` |
| Head | `2a39d95` |
| History | 93 commits, back to 5 August 2026 |

## How to work on it

**Edit locally, push, then publish.** Pushing to `main` syncs the code into the Vibe
workspace but does **not** update the live site. Publishing is a button in the Vibe editor
and there is no API for it (`POST /site-actions/v1/publish` returns 404; the Wix API key
reaches the site for data operations only).

**Dependencies will not install locally.** `@wix/locale-dataset-javascript` lives on Wix's
private registry, so `npm install` fails with E404 and there is no local type-check or
build. Verification happens in the browser against the published site. This is the single
biggest constraint on working here.

**The workspace and the repo are two writers on one branch.** Pushing while the Vibe
workspace holds uncommitted generated changes produces a merge that someone has to resolve
by hand. That already happened once: the workspace committed literal conflict markers into
five source files including `Router.tsx` and `HomePage.tsx`, which would have failed the
build outright. Fixed in `b748245`. Before pushing, check the workspace has no pending
changes.

## Layout

```
src/components/inzbc/
  content.ts        Copy, 11 real destinations, 18 image URLs, the 3 sourced figures
  pages.ts          Route table; the nav reads the same list
  motion.tsx        Scroll hooks, Reveal, WordReveal, Parallax, TiltCard, CountUp,
                    ScrollProgress, StickyHeader
  TradeRoute.tsx    The page-length SVG line that draws on scroll
  PinnedJourney.tsx The pinned statistics section
  Sections.tsx      Make Connections, summit, advertise, connect, newsletter, partners
  InnerPage.tsx     Shell for the ten inner routes
src/components/pages/HomePage.tsx   19 sections
public/events/      Four INZBC event photographs
legacy/wix-studio/  The retired Studio build, kept for its content and history
```

`legacy/wix-studio/` exists only to carry the old commit history and the sourced copy. It is
not built and can be deleted once its content has been migrated; the commits stay in the log
either way.

## Rules that are not negotiable

**Never invent a fact.** Member counts, event dates, venues, article summaries, testimonials
and company names are all things INZBC has to supply. Where one is missing the page renders
a visible `[[marker]]`. Four are live right now:

- `[[member count — confirm with INZBC]]`
- `[[FTA summary copy — pull from the FTA Overview page once drafted]]`
- `[[Article summary — confirm with INZBC]]`
- `[[Page body still to be migrated]]` on each inner page

A visible gap is better than plausible filler nobody has checked. Do not "tidy these up".

**Only three figures may be stated**, and each carries its source line: NZ$3.95bn two-way
trade (year ended December 2025), 95% of NZ exports receiving tariff elimination or
reduction, 57% duty free from day one. Sourced from MFAT's National Interest Analysis.

**The FTA is signed, not in force.** Signed 27 April 2026, awaiting domestic ratification in
both countries. The old site said "now in effect" and that was wrong.

**Photography must be INZBC's own.** The four event photographs came from INZBC's Flickr.
They are all Summit 2018 because that is what the archive holds, and the caption says so.
Google Images was offered and not used: images of unknown provenance on an organisation's
own site put that organisation on the hook.

## Design system

Palette, all pairs checked against WCAG AA: ink `#1a0b3f`, deep `#0e0522`, navy `#160933`,
forest `#1b4640`, lime `#b8f07c`, plum `#61145f`, mist `#f4f2f8`, body `#3a3742`.

Lime is the only accent and always carries dark ink text, never light. Surfaces alternate so
no two adjacent bands share one. Poppins throughout, loaded in `Head.tsx` because
`src/styles/fonts.css` is generated and empty; without that every heading falls back to
system-ui.

Measured on the live page after the last commit: **zero contrast failures**, focus rings on
every link and button, carousel dots 10px inside a 44px target.

## Bugs already found here, so they are not rediscovered

**Scroll effects are not driven by framer's `useScroll`.** The Astro template shipped
`height: 100%` on html, body and `#root`, which caps the document box at one viewport while
the content runs to 7500px. framer measured the scrollable range as empty and pinned every
value to zero: nothing errored, the page rendered, and every scroll-linked effect was
silently dead. The template now uses `min-height`, and the hooks in `motion.tsx` read
`window.scrollY` directly and coalesce on rAF so they do not depend on that measurement.

**`CountUp` looped forever.** `value.match()` returns a fresh array each render; passing it
as an effect dependency compared unequal every time, so the effect re-ran, set state,
re-rendered, and started again. The figure animated without ever settling. It now depends on
the extracted digits, target and decimal count.

**`CountUp` also showed false numbers.** Counting from zero meant the page briefly displayed
`NZ$1.53bn`. The animated figure is now `aria-hidden` with the true value in an `sr-only`
span, and settles on the exact source value on completion and on unmount.

**Reveal used to hide content permanently.** It set `opacity: 0` as its initial state and
cleared it only when an observer fired. When that did not happen on the live build, the hero
headline and both buttons never appeared. Content is now visible by default and hidden only
after the client confirms it can animate. Do not reintroduce an animation that stands between
the reader and the words.

## Measurement traps

Three times in this project a working feature was nearly reported as broken because the
measurement was wrong. Check the instrument before writing the diagnosis.

- **Chrome extension JavaScript runs in an isolated world.** Injected `scroll` listeners
  never receive events, so scroll-linked code looks dead when it is fine. Use real wheel
  events.
- **`element.focus()` does not trigger `:focus-visible`.** Focus rings look missing. Press
  Tab instead.
- **Lazy images below the fold report `naturalWidth: 0`.** They look broken. Scroll first.

## What is still open

Needs INZBC to supply something:

1. **India Industry Partners** logos (FICCI, CII, PHD Chamber and others). The row exists on
   the old site and is absent here. Needs logo files and URLs.
2. **Contact form.** Needs a Wix Form so submissions reach the Secretariat. Currently an
   email link, because a form that silently discards a message is worse than no form.
3. **Event photography after 2018**, if the Summit 2018 set is not acceptable.
4. **The four `[[markers]]` above.**

Code work that can start now:

5. **Inner page bodies.** Ten routes have real titles and ledes but no body. The sourced copy
   is in `legacy/wix-studio/src/public/wix-studio-snippets/*.html`, 42 files.
6. **Individual partner logos.** The wall is one flattened JPEG, so no logo is clickable.
7. **36 tap targets under 44px.** Mostly nav links at 42px and inline text links inside
   paragraphs, where a 44px box would break line spacing. A real trade, worth revisiting.
8. **A screenshot timeout after scrolling**, roughly 30 seconds of unresponsive renderer.
   Never chased. Suspect the parallax springs plus the 300vh pinned section. Worth profiling.

## Content parity

`legacy/wix-studio/docs/parity-matrix.md` maps every destination, form, archive and content
route on the old inzbc.org to where it lives now, built by diffing the real link list against
the built output. It exists because the first rebuild quietly dropped the events calendar,
the member directory, the Make Connections showcase and the advertising route while being
described as finished. Keep it current: a destination may only leave the site with a row
saying it was dropped and why.
