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
  kiaOraIssuu: 'https://issuu.com/inzbc/docs/kiaora_india_dec_2023_v6_final',
  summitSite: 'https://www.inzbusinesssummit.com/',
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
  kiaOraCover: 'https://static.wixstatic.com/media/df219d_3ac94d17fa9a42eeaef1597686fe952d~mv2.jpg',
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

export const SOCIALS = [
  { name: 'Facebook', href: LINKS.facebook, icon: ART.socialFacebook, label: 'Find us on Facebook' },
  { name: 'YouTube', href: LINKS.youtube, icon: ART.socialYoutube, label: 'Watch our videos' },
  { name: 'LinkedIn', href: LINKS.linkedin, icon: ART.socialLinkedin, label: 'Connect with us' },
  { name: 'X', href: LINKS.x, icon: ART.socialX, label: 'Follow us on X' },
] as const;
