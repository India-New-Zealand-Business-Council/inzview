# Parity matrix: inzbc.org to the rebuild

Every destination, form, archive and content route on the old homepage, mapped to where it
lives now. Built 9 August 2026 by extracting the real link list from `www.inzbc.org` and
diffing it against every `href` in the built `sections.js`.

**Nothing here may be dropped without a row saying so and why.** The redesign lost several
of these because no such list existed: the work was treated as a visual redesign when it is
a content and functionality migration.

## Status key

| | |
|---|---|
| **live** | Reachable in the rebuild today |
| **gap** | Existed on the old site, missing here, needs building |
| **blocked** | Cannot be built yet, with the blocker named |
| **dropped** | Deliberately not carried over, with the reason |

## Navigation and gateways

| Old destination | Status | Where it lives now |
|---|---|---|
| `/about-us` | live | `/about-inzbc`, nav and footer |
| `/connect` | live | Nav, footer, closing CTA |
| `/executive-council` | live | Footer, About page |
| `/our-patron` | live | Footer |
| `/our-sponsors` | live | 301 to `/partners`, added 18 Aug 2026 (Router.tsx) |
| `/join-inzbc` | live | Member Jungle registration, hero and every CTA |
| `/membership-form` | live | Same Member Jungle destination |
| `/member-directory` | live | `/membership/directory` |

## Events

| Old destination | Status | Where it lives now |
|---|---|---|
| `/upcoming-events` | live | 301 to `/events`, added 18 Aug 2026 (Router.tsx) |
| `/past-events` | live | `/events/past`, linked from the Summit band |
| Event Calendar | **partial** | `/events` now computes "Upcoming" from `INZBC_EVENTS` by date instead of hand-written prose (18 Aug 2026, bodies.tsx) — a real future-dated event appears automatically. Not a month-grid calendar view, and Sunil's own guide (§7 Step 7) says not to duplicate registration logic in Wix, so this is deliberately a list, not a rebuild |
| Register for events | **gap** | No Zoho or Member Jungle registration link exists per event — needs a real URL from INZBC, not a decision this repo can make alone |
| Event Reports | live | `/events/past`, linked from Home's events section (already existed, just mislabelled as a gap) |
| View Gallery | live | Facebook albums and Flickr, in the social band |
| Make Connections showcase | **partial** | Most of the substance was already live under different copy (Home's events section carries the same tagline, event/report links and Summit link) — genuinely missing were the Register link and a gallery link, both added 18 Aug 2026 (HomePage.tsx). No separate "Make Connections"-branded block; folded into the existing section instead of duplicating it |
| INZBC Annual Summit | live | Summit band |
| `inzbusinesssummit.com` | **gap** | The summit's own site is not linked |

## Publications and insights

| Old destination | Status | Where it lives now |
|---|---|---|
| `/publications` | live | Nav, pathway card, footer |
| `/newsletters` | live | Nav, footer, Publications chapter |
| `/news` | live | Nav, footer, Latest Insights |
| `/trade-news` | **gap** | Distinct from `/news` on the old site |
| Grow With India, Issuu | live | Publications chapter |
| Kia Ora India, Issuu | **gap** | Chapter links to `/newsletters`, not the Issuu edition |
| Newsletter archive | live | Archive button, Publications chapter |
| Two PDF downloads | **gap** | Both `_files/ugd/` PDFs unreferenced |
| Three blog posts | partial | Latest Insights carries two of the three |
| `blog-feed.xml` | **gap** | No feed |
| Advertise With Us | **gap** | Commercial route removed |

## Trade

| Old destination | Status | Where it lives now |
|---|---|---|
| Trade With India | live | `/trade-resources`, pathway card |
| Trade Shows | **gap** | Folded into `/trade-missions`; the label is gone |
| `/trade-bazaar` | live | Replaced by `/india-market-opportunities` per the migration plan (§4/§5); `/trade-bazaar` redirects there. Corrected 11 August 2026 — this row previously said it merged into Trade Shows/Missions, which was wrong; that merge is Trade Shows only |

## Contact and social

| Old destination | Status | Where it lives now |
|---|---|---|
| `Secretariat@inzbc.org` | live | Connect page, closing CTA |
| Drop us a message form | **blocked** | Needs a Wix Form; cannot be built from git |
| Postal address | live | Connect page |
| Facebook, YouTube, LinkedIn, X, Flickr | live | Social band and Connect |
| Facebook photo albums | live | Social band |
| EmailOctopus subscribe | live | Newsletter band |
| Mailchimp list | **dropped** | Two mailing lists on one site. EmailOctopus is the one INZBC named |
| Embedded Facebook feed | **dropped** | Slow, visually noisy, ages badly. Deliberate |

## Partners

| Old element | Status | Where it lives now |
|---|---|---|
| Strategic, Partner, Associate, Government tiers | live | Partner wall image |
| India Industry Partners | **partial** | Names now live on `/partners` and the Home Partners section — FICCI, CII, PHD Chamber, TPCI, ASSOCHAM, NABARD, Bihar Foundation, HSIIDC — read visually off the composite graphic on inzbc.org/our-sponsors, 18 Aug 2026. Logo files still not sourced |
| NZ Industry Partners | **partial** | Same source and same date: NZTE, MFAT, ThinkNew New Zealand, ASEAN NZ Business Council, NZAL, BNZBA, NZ India Research Institute, Export New Zealand. Logo files still not sourced |
| Individual partner links | **gap** | The wall image is still one flattened JPEG; no logo is clickable. Names are now text, not logos |

## What the gaps need

Ordered by value, not effort.

1. **Make Connections.** Mostly done as of 18 Aug 2026 (see row above) — reused Home's
   existing events section rather than rebuilding a separate block. Real photographs beyond
   the Modi-Luxon 2026 set and the Summit set already in `public/events/` still need INZBC.
2. **Member network.** Membership is INZBC's strongest proposition and the page asserts it
   rather than showing it. Needs member names, industries and locations.
3. **Partner ecosystem.** Done, 18 Aug 2026. `BUSINESS_PARTNERS`/`INDIA_NETWORK`/
   `PUBLIC_SECTOR_NETWORK` moved from `HomePage.tsx` into `content.ts` as the single source
   for both Home and `/partners` (`bodies.tsx` PartnersBody), which previously still rendered
   the old flattened `ART.partnerStrip` image while Home had already moved to individual
   logos — the two pages had drifted to different quality bars for the same content. Added
   TPCI, NABARD, Bihar Foundation, HSIIDC (real URLs) and ASEAN NZ Business Council, NZ Asian
   Leaders, BNZBA, NZ India Research Institute (verified by web search). "ThinkNew New
   Zealand" is named, not linked — no verifiable official site found under that name.
   Logo files sourced directly, 18 Aug 2026 (see `public/partners/LOGO_SOURCES.md`): TPCI,
   Bihar Foundation, ASEAN NZ Business Council, BNZBA. Still text-only: NABARD and HSIIDC
   (their sites refused every connection attempt from this environment — a real access limit,
   not a lookup that was skipped) and NZ Asian Leaders (their only logo asset is white-on-
   transparent and would render invisible on this page's light background).
4. **Events depth.** Upcoming/recent is now computed, not hand-written (see row above). Still
   open: a real registration link per event (needs a Zoho or Member Jungle URL from INZBC)
   and event reports as their own content type, not just the past-events archive standing in
   for them.
5. **Advertise With Us.** A commercial route that simply vanished. Needs the rate card.

## Rule for anything after this

A destination may only leave this site with a row above saying it was dropped and why.
