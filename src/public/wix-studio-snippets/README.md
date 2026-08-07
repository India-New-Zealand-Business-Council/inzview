# Section snippets

One HTML file per section of the site. `scripts/build-sections.js` concatenates them per
page into `src/public/sections.js`, which page code loads into that page's Embed Code
element as a `data:` URI.

> **Editing a file here does not change the site on its own.** Run
> `node scripts/build-sections.js` and push. See [EDITING.md](../../../EDITING.md).

## The rules

**1. No inline styles. Ever.**

These files used to carry ~290 `style="…"` attributes. An inline style beats any stylesheet
rule, so the design system in `BASE_CSS` could not reach the markup it was meant to style —
it had to fight back with `!important`, and mostly lost. Use the classes below.

**2. Never edit `site-head.html` or `sections.js`.** Both are generated. `site-head.html` is
written from the same token block as `BASE_CSS` specifically so the two cannot drift apart
again; it had been left on a superseded system, still loading Merriweather and Big Shoulders.

**3. The build enforces both.** These fail the build with a file and line number:

| Banned | Why |
|---|---|
| `style="…"` | see rule 1 |
| `Big Shoulders`, `Merriweather`, `Impact,` | retired typefaces; the system is Poppins |
| `#16307f` `#c1acfb` `#f6f5f8` `#f05b29` `#160933` `#e8e6ee` | retired palette values; use a token |
| `rgba(255,255,255,…)` | use `--inz-on-dark` / `--inz-on-deep` / `--inz-on-deep-muted` |

**4. Internal links use `onclick="inzNav(event, '/path')"`,** never `target="_top"`. The
Embed Code element is a sandboxed iframe and the sandbox silently swallows `_top`.

**5. `[[placeholder]]` stays until INZBC supplies the fact.** The build wraps each one in a
visible marker, counts them per page, and `INZ_RELEASE=1` refuses to build while any remain.
A placeholder inside a tag, `<script>` or `<style>` cannot be wrapped and fails the build.

## The class vocabulary

Every class was extracted from a pattern that appeared **3 or more times** with the same
intent. Do not add a class for a one-off; do not reach for a new value when one of these fits.

### Bands

| Class | Use |
|---|---|
| `inz-section` | Every band. Required — the scroll reveal selects it. |
| `inz-section--paper` / `--mist` / `--dark` | Band surface. Alternate them for rhythm. |
| `inz-section--tall` | Taller padding, for an opening or closing band. |
| `inz-center` | Centres the band's text and its headings, lede and kick. |
| `inz-container` | Width cap. One per band, directly inside the section. |

### Content

| Class | Use |
|---|---|
| `inz-lede` | The larger opening paragraph under an `h1`. |
| `inz-prose` | Wraps a run of body copy at a 68ch measure. Styles `ul` / `ol` inside it. |
| `inz-kick` | The gold rule and label that opens a band. |
| `inz-note` | Small print: source citations, meta lines, captions. |
| `inz-grid` (+ `--wide`, `--tight`) | Auto-fitting card grid. Default 16rem, wide 18rem, tight 14rem. |
| `inz-card` (+ `--raised`) | A tile. Inverts against its band automatically. |
| `inz-person` | With `inz-card`: a name and a role. |
| `inz-stat` + `inz-stat__figure` | A large sourced figure and its caption. |
| `inz-split` (+ `--media`) | Two columns: copy beside a CTA, or copy beside an image. |
| `inz-media` | Placeholder or frame for an image. |
| `inz-strip` | The centred credibility line. |
| `inz-logos` + `inz-logo` | Partner logo tiles. |
| `inz-rail` | Sideways links to sibling pages. |
| `inz-actions` (+ `--center`) | A row of buttons. |
| `inz-btn` + `--primary` / `--secondary` / `--sm` | Buttons. |

### Colour

Never write a hex or an `rgba()` in a snippet. Contrast is asserted at build time against
both palettes, and a raw value is invisible to that check.

| Token | Use |
|---|---|
| `--inz-navy` `--inz-ink` `--inz-deep` | Dark surfaces |
| `--inz-gold` | The CTA fill. Takes navy text, never white. |
| `--inz-blue` `--inz-orange` | Secondary and warm accents |
| `--inz-note-text` `--inz-stat-text` | The same hues, darkened until they clear AA on the tinted surface. Use these for text. |
| `--inz-on-dark` `--inz-on-deep` `--inz-on-deep-muted` | Text on dark surfaces, pre-flattened |
| `--inz-focus-light` `--inz-focus-dark` | Focus rings. Two, because no single colour clears 3:1 on both paper and deep. |

## Adding a section

1. Write the file here using the classes above.
2. Add its name to that page's array in `PAGES` in `scripts/build-sections.js`.
3. `node scripts/build-sections.js`
4. Check the placeholder count in the build output.

## Before publish

- Replace every `[[placeholder]]`. `INZ_RELEASE=1 node scripts/build-sections.js` must pass.
- `executive-council.html` carries real board names, read from inzbc.org on 27 July 2026.
  **The Board confirms currency before publication.** Do not add, drop or reorder a name.
- The two-way trade figure is unresolved: `$3.68b` (migration guide) vs `NZ$3.95bn` (FTA
  corpus). See `ARCHITECTURE.md`. Do not reword or round the sourced figures.
- The NZ–India FTA is **signed and not in force**. Do not imply otherwise.
