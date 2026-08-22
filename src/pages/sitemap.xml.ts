import type { APIRoute } from 'astro';
import { SITE_ORIGIN, allRoutes } from '@/lib/seo';

/*
 * The site had no sitemap. That matters more here than on a typical site: every route is
 * client-side React behind a catch-all, so there is no crawlable set of links in the served
 * HTML for a crawler to follow — the sitemap is the only complete list of URLs that exists.
 *
 * <lastmod> is deliberately omitted rather than stamped with the build time. A build date is
 * not a content date, and a sitemap that claims every page changed on every deploy trains
 * crawlers to ignore the field.
 */
export const GET: APIRoute = () => {
  const urls = allRoutes()
    .map((path) => `  <url><loc>${SITE_ORIGIN}${path === '/' ? '/' : path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
