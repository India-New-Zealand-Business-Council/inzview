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

## Using in Wix Studio

Wix custom elements must be bundled as a single UMD/IIFE file and registered with
`customElements.define`. A minimal wrapper looks like:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './index';

class InzbcHome extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<HomePage />, this);
  }
}

customElements.define('inzbc-home', InzbcHome);
```

Then in Wix Studio: **Add** → **Custom Elements** → upload the bundled file → tag name `inzbc-home`.

## Notes

- All styles are inline or injected via `InzGlobalStyles`; no external CSS imports in components.
- `[[placeholder]]` markers are preserved for INZBC input.
- Tangerine buttons use navy text for WCAG AA contrast.
