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

If an organisation asks for a different mark or for removal, replace or delete the file and
update the matching `logo:` field in `src/components/pages/HomePage.tsx`. A partner entry
with no `logo:` falls back to a styled wordmark automatically.

## Known follow-up

`phdcci.png` is 1584x1584 and 257 KB for a tile that renders at most 72px tall. It predates
this pass and is the heaviest asset on the page; worth downscaling.
