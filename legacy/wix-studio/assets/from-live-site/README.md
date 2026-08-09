# Images pulled from the live site

Downloaded from `static.wixstatic.com` on 6 August 2026, the media library behind
`https://www.inzbc.org`. Originals, not the downscaled versions the live pages display.

Kept at the repo root, **not** under `src/`, deliberately: Wix uploads all of `src/` on
`wix dev` and lints it on `wix publish`. 8 MB of images there would risk the same HTTP 413
that `node_modules` caused. See [EDITING.md](../../EDITING.md).

| File | Real size | Displayed at | Use |
|---|---|---|---|
| `hero-tall.jpg` | 3508×2481 | 1281×1063 | Homepage hero candidate |
| `banner-wide-secondary.jpg` | 7043×1834 | 1281×291 | Wide banner, very high res |
| `banner-wide-primary.jpg` | 1690×951 | 1281×885 | Section banner |
| `kia-ora-india-dec-2023-cover.jpg` | 2464×3485 | 331×458 | Newsletters page |
| `inzbc-report-2025-cover.png` | 1700×2200 | 331×458 | Publications page |
| `partner-logo-strip.jpg` | 1500×600 | 750×299 | Partners page |
| `fta-vangelis-vitalis-auckland-flyer.png` | 856×403 | 322×242 | Events — named real event |
| `fta-new-era-for-business.jpg` | 600×400 | 320×240 | News/FTA article |
| `newsletter-mockup.png` | 1593×818 | 506×245 | Newsletters |
| `magazine-mockup.png` | 1048×861 | 246×186 | Publications |
| `logo-live-site-small.jpg` | 400×114 | 280×72 | **Do not use.** JPEG, small, and it has a white matte. Export SVG from `INZBC_Logo_Files.ai` instead |

## These are not on the new site yet

Repo files are not served as images. A Wix page can only show an image that lives in that
site's **Media Manager**, so each of these has to be uploaded there by hand, once. After
upload, Wix gives each a `static.wixstatic.com` URL for the *new* site, and that URL goes
into the section HTML in `../../src/public/wix-studio-snippets/`.

Do **not** reference the old site's URLs directly. They resolve today, but they belong to
the site being replaced and to a different Wix account, so the rebuild would break the day
that site is retired or its media is cleaned up.

## Before any of these are published

- **Alt text.** Several arrived with filenames as alt text on the live site
  (`WhatsApp Image 2025-05-12 at 2.06.54 PM.jpg`, `Screenshot 2021-07-01 at 12.44.04 PM.png`).
  Every image needs real alt text — see `docs/accessibility-audit.md` in the `inzbc` repo.
- **Resize.** `banner-wide-secondary.jpg` is 7043px wide and displays at 1281. Serving the
  original would be slow on mobile. Wix resizes on delivery, but upload something sane.
- **Rights.** These are INZBC's own images from INZBC's own site. Photos of identifiable
  people at events still need the usual consent check before reuse in a new context.
