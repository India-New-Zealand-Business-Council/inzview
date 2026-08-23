import { PAGES } from '@/components/inzbc/pages';

/*
 * Per-route SEO metadata.
 *
 * Before this existed, src/pages/[...slug].astro passed a hardcoded `pageName: 'Home'` to
 * Wix's SEO service, so every URL on the site was served as <title>Home | INZView</title>
 * with no description and no share image. Verified against the live site on 22 Aug 2026:
 * /executive-council returned that exact title, an http:// canonical, and no
 * meta description, og:description or og:image at all — which is why INZBC links pasted
 * into LinkedIn render as a bare URL with no card.
 *
 * Titles and descriptions here are not new copy. Each is the page's own reviewed title and
 * lede from the PAGES table, reused verbatim, so nothing on this site says anything INZBC
 * hasn't already signed off. Ledes run longer than the ~155 characters Google shows; that
 * is deliberate — truncating mid-sentence to hit the display limit would mangle reviewed
 * copy for no ranking benefit, and the first sentence carries the message either way.
 */

/** Site name for og:site_name and the title suffix. */
export const SITE_NAME = 'India New Zealand Business Council';

/**
 * The canonical public origin.
 *
 * Not derived from the request: Astro sits behind Wix's proxy and reports the incoming
 * scheme, which is how the live canonical ended up as http:// on an https-only site.
 * A wrong-scheme canonical splits ranking signals between two spellings of the same URL.
 *
 * This is the wix-vibe preview host because that is where the rebuild is currently served.
 * When INZBC points inzbc.org at this build, change this one constant — nothing else needs
 * to move, but leaving it stale would make every canonical on the live site point at the
 * preview domain, which is worse than having no canonical.
 */
export const SITE_ORIGIN = 'https://my-site-9qksqx7j-inzbcsecretariat.wix-vibe-site.com';

/**
 * Default share image. The Modi–Luxon Auckland photo is the homepage hero and the only
 * image on the site that reads as "this is the NZ–India relationship" at thumbnail size.
 * Pages with their own hero photo override it below.
 */
const DEFAULT_IMAGE = '/events/modi-luxon-auckland-2026.jpeg';

export type PageSeo = {
  /** Page title, without the site-name suffix. */
  title: string;
  description: string;
  /** Root-relative or absolute. Made absolute by absoluteUrl() before rendering. */
  image: string;
};

/**
 * Routes with real page components rather than PAGES entries, so their copy lives in the
 * component and has to be repeated here. Both are quoted from the rendered h1 and lede.
 */
const STANDALONE: Record<string, PageSeo> = {
  '/': {
    title: "New Zealand's gateway to the India opportunity",
    description:
      'INZBC connects exporters, investors, institutions and government across the NZ-India trade relationship, with the intelligence and access to move from interest to action.',
    image: DEFAULT_IMAGE,
  },
  '/fta/explainer': {
    title: 'FTA Opportunity Explainer',
    description:
      'Answer a few questions about your sector and see what the New Zealand–India FTA means for your business.',
    image: DEFAULT_IMAGE,
  },
};

/**
 * Old inzbc.org URLs that Router.tsx redirects client-side. The server still returns a real
 * document for these before React redirects, and search engines and social scrapers read
 * that document — so they get the destination's metadata rather than the homepage's.
 * Kept in step with the redirect table in Router.tsx.
 */
const ALIASES: Record<string, string> = {
  '/about-us': '/about-inzbc',
  '/our-sponsors': '/partners',
  '/upcoming-events': '/events',
  '/trade-shows': '/trade-resources',
  '/join-inzbc': '/membership',
  '/membership-form': '/membership',
  '/news/categories/news': '/news',
  '/trade-bazaar': '/india-market-opportunities',
};

const FROM_PAGES: Record<string, PageSeo> = Object.fromEntries(
  PAGES.map((page) => [
    page.path,
    { title: page.title, description: page.lede, image: page.heroImage ?? DEFAULT_IMAGE },
  ]),
);

/** Trailing slashes are stripped so /events and /events/ don't produce two sets of tags. */
function normalise(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Metadata for a pathname. Unknown paths fall back to the homepage's, matching Router.tsx's
 * catch-all, which sends anything unrecognised to `/`.
 */
export function seoForPath(pathname: string): PageSeo {
  const path = normalise(pathname);
  // Old inzbc.org article URLs, which Router.tsx redirects per slug once the domain moves.
  // The slug-to-destination map lives in bodies.tsx and importing it here would pull the
  // whole component tree into the server bundle for a title, so every /post/ URL gets the
  // archive's metadata. The redirect is what a crawler follows regardless.
  if (path.startsWith('/post/')) return FROM_PAGES['/events/past'] ?? STANDALONE['/'];
  const resolved = ALIASES[path] ?? path;
  return STANDALONE[resolved] ?? FROM_PAGES[resolved] ?? STANDALONE['/'];
}

/** og:image and canonical both need absolute URLs; root-relative paths get the origin. */
export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_ORIGIN}${pathOrUrl}`;
}

/** Every route the site answers on, for sitemap.xml. Aliases are excluded: they redirect. */
export function allRoutes(): string[] {
  return ['/', '/fta', '/fta/explainer', ...PAGES.map((p) => p.path).filter((p) => p !== '/fta')];
}
