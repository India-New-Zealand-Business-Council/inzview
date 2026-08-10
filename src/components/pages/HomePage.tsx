import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Globe2,
  Mail,
  Menu,
  UsersRound,
  X,
} from 'lucide-react';
import { ART, BENEFITS, LINKS, SOCIALS, STATS } from '@/components/inzbc/content';
import './HomePage.css';

/**
 * INZBC homepage.
 *
 * This file deliberately owns its visual and motion system. Inner routes retain their
 * established shell while the homepage can be art-directed as one editorial experience.
 * Every [[...]] marker remains visible until INZBC supplies the missing fact or asset.
 */

const HOME_NAV = [
  { label: 'The FTA', href: '/fta' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
  { label: 'Intelligence', href: '/publications' },
  { label: 'Connect', href: '/connect' },
] as const;

const HOME_PATHWAYS = [
  {
    number: '01',
    title: 'Understand the FTA',
    body: 'The agreement, its status and the implications for New Zealand businesses.',
    href: '/fta',
    icon: Globe2,
    featured: true,
  },
  {
    number: '02',
    title: 'Enter the network',
    body: 'Advocacy, introductions, market intelligence and a bilateral member community.',
    href: '/membership',
    icon: UsersRound,
    featured: false,
  },
  {
    number: '03',
    title: 'Meet the market',
    body: 'Briefings, delegations, networking and the annual INZBC Summit.',
    href: '/events',
    icon: CalendarDays,
    featured: false,
  },
  {
    number: '04',
    title: 'Read the relationship',
    body: 'Reports, news, magazines and trade intelligence from both sides of the corridor.',
    href: '/publications',
    icon: BookOpenText,
    featured: false,
  },
] as const;

const HOME_STATS = [
  {
    figure: STATS[0].figure,
    label: STATS[0].label,
    note: 'Year ended December 2025.',
  },
  {
    figure: STATS[1].figure,
    label: STATS[1].label,
    note: 'Receiving tariff elimination or reduction.',
  },
  {
    figure: STATS[2].figure,
    label: STATS[2].label,
    note: "At the agreement's entry into force.",
  },
] as const;

const EVENT_PHOTOS = [
  {
    src: '/events/summit-group.jpg',
    alt: 'Delegates and speakers at the INZBC Summit 2018 in Auckland',
  },
  {
    src: '/events/summit-speakers.jpg',
    alt: 'Speakers at the INZBC Summit 2018 in Auckland',
  },
  {
    src: '/events/summit-conversation.jpg',
    alt: 'Attendees in conversation at the INZBC Summit 2018 in Auckland',
  },
] as const;

function Todo({ children }: { children: React.ReactNode }) {
  return <mark className="home-todo">{children}</mark>;
}

function Action({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline-dark' | 'outline-light' | 'text';
  className?: string;
}) {
  const classes = `home-action home-action--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {variant === 'text' ? (
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
      ) : (
        <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
      )}
    </>
  );

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  const isWebLink = href.startsWith('http');
  return (
    <a
      href={href}
      className={classes}
      {...(isWebLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`home-eyebrow${light ? ' home-eyebrow--light' : ''}`}>{children}</p>;
}

function HomeReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`home-reveal ${className}`.trim()}>{children}</div>;
}

function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menuOpen) return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="home-header">
      <div className="home-header__bar">
        <Link to="/" className="home-logo-link home-focus-light" aria-label="INZBC home">
          <img
            src={ART.logo}
            width="400"
            height="114"
            alt="India New Zealand Business Council"
            className="home-logo"
          />
        </Link>

        <nav className="home-nav" aria-label="Primary navigation">
          {HOME_NAV.map((item) => (
            <Link key={item.href} to={item.href} className="home-nav__link home-focus-light">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={LINKS.join}
          target="_blank"
          rel="noopener noreferrer"
          className="home-header__join home-focus-light"
        >
          Join INZBC
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
        </a>

        <div className="home-mobile-menu">
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="home-mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
            className="home-mobile-menu__trigger home-focus-light"
          >
            <span>Menu</span>
            {menuOpen ? (
              <X aria-hidden="true" size={20} />
            ) : (
              <Menu aria-hidden="true" size={20} />
            )}
          </button>
          <div
            id="home-mobile-navigation"
            className="home-mobile-menu__panel"
            hidden={!menuOpen}
          >
            <nav aria-label="Mobile navigation">
              {HOME_NAV.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className="home-mobile-menu__link home-focus-light"
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  {item.label}
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </Link>
              ))}
            </nav>
            <a
              href={LINKS.join}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="home-mobile-menu__cta home-focus-light"
            >
              Join INZBC
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__grid" aria-hidden="true" />
      <div className="home-shell home-hero__layout">
        <div className="home-hero__copy">
          <div className="home-hero__status">
            <span className="home-hero__status-dot" aria-hidden="true" />
            FTA signed 27 April 2026
            <span aria-hidden="true">/</span>
            Ratification pending
          </div>
          <Eyebrow light>India &ndash; New Zealand trade since 1988</Eyebrow>
          <h1 id="home-hero-title" className="home-display home-hero__title">
            New Zealand&rsquo;s gateway to the India opportunity.
          </h1>
          <p className="home-hero__lede">
            INZBC connects exporters, investors, institutions and government across the
            NZ&ndash;India trade relationship &mdash; with the intelligence and access to move
            from interest to action.
          </p>
          <div className="home-hero__actions">
            <Action href="/fta">Explore the FTA</Action>
            <Action href={LINKS.join} variant="outline-light">
              Join the council
            </Action>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-wrap">
            <img
              src={ART.heroPhoto}
              alt="Auckland city skyline and harbour"
              loading="eager"
              fetchPriority="high"
              className="home-hero__image"
            />
            <div className="home-hero__image-shade" aria-hidden="true" />
            <svg
              aria-hidden="true"
              className="home-hero__route"
              viewBox="0 0 540 300"
              fill="none"
              focusable="false"
            >
              <path d="M42 240C166 245 210 74 356 83C420 87 455 126 500 55" />
              <circle cx="42" cy="240" r="5" />
              <circle cx="500" cy="55" r="5" />
            </svg>
            <div className="home-hero__route-label home-hero__route-label--start">
              New Zealand
            </div>
            <div className="home-hero__route-label home-hero__route-label--end">India</div>
          </div>
          <div className="home-hero__year-card">
            <span>Established</span>
            <strong>1988</strong>
          </div>
          <div className="home-hero__caption">
            <span>Bilateral trade</span>
            <span aria-hidden="true">NZ &harr; India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>
      <HomeHeader />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <section className="home-proof" aria-label="INZBC at a glance">
          <div className="home-shell home-proof__grid">
            <div className="home-proof__item">
              <span className="home-proof__index">01</span>
              <p>Established</p>
              <strong>1988</strong>
            </div>
            <div className="home-proof__item">
              <span className="home-proof__index">02</span>
              <p>Recognised by</p>
              <strong>New Zealand and India</strong>
            </div>
            <div className="home-proof__item">
              <span className="home-proof__index">03</span>
              <p>Member network</p>
              <strong>
                <Todo>[[member count &mdash; confirm with INZBC]]</Todo>
              </strong>
            </div>
          </div>
        </section>

        <section className="home-intro home-section">
          <div className="home-shell home-intro__layout">
            <HomeReveal>
              <Eyebrow>Why INZBC</Eyebrow>
              <h2 className="home-heading home-intro__title">
                The relationship is moving. Be in the room where it becomes practical.
              </h2>
            </HomeReveal>
            <HomeReveal className="home-intro__copy">
              <p className="home-lede-dark">
                New Zealand&rsquo;s leading India trade and FTA platform, connecting business,
                government and investors since 1988.
              </p>
              <p>
                Members gain trade intelligence, policy access and the business networks to
                engage with confidence across both countries.
              </p>
              <Action href="/executive-council" variant="text">
                Meet the executive council
              </Action>
            </HomeReveal>
          </div>
          <div className="home-shell home-capabilities">
            {[
              ['Advocate', 'Trade policy and market access'],
              ['Interpret', 'Market intelligence and FTA insight'],
              ['Connect', 'Businesses across both countries'],
            ].map(([title, body], index) => (
              <HomeReveal key={title} className="home-capability">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </HomeReveal>
            ))}
          </div>
        </section>

        <section className="home-pathways home-section" aria-labelledby="pathways-title">
          <div className="home-shell">
            <HomeReveal className="home-section-head">
              <div>
                <Eyebrow>Your starting point</Eyebrow>
                <h2 id="pathways-title" className="home-heading">
                  One relationship. Four ways in.
                </h2>
              </div>
              <p>
                Start with the question in front of you. The council connects each pathway
                to the wider bilateral opportunity.
              </p>
            </HomeReveal>

            <div className="home-pathways__grid">
              {HOME_PATHWAYS.map((item) => {
                const Icon = item.icon;
                return (
                  <HomeReveal key={item.href}>
                    <Link
                      to={item.href}
                      className={`home-pathway home-focus-dark${
                        item.featured ? ' home-pathway--featured' : ''
                      }`}
                    >
                      <div className="home-pathway__top">
                        <span>{item.number}</span>
                        <Icon aria-hidden="true" size={28} strokeWidth={1.45} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                      <span className="home-pathway__link">
                        Explore
                        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                      </span>
                    </Link>
                  </HomeReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="home-fta home-section" aria-labelledby="fta-title">
          <div className="home-fta__orb" aria-hidden="true" />
          <div className="home-shell">
            <HomeReveal className="home-fta__head">
              <div>
                <Eyebrow light>The new operating context</Eyebrow>
                <h2 id="fta-title" className="home-heading home-heading--light">
                  A signed agreement. A new field of possibility.
                </h2>
              </div>
              <div className="home-fta__status-card">
                <span>Current status</span>
                <strong>Signed, not yet in force</strong>
                <p>Awaiting domestic ratification in both countries.</p>
              </div>
            </HomeReveal>

            <div className="home-fta__summary">
              <p>
                <Todo>
                  [[FTA summary copy &mdash; pull from the FTA Overview page once drafted.]]
                </Todo>
              </p>
              <Action href="/fta">Understand the agreement</Action>
            </div>

            <div className="home-fta__stats">
              {HOME_STATS.map((stat, index) => (
                <div key={stat.label} className="home-stat">
                  <span className="home-stat__index">0{index + 1}</span>
                  <strong>{stat.figure}</strong>
                  <h3>{stat.label}</h3>
                  <p>{stat.note}</p>
                </div>
              ))}
            </div>
            <p className="home-fta__source">
              Source: MFAT&rsquo;s National Interest Analysis.
            </p>
          </div>
        </section>

        <section className="home-events home-section" aria-labelledby="events-title">
          <div className="home-shell home-events__layout">
            <HomeReveal className="home-events__copy">
              <Eyebrow>Make connections</Eyebrow>
              <h2 id="events-title" className="home-heading">
                The bilateral relationship is built face to face.
              </h2>
              <p className="home-lede-dark">
                INZBC brings specialists, ministers, NZTE, MFAT and the business community
                together for meaningful dialogue.
              </p>
              <p>Be seen in the right place, at the right time and in the right company.</p>
              <div className="home-events__actions">
                <Action href="/events">View events</Action>
                <Action href="/events/past" variant="outline-dark">
                  Event reports
                </Action>
              </div>
              <a
                href={LINKS.summitSite}
                target="_blank"
                rel="noopener noreferrer"
                className="home-summit-link home-focus-dark"
              >
                <span>
                  <small>Annual flagship</small>
                  INZBC Summit
                </span>
                <ArrowUpRight aria-hidden="true" size={20} />
              </a>
            </HomeReveal>

            <HomeReveal className="home-events__gallery">
              <figure className="home-events__photo home-events__photo--main">
                <img
                  src={EVENT_PHOTOS[0].src}
                  alt={EVENT_PHOTOS[0].alt}
                  width="1024"
                  height="683"
                  loading="lazy"
                />
              </figure>
              <figure className="home-events__photo home-events__photo--small-one">
                <img
                  src={EVENT_PHOTOS[1].src}
                  alt={EVENT_PHOTOS[1].alt}
                  width="1024"
                  height="683"
                  loading="lazy"
                />
              </figure>
              <figure className="home-events__photo home-events__photo--small-two">
                <img
                  src={EVENT_PHOTOS[2].src}
                  alt={EVENT_PHOTOS[2].alt}
                  width="1024"
                  height="683"
                  loading="lazy"
                />
              </figure>
              <p className="home-events__gallery-caption">INZBC Summit 2018, Auckland</p>
            </HomeReveal>
          </div>
        </section>

        <section className="home-membership home-section" aria-labelledby="membership-title">
          <div className="home-membership__line" aria-hidden="true" />
          <div className="home-shell home-membership__layout">
            <HomeReveal className="home-membership__copy">
              <Eyebrow light>The network</Eyebrow>
              <h2 id="membership-title" className="home-heading home-heading--light">
                Access is useful. The right access changes outcomes.
              </h2>
              <p>
                Meet exporters, importers, investors, universities and government agencies
                working across the corridor.
              </p>
              <div className="home-membership__actions">
                <Action href="/membership/directory">Explore the directory</Action>
                <Action href={LINKS.join} variant="outline-light">
                  Become a member
                </Action>
              </div>
            </HomeReveal>
            <div className="home-membership__benefits">
              {BENEFITS.map(([lead, rest], index) => (
                <HomeReveal key={lead} className="home-benefit">
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{lead}</h3>
                    <p>{rest}</p>
                  </div>
                </HomeReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="home-intelligence home-section" aria-labelledby="intelligence-title">
          <div className="home-shell">
            <HomeReveal className="home-section-head home-section-head--wide">
              <div>
                <Eyebrow>Intelligence for the corridor</Eyebrow>
                <h2 id="intelligence-title" className="home-heading">
                  Read what is changing &mdash; and what it means.
                </h2>
              </div>
              <Action href="/publications" variant="outline-dark">
                All publications
              </Action>
            </HomeReveal>

            <div className="home-intelligence__grid">
              <HomeReveal className="home-publication home-publication--report">
                <div className="home-publication__cover">
                  <img
                    src={ART.reportCover}
                    alt="Cover of Grow With India, the New Zealand India Trade Report 2025"
                    loading="lazy"
                  />
                </div>
                <div className="home-publication__copy">
                  <span className="home-card-kicker">Flagship report / 2025</span>
                  <h3>Grow With India</h3>
                  <p>The New Zealand India Trade Report: where the relationship stands and where it can go.</p>
                  <Action href={LINKS.reportIssuu} variant="text">
                    Read the report
                  </Action>
                </div>
              </HomeReveal>

              <HomeReveal className="home-publication home-publication--magazine">
                <div className="home-publication__copy">
                  <span className="home-card-kicker">The INZBC magazine</span>
                  <h3>Kia Ora India</h3>
                  <p>Member businesses and the people moving between the two markets.</p>
                  <Action href={LINKS.kiaOraIssuu} variant="text">
                    Open the magazine
                  </Action>
                </div>
                <div className="home-publication__cover">
                  <img
                    src={ART.kiaOraCover}
                    alt="Cover of Kia Ora India, the INZBC magazine"
                    loading="lazy"
                  />
                </div>
              </HomeReveal>

              <div className="home-news-card">
                <img
                  src={ART.ftaNewEra}
                  alt="Delegation photograph accompanying an INZBC FTA article"
                  loading="lazy"
                />
                <div className="home-news-card__copy">
                  <span className="home-card-kicker">Latest insight</span>
                  <h3>INZBC welcomes the landmark agreement</h3>
                  <p>
                    <Todo>[[Article summary &mdash; confirm with INZBC.]]</Todo>
                  </p>
                  <Action href="/news" variant="text">
                    View all news
                  </Action>
                </div>
              </div>
            </div>

            <p className="home-advertise-note">
              Kia Ora India carries advertising.{' '}
              <a href={`${LINKS.email}?subject=Advertising%20enquiry`} className="home-focus-dark">
                Enquire about advertising
              </a>
              .
            </p>
          </div>
        </section>

        <section className="home-partners home-section" aria-labelledby="partners-title">
          <div className="home-shell">
            <HomeReveal className="home-partners__head">
              <Eyebrow>Backed by the relationship</Eyebrow>
              <h2 id="partners-title" className="home-heading">
                Partners and supporters
              </h2>
              <p>Organisations supporting INZBC&rsquo;s work across the NZ&ndash;India corridor.</p>
            </HomeReveal>
            <HomeReveal className="home-partners__wall">
              <img
                src={ART.partnerStrip}
                alt="INZBC partners and supporters: BNZ and Zespri as strategic partners, Fonterra as partner, Slumberzone, the Auckland Institute of Studies and NZ Trade Aid as associate partners, alongside government and industry stakeholders"
                loading="lazy"
                width="1500"
                height="600"
              />
            </HomeReveal>
            <div className="home-partners__pending">
              <Todo>
                [[India Industry Partners row &mdash; FICCI, CII, PHD Chamber and others appear
                on the old site as a separate strip. Supply the logo files and links.]]
              </Todo>
            </div>
            <div className="home-partners__action">
              <Action href="/partners" variant="outline-dark">
                View partnerships
              </Action>
            </div>
          </div>
        </section>

        <section className="home-conversion" aria-labelledby="conversion-title">
          <div className="home-shell">
            <HomeReveal className="home-conversion__lead">
              <Eyebrow light>Move with the relationship</Eyebrow>
              <h2 id="conversion-title" className="home-display home-conversion__title">
                Your next India conversation can start here.
              </h2>
            </HomeReveal>

            <div className="home-conversion__grid">
              <HomeReveal className="home-conversion-card home-conversion-card--lime">
                <span className="home-card-kicker">Membership</span>
                <h3>Join the council</h3>
                <p>Connect your organisation to the people and intelligence shaping the corridor.</p>
                <Action href={LINKS.join} variant="outline-dark">
                  Become a member
                </Action>
              </HomeReveal>

              <HomeReveal className="home-conversion-card home-conversion-card--plum">
                <span className="home-card-kicker">Stay informed</span>
                <h3>Trade updates, in your inbox</h3>
                <p>FTA developments, council news and event announcements.</p>
                <Action href={LINKS.subscribe} variant="outline-light">
                  Subscribe
                </Action>
              </HomeReveal>

              <div className="home-conversion-card home-conversion-card--contact">
                <div className="home-contact-intro">
                  <span className="home-card-kicker">Contact</span>
                  <h3>Speak with the Secretariat</h3>
                  <p>
                    Sunil Kaushal<br />
                    <a href={LINKS.email} className="home-focus-light">
                      Secretariat@inzbc.org
                    </a>
                  </p>
                </div>
                <p className="home-conversion-card__marker">
                  <Todo>
                    [[Contact form &mdash; needs a Wix Form so submissions reach the Secretariat
                    inbox. A form posting nowhere is worse than none, so this links to email
                    until it exists.]]
                  </Todo>
                </p>
                <Action href={LINKS.email} variant="outline-light">
                  Email the Secretariat
                </Action>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-shell home-footer__top">
          <Link to="/" className="home-footer__logo home-focus-light" aria-label="INZBC home">
            <img
              src={ART.logo}
              width="400"
              height="114"
              alt="India New Zealand Business Council"
            />
          </Link>
          <nav className="home-footer__nav" aria-label="Footer navigation">
            {HOME_NAV.map((item) => (
              <Link key={item.href} to={item.href} className="home-focus-light">
                {item.label}
              </Link>
            ))}
            <Link to="/partners" className="home-focus-light">
              Partners
            </Link>
          </nav>
        </div>
        <div className="home-shell home-footer__bottom">
          <p>India New Zealand Business Council / Established 1988</p>
          <nav className="home-footer__socials" aria-label="Social media">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="home-focus-light"
              >
                {social.name}
              </a>
            ))}
          </nav>
          <a href={LINKS.email} className="home-footer__email home-focus-light">
            <Mail aria-hidden="true" size={16} />
            Secretariat@inzbc.org
          </a>
        </div>
      </footer>
    </div>
  );
}
