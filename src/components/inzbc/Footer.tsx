import { Link } from 'react-router-dom';
import { ART, LINKS, SOCIALS } from './content';
import { NAV } from './pages';

// One focus treatment for the whole file, matching bodies.tsx's FOCUS constant.
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

/**
 * Shared footer for every inner route, via InnerPage.tsx. Home has its own bespoke footer
 * (HomePage.tsx's <footer className="home-footer">, styled by HomePage.css) — that markup
 * isn't reused here, since its classes only exist in HomePage.css and pulling them in would
 * leak Home-specific CSS globally. This is the same content, rebuilt in plain Tailwind to
 * match bodies.tsx's convention: logo, one flat nav row (the same NAV pages.ts already gives
 * StickyHeader, plus Partners, matching what Home's footer nav includes), the tagline, socials
 * and the secretariat email — all real, sourced content, nothing invented.
 *
 * Not built: a categorised multi-column footer (About Us / Events / Trade / Members / News
 * Centre). No legacy/wix-studio snippet has that structure sourced anywhere, and Home's own
 * current footer doesn't have it either — it's one flat link row. Building columns would mean
 * inventing which links go in which category, which is exactly what this project's sourcing
 * rule forbids. If the live site's real column structure is needed, it has to come from
 * Sunil/the live site directly, the same way the postal address conflict was resolved.
 */
// Every nav/social/email link below is a 44px-min tap target, matching HomePage.css's
// .home-footer__nav a / .home-footer__socials a / .home-footer__email — this is the same
// footer content on the ten inner routes, and it had no padding at all until this pass, so
// their real tap height was one line of text-sm (~20px).
const LINK = `inline-flex min-h-11 items-center rounded-sm text-white/80 hover:text-white ${FOCUS}`;

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
        <Link to="/" aria-label="INZBC home" className={`inline-flex min-h-11 items-center rounded-sm ${FOCUS}`}>
          <img src={ART.logo} alt="India New Zealand Business Council" className="h-8 w-auto" />
        </Link>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {/* NAV (pages.ts) already ends with About, so only Partners — which NAV doesn't
              carry — needs adding here. */}
          {NAV.map((item) => (
            <Link key={item.href} to={item.href} className={LINK}>
              {item.label}
            </Link>
          ))}
          <Link to="/partners" className={LINK}>
            Partners
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6 text-sm text-white/70">
        <p>India New Zealand Business Council / Established 1988</p>

        <nav aria-label="Social media" className="flex flex-wrap gap-x-5 gap-y-1">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center rounded-sm hover:text-white ${FOCUS}`}
            >
              {social.name}
            </a>
          ))}
        </nav>

        <a href={LINKS.email} className={`inline-flex min-h-11 items-center rounded-sm hover:text-white ${FOCUS}`}>
          Secretariat@inzbc.org
        </a>
      </div>
    </footer>
  );
}
