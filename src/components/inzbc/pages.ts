import { LINKS } from './content';

/**
 * The destinations the homepage links to.
 *
 * Titles and ledes are the real copy from the Wix Studio build, which INZBC reviewed; they
 * are not rewritten here. Each page's body is still to come, so every one carries a visible
 * marker rather than filler.
 *
 * Routes exist for all of them because a navigation item that goes nowhere is worse than a
 * thin page: the Studio site had nineteen of twenty pages returning 404 for days and it was
 * not obvious from looking at it.
 */
export type PageDef = {
  path: string;
  title: string;
  lede: string;
  /** Optional photo-backed hero. Falls back to the plain dark gradient hero when absent. */
  heroImage?: string;
  heroImageAlt?: string;
  /** CSS object-position, e.g. "50% 40%". Defaults to center. */
  heroImagePosition?: string;
  /** Optional hero CTA button. Only rendered when the page has one — not every inner page
      has a single obvious action, so this doesn't default to anything. */
  heroCta?: { label: string; href: string };
};

export const PAGES: PageDef[] = [
  {
    path: '/publications',
    title: "Publications",
    lede: "The India Report, Kia Ora India and the Trade Intelligence Digest: research, sector analysis and the stories of businesses already trading across the corridor.",
    heroImage: '/blog/cancer-collaboration-for-university-of-auckland-and-tata-memorial-hospital.jpg',
    heroImageAlt: '',
    heroImagePosition: '50% 30%',
    heroCta: { label: 'Read the 2025 trade report', href: LINKS.reportIssuu },
  },
  { path: '/newsletters', title: "Newsletters", lede: "Trade news, FTA developments and event announcements, with every past edition kept in the archive." },
  { path: '/fta', title: "NZ\u2013India FTA Centre", lede: "Sourced, plain-language guidance on the New Zealand\u2013India Free Trade Agreement: what changes, who it affects, and what to do next." },
  {
    path: '/events',
    title: "Events",
    lede: "Briefings, delegations, networking and the annual INZBC Summit \u2014 the main ways to engage with the NZ\u2013India trade community.",
    heroImage: '/events/summit-group.jpg',
    heroImageAlt: '',
    heroImagePosition: '50% 35%',
  },
  {
    path: '/membership',
    title: "Join New Zealand's India trade network",
    lede: "INZBC membership gives companies and institutions a direct voice in the NZ\u2013India trade relationship, sourced market intelligence, and access to events, delegations and introductions.",
    heroImage: '/blog/india-business-forum.jpg',
    heroImageAlt: '',
    heroImagePosition: '50% 35%',
    heroCta: { label: 'Join INZBC', href: LINKS.join },
  },
  {
    path: '/connect',
    title: "Connect",
    lede: "Get in touch with INZBC, or talk to us about sponsorship.",
    heroImage: '/blog/india-new-zealand-free-trade-agreement-signals-new-era-for-business-inzbc.jpg',
    heroImageAlt: '',
    heroImagePosition: '50% 40%',
  },
  { path: '/news', title: "News", lede: "Updates from INZBC and the NZ\u2013India trade relationship." },
  { path: '/partners', title: "Partners", lede: "Organisations that support INZBC's work across the NZ\u2013India corridor." },
  { path: '/trade-resources', title: "Trade resources for the NZ\u2013India opportunity", lede: "Practical guidance for New Zealand businesses exporting to India, importing from India, and using the NZ\u2013India Free Trade Agreement." },
  { path: '/india-market-opportunities', title: "India market opportunities", lede: "Sector guidance for New Zealand exporters under the NZ\u2013India Free Trade Agreement." },
  { path: '/membership/directory', title: "Member directory", lede: "The directory of INZBC members is hosted on Member Jungle, the provisional system of record for membership." },
  {
    path: '/events/past',
    title: "Past events",
    lede: "Reports, recordings and summaries from previous INZBC events.",
    heroImage: '/events/summit-speakers.jpg',
    heroImageAlt: '',
    heroImagePosition: '50% 35%',
  },
  { path: '/executive-council', title: "Executive Council", lede: "The governance and executive team leading INZBC." },
];

export const NAV = [
  { label: 'The FTA', href: '/fta' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
  { label: 'Publications', href: '/publications' },
  { label: 'Connect', href: '/connect' },
];

export const JOIN = LINKS.join;
