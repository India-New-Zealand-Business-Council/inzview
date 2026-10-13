import { Link } from 'react-router-dom';
import { ART, FOOTER_COLUMNS, FOOTER_TAGLINE, LINKS, SOCIALS } from './content';
import { Image } from '@/components/ui/image';

// One focus treatment for the whole file, matching bodies.tsx's FOCUS constant.
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

/**
 * Shared footer for every page, Home included — this is the one footer, rendered once from
 * here, not two independently-maintained copies. Home used to have its own bespoke footer
 * markup (HomePage.tsx's `<footer className="home-footer">`, styled by HomePage.css) and this
 * component covered only the ten inner routes; they'd drifted (this one had no social icons,
 * Home's had no column structure) because there was never one source of truth. Sunil asked
 * for the footer to be the same everywhere, which this now guarantees structurally rather
 * than by remembering to update both next time.
 *
 * Column structure and copy are FOOTER_COLUMNS/FOOTER_TAGLINE in content.ts, sourced from
 * inzbc.org's own live footer on Sunil's instruction (checked 14 Oct 2026) rather than the
 * single flat nav row this used to show — see that file for the link-destination mapping.
 */
const LINK = `inline-flex min-h-11 items-center rounded-sm text-white/70 hover:text-white ${FOCUS}`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-10 border-b border-white/15 pb-10">
          <div className="max-w-sm">
            <Link
              to="/"
              aria-label="INZBC home"
              className={`inline-flex items-center rounded-xl bg-white px-3 py-2 ${FOCUS}`}
            >
              <Image
                src={ART.logo}
                alt="India New Zealand Business Council"
                className="h-auto w-[clamp(185px,17vw,222px)]"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70">{FOOTER_TAGLINE}</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-5"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{column.heading}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {column.links.map((link) =>
                    'external' in link && link.external ? (
                      <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link to={link.href} className={LINK}>
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 text-sm text-white/70">
          <p>
            &copy; INZBC {year}. All rights reserved. India New Zealand Business Council / Established 1988.
          </p>

          <nav aria-label="Social media" className="flex flex-wrap items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm hover:opacity-80 ${FOCUS}`}
              >
                <Image src={social.icon} alt="" className="h-5 w-5" />
              </a>
            ))}
          </nav>

          <a href={LINKS.email} className={`inline-flex min-h-11 items-center rounded-sm hover:text-white ${FOCUS}`}>
            Secretariat@inzbc.org
          </a>
        </div>
      </div>
    </footer>
  );
}
