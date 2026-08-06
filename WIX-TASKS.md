# Wix Editor tasks — step by step

Everything in this list must be done **by hand in the Wix Editor**. None of it can be done
from git, and automated browser tools cannot do it either (the page menus only appear on a
real mouse hover). Everything that *could* be done from git already has been.

Site: `https://inzbcsecretariat.wixstudio.com/my-site`
Editor: Wix Studio → the site named **my-site**

Work in this order. Task 1 is the blocker — until slugs are set, only the home page is
reachable and every navigation link returns 404.

Estimated: 45–60 minutes total.

---

## Before you start

- **Only one person in the Editor at a time.** Two people editing caused pages to jump
  mid-edit during setup.
- **Do not touch** the Wix Members Area app. Membership is not built on Wix.
  See `CLAUDE.md` in the `inzbc` repo.
- Click **Save** every few pages. Save is the top-right button. If a dialog asks
  "Save changes in the Editor to local code?", click **Continue** — it is expected.

---

## Task 1 — Set the page slugs (the blocker) — ✅ Done 6 August 2026

### 1a. Turn off URL hierarchy flattening FIRST

If you skip this, `/membership/join` silently becomes `/join` and four nested-page
redirects miss (`membership/join`, `membership/directory`, `events/past`,
`fta/explainer` — down from seven now that Publications, Newsletters and Digest are
flat, not nested; see the note below the slug table).

1. Editor → **Settings** (left sidebar, gear icon) → **SEO** → **URL structure**
2. Find the setting for **URL hierarchy / flattening** and make sure nested URLs are
   **kept**, not flattened.
3. If you cannot find it, stop and tell Bhanu before continuing. Do not guess.

### 1b. Set each slug

For each page: **Pages panel** (3rd icon down the left toolbar) → hover the page name →
click the **⋯** that appears → **Settings** → **SEO Basics** → **URL Slug**.

| Page name in the Editor | Slug to enter |
|---|---|
| Home | *(leave as the home page — no slug)* |
| About INZBC | `about-inzbc` |
| Membership | `membership` |
| Join | `join`, parent page **Membership** → resolves to `membership/join` |
| Member Directory | `directory`, parent page **Membership** → resolves to `membership/directory` |
| Events | `events` |
| Past Events | `events/past` |
| Trade Missions | `trade-missions` |
| India Market Opportunities | `india-market-opportunities` |
| Publications | `publications` — flat, see note below |
| Newsletters | `newsletters` — flat, see note below |
| News | `news` |
| Partners | `partners` |
| Connect | `connect` |
| Executive Council | `executive-council` |
| Our Patron | `our-patron` |
| FTA | `fta` |
| FTA Explainer | `explainer`, parent page **FTA** → resolves to `fta/explainer` |
| Trade Resources | `trade-resources` |
| Digest | `digest` — flat, see note below |

**These are not free choices.** Each one is the destination of a live 301 recorded in
`docs/website-redirect-map.md` in the `inzbc` repo. Changing one breaks a redirect that
was decided weeks ago. If a slug looks wrong, raise it — do not "improve" it.

**Adjustment made during Task 1, 6 August 2026:** Publications, Newsletters and Digest
were set as flat top-level slugs (`/publications`, `/newsletters`, `/digest`) instead of
nested under `/insights/` as originally planned. Wix Studio's slug field does not accept
slashes, and nesting instead requires a **Parent page** — there is no `Insights` parent
page in this site, so nesting them wasn't possible without creating one. `sections.js`
and every internal link have been updated to match. Join, Member
Directory and FTA Explainer nest correctly via the **Parent page** dropdown (set to
Membership / Membership / FTA respectively) and resolve to the paths this table always
specified.

Save when done.

---

## Task 2 — Add the embed to the 13 pages that have none

Seven pages already have one: **Home, About INZBC, Membership, Join, Member Directory,
Events, News**. Skip those — adding a second would break them.

These 13 need one:

Past Events · Trade Missions · India Market Opportunities · Publications · Newsletters ·
Partners · Connect · Executive Council · Our Patron · FTA · FTA Explainer ·
Trade Resources · Digest

For **each** of the 13:

1. **Pages panel** → click the page (the canvas will be empty — that is expected)
2. **Add** (the **+**, top of the left toolbar)
3. **Embed & Social** → under **Embed Code**, click the **+** next to *"Embed Code —
   Display content by adding HTML code"*
4. **Leave its code box completely empty.** Do not paste anything into it. If a settings
   dialog opens, close it.
5. In the right-hand panel, under **Size**, set:
   - **W** = `1280`
   - **H** = `3000`
6. Set **X** = `0` so it sits flush left.

That is all. The page's content is already written in code and appears the moment the
embed exists — there is nothing to type in.

**Why the code box stays empty:** the content is set from `src/public/sections.js` by each
page's code file. Pasting HTML into the box would store it inside Wix where a `git push`
can never reach it. See `EDITING.md`.

Save every 3–4 pages.

---

## Task 3 — Fix the height on the 7 existing embeds

They were set to `900`, which cuts the content off mid-sentence — this is why the home page
appears to stop halfway through the hero.

For each of **Home, About INZBC, Membership, Join, Member Directory, Events, News**:

1. Pages panel → click the page
2. Click the grey embed box on the canvas (or select `html1` in the **Layers** panel,
   2nd icon on the left toolbar)
3. Right panel → **Size** → **H** = `3000`

If a page still looks cut off at 3000, raise it further. Too tall only adds white space;
too short loses content.

---

## Task 4 — Upload the images

11 images are in the repo at `assets/from-live-site/`. They came from the current live
site, at full resolution. They are **not** on the new site yet.

1. Editor → **Media** (the image icon on the left toolbar) → **Upload Media**
2. Upload all 11 files from `assets/from-live-site/`
3. **Skip `logo-live-site-small.jpg`** — it is a 400×114 JPEG with a white background.
   The real logo is `INZBC_Logo_Files.ai` (Bhanu has it); export an SVG from that instead.

Then, for each image you want on a page, copy its new URL from the Media Manager and give
the list to Bhanu — the URLs go into the section HTML in
`src/public/wix-studio-snippets/`, and that is a git change, not an Editor one.

`assets/from-live-site/README.md` says which image suits which page.

**Do not link to the old site's image URLs.** They work today but belong to the site being
replaced, on a different Wix account.

---

## Task 5 — Publish

From a terminal in the repo:

```bash
git pull
npx wix publish --source local -y
```

Then check these load rather than 404:

- `https://inzbcsecretariat.wixstudio.com/my-site`
- `https://inzbcsecretariat.wixstudio.com/my-site/about-inzbc`
- `https://inzbcsecretariat.wixstudio.com/my-site/membership/join`
- `https://inzbcsecretariat.wixstudio.com/my-site/fta/explainer`

The last two prove hierarchy flattening is off. If they 404 but `/join` and `/explainer`
work, flattening is still on — go back to Task 1a.

**Also click a nav link** (e.g. Membership in the navy nav) rather than just loading URLs
directly. See "Navigation fix — needs live verification" below: this is a different check
than the 404 check above and the 404 check alone will not catch it.

---

## Navigation fix — needs live verification

Nav links (navy nav, footer, and in-body CTAs like "Explore the FTA") previously did
nothing when clicked: no navigation, no error. Root cause, confirmed against Wix's own
docs — the Embed Code element is a sandboxed iframe with no direct page access, so a plain
`<a target="_top">` is silently swallowed by the sandbox, which has no
`allow-top-navigation` token and cannot be given one from Velo.

**Fixed 6 August 2026** using Wix's documented iframe↔page messaging API: every internal
link now calls `inzNav(event, path)` (defined once per page in `build-sections.js`'s
`NAV_SCRIPT`), which does `window.parent.postMessage({ path }, SITE_ORIGIN)`. Each page's
code (regenerated by `wire-pages.js`) listens with `$w('#html1').onMessage(...)` and calls
`wixLocation.to(event.data.path)` to actually move the page.

**This has not been tested live** — verified against Wix's official documentation and the
generated code, not against the running site (no browser tooling available). After Task 5's
publish, click through every nav item, not just Home/About — including at least one nested
link (`Join`, `Member Directory` or `FTA Explainer`) since those exercise
`wixLocation.to()` with a nested path. If a click still does nothing, the message may not be
reaching page code — check the browser console for a postMessage/origin error before
assuming the fix is wrong; `SITE_ORIGIN` in `build-sections.js` must exactly match the
site's actual origin or the browser will silently drop the message.

Any **new** internal link added to a snippet in `wix-studio-snippets/` must use
`onclick="inzNav(event, '/path')"`, not `target="_top"` — the latter is now known not to
work on this site.

---

## Known problems that are NOT your fault

Do not try to fix these; they need decisions, not effort.

- **Two headers.** Wix's own header ("Business Name") sits above the navy INZBC nav. The
  Wix one needs the logo and menu configured, or hiding. Ask Bhanu which.
- **Footer says "© 2035 by Business Name".** Wix default text.
- **`[[placeholder]]` markers** across the pages — the FTA summary, membership tiers, the
  patron's name, the member count. These are deliberate. INZBC owes those facts. **The site
  must not be shared publicly while they are visible** — see `docs/wix-staging-readiness.md`.
- **No site password.** Anyone with the URL can see it. That doc says a password should be
  set before any preview link is shared.
- **The blog.** 154 posts on the live site have not been migrated. Separate job.

---

## If something goes wrong

- **A page renders blank after adding the embed** — check its code box is empty and its ID
  is `html1` (right panel, **ID** field). The page code expects that exact ID.
- **Content is cut off** — height too low. Task 3.
- **A link 404s** — that page's slug is not set, or is set differently to the table above.
- **You cannot find the ⋯ menu** — it only appears when the mouse is over the page row.

Full background: [EDITING.md](./EDITING.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)
