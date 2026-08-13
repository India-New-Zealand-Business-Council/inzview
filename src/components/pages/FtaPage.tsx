import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, WordReveal, Parallax, CountUp, ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import Footer from '@/components/inzbc/Footer';

/**
 * NZ-India FTA Centre.
 *
 * Facts are sourced from MFAT's Key Outcomes summary (linked at the bottom of the timeline)
 * and, for status/tariff figures, the Wix Studio build's fta-centre.html snippet. The FTA is
 * signed but NOT in force — that distinction is load-bearing for this page and is not to be
 * softened or restated.
 *
 * Structural choice: the "what changes" content is organised as a phase-in timeline (day one
 * through the 15-year investment horizon), not a grid of same-size cards. The facts genuinely
 * have a sequence — MFAT states different tariffs clear on different years — so the timeline
 * carries real information a card grid would flatten.
 */

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = `rounded-sm font-medium text-plum underline ${FOCUS}`;
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

type Milestone = Readonly<{ when: string; items: readonly string[] }>;

const TIMELINE: readonly Milestone[] = [
  {
    when: 'Day one',
    items: [
      "57% of New Zealand's exports become tariff-free immediately",
      'Sheep meat, wool and coal: tariff-free',
      'Over 95% of forestry exports: tariff-free',
      "Apples: New Zealand secures preferential access for the first time in any Indian FTA",
      'Kiwifruit: tariff-free access, plus a 50% cut outside quota',
      "Almost 100 services sectors opened beyond India's WTO commitments",
      'Customs clearance within 48 hours, 24 hours for perishables',
      "A Treaty of Waitangi exception protects the Crown's ability to meet its obligations to Māori",
    ],
  },
  {
    when: '5 years',
    items: ['Mānuka honey: tariffs cut 75% — a first for any country'],
  },
  {
    when: '7 years',
    items: [
      'Remaining forestry tariffs fully phased out',
      'Dairy — infant formula, dairy preparations, milk protein products: tariffs phased out',
      'Fish and seafood: tariffs phased out',
    ],
  },
  {
    when: '10 years',
    items: ['Wine: tariffs reduced 66–83%'],
  },
  {
    when: '15-year horizon',
    items: ['New Zealand commits to promoting US$20bn in private investment into India'],
  },
  {
    when: 'Ongoing, per year',
    items: [
      '1,667 three-year skilled-worker visas for Indian nationals',
      'Up to 1,000 working-holiday places',
    ],
  },
] as const;

export default function FtaPage() {
  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join', href: LINKS.join }} />

      <main>
        <section className="relative overflow-hidden bg-deep px-6 pb-24 pt-44 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
          />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-heading text-5xl leading-tight text-white md:text-7xl">
                <WordReveal text="NZ–India FTA Centre" delay={0.1} />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-xl text-white/75">
                Sourced, plain-language guidance on the New Zealand&ndash;India Free Trade
                Agreement: what changes, who it affects, and what to do next.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-12 flex justify-center">
                <Link
                  to="/fta/explainer"
                  className={`inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] ${FOCUS}`}
                >
                  Use the FTA Explainer
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* At a glance. Two large, true claims set side by side at display scale, not four
            identical boxes. Everything else on this band is a quiet single line underneath,
            so the two claims stay the loudest thing here. */}
        <section className="bg-ink px-6 py-24 text-white md:py-32">
          <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-end md:gap-8">
            <Reveal>
              <p className="font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Signed.
                <br />
                Not yet in force.
              </p>
              <p className="mt-5 max-w-sm text-white/70">
                27 April 2026. Awaiting domestic ratification in both countries before it
                takes effect.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:text-right">
              <CountUp
                value="57%"
                className="block font-heading text-8xl leading-none tracking-tight text-lime md:text-9xl"
              />
              <p className="mt-4 max-w-sm text-white/70 md:ml-auto">
                Duty-free from day one, rising to 82% over time. The remaining 13% under
                sharp cuts.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-3 border-t border-white/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-white/70">
                Sector-by-sector outcomes are below. For practical export/import guidance,
                see{' '}
                <Link
                  to="/trade-resources"
                  className={`text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}
                >
                  Trade Resources
                </Link>
                .
              </p>
              <p className="text-white/70">
                Official documents:{' '}
                <a
                  href={LINKS.mfatFta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}
                >
                  MFAT
                </a>{' '}
                &middot;{' '}
                <a
                  href={LINKS.mfatFtaText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}
                >
                  Full text
                </a>
              </p>
            </div>
          </Reveal>
        </section>

        {/* Full-bleed on purpose: the one image in the piece that breaks the container, so it
            reads as a beat in the page rather than a contained thumbnail. */}
        <section className="bg-mist py-20">
          <Reveal>
            <Parallax speed={0.12}>
              <img
                src={ART.heroBanner}
                alt="India New Zealand Business Council: connecting New Zealand and India since 1988. A container port, a New Zealand paddock and India Gate."
                loading="lazy"
                className="w-full"
              />
            </Parallax>
          </Reveal>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                How it phases in
              </h2>
              <p className="mt-4 text-lg text-foreground">
                The headline figures cover 95% of New Zealand&rsquo;s exports. What actually
                clears, and when, runs on its own schedule.
              </p>
            </Reveal>

            <div className="relative mt-16 border-l-2 border-mist pl-8 md:pl-10">
              {TIMELINE.map((milestone, index) => (
                <Reveal key={milestone.when} delay={index * 0.05} className="relative pb-14 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-lime md:-left-[calc(2.5rem+5px)]"
                  />
                  <h3 className="font-heading text-xl text-plum">{milestone.when}</h3>
                  <ul className="mt-3 space-y-2 text-foreground">
                    {milestone.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-4 text-sm text-foreground/70">
                Source: <TextLink href={LINKS.mfatKeyOutcomes}>MFAT&rsquo;s Key Outcomes summary</TextLink>.
              </p>
            </Reveal>
          </div>
        </section>

        {/* One large photo carries the moment; a smaller supporting pair sits underneath.
            Not a grid of three equal thumbnails. */}
        <section className="bg-mist pb-4 pt-24">
          <Reveal>
            <div className="relative">
              <img
                src="/events/inzbc-welcome-auckland-2026.jpeg"
                alt="INZBC Chief Executive Sunil Kaushal and delegates at the welcome for the Indian Prime Minister in Auckland"
                width={2048}
                height={1536}
                loading="lazy"
                className="max-h-[36rem] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-6 pb-6 pt-20 md:px-10">
                <p className="mx-auto max-w-5xl font-heading text-xl text-white md:text-2xl">
                  Signed face to face
                </p>
                <p className="mx-auto mt-1 max-w-5xl text-sm text-white/75">
                  Indian Prime Minister Narendra Modi&rsquo;s official visit to Auckland, July
                  2026.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mx-auto mt-4 grid max-w-5xl gap-4 px-6 pb-20 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <img
                src="/events/modi-luxon-address-auckland-2026.jpeg"
                alt="Prime Ministers Narendra Modi and Christopher Luxon addressing guests in Auckland"
                width={1600}
                height={1200}
                loading="lazy"
                className="w-full object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <img
                src="/events/modi-luxon-delegation-auckland-2026.jpeg"
                alt="Prime Ministers Narendra Modi and Christopher Luxon with the New Zealand and India delegations in Auckland"
                width={2048}
                height={1366}
                loading="lazy"
                className="w-full object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Ink panel instead of a white card, so it reads as a feature rather than a fourth
            box in a set. */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-ink sm:flex sm:items-stretch">
            <Reveal className="sm:w-1/2">
              <img
                src="/blog/inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event.png"
                alt="Vangelis Vitalis, New Zealand's Chief Trade Negotiator"
                width={856}
                height={403}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-full"
              />
            </Reveal>
            <Reveal delay={0.08} className="p-8 text-white sm:w-1/2 md:p-12">
              <h3 className="font-heading text-2xl md:text-3xl">
                Inside the NZ&ndash;India FTA, with Vangelis Vitalis
              </h3>
              <p className="mt-4 text-white/75">
                New Zealand&rsquo;s Chief Trade Negotiator, who led the negotiations, takes
                attendees behind the scenes: how the deal was negotiated, the breakthroughs,
                and what it means for Kiwi businesses. Auckland, 23 June 2026.
              </p>
              <p className="mt-6">
                <a
                  href="https://www.inzbc.org/post/inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium text-lime underline underline-offset-4 hover:text-white ${FOCUS}`}
                >
                  Read the invitation
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
