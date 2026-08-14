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
        {/* Two hero treatments share this one shell so every inner page still goes through
            InnerPage rather than growing its own bespoke hero. Pages without a heroImage get
            the original layered ambient glow (two radial gradients, matching Home's
            TradeThread/CorridorPortal depth technique). Pages with one get a real photo
            instead — min-height per breakpoint (not the image) keeps the crop box a sane
            shape at any viewport width, the same fix that FTA Centre's hero needed; flex
            centering keeps the heading centred inside whatever height that produces. */}
        <section
          className={
            page.heroImage
              ? 'relative flex min-h-[28rem] flex-col justify-end overflow-hidden bg-deep px-6 pb-16 pt-40 sm:min-h-[32rem] lg:min-h-[36rem]'
              : 'relative overflow-hidden bg-deep px-6 pb-20 pt-40'
          }
        >
          {page.heroImage ? (
            <>
              <img
                src={page.heroImage}
                alt={page.heroImageAlt ?? ''}
                aria-hidden={!page.heroImageAlt}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: page.heroImagePosition ?? '50% 50%' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-deep via-deep/80 to-ink/40"
              />
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/3 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(184,240,124,0.5), transparent)' }}
              />
            </>
          )}
          <div className="relative mx-auto max-w-4xl">
            <Reveal>
              <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                {page.title}
              </h1>
            </Reveal>
            {page.lede ? (
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-2xl text-lg text-white/75">{page.lede}</p>
              </Reveal>
            ) : null}
            {page.heroCta ? (
              <Reveal delay={0.16}>
                <a
                  href={page.heroCta.href}
                  target={page.heroCta.href.startsWith('/') ? undefined : '_blank'}
                  rel={page.heroCta.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className={`mt-8 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] ${FOCUS}`}
                >
                  {page.heroCta.label}
                </a>
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
