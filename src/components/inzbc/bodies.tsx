import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
} from 'lucide-react';
import { Reveal } from './motion';
import { ART, BENEFITS, LINKS } from './content';

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

/** A person tile for the council grid: a name and a role. */
function Person({ name, role }: { name: string; role: string }) {
  return (
    <div className="h-full rounded-2xl bg-mist p-6">
      <h3 className="font-heading text-lg text-ink">{name}</h3>
      <p className="mt-1 text-sm text-foreground">{role}</p>
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

/* --- NZ–India FTA Centre ------------------------------------------------------------- */

function FtaBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <img
              src={ART.heroBanner}
              alt="India New Zealand Business Council: connecting New Zealand and India since 1988. A container port, a New Zealand paddock and India Gate."
              loading="lazy"
              className="mb-12 w-full rounded-2xl"
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Card title="Status">
                <p>
                  Signed 27 April 2026. Awaiting domestic ratification before it enters into
                  force.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card title="Key tariff outcomes">
                <p>
                  57% duty-free from day one, rising to 82% once fully implemented, with the
                  remaining 13% under sharp cuts.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.12}>
              <Card title="Sector briefings">
                <p>
                  <Todo>
                    [[Sector briefings to be drafted. The priority sectors named so far are on
                    the trade resources page.]]
                  </Todo>{' '}
                  <TextLink href="/trade-resources">See trade resources</TextLink>
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.18}>
              <Card title="Official documents">
                <p>
                  The Ministry of Foreign Affairs and Trade&apos;s official page for the
                  agreement, including its status while it awaits ratification.
                </p>
                <p className="mt-3">
                  <TextLink href={LINKS.mfatFta} external>
                    MFAT: New Zealand–India FTA
                  </TextLink>
                </p>
              </Card>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xs text-foreground/70">
              Tariff figures sourced from MFAT&rsquo;s NZ&ndash;India FTA outcomes summary.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-deep px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
              Not sure what this means for your business?
            </h2>
            <p className="mt-4 text-white/75">
              The FTA Opportunity Explainer gives a sector-specific answer.{' '}
              <Todo>
                [[The Explainer tool is not part of this build yet &mdash; it needs its app
                deployed and a route here.]]
              </Todo>{' '}
              Until then, talk to the INZBC secretariat directly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href="/connect">Talk to the secretariat</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Events -------------------------------------------------------------------------- */

function EventsBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Upcoming events</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              <Todo>
                [[Event listings &mdash; title, date, venue and a register link for each.
                Needs the event data source decided: Wix Events, or an external system.]]
              </Todo>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Card title="INZBC Summit">
                <p>
                  The annual summit has its own site with dates, venue and registration.{' '}
                  <Todo>[[Date and venue for the next Summit to confirm.]]</Todo>
                </p>
                <p className="mt-5">
                  <Btn href={LINKS.summitSite} external>
                    Visit the summit website
                  </Btn>
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card title="Briefings and delegations">
                <p>
                  Sector briefings, delegations and networking are announced to members and
                  subscribers first.
                </p>
                <p className="mt-5">
                  <Btn href={LINKS.subscribe} external>
                    Subscribe for announcements
                  </Btn>
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Past events</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              Reports, recordings and photographs from previous INZBC events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/events/past" variant="outline">
                Browse past events
              </Btn>
            </div>
            <p className="mt-6 text-sm text-foreground">
              Galleries: <TextLink href={LINKS.facebookAlbums} external>Facebook albums</TextLink>
              {' · '}
              <TextLink href={LINKS.flickr} external>Flickr</TextLink>
            </p>
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
 * snippet's own comment). No dedicated "network" photo exists in ART, and the general rule
 * for this pass is not to reintroduce parallax, so the band is a plain dark surface rather
 * than member-network.html's parallax photo treatment.
 */
function MembershipBody() {
  const reasons = [
    ['Advocacy', 'A direct voice with government on trade policy and market access affecting NZ–India trade.'],
    ['Market intelligence', 'The Trade Intelligence Digest and FTA sector briefings, human-reviewed before publication.'],
    ['Networks', 'Business development, delegations and introductions across the NZ–India corridor.'],
    ['Events', 'From sector briefings to the annual INZBC Summit.'],
  ] as const;

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-heading text-3xl text-ink md:text-4xl">
              Why members join
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <Card title={title}>
                  <p>{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Membership tiers</h2>
            <p className="mt-4 text-foreground">
              <Todo>
                [[New fee structure from 1 Jan 2026 &mdash; request final tiers/pricing from
                INZBC before publish.]]
              </Todo>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href={LINKS.join} external>
                See membership options
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">The network</p>
              <h2 className="font-heading text-3xl text-white md:text-4xl">
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
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Member directory</h2>
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
            <h2 className="font-heading text-3xl text-ink md:text-4xl">What happens next</h2>
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

      <section className="bg-deep px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
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
  const socials = [
    { name: 'LinkedIn', href: LINKS.linkedin },
    { name: 'Facebook', href: LINKS.facebook },
    { name: 'YouTube', href: LINKS.youtube },
    { name: 'X', href: LINKS.x },
    { name: 'Flickr', href: LINKS.flickr },
  ];

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Contact</h2>
            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="font-semibold text-ink">Chief Executive</dt>
                <dd className="text-foreground">
                  Sunil Kaushal
                  <br />
                  <TextLink href={LINKS.email}>Secretariat@inzbc.org</TextLink>
                </dd>
                {/* Live inzbc.org/connect currently shows different titles/contacts entirely
                    ("General Manager: Sunil Kaushal, Gm@inzbc.org, +64 9 574 5220" and a
                    second contact, "Edwin Paul, Chair@inzbc.org"). Not changing the sourced
                    Sunil/Secretariat details above — flagging the conflict instead, same
                    treatment as the postal address conflict. */}
                <p className="mt-2 text-xs text-foreground/70">
                  <Todo>
                    [[Contact title/email inconsistency on live site &mdash; confirm current
                    correct details with Sunil]]
                  </Todo>
                </p>
              </div>
              <div>
                <dt className="font-semibold text-ink">Postal address</dt>
                <dd className="text-foreground">
                  PO Box 26061
                  <br />
                  Glen Eden
                  <br />
                  Auckland 0641
                  <br />
                  New Zealand
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-foreground">
              Email is the preferred way to reach the secretariat.
            </p>

            <h3 className="mt-10 font-heading text-xl text-ink">Follow INZBC</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.name}>
                  <TextLink href={s.href} external>
                    {s.name}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-mist p-8">
              <h2 className="font-heading text-2xl text-ink">Send a message</h2>
              <p className="mt-3 text-sm text-foreground">
                <Todo>
                  [[Contact form &mdash; needs a Wix Form so submissions reach the
                  Secretariat inbox. Fields: First name, Last name, Email, Subject, Message.
                  A form posting nowhere is worse than none, so this links to email until it
                  exists.]]
                </Todo>
              </p>
              <p className="mt-7">
                <Btn href={LINKS.email}>Email the secretariat</Btn>
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
          standard glyphs. */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center font-heading text-3xl text-ink md:text-4xl">
              Follow INZBC
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { name: 'Twitter', Icon: TwitterIcon, href: LINKS.x, label: 'Follow us on Twitter', bg: 'bg-navy' },
              { name: 'LinkedIn', Icon: LinkedinIcon, href: LINKS.linkedin, label: 'Connect with us on LinkedIn', bg: 'bg-plum' },
              { name: 'YouTube', Icon: YoutubeIcon, href: LINKS.youtube, label: 'Watch our videos on YouTube', bg: 'bg-forest' },
              { name: 'Facebook', Icon: FacebookIcon, href: LINKS.facebook, label: 'Find us on Facebook', bg: 'bg-ink' },
            ].map((social, i) => (
              <Reveal key={social.name} delay={i * 0.06}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-4 rounded-sm ${FOCUS}`}
                >
                  <span
                    className={`flex h-24 w-24 items-center justify-center rounded-[60%_40%_30%_70%/60%_30%_70%_40%] transition-transform duration-300 group-hover:scale-105 group-hover:rounded-[40%_60%_70%_30%/50%_60%_30%_50%] ${social.bg}`}
                  >
                    <social.Icon aria-hidden="true" size={30} strokeWidth={1.8} className="text-white" />
                  </span>
                  <span className="text-center text-sm font-medium text-ink">{social.label}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fallback for where the live Twitter/Facebook feed boxes would go on the reference.
          Not building the real embeds: no browser access this session to verify either
          renders, and X's timeline widget specifically has a documented reliability problem
          industry-wide since 2023, independent of implementation. A verifiable static link
          beats an unverifiable live one. Same blob treatment as the row above, same colours
          per platform (navy for Twitter, ink for Facebook), just larger. */}
      <section className="bg-mist px-6 py-20">
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {[
            { name: 'Twitter', Icon: TwitterIcon, href: LINKS.x, bg: 'bg-navy' },
            { name: 'Facebook', Icon: FacebookIcon, href: LINKS.facebook, bg: 'bg-ink' },
          ].map((social, i) => (
            <Reveal key={social.name} delay={i * 0.08}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-5 rounded-2xl bg-white p-10 text-center shadow-sm transition-shadow hover:shadow-md ${FOCUS}`}
              >
                <span
                  className={`flex h-32 w-32 items-center justify-center rounded-[60%_40%_30%_70%/60%_30%_70%_40%] transition-transform duration-300 group-hover:scale-105 group-hover:rounded-[40%_60%_70%_30%/50%_60%_30%_50%] ${social.bg}`}
                >
                  <social.Icon aria-hidden="true" size={40} strokeWidth={1.8} className="text-white" />
                </span>
                <span>
                  <span className="block font-heading text-lg text-ink">Follow us on {social.name}</span>
                  <span className="mt-1 block text-sm text-plum">View our latest posts</span>
                </span>
              </a>
            </Reveal>
          ))}
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
              across the NZ&ndash;India corridor.
            </p>
            <p className="mt-4 text-sm text-foreground">
              <Todo>
                [[Sponsorship tiers and what each includes &mdash; confirm with INZBC before
                publish.]]
              </Todo>
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
  // The same three posts the homepage carries. The third summary is still owed by INZBC.
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
      body: null,
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

      <section className="bg-ink px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
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

function PublicationsBody() {
  const pubs = [
    {
      cover: ART.reportCover,
      alt: 'Cover of Grow With India, the New Zealand India Trade Report 2025',
      title: 'Grow With India',
      sub: 'The New Zealand India Trade Report 2025',
      body: 'Where the trade relationship stands and where it can go.',
      href: LINKS.reportIssuu,
    },
    {
      cover: ART.kiaOraCover,
      alt: 'Cover of Kia Ora India, the INZBC magazine',
      title: 'Kia Ora India',
      sub: 'The INZBC magazine',
      body: 'Member businesses and the people moving between the two markets.',
      href: LINKS.kiaOraIssuu,
    },
  ];

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">India Report</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              <Todo>
                [[Confirm which India Report editions carry over. The April 2023 edition is
                referenced on the old trade page.]]
              </Todo>
            </p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {pubs.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 0.08}>
                <article className="flex gap-6">
                  <img
                    src={pub.cover}
                    alt={pub.alt}
                    loading="lazy"
                    className="h-auto w-28 flex-none rounded-lg shadow-lg md:w-36"
                  />
                  <div>
                    <h3 className="font-heading text-2xl text-ink">{pub.title}</h3>
                    <p className="mt-1 text-sm text-plum">{pub.sub}</p>
                    <p className="mt-3 text-sm text-foreground">{pub.body}</p>
                    <p className="mt-5">
                      <Btn href={pub.href} external>
                        Read on Issuu
                      </Btn>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <article className="rounded-2xl bg-mist p-7">
                <h3 className="font-heading text-xl text-ink">India Report 2.0</h3>
                <p className="mt-2 text-sm text-foreground">
                  <Todo>
                    [[Description, date and file &mdash; confirm with INZBC before publish.]]
                  </Todo>
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
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
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Kia Ora India</h2>
            <div className="mt-6 flex gap-6">
              <img
                src={ART.kiaOraCover}
                alt="Cover of Kia Ora India, the INZBC magazine"
                loading="lazy"
                className="h-auto w-28 flex-none rounded-lg shadow-lg md:w-36"
              />
              <div>
                <p className="text-foreground">
                  The INZBC magazine: member businesses and the people moving between the two
                  markets.
                </p>
                <p className="mt-3 text-sm text-foreground">
                  <Todo>
                    [[Cadence to confirm &mdash; the old site describes Kia Ora India as
                    quarterly with a December 2023 latest issue.]]
                  </Todo>
                </p>
                <p className="mt-5">
                  <Btn href={LINKS.kiaOraIssuu} external>
                    Read the December 2023 edition
                  </Btn>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-16 font-heading text-3xl text-ink md:text-4xl">
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

          <Reveal delay={0.12}>
            <h2 className="mt-16 font-heading text-3xl text-ink md:text-4xl">
              Newsletter archive
            </h2>
            <p className="mt-4 text-foreground">
              <Todo>
                [[Newsletter archive link &mdash; confirm where the archive is hosted. The old
                Mailchimp list was retired; EmailOctopus is the current list.]]
              </Todo>
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
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Who INZBC works with</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              Strategic partners, associate partners, and government and industry stakeholders
              across both markets. The wall below is INZBC&rsquo;s current tiered lineup.
            </p>
            <p className="mt-4 max-w-2xl text-sm text-foreground">
              <Todo>
                [[Individual partner links &mdash; the wall is a single image today. Splitting
                it into linked logos needs each partner&rsquo;s URL and a logo file.]]
              </Todo>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <img
              src={ART.partnerStrip}
              alt="INZBC partners and supporters: BNZ and Zespri as strategic partners; Fonterra as partner; Slumberzone, Auckland Institute of Studies and NZ Trade Aid as associate partners; and government and industry stakeholders including the Ministry of Foreign Affairs and Trade, New Zealand Trade and Enterprise, the High Commission of India, Business Canterbury, BusinessNZ and ExportNZ."
              loading="lazy"
              className="mt-10 w-full"
            />
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 text-sm text-foreground">
              <Todo>
                [[India Industry Partners row &mdash; FICCI, CII, PHD Chamber and others
                appear on the old site as a separate strip. Supply the logo files and links.]]
              </Todo>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-plum px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">Partner with INZBC</h2>
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
              <Todo>
                [[Sponsorship tiers and what each includes &mdash; confirm with INZBC before
                publish.]]
              </Todo>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* --- Trade resources ------------------------------------------------------------------ */

function TradeResourcesBody() {
  const cards = [
    {
      title: 'Export to India',
      body: 'A practical guide for NZ businesses preparing to export, build partnerships and use FTA opportunities.',
      href: '/india-market-opportunities',
      label: 'Explore sectors',
    },
    {
      title: 'Import from India',
      body: 'Guidance for NZ businesses sourcing products and services from India under the evolving trade relationship.',
      href: '#missions',
      label: 'See suppliers',
    },
    {
      title: 'Trade missions and shows',
      body: 'Delegations, trade shows and market events merged into one pathway.',
      href: '#missions',
      label: 'View missions',
    },
    {
      title: 'Market intelligence',
      body: 'The Trade Intelligence Digest, human-reviewed before publication.',
      href: '#intelligence',
      label: 'Read the digest',
    },
  ] as const;

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <Card title={card.title}>
                  <p>{card.body}</p>
                  <p className="mt-4">
                    {/* TextLink assumes a non-"/" href is external and opens a new tab, wrong
                        for the two in-page "#missions"/"#intelligence" anchors here, so this
                        stays a plain Link/anchor split rather than reusing that helper. */}
                    {card.href.startsWith('/') ? (
                      <Link to={card.href} className={`rounded-sm font-medium text-plum underline ${FOCUS}`}>
                        {card.label}
                      </Link>
                    ) : (
                      <a href={card.href} className={`rounded-sm font-medium text-plum underline ${FOCUS}`}>
                        {card.label}
                      </a>
                    )}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="missions" className="scroll-mt-24 bg-mist px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">
              Trade missions and shows
            </h2>
            <p className="mt-4 text-foreground">
              Delegations, trade shows and market events that connect New Zealand and Indian
              businesses.
            </p>
            <p className="mt-4 text-foreground">
              <Todo>
                [[Current trade mission/show listings to confirm &mdash; this merges the
                former &ldquo;Trade Shows&rdquo; page per the migration plan.]]
              </Todo>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="intelligence" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Market intelligence</h2>
            <p className="mt-4 text-foreground">
              The Trade Intelligence Digest is a weekly, LLM-summarised, human-reviewed digest
              of India&ndash;NZ trade news, with source citations.
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

      <section className="bg-navy px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-3xl text-white md:text-4xl">
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

      <section className="bg-deep px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
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
function IndiaMarketOpportunitiesBody() {
  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Sector priorities</h2>
            <p className="mt-4 max-w-2xl text-foreground">
              <Todo>
                [[Sector-specific guidance &mdash; forestry, horticulture, seafood, wine and
                industrial goods are flagged as priority sectors for tariff outcomes content;
                the full guide is still to be drafted.]]
              </Todo>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {['Forestry', 'Horticulture', 'Seafood', 'Wine', 'Industrial goods'].map(
              (sector, i) => (
                <Reveal key={sector} delay={i * 0.06}>
                  <Card title={sector}>
                    <p>
                      <Todo>[[FTA outcome summary]]</Todo>
                    </p>
                  </Card>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-foreground">
              Looking for exporting, importing or trade mission guidance instead?
            </p>
            <div className="mt-6 flex justify-center">
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

          <h2 className="mt-14 font-heading text-3xl text-ink md:text-4xl">For members</h2>
          <p className="mt-4 text-foreground">
            Log in to Member Jungle to update your profile, manage renewals and access
            member-only resources. This site does not store membership data.
          </p>

          <h2 className="mt-14 font-heading text-3xl text-ink md:text-4xl">
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
  // INZBC's own event photography, from their Flickr account. Summit 2018 is what that
  // archive holds; the caption says so rather than implying these are recent.
  const photos = [
    { src: '/events/summit-group.jpg', alt: 'Delegates and speakers at the INZBC Summit 2018 in Auckland' },
    { src: '/events/summit-delegates.jpg', alt: 'Delegates at the INZBC Summit 2018 venue' },
    { src: '/events/summit-speakers.jpg', alt: 'Speakers at the INZBC Summit 2018' },
    { src: '/events/summit-conversation.jpg', alt: 'Attendees in conversation at the INZBC Summit 2018' },
  ];

  return (
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">Event archive</h2>
            <p className="mt-4 text-foreground">
              <Todo>
                [[Confirm which past event reports (2017&ndash;2021) carry over. Link to
                recordings, summaries and photo galleries.]]
              </Todo>
            </p>
            <ul className="mt-6 space-y-3 text-foreground">
              {[0, 1, 2].map((n) => (
                <li key={n}>
                  <strong>
                    <Todo>[[Event name, year]]</Todo>
                  </strong>{' '}
                  &mdash; <Todo>[[one-line outcome]]</Todo>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-3xl text-ink md:text-4xl">
              Summit 2018, Auckland
            </h2>
            <p className="mt-4 max-w-2xl text-foreground">
              Photographs from INZBC&rsquo;s own archive. More are on Facebook and Flickr.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {photos.map((p, i) => (
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
  const board = [
    { name: 'Edwin Paul', role: 'Chair' },
    { name: 'Tony Martin', role: 'Deputy Chair' },
    { name: 'Bharat Chawla', role: 'Treasurer' },
    {
      name: 'Antje Fiedler, Prince Kumar, Jonathan Manuel, Rachel Lynch, Jenny McGregor, Sumant Khedkar',
      role: 'Board Members',
    },
  ];
  const team = [
    { name: 'Sunil Kaushal', role: 'Chief Executive' },
    { name: 'Kanwaljit Singh Bakshi', role: 'Ex-Officio' },
    { name: 'Clive Antony', role: 'Strategic Communications Officer' },
    { name: 'Sandeep Sharma', role: 'Strategy and Trade Officer' },
    { name: 'Sreedhar Venkatram', role: 'Mumbai Chapter Head' },
    { name: 'Bharat Joshi', role: 'Delhi Chapter Head' },
    { name: 'Dr Pushpa Wood', role: 'Wellington Chapter Head' },
    { name: 'Michael Henstock', role: 'Christchurch Chapter Head' },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-3xl text-ink md:text-4xl">Board</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {board.map((p, i) => (
            <Reveal key={p.role} delay={i * 0.06}>
              <Person name={p.name} role={p.role} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-16 font-heading text-3xl text-ink md:text-4xl">Executive team</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <Person name={p.name} role={p.role} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-foreground">
            <Todo>
              [[Proposed &mdash; read from inzbc.org 27 Jul 2026; pending INZBC confirmation
              before publish.]]
            </Todo>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** The body for an inner route, keyed by its path in pages.ts. */
export const BODIES: Record<string, React.ComponentType> = {
  '/fta': FtaBody,
  '/events': EventsBody,
  '/membership': MembershipBody,
  '/connect': ConnectBody,
  '/news': NewsBody,
  '/publications': PublicationsBody,
  '/newsletters': NewslettersBody,
  '/partners': PartnersBody,
  '/trade-resources': TradeResourcesBody,
  '/india-market-opportunities': IndiaMarketOpportunitiesBody,
  '/membership/directory': DirectoryBody,
  '/events/past': EventsPastBody,
  '/executive-council': CouncilBody,
};
