import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, ScrollProgress, StickyHeader } from './motion';
import { ART, LINKS } from './content';
import { NAV, type PageDef } from './pages';
import { BODIES } from './bodies';
import Footer from './Footer';

/**
 * Every destination other than the homepage.
 *
 * The title and lede are real, INZBC-reviewed copy carried over from the Studio build. The
 * body is not written yet, and rather than fill it the page says so: an obviously unfinished
 * page is honest, whereas plausible filler would read as content nobody has checked.
 */
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

export default function InnerPage({ page }: { page: PageDef }) {
  const Body = BODIES[page.path];
  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join', href: LINKS.join }} />

      <main>
        <section className="relative overflow-hidden bg-deep px-6 pb-20 pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
          />
          <div className="relative mx-auto max-w-4xl">
            <Reveal>
              <h1 className="font-heading text-4xl leading-tight text-white md:text-6xl">
                {page.title}
              </h1>
            </Reveal>
            {page.lede ? (
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-2xl text-lg text-white/75">{page.lede}</p>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* The migrated body, where one exists. Pages without one say so rather than
            showing an empty band, so an unfinished page is obvious instead of looking
            like a page that simply has nothing on it. */}
        {Body ? (
          <Body />
        ) : (
          <section className="bg-mist px-6 py-20">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <p className="text-foreground">
                  <mark className="rounded-sm bg-lime/30 px-1 underline decoration-dashed underline-offset-4">
                    [[Page body still to be migrated from the Studio build &mdash; the sourced
                    copy exists at legacy/wix-studio/src/public/wix-studio-snippets.]]
                  </mark>
                </p>
                <Link
                  to="/"
                  className={`mt-10 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] ${FOCUS}`}
                >
                  Back to the homepage
                </Link>
              </Reveal>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
