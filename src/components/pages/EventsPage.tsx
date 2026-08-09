import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, WordReveal, ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import { MakeConnections, SummitAndMailingList } from '@/components/inzbc/Sections';

/**
 * Events.
 *
 * Hero and the upcoming-events grid are migrated from the legacy snippet
 * (legacy/wix-studio/src/public/wix-studio-snippets/events.html) — same route, same title and
 * lede as the current PAGES entry. No real event data exists yet (there is no event
 * management system wired up; see legacy/wix-studio/docs/parity-matrix.md's "Register for
 * events — gap"), so the two card slots stay [[placeholder]] rather than inventing a date,
 * venue or a fake Register link. The legacy snippet's own Register button was href="#", which
 * this project's constraints forbid, so it's text-only here until a real destination exists.
 *
 * MakeConnections and SummitAndMailingList are reused from Sections.tsx rather than
 * duplicated — both are already event content (past-event gallery, the Summit) that
 * previously only appeared on the homepage. This is the "Make Connections" and "INZBC Annual
 * Summit" gaps' actual content, just also given a home on the page that is literally about
 * events.
 */
export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join', href: LINKS.join }} />

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
                <WordReveal text="Events" delay={0.1} />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg text-white/75">
                Briefings, delegations, networking and the annual INZBC Summit &mdash; the main
                ways to engage with the NZ&ndash;India trade community.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex justify-center">
                <Link
                  to="/events/past"
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  Past events
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-heading text-2xl text-ink md:text-3xl">Upcoming events</h2>
              <p className="mt-3 max-w-2xl text-foreground">
                <mark className="rounded-sm bg-lime/30 px-1 underline decoration-dashed underline-offset-4">
                  [[Event cards: title, date, venue. Pull from Wix Events or the event
                  management system once that data source is decided.]]
                </mark>
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.06}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-plum">
                    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
                      [[Date]]
                    </mark>
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-ink">
                    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
                      [[Event title]]
                    </mark>
                  </h3>
                  <p className="mt-2 text-sm text-foreground">
                    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
                      [[Venue / format]]
                    </mark>
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-plum">
                    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
                      [[Date]]
                    </mark>
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-ink">INZBC Summit</h3>
                  <p className="mt-2 text-sm text-foreground">
                    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
                      [[Venue / format]]
                    </mark>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <MakeConnections />
        <SummitAndMailingList />
      </main>
    </div>
  );
}
