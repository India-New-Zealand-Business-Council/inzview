# Target site architecture

From *INZBC Website Stocktake, Migration Plan and Wix Implementation Guide*, v1.0,
7 June 2026 — the client's own plan. `docs/website-redirect-map.md` in the `inzbc` repo
cites its §5. This file records the target so future pages are a one-line change rather
than a fresh decision.

To add any page below: create it in the Editor (pages cannot come from git — see
[EDITING.md](./EDITING.md)), add its section HTML under
`src/public/wix-studio-snippets/`, add the key to `PAGES` in
`scripts/build-sections.js` and to `KEY_BY_PAGE` in `scripts/wire-pages.js`, then
`node scripts/build-sections.js && node scripts/wire-pages.js`.

## Two conflicts to resolve before building further

**1. The FTA hub slug.** The guide's §7 step 4 gives `/nz-india-fta`. Bhanu directed `/fta`
on 6 Aug 2026, with the explainer nested under it. `/fta` is shorter and is already the
CTA target in `home-hero.html`. **Built as `/fta`** — the guide is a June document and
Bhanu's call is later, but this is a client document being overridden, so it is recorded
here rather than silently changed.

**2. Two-way trade figure — do not "fix" this to match the guide.** The guide's homepage
wireframe says **$3.68b**. `trade-stats.html` says **NZ$3.95bn**, sourced from
`docs/fta-source-corpus.md` for the year ended December 2025. The corpus figure is later
and sourced; the guide's is from June. **The repo keeps NZ$3.95bn.** This is a known
open conflict — it is what PR #28 in the `inzbc` repo was pulled up on. Someone at INZBC
must confirm which is current before either is published.

The guide also states a **300,000 strong Indian diaspora**. `trade-stats.html` carries
`[[TBD]]` for this. The guide is INZBC-supplied but is a planning document, not a
statistics source, so the figure stays a placeholder until sourced.

**3. Palette — live site vs. repo, and now a third provisional option.** The live site's
colors do not match this repo's (`docs/live-site-extract.md` has the full comparison table).
As of 6 August 2026 there is also a **provisional third palette** under consideration
(Deep Navy `#12203D` / Marigold `#E86A17` / Teal `#0E7C86`, bicultural-identity rationale) —
see `docs/live-site-extract.md` for the full writeup and contrast numbers. **Not approved.**
Nothing in this repo is built against it; both the live-site-vs-repo conflict and this third
option await Sunil/INZBC confirmation.

## Navigation — 8 top-level items, per the guide

| Top level | Children | Purpose |
|---|---|---|
| Home | — | FTA, trade, membership, events, partners |
| NZ India FTA | FTA Overview, Key Tariff Outcomes, Sector Opportunities, Exporter Resources, FTA Events and Briefings | Own the NZ–India FTA information space |
| Trade | Export to India, Import from India, Trade Missions, Market Intelligence, Trade Shows | Move businesses from interest to action |
| Events | Upcoming Events, Event Calendar, Past Events | Event discovery and registration |
| Membership | Why Join, Membership Plans, Member Benefits, Member Directory, Join INZBC | Convert visitors to members |
| Insights | Publications, Reports, Newsletters, Videos, FTA Insights | Turn content into authority pages |
| Media Centre | News, Press Releases, Media Coverage, Commentary | Media authority and positioning |
| Partners | Sponsors, Strategic Partners, Patron, Partner With Us | Sponsor retention and leads |
| About | About INZBC, Executive Council, Chapters, Contact | Trust and governance |

### Navigation implementation — sandboxed iframe, no `target="_top"`

Every page's Embed Code element is a sandboxed iframe (confirmed against Wix's own docs:
["Working with the HTML iFrame Element"](https://dev.wix.com/docs/develop-websites/articles/wix-editor-elements/other-elements/html-i-frame-element/working-with-the-html-iframe-element))
with no direct access to the parent page and no way to grant it `allow-top-navigation`. A
plain `<a href target="_top">` is silently swallowed — no navigation, no error. Fixed
6 August 2026 using Wix's documented [iframe↔page messaging
API](https://dev.wix.com/docs/velo/velo-only-apis/$w/html-component/messaging-between-a-site-page-and-an-html-element):
every internal link calls `inzNav(event, path)` (`build-sections.js`'s `NAV_SCRIPT`), which
posts `{ path }` to `SITE_ORIGIN` (never `"*"` — Wix's docs warn that lets any site
intercept the message); each page's generated code (`wire-pages.js`'s template) receives it
via `$w('#html1').onMessage(...)` and calls `wixLocation.to()`. Any new internal link must
use this pattern, not `target="_top"` — see `WIX-TASKS.md`'s "Navigation fix — needs live
verification" for the live-testing status.

## Built so far — 20 pages

`home`, `about`, `membership`, `membershipJoin`, `memberDirectory`, `events`,
`eventsPast`, `tradeMissions`, `indiaMarketOpportunities`, `publications`, `newsletters`,
`news`, `partners`, `connect`, `executiveCouncil`, `ourPatron`, `fta`, `ftaExplainer`,
`tradeResources`, `digest`.

## Still to add

Pages the guide calls for that do not exist yet. Slugs are proposed, not confirmed:

| Page | Proposed slug | Note |
|---|---|---|
| FTA Overview | `/fta/overview` | or fold into `/fta` |
| Key Tariff Outcomes | `/fta/tariff-outcomes` | data tiles; sourced figures only |
| Sector Opportunities | `/fta/sectors` | overlaps `indiaMarketOpportunities` — merge or cross-link |
| Exporter Resources | `/fta/exporter-resources` | downloads |
| FTA Events and Briefings | `/fta/events` | may just filter `/events` |
| Export to India | `/export-to-india` | guide names this a top search term |
| Import from India | `/import-from-india` | |
| Market Intelligence | `/trade/market-intelligence` | relates to `digest` |
| Trade Shows | `/trade-shows` | **careful**: `/trade-shows` 404s today and the redirect map already sends it to `/trade-missions`. Reusing the slug would collide with that 301 |
| Event Calendar | `/events/calendar` | |
| Why Join | `/membership/why-join` | |
| Membership Plans | `/membership/plans` | blocked on the 1 Jan 2026 fee structure |
| Member Benefits | `/membership/benefits` | |
| Member Spotlight | `/membership/spotlight` | CMS-driven per the guide |
| Reports | `/insights/reports` | |
| Videos | `/insights/videos` | |
| FTA Insights | `/insights/fta` | blog category, may not need a page |
| Press Releases | `/media/press-releases` | |
| Media Coverage | `/media/coverage` | |
| Commentary | `/media/commentary` | |
| Strategic Partners | `/partners/strategic` | |
| Partner With Us | `/partners/partner-with-us` | |
| Chapters | `/about/chapters` | Mumbai, Delhi, Wellington, Christchurch leads exist |
| Boardroom to Border Auckland | `/events/boardroom-to-border-auckland-2025` | live `/india-x-nz` redirects here |
| Boardroom to Border Christchurch | `/events/boardroom-to-border-christchurch-2025` | live `/copy-of-boardroom-to-border`. A distinct event, not a duplicate |

Every nested slug needs **URL hierarchy flattening OFF**.

## Blog

157 posts per the guide, 154 per the live sitemap read 31 July 2026. Neither figure should
be quoted until reconciled in the Wix dashboard. Categories the guide asks for: FTA
Insights, India Market Updates, INZBC News, Events, Reports, Commentary.

## Assets

- Logo: `C:\Users\brett\Downloads\INZBC_Logo_Files.ai` (local, not in git — export PNG/SVG
  before use).
- Brand kit reportedly matches the palette already in `docs/design-decisions.md`.
- Remaining assets are said to be available online; anything sourced that way must be
  recorded with its source, per the no-invented-facts rule in `CLAUDE.md`.

## Deviations from the guide, and why

- **§7 step 1 says duplicate the live site.** We are instead on a new Wix Studio site,
  `inzbcsecretariat.wixstudio.com/my-site`. The classic duplicate could not use git
  integration or the Local Editor.
- **§7 step 7 says connect events to Zoho.** Not done; no Zoho links have been supplied.
- **Custom elements are unavailable** on the free plan, so pages render through Embed Code
  driven by page code. See EDITING.md.
