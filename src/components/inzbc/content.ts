// INZBC content. Copy, links and artwork carried over from the Wix Studio build, where
// every URL was checked live and every image uploaded to the Media Manager.
//
// The [[...]] markers are deliberate. Each is a fact INZBC still owes, and a placeholder is
// the honest thing to render until they supply it. Never replace one with a plausible
// guess: an invented member count or event date is worse than a visible gap.

export const LINKS = {
  join: 'https://inzbc.memberjungle.club/index.cfm?module=membership_v2&kat=add_register',
  subscribe: 'https://emailoctopus.com/lists/442124e3-1caa-11eb-a3d0-06b4694bee2a/forms/subscribe',
  reportIssuu: 'https://issuu.com/inzbc/docs/inzbc_report_2025_digital',
  // Real latest issue is June 2024 (confirmed via the Publications page's Issuu archive) —
  // this constant used to point at December 2023, which was stale everywhere it was used
  // (Home and Newsletters both showed it as current).
  kiaOraIssuu: 'https://issuu.com/inzbc/docs/kiaora_india_june24_v8_highres',
  kiaOraIssuuDec2023: 'https://issuu.com/inzbc/docs/kiaora_india_dec_2023_v6_final',
  summitSite: 'https://www.inzbusinesssummit.com/',
  mfatFta:
    'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-concluded-but-not-in-force/new-zealand-india-free-trade-agreement',
  mfatFtaText:
    'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-concluded-but-not-in-force/new-zealand-india-free-trade-agreement/text-of-the-agreement',
  mfatKeyOutcomes:
    'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-concluded-but-not-in-force/new-zealand-india-free-trade-agreement/key-outcomes',
  facebook: 'https://www.facebook.com/inzbc',
  facebookAlbums: 'https://www.facebook.com/inzbc/photos?tab=albums',
  flickr: 'https://www.flickr.com/photos/inzbc/',
  youtube: 'https://www.youtube.com/channel/UC9MQW-VliLqOdT4GUktKfZQ',
  linkedin: 'https://www.linkedin.com/company/inzbc/posts/?feedView=all',
  x: 'https://x.com/inzbc',
  // Supplied by Sunil 17 Oct 2026.
  instagram: 'https://www.instagram.com/indianewzealand/',
  // Was Secretariat@inzbc.org everywhere except Connect (which used a separate commsEmail
  // constant for Comms@inzbc.org, per Sunil's earlier instruction). Unified to Comms@inzbc.org
  // site-wide on Sunil's instruction (17 Oct 2026) — one address, one constant.
  email: 'mailto:Comms@inzbc.org',
} as const;

/*
 * Artwork, served from this repo.
 *
 * Every entry here except kiaOraCover used to be a static.wixstatic.com URL under the
 * df219d media account — the old inzbc.org site's library, not this one's. That is exactly
 * what legacy/wix-studio/docs/live-site-extract.md says not to do: "the URLs work today but
 * tie the rebuild to the old site's assets." The site logo was one of them, so retiring the
 * old site would have taken the masthead off every page of the new one, on a schedule
 * nobody was tracking against this repo.
 *
 * The fifteen files still in use were downloaded on 22 August 2026 and live in public/art/
 * under names that say what they are. Byte-identical to what the URLs served; nothing was
 * re-encoded or resized, so this commit changes where the images come from and nothing
 * about how they look.
 *
 * Four dropped rather than downloaded, because nothing rendered them: heroPhoto,
 * reportCover2025, pharmaReportCover and magazineSpread. They are recoverable from this
 * file's history along with their original URLs, for as long as the old library is up.
 */
export const ART = {
  // .png, not the original .jpg: JPEG has no alpha channel, so the logo carried a hard
  // white rectangle wherever it sat on anything but a plain white background — visible as
  // a mismatched box against the header's translucent lavender pill. Background removed by
  // channel-thresholding near-white pixels to transparent (checked against the flower
  // mark's own light-centre gradient first, so the removal doesn't punch a hole in it).
  logo: '/art/logo.png',
  heroBanner: '/art/hero-banner.jpg',
  reportCover: '/art/report-cover.png',
  kiaOraCover: '/publications/kia-ora-2024-06.jpg',
  newsletterMockup: '/art/newsletter-mockup.png',
  ftaFlyer: '/art/fta-flyer.png',
  ftaNewEra: '/art/fta-new-era.jpg',
  // .svg, not the original blob-shaped .png: those four were the old Wix build's dated
  // blue-gradient blob icons, and socialX's glyph was still the pre-2023 Twitter bird, not
  // the current X mark — wrong branding, not just a style mismatch. Replaced 15 Oct 2026
  // (Simple Icons source paths) on Sunil's instruction that the Connect page's social row
  // "remove the outside colors, just use logos, bigger" — applied everywhere these four are
  // used, not just that one page, so Footer stays in sync with it.
  //
  // White glyph, not each brand's own colour: an <img>-loaded external SVG can't pick up a
  // CSS text colour the way an inlined one could, and these four sit on both light (Connect
  // page) and dark (Footer, navy) backgrounds. Each caller supplies the real brand colour
  // itself as a plain solid-colour circle behind the glyph — Facebook #1877F2, LinkedIn
  // #0A66C2, YouTube #FF0000, X #000000 — so the icon reads correctly on any background
  // instead of disappearing (black-on-navy) or clashing (random per-icon gradient blobs,
  // the exact thing being removed here).
  socialFacebook: '/art/social-facebook.svg',
  socialLinkedin: '/art/social-linkedin.svg',
  socialYoutube: '/art/social-youtube.svg',
  socialX: '/art/social-x.svg',
  // Added 17 Oct 2026, same Simple Icons source and white fill as the four above.
  socialInstagram: '/art/social-instagram.svg',
} as const;

/* The three headline numbers repeated across Home and the summary bands. Each carries its
   own source line, because a figure without a source is a claim. Sourced from MFAT's
   National Interest Analysis. FtaPage.tsx cites further figures (82%, 13%, forestry 95%) for
   its own detailed timeline/breakdown, sourced separately from MFAT's Key Outcomes summary
   and legacy/wix-studio's fta-centre.html snippet — a wider, page-specific source set, not a
   drift from this one. */
export const STATS = [
  { figure: 'NZ$3.95bn', label: 'Two-way trade', note: 'Year ended December 2025.' },
  { figure: '95%', label: 'Of NZ exports covered', note: 'Receiving tariff elimination or reduction.' },
  { figure: '57%', label: 'Duty free from day one', note: 'From 20 October 2026, when the agreement enters into force.' },
] as const;

export const BENEFITS = [
  ['Advocacy', 'on trade policy and market access, with both governments'],
  ['Intelligence', 'through the Trade Intelligence Digest and the India Report'],
  ['Introductions', 'to counterparts, at events and through the directory'],
  ['Delegations', 'and trade missions into the Indian market'],
] as const;

/* Partner data. BUSINESS_PARTNERS and the first four INDIA_NETWORK entries (FICCI, CII, PHD
   Chamber, ASSOCHAM) originated in HomePage.tsx with real logo files already in
   public/partners/ (see its LOGO_SOURCES.md) — moved here so Home and /partners render from
   one list instead of two that can drift apart, which is exactly what had already happened:
   /partners was still using a flattened legacy image while Home had moved on to individual
   logos. The rest (TPCI, NABARD, Bihar Foundation, HSIIDC, and the PUBLIC_SECTOR_NETWORK
   additions below) are text-only — real names and URLs, verified by web search 18 Aug 2026,
   but no logo file exists for them yet. "ThinkNew New Zealand," visible on inzbc.org's own
   partner graphic, has no verifiable official site under that name, so it's named but not
   linked rather than guessed. */
export type PartnerMark = {
  name: string;
  href: string;
  logo?: string;
  relationship: string;
  // Short description for the /partners page cards (Sunil, 21 Oct 2026: business partners
  // only). Facts checked against each organisation's own site or news coverage that day.
  blurb?: string;
};

export const BUSINESS_PARTNERS: readonly PartnerMark[] = [
  // bnz.png had an opaque white background baked in, mismatched against this grid's tinted
  // card (same issue as assocham.png/fieo.png below) — keyed the white out to transparent
  // 14 Oct 2026, logo mark itself (navy/orange, no white in the art) untouched. Briefly
  // moved into the small-logo Strategic networks tier on 17 Oct 2026 over a misreading of
  // "the Bharat NZ blue logo" as this one — "Bharat" is Hindi for India, so that instruction
  // actually meant the High Commission of India logo below, not this one. Moved back here.
  { name: 'Bank of New Zealand', href: 'https://www.bnz.co.nz/', logo: '/partners/bnz.png', relationship: 'Strategic partner',
    blurb: 'One of New Zealand’s largest banks, serving personal, business and corporate customers since 1861.' },
  // University of Auckland and Duco Consultancy removed on Sunil's instruction (11 Oct 2026) —
  // he's sourcing High Commission of India logos to fill these two Strategic Partner slots.
  { name: 'Zespri', href: 'https://www.zespri.com/en-NZ', logo: '/partners/zespri.png', relationship: 'Strategic partner',
    blurb: 'Owned by New Zealand’s kiwifruit growers, Zespri markets New Zealand kiwifruit around the world, India included.' },
  { name: 'Fonterra', href: 'https://www.fonterra.com/nz/en.html', logo: '/partners/fonterra.png', relationship: 'Partner',
    blurb: 'New Zealand’s farmer-owned dairy co-operative, and one of the world’s largest dairy exporters.' },
  { name: 'Slumberzone New Zealand', href: 'https://slumberzone.co.nz/', logo: '/partners/slumberzone.webp', relationship: 'Associate partner',
    blurb: 'An Auckland family business, founded in 2005, that makes and sells beds and mattresses, now expanding into manufacturing in India.' },
  { name: 'Auckland Institute of Studies', href: 'https://www.ais.ac.nz/', logo: '/partners/ais.png', relationship: 'Associate partner',
    blurb: 'A private tertiary institute founded in Auckland in 1990, teaching business, IT, tourism and hospitality to students from New Zealand and around the world.' },
  { name: 'New Zealand Airline Academy', href: 'https://www.nzaal.co.nz/', logo: '/partners/nzaal.webp', relationship: 'Associate partner',
    blurb: 'A flight school at Oamaru Airport training pilots from private licence to commercial and instructor ratings, with close links to India’s aviation industry.' },
] as const;

export const INDIA_NETWORK: readonly PartnerMark[] = [
  { name: 'FICCI', href: 'https://www.ficci.in/', logo: '/partners/ficci.png', relationship: 'India industry network' },
  { name: 'Confederation of Indian Industry', href: 'https://www.cii.in/', logo: '/partners/cii.svg', relationship: 'India industry network' },
  { name: 'PHD Chamber of Commerce and Industry', href: 'https://www.phdcci.in/', logo: '/partners/phdcci.png', relationship: 'India industry network' },
  // assocham.png and fieo.png: the only source files for these two (assocham.jpg,
  // fieo.jpg) were plain white-background JPEGs, which showed as a visible white box
  // against this grid's tinted card background. Re-exported as transparent PNGs by
  // keying out the white (14 Oct 2026) rather than left mismatched.
  { name: 'ASSOCHAM', href: 'https://www.assocham.org/', logo: '/partners/assocham.png', relationship: '2026 MoU partner' },
  { name: 'Trade Promotion Council of India', href: 'https://www.tpci.in/', logo: '/partners/tpci.png', relationship: 'India industry network' },
  { name: 'Federation of Indian Export Organisations', href: 'https://www.fieo.org/', logo: '/partners/fieo.png', relationship: 'India industry network' },
  // NABARD and HSIIDC: nabard.org and hsiidc.org.in both refused every connection attempt
  // from here (curl and a rendering fetch both got ECONNREFUSED/timeout) — not a scraping
  // failure, the sites themselves are unreachable from this environment. No logo file.
  { name: 'NABARD', href: 'https://www.nabard.org/', relationship: 'India industry network' },
  // biharfoundation.in (the URL in the parity matrix) currently serves a bare Laravel
  // install page, not the real site — biharfoundation.bihar.gov.in is the working mirror
  // and is what the logo below came from; using it as the link too.
  { name: 'Bihar Foundation', href: 'https://biharfoundation.bihar.gov.in/', logo: '/partners/bihar-foundation.png', relationship: 'India industry network' },
  { name: 'HSIIDC', href: 'https://hsiidc.org.in/', relationship: 'India industry network' },
] as const;

// Alphabetised (17 Oct 2026, on Sunil's instruction) — this tier had grown by insertion
// order across several sessions and looked disordered as a result; a fixed, obvious order
// is the point here, not any particular grouping logic.
// stacked: the logo is a tall lockup (emblem above wordmark). At the shared wide-logo height
// its text shrinks to unreadable, so both renderers give these a taller logo slot.
export const PUBLIC_SECTOR_NETWORK: readonly { name: string; href: string | null; logo?: string; stacked?: boolean }[] = [
  { name: 'ASEAN New Zealand Business Council', href: 'https://asean.org.nz/', logo: '/partners/asean-nz.png' },
  // Added from Sunil's 11 Oct 2026 Drive upload ("Our Strategic network" folder).
  { name: 'Asia New Zealand Foundation Te Whītau Tūhono', href: 'https://www.asianz.org.nz/', logo: '/partners/asia-nz-foundation.png' },
  // Auckland Business Chamber, NZ Nepal Chamber of Commerce and SLBANZ added
  // 19 Oct 2026 on Sunil's instruction. auckland-business-chamber.svg is the chamber's own
  // mark via Wikimedia Commons (aucklandchamber.co.nz blocks every fetch from here behind a
  // Cloudflare challenge). nzncc.png came straight from nzncc.co.nz's site header, its near-white background keyed
  // to transparent like the other JPEG-style logos here.
  { name: 'Auckland Business Chamber', href: 'https://aucklandchamber.co.nz/', logo: '/partners/auckland-business-chamber.svg' },
  { name: 'Business Canterbury', href: 'https://www.businesscanterbury.co.nz/', logo: '/partners/business-canterbury.webp' },
  // businessnz.png, ema.png, education-nz.png, nzal.png and nziri.png (below) all downloaded
  // directly from each organisation's own live site on 14 Oct 2026, on Sunil's instruction
  // not to leave any of these without a logo. The Drive-supplied ENZ/EMA files kept coming
  // back corrupted through this session's Drive download path (see git history) — fetching
  // straight from enz.govt.nz / ema.co.nz instead sidestepped that entirely.
  { name: 'BusinessNZ', href: 'https://businessnz.org.nz/', logo: '/partners/businessnz.png' },
  { name: 'BNZBA', href: 'https://www.bnzba.co.nz/', logo: '/partners/bnzba.png' },
  // education-nz.png: enz.svg (their site's only logo asset) is a broken Adobe Illustrator
  // export (a non-standard <switch>/i:pgf fallback block with no real fallback content) that
  // renders blank under every tool tried, still true after ENZ's mid-2025 rebrand to "New
  // Zealand Education" — checked again 17 Oct 2026. This is their real FernMark wordmark
  // instead, a plain JPEG linked from ENZ's own 2025 rebrand announcement (not the broken
  // svg, not a redrawn logo), white background keyed to transparent the same way as the
  // other JPEG-sourced logos on this page.
  { name: 'Education New Zealand', href: 'https://enz.govt.nz/', logo: '/partners/education-nz.png' },
  { name: 'Employers and Manufacturers Association (EMA)', href: 'https://www.ema.co.nz/', logo: '/partners/ema.png' },
  // export-nz.png: the old file had a white box, black border and wide padding baked in, so
  // the mark showed tiny. Trimmed to the mark and white keyed out (20 Oct 2026).
  { name: 'ExportNZ', href: 'https://exportnz.org.nz/', logo: '/partners/export-nz.png' },
  // hci-wellington.png: replaced the red version with the blue one Sunil supplied via Drive
  // (14 Oct 2026) — the High Commission rebranded this logo's colour. Moved into this tier
  // 17 Oct 2026 — "the Bharat NZ blue logo" meant this one ("Bharat" is Hindi for India),
  // not Bank of New Zealand (see BUSINESS_PARTNERS above).
  { name: 'High Commission of India, Wellington', href: 'https://www.hciwellington.gov.in/', logo: '/partners/hci-wellington.png' },
  // mfat.png and nzte.png: replaced 19 Oct 2026 with the files Sunil supplied. The old
  // nzte.png was a corrupt file that never rendered, and mfat.svg had so much empty canvas
  // around the mark that it showed tiny. Both trimmed to the mark, MFAT's white keyed out.
  // Named as its own logo reads, not "MFAT" (Sunil's instruction, 19 Oct 2026).
  { name: 'New Zealand Foreign Affairs & Trade', href: 'https://www.mfat.govt.nz/', logo: '/partners/mfat.png', stacked: true },
  { name: 'New Zealand Nepal Chamber of Commerce', href: 'https://www.nzncc.co.nz/', logo: '/partners/nzncc.png' },
  { name: 'New Zealand Trade & Enterprise', href: 'https://www.nzte.govt.nz/', logo: '/partners/nzte.png', stacked: true },
  // NZAL's own main logo (nzasianleaders.org) is white-on-transparent, made for a dark
  // background — invisible on this site's light chips. Used their apple-touch-icon mark
  // instead (coloured, square), rather than either an invisible logo or no logo at all.
  { name: 'NZ Asian Leaders', href: 'https://nzasianleaders.org/', logo: '/partners/nzal.png' },
  { name: 'NZ India Research Institute', href: 'https://www.wgtn.ac.nz/nziri', logo: '/partners/nziri.png' },
  // slbanz.webp: logo Sunil supplied 19 Oct 2026 (2000px source, downscaled to 480px). Its
  // yellow field is part of the brand mark, so it's kept rather than keyed out.
  { name: 'Sri Lankan Business Association in New Zealand', href: 'https://slbanz.co.nz/', logo: '/partners/slbanz.webp' },
  // "ThinkNew New Zealand" removed on Sunil's instruction (14 Oct 2026) — see the removal
  // note this replaced in git history if it needs restoring.
] as const;

// color is each glyph's real brand colour, for the solid circle every caller renders behind
// the (white) glyph — see ART's own comment on why the colour lives here, not in the SVG.
export const SOCIALS = [
  { name: 'Facebook', href: LINKS.facebook, icon: ART.socialFacebook, label: 'Find us on Facebook', color: '#1877F2' },
  { name: 'YouTube', href: LINKS.youtube, icon: ART.socialYoutube, label: 'Watch our videos', color: '#FF0000' },
  { name: 'LinkedIn', href: LINKS.linkedin, icon: ART.socialLinkedin, label: 'Connect with us', color: '#0A66C2' },
  { name: 'X', href: LINKS.x, icon: ART.socialX, label: 'Follow us on X', color: '#000000' },
  { name: 'Instagram', href: LINKS.instagram, icon: ART.socialInstagram, label: 'Follow us on Instagram', color: '#E4405F' },
] as const;

/* Footer column structure, sourced from inzbc.org's live footer (checked 14 Oct 2026) on
   Sunil's instruction to match it rather than keep this rebuild's one flat nav row. Link
   destinations are mapped to where each old-site page actually lives in this rebuild (the
   same mapping Router.tsx's §5 redirect table already uses for these same old URLs), not
   guessed:
     - "Partners" -> /partners (was "Our Sponsors"; the old site's own /our-sponsors redirects here)
     - "Trade Shows" -> /trade-resources (old /trade-shows redirects here)
     - "Trade Bazaar" -> /india-market-opportunities (old /trade-bazaar redirects here)
     - "Membership Form" -> /membership (old /membership-form redirects here)
     - "Our Patron" -> /our-patron: a real dedicated page now (added 17 Oct 2026, copied from
       the old site's own /our-patron on Sunil's instruction), not the /about-inzbc stand-in
       this used to point at for lack of one.
   "Join INZBC" is the one external link in the set (Member Jungle, same as every other
   "Join INZBC" button on this site) — everything else routes within this site. */
export const FOOTER_COLUMNS = [
  {
    heading: 'About Us',
    links: [
      { label: 'About INZBC', href: '/about-inzbc' },
      { label: 'Executive Council', href: '/executive-council' },
      { label: 'Partners', href: '/partners' },
      { label: 'Our Patron', href: '/our-patron' },
    ],
  },
  {
    heading: 'Events',
    links: [
      { label: 'Events Calendar', href: '/events' },
      { label: 'Past Events', href: '/events/past' },
    ],
  },
  {
    heading: 'Trade',
    links: [
      { label: 'Trade Shows', href: '/trade-resources' },
      { label: 'Trade Bazaar', href: '/india-market-opportunities' },
    ],
  },
  {
    heading: 'Members',
    links: [
      { label: 'Join INZBC', href: LINKS.join, external: true },
      { label: 'Membership Form', href: '/membership' },
    ],
  },
  {
    heading: 'News Centre',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Newsletters', href: '/newsletters' },
      { label: 'Publications', href: '/publications' },
    ],
  },
] as const;

export const FOOTER_TAGLINE =
  'The India New Zealand Business Council is a premier trade organisation in New Zealand, working since 1988 to build trade relations between India and New Zealand.';
