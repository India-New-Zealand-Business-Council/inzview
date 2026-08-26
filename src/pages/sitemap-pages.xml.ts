import type { APIRoute } from 'astro';
import { SITE_ORIGIN, allRoutes } from '@/lib/seo';

/*
 * The site had no sitemap. That matters more here than on a typical site: every route is
 * client-side React behind a catch-all, so there is no crawlable set of links in the served
 * HTML for a crawler to follow — the sitemap is the only complete list of URLs that exists.
 *
 * Served from /sitemap-pages.xml, not /sitemap.xml, because Wix reserves the latter: it
 * answers that one path itself and returns its own 404 for it, so an Astro route there is
 * never reached. Verified against the published site on 27 August 2026 — /sitemap.xml
 * returned 404 while every other extension path, /sitemap-pages.xml included, fell through
 * to the catch-all. Wix reserves /robots.txt the same way and serves an auto-generated file
 * from the dashboard, which is why there is no robots endpoint in this repo: pointing that
 * file at this sitemap is a change in Wix's SEO Tools, not here.
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
