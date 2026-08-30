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
  email: 'mailto:Secretariat@inzbc.org',
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
  iconEvents: '/art/icon-events.png',
  iconPublications: '/art/icon-publications.png',
  iconMemberships: '/art/icon-memberships.png',
  iconTrade: '/art/icon-trade.png',
  socialFacebook: '/art/social-facebook.png',
  socialLinkedin: '/art/social-linkedin.png',
  socialYoutube: '/art/social-youtube.png',
  socialX: '/art/social-x.png',
} as const;

/* The only three numbers this site may state. Each carries its own source line, because a
   figure without a source is a claim. Sourced from MFAT's National Interest Analysis. */
export const STATS = [
  { figure: 'NZ$3.95bn', label: 'Two-way trade', note: 'Year ended December 2025.' },
  { figure: '95%', label: 'Of NZ exports covered', note: 'Receiving tariff elimination or reduction.' },
  { figure: '57%', label: 'Duty free from day one', note: "At the agreement's entry into force." },
] as const;

export const PATHWAYS = [
  { title: 'Events', body: 'Briefings, delegations, networking and the annual INZBC Summit.', icon: ART.iconEvents, href: '/events' },
  { title: 'News and publications', body: 'The India Report, Kia Ora India and the Trade Intelligence Digest.', icon: ART.iconPublications, href: '/publications' },
  { title: 'Membership', body: 'Advocacy, market intelligence, introductions and the member directory.', icon: ART.iconMemberships, href: '/membership' },
  { title: 'Trade with India', body: 'Exporting, importing, trade missions and the NZ-India FTA.', icon: ART.iconTrade, href: '/trade' },
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
};

export const BUSINESS_PARTNERS: readonly PartnerMark[] = [
  { name: 'Bank of New Zealand', href: 'https://www.bnz.co.nz/', logo: '/partners/bnz.png', relationship: 'Strategic partner' },
  { name: 'High Commission of India, Wellington', href: 'https://www.hciwellington.gov.in/', logo: '/partners/hci-wellington.webp', relationship: 'Strategic partner' },
  { name: 'University of Auckland', href: 'https://www.auckland.ac.nz/', logo: '/partners/auckland.svg', relationship: 'Strategic partner' },
  { name: 'Duco Consultancy', href: 'https://www.ducoconsultancy.com/', logo: '/partners/duco.svg', relationship: 'Strategic partner / Gold' },
  { name: 'Zespri', href: 'https://www.zespri.com/en-NZ', logo: '/partners/zespri.png', relationship: 'Strategic partner' },
  { name: 'Fonterra', href: 'https://www.fonterra.com/nz/en.html', logo: '/partners/fonterra.png', relationship: 'Partner' },
  { name: 'Slumberzone New Zealand', href: 'https://slumberzone.co.nz/', logo: '/partners/slumberzone.webp', relationship: 'Associate partner' },
  { name: 'Auckland Institute of Studies', href: 'https://www.ais.ac.nz/', logo: '/partners/ais.png', relationship: 'Associate partner' },
  { name: 'New Zealand Airline Academy', href: 'https://www.nzaal.co.nz/', logo: '/partners/nzaal.webp', relationship: 'Associate partner' },
] as const;

export const INDIA_NETWORK: readonly PartnerMark[] = [
  { name: 'FICCI', href: 'https://www.ficci.in/', logo: '/partners/ficci.png', relationship: 'India industry network' },
  { name: 'Confederation of Indian Industry', href: 'https://www.cii.in/', logo: '/partners/cii.svg', relationship: 'India industry network' },
  { name: 'PHD Chamber of Commerce and Industry', href: 'https://www.phdcci.in/', logo: '/partners/phdcci.png', relationship: 'India industry network' },
  { name: 'ASSOCHAM', href: 'https://www.assocham.org/', logo: '/partners/assocham.jpg', relationship: '2026 MoU partner' },
  { name: 'Trade Promotion Council of India', href: 'https://www.tpci.in/', logo: '/partners/tpci.png', relationship: 'India industry network' },
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

export const PUBLIC_SECTOR_NETWORK: readonly { name: string; href: string | null; logo?: string }[] = [
  { name: 'MFAT', href: 'https://www.mfat.govt.nz/' },
  { name: 'New Zealand Trade & Enterprise', href: 'https://www.nzte.govt.nz/' },
  { name: 'Business Canterbury', href: 'https://www.businesscanterbury.co.nz/' },
  { name: 'BusinessNZ', href: 'https://businessnz.org.nz/' },
  { name: 'ExportNZ', href: 'https://exportnz.org.nz/' },
  { name: 'ASEAN New Zealand Business Council', href: 'https://asean.org.nz/', logo: '/partners/asean-nz.png' },
  // NZAL's only logo asset (nzasianleaders.org) is white-on-transparent, made for a dark
  // background — invisible on this site's light chips. Left text-only rather than ship a
  // logo that renders blank.
  { name: 'NZ Asian Leaders', href: 'https://nzasianleaders.org/' },
  { name: 'BNZBA', href: 'https://www.bnzba.co.nz/', logo: '/partners/bnzba.png' },
  { name: 'NZ India Research Institute', href: 'https://www.wgtn.ac.nz/nziri' },
  { name: 'ThinkNew New Zealand', href: null },
] as const;

export const SOCIALS = [
  { name: 'Facebook', href: LINKS.facebook, icon: ART.socialFacebook, label: 'Find us on Facebook' },
  { name: 'YouTube', href: LINKS.youtube, icon: ART.socialYoutube, label: 'Watch our videos' },
  { name: 'LinkedIn', href: LINKS.linkedin, icon: ART.socialLinkedin, label: 'Connect with us' },
  { name: 'X', href: LINKS.x, icon: ART.socialX, label: 'Follow us on X' },
] as const;
