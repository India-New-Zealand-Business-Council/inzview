// Writes the page code file for every page, pointing each at its key in sections.js.
// Run with: node scripts/wire-pages.js
//
// Page code files are named "<Page Name>.<wix-id>.js"; the id is assigned by Wix when the
// page is created, so this maps by page name and leaves the id alone.

const fs = require('fs');
const path = require('path');

const PAGE_DIR = path.resolve(__dirname, '../src/pages');

// Page name in the Editor -> key in src/public/sections.js
const KEY_BY_PAGE = {
  Home: 'home',
  'About INZBC': 'about',
  Membership: 'membership',
  Join: 'membershipJoin',
  'Member Directory': 'memberDirectory',
  Events: 'events',
  'Past Events': 'eventsPast',
  'Trade Missions': 'tradeMissions',
  'India Market Opportunities': 'indiaMarketOpportunities',
  Publications: 'publications',
  Newsletters: 'newsletters',
  News: 'news',
  Partners: 'partners',
  Connect: 'connect',
  'Executive Council': 'executiveCouncil',
  'Our Patron': 'ourPatron',
  FTA: 'fta',
  'FTA Explainer': 'ftaExplainer',
  'Trade Resources': 'tradeResources',
  Digest: 'digest',
};

const template = (key) => `// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { pageSrc } from 'public/sections.js';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    // Section markup lives in public/sections.js so it is versioned and deploys on push.
    // The embed's own code box stays empty — this sets its source. See EDITING.md.
    $w('#html1').src = pageSrc('${key}');

    // The embed is a sandboxed iframe with no direct page access, so its nav links call
    // inzNav(), which posts { path } to the parent instead of using target="_top" (which
    // Wix's sandbox silently swallows). This is the receiving half: wix-location actually
    // moves the top-level page. See EDITING.md and build-sections.js's NAV_SCRIPT.
    $w('#html1').onMessage((event) => {
        if (!event.data) {
            return;
        }
        if (event.data.path) {
            wixLocation.to(event.data.path);
        }
        // The embed's height is set by hand in the Editor and was left at 500px, which
        // clipped every page. The document inside reports its own height (see
        // build-sections.js's reportHeight) and this resizes the element to match, so the
        // page fits its content without anyone opening the Editor. Clamped because a bad
        // measurement should not produce a 100,000px page.
        if (typeof event.data.inzHeight === 'number') {
            const h = Math.min(Math.max(event.data.inzHeight, 400), 12000);
            if (Math.abs(($w('#html1').height || 0) - h) > 12) {
                $w('#html1').height = h;
            }
        }
    });

    // Scroll bridge — the other direction. The iframe cannot see the parent's scroll, so
    // no scroll-linked effect inside it can fire on its own. Page code polls the real
    // scroll position and posts it in; build-sections.js's PARALLAX_SCRIPT drives the
    // layers from it and smooths the gaps with a lerp.
    //
    // Polled rather than event-driven because getBoundingRect() is the only scroll
    // position Velo exposes and it is async. inFlight stops calls stacking up if one
    // resolves slower than the interval.
    let inFlight = false;
    setInterval(() => {
        if (inFlight) return;
        inFlight = true;
        wixWindowFrontend.getBoundingRect()
            .then((rect) => {
                inFlight = false;
                // Null under SSR — there is no scroll position to report on the server.
                if (!rect) return;
                $w('#html1').postMessage({
                    scrollY: rect.scroll.y,
                    viewportHeight: rect.window.height
                });
            })
            .catch(() => { inFlight = false; });
    }, 50);
});
`;

let written = 0;
const unmapped = [];

for (const file of fs.readdirSync(PAGE_DIR)) {
  if (!file.endsWith('.js') || file === 'masterPage.js') continue;
  const pageName = file.replace(/\.[a-z0-9]+\.js$/i, '');
  const key = KEY_BY_PAGE[pageName];
  if (!key) {
    unmapped.push(file);
    continue;
  }
  fs.writeFileSync(path.join(PAGE_DIR, file), template(key), 'utf8');
  written += 1;
}

console.log(`wrote ${written} page code files`);
if (unmapped.length) {
  console.log(`unmapped (left alone): ${unmapped.join(', ')}`);
}
