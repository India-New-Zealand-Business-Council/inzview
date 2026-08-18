# Partner logo provenance

Marks shown on the homepage "Partners and supporters" wall. Each is the trademark of its
owner, used to identify an existing INZBC relationship and linked to that organisation's
own site. They are localized rather than hot-linked so the page does not depend on a third
party's CDN. Every file below was taken from the organisation's own site unless the source
column says otherwise.

Retrieved 13 August 2026.

| Local file | Organisation | Source |
|---|---|---|
| `hci-wellington.webp` | High Commission of India, Wellington | https://www.hciwellington.gov.in/page/hci-wellington-logo/ (mission logo, downscaled to 440px) |
| `auckland.svg` | University of Auckland | https://en.wikipedia.org/wiki/File:University_of_Auckland_logo.svg (full Waipapa Taumata Rau lockup; the site's own header uses a 410 KB sprite that cannot be referenced by fragment from an `img`) |
| `duco.svg` | Duco Consultancy | https://www.ducoconsultancy.com/ header logo asset |
| `slumberzone.webp` | Slumberzone New Zealand | https://slumberzone.co.nz/ header logo, downscaled from 2362px to 440px |
| `cii.svg` | Confederation of Indian Industry | https://commons.wikimedia.org/wiki/File:Official_logo_of_the_Confederation_of_Indian_Industry_(CII).svg (Commons states public domain — below the threshold of originality; trademark rights still apply) |

Pre-existing files (`ais.png`, `assocham.jpg`, `bnz.png`, `ficci.png`, `fonterra.png`,
`nzaal.webp`, `phdcci.png`, `zespri.png`) were already in the repository. `zespri.png` was
re-cropped on 13 August 2026: the original was 652x789 with the mark occupying only 19% of
the canvas, so it rendered as a small logo adrift in an empty tile.

Retrieved 18 August 2026, when `BUSINESS_PARTNERS`/`INDIA_NETWORK`/`PUBLIC_SECTOR_NETWORK`
moved to `content.ts` and `/partners` (bodies.tsx) started rendering real logos instead of
the old flattened partner-wall image:

| Local file | Organisation | Source |
|---|---|---|
| `tpci.png` | Trade Promotion Council of India | https://www.tpci.in/ theme logo asset (`/wp-content/themes/eventica-wp/.../logo.png`) — the `wp-content/uploads` favicon linked from the page's own `<head>` 404s, so this is the header logo, not the icon |
| `bihar-foundation.png` | Bihar Foundation | https://biharfoundation.bihar.gov.in/images/logo.png — the URL in the parity matrix, `biharfoundation.in`, currently serves a bare default Laravel install page, not the real site; this `.bihar.gov.in` mirror is the one that works |
| `asean-nz.png` | ASEAN New Zealand Business Council | https://asean.org.nz/ header logo, full resolution (2180x528, 68 KB) — not yet downscaled, same follow-up as `phdcci.png` below |
| `bnzba.png` | British New Zealand Business Association | https://www.bnzba.co.nz/ header logo |

**Not sourced.** `nabard.org` and `hsiidc.org.in` refused every connection attempt from this
environment (curl and a separate rendering fetch both failed at the connection level, not a
scraping block) — real infrastructure access limit, not something to route around. Both
entries in `INDIA_NETWORK` are real, checked, text-only until someone with access can pull
the mark. NZ Asian Leaders (`nzasianleaders.org/wp-content/uploads/2023/03/NZAL-logo.png`)
does exist but is a white-on-transparent mark meant for a dark background — invisible on
this page's light cards — so it stayed text-only rather than ship a logo that renders blank.

If an organisation asks for a different mark or for removal, replace or delete the file and
update the matching `logo:` field in `src/components/inzbc/content.ts`. A partner entry with
no `logo:` falls back to a styled wordmark automatically.

## Known follow-up

`phdcci.png` is 1584x1584 and 257 KB for a tile that renders at most 72px tall. It predates
this pass and is the heaviest asset on the page; worth downscaling. `asean-nz.png` (above)
has the same issue at 2180x528/68 KB — no image tool was available in this environment to
fix either.
