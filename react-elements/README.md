# INZBC Studio — React components

React 16 JSX components that mirror the HTML embed snippets. Two intended uses:

1. **Reference for developers** converting the paste-ready HTML into custom elements.
2. **Source for Wix custom elements** once bundled and registered.

## Components

### Layout / primitives
- `InzGlobalStyles` — injects Google Fonts and brand CSS variables.
- `InzHero` — gradient hero with headline, sub, and CTAs.
- `InzFeatureBand` — gradient band with text + CTA.
- `InzStatsGrid` — statistics grid.
- `InzCredibilityStrip` — single-line credibility items.
- `InzCtaBand` — bottom conversion band.
- `InzCardGrid` — generic card grid.
- `InzProfileGrid` — people/profile grid.
- `InzTextSection` — simple text block section.

### Pages
One component per page. Slugs come from `docs/website-redirect-map.md` in the `inzbc`
repo — each is the destination of a live 301, so they are not free to change:
`HomePage`, `AboutPage`, `MembershipPage`, `MembershipJoinPage`, `MemberDirectoryPage`,
`EventsPage`, `EventsPastPage`, `TradeResourcesPage`, `TradeMissionsPage`,
`IndiaMarketOpportunitiesPage`, `FtaCentrePage`, `FtaExplainerPage`,
`InsightsPublicationsPage`, `InsightsNewslettersPage`, `DigestPage`, `NewsPage`,
`PartnersPage`, `ConnectPage`, `ExecutiveCouncilPage`, `OurPatronPage`.

## Build

```bash
cd src/public/wix-studio-snippets/react
npm install
npm run build
```

This produces one bundle per page in `src/public/custom-elements/`, e.g. `home.js`,
`about.js`. That folder is not a free choice: Velo only offers scripts from
`src/public/custom-elements` when you pick a custom element source, so a bundle emitted
anywhere else cannot be selected in the editor.
Each bundle is self-contained (includes React 16) and registers a custom element.

## Using in Wix Studio

1. In Studio, create the target page slug from the table below. Do not shorten or invent
   one: each confirmed slug is the destination of an existing 301 in
   `docs/website-redirect-map.md`, and a changed slug silently breaks that redirect.
2. On that page, go to **Add** → **Custom Element**.
3. Choose Source → **Velo file**, pick the matching file, and enter the tag:

| File | Custom element tag | Slug |
|---|---|---|
| `custom-elements/home.js` | `inzbc-home` | `/` |
| `custom-elements/about.js` | `inzbc-about` | `/about-inzbc` |
| `custom-elements/membership.js` | `inzbc-membership` | `/membership` |
| `custom-elements/membership-join.js` | `inzbc-membership-join` | `/membership/join` |
| `custom-elements/member-directory.js` | `inzbc-member-directory` | `/membership/directory` |
| `custom-elements/events.js` | `inzbc-events` | `/events` |
| `custom-elements/events-past.js` | `inzbc-events-past` | `/events/past` |
| `custom-elements/trade-resources.js` | `inzbc-trade-resources` | **unconfirmed** |
| `custom-elements/trade-missions.js` | `inzbc-trade-missions` | `/trade-missions` |
| `custom-elements/india-market-opportunities.js` | `inzbc-india-market-opportunities` | `/india-market-opportunities` |
| `custom-elements/fta-centre.js` | `inzbc-fta-centre` | **unconfirmed** |
| `custom-elements/fta-explainer.js` | `inzbc-fta-explainer` | **unconfirmed** |
| `custom-elements/insights-publications.js` | `inzbc-insights-publications` | `/publications` |
| `custom-elements/insights-newsletters.js` | `inzbc-insights-newsletters` | `/newsletters` |
| `custom-elements/digest.js` | `inzbc-digest` | **unconfirmed** |
| `custom-elements/news.js` | `inzbc-news` | `/news` — keep this URL, label it Media in navigation |
| `custom-elements/partners.js` | `inzbc-partners` | `/partners` |
| `custom-elements/connect.js` | `inzbc-connect` | `/connect` |
| `custom-elements/executive-council.js` | `inzbc-executive-council` | `/executive-council` |
| `custom-elements/our-patron.js` | `inzbc-our-patron` | `/our-patron` |

The four marked **unconfirmed** are new pages with no live URL behind them
(`page-specs.md` §4, §6, §7). Confirm each with Bhanu before creating it.

Three slugs are nested: `/membership/join`, `/membership/directory`, `/events/past`.
**Check that URL hierarchy flattening is OFF before creating any of them** — with it on
they serve at `/join`, `/directory`, `/past` and every nested redirect misses.
`/publications` and `/newsletters` are flat, top-level slugs — Wix Studio has no
`Insights` parent page, so they cannot nest under `/insights/`.

4. Resize the custom element container to fill the page width as needed.

## Custom elements need a Premium plan

The Element Attributes panel states: *"To see this element, upgrade your site with a
Premium plan."* The site is currently on the free plan, so a custom element can be placed
and configured but will not render. `Publish` is also disabled. Confirm the plan before
committing further work to this approach — the paste-ready HTML embeds in the parent
folder are the fallback if Premium is not bought.

## Notes

- Do not run `npm install` in this folder and then `wix dev`. The CLI uploads all of
  `src/`, and 51 MB of `node_modules` makes it fail with HTTP 413 ("Failed to create an
  isolated environment"). Install, build, then move `node_modules` out before `wix dev`.
- All styles are inline or injected via `InzGlobalStyles`; no external CSS imports in components.
- `[[placeholder]]` markers are preserved for INZBC input.
- Tangerine buttons use navy text for WCAG AA contrast.
- Each bundle is ~130 KiB because React 16 is bundled in for standalone use.
