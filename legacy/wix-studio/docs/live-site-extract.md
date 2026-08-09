# What the live site actually uses

Extracted from `https://www.inzbc.org` by reading computed styles and image sources,
6 August 2026. Machine-read, not eyeballed.

## The palette conflict — decide this before any design work

**The live site does not use the palette in `docs/design-decisions.md`.** Two different
systems:

| | Live `inzbc.org` | Repo `design-decisions.md` |
|---|---|---|
| Primary dark | `#1B1464` indigo | `#160933` navy |
| Accent warm | `#D0611D` burnt orange | `#F05B29` tangerine |
| Secondary | `#097BB8` blue | `#261866` blue |
| Highlight | `#F8C70C` gold | `#C1ACFB` lavender |
| Other | `#4A3F37` brown | `#61145F` purple, `#B8F07C` lime, `#1B4640` forest |
| Body text | `#414141` | `#160933` |

They are close in spirit and different in every value. `#1B1464` vs `#160933` will read as
a mismatch side by side.

**Which is right is a client question.** The repo palette is what the sections currently
render. If the brand kit matches the live site, `design-decisions.md`, `BASE_CSS` in
`scripts/build-sections.js` and `site-head.html` all need updating together. Do not change
one and leave the others.

Note the contrast rule survives either way, but the numbers must be rechecked: navy
`#160933` on tangerine `#f05b29` is 5.56:1. `#1B1464` on `#D0611D` has **not** been
measured. Measure before adopting.

## PROVISIONAL — under consideration, not yet approved by INZBC

A third option, added 6 August 2026, pending Sunil/INZBC confirmation. **This does not
resolve the conflict above** — it sits alongside the live-site and repo palettes as a
candidate, not a replacement for either. Do not build against it until approved.

| | Provisional |
|---|---|
| Primary (60%) | Deep Navy `#12203D` — trust/heritage |
| Accent (30%) | Marigold/Saffron `#E86A17` — distinct, India association |
| Secondary/Bridge (10%) | Teal `#0E7C86` — differentiator, bridges NZ/India visually |

Rationale: sourced from 2026 B2B branding research — a trust-color-plus-distinctive-accent
pattern, allocated on a 60/30/10 rule, tied to INZBC's bicultural India–NZ identity (a third
axis neither the live site's nor the repo's current palette names explicitly).

Contrast, computed the same way as the rest of this doc, not yet independently verified:
navy `#12203D` on marigold `#E86A17` is ~5.0:1 (passes AA normal text). White on marigold is
~3.23:1 (fails — same lesson as tangerine: keep it an accent, not a text background). White
on teal `#0E7C86` is ~4.95:1 (passes, usable as a secondary surface with white text).

## Typography

| | Live | Repo |
|---|---|---|
| Body | `proxima-n-w01-reg` (Proxima Nova), Open Sans | Merriweather (serif) |
| Headings | same sans | Big Shoulders (condensed, uppercase) |

Also different. The live site is entirely sans-serif; the repo pairs a condensed display
face with a serif body. The repo's choice is more distinctive; the live one is more
conventional. A deliberate call, not an accident to "fix".

## Homepage section order, live

`EVENTS` → `NEWS AND …` → `PUBLICATIONS` → `MEMBERSHIPS` → `TRADE WITH INDIA`

Worth noting the live homepage leads with **Events**, not the FTA. The migration guide and
our build both lead with the FTA. That is an intentional repositioning, and it is the main
visible difference a stakeholder will notice.

## Real images available

23 images with `naturalWidth > 200`, all on `static.wixstatic.com`. Useful ones:

| Asset | URL stem (`https://static.wixstatic.com/media/…`) | Size |
|---|---|---|
| Kia Ora India, Dec 2023 cover | `df219d_1d5b0e8ae35b42ac9d2ab52dd9628409~mv2.jpg` | 331×458 |
| INZBC Report 2025 cover | `df219d_4ffc59bcc17b482ba5850f648d232e29~mv2.png` | 331×458 |
| Partner logo strip | `df219d_b411f5cc4d2a4486af6546d2cef33137~mv2.jpg` | 750×299 |
| "Inside the NZ India FTA with Vangelis Vitalis" Auckland flyer | `df219d_02d3666e34b24f1fbebef0ecaa241ac6~mv2.png` | 322×242 |
| FTA "new era for business" article image | `df219d_5a6b761bab7540eb9a4fb73222fe2cd7~mv2.jpg` | 320×240 |
| Newsletter mock-up | `df219d_436b6b1421bf47f9a00a2580241b8e3d~mv2.png` | 506×245 |
| Wide banners (hero candidates) | `df219d_e6b3ac4fcb3f410a9ed94ce82358aa15~mv2.jpg`, `df219d_46e881c4b3bb473bbf2ae5cb4b4a1663~mv2.jpg` | 1281×885, 1281×291 |
| Logo (small, JPEG) | `df219d_2d71ec5733bb48188fa2122283da96da~mv2.jpg` | 280×72 |

**Do not hot-link these into the new site.** They live in the live site's media library and
the new site is a separate Wix account; the URLs work today but tie the rebuild to the old
site's assets. Download and re-upload to the new site's Media Manager.

Several have unusable filenames as alt text — `WhatsApp Image 2025-05-12 at 2.06.54 PM.jpg`,
`Screenshot 2021-07-01 at 12.44.04 PM.png`. Anything reused needs real alt text; that is
an accessibility requirement, and `docs/accessibility-audit.md` in the `inzbc` repo covers
the standard.

The logo on the live site is a 280×72 JPEG — too small and wrong format for a rebuild.
Use `INZBC_Logo_Files.ai`, exported to SVG.

## Content confirmed present on the live site

- Named event: **Inside the NZ India FTA with Vangelis Vitalis**, Auckland.
- **INZBC Report 2025** exists and has a cover — the guide calls it *Grow With India, The
  New Zealand India Trade Report*.
- **Kia Ora India** latest visible issue is **December 2023**, matching the note in
  `insights-newsletters.html` that its cadence needs confirming.
