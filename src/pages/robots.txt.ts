import type { APIRoute } from 'astro';
import { SITE_ORIGIN } from '@/lib/seo';

/*
 * An endpoint rather than a file in public/, so the sitemap URL and the canonical origin
 * stay the same constant. A robots.txt pointing at a sitemap on the old domain is the
 * failure mode this avoids when INZBC moves the build to inzbc.org.
 */
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
