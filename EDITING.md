# How to edit this site

Read this before changing anything. The obvious approach does not work, and the reason is
not discoverable from the Wix docs.

This repo is connected to the Wix Studio site `my-site`
(`https://inzbcsecretariat.wixstudio.com/my-site`, meta site id
`040b006f-3745-4a4f-ae4d-03aedb08a7b1`). The site tracks `main`.

## The rule: git syncs code, Wix owns design

| Thing | Where it lives | Reaches the site by |
|---|---|---|
| Page code (`src/pages/*.js`) | this repo | `git push` |
| Public modules (`src/public/*.js`) | this repo | `git push` |
| Backend (`src/backend/`) | this repo | `git push` |
| Page layout, sections, element positions | Wix site data | editing in the Editor |
| HTML pasted into an Embed Code element | Wix site data | editing in the Editor |

**Editing a `.html` file in `src/public/wix-studio-snippets/` changes nothing on the site.**
Those files are reference copies. If someone pasted their contents into an embed, that
paste is stored by Wix, not here, and a push cannot reach it.

Wix's own Save dialog says it plainly: *"This does not push code to GitHub."* The sync is
Editor → local files, and only for design metadata. It is not a deploy.

## So how do you change page content from git?

Put the markup in a public module and inject it from page code. This is what
`src/public/sections.js` and `src/pages/Home.c1dmp.js` do:

```js
// src/public/sections.js
export const homeHero = `<section style="...">...</section>`;

// src/pages/Home.c1dmp.js
import { homeHero } from 'public/sections.js';

$w.onReady(function () {
    $w('#html1').src = `data:text/html;charset=utf-8,${encodeURIComponent(homeHero)}`;
});
```

The Embed Code element stays **empty**. It is only a container. All markup is in
`sections.js`, so it is versioned, reviewable, and deploys on push.

Verified working on the free plan, 6 August 2026: the hero renders in Preview with the
embed's own code box empty.

One-time setup per section, done in the Editor by hand:
1. Add → Embed & Social → Embed Code, and leave its code box empty.
2. Note the element ID shown in the Properties panel (`#html1`, `#html2`, …).
3. Size and position it. Full width is W 1280, X 0.
4. Reference that ID from the page's code file.

## Custom elements need a Premium plan

There are 20 built React bundles in `src/public/custom-elements/`. They are wired
correctly — Velo only lists scripts from that exact folder, which is why
`webpack.config.js` emits there rather than a local `dist/`.

They still will not render. The Element Attributes panel states: *"To see this element,
upgrade your site with a Premium plan."* The site is on the free plan. Do not spend time
debugging a custom element that shows an empty box; check the plan first.

The public-module approach above is the free-plan path, and it is also simpler.

## Traps

**Never run `npm install` inside `src/` and then `wix dev`.** The CLI uploads the whole
`src/` tree. 51 MB of `node_modules` makes it fail with HTTP 413, surfaced misleadingly as
"Failed to create an isolated environment". Neither `.gitignore` is honoured. To rebuild
the React bundles: move `node_modules` back in, `npm run build`, then move it out again
before starting `wix dev`.

**`wix dev` must run on Windows, not WSL.** It launches a browser WSL does not have, and
prints no URL you can use.

**Slugs are not free choices.** Every page slug is the destination of a live 301 recorded
in `docs/website-redirect-map.md` in the `inzbc` repo. Inventing or shortening one breaks
a redirect decided weeks ago. Four slugs (`trade-resources`, `fta-centre`, `fta-explainer`,
`digest`) have no live URL behind them and need Bhanu's decision before the page is created.
`home-hero.html` links to `/fta`, which is one of those undecided slugs — it is a dead link
until someone picks the destination.

**Check URL hierarchy flattening is OFF** before creating `/membership/join`,
`/membership/directory`, `/events/past`, `/insights/publications` or
`/insights/newsletters`. With it on they serve at `/join`, `/past`, `/publications` and
every nested redirect misses.

## Content rules

From `CLAUDE.md` in the `inzbc` repo, and they are not negotiable:

- Never invent statistics, member counts, board names or FTA details. Leave
  `[[placeholder]]` where INZBC owes a fact.
- The NZ–India FTA was **signed 27 April 2026 and is not in force** — it awaits domestic
  ratification in both countries. The live `inzbc.org` says otherwise and is wrong.
- `ExecutiveCouncilPage` and `executive-council.html` carry real board names, read from
  `inzbc.org` on 27 July 2026 and marked `[[Proposed]]`. The Board confirms currency before
  publication. Do not add, drop or reorder a name.
- Navy `#160933` on tangerine `#f05b29` is 5.56:1 and passes AA. White on tangerine is
  3.37:1 and fails. Tangerine is the CTA colour, navy the base.
- Log every Editor session in `docs/wix-changes-log.md` in the `inzbc` repo, with before
  and after text. Wix records *that* something changed, not what it said.
