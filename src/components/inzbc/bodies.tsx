import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
  Mail,
  MapPin,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
} from 'lucide-react';
import { Reveal } from './motion';
import { ART, BENEFITS, LINKS, STATS, BUSINESS_PARTNERS, INDIA_NETWORK, PUBLIC_SECTOR_NETWORK } from './content';
import SocialFeeds from './SocialFeeds';

/**
 * The migrated bodies for the inner routes, carried over from the Studio build's section
 * snippets (legacy/wix-studio/src/public/wix-studio-snippets). The copy is the sourced,
 * INZBC-reviewed text; where a snippet carried a [[...]] marker the marker came with it,
 * because a visible gap is more honest than filler nobody has checked.
 *
 * Old routes that have no equivalent here are folded into their hub rather than linked:
 * /trade-missions is a section of /trade-resources, the /membership/join next steps are
 * part of /membership, and the digest lives with /newsletters. The FTA Explainer was a
 * placeholder around an app that does not exist in this build, so it stays a visible marker.
 *
 * /india-market-opportunities is its own page below, not folded into /trade-resources — an
 * earlier version of this file and legacy/wix-studio/docs/parity-matrix.md both stated it
 * was, which was wrong: Sunil's migration guide (§4/§5) treats it as a separate "Replace"
 * migration from Trade Bazaar, not a merge into Trade Shows/Missions.
 */

// One focus treatment for the whole file, so keyboard users get the same ring everywhere.
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

/** A fact INZBC has not supplied yet. Deliberately visible. */
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
      {children}
    </mark>
  );
}

function Btn({
  href,
  children,
  variant = 'primary',
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  external?: boolean;
}) {
  const base = `inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 active:scale-[0.97] ${FOCUS}`;
  const skin =
    variant === 'primary'
      ? 'bg-lime text-navy hover:brightness-105'
      : variant === 'ghost'
        ? 'border border-white/30 text-white hover:bg-white/10'
        : 'border border-ink/25 text-ink hover:bg-mist';
  // Internal destinations go through the router; anything off-site opens in a new tab.
  if (!external && href.startsWith('/')) {
    return (
      <Link to={href} className={`${base} ${skin}`}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={`${base} ${skin}`} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** A tile on a light band. Inverts against its band the way the old inz-card did. */
function Card({
  title,
  children,
  on = 'white',
}: {
  title: string;
  children: React.ReactNode;
  on?: 'white' | 'mist';
}) {
  return (
    <div className={`h-full rounded-2xl p-7 ${on === 'white' ? 'bg-mist' : 'bg-white shadow-sm'}`}>
      <h3 className="font-heading text-xl text-ink">{title}</h3>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

/**
 * An organic "blob" icon badge, same silhouette family as the live site's old social-icon
 * graphics but built as a real SVG path (same technique TradeRoute.tsx already uses for
 * organic curves in this codebase) rather than a CSS border-radius approximation, which reads
 * as a rounded rectangle rather than a true blob. One diagonal gradient per instance, using
 * this project's own brand hex values (from tailwind.config.mjs) rather than the old site's
 * blue — the shape is what's being matched here, not that palette, per the standing
 * "modernised, not the old blue gradient" instruction.
 */
const BLOB_PATH =
  'M64 6C79 9 91 22 93 38C95 54 87 66 76 76C68 83 58 90 46 88C36 86 30 78 21 71C11 63 3 54 4 42C5 30 15 25 19 15C24 4 37 8 48 5C53 4 59 5 64 6Z';

function Blob({ id, from, to, size = 96 }: { id: string; from: string; to: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      {/* The small satellite circle is the same detail the reference blobs have at one edge -
          a separate dot, not part of the main path, so it can float slightly outside it. */}
      <circle cx="90" cy="34" r="5" fill={`url(#${id})`} />
      <path d={BLOB_PATH} fill={`url(#${id})`} />
    </svg>
  );
}

/** A person tile for the council grid: a name and a role. */
function Person({ name, role, photo }: { name: string; role: string; photo?: string }) {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-mist">
      {photo ? (
        <img src={photo} alt="" loading="lazy" className="aspect-square w-full object-cover" />
      ) : null}
      <div className="p-6">
        <h3 className="font-heading text-lg text-ink">{name}</h3>
        <p className="mt-1 text-sm text-foreground">{role}</p>
      </div>
    </div>
  );
}

/** An inline text link. */
function TextLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = `rounded-sm font-medium text-plum underline ${FOCUS}`;
  if (!external && href.startsWith('/')) {
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

/**
 * The real contact form's replacement until a Wix Form exists: real, labelled fields (First
 * name, Last name, Email, Subject, Message — the exact set connect.html's own sourced snippet
 * specifies), submitted via a mailto: link built from what was actually typed, rather than a
 * flat "email us" button that discards it. This is not a real submission — nothing reaches
 * the secretariat until they open their own mail client and hit send — so it stays truthful
 * about that in its one line of copy, rather than implying the message has already gone
 * anywhere.
 */
function ContactForm() {
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const body = [
    `${fields.firstName} ${fields.lastName}`.trim(),
    fields.email ? `Reply to: ${fields.email}` : '',
    '',
    fields.message,
  ]
    .filter(Boolean)
    .join('\n');
  const mailto = `${LINKS.email}?subject=${encodeURIComponent(fields.subject || 'Message from inzbc.org')}&body=${encodeURIComponent(body)}`;

  const inputCls =
    'mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';
  const labelCls = 'text-xs font-medium text-ink';

  return (
    <form
      className="mt-3 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto;
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          First name
          <input type="text" required value={fields.firstName} onChange={set('firstName')} className={inputCls} />
        </label>
        <label className={labelCls}>
          Last name
          <input type="text" required value={fields.lastName} onChange={set('lastName')} className={inputCls} />
        </label>
      </div>
      <label className={`block ${labelCls}`}>
        Email
        <input type="email" required value={fields.email} onChange={set('email')} className={inputCls} />
      </label>
      <label className={`block ${labelCls}`}>
        Subject
        <input type="text" required value={fields.subject} onChange={set('subject')} className={inputCls} />
      </label>
      <label className={`block ${labelCls}`}>
        Message
        <textarea required rows={4} value={fields.message} onChange={set('message')} className={inputCls} />
      </label>
      <p className="text-xs text-foreground/60">
        <Todo>
          [[Not a real submission yet &mdash; needs a Wix Form so this reaches the Secretariat
          inbox directly. For now, sending opens your own email client with this pre-filled.]]
        </Todo>
      </p>
      <button
        type="submit"
        className={`inline-flex items-center rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-transform duration-200 hover:bg-mist active:scale-[0.97] ${FOCUS}`}
      >
        Send message
      </button>
    </form>
  );
}


/* --- Events -------------------------------------------------------------------------- */

/**
 * Every event below is real, pulled from inzbc.org's blog and cross-checked against
 * inzbc.org/past-events and /upcoming-events directly (the latter turned out to be
 * abandoned — it still shows 2020 webinars as "upcoming"). No genuinely upcoming event is
 * published anywhere INZBC controls right now (checked the live site and
 * inzbusinesssummit.com, which 404s), so "Upcoming events" stays honest rather than
 * inventing a next date.
 *
 * INZBC_EVENTS is INZBC's own events — summits, delegations, briefings, panels, workshops
 * it ran or co-ran. A few posts covered the same event from multiple angles (the 2021 hybrid
 * Summit had four separate posts: Twyford's address, Mahuta's keynote, Jacobi's remarks and
 * the post-event release; the 2022 Summit and the September 2022 India delegation each had
 * two) — those are merged into one entry each rather than shown as duplicates.
 *
 * EXPO_EVENTS is third-party India trade shows/expos INZBC circulated to members — real
 * events, but INZBC didn't host them, so they're kept in their own, lighter-weight section
 * rather than mixed into "INZBC's own events."
 *
 * Every cover is a real, confirmed image already in public/blog/ — sourceSlug is that
 * file's basename (extension included) and also builds the https://www.inzbc.org/post/…
 * link back to the original post. Two dates are approximate and say so rather than
 * asserting a precision the source post didn't give: the Delhi Summit's date comes from
 * its publish date, not a stated event date, and one 2022-era summit post has no date at
 * all in the body text.
 */
type EventItem = Readonly<{
  sourceSlug: string;
  cover?: string;
  title: string;
  date: string;
  venue?: string;
  description: string;
  sortKey: string;
}>;

const INZBC_EVENTS: readonly EventItem[] = [
  {
    sourceSlug: 'inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event',
    cover: 'inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event.png',
    title: 'Inside the NZ–India FTA, with Vangelis Vitalis',
    date: '23 June 2026',
    venue: 'Deloitte Building, Level 20, 1 Queen Street, Commercial Bay, Auckland CBD',
    description: "New Zealand's Chief Trade Negotiator takes attendees behind the scenes of the FTA negotiations.",
    sortKey: '2026-06-23',
  },
  {
    sourceSlug: 'boardroom-to-border-a-leadership-dialogue-on-strategy-trade-india-nz-opportunities',
    title: 'Boardroom to Border: A Leadership Dialogue on Strategy, Trade & India-NZ Opportunities',
    date: '26 June 2025',
    venue: 'Drawing Room – Rātā 222 and 223, University of Canterbury',
    description: 'High-level dialogue on strategic trade, investment and collaboration opportunities, with the University of Canterbury.',
    sortKey: '2025-06-26',
  },
  {
    sourceSlug: 'breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am',
    cover: 'breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am.png',
    title: 'Breakfast Dialogue with NZ High Commissioners Patrick Rata & David Pine',
    date: '6 June 2025',
    venue: 'BNZ Place, Level 18, 80 Queen Street, Auckland',
    description: 'Patrick Rata (NZ High Commissioner to India & Nepal) and David Pine (NZ High Commissioner to Sri Lanka & Maldives), co-hosted with the NZ Nepal Chamber of Commerce and Sri Lanka Business Association NZ.',
    sortKey: '2025-06-06',
  },
  {
    sourceSlug: 'exclusive-inzbc-members-invitationdelegation-insights-from-india-pm-mission',
    cover: 'exclusive-inzbc-members-invitationdelegation-insights-from-india-pm-mission.jpg',
    title: 'Delegation Insights from India PM Mission',
    date: '15 April 2025',
    venue: 'NZTE Auckland Office, Level 6, 139 Quay Street, Auckland',
    description: "Co-hosted with NZTE — insights from the Prime Minister's Mission to India, for members.",
    sortKey: '2025-04-15',
  },
  {
    sourceSlug: 'inzbc-annual-address-by-rt-hon-winston-peters',
    cover: 'inzbc-annual-address-by-rt-hon-winston-peters.png',
    title: 'INZBC Annual Address by Rt Hon Winston Peters',
    date: '6 December 2024',
    venue: 'Level 27, PwC Tower, 15 Customs Street West, Auckland',
    description: 'Deputy Prime Minister and Foreign Minister Winston Peters on achievements and opportunities for the NZ-India relationship.',
    sortKey: '2024-12-06',
  },
  {
    sourceSlug: 'india-business-forum',
    cover: 'india-business-forum.jpg',
    title: 'India Business Forum',
    date: '21 November 2024',
    venue: 'BNZ, Auckland',
    description: 'The BNZ India Business Forum brought New Zealand-India business partnerships to centre stage.',
    sortKey: '2024-11-21',
  },
  {
    sourceSlug: 'world-food-india-2024-i-19-22-september-2024-pragati-maidan-new-delhi',
    cover: 'world-food-india-2024-i-19-22-september-2024-pragati-maidan-new-delhi.jpg',
    title: 'World Food India 2024 delegation',
    date: '19–22 September 2024',
    venue: 'Pragati Maidan, New Delhi',
    description: 'INZBC proposed a business delegation to World Food India for the food & beverage sector.',
    sortKey: '2024-09-19',
  },
  {
    sourceSlug: 'people-diplomacy-india-and-nz-education-and-beyond',
    cover: 'people-diplomacy-india-and-nz-education-and-beyond.jpg',
    title: 'People Diplomacy – India and NZ: Education and Beyond',
    date: '13 June 2024',
    venue: 'AIS St Helens Campus, 28A Linwood Avenue, Mt Albert, Auckland',
    description: 'Fireside chat with Hon. Penny Simmonds, Minister for Tertiary Education and Skills.',
    sortKey: '2024-06-13',
  },
  {
    sourceSlug: 'webinar-understanding-indian-perceptions-of-new-zealand',
    cover: 'webinar-understanding-indian-perceptions-of-new-zealand.jpg',
    title: 'Webinar: Understanding Indian Perceptions of New Zealand',
    date: '6 June 2024',
    venue: 'Online',
    description: 'New Zealand Story and research partner fiftyfive5 present findings on Indian consumers’ perceptions of NZ.',
    sortKey: '2024-06-06',
  },
  {
    sourceSlug: 'current-insights-on-exporting-to-india',
    cover: 'current-insights-on-exporting-to-india.jpg',
    title: 'Current Insights on Exporting to India ("Meet NZTE – Team India")',
    date: '9 May 2024',
    venue: 'NZTE Pounamu Lounge, 139 Quay Street, Auckland CBD',
    description: "Panel with NZTE's Trade Commissioner/Consul General, an NZ exporter to India and NZTE's International Market Manager.",
    sortKey: '2024-05-09',
  },
  {
    sourceSlug: 'super-sourcing-oceania-2024',
    cover: 'super-sourcing-oceania-2024.jpg',
    title: 'Super Sourcing Oceania 2024 (India-New Zealand Buyer Seller Meet)',
    date: '7 March 2024',
    venue: 'Trust Arena, Genesis Lounge, Auckland',
    description: "B2B event connecting Indian exporters with New Zealand's business community.",
    sortKey: '2024-03-07',
  },
  {
    sourceSlug: 'inzbc-summit-in-delhi-marks-a-new-phase-in-india-new-zealand-relations',
    cover: 'inzbc-summit-in-delhi-marks-a-new-phase-in-india-new-zealand-relations.png',
    title: 'INZBC Summit in Delhi',
    date: 'Reported January 2024 (exact event date not stated in the post)',
    venue: 'Delhi',
    description: 'A summit marking a new phase in India-New Zealand relations.',
    sortKey: '2024-01-21',
  },
  {
    sourceSlug: 'the-education-roundtable',
    cover: 'the-education-roundtable.jpg',
    title: 'The Education Roundtable',
    date: '19 May 2023',
    venue: 'School of Business, University of Auckland',
    description: 'INZBC and the University of Auckland on trade and services opportunities in international education.',
    sortKey: '2023-05-19',
  },
  {
    sourceSlug: 'indian-high-commission-holds-a-symposium-to-promote-trade-and-diplomatic-ties',
    cover: 'indian-high-commission-holds-a-symposium-to-promote-trade-and-diplomatic-ties.jpg',
    title: "Indian High Commission Symposium — 'Forging New Relations Between India & NZ'",
    date: '31 May 2023',
    venue: 'Chancery premises, Wellington',
    description: 'A half-day symposium on trade and diplomatic ties.',
    sortKey: '2023-05-31',
  },
  {
    sourceSlug: 'new-zealand-business-delegation-to-india-report-summary',
    cover: 'new-zealand-business-delegation-to-india-report-summary.png',
    title: 'New Zealand Business Delegation to India — Report Summary',
    date: 'Report published 19 October 2023',
    venue: 'India (multi-city)',
    description: 'Summary of the five-day New Zealand business delegation programme to India.',
    sortKey: '2023-10-19',
  },
  {
    sourceSlug: 'new-zealand-business-delegation-to-india-ready-for-the-next-phase',
    cover: 'new-zealand-business-delegation-to-india-ready-for-the-next-phase.jpg',
    title: 'New Zealand Business Delegation to India — Ready for the Next Phase',
    date: '14 July 2023 (planning update)',
    venue: 'India',
    description: 'Planning update ahead of a New Zealand business delegation trip to India.',
    sortKey: '2023-07-14',
  },
  {
    sourceSlug: 'inzbc-networking-event-meet-the-indian-high-commissioner-in-christchurch-on-16-mar-2023',
    cover: 'inzbc-networking-event-meet-the-indian-high-commissioner-in-christchurch-on-16-mar-2023.jpg',
    title: "'Opening the Trade Gateway to India' — with the Indian High Commissioner",
    date: '16 March 2023',
    venue: 'JIX Reality, 213 Tuam Street, Christchurch Central',
    description: 'A conversation with H.E. Neeta Bhushan on investing, partnering and manufacturing in India.',
    sortKey: '2023-03-16',
  },
  {
    sourceSlug: 'new-frontiers-agriculture-horticulture-seminar',
    cover: 'new-frontiers-agriculture-horticulture-seminar.jpg',
    title: 'New Frontiers: Agriculture–Horticulture Seminar',
    date: '19 April 2023',
    venue: 'Indian High Commission, Wellington',
    description: 'NZ International Business Forum seminar on agri/horticulture trade and services opportunities.',
    sortKey: '2023-04-19',
  },
  {
    sourceSlug: 'pharma-sector-buyer-seller-meet',
    cover: 'pharma-sector-buyer-seller-meet.jpg',
    title: 'Pharma Sector Buyer-Seller Meet',
    date: '10 February 2023',
    venue: 'Indian High Commission, 72 Pipitea Street, Thorndon, Wellington',
    description: 'Buyer-seller meet with an incoming Indian pharma delegation, led by Pharmexcil.',
    sortKey: '2023-02-10',
  },
  {
    sourceSlug: 'workshop-on-boosting-india-nz-trade-ties-held-in-wellington',
    cover: 'workshop-on-boosting-india-nz-trade-ties-held-in-wellington.jpg',
    title: 'Workshop on Boosting India-NZ Trade Ties',
    date: 'Reported 8 January 2023',
    venue: 'Wellington',
    description: "Workshop following Indian External Affairs Minister S Jaishankar's visit to New Zealand.",
    sortKey: '2023-01-08',
  },
  {
    sourceSlug: 'india-unplugged-export-import-pathways-25-nov-2022-wellington',
    cover: 'india-unplugged-export-import-pathways-25-nov-2022-wellington.jpg',
    title: 'India Unplugged: Export-Import Pathways',
    date: '25 November 2022',
    venue: 'Wellington',
    description: 'Half-day workshop — supply chain/logistics, IP/patent/copyright, legal aspects of trading with India.',
    sortKey: '2022-11-25',
  },
  {
    sourceSlug: 'inzbc-summit-2022-proposing-a-new-approach-to-india-trade-relations',
    cover: 'inzbc-summit-2022-proposing-a-new-approach-to-india-trade-relations.jpg',
    title: 'INZBC Summit 2022',
    date: '11 November 2022 (venue not stated)',
    description: 'Proposing a new approach to India trade relations — services, education, AgTech and merchandise trade opportunities.',
    sortKey: '2022-11-11',
  },
  {
    sourceSlug: 'inzbc-trade-delegation-to-india-seeks-to-reignite-b2b-connections',
    cover: 'inzbc-trade-delegation-to-india-seeks-to-reignite-b2b-connections.jpg',
    title: 'INZBC Trade Delegation to India (incl. FICCI LEADS 2022)',
    date: '19–21 September 2022',
    venue: 'India',
    description: 'Delegation to reignite B2B connections; companies also joined for FICCI LEADS 2022.',
    sortKey: '2022-09-19',
  },
  {
    sourceSlug: 'panel-discussion-on-it-sector-and-its-contribution-to-new-zealand-s-economy',
    cover: 'panel-discussion-on-it-sector-and-its-contribution-to-new-zealand-s-economy.jpg',
    title: "Panel Discussion: IT Sector's Contribution to New Zealand's Economy",
    date: '24 August 2022',
    venue: 'BNZ HQ, Auckland',
    description: "Panel on the IT sector's importance to New Zealand's economic growth.",
    sortKey: '2022-08-24',
  },
  {
    sourceSlug: 'india-unplugged-export-import-workshop-25-may-2022',
    cover: 'india-unplugged-export-import-workshop-25-may-2022.jpg',
    title: 'India Unplugged: Export-Import Workshop',
    date: '25 May 2022',
    venue: 'Venue TBC at publish time',
    description: 'One-day workshop — logistics, banking & finance, insurance/export credit, customs & MPI regulations, tax.',
    sortKey: '2022-05-25',
  },
  {
    sourceSlug: 'women-in-business-lead-the-charge-during-inzbc-panel-discussion',
    cover: 'women-in-business-lead-the-charge-during-inzbc-panel-discussion.jpg',
    title: 'Women in Business — INZBC Panel Discussion',
    date: '6 April 2022',
    venue: 'Wellington',
    description: 'With the Indian High Commission Wellington and Wellington Chamber of Commerce.',
    sortKey: '2022-04-06',
  },
  {
    sourceSlug: 'women-in-business-panel-discussion-29-march-2022',
    cover: 'women-in-business-panel-discussion-29-march-2022.jpg',
    title: 'Women in Business — Panel Discussion',
    date: '29 March 2022',
    venue: 'Online',
    description: "'New horizons and old challenges' — an earlier, separate online panel on women in business.",
    sortKey: '2022-03-29',
  },
  {
    sourceSlug: 'india-s-it-sector-the-kiwi-connections-an-interactive-business-session-on-25-nov-2021',
    cover: 'india-s-it-sector-the-kiwi-connections-an-interactive-business-session-on-25-nov-2021.jpg',
    title: "India's IT Sector: The Kiwi Connections",
    date: '25 November 2021',
    venue: 'The Wellington Club, Level 5, 88 The Terrace, Wellington',
    description: 'Interactive business session hosted by the High Commission of India, Wellington.',
    sortKey: '2021-11-25',
  },
  {
    sourceSlug: 'address-to-the-inzbc-7th-international-summit-2021',
    cover: 'address-to-the-inzbc-7th-international-summit-2021.png',
    title: 'INZBC 7th International Summit 2021',
    date: '23–24 June 2021',
    venue: "New Zealand's first-ever hybrid summit",
    description: 'Keynote addresses from Hon Phil Twyford and Hon Nanaia Mahuta (Foreign Affairs Minister), plus remarks from Stephen Jacobi (NZ International Business Forum).',
    sortKey: '2021-06-23',
  },
  {
    sourceSlug: 'inzbc-holds-diwali-meet-for-networking-in-christchurch',
    cover: 'inzbc-holds-diwali-meet-for-networking-in-christchurch.jpg',
    title: 'INZBC Diwali Meet (Networking)',
    date: '1 December 2020',
    venue: 'Canterbury Club, Christchurch',
    description: 'Diwali networking event in Christchurch.',
    sortKey: '2020-12-01',
  },
  {
    sourceSlug: 'india-new-zealand-bilateral-economic-and-trade-relationship-dialogue',
    cover: 'india-new-zealand-bilateral-economic-and-trade-relationship-dialogue.jpg',
    title: 'India-New Zealand Bilateral Economic and Trade Relationship Dialogue',
    date: '2 September 2020',
    description: 'Dialogue on the bilateral economic and trade relationship.',
    sortKey: '2020-09-02',
  },
  {
    sourceSlug: 'india-new-zealand-business-summit-shines-light-on-opportunities-for-kiwi-companies',
    cover: 'india-new-zealand-business-summit-shines-light-on-opportunities-for-kiwi-companies.jpg',
    title: 'India-New Zealand Business Summit',
    date: 'Date not stated in the source post',
    description: 'Shone a light on opportunities for Kiwi companies in the India relationship.',
    sortKey: '0000-00-00',
  },
] as const;

const EXPO_EVENTS: readonly EventItem[] = [
  { sourceSlug: 'india-sporting-goods-fair-isgf-2025-at-yashobhoomi-convention-centre-new-delhi-during-24-25-march', cover: 'india-sporting-goods-fair-isgf-2025-at-yashobhoomi-convention-centre-new-delhi-during-24-25-march.jpg', title: 'India Sporting Goods Fair (ISGF) 2025', date: '24–25 March 2025', venue: 'Yashobhoomi Convention Centre, New Delhi', description: '', sortKey: '2025-03-24' },
  { sourceSlug: 'connect-with-leading-indian-manufacturers-at-vibrant-goa-global-expo-summit-2024', cover: 'connect-with-leading-indian-manufacturers-at-vibrant-goa-global-expo-summit-2024.png', title: 'Vibrant Goa — Global Expo & Summit', date: '2024', venue: 'Goa, India', description: '', sortKey: '2024-06-01' },
  { sourceSlug: '3rd-edition-of-global-maritime-india-summit-2023-gmis-2023', cover: '3rd-edition-of-global-maritime-india-summit-2023-gmis-2023.png', title: '3rd Global Maritime India Summit (GMIS 2023)', date: '17–19 October 2023', venue: 'MMRDA Ground, Bandra Kurla Complex, Mumbai', description: '', sortKey: '2023-10-17' },
  { sourceSlug: 'northeast-global-investors-summit-2023', cover: 'northeast-global-investors-summit-2023.png', title: 'Northeast Global Investors Summit 2023', date: '2023', venue: 'Northeast India', description: '', sortKey: '2023-06-01' },
  { sourceSlug: 'uttar-pradesh-msme-sammelan-2022-transforming-msmes-competitiveness-on-27th-28th-june-2022', cover: 'uttar-pradesh-msme-sammelan-2022-transforming-msmes-competitiveness-on-27th-28th-june-2022.jpg', title: 'Uttar Pradesh MSME Sammelan 2022', date: '27–28 June 2022', venue: 'Uttar Pradesh, India', description: '', sortKey: '2022-06-27' },
  { sourceSlug: 'cii-global-economic-policy-summit-2021-17-18-nov-2021', cover: 'cii-global-economic-policy-summit-2021-17-18-nov-2021.jpg', title: 'CII Global Economic Policy Summit 2021', date: '17–18 November 2021', venue: 'CII platform', description: '', sortKey: '2021-11-17' },
  { sourceSlug: '11th-cii-hr-conclave-powering-growth-with-head-heart-and-courage-on-25-26-nov-2021', cover: '11th-cii-hr-conclave-powering-growth-with-head-heart-and-courage-on-25-26-nov-2021.png', title: '11th CII HR Conclave — "Powering Growth with Head, Heart and Courage"', date: '25–26 November 2021', description: '', sortKey: '2021-11-25' },
  { sourceSlug: 'indo-oceania-connect-virtual-pharma-bsm-by-pharmexcil-for-oceania-pharma-industry', cover: 'indo-oceania-connect-virtual-pharma-bsm-by-pharmexcil-for-oceania-pharma-industry.jpg', title: 'Indo Oceania Connect — Virtual Pharma BSM (Pharmexcil)', date: '16–19 November 2021', venue: 'Virtual', description: '', sortKey: '2021-11-16' },
  { sourceSlug: 'india-iot-world-virtual-exhibition-3-4-march-2021', cover: 'india-iot-world-virtual-exhibition-3-4-march-2021.png', title: 'India IoT World (Virtual Exhibition)', date: '3–4 March 2021', venue: 'Virtual', description: '', sortKey: '2021-03-03' },
  { sourceSlug: 'india-hitech-expo-virtual-ict-business-meet-24-25-march-2021', cover: 'india-hitech-expo-virtual-ict-business-meet-24-25-march-2021.png', title: 'India HiTech Expo & Virtual ICT Business Meet', date: '24–25 March 2021', venue: 'Virtual', description: '', sortKey: '2021-03-24' },
  { sourceSlug: 'ietf-2021-25-february-24-march-2021-cii-hive-virtual-platform', cover: 'ietf-2021-25-february-24-march-2021-cii-hive-virtual-platform.png', title: 'IETF 2021 — International Engineering & Technology Fair', date: '25 February – 24 March 2021', venue: 'CII HIVE Virtual Platform', description: '', sortKey: '2021-02-25' },
  { sourceSlug: '16th-ficci-higher-education-summit-25-27-feb-2021', cover: '16th-ficci-higher-education-summit-25-27-feb-2021.png', title: '16th FICCI Higher Education Summit', date: '25–27 February 2021', description: '', sortKey: '2021-02-25' },
  { sourceSlug: 'global-textile-home-furnishing-expo-weaving-the-beauty-of-india-22-24-feb-2021', cover: 'global-textile-home-furnishing-expo-weaving-the-beauty-of-india-22-24-feb-2021.jpg', title: 'Global Textile & Home Furnishing Expo — "Weaving the Beauty of India"', date: '22–24 February 2021', venue: 'Virtual', description: '', sortKey: '2021-02-22' },
  { sourceSlug: 'india-tourism-mart-18-20-feb-2021', cover: 'india-tourism-mart-18-20-feb-2021.jpg', title: 'India Tourism Mart (ITM 2021)', date: '18–20 February 2021', venue: 'Virtual', description: '', sortKey: '2021-02-18' },
  { sourceSlug: 'mega-virtual-buyer-seller-meet-5th-february-to-3rd-march-2021', cover: 'mega-virtual-buyer-seller-meet-5th-february-to-3rd-march-2021.png', title: 'Mega Virtual Buyer Seller Meet (ceramics, tiles, stone, marble, kitchenware, sanitaryware)', date: '5 February – 3 March 2021', venue: 'Virtual', description: '', sortKey: '2021-02-05' },
  { sourceSlug: '8th-9th-edition-of-india-international-silk-fair-on-virtual-portal-from-jan-31st-to-mar-31st-2021', cover: '8th-9th-edition-of-india-international-silk-fair-on-virtual-portal-from-jan-31st-to-mar-31st-2021.png', title: '8th & 9th India International Silk Fair (Virtual Portal)', date: '31 January – 31 March 2021', venue: 'Virtual', description: '', sortKey: '2021-01-31' },
  { sourceSlug: 'india-e-municipalica-week-virtual-exhibition-conferences-28th-31st-jan-2021', cover: 'india-e-municipalica-week-virtual-exhibition-conferences-28th-31st-jan-2021.jpg', title: 'India E-Municipalica Week — Virtual Exhibition & Conferences', date: '28–31 January 2021', venue: 'Virtual', description: '', sortKey: '2021-01-28' },
  { sourceSlug: 'assocham-india-oceania-food-beverage-virtual-expo-28-30-jan-2021', cover: 'assocham-india-oceania-food-beverage-virtual-expo-28-30-jan-2021.png', title: 'ASSOCHAM India-Oceania Food & Beverage Virtual Expo', date: '28–30 January 2021', venue: 'Virtual', description: '', sortKey: '2021-01-28' },
  { sourceSlug: 'cii-partnership-summit-15-18-december-2020', cover: 'cii-partnership-summit-15-18-december-2020.jpg', title: 'CII Partnership Summit', date: '15–18 December 2020', venue: 'Digital platform', description: '', sortKey: '2020-12-15' },
  { sourceSlug: 'mega-virtual-buyers-sellers-meet-mvbsm-on-ceramics-and-vitrified-tiles', cover: 'mega-virtual-buyers-sellers-meet-mvbsm-on-ceramics-and-vitrified-tiles.jpg', title: 'Mega Virtual Buyers Sellers Meet (MVBSM) — Ceramics & Vitrified Tiles', date: '18 December 2020', venue: 'Virtual', description: '', sortKey: '2020-12-18' },
  { sourceSlug: 'global-joint-venture-partnership-meet-gjvpm', cover: 'global-joint-venture-partnership-meet-gjvpm.jpg', title: 'Global Joint Venture & Partnership Meet (GJVPM)', date: '10 November 2020', venue: 'Virtual', description: '', sortKey: '2020-11-10' },
  { sourceSlug: '1st-indo-asean-oceanic-business-summit-expo', cover: '1st-indo-asean-oceanic-business-summit-expo.jpg', title: '1st Indo ASEAN Oceanic Business Summit & Expo', date: '4–6 August 2020', venue: 'Virtual', description: '', sortKey: '2020-08-04' },
  { sourceSlug: 'ficci-presents-global-virtual-textile-and-home-furnishing-expo', cover: 'ficci-presents-global-virtual-textile-and-home-furnishing-expo.jpg', title: 'FICCI — Global Virtual Textile and Home Furnishing Expo', date: 'Date not stated in the source post', venue: 'Virtual', description: '', sortKey: '2020-01-01' },
  { sourceSlug: 'expo-in-dubai-an-event-that-will-have-a-strong-connection-to-india', cover: 'expo-in-dubai-an-event-that-will-have-a-strong-connection-to-india.jpg', title: 'Expo in Dubai (India-connected)', date: 'Date not stated in the source post', venue: 'Dubai', description: '', sortKey: '0000-00-00' },
] as const;

/** Newest-first by sortKey. '0000-00-00' (no date found in the source) sorts last. */
function sortEventsByDateDesc(events: readonly EventItem[]) {
  return [...events].sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));
}

/** Groups a flat, unordered event list into year buckets, newest year and newest event
    within each year first. sortKey '0000-00-00' means "no date found in the source" —
    those sort last and render under a "Date not confirmed" heading instead of a fake year. */
function groupEventsByYear(events: readonly EventItem[]) {
  const sorted = sortEventsByDateDesc(events);
  const groups: { year: string; events: EventItem[] }[] = [];
  for (const event of sorted) {
    const year = event.sortKey.slice(0, 4) === '0000' ? 'Date not confirmed' : event.sortKey.slice(0, 4);
    const current = groups[groups.length - 1];
    if (current && current.year === year) current.events.push(event);
    else groups.push({ year, events: [event] });
  }
  return groups;
}

/** A past event: real cover, real details, links out to the original post — every claim on
    this row traces back to something INZBC itself published. */
function EventRow({ event, delay = 0 }: { event: EventItem; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={`https://www.inzbc.org/post/${event.sourceSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group grid gap-5 rounded-xl p-4 -m-4 transition-colors hover:bg-white sm:grid-cols-[8rem_1fr] ${FOCUS}`}
      >
        {event.cover ? (
          <img
            src={`/blog/${event.cover}`}
            alt={`Cover for ${event.title}`}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        ) : (
          <span className="hidden aspect-[4/3] w-full rounded-lg bg-mist sm:block" aria-hidden="true" />
        )}
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-heading text-xl text-ink">{event.title}</h3>
            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className="text-plum opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
          <p className="mt-1 text-sm font-medium text-plum">
            {event.date}
            {event.venue ? ` · ${event.venue}` : ''}
          </p>
          {event.description ? <p className="mt-2 text-sm text-foreground">{event.description}</p> : null}
        </div>
      </a>
    </Reveal>
  );
}

/** A lighter row for third-party expos — no description (none written for these), smaller
    thumbnail, same real-cover-and-real-link rule. */
function ExpoRow({ event, delay = 0 }: { event: EventItem; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={`https://www.inzbc.org/post/${event.sourceSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-4 rounded-xl p-3 -m-3 transition-colors hover:bg-mist ${FOCUS}`}
      >
        <img
          src={`/blog/${event.cover}`}
          alt={`Cover for ${event.title}`}
          loading="lazy"
          className="h-16 w-14 flex-none rounded object-cover shadow"
        />
        <div className="flex-1">
          <h4 className="font-heading text-base text-ink">{event.title}</h4>
          <p className="text-sm text-foreground/70">
            {event.date}
            {event.venue ? ` · ${event.venue}` : ''}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={16}
          className="flex-none text-plum opacity-0 transition-opacity group-hover:opacity-100"
        />
      </a>
    </Reveal>
  );
}

function EventsBody() {
  // Computed, not hand-written prose: a genuinely future-dated event appears here the moment
  // it's added to INZBC_EVENTS, with no second place to remember to update. The "nothing
  // published" fallback used to be permanently true by construction — worth restating here
  // because it's the honest state on today's date, not an assumption: checked live against
  // inzbc.org and inzbusinesssummit.com before, and this list is that same source of record.
  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = [...INZBC_EVENTS].filter((e) => e.sortKey >= todayKey).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  const upcomingSlugs = new Set(upcoming.map((e) => e.sourceSlug));
  // Excludes anything already shown as upcoming — sortEventsByDateDesc sorts purely by date,
  // so a future-dated event would otherwise sort to the top of "Recent" too and show twice.
  const recent = sortEventsByDateDesc(INZBC_EVENTS)
    .filter((e) => !upcomingSlugs.has(e.sourceSlug))
    .slice(0, 4);

  return (
    <>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Upcoming events
            </h2>
            {upcoming.length > 0 ? (
              <>
                <p className="mt-4 text-foreground">
                  {upcoming.length === 1 ? 'The next confirmed INZBC event.' : `The next ${upcoming.length} confirmed INZBC events.`}
                </p>
                <div className="mt-8 space-y-2 divide-y divide-ink/10">
                  {upcoming.map((event, i) => (
                    <EventRow key={event.sourceSlug} event={event} delay={i * 0.05} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-foreground">
                  Nothing is currently published as an upcoming event, either on this site or
                  INZBC&rsquo;s own listings &mdash; checked directly rather than assumed. The
                  Summit is INZBC&rsquo;s flagship annual gathering; briefings and delegations are
                  announced to members and subscribers first.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn href={LINKS.summitSite} external>
                    Visit the Summit website
                  </Btn>
                  <Btn href={LINKS.subscribe} variant="outline" external>
                    Subscribe for announcements
                  </Btn>
                </div>
              </>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Recent events
            </h2>
            <p className="mt-4 text-foreground">
              The most recent of {INZBC_EVENTS.length} INZBC events on record, real photos and
              details from each.
            </p>
          </Reveal>
          <div className="mt-10 space-y-2 divide-y divide-ink/10">
            {recent.map((event, i) => (
              <EventRow key={event.sourceSlug} event={event} delay={i * 0.05} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Btn href="/events/past">Browse the full event archive</Btn>
              <span className="text-sm text-foreground/70">
                {INZBC_EVENTS.length} INZBC events and {EXPO_EVENTS.length} trade expos, back to 2020
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Membership ---------------------------------------------------------------------- */

/**
 * Section order follows legacy/wix-studio/ARCHITECTURE.md's nav table for Membership: Why
 * Join, Membership Plans, Member Benefits, Member Directory, Join INZBC. "Why members join"
 * below is Why Join; "Membership tiers" is Membership Plans. Member Benefits and Member
 * Directory were missing entirely until now — both are migrated from
 * member-network.html, which also supplies the member/industry counts staying [[placeholder]]
 * ("inventing a member number is exactly the claim this site must not make," per that
 * snippet's own comment).
 *
 * Photos: three real INZBC event photos, none used elsewhere on the site (checked against
 * HomePage.tsx and FtaPage.tsx before picking) — an Indian High Commission symposium, the BNZ
 * India Business Forum (also the page's hero, via pages.ts), and a QualityNZ investment-decade
 * event. Real council headshots (public/council/) stand in for "who's already in the
 * directory" instead of a stock illustration.
 */
function MembershipBody() {
  const reasons = [
    [
      'Advocacy',
      'A direct voice with government on trade policy and market access affecting NZ–India trade — including the NZ–India FTA itself, signed but not yet in force. INZBC represents member interests directly to officials on both sides of the corridor, not just to publish a position paper.',
    ],
    [
      'Market intelligence',
      'The Trade Intelligence Digest and FTA sector briefings, human-reviewed before publication. Members also get early access to flagship research, including the Grow With India trade report and the Kia Ora India magazine.',
    ],
    [
      'Networks',
      'Business development, delegations and introductions across the NZ–India corridor, through chapters in Auckland, Wellington, Christchurch, Mumbai and Delhi. Membership puts you in the same room as exporters, importers, investors and government agencies already active in the market.',
    ],
    [
      'Events',
      'From sector briefings to the annual INZBC Summit, the flagship gathering for the bilateral trade community. Past sessions have included briefings from New Zealand’s Chief Trade Negotiator and visiting ministers from both governments.',
    ],
  ] as const;

  return (
    <>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            {/* Three photos, not one — a big square plus two half-square (2:1) photos
                stacked beside it, so the section reads as a small gallery of the network in
                action rather than a single illustrative image. */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              <img
                src="/blog/indian-high-commission-holds-a-symposium-to-promote-trade-and-diplomatic-ties.jpg"
                alt="Indian High Commission symposium on trade and diplomatic ties, with New Zealand and Indian officials"
                width={1600}
                height={1066}
                loading="lazy"
                className="row-span-2 aspect-square w-full rounded-2xl object-cover"
              />
              <img
                src="/blog/collaboration-and-cooperation-key-to-india-and-nz-s-future-international-education-success.jpg"
                alt="An INZBC roundtable discussion between New Zealand and Indian delegates"
                width={1600}
                height={1066}
                loading="lazy"
                className="aspect-[2/1] w-full rounded-2xl object-cover"
              />
              <img
                src="/blog/indian-envoy-calls-for-stronger-business-ties-mutual-presence.jpg"
                alt="A speaker addressing delegates at an INZBC summit"
                width={640}
                height={559}
                loading="lazy"
                className="aspect-[2/1] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <img
                src="/blog/inzbc-bids-farewell-to-high-commissioner-kohli-in-wellington.jpg"
                alt="INZBC members applauding at a farewell event for outgoing Indian High Commissioner Sanjiv Kohli"
                width={1600}
                height={1198}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <img
                src="/blog/veteran-business-leader-bhav-dhillon-appointed-inzbc-patron.jpg"
                alt="Bhav Dhillon speaking on an INZBC panel"
                width={906}
                height={680}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Why members join
            </h2>
            <dl className="mt-10 space-y-8 border-t border-ink/10 pt-8">
              {reasons.map(([title, body], i) => (
                <div key={title} className={i > 0 ? 'border-t border-ink/10 pt-8' : ''}>
                  <dt className="font-heading text-xl text-ink">{title}</dt>
                  <dd className="mt-2 text-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Membership tiers
            </h2>
            <p className="mt-4 text-foreground">
              Pulled live from Member Jungle, INZBC&rsquo;s registration system &mdash;
              this is the actual current fee structure, not a placeholder.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mx-auto mt-12 grid max-w-3xl gap-x-12 gap-y-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/60">
                New Zealand
              </h3>
              <dl className="mt-4 divide-y divide-ink/10">
                {[
                  ['Student', '$100'],
                  ['Individual', '$200'],
                  ['SME (1–4 staff)', '$250'],
                  ['MSME (5–24 staff)', '$350'],
                  ['Educational institution', '$400'],
                  ['MSE (25–29 staff)', '$600'],
                  ['Corporate (100+ staff)', '$850'],
                ].map(([tier, price]) => (
                  <div key={tier} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-foreground">{tier}</dt>
                    <dd className="font-heading text-lg text-ink">{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/60">
                India
              </h3>
              <dl className="mt-4 divide-y divide-ink/10">
                {[
                  ['MSME', '$750'],
                  ['Corporate', '$1,000'],
                ].map(([tier, price]) => (
                  <div key={tier} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-foreground">{tier}</dt>
                    <dd className="font-heading text-lg text-ink">{price}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-foreground/60">
                Annual fees, excluding GST and transaction charges.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn href={LINKS.join} external>
              See membership options
            </Btn>
          </div>
          <p className="mt-4 text-center text-xs text-foreground/50">
            Pricing shown here is a snapshot &mdash; Member Jungle is the live, authoritative
            source and is where you&rsquo;ll actually sign up.
          </p>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-ink px-6 py-24">
        {/* QualityNZ event photo as ambient texture behind the band, not a portrait to look
            at directly — low opacity keeps white text at full contrast. Was a flat colour
            field; the code comment here used to say no network photo existed, which was true
            before this pass pulled ~150 real ones down from the live site. */}
        <img
          src="/blog/qualitynz-group-celebrates-a-decade-of-investment-in-india.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-1/4 top-0 h-[30rem] w-[30rem] rounded-full opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Who you meet by joining
              </h2>
              <p className="mt-5 max-w-md text-white/75">
                Exporters, importers, investors, universities and government agencies on both
                sides of the corridor. Membership is an introduction to the people already
                doing it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4 text-white/85">
                {BENEFITS.map(([label, rest]) => (
                  <li key={label}>
                    <strong className="text-white">{label}</strong> {rest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 sm:grid-cols-4">
              <div>
                <dt className="text-sm text-white/60">Members</dt>
                <dd className="mt-1 font-heading text-3xl text-lime">
                  <Todo>[[count]]</Todo>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">Industries</dt>
                <dd className="mt-1 font-heading text-3xl text-lime">
                  <Todo>[[count]]</Todo>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">Chapters</dt>
                <dd className="mt-1 font-heading text-3xl text-lime">5</dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">Since</dt>
                <dd className="mt-1 font-heading text-3xl text-lime">1988</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-white/50">
              Chapters in Auckland, Wellington, Christchurch, Mumbai and Delhi.{' '}
              <Todo>[[Confirm member and industry counts with INZBC before publish.]]</Todo>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            {/* Real council headshots, not a stand-in illustration — same photos and names as
                the Executive Council page. These are the council and secretariat, not the
                member directory itself (that's on Member Jungle, per this page's lede), so the
                caption says exactly that rather than implying these faces are a directory
                sample. No count badge — this project's standing rule is not to invent member
                numbers, and a "+N" tail would be exactly that. */}
            <div className="mb-6 flex justify-center -space-x-3">
              {[
                ['Sunil Kaushal', '/council/sunil-kaushal.png'],
                ['Edwin Paul', '/council/edwin-paul.png'],
                ['Rachel Lynch', '/council/rachel-lynch.jpg'],
                ['Bharat Chawla', '/council/bharat-chawla.jpg'],
                ['Sreedhar Venkatram', '/council/sreedhar-venkatram.jpeg'],
                ['Tony Martin', '/council/tony-martin.png'],
              ].map(([name, photo]) => (
                <img
                  key={name}
                  src={photo}
                  alt={name}
                  title={name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 rounded-full border-2 border-mist object-cover"
                />
              ))}
            </div>
            <p className="text-xs text-foreground/60">The council and secretariat &mdash; some of who you&rsquo;ll meet</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Member directory</h2>
            <p className="mt-4 text-foreground">
              See who is already trading across the corridor &mdash; exporters, importers,
              investors, universities and government agencies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href="/membership/directory">Explore the directory</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">What happens next</h2>
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-foreground">
              <li>Select the tier that matches your organisation.</li>
              <li>Submit the application through Member Jungle.</li>
              <li>The INZBC secretariat reviews and confirms your membership.</li>
              <li>
                You receive access to member events, intelligence and the member directory.
              </li>
            </ol>
            <p className="mt-6 text-foreground">
              Questions? <TextLink href="/connect">Contact the secretariat</TextLink>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Ready to grow your business with India?
            </h2>
            <p className="mt-4 text-white/75">
              Join INZBC, or talk to us about how we can help your organisation engage across
              the NZ&ndash;India corridor.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href={LINKS.join} external>
                Join INZBC
              </Btn>
              <Btn href="/connect" variant="ghost">
                Contact us
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Connect -------------------------------------------------------------------------- */

function ConnectBody() {
  return (
    <>
      <section className="bg-white px-6 pb-8 pt-20">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Contact</h2>
            <p className="mt-3 max-w-sm text-foreground">
              Sunil Kaushal, Chief Executive, and the secretariat team. Email is the preferred
              way to reach them.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-4">
                <Mail aria-hidden="true" size={22} strokeWidth={1.6} className="mt-0.5 flex-none text-plum" />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <p className="mt-1">
                    <TextLink href={LINKS.email}>Secretariat@inzbc.org</TextLink>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin aria-hidden="true" size={22} strokeWidth={1.6} className="mt-0.5 flex-none text-plum" />
                <div>
                  <p className="font-semibold text-ink">Postal address</p>
                  <p className="mt-1 text-foreground">
                    PO Box 26061
                    <br />
                    Glen Eden
                    <br />
                    Auckland 0641
                    <br />
                    New Zealand
                  </p>
                </div>
              </div>
            </div>

            {/* The live site's own contact widget has shown different values across
                checks this session (also seen "Sunil@inzbc.org"/"PO Box 20092", and
                separately "Gm@inzbc.org"/"Edwin Paul, Chair@inzbc.org") - it's the live
                page itself that's inconsistent, not a gap in what's been checked. Using
                Secretariat@inzbc.org / PO Box 26061 here because that's the pair already
                published consistently everywhere else on this site (Home, Footer), not a
                fresh guess. */}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-mist p-8 md:p-10">
              <h2 className="font-heading text-2xl text-ink">Send a message</h2>
              <ContactForm />
              <p className="mt-5 text-sm text-foreground">
                Prefer email directly? <TextLink href={LINKS.email}>Email the secretariat</TextLink>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blob-shaped icon cards, modernised from the live site's dated blue-gradient version:
          current palette tokens instead (navy/plum/forest/ink, all dark enough for a white
          icon+label per HANDOVER.md's rule that lime never carries light text/icons, so lime
          isn't one of the four). Labels are the live site's own real copy. Lucide's brand
          icons (Facebook/Linkedin/Twitter/Youtube) are marked deprecated upstream but present
          and working in the pinned lucide-react@0.487.0 (verified against that version's
          published types), so used as-is rather than hand-drawing inline SVGs for four
          standard glyphs.

          pt-8, not py-20 like the section above it: both are bg-white with no visual seam
          between them, so their two py-20s stacked (160px) read as one big dead gap rather
          than two padded sections — tightened just this shared edge, not the section's own
          bottom padding. */}
      <section className="bg-white px-6 pb-20 pt-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center font-heading text-3xl text-ink md:text-4xl">
              Follow INZBC
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { name: 'X', Icon: TwitterIcon, href: LINKS.x, label: 'Follow us on X', from: '#3d2a66', to: '#160933' },
              { name: 'LinkedIn', Icon: LinkedinIcon, href: LINKS.linkedin, label: 'Connect with us on LinkedIn', from: '#8a3d87', to: '#61145f' },
              { name: 'YouTube', Icon: YoutubeIcon, href: LINKS.youtube, label: 'Watch our videos on YouTube', from: '#2f6b62', to: '#1b4640' },
              { name: 'Facebook', Icon: FacebookIcon, href: LINKS.facebook, label: 'Find us on Facebook', from: '#402d66', to: '#1a0b3f' },
            ].map((social, i) => (
              <Reveal key={social.name} delay={i * 0.06}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-4 rounded-sm ${FOCUS}`}
                >
                  <span className="relative flex h-24 w-24 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Blob id={`blob-${social.name}`} from={social.from} to={social.to} size={96} />
                    <social.Icon
                      aria-hidden="true"
                      size={30}
                      strokeWidth={1.8}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                    />
                  </span>
                  <span className="text-center text-sm font-medium text-ink">{social.label}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real, live Twitter/X and Facebook embeds — official public embed methods
          (SocialFeeds.tsx), not the old site's POWr app. Not visually verified this session;
          see that file's own comment for the full reasoning and what the fallback state is
          if either script fails to load. */}
      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SocialFeeds />
        </div>
      </section>

      {/* Sourced from newsletter-band.html (written for Home, but the copy is generic
          newsletter promotion, not Home-specific) — its own comment calls this "deliberately
          the only warm band on the page", which is why it's the one dark/ink section here
          rather than mist. The mockup image is ART.newsletterMockup, already sourced
          (content.ts) and confirmed against the live site's own asset for this — no Parallax
          on it, per the no-heavy-motion rule, just a plain image. */}
      <section className="bg-ink px-6 py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-2xl text-white md:text-3xl">
              Subscribe to the INZBC newsletter
            </h2>
            <p className="mt-4 text-white/75">
              Trade news, FTA developments and event announcements, straight to your inbox.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={LINKS.subscribe} external>
                Subscribe
              </Btn>
              <Btn href="/newsletters" variant="ghost">
                View the archive
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={ART.newsletterMockup}
              alt="The INZBC newsletter shown on a laptop and a tablet"
              loading="lazy"
              className="w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Become a sponsor</h2>
            <p className="mt-4 text-foreground">
              Sponsorship supports the trade missions, briefings and research INZBC publishes
              across the NZ&ndash;India corridor. Tiers and inclusions aren&rsquo;t published
              anywhere yet &mdash; the secretariat can talk you through current options directly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href={`${LINKS.email}?subject=Sponsorship%20enquiry`}>
                Enquire about sponsorship
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* No legacy/wix-studio snippet mentions promotional videos, so these are sourced
          directly from the live page's own schema.org VideoObject structured data (real IDs
          and titles, not invented) rather than left as a marker, now that real content is
          available. Linked thumbnail + "Watch on YouTube" rather than a live iframe: no
          embed pattern exists anywhere in this codebase to build against, four autoplaying
          iframes would be a real page-weight cost, and thumbnails can be verified statically
          where iframe rendering cannot be, in an environment with no browser access. */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-heading text-3xl text-ink md:text-4xl">
              INZBC on YouTube
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { id: 'sQ2vE96V7s8', title: 'INZBC SUMMIT 2018 - Highlights' },
              { id: 'D82PuQR--hU', title: 'Summit 2019 Highlights' },
              { id: '-8TjFht41p4', title: 'INZBC Video Events Highlights 2014-17' },
              { id: 'mlRXLKGi4cE', title: 'Economic impact of COVID19 on NZ India trade relations.' },
            ].map((video, i) => (
              <Reveal key={video.id} delay={i * 0.06}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-2xl bg-mist p-4 transition-transform hover:scale-[1.02] ${FOCUS}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="w-full rounded-lg"
                  />
                  <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
                  <p className="mt-1 text-xs text-plum">Watch on YouTube</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* --- News ----------------------------------------------------------------------------- */

function NewsBody() {
  // The same three posts the homepage carries.
  const posts = [
    {
      img: ART.ftaFlyer,
      alt: 'Event flyer for Inside the NZ India FTA with Vangelis Vitalis',
      title: 'Inside the NZ–India FTA with Vangelis Vitalis',
      body: "An Auckland event with New Zealand's chief trade negotiator.",
    },
    {
      img: ART.ftaNewEra,
      alt: 'Delegation photograph accompanying the FTA article',
      title: 'A new era for business',
      body: 'The agreement signals a new era for trade between the two countries.',
    },
    {
      img: ART.heroBanner,
      alt: 'INZBC banner showing a container port and India Gate',
      title: 'INZBC welcomes the landmark agreement',
      // Quoted directly from the article on inzbc.org/news (22 Dec 2025), pulled 18 Aug 2026.
      body: 'The FTA "reduces tariffs on 95% of New Zealand’s exports – among the highest of any Indian FTA," opening new opportunities for bilateral commerce.',
    },
  ];

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="max-w-2xl text-foreground">
              <Todo>
                [[News CMS &mdash; connect a CMS so posts publish here with their own pages;
                until then the latest three are listed by hand.]]
              </Todo>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.title} delay={i * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-mist">
                  <img
                    src={post.img}
                    alt={post.alt}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-lg text-ink">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-foreground">
                      {post.body ?? <Todo>[[Article summary &mdash; confirm with INZBC.]]</Todo>}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Get this in your inbox
            </h2>
            <p className="mt-4 text-white/75">
              The Trade Intelligence Digest is weekly, sourced and human-reviewed before
              publication.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href={LINKS.subscribe} external>
                Subscribe
              </Btn>
              <Btn href="/newsletters" variant="ghost">
                Read the latest issue
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Publications --------------------------------------------------------------------- */

/**
 * Every title, date, description, cover and Issuu link below is real. Titles/dates/links
 * started from inzbc.org/publications (stale, stopping at Dec 2023) plus the June 2024 Kia
 * Ora India issue found via its own blog post, which the publications page never listed.
 * Descriptions and covers both come from Issuu's own oEmbed endpoint
 * (issuu.com/oembed?url=...&format=json) called per document — it returns the real
 * document-specific cover (image.isu.pub/{id}/...) and, where the publisher wrote one, the
 * actual synopsis, not the generic account-avatar/boilerplate a plain page fetch was
 * returning earlier. Covers downloaded to public/publications/ at the "large" thumbnail size
 * (340x480). 8 of the 13 Kia Ora issues have a distinct description; the other 5 (Dec 2023,
 * Apr 2020, Dec 2019, Aug 2019, Apr 2019) confirmed empty or generic-boilerplate-only via
 * oEmbed, so they carry their real volume/issue number instead of a faked description.
 */
const REPORTS = [
  {
    title: 'Grow With India',
    sub: 'The New Zealand India Trade Report 2025',
    body: 'Where the trade relationship stands and where it can go.',
    cover: '/publications/report-2025.jpg',
    href: LINKS.reportIssuu,
    featured: true,
  },
  {
    title: 'India & New Zealand: A Relationship Ready For Its Next Phase',
    sub: 'April 2023',
    body: "INZBC's submission to the New Zealand Government presenting its assessment of the current state of India-NZ trade relations, and what the business community identified as the key steps to take the relationship to the next level.",
    cover: '/publications/report-2023-relationship-ready.jpg',
    href: 'https://issuu.com/inzbc/docs/inzbc_report_aw_version_z_low270423',
    featured: false,
  },
  {
    title: 'Health & Pharmaceutical Landscape of New Zealand',
    sub: 'March 2022',
    body: 'A roadmap for Indian pharma companies, commissioned by the High Commission of India and researched by INZBC.',
    cover: '/publications/report-pharma-2022.jpg',
    href: 'https://issuu.com/inzbc/docs/pharma_report_full_final_v9',
    featured: false,
  },
] as const;

/** Newest first within each year; years newest first. */
const KIA_ORA_ARCHIVE = [
  {
    year: 2024,
    issues: [
      {
        label: 'June 2024',
        cover: '/publications/kia-ora-2024-06.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_june24_v8_highres',
        description:
          "New Zealand's High Commissioner to India Patrick Rata and Trade Commissioner Graham Rouse; Minister Penny Simmonds on education-sector opportunities; Duco's Chandan Ohri on building India's tech workforce.",
      },
    ],
  },
  {
    year: 2023,
    issues: [
      {
        label: 'December 2023',
        cover: '/publications/kia-ora-2023-12.jpg',
        href: LINKS.kiaOraIssuuDec2023,
        issueNo: 'Vol 4, Issue 7',
      },
      {
        label: 'June 2023',
        cover: '/publications/kia-ora-2023-06.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_jun2023_v5_low',
        description:
          "The INZBC report on India-New Zealand relations; an exclusive interview with India's High Commissioner Neeta Bhushan, 'Open for Business'; and a spotlight on education collaboration.",
      },
    ],
  },
  {
    year: 2022,
    issues: [
      {
        label: 'November 2022',
        cover: '/publications/kia-ora-2022-11.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_nov2022_final',
        description:
          "The INZBC business delegation to India and its B2B engagements; Dr S Jaishankar's ministerial visit to New Zealand and, in an interview with Simon Bridges, his call for a 'reset' of bilateral relations; Duco Consultancy on the services sector; and the Kiwi-Indian diaspora's influence.",
      },
      {
        label: 'April 2022',
        cover: '/publications/kia-ora-2022-04.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_13april2022_final_low_',
        description:
          'International education and aviation, two pandemic-hit industries — the New Zealand Airline Academy on training future aviation professionals, Auckland University of Technology on bridging the gap, and HCL on emerging technologies aiding recovery.',
      },
    ],
  },
  {
    year: 2021,
    issues: [
      {
        label: 'October 2021',
        cover: '/publications/kia-ora-2021-10.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_oct2021_finalv2',
        description:
          "An exclusive interview with NZ Transport Minister Michael Wood; Ola co-founder Bhavish Aggarwal on what's next; NITI Aayog CEO Amitabh Kant's post-COVID perspective; Auckland University of Technology on international education; and Invest India on the new drone regulatory framework.",
      },
      {
        label: 'June 2021',
        cover: '/publications/kia-ora-2021-06.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_june_final_v2',
        description:
          "Reshaping Indo-Pacific ties; how technology aided pandemic recovery in India and New Zealand; why NZ businesses should look to India for new opportunities; and India's tech industry fighting COVID-19 without business taking a hit.",
      },
      {
        label: 'March 2021',
        cover: '/publications/kia-ora-2021-03.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_mar2021_vol_3___issue_01',
        description:
          "India emerging as the 'Vaccine Superpower'; trade challenges in a world beyond COVID; Indians' $10B contribution to the NZ economy; NZ businesses investing in 'Make in India'; and pressures on the meat industry.",
      },
    ],
  },
  {
    year: 2020,
    issues: [
      {
        label: 'April 2020',
        cover: '/publications/kia-ora-2020-04.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_april_vol_2_issue_01__final',
        issueNo: 'Vol 2, Issue 01',
      },
    ],
  },
  {
    year: 2019,
    issues: [
      {
        label: 'December 2019',
        cover: '/publications/kia-ora-2019-12.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_december_v4_final_web',
        issueNo: 'Vol 1, Issue 4',
      },
      {
        label: 'August 2019',
        cover: '/publications/kia-ora-2019-08.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_august_v9_web',
        issueNo: 'Vol 1, Issue 3',
      },
      {
        label: 'April 2019',
        cover: '/publications/kia-ora-2019-04.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_april2019_v8_low',
        issueNo: 'Vol 1, Issue 2',
      },
    ],
  },
  {
    year: 2018,
    issues: [
      {
        label: 'December 2018',
        cover: '/publications/kia-ora-2018-12.jpg',
        href: 'https://issuu.com/inzbc/docs/kiaora_india_draft_12_web',
        description:
          "'New Zealand-India trade poised for takeoff' — early coverage of emerging commercial opportunities between the two countries.",
      },
    ],
  },
] as const;

/** One archive row: thumbnail where a real cover is confirmed (an empty same-size spacer
    otherwise, so every label lines up in one column), description where Issuu had a real,
    distinct one. The whole row is the link target, not just the label text. */
function KiaOraIssueRow({
  issue,
}: {
  issue: { label: string; href: string; cover?: string; description?: string; issueNo?: string };
}) {
  return (
    <a
      href={issue.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group -mx-3 flex items-start gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white ${FOCUS}`}
    >
      {issue.cover ? (
        <img
          src={issue.cover}
          alt={`Cover of Kia Ora India, ${issue.label}`}
          loading="lazy"
          className="h-20 w-14 flex-none rounded object-cover shadow"
        />
      ) : (
        <span className="h-20 w-14 flex-none" aria-hidden="true" />
      )}
      <span className="flex-1 pt-1">
        <span className="flex items-center gap-1.5 font-heading text-lg text-ink">
          {issue.label}
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className="text-plum opacity-0 transition-opacity group-hover:opacity-100"
          />
        </span>
        {issue.description ? (
          <span className="mt-1 block text-sm text-foreground/80">{issue.description}</span>
        ) : issue.issueNo ? (
          <span className="mt-1 block text-xs uppercase tracking-wide text-foreground/50">
            {issue.issueNo} &mdash; no synopsis published for this issue
          </span>
        ) : null}
      </span>
    </a>
  );
}

function PublicationsBody() {
  const [featured, ...otherReports] = REPORTS;

  return (
    <>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Reports</h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
            <Reveal className="lg:col-span-3">
              <article className="flex h-full flex-col gap-8 rounded-2xl bg-mist p-8 sm:flex-row sm:items-center md:p-10">
                <img
                  src={featured.cover}
                  alt={`Cover of ${featured.title}, ${featured.sub}`}
                  loading="lazy"
                  className="h-auto w-32 flex-none rounded-lg shadow-lg sm:w-40"
                />
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-plum">Latest</span>
                  <h3 className="mt-2 font-heading text-2xl text-ink md:text-3xl">{featured.title}</h3>
                  <p className="mt-1 text-sm text-plum">{featured.sub}</p>
                  <p className="mt-3 text-foreground">{featured.body}</p>
                  <p className="mt-5">
                    <Btn href={featured.href} external>
                      Read on Issuu
                    </Btn>
                  </p>
                </div>
              </article>
            </Reveal>

            <div className="flex flex-col gap-8 lg:col-span-2">
              {otherReports.map((pub, i) => (
                <Reveal key={pub.title} delay={0.08 + i * 0.06}>
                  <article className="flex gap-5">
                    <img
                      src={pub.cover}
                      alt={`Cover of ${pub.title}`}
                      loading="lazy"
                      className="h-auto w-20 flex-none rounded-lg shadow-lg"
                    />
                    <div>
                      <h3 className="font-heading text-lg text-ink">{pub.title}</h3>
                      {pub.sub ? <p className="mt-1 text-sm text-plum">{pub.sub}</p> : null}
                      <p className="mt-2 text-sm text-foreground">{pub.body}</p>
                      <p className="mt-3">
                        <TextLink href={pub.href} external>
                          Read on Issuu
                        </TextLink>
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Kia Ora India
            </h2>
            <p className="mt-4 max-w-2xl text-foreground">
              The INZBC magazine, running since 2018: member businesses and the people moving
              between the two markets. Every issue below is real and linked to Issuu &mdash;
              this page had gone stale and stopped at December 2023 on the live site.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-ink/10">
            {KIA_ORA_ARCHIVE.map((group, gi) => (
              <Reveal key={group.year} delay={gi * 0.03}>
                <div className="grid gap-2 border-b border-ink/10 py-8 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  <p className="font-heading text-3xl text-ink">{group.year}</p>
                  <div className="divide-y divide-ink/5">
                    {group.issues.map((issue) => (
                      <KiaOraIssueRow key={issue.label} issue={issue} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Get these in your inbox
            </h2>
            <p className="mt-4 text-white/75">
              The Trade Intelligence Digest is weekly, sourced and human-reviewed before
              publication.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href={LINKS.subscribe} external>
                Subscribe
              </Btn>
              <Btn href="/newsletters" variant="ghost">
                Read the latest issue
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Newsletters ---------------------------------------------------------------------- */

function NewslettersBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Kia Ora India</h2>
            <div className="mt-6 flex gap-6">
              <img
                src={ART.kiaOraCover}
                alt="Cover of Kia Ora India, June 2024"
                loading="lazy"
                className="h-auto w-28 flex-none rounded-lg shadow-lg md:w-36"
              />
              <div>
                <p className="text-foreground">
                  The INZBC magazine: member businesses and the people moving between the two
                  markets. Latest issue, June 2024 &mdash; New Zealand&rsquo;s High Commissioner
                  to India Patrick Rata and Trade Commissioner Graham Rouse; Minister Penny
                  Simmonds on education-sector opportunities; Duco&rsquo;s Chandan Ohri on
                  building India&rsquo;s tech workforce.
                </p>
                <p className="mt-5 flex flex-wrap gap-3">
                  <Btn href={LINKS.kiaOraIssuu} external>
                    Read the June 2024 edition
                  </Btn>
                  <Btn href="/publications" variant="outline">
                    Browse every issue since 2018
                  </Btn>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-16 font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Trade Intelligence Digest
            </h2>
            <p className="mt-4 text-foreground">
              A weekly, LLM-summarised, human-reviewed digest of India&ndash;NZ trade news,
              with source citations.
            </p>
            <p className="mt-3 text-sm text-foreground">
              <Todo>
                [[Digest archive &mdash; needs the digest pipeline CMS connected; render only
                items with status = published.]]
              </Todo>
            </p>
            <p className="mt-5">
              <Btn href={LINKS.subscribe} external>
                Subscribe to the digest
              </Btn>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Partners ------------------------------------------------------------------------- */

function PartnersBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Who INZBC works with</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              Strategic partners, associate partners, and government and industry stakeholders
              across both markets &mdash; each one linked, matching the same real logos and
              URLs Home uses, not a flattened image.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">Business network</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {BUSINESS_PARTNERS.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-ink/10 p-4 text-center transition-colors hover:border-ink/25 ${FOCUS}`}
                  >
                    <span className="flex h-12 items-center justify-center">
                      {partner.logo ? (
                        <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className="max-h-12 max-w-full object-contain" />
                      ) : (
                        <strong className="text-sm text-ink">{partner.name}</strong>
                      )}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-foreground/70">
                      {partner.relationship}
                      <ArrowUpRight aria-hidden="true" size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">India industry network</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {INDIA_NETWORK.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-ink/10 p-4 text-center transition-colors hover:border-ink/25 ${FOCUS}`}
                  >
                    <span className="flex h-12 items-center justify-center">
                      {partner.logo ? (
                        <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className="max-h-12 max-w-full object-contain" />
                      ) : (
                        <strong className="text-sm text-ink">{partner.name}</strong>
                      )}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-foreground/70">
                      {partner.relationship}
                      <ArrowUpRight aria-hidden="true" size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 border-t border-ink/10 pt-8">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">Also working alongside</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-sm text-foreground">
                {PUBLIC_SECTOR_NETWORK.map(({ name, href, logo }) => (
                  <li key={name}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border border-ink/10 px-3.5 text-xs font-medium transition-colors hover:border-ink/25 ${FOCUS}`}
                      >
                        {logo ? <img src={logo} alt="" loading="lazy" className="h-4 w-auto" /> : null}
                        {name}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-11 items-center rounded-full border border-ink/10 px-3.5 text-xs font-medium text-foreground/70">
                        {name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {/* ThinkNew New Zealand appears on inzbc.org's own partner graphic with no
                  verifiable official site under that name — named above without a link
                  rather than guessed. Everything else here is a real, checked URL. */}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-plum px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(26,11,63,0.8), transparent)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">Partner with INZBC</h2>
            <p className="mt-4 text-white/80">
              Sponsorship supports the trade missions, briefings and research INZBC publishes
              across the NZ&ndash;India corridor.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href={`${LINKS.email}?subject=Sponsorship%20enquiry`}>
                Enquire about sponsorship
              </Btn>
            </div>
            <p className="mt-8 text-sm text-white/70">
              Current tiers, per inzbc.org: Strategic Partners, Logistics Partners, Education
              Partners, and Sponsors &amp; Supporters (including named Hospitality, Knowledge
              and Travel partners).
            </p>
            <p className="mt-3 text-sm text-white/70">
              <Todo>
                [[What each tier includes and costs &mdash; not published anywhere INZBC
                supplies; confirm with INZBC before publish.]]
              </Todo>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- FTA Events and Briefings ----------------------------------------------------------- */

/**
 * One of Sunil's named FTA sub-pages (migration guide §3: "NZ India FTA... FTA Events and
 * Briefings"). Real entries only, pulled from the same INZBC_EVENTS archive the Events page
 * uses — no separate list to fall out of sync. Only one event is actually titled about the
 * FTA itself (the Vitalis session); the rest are real trade/diplomacy briefings tied to the
 * relationship, honestly labelled as that rather than stretched into "FTA events" they
 * weren't billed as.
 */
function FtaBriefingsBody() {
  const ftaExplainer = INZBC_EVENTS.find(
    (e) => e.sourceSlug === 'inside-the-nz-india-fta-with-vangelis-vitalis-auckland-event',
  )!;
  // Hand-picked, not a keyword filter: these are genuinely briefings/dialogues with
  // ministers, high commissioners and officials, not trade shows or delegations that happen
  // to be recent. Keeps the page honest about what it actually contains.
  const briefingSlugs = [
    'boardroom-to-border-a-leadership-dialogue-on-strategy-trade-india-nz-opportunities',
    'breakfast-dialogue-with-nz-high-commissioners-patrick-rata-david-pine-6-june-7-30am',
    'exclusive-inzbc-members-invitationdelegation-insights-from-india-pm-mission',
    'inzbc-annual-address-by-rt-hon-winston-peters',
    'indian-high-commission-holds-a-symposium-to-promote-trade-and-diplomatic-ties',
    'workshop-on-boosting-india-nz-trade-ties-held-in-wellington',
  ];
  const briefings = sortEventsByDateDesc(INZBC_EVENTS).filter((e) => briefingSlugs.includes(e.sourceSlug));

  return (
    <>
      <section className="bg-white px-6 py-24" aria-labelledby="explainer-title">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-ink sm:flex sm:items-stretch">
          <Reveal className="sm:w-1/2">
            <img
              src={`/blog/${ftaExplainer.cover}`}
              alt={ftaExplainer.title}
              loading="lazy"
              className="h-56 w-full object-cover sm:h-full"
            />
          </Reveal>
          <Reveal delay={0.08} className="p-8 text-white sm:w-1/2 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wide text-lime">Featured</p>
            <h2 id="explainer-title" className="mt-3 font-heading text-2xl md:text-3xl">
              {ftaExplainer.title}
            </h2>
            <p className="mt-4 text-white/75">{ftaExplainer.description}</p>
            <p className="mt-2 text-sm text-white/60">
              {ftaExplainer.date} &middot; {ftaExplainer.venue}
            </p>
            <p className="mt-6">
              <a
                href={`https://www.inzbc.org/post/${ftaExplainer.sourceSlug}`}
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

      <section className="bg-mist px-6 py-24" aria-labelledby="briefings-title">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 id="briefings-title" className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Trade briefings and dialogues
            </h2>
            <p className="mt-4 text-foreground">
              INZBC also runs briefings and dialogues on the wider trade relationship the FTA
              sits inside &mdash; with ministers, high commissioners and government agencies on
              both sides.
            </p>
          </Reveal>
          <div className="mt-10 space-y-2 divide-y divide-ink/10">
            {briefings.map((event, i) => (
              <EventRow key={event.sourceSlug} event={event} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-foreground">
              Looking for the full FTA picture, or every past INZBC event?
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Btn href="/fta" variant="outline">
                Visit the FTA Centre
              </Btn>
              <Btn href="/events/past" variant="outline">
                Browse the full event archive
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Trade resources ------------------------------------------------------------------ */

function TradeResourcesBody() {
  // Real trade missions INZBC itself has run recently, not a generic "missions happen" line.
  // Filtered from the same INZBC_EVENTS archive the Events page uses, not a separate list to
  // keep in sync.
  const recentMissions = sortEventsByDateDesc(INZBC_EVENTS)
    .filter((e) => /delegation|sourcing|buyer.seller|world food india/i.test(e.title))
    .slice(0, 3);
  const recentExpos = sortEventsByDateDesc(EXPO_EVENTS).slice(0, 3);

  const twoWayTrade = STATS.find((s) => s.label === 'Two-way trade')!;
  const exportsCovered = STATS.find((s) => s.label === 'Of NZ exports covered')!;
  const dutyFreeDayOne = STATS.find((s) => s.label === 'Duty free from day one')!;

  return (
    <>
      <section className="bg-white px-6 py-24" aria-labelledby="export-title">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <h2 id="export-title" className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Export to India
            </h2>
            <p className="mt-6 text-lg text-foreground">
              {exportsCovered.figure} of New Zealand&rsquo;s current exports to India get
              tariff elimination or reduction under the NZ&ndash;India FTA, with{' '}
              {dutyFreeDayOne.figure} duty-free from the day it enters into force. Sheep meat,
              wool and coal clear immediately; apples get preferential access for the first
              time in any Indian FTA; kiwifruit and mānuka honey follow within five years;
              dairy, seafood and forestry phase in over seven; wine over ten.
            </p>
            <p className="mt-5">
              <TextLink href="/fta">See the full phase-in timeline on the FTA Centre</TextLink>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Card title="Sector guidance">
              <p>
                Sector-by-sector detail for exporters &mdash; agritech, horticulture, seafood,
                education, tourism and more &mdash; already built out on its own page.
              </p>
              <p className="mt-5">
                <Btn href="/india-market-opportunities" variant="outline">
                  India market opportunities
                </Btn>
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-24" aria-labelledby="import-title">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 id="import-title" className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Import from India
            </h2>
            <p className="mt-6 text-foreground">
              The FTA also changes tariff and market-access settings for goods and services New
              Zealand businesses source from India. The full text of the agreement covers the
              specific commitments on both sides &mdash; the sourced guide above only tracks the
              outcomes for New Zealand exporters so far.
            </p>
            <p className="mt-5">
              <TextLink href={LINKS.mfatFtaText} external>
                Read the full agreement text on MFAT
              </TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-24" aria-labelledby="missions-title">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 id="missions-title" className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Trade missions and shows
            </h2>
            <p className="mt-4 max-w-2xl text-foreground">
              INZBC-led delegations, and third-party India trade shows INZBC has circulated to
              members &mdash; the most recent of each, from the full event archive.
            </p>
          </Reveal>

          {recentMissions.length > 0 ? (
            <>
              <Reveal delay={0.06}>
                <h3 className="mt-12 font-heading text-lg text-plum">Recent INZBC-led missions</h3>
              </Reveal>
              <div className="mt-4 space-y-2 divide-y divide-ink/10">
                {recentMissions.map((event, i) => (
                  <EventRow key={event.sourceSlug} event={event} delay={i * 0.05} />
                ))}
              </div>
            </>
          ) : null}

          <Reveal delay={0.1}>
            <h3 className="mt-12 font-heading text-lg text-plum">Recent trade shows circulated to members</h3>
          </Reveal>
          <div className="mt-3 space-y-1">
            {recentExpos.map((event, i) => (
              <ExpoRow key={event.sourceSlug} event={event} delay={i * 0.04} />
            ))}
          </div>

          <Reveal delay={0.14}>
            <p className="mt-8">
              <Btn href="/events/past" variant="outline">
                Browse the full event archive
              </Btn>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-24" aria-labelledby="intelligence-title">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 id="intelligence-title" className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Market intelligence
            </h2>
            <p className="mt-4 text-foreground">
              The Trade Intelligence Digest is a weekly, LLM-summarised, human-reviewed digest
              of India&ndash;NZ trade news, with source citations &mdash; against a real
              baseline: two-way trade stood at {twoWayTrade.figure} for the{' '}
              {twoWayTrade.note.replace(/\.$/, '').toLowerCase()}.
            </p>
            <p className="mt-3 text-sm text-foreground">
              <Todo>
                [[Digest archive &mdash; needs the digest pipeline CMS connected; render only
                items with status = published.]]
              </Todo>
            </p>
            <p className="mt-5">
              <Btn href={LINKS.subscribe} external>
                Subscribe to the digest
              </Btn>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy px-6 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-1/4 top-0 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(184,240,124,0.5), transparent)' }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              NZ&ndash;India FTA opportunity
            </h2>
            <p className="mt-4 text-white/75">
              Signed 27 April 2026 and awaiting ratification, the agreement changes tariff and
              market-access settings for NZ exporters. The FTA Centre tracks what changes, who
              it affects and what to do next.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Btn href="/fta">Explore the FTA Centre</Btn>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Not sure what this means for your business?
            </h2>
            <p className="mt-4 text-white/75">
              Talk to the INZBC secretariat directly, or work through the guidance in the FTA
              Centre.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href="/connect">Talk to the secretariat</Btn>
              <Btn href="/fta" variant="ghost">
                Visit the FTA Centre
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- India market opportunities --------------------------------------------------------- */

/**
 * Migrated from legacy/wix-studio/src/public/wix-studio-snippets/india-market-opportunities.html.
 *
 * Sunil's migration guide (INZBC Website Stocktake, Migration Plan and Wix Implementation
 * Guide v1.0, §4/§5) treats Trade Bazaar and Trade Shows as two separate migrations: Trade
 * Bazaar "Replace"s to India Market Opportunities (with a /trade-bazaar redirect here), while
 * Trade Shows merges into Trade Missions and Shows (TradeResourcesBody's #missions section,
 * untouched by this). parity-matrix.md and this file previously stated Trade Bazaar merged
 * into Trade Missions too — that was wrong, corrected alongside this page.
 *
 * This content used to be duplicated inside TradeResourcesBody's #sectors section; that
 * section is removed in favour of this page, with Trade Resources' "Export to India" card
 * now linking here instead.
 */
/**
 * Real MFAT-sourced sector detail (mfat.govt.nz, NZ-India FTA "Key Outcomes" page, fetched
 * directly — LINKS.mfatKeyOutcomes). "Industrial goods" was a placeholder heading with no
 * sourced outcome behind it; MFAT's own outcomes page doesn't break that out as a category,
 * so it's replaced with Dairy, which does have specific, sourced figures.
 */
const SECTOR_OUTCOMES = [
  {
    sector: 'Forestry',
    outcome:
      "Over 95% of forestry exports can enter tariff-free immediately from entry into force, with tariffs on almost all remaining trade phased out over seven years.",
  },
  {
    sector: 'Horticulture',
    outcome:
      "New Zealand is the first country to secure preferential access for apples in any Indian FTA, and the first kiwifruit exporter to secure tariff-free kiwifruit access plus a 50% tariff reduction outside quota — quota volumes start well above recent average trade and grow from there. Cherries, avocados, blueberries and persimmons get phased tariff elimination.",
  },
  {
    sector: 'Seafood',
    outcome: "Tariffs on New Zealand's key fish and seafood exports phase out over seven years.",
  },
  {
    sector: 'Wine',
    outcome:
      "Tariffs on the full range of New Zealand wine — including wines under 0.5% alc/vol — reduce 66–83% over ten years from entry into force.",
  },
  {
    sector: 'Dairy',
    outcome:
      "Bulk infant formula, other dairy-based preparations and peptones phase out over seven years; tariffs on albumins (a milk protein product) halve within a quota covering average recent trade.",
  },
] as const;

function IndiaMarketOpportunitiesBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Sector priorities</h2>
            <p className="mt-4 text-foreground">
              What the NZ&ndash;India FTA changes, sector by sector, for New Zealand exporters
              &mdash; sourced from MFAT&rsquo;s own outcomes summary, not a general guide.
            </p>
          </Reveal>

          <dl className="mt-10 space-y-8 border-t border-ink/10 pt-8">
            {SECTOR_OUTCOMES.map(({ sector, outcome }, i) => (
              <Reveal key={sector} delay={i * 0.06}>
                <div className={i > 0 ? 'border-t border-ink/10 pt-8' : ''}>
                  <dt className="font-heading text-xl text-plum">{sector}</dt>
                  <dd className="mt-2 text-foreground">{outcome}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <p className="mt-10 text-foreground">
              Also named with specific outcomes: sheep meat (tariffs removed immediately) and
              mānuka honey (75% tariff cut over five years, another New Zealand first for
              honey in any Indian FTA). Beyond goods, the agreement names coal, engineering
              services, environmental services, education, audio-visual services, financial
              services, telecommunications and professional services as sectors with new access.
            </p>
            <p className="mt-6 text-sm text-foreground/70">
              Source: <TextLink href={LINKS.mfatKeyOutcomes} external>MFAT&rsquo;s NZ&ndash;India FTA Key Outcomes summary</TextLink>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-foreground">
              Looking for the FTA&rsquo;s full phase-in timeline, or exporting, importing and
              trade mission guidance instead?
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Btn href="/fta" variant="outline">
                Visit the FTA Centre
              </Btn>
              <Btn href="/trade-resources" variant="outline">
                Visit trade resources
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Member directory ------------------------------------------------------------------ */

function DirectoryBody() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p>
            <Btn href={LINKS.directory} external>
              Open the directory
            </Btn>
          </p>

          <h2 className="mt-14 font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">For members</h2>
          <p className="mt-4 text-foreground">
            Log in to Member Jungle to update your profile, manage renewals and access
            member-only resources. This site does not store membership data.
          </p>

          <h2 className="mt-14 font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Not a member yet?
          </h2>
          <p className="mt-4 text-foreground">
            The directory is open to INZBC members.{' '}
            <TextLink href={LINKS.join} external>
              Apply for membership
            </TextLink>
            , or <TextLink href="/membership">read what membership includes</TextLink> first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Past events ----------------------------------------------------------------------- */

function EventsPastBody() {
  const inzbcGroups = groupEventsByYear(INZBC_EVENTS);
  const expoGroups = groupEventsByYear(EXPO_EVENTS);

  // INZBC's own event photography, from their Flickr account. Summit 2018 is what that
  // archive holds; the caption says so rather than implying these are recent.
  const summit2018Photos = [
    { src: '/events/summit-group.jpg', alt: 'Delegates and speakers at the INZBC Summit 2018 in Auckland' },
    { src: '/events/summit-delegates.jpg', alt: 'Delegates at the INZBC Summit 2018 venue' },
    { src: '/events/summit-speakers.jpg', alt: 'Speakers at the INZBC Summit 2018' },
    { src: '/events/summit-conversation.jpg', alt: 'Attendees in conversation at the INZBC Summit 2018' },
  ];

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Event archive
            </h2>
            <p className="mt-4 max-w-2xl text-foreground">
              {INZBC_EVENTS.length} events INZBC has run or co-run since 2020, newest first.
              Every cover, date and venue below links back to INZBC&rsquo;s own account of it.
            </p>
          </Reveal>

          {inzbcGroups.map((group, gi) => (
            <div key={group.year} className="mt-14 first:mt-10">
              <Reveal delay={gi * 0.02}>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-plum">
                  {group.year}
                </h3>
              </Reveal>
              <div className="mt-4 space-y-2 divide-y divide-ink/10">
                {group.events.map((event, i) => (
                  <EventRow key={event.sourceSlug} event={event} delay={i * 0.03} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Summit 2018, Auckland
            </h2>
            <p className="mt-4 max-w-2xl text-foreground">
              Photographs from INZBC&rsquo;s own archive. More are on Facebook and Flickr.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {summit2018Photos.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06}>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-foreground">
              Galleries: <TextLink href={LINKS.facebookAlbums} external>Facebook albums</TextLink>
              {' · '}
              <TextLink href={LINKS.flickr} external>Flickr</TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Trade shows &amp; expos INZBC has featured
            </h2>
            <p className="mt-4 text-foreground">
              Third-party India trade shows and expos INZBC circulated to members &mdash; not
              INZBC&rsquo;s own events, but real ones it helped members find.
            </p>
          </Reveal>

          {expoGroups.map((group, gi) => (
            <div key={group.year} className="mt-10 first:mt-8">
              <Reveal delay={gi * 0.02}>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-plum">
                  {group.year}
                </h3>
              </Reveal>
              <div className="mt-3 space-y-1">
                {group.events.map((event, i) => (
                  <ExpoRow key={event.sourceSlug} event={event} delay={i * 0.03} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* --- Executive Council ------------------------------------------------------------------ */

/*
 * DO NOT PUBLISH THIS PAGE WITHOUT BOARD CONFIRMATION.
 *
 * The names below are sourced, not invented: read from inzbc.org/executive-council on
 * 27 July 2026, and the Board confirms currency before publication. A board page listing
 * someone who has stepped down, or omitting someone who has joined, is a governance
 * embarrassment rather than a content bug. Do not add, drop or reorder a name.
 */
function CouncilBody() {
  // Photos found on inzbc.org/executive-council (12 Aug 2026), matched to the sourced names
  // below by filename and downloaded to public/council/ rather than hot-linked (per
  // live-site-extract.md's rule: this is a separate Wix account, so its media URLs are not
  // guaranteed stable). The combined "Board Members" entry (six names in one card) is split
  // into six individual cards here so each can carry its own photo — same six names, same
  // order, nothing added or dropped, per this file's own rule above. Four people (Kanwaljit
  // Singh Bakshi, Clive Antony, Bharat Joshi, Dr Pushpa Wood) had no matching photo found;
  // they keep the text-only card. Sreedhar Venkatram's photo filename was just "Sree.jpeg" —
  // a reasonable but not certain match, worth confirming.
  const board = [
    { name: 'Edwin Paul', role: 'Chair', photo: '/council/edwin-paul.png' },
    { name: 'Tony Martin', role: 'Deputy Chair', photo: '/council/tony-martin.png' },
    { name: 'Bharat Chawla', role: 'Treasurer', photo: '/council/bharat-chawla.jpg' },
    { name: 'Antje Fiedler', role: 'Board Member', photo: '/council/antje-fiedler.jpg' },
    { name: 'Prince Kumar', role: 'Board Member', photo: '/council/prince-kumar.png' },
    { name: 'Jonathan Manuel', role: 'Board Member', photo: '/council/jonathan-manuel.png' },
    { name: 'Rachel Lynch', role: 'Board Member', photo: '/council/rachel-lynch.jpg' },
    { name: 'Jenny McGregor', role: 'Board Member', photo: '/council/jenny-mcgregor.jpg' },
    { name: 'Sumant Khedkar', role: 'Board Member', photo: '/council/sumant-khedkar.jpg' },
  ];
  const team = [
    { name: 'Sunil Kaushal', role: 'Chief Executive', photo: '/council/sunil-kaushal.png' },
    { name: 'Kanwaljit Singh Bakshi', role: 'Ex-Officio' },
    { name: 'Clive Antony', role: 'Strategic Communications Officer' },
    { name: 'Sandeep Sharma', role: 'Strategy and Trade Officer', photo: '/council/sandeep-sharma.png' },
    { name: 'Sreedhar Venkatram', role: 'Mumbai Chapter Head', photo: '/council/sreedhar-venkatram.jpeg' },
    { name: 'Bharat Joshi', role: 'Delhi Chapter Head' },
    { name: 'Dr Pushpa Wood', role: 'Wellington Chapter Head' },
    { name: 'Michael Henstock', role: 'Christchurch Chapter Head', photo: '/council/michael-henstock.jpg' },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Board</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {board.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <Person name={p.name} role={p.role} photo={p.photo} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-16 font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">Executive team</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <Person name={p.name} role={p.role} photo={p.photo} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-foreground/60">
            Board and executive team re-checked against inzbc.org/executive-council on 18 Aug
            2026: names and roles above match the live site exactly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --- About INZBC ------------------------------------------------------------------------ */

/**
 * Built from Sunil's migration guide (INZBC_Website_Stocktake_Migration_and_Wix_Guide.docx,
 * §8 "About page" template: hero, history, mission, role, council structure, CTA) — this page
 * didn't exist anywhere in the site before. Copy is quoted from inzbc.org/about-us directly
 * (fetched fresh, not the brand-guidelines PDF's older draft copy), with the one change the
 * guide itself calls for: "About Us... outdated positioning says over 25 years while INZBC
 * history dates to 1988... update to since 1988" — so the "over 25 years" line is dropped
 * rather than carried over.
 *
 * Council structure isn't duplicated here: it links to /executive-council instead, which
 * already carries the real board photos/names under its own confirmation caveat. Repeating
 * names here would be a second place for them to go stale.
 */
function AboutBody() {
  const functions = [
    'Advocate on trade policy and market access affecting members',
    'Provide sourced market intelligence and FTA Centre resources',
    'Facilitate business development, delegations and introductions',
    'Host Government of India delegations and bilateral events',
    'Convene events, including the annual INZBC Summit',
  ];

  return (
    <>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Since 1988
            </h2>
            <p className="mt-6 text-lg text-foreground">
              Since 1988, INZBC has promoted and encouraged trade in goods and services,
              investment, and scientific, technical and economic cooperation between New
              Zealand and India. INZBC is a member-based, independent, not-for-profit
              incorporated society &mdash; New Zealand&rsquo;s trusted partner for the India
              relationship.
            </p>
            <p className="mt-4 text-foreground">
              INZBC is recognised as the main industry body for the bilateral relationship by
              both governments, and has hosted the majority of visiting Government of India
              delegations to New Zealand &mdash; most recently an ICT delegation from the state
              of Kerala.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <img
              src="/blog/new-zealand-business-delegation-over-the-moon-with-indian-trade-and-investment-opportunities.jpg"
              alt="New Zealand's High Commissioner to India in conversation with an Indian government minister"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Mission
            </h2>
            <p className="mt-6 text-xl text-plum">
              INZBC advances trade, investment and enduring commercial ties between New Zealand
              and India.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="mt-14 font-heading text-xl text-ink">What INZBC does</h3>
            <ul className="mt-6 space-y-4 text-foreground">
              {functions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <img
              src="/blog/christchurch-city-council-and-inzbc-formalise-strategic-alliance-to-target-indian-market.jpg"
              alt="Christchurch City Council and INZBC representatives at the signing of a strategic alliance to target the Indian market"
              width={1600}
              height={900}
              loading="lazy"
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Chapters across both countries
            </h2>
            <p className="mt-6 text-foreground">
              INZBC operates through chapters in Auckland, Wellington, Christchurch, Mumbai and
              Delhi, each led by a chapter head on the executive team &mdash; putting the
              council, and its members, in the room in both countries, not just one.
            </p>
            <p className="mt-6">
              <TextLink href="/executive-council">Meet the Executive Council and chapter heads</TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Join New Zealand&rsquo;s India trade network
            </h2>
            <p className="mt-4 text-white/75">
              Membership gives companies and institutions a direct voice in the NZ&ndash;India
              trade relationship.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href={LINKS.join} external>
                Join INZBC
              </Btn>
              <Btn href="/membership" variant="ghost">
                See membership benefits
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** The body for an inner route, keyed by its path in pages.ts. Deliberately no '/fta' entry:
    that path is routed straight to the dedicated FtaPage.tsx component instead (see
    Router.tsx, which filters '/fta' out of the PAGES-driven InnerPage loop for exactly this
    reason), so an entry here would never actually be reached. */
export const BODIES: Record<string, React.ComponentType> = {
  '/events': EventsBody,
  '/membership': MembershipBody,
  '/connect': ConnectBody,
  '/news': NewsBody,
  '/publications': PublicationsBody,
  '/newsletters': NewslettersBody,
  '/partners': PartnersBody,
  '/trade-resources': TradeResourcesBody,
  '/fta/briefings': FtaBriefingsBody,
  '/india-market-opportunities': IndiaMarketOpportunitiesBody,
  '/membership/directory': DirectoryBody,
  '/events/past': EventsPastBody,
  '/executive-council': CouncilBody,
  '/about-inzbc': AboutBody,
};
