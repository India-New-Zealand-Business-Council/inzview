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
One component per page slug from `docs/studio-build-spec.md`:
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

This produces one bundle per page in `dist/`, e.g. `dist/home.js`, `dist/about.js`.
Each bundle is self-contained (includes React 16) and registers a custom element.

## Using in Wix Studio

1. In Studio, create the target page slug (e.g., `/about`, `/fta`).
2. On that page, go to **Add** → **Custom Element**.
3. Upload the matching file from `dist/`:

| File | Custom element tag |
|---|---|
| `dist/home.js` | `inzbc-home` |
| `dist/about.js` | `inzbc-about` |
| `dist/membership.js` | `inzbc-membership` |
| `dist/membership-join.js` | `inzbc-membership-join` |
| `dist/member-directory.js` | `inzbc-member-directory` |
| `dist/events.js` | `inzbc-events` |
| `dist/events-past.js` | `inzbc-events-past` |
| `dist/trade-resources.js` | `inzbc-trade-resources` |
| `dist/trade-missions.js` | `inzbc-trade-missions` |
| `dist/india-market-opportunities.js` | `inzbc-india-market-opportunities` |
| `dist/fta-centre.js` | `inzbc-fta-centre` |
| `dist/fta-explainer.js` | `inzbc-fta-explainer` |
| `dist/insights-publications.js` | `inzbc-insights-publications` |
| `dist/insights-newsletters.js` | `inzbc-insights-newsletters` |
| `dist/digest.js` | `inzbc-digest` |
| `dist/news.js` | `inzbc-news` |
| `dist/partners.js` | `inzbc-partners` |
| `dist/connect.js` | `inzbc-connect` |
| `dist/executive-council.js` | `inzbc-executive-council` |
| `dist/our-patron.js` | `inzbc-our-patron` |

4. Resize the custom element container to fill the page width as needed.

## Notes

- All styles are inline or injected via `InzGlobalStyles`; no external CSS imports in components.
- `[[placeholder]]` markers are preserved for INZBC input.
- Tangerine buttons use navy text for WCAG AA contrast.
- Each bundle is ~130 KiB because React 16 is bundled in for standalone use.
