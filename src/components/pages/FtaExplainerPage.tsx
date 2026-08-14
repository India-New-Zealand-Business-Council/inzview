import React from 'react';
import { Reveal, ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import Footer from '@/components/inzbc/Footer';

/**
 * FTA Opportunity Explainer — Coming Soon placeholder.
 *
 * FtaPage's main CTA links here, so this route has to exist even though the real explainer
 * doesn't yet. Title, lede and review note are migrated from the legacy snippet
 * (legacy/wix-studio/src/public/wix-studio-snippets/fta-explainer.html); the snippet itself
 * says the real explainer is the deployed apps/fta/ui app, recommending an iframe or a Studio
 * custom element to embed it — that's a separate integration decision, marked [[...]] rather
 * than guessed at here. The snippet's own "Launch Explainer" button pointed at href="#", i.e.
 * it was never wired even in the Studio build, so nothing is being downgraded by this stub.
 */
export default function FtaExplainerPage() {
  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join INZBC', href: LINKS.join }} />

      <main>
        <section className="relative overflow-hidden bg-deep px-6 pb-20 pt-40 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
          />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h1 className="font-heading text-4xl leading-tight text-white md:text-6xl">
                FTA Opportunity Explainer
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg text-white/75">
                Answer a few questions about your sector and see what the New Zealand&ndash;India
                FTA means for your business.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-foreground">
                <mark className="rounded-sm bg-lime/30 px-1 underline decoration-dashed underline-offset-4">
                  [[Embed the FTA Explainer app here &mdash; the deployed apps/fta/ui instance,
                  via iframe or a Studio custom element.]]
                </mark>
              </p>
              <p className="mt-6 text-sm text-foreground/70">
                All answers cite the approved FTA corpus only. Content is human-reviewed before
                publication.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
