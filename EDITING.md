# How to edit this site

> Target sitemap, the pages still to build, and two open conflicts with the client's
> migration guide: [ARCHITECTURE.md](./ARCHITECTURE.md).

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

## How the pages were made, and how to change them now

**Pages can only be created in the Editor. Not from git, not from the CLI.** The page code
files are named `<Page Name>.<wix-id>.js` and that id (`c1dmp`, `f6qs1`, …) is minted by
Wix when the page is created. Git can carry code *for a page that already exists*; it
cannot bring a page into being. All 20 pages already exist, so this should not need doing
again.

Each page needs **one Embed Code element**, added by hand once, with its own code box left
**empty**. It is only a container. Page code sets its `src`, so everything visible on the
page comes from git after that.

Once a page has its embed, the whole edit loop is git:

```bash
# 1. edit the section markup
vim src/public/wix-studio-snippets/about-hero.html

# 2. regenerate (never edit src/public/sections.js by hand — it is generated)
node scripts/build-sections.js

# 3. ship
git push
npx wix publish --source local -y
```

`scripts/build-sections.js` holds two things worth knowing: `PAGES`, mapping each page key
to its ordered list of snippet files, and `BASE_CSS`, the stylesheet every page carries.
Add a section to a page by adding its filename to that page's array. Change the design
system by editing `BASE_CSS` — and keep `wix-studio-snippets/site-head.html` in step,
since that is the copy a human would paste into Custom Code.

`scripts/wire-pages.js` rewrites every page code file from `KEY_BY_PAGE`. Run it after
adding a page; it maps by page name and leaves the Wix id alone.

Both scripts live outside `src/` because Wix lints everything under `src/` and Node
globals fail that lint.

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

## Custom elements need a Premium plan, and break `wix publish`

The React component project lives at **`react-elements/` in the repo root — deliberately
outside `src/`.**

Two things forced that. First, custom elements do not render on a free plan: the Element
Attributes panel states *"To see this element, upgrade your site with a Premium plan."* Do
not debug a custom element showing an empty box; check the plan first.

Second, and worse, **Wix lints every `.js` file under `src/` during `wix publish`**, and a
minified React bundle fails that lint:

```
error: no-undef: 'MSApp' is not defined.
error: no-undef: '__REACT_DEVTOOLS_GLOBAL_HOOK__' is not defined.
```

Both are guarded at runtime and harmless, but the build fails and the publish is blocked.
The Node tooling (`webpack.config.js`, `generate-entries.js`) would fail the same lint on
`require` and `__dirname`. So nothing from that project may live under `src/`.

Velo only offers custom element sources from `src/public/custom-elements`. That is a real
conflict with the rule above and it has no clean resolution on a free plan — which is why
the public-module approach is the one in use.

If Premium is ever bought: repoint `output.path` in `react-elements/webpack.config.js` back
to `src/public/custom-elements`, and expect to deal with the lint errors above.

The public-module approach is the free-plan path, and it is also simpler.

## Traps

**Nothing that is not Velo code belongs under `src/`.** The CLI uploads the whole `src/`
tree on `wix dev` and lints every `.js` in it on `wix publish`. A `node_modules` under
`src/` fails with HTTP 413, surfaced misleadingly as "Failed to create an isolated
environment", and `.gitignore` is not honoured. This is why `react-elements/` sits in the
repo root.

**`git mv` fails with "Permission denied" while `wix dev` is running.** It holds file
handles under `src/`. Stop it first.

**`wix dev` must run on Windows, not WSL.** It launches a browser WSL does not have, and
prints no URL you can use.

**Slugs are not free choices.** Every page slug is the destination of a live 301 recorded
in `docs/website-redirect-map.md` in the `inzbc` repo. Inventing or shortening one breaks
a redirect decided weeks ago. Four slugs (`trade-resources`, `fta-centre`, `fta-explainer`,
`digest`) have no live URL behind them and need Bhanu's decision before the page is created.
`home-hero.html` links to `/fta`, which is one of those undecided slugs — it is a dead link
until someone picks the destination.

**Check URL hierarchy flattening is OFF** before creating `/membership/join`,
`/membership/directory` or `/events/past`. With it on they serve at `/join`, `/directory`
and `/past` and every nested redirect misses. `/publications`, `/newsletters` and
`/digest` are flat, top-level slugs — Wix Studio has no `Insights` parent page, so they
were set flat rather than nested under `/insights/`, and hierarchy flattening does not
apply to them.

## State as at 6 August 2026, and what is still missing

**Done.** 20 pages exist. `src/public/sections.js` carries markup for all 20, generated
from the snippets. Every page code file is wired to its key. Verified: all 20 render, the
largest data URI is 12.7 KB, eslint clean.

**Embeds placed on 2 of 20 pages** — Home and About INZBC. The other 18 are wired in code
but have no container to render into, so they show blank. Adding one is: select the page,
Add → Embed & Social → Embed Code, leave the code box empty, set W 1280 / H 900. Two
shortcuts that do **not** work: Ctrl+C/Ctrl+V between pages (Wix intercepts the clipboard)
and pasting into the embed's code box (that stores markup in Wix, not git).

**Missing against the live site** (`docs/website-url-inventory-2026-07-31.txt`, 20 live
pages):

- **Two event detail pages.** `/india-x-nz` and `/copy-of-boardroom-to-border` are two
  distinct real events — Auckland and Christchurch — each with its own date, venue,
  speakers and pricing. They need `/events/boardroom-to-border-auckland-2025` and
  `-christchurch-2025`. Do not treat the second as a duplicate and do not unpublish it.
- **`/member-profile`.** Member-gated today. `website-redirect-map.md` marks its redirect
  **staging only** — do not apply it in production before the Member Jungle and privacy
  decisions are made.
- **The entire blog: 154 posts and 6 categories.** The `News` page here is a shell. The
  Wix Blog app is not connected and no posts have been migrated. This is the single
  largest missing piece.
- **Site chrome.** Header still says "Business Name" — no logo, and the nav lists only
  Home, so none of the 19 new pages are reachable by clicking.
- **Slugs.** Wix derived them from page names, so nested ones are wrong: Join is likely
  `/join`, not `/membership/join`. Every slug must be set to match
  `docs/website-redirect-map.md` or the 301s miss.
- **Custom Code not added.** `site-head.html` (fonts, brand tokens) and
  `organization-schema.html` (JSON-LD) still need pasting into Settings → Custom Code.
- **Forms.** The Connect page's contact form is a `[[placeholder]]`, not a Wix Form.
- **SEO.** No per-page titles or descriptions, no favicon.

## Designing this site

The design lives in two places, both in git, both safe for another agent to work on:

- `src/public/wix-studio-snippets/*.html` — one file per section, plain HTML with inline
  styles and the `inz-` classes.
- `BASE_CSS` in `scripts/build-sections.js` — the design system: tokens, type scale,
  buttons, container.

A designer never has to touch the Editor. Edit those, run `node scripts/build-sections.js`,
push. What they **cannot** change from git: the header, footer, nav menu, page slugs, and
anything else Wix treats as site structure.

Non-negotiables for any redesign: navy `#160933` on tangerine `#f05b29` for buttons (5.56:1,
passes AA — white on tangerine is 3.37:1 and fails); `[[placeholder]]` markers stay until
INZBC supplies the fact; and the sourced figures in `trade-stats.html` are not to be
reworded or rounded.

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
