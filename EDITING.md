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
