import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, WordReveal, Parallax, ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import Footer from '@/components/inzbc/Footer';

/**
 * NZ-India FTA Centre.
 *
 * Copy, structure and the sourced facts below are migrated from the Wix Studio build's
 * fta-centre.html snippet (legacy/wix-studio/src/public/wix-studio-snippets/fta-centre.html),
 * not rewritten. That snippet carries its own warning, preserved here: the FTA is signed but
 * NOT in force, and the Status card's wording is deliberate, not to be softened or restated.
 *
 * Own page component rather than the generic InnerPage shell, so it can use Parallax for the
 * banner and WordReveal for the headline the way the rest of the app's inner content does not
 * yet, plus the four-card status grid the legacy snippet defines.
 */

/** Matches TextLink's convention in bodies.tsx: text-plum underline, same focus ring. */
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

function Card({
  title,
  children,
  delay = 0,
  accent = false,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`h-full rounded-2xl p-8 md:p-10 ${
          accent ? 'bg-ink text-white' : 'bg-mist text-foreground'
        }`}
      >
        <h3 className={`font-heading text-2xl ${accent ? 'text-white' : 'text-ink'}`}>{title}</h3>
        <p className={`mt-4 text-lg leading-relaxed ${accent ? 'text-white/80' : 'text-foreground'}`}>
          {children}
        </p>
      </div>
    </Reveal>
  );
}

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
                  className="inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  Use the FTA Explainer
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              {/* speed 0.18 matches the legacy snippet's data-p="0.18" on this same banner. */}
              <Parallax speed={0.18}>
                <img
                  src={ART.heroBanner}
                  alt="India New Zealand Business Council: connecting New Zealand and India since 1988. A container port, a New Zealand paddock and India Gate."
                  loading="lazy"
                  className="w-full rounded-2xl shadow-xl"
                />
              </Parallax>
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-8">
            {/* Do not reword this card: the legacy snippet is explicit that the agreement is
                signed but not yet in force, and this is the one place the site states that.
                Inverted fill (not a border accent, which reads as generated-UI boilerplate)
                gives it visual priority over the other three without touching the wording. */}
            <Card title="Status" accent>
              Signed 27 April 2026. Awaiting domestic ratification before it enters into force.
            </Card>
            <Card title="Key tariff outcomes" delay={0.06}>
              57% duty-free from day one, rising to 82% once fully implemented, with the
              remaining 13% under sharp cuts.
            </Card>
            <Card title="Sector briefings" delay={0.12}>
              Sector-by-sector outcomes are below. For practical export/import guidance, see{' '}
              <TextLink href="/trade-resources">Trade Resources</TextLink>.
            </Card>
            <Card title="Official documents" delay={0.18}>
              MFAT&rsquo;s official page for the agreement, including its status while it
              awaits ratification: <TextLink href={LINKS.mfatFta}>MFAT: NZ&ndash;India FTA</TextLink>.
              Full legal text: <TextLink href={LINKS.mfatFtaText}>Text of the agreement</TextLink>.
            </Card>
          </div>
        </section>

        <section className="bg-mist px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                What the agreement changes
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-foreground">
                The headline figures cover 95% of New Zealand&rsquo;s exports. Sector by
                sector, the outcomes are more specific.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-xl text-ink">Goods &amp; tariffs</h3>
                  <ul className="mt-4 space-y-3 text-foreground">
                    <li>
                      Apples: New Zealand is the first country to secure preferential access
                      in any Indian FTA.
                    </li>
                    <li>Mānuka honey: tariffs cut 75% over five years, again a first.</li>
                    <li>Wine: tariffs reduced 66&ndash;83% over ten years.</li>
                    <li>Kiwifruit: tariff-free access, plus a 50% reduction outside quota.</li>
                    <li>
                      Forestry: over 95% of exports tariff-free immediately, the rest phased
                      out over seven years.
                    </li>
                    <li>Dairy, fish and seafood: tariffs phased out over seven years.</li>
                    <li>Sheep meat, wool and coal: tariff-free immediately.</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-xl text-ink">Services &amp; people</h3>
                  <ul className="mt-4 space-y-3 text-foreground">
                    <li>
                      India opened almost 100 services sectors beyond its existing WTO
                      commitments.
                    </li>
                    <li>1,667 three-year skilled-worker visas per year for Indian nationals.</li>
                    <li>Up to 1,000 working-holiday places per year.</li>
                    <li>
                      New Zealand committed to promoting US$20bn in private investment into
                      India over 15 years.
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-xl text-ink">
                    Trade facilitation &amp; safeguards
                  </h3>
                  <ul className="mt-4 space-y-3 text-foreground">
                    <li>Customs clearance within 48 hours, 24 hours for perishables.</li>
                    <li>
                      A Treaty of Waitangi exception protects the Crown&rsquo;s ability to meet
                      its obligations to Māori.
                    </li>
                    <li>
                      Services and wine gains carry a most-favoured-nation clause: better
                      terms India gives other FTA partners pass through automatically.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 text-sm text-foreground/70">
                Source: <TextLink href={LINKS.mfatKeyOutcomes}>MFAT&rsquo;s Key Outcomes summary</TextLink>.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Signed face to face
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-foreground">
                Indian Prime Minister Narendra Modi&rsquo;s official visit to Auckland, July
                2026 &mdash; the setting for the agreement INZBC has spent years working
                toward.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05} className="sm:row-span-2">
                <img
                  src="/events/inzbc-welcome-auckland-2026.jpeg"
                  alt="INZBC Chief Executive Sunil Kaushal and delegates at the welcome for the Indian Prime Minister in Auckland"
                  width={2048}
                  height={1536}
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <img
                  src="/events/modi-luxon-address-auckland-2026.jpeg"
                  alt="Prime Ministers Narendra Modi and Christopher Luxon addressing guests in Auckland"
                  width={1600}
                  height={1200}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover"
                />
              </Reveal>
              <Reveal delay={0.15}>
                <img
                  src="/events/modi-luxon-delegation-auckland-2026.jpeg"
                  alt="Prime Ministers Narendra Modi and Christopher Luxon with the New Zealand and India delegations in Auckland"
                  width={2048}
                  height={1366}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-mist px-6 py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm sm:flex sm:items-center">
            <Reveal className="sm:w-2/5">
              <img
                src="/blog/inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event.png"
                alt="Vangelis Vitalis, New Zealand's Chief Trade Negotiator"
                width={856}
                height={403}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Reveal>
            <Reveal delay={0.08} className="p-8 sm:w-3/5 md:p-10">
              <span className="text-sm font-medium uppercase tracking-wide text-plum">
                Hear it explained
              </span>
              <h3 className="mt-2 font-heading text-2xl text-ink">
                Inside the NZ&ndash;India FTA, with Vangelis Vitalis
              </h3>
              <p className="mt-3 text-foreground">
                New Zealand&rsquo;s Chief Trade Negotiator, who led the negotiations, takes
                attendees behind the scenes: how the deal was negotiated, the breakthroughs,
                and what it means for Kiwi businesses. Auckland, 23 June 2026.
              </p>
              <p className="mt-4">
                <TextLink href="https://www.inzbc.org/post/inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event">
                  Read the invitation
                </TextLink>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
