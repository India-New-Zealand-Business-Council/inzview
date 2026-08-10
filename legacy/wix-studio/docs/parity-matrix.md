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
| `/our-sponsors` | **gap** | Partners page exists; the sponsors route does not resolve |
| `/join-inzbc` | live | Member Jungle registration, hero and every CTA |
| `/membership-form` | live | Same Member Jungle destination |
| `/member-directory` | live | `/membership/directory` |

## Events

| Old destination | Status | Where it lives now |
|---|---|---|
| `/upcoming-events` | **gap** | Events page exists; no explicit upcoming route from Home |
| `/past-events` | live | `/events/past`, linked from the Summit band |
| Event Calendar | **gap** | No calendar anywhere. A core INZBC function |
| Register for events | **gap** | No registration path with date, venue, availability |
| Event Reports | **gap** | Removed with the Make Connections section |
| View Gallery | live | Facebook albums and Flickr, in the social band |
| Make Connections showcase | **gap** | Removed entirely. The single largest loss |
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
| India Industry Partners | **gap** | Not in the wall image used. Bilateral credibility |
| Individual partner links | **gap** | The wall is one flattened image; no logo is clickable |

## What the gaps need

Ordered by value, not effort.

1. **Make Connections.** Real photographs of people meeting carry more trust than any
   claim. Needs event photography that is not in the asset library today.
2. **Member network.** Membership is INZBC's strongest proposition and the page asserts it
   rather than showing it. Needs member names, industries and locations.
3. **Partner ecosystem.** Individual logos, categories, clickable. Needs each logo as a
   file and each partner's URL. Currently one flattened JPEG.
4. **Events depth.** Calendar, upcoming, registration, reports. Needs the event data source
   decided: Wix Events, or an external system.
5. **Advertise With Us.** A commercial route that simply vanished. Needs the rate card.

## Rule for anything after this

A destination may only leave this site with a row above saying it was dropped and why.
