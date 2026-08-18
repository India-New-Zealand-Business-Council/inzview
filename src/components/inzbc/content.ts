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

export const ART = {
  logo: 'https://static.wixstatic.com/media/df219d_0b8e6333d53841efaf66f675038a0798~mv2.jpg',
  heroPhoto: 'https://static.wixstatic.com/media/df219d_85f777cc8d624bc2b4ea81783f71df24~mv2.jpg',
  heroBanner: 'https://static.wixstatic.com/media/df219d_83e2d493f8b8499c8ef83fddd27208b8~mv2.jpg',
  reportCover: 'https://static.wixstatic.com/media/df219d_60093c58a989446681ae38ad6efe3a94~mv2.png',
  reportCover2025: 'https://static.wixstatic.com/media/df219d_4ffc59bcc17b482ba5850f648d232e29~mv2.png',
  pharmaReportCover: 'https://static.wixstatic.com/media/df219d_08ef7a8c3e724d6783a24cd1c5dbcc4f~mv2.jpg',
  kiaOraCover: '/publications/kia-ora-2024-06.jpg',
  partnerStrip: 'https://static.wixstatic.com/media/df219d_5350f10f4b714eddae1958abfd3c39d5~mv2.jpg',
  magazineSpread: 'https://static.wixstatic.com/media/df219d_1b53b12ca8af4cfd970a2093bdee7009~mv2.png',
  newsletterMockup: 'https://static.wixstatic.com/media/df219d_29794fdc9e864b9997c3333499673a20~mv2.png',
  ftaFlyer: 'https://static.wixstatic.com/media/df219d_b5d766252f204d4a85f6d6b58784144c~mv2.png',
  ftaNewEra: 'https://static.wixstatic.com/media/df219d_7e1445021137495297e56207da29fcaa~mv2.jpg',
  iconEvents: 'https://static.wixstatic.com/media/df219d_161014de7ca0434ea61527a1d44455a2~mv2.png',
  iconPublications: 'https://static.wixstatic.com/media/df219d_5660a14b9b3c457a801d7c5e2d6e4450~mv2.png',
  iconMemberships: 'https://static.wixstatic.com/media/df219d_e722f1a99464408c987c16bec72791f4~mv2.png',
  iconTrade: 'https://static.wixstatic.com/media/df219d_3f9c2e680dbb4de1964c21532decad7b~mv2.png',
  socialFacebook: 'https://static.wixstatic.com/media/df219d_1bfd392cd6be42959afc33895036d9eb~mv2.png',
  socialLinkedin: 'https://static.wixstatic.com/media/df219d_bbc62087c9cd4b908787d3fe761e05e7~mv2.png',
  socialYoutube: 'https://static.wixstatic.com/media/df219d_f0d2dc7f557c43aea100e778e904f3d8~mv2.png',
  socialX: 'https://static.wixstatic.com/media/df219d_e31fcca7427c4eca88e40f376e1b8320~mv2.png',
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
