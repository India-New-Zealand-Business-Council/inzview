import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { Reveal, WordReveal, Parallax, CountUp, ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { Dialog } from '@/components/inzbc/Dialog';
import { INZBC_EVENTS } from '@/components/inzbc/bodies';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import Footer from '@/components/inzbc/Footer';
import { Image } from '@/components/ui/image';

/**
 * NZ-India FTA Centre.
 *
 * Facts are sourced from MFAT's Key Outcomes summary (linked at the bottom of the timeline)
 * and, for status/tariff figures, the Wix Studio build's fta-centre.html snippet. Status:
 * signed 27 April 2026, ratified 21 September 2026, in force since 20 October 2026 (MFAT).
 * Do not revive "signed, not in force".
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

/** Thumbnails are each source's own real preview image where one exists (checked via each
    page's og:image meta tag, 15 Oct 2026) — MFAT's three pages all have one of their own;
    the three NZTE articles sit behind myNZTE's member login (no public preview), so those
    use a real INZBC event photo matched to subject instead, same approach as the matching
    card grid on /trade-resources. Tariff Finder (a web app, not a content page) gets a plain
    icon card rather than force an unrelated photo onto it. */
type FtaResourceLink = Readonly<{ source: string; title: string; href: string; image?: string }>;

const FTA_RESOURCE_LINKS: readonly FtaResourceLink[] = [
  {
    source: 'MFAT',
    title: 'New Zealand–India FTA information',
    href: LINKS.mfatFta,
    image: '/blog/mfat-india-flag.jpg',
  },
  {
    source: 'MFAT',
    title: 'Full text of the agreement',
    href: LINKS.mfatFtaText,
    image: '/blog/mfat-nz-india-flags.jpg',
  },
  {
    source: 'MFAT',
    title: 'Key Outcomes summary',
    href: LINKS.mfatKeyOutcomes,
    image: '/blog/mfat-key-outcomes.jpg',
  },
  {
    source: 'NZTE',
    title: 'What the NZ–India FTA means for exporters',
    href: 'https://my.nzte.govt.nz/article/20260220-what-the-nz-india-fta-means-for-exporters',
    image: '/events/nz-india-business-delegation-delhi-2026.jpg',
  },
  {
    source: 'NZTE',
    title: 'India Market Guide',
    href: 'https://my.nzte.govt.nz/article/20260203-india-market-guide',
    image: '/events/lotus-temple-new-delhi.jpg',
  },
  {
    source: 'NZTE',
    title: 'Illuminate India programme',
    href: 'https://my.nzte.govt.nz/article/20260812-illuminate-india-programme',
    image: '/events/ficci-mou-signing-pm-luxon-mission-2026.jpg',
  },
  {
    source: 'MFAT',
    title: 'Tariff Finder',
    href: 'https://www.tariff-finder.govt.nz/',
  },
] as const;

/**
 * Sector breakdown cards. Each image is one of INZBC's own sector briefing graphics
 * (Sunil's 11 Oct 2026 Drive upload, public/sectors/) — INZBC is the primary source, so
 * nothing here is re-sourced elsewhere. The stat and blurb for each card are read directly
 * off that sector's own graphic, not estimated: every number here appears on the card's
 * image too, so a card never asserts something its own picture doesn't already show.
 */
type SectorHighlight = Readonly<{
  slug: string;
  title: string;
  stat: string;
  blurb: string;
  image: string;
  alt: string;
}>;

const SECTOR_HIGHLIGHTS: readonly SectorHighlight[] = [
  {
    slug: 'apples',
    title: 'Apples',
    stat: '50% tariff cut in quota',
    blurb: "New Zealand is the first country with preferential apple access under any Indian FTA: a 32,500 MT quota in year one, rising to 45,000 MT by year six, within a 1 April–31 August seasonal window.",
    image: '/sectors/apples.png',
    alt: 'NZ India FTA sector graphic for apples: 50% tariff cut in quota, 32,500 MT year one quota rising to 45,000 MT by year six, seasonal window 1 April to 31 August',
  },
  {
    slug: 'seafood',
    title: 'Seafood',
    stat: '33% tariffs phased out over 7 years',
    blurb: 'Greater access for New Zealand exporters to a fast-growing Indian market, covering salmon, mussels, prawns & shrimp, white fish and more.',
    image: '/sectors/seafood.png',
    alt: 'NZ India FTA sector graphic for seafood: 33% of tariffs phased out over 7 years, covering salmon, mussels, prawns and shrimp, and white fish',
  },
  {
    slug: 'skilled-workforce',
    title: 'Skilled workforce & mobility',
    stat: '1,667 three-year visas, annually',
    blurb: 'Temporary employment entry capped at 5,000 holders, professional mobility across IT, engineering, healthcare, education and construction, student mobility with no cap on numbers, and up to 1,000 working-holiday places a year.',
    image: '/sectors/skilled.png',
    alt: 'NZ India FTA sector graphic for skilled workforce and mobility: 1,667 three-year visas annually capped at 5,000 holders, plus student and working-holiday mobility',
  },
  {
    slug: 'tourism',
    title: 'Tourism',
    stat: 'Tariff elimination on day one',
    blurb: 'Opens the door to a travel market of more than 1.4 billion people, with tariffs on tourism-related services eliminated from day one and a phase-out period of up to 10 years.',
    image: '/sectors/tourism.png',
    alt: 'NZ India FTA sector graphic for tourism: tariff elimination on day one for tourism-related services, phase-out period up to 10 years, India outbound travel market of 1.4 billion people',
  },
  {
    slug: 'investment',
    title: 'Investment & innovation',
    stat: '100% tariff elimination on day one',
    blurb: 'Stronger protections for investments and intellectual property, with full tariff elimination on day one for investment-related goods and a phase-out period of up to 10 years.',
    image: '/sectors/investment.png',
    alt: 'NZ India FTA sector graphic for investment and innovation: 100% tariff elimination on day one for investment-related goods, phase-out period up to 10 years',
  },
  // Six more cards added 14 Oct 2026 from the same Drive folder as the five above — the
  // first pass only used five of the eleven graphics actually in that folder.
  {
    slug: 'technology',
    title: 'Technology & IT services',
    stat: 'Zero duty on IT services exports',
    blurb: 'Zero duty on IT services exports to a market of 1.4+ billion people, covering software development & engineering, cloud services, data analytics & AI, cybersecurity, IT consulting & support and fintech & digital solutions, with a phase-out period of up to 10 years.',
    image: '/sectors/tech.png',
    alt: 'NZ India FTA sector graphic for technology and IT services: zero duty on IT services exports, phase-out period up to 10 years, key service areas software development, cloud services, data analytics and AI, cybersecurity, IT consulting and fintech',
  },
  {
    slug: 'education',
    title: 'Education',
    stat: 'Phase-out period up to 10 years',
    blurb: 'Stronger market access for New Zealand education providers into one of the world’s fastest-growing student markets, covering higher education, vocational education and training, and online/digital delivery, with a phase-out period of up to 10 years.',
    image: '/sectors/education.png',
    alt: 'NZ India FTA sector graphic for education: phase-out period up to 10 years, covering higher education, vocational education and training, and online/digital delivery',
  },
  {
    slug: 'kiwifruit',
    title: 'Kiwifruit',
    stat: 'Duty-free in quota',
    blurb: 'Best access of any major kiwifruit exporter to India: duty-free within a 6,250 MT year-one quota, rising to 15,000 MT by year six, within a 1 April–15 October seasonal window.',
    image: '/sectors/kiwifruit.png',
    alt: 'NZ India FTA sector graphic for kiwifruit: duty-free in quota, 6,250 MT year one quota rising to 15,000 MT by year six, seasonal window 1 April to 15 October',
  },
  {
    slug: 'wine',
    title: 'Wine',
    stat: 'Tariffs reduced up to 150%',
    blurb: 'Tariffs on New Zealand wine — including Sauvignon Blanc, Pinot Noir, Chardonnay and other premium varietals — reduced significantly over time, by up to 150%, with a phase-out period of up to 10 years.',
    image: '/sectors/wine.png',
    alt: 'NZ India FTA sector graphic for wine: tariffs reduced up to 150% significantly over time, phase-out period up to 10 years, key wines Sauvignon Blanc, Pinot Noir and Chardonnay',
  },
  {
    slug: 'manuka-honey',
    title: 'Mānuka honey',
    stat: '66% to 16.5% tariff cut over 5 years',
    blurb: 'New Zealand is the first country with preferential honey access in any Indian FTA: tariffs cut from 66% to 16.5% over 5 years, within a 200 MT annual quota and a 1 April–30 June seasonal window.',
    image: '/sectors/manuka.png',
    alt: 'NZ India FTA sector graphic for Mānuka honey: 66% to 16.5% tariff cut over 5 years, 200 MT annual quota, seasonal window 1 April to 30 June',
  },
  {
    slug: 'wool',
    title: 'Wool',
    stat: '100% tariff eliminated on day one',
    blurb: 'Immediate duty-free access for New Zealand wool exporters under the NZ India FTA, with 100% tariff elimination on day one supporting price competitiveness and market access in a premium market.',
    image: '/sectors/wool.png',
    alt: 'NZ India FTA sector graphic for wool: 100% tariff eliminated on day one under the NZ India FTA',
  },
] as const;

/** One sector card — a real button, so it opens with Enter or Space for free. */
function SectorCard({
  sector,
  delay,
  onOpen,
}: {
  sector: SectorHighlight;
  delay: number;
  onOpen: (sector: SectorHighlight, trigger: HTMLButtonElement) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Reveal delay={delay}>
      <button
        ref={ref}
        type="button"
        onClick={() => ref.current && onOpen(sector, ref.current)}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-mist text-left transition-shadow hover:shadow-lg ${FOCUS}`}
      >
        <Image src={sector.image} alt={sector.alt} loading="lazy" className="aspect-square w-full object-cover" />
        <div className="flex flex-1 flex-col p-6">
          <span className="inline-flex w-fit items-center rounded-full bg-lime/25 px-3 py-1 text-xs font-semibold text-ink">
            {sector.stat}
          </span>
          <h3 className="mt-3 font-heading text-xl text-ink">{sector.title}</h3>
          <p className="mt-2 flex-1 text-sm text-foreground">{sector.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-plum">
            View the full breakdown
            <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/** The full-size sector graphic, in the same shared accessible dialog the Council bios and
    News articles use (focus trap, Esc/backdrop close, focus-return, scroll lock, reduced
    motion all come from there). */
function SectorDialog({
  sector,
  triggerEl,
  onClose,
}: {
  sector: SectorHighlight | null;
  triggerEl: HTMLButtonElement | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = sector !== null;
  const titleId = sector ? `sector-dialog-title-${sector.slug}` : undefined;

  if (!sector) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      triggerEl={triggerEl}
      titleId={titleId}
      initialFocusRef={closeButtonRef}
      widthClassName="w-[min(34rem,calc(100vw-2rem))]"
    >
      <div className="relative">
        <Image src={sector.image} alt={sector.alt} loading="lazy" className="w-full object-cover" />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white ${FOCUS}`}
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="font-heading text-2xl text-ink">
          {sector.title}
        </h2>
        <p className="mt-3 text-foreground">{sector.blurb}</p>
        <p className="mt-6 text-xs text-foreground/60">Source: INZBC sector briefing graphics.</p>
      </div>
    </Dialog>
  );
}

export default function FtaPage() {
  const [activeSector, setActiveSector] = useState<{ sector: SectorHighlight; trigger: HTMLButtonElement } | null>(null);
  const openSector = (sector: SectorHighlight, trigger: HTMLButtonElement) => setActiveSector({ sector, trigger });
  const closeSector = () => setActiveSector(null);

  // Same computation EventsBody uses: whatever is genuinely soonest, by today's real date,
  // not a post picked by hand. Empty when nothing is upcoming, same as that page.
  const todayKey = new Date().toISOString().slice(0, 10);
  const nextEvent = [...INZBC_EVENTS]
    .filter((e) => e.sortKey >= todayKey)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))[0];

  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join INZBC', href: LINKS.join }} />

      <main>
        <section
          className="relative overflow-hidden bg-deep px-6 pb-24 pt-44"
          aria-labelledby="fta-hero-title"
        >
          <Image src="/events/modi-luxon-address-auckland-2026.jpeg" alt="" aria-hidden="true" loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-deep"
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <Reveal>
              <h1 id="fta-hero-title" className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                <WordReveal text="NZ–India FTA Centre" delay={0.1} />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
                Sourced, plain-language guidance on the New Zealand&ndash;India Free Trade
                Agreement: what changes, who it affects, and what to do next.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                to="/fta/explainer"
                className={`mt-8 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] ${FOCUS}`}
              >
                Use the FTA Explainer
              </Link>
            </Reveal>
          </div>
        </section>

        {/* At a glance. Two large, true claims set side by side at display scale, not four
            identical boxes. Everything else on this band is a quiet single line underneath,
            so the two claims stay the loudest thing here. */}
        <section className="bg-ink px-6 py-24 text-white md:py-32" aria-labelledby="fta-status-title">
          <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-end md:gap-8">
            <Reveal>
              <h2
                id="fta-status-title"
                className="font-heading text-4xl leading-[1.05] tracking-tight md:text-5xl"
              >
                Signed.
                <br />
                In force from 20 October 2026.
              </h2>
              <p className="mt-5 max-w-sm text-white/70">
                Signed 27 April 2026. Ratified by both countries 21 September 2026.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:text-right">
              <CountUp
                value="57%"
                className="block font-heading text-8xl leading-none tracking-tight text-lime md:text-9xl"
              />
              <p className="mt-4 max-w-sm text-white/70 md:ml-auto">
                Of the 95% of New Zealand&rsquo;s exports to India covered by the agreement,
                57% become duty-free from day one, rising to 82% once fully implemented, with
                the remaining 13% under sharp tariff cuts.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-3 border-t border-white/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-white/70">
                Sector-by-sector outcomes are below, with fuller detail on{' '}
                <Link
                  to="/india-market-opportunities"
                  className={`text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}
                >
                  India Market Opportunities
                </Link>
                . For practical export/import guidance, see{' '}
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
            reads as a beat in the page rather than a contained thumbnail. Was ART.heroBanner,
            a composite graphic left over from the old Wix Studio build (stock port/sheep/India
            Gate circles, and it still carried a "Built on WIXVibe" watermark baked into the
            file), then briefly a Christchurch City Council photo that was real but off-topic
            for an FTA page (a separate council partnership, not the FTA). Delegation photo
            instead: closer to this band's shape than the other Modi-Luxon photos (2048x1366,
            ~3:2), and it's the actual moment the agreement's two governments stood together. */}
        <section className="bg-mist py-20">
          <Reveal>
            <Parallax speed={0.12}>
              <Image src="/events/modi-luxon-delegation-auckland-2026.jpeg" alt="Prime Ministers Narendra Modi and Christopher Luxon with the New Zealand and India delegations in Auckland" width={2048} height={1366} loading="lazy" className="w-full" />
            </Parallax>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-5xl px-6 text-sm text-foreground/60">
              Indian Prime Minister Narendra Modi&rsquo;s official visit to Auckland, July 2026
              &mdash; signed face to face, not just on paper.
            </p>
          </Reveal>
        </section>

        <section className="bg-white px-6 py-24" aria-labelledby="fta-timeline-title">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2
                id="fta-timeline-title"
                className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl"
              >
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

        {/* The timeline above covers tariffs; this covers everything else MFAT's Key Outcomes
            summary names that a tariff schedule doesn't capture — rules of origin, the
            institutional machinery, and the specific side arrangements (organic trade,
            geographical indications, the Treaty of Waitangi exception) that determine whether
            a business can actually use the tariff access above. Added 15 Oct 2026 on Sunil's
            instruction to bring this page up to the depth of MFAT's own FTA hub, not a
            rewrite of what was already there. */}
        <section className="bg-mist px-6 py-24" aria-labelledby="fta-beyond-title">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2
                id="fta-beyond-title"
                className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl"
              >
                Beyond tariffs
              </h2>
              <p className="mt-4 text-lg text-foreground">
                Preferential tariffs only apply to goods that actually qualify under the
                agreement&rsquo;s rules — and the agreement covers more than tariffs.
              </p>
            </Reveal>

            <div className="mt-12 space-y-10 border-t border-ink/10 pt-10">
              <Reveal delay={0.04}>
                <h3 className="font-heading text-xl text-plum">Rules of origin</h3>
                <p className="mt-3 text-foreground">
                  A product only qualifies for preferential tariff treatment if it is wholly
                  obtained in New Zealand or India, or meets the agreement&rsquo;s
                  product-specific rules of origin — the criteria set for each product to stop
                  goods from a third country claiming preferential access via transshipment.
                  Claiming the tariff requires correct Harmonised System classification, a
                  certificate of origin completed as the agreement prescribes, and supporting
                  invoices and shipping documents — exporters need to map their own supply
                  chain against these rules before relying on the tariff numbers above.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h3 className="font-heading text-xl text-plum">Dairy fast-track, and the TEE visa split</h3>
                <p className="mt-3 text-foreground">
                  The agreement includes a dedicated fast-track mechanism for New Zealand
                  dairy products to enter India duty-free for further manufacturing and
                  export. On people movement, the 1,667 three-year Temporary Employment Entry
                  visas a year split into 1,467 for thirteen skilled occupations on
                  Immigration New Zealand&rsquo;s Green List, and 200 reserved for specific
                  Indian occupations — yoga instructors, musicians, chefs and ayurvedic
                  practitioners. Indian students in New Zealand get a 20-hour weekly work
                  limit during study and two to four years of post-graduation work rights,
                  depending on qualification level.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <h3 className="font-heading text-xl text-plum">Organic trade, and geographical indications</h3>
                <p className="mt-3 text-foreground">
                  An Interim Organic Mutual Recognition Arrangement allows two-way trade in
                  unprocessed and processed organic horticultural products, including wine,
                  from day one — New Zealand&rsquo;s first access to India&rsquo;s market for
                  organic products on this basis. Separately, a side letter commits both
                  countries to review geographical indication protections, with a view to
                  matching the protections agreed with the EU; that review starts on
                  signature and is due within six months of entry into force.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <h3 className="font-heading text-xl text-plum">Investment, institutions and Māori interests</h3>
                <p className="mt-3 text-foreground">
                  India will establish a dedicated &ldquo;New Zealand Investment Desk&rdquo;
                  to assist New Zealand investors, alongside New Zealand&rsquo;s commitment to
                  promote US$20 billion in private investment into India over 15 years.
                  Implementation runs through new standing bodies — a Committee on Trade in
                  Goods, a Trade and Sustainable Development Committee, a Committee on
                  Economic Cooperation and Technical Assistance, an Agriculture Productivity
                  Partnership, and a Wine, Whisky and Distilled Spirits Working Group. The
                  agreement&rsquo;s Cultural chapter is to be implemented consistently with
                  the Treaty of Waitangi, with a framework to pursue Māori economic and
                  cultural aspirations specifically.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <p className="mt-10 text-sm text-foreground/70">
                Source: <TextLink href={LINKS.mfatKeyOutcomes}>MFAT&rsquo;s Key Outcomes summary</TextLink>.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-6 py-24" aria-labelledby="fta-sectors-title">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2
                id="fta-sectors-title"
                className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl"
              >
                Sector by sector
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-foreground">
                The same agreement reads differently depending on what you export. Select a
                sector for the full breakdown.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SECTOR_HIGHLIGHTS.map((sector, index) => (
                <SectorCard key={sector.slug} sector={sector} delay={index * 0.05} onOpen={openSector} />
              ))}
            </div>
          </div>

          <SectorDialog
            sector={activeSector?.sector ?? null}
            triggerEl={activeSector?.trigger ?? null}
            onClose={closeSector}
          />
        </section>

        {/* Ink panel instead of a white card, so it reads as a feature rather than a fourth
            box in a set. Driven by the same INZBC_EVENTS data the Events page uses, not a
            hand-picked post — a hardcoded "next event" goes stale the moment the real next
            event changes, which is exactly what happened to the panel this replaced (it kept
            pointing at a June briefing months after it had already happened). */}
        {nextEvent ? (
          <section className="bg-white px-6 py-24" aria-labelledby="fta-explainer-title">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-ink">
              {/* The cover file itself is 16:10 (1728x1080) — the real complete Summit
                  banner, pillarboxed to that ratio on 17 Oct 2026 so nothing in it gets
                  cropped (see news.ts). This box has to match that same ratio: it was still
                  aspect-[3/1] from when the cover was a different, wider-cropped sliver, and
                  that mismatch was cropping the new file's top and bottom off instead. */}
              {nextEvent.cover ? (
                <Image src={`/blog/${nextEvent.cover}`} alt={`Cover for ${nextEvent.title}`} loading="lazy" className="aspect-[8/5] w-full object-cover" />
              ) : null}
              <Reveal delay={0.08} className="p-8 text-white md:p-12">
                <p className="text-sm font-medium text-lime">Next INZBC event</p>
                <h2 id="fta-explainer-title" className="mt-1 font-heading text-2xl md:text-3xl">
                  {nextEvent.title}
                </h2>
                <p className="mt-4 text-white/75">
                  {nextEvent.date}
                  {nextEvent.venue ? ` · ${nextEvent.venue}` : ''}
                  {nextEvent.description ? ` — ${nextEvent.description}` : ''}
                </p>
                <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href={`https://www.inzbc.org/post/${nextEvent.sourceSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium text-lime underline underline-offset-4 hover:text-white ${FOCUS}`}
                  >
                    Read more and register
                  </a>
                  <Link
                    to="/fta/briefings"
                    className={`font-medium text-lime underline underline-offset-4 hover:text-white ${FOCUS}`}
                  >
                    See all FTA events and briefings
                  </Link>
                </p>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="bg-mist px-6 py-24" aria-labelledby="fta-resources-title">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2
                id="fta-resources-title"
                className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl"
              >
                Useful FTA resources
              </h2>
              <p className="mt-4 max-w-2xl text-foreground">
                Official guidance on the agreement itself, tariff lookups and NZTE&rsquo;s own
                India programmes — the same set INZBC points members to.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FTA_RESOURCE_LINKS.map((resource, i) => (
                <Reveal key={resource.href} delay={i * 0.05}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform hover:-translate-y-1 ${FOCUS}`}
                  >
                    {'image' in resource ? (
                      <Image src={resource.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                    ) : (
                      <span className="flex aspect-[16/9] w-full items-center justify-center bg-ink">
                        <ArrowUpRight aria-hidden="true" size={28} className="text-lime" />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col gap-1 p-5">
                      <span className="text-xs font-medium uppercase tracking-wide text-plum">{resource.source}</span>
                      <span className="font-heading text-base text-ink">{resource.title}</span>
                      <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-plum">
                        Visit
                        <ArrowUpRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
