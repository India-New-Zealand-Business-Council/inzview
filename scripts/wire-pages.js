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

$w.onReady(function () {
    // Section markup lives in public/sections.js so it is versioned and deploys on push.
    // The embed's own code box stays empty — this sets its source. See EDITING.md.
    $w('#html1').src = pageSrc('${key}');
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
