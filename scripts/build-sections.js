// Generates src/public/sections.js from the paste-ready snippets in
// src/public/wix-studio-snippets/. Run with: node scripts/build-sections.js
//
// Lives outside src/ on purpose: Wix lints every .js under src/ during `wix publish`
// and Node globals like require and __dirname fail that lint. See EDITING.md.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SNIPPETS = path.join(ROOT, 'src/public/wix-studio-snippets');
const OUT = path.join(ROOT, 'src/public/sections.js');

// Page key -> ordered snippet files. Keys are what page code passes to pageSrc().
const PAGES = {
  home: ['home-hero', 'fta-feature-band', 'trade-stats', 'credibility-strip', 'join-cta'],
  about: ['about-hero', 'credibility-strip', 'join-cta'],
  membership: ['membership'],
  membershipJoin: ['membership-join'],
  memberDirectory: ['member-directory'],
  events: ['events'],
  eventsPast: ['events-past'],
  tradeMissions: ['trade-missions'],
  indiaMarketOpportunities: ['india-market-opportunities'],
  publications: ['insights-publications'],
  newsletters: ['insights-newsletters'],
  news: ['news'],
  partners: ['partners'],
  connect: ['connect'],
  executiveCouncil: ['executive-council'],
  ourPatron: ['our-patron'],
  fta: ['fta-centre'],
  ftaExplainer: ['fta-explainer'],
  tradeResources: ['trade-resources'],
  digest: ['digest'],
};

// Navigation, rendered inside every page's document.
//
// The Wix header menu is site structure and cannot be set from git. This nav can, because
// each page is a self-contained document. target="_top" is required: without it a link
// would open inside the iframe rather than navigating the browser.
//
// Slugs must match what is set in Wix Page Settings. Where they do not, the link 404s.
// See ARCHITECTURE.md.
const NAV = `
<header class="inz-nav">
  <a class="inz-nav__brand" href="/" target="_top">INZBC</a>
  <nav aria-label="Main">
    <ul class="inz-nav__list">
      <li><a href="/fta" target="_top">NZ&ndash;India FTA</a></li>
      <li><a href="/trade-resources" target="_top">Trade</a></li>
      <li><a href="/events" target="_top">Events</a></li>
      <li><a href="/membership" target="_top">Membership</a></li>
      <li><a href="/publications" target="_top">Insights</a></li>
      <li><a href="/news" target="_top">Media</a></li>
      <li><a href="/partners" target="_top">Partners</a></li>
      <li><a href="/about-inzbc" target="_top">About</a></li>
    </ul>
  </nav>
  <a class="inz-btn inz-btn--primary inz-nav__cta" href="/membership/join" target="_top">Join</a>
</header>`;

const FOOTER = `
<footer class="inz-footer">
  <div class="inz-container inz-footer__grid">
    <div>
      <p class="inz-footer__brand">India New Zealand Business Council</p>
      <p class="inz-footer__note">Connecting New Zealand and India through trade, investment and commercial diplomacy since 1988.</p>
    </div>
    <div>
      <p class="inz-footer__head">Explore</p>
      <ul>
        <li><a href="/fta" target="_top">NZ&ndash;India FTA</a></li>
        <li><a href="/trade-missions" target="_top">Trade missions</a></li>
        <li><a href="/india-market-opportunities" target="_top">Market opportunities</a></li>
        <li><a href="/events" target="_top">Events</a></li>
      </ul>
    </div>
    <div>
      <p class="inz-footer__head">Membership</p>
      <ul>
        <li><a href="/membership" target="_top">Why join</a></li>
        <li><a href="/membership/join" target="_top">Become a member</a></li>
        <li><a href="/membership/directory" target="_top">Member directory</a></li>
        <li><a href="/executive-council" target="_top">Executive Council</a></li>
      </ul>
    </div>
    <div>
      <p class="inz-footer__head">Connect</p>
      <ul>
        <li><a href="/connect" target="_top">Contact us</a></li>
        <li><a href="/partners" target="_top">Partners</a></li>
        <li><a href="/newsletters" target="_top">Newsletters</a></li>
        <li><a href="/news" target="_top">News</a></li>
      </ul>
    </div>
  </div>
</footer>`;

// Wix's Embed Code element is a sandboxed iframe with no direct access to the parent
// page (dev.wix.com, "Working with the HTML iFrame Element") and no way for us to add
// an allow-top-navigation sandbox token, so a plain <a target="_top"> is silently
// swallowed — the click does nothing, no error. Wix's own documented fix is the
// postMessage()/onMessage() messaging API between an HTML element and page code:
// https://dev.wix.com/docs/velo/velo-only-apis/$w/html-component/messaging-between-a-site-page-and-an-html-element
// Every internal link calls inzNav(event, path) instead of relying on target="_top".
// wire-pages.js's page-code template receives the message and calls wixLocation.to().
//
// targetOrigin is the site's real origin, not "*": Wix's own docs warn that "*" lets any
// site intercept the message (MDN Window.postMessage()).
const SITE_ORIGIN = 'https://inzbcsecretariat.wixstudio.com';

const NAV_SCRIPT = `
<script>
  function inzNav(event, path) {
    event.preventDefault();
    window.parent.postMessage({ path: path }, '${SITE_ORIGIN}');
  }
</script>`;

// The stylesheet each document carries. A data: URI has an opaque origin and inherits
// nothing from the parent page, so everything the snippets rely on travels with them.
//
// Palette: taken from the live inzbc.org, measured 6 August 2026 (docs/live-site-extract.md).
// Contrast measured, not assumed:
//   indigo #1B1464 on white ....... 15.78:1  AA
//   white on indigo ............... 15.78:1  AA
//   indigo on gold #F8C70C ......... 9.89:1  AA  <- primary CTA
//   white on blue #097BB8 .......... 4.63:1  AA  <- secondary CTA
//   #414141 body text on white .... 10.21:1  AA
//   orange #D0611D .......... 4.07 / 3.88:1  FAILS as body text either way.
// Orange is therefore decorative only: rules, eyebrows, large display text. Never a
// button fill with text on it, and never body copy.
const BASE_CSS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --inz-navy: #1b1464; --inz-blue: #097bb8; --inz-gold: #f8c70c;
    --inz-orange: #d0611d; --inz-ink: #414141; --inz-white: #ffffff;
    --inz-light: #f4f5f8; --inz-line: #e2e4ec;
    --inz-max-width: 1160px; --inz-radius: 10px;
    /* Retained so older inline styles in the snippets still resolve. */
    --inz-purple: #1b1464; --inz-tangerine: #f8c70c; --inz-lavender: #9fb6e8;
    --inz-forest: #097bb8; --inz-crimson: #d0611d; --inz-lime: #f8c70c;
  }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  a { color: var(--inz-blue); }

  /* Navigation */
  .inz-nav {
    display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
    padding: 0.9rem clamp(1rem, 4vw, 2.5rem);
    background: var(--inz-navy); color: #fff;
    font-family: 'Big Shoulders', Impact, sans-serif;
    position: sticky; top: 0; z-index: 10;
  }
  .inz-nav__brand {
    font-size: 1.5rem; font-weight: 800; letter-spacing: 0.08em;
    text-transform: uppercase; color: #fff; text-decoration: none; margin-right: auto;
  }
  .inz-nav__list { display: flex; flex-wrap: wrap; gap: 0.25rem 1.4rem; list-style: none; margin: 0; padding: 0; }
  .inz-nav__list a {
    color: #fff; text-decoration: none; text-transform: uppercase;
    letter-spacing: 0.06em; font-size: 0.95rem; padding: 0.35rem 0;
    border-bottom: 2px solid transparent; display: inline-block;
  }
  .inz-nav__list a:hover, .inz-nav__list a:focus-visible { border-bottom-color: var(--inz-gold); }
  .inz-nav__cta { padding: 0.5em 1.2em; font-size: 0.95rem; }
  @media (max-width: 700px) {
    .inz-nav { gap: 0.75rem; }
    .inz-nav__list { gap: 0.25rem 1rem; }
    .inz-nav__list a { font-size: 0.85rem; }
  }

  /* Footer */
  .inz-footer {
    background: var(--inz-navy); color: #fff; padding: clamp(2.5rem, 5vw, 4rem) 0 2rem;
    font-family: 'Merriweather', Georgia, serif;
  }
  .inz-footer__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); gap: 2rem; }
  .inz-footer__brand { font-family: 'Big Shoulders', Impact, sans-serif; font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem; }
  .inz-footer__note { color: #c9cde4; font-size: 0.9rem; max-width: 34ch; }
  .inz-footer__head { font-family: 'Big Shoulders', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.08em; color: var(--inz-gold); margin: 0 0 0.6rem; }
  .inz-footer ul { list-style: none; margin: 0; padding: 0; }
  .inz-footer li { margin-bottom: 0.4rem; }
  .inz-footer a { color: #e6e8f5; text-decoration: none; font-size: 0.92rem; }
  .inz-footer a:hover, .inz-footer a:focus-visible { text-decoration: underline; }

  .inz-section { font-family: 'Merriweather', Georgia, serif; color: var(--inz-ink); line-height: 1.6; }
  .inz-section h1, .inz-section h2, .inz-section h3, .inz-section .inz-heading {
    font-family: 'Big Shoulders', Impact, sans-serif; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.05; margin: 0 0 0.4em;
  }
  .inz-section h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
  .inz-section h2 { font-size: clamp(2rem, 4.5vw, 3.25rem); }
  .inz-section h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
  .inz-section p { max-width: 68ch; margin: 0 0 1em; }
  .inz-btn {
    display: inline-block; font-family: 'Big Shoulders', Impact, sans-serif; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; text-decoration: none;
    padding: 0.85em 1.6em; border-radius: var(--inz-radius);
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
  .inz-btn:focus-visible { outline: 3px solid var(--inz-lavender); outline-offset: 3px; }
  /* Gold fill with indigo text is 9.89:1. Do not swap the fill for orange #D0611D:
     it measures 4.07:1 with indigo and 3.88:1 with white, failing AA both ways. */
  .inz-btn--primary { background-color: var(--inz-gold); color: var(--inz-navy) !important; }
  .inz-btn--secondary { background-color: transparent; color: var(--inz-navy); box-shadow: inset 0 0 0 2px currentColor; }
  .inz-btn:hover { transform: translateY(-2px); opacity: 0.92; }
  .inz-container { width: min(92%, var(--inz-max-width)); margin-inline: auto; }
</style>`;

function readSnippet(name) {
  const file = path.join(SNIPPETS, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`build-sections: missing snippet ${file}`);
  }
  return fs
    .readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '') // drop the "paste here" instruction comments
    .trim();
}

const entries = Object.entries(PAGES).map(([key, files]) => {
  const html = files.map(readSnippet).join('\n');
  return `  ${key}: ${JSON.stringify(html)},`;
});

const shell = { nav: NAV, footer: FOOTER, navScript: NAV_SCRIPT };

const out = `// GENERATED by scripts/build-sections.js — do not edit by hand.
// Edit the snippets in wix-studio-snippets/ and re-run: node scripts/build-sections.js
//
// Page markup lives in code so it is versioned and deploys on push. Each page renders
// into ONE Embed Code element whose own code box stays empty; page code sets its src.
// See EDITING.md.

const BASE_CSS = ${JSON.stringify(BASE_CSS)};

const NAV_SCRIPT = ${JSON.stringify(shell.navScript)};

const NAV = ${JSON.stringify(shell.nav)};

const FOOTER = ${JSON.stringify(shell.footer)};

const PAGES = {
${entries.join('\n')}
};

/**
 * Full HTML document for one page.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageHtml(name) {
  const body = PAGES[name];
  if (!body) {
    throw new Error('sections.js: no page named ' + name);
  }
  return '<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' + BASE_CSS + NAV_SCRIPT + '</head><body>' + NAV + body + FOOTER + '</body></html>';
}

/**
 * Source value for an Embed Code element showing the given page.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageSrc(name) {
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml(name));
}
`;

fs.writeFileSync(OUT, out, 'utf8');
const sizes = Object.keys(PAGES).map((k) => k);
console.log(`wrote ${OUT}`);
console.log(`${sizes.length} pages: ${sizes.join(', ')}`);
