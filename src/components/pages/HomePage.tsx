import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
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
import ClickSpark from '@/components/home/ClickSpark';
import EffectsWorld from '@/components/home/EffectsWorld';
import KineticHeading from '@/components/home/KineticHeading';
import TradeThread from '@/components/home/TradeThread';
import './HomePage.css';

/**
 * INZBC homepage.
 *
 * This file deliberately owns its visual and motion system. Inner routes retain their
 * established shell while the homepage can be art-directed as one editorial experience.
 * Factual claims stay sourced, and unfinished integrations are presented honestly.
 */

const HOME_NAV = [
  { label: 'The FTA', href: '/fta' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
  { label: 'Publications', href: '/publications' },
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
    src: '/events/modi-luxon-delegation-auckland-2026.jpeg',
    alt: 'Prime Ministers Narendra Modi and Christopher Luxon with the New Zealand and India delegations in Auckland',
    width: 2048,
    height: 1366,
  },
  {
    src: '/events/modi-luxon-address-auckland-2026.jpeg',
    alt: 'Prime Ministers Narendra Modi and Christopher Luxon addressing guests in Auckland',
    width: 1600,
    height: 1200,
  },
  {
    src: '/events/inzbc-welcome-auckland-2026.jpeg',
    alt: 'INZBC Chief Executive Sunil Kaushal and delegates at the welcome for the Indian Prime Minister in Auckland',
    width: 2048,
    height: 1536,
  },
] as const;

type PartnerMark = {
  name: string;
  href: string;
  logo?: string;
  relationship: string;
};

const BUSINESS_PARTNERS: readonly PartnerMark[] = [
  {
    name: 'Bank of New Zealand',
    href: 'https://www.bnz.co.nz/',
    logo: '/partners/bnz.png',
    relationship: 'Strategic partner',
  },
  {
    name: 'High Commission of India, Wellington',
    href: 'https://www.hciwellington.gov.in/',
    relationship: 'Strategic partner',
  },
  {
    name: 'University of Auckland',
    href: 'https://www.auckland.ac.nz/',
    relationship: 'Strategic partner',
  },
  {
    name: 'Duco Consultancy',
    href: 'https://www.ducoconsultancy.com/',
    relationship: 'Strategic partner / Gold',
  },
  {
    name: 'Zespri',
    href: 'https://www.zespri.com/en-NZ',
    logo: '/partners/zespri.png',
    relationship: 'Strategic partner',
  },
  {
    name: 'Fonterra',
    href: 'https://www.fonterra.com/nz/en.html',
    logo: '/partners/fonterra.png',
    relationship: 'Partner',
  },
  {
    name: 'Slumberzone New Zealand',
    href: 'https://slumberzone.co.nz/',
    relationship: 'Associate partner',
  },
  {
    name: 'Auckland Institute of Studies',
    href: 'https://www.ais.ac.nz/',
    logo: '/partners/ais.png',
    relationship: 'Associate partner',
  },
  {
    name: 'New Zealand Airline Academy',
    href: 'https://www.nzaal.co.nz/',
    logo: '/partners/nzaal.webp',
    relationship: 'Associate partner',
  },
];

const INDIA_NETWORK: readonly PartnerMark[] = [
  {
    name: 'FICCI',
    href: 'https://www.ficci.in/',
    logo: '/partners/ficci.png',
    relationship: 'India industry network',
  },
  {
    name: 'Confederation of Indian Industry',
    href: 'https://www.cii.in/',
    relationship: 'India industry network',
  },
  {
    name: 'PHD Chamber of Commerce and Industry',
    href: 'https://www.phdcci.in/',
    logo: '/partners/phdcci.png',
    relationship: 'India industry network',
  },
  {
    name: 'ASSOCHAM',
    href: 'https://www.assocham.org/',
    logo: '/partners/assocham.jpg',
    relationship: '2026 MoU partner',
  },
];

const PUBLIC_SECTOR_NETWORK = [
  ['MFAT', 'https://www.mfat.govt.nz/'],
  ['New Zealand Trade & Enterprise', 'https://www.nzte.govt.nz/'],
  ['Business Canterbury', 'https://www.businesscanterbury.co.nz/'],
  ['BusinessNZ', 'https://businessnz.org.nz/'],
  ['ExportNZ', 'https://exportnz.org.nz/'],
] as const;

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

function HomeBlock({
  children,
  className = '',
  effect = 'rise',
  delay = 0,
  tilt = false,
  spotlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  effect?: 'rise' | 'left' | 'right' | 'fold' | 'scale' | 'flip' | 'benefit' | 'none';
  delay?: number;
  tilt?: boolean;
  spotlight?: boolean;
}) {
  const style = { '--reel-delay': `${delay}ms` } as React.CSSProperties;
  return (
    <div
      className={`home-reel-block ${className}`.trim()}
      data-reel={effect === 'none' ? undefined : effect}
      data-reel-tilt={tilt ? 'true' : undefined}
      data-reel-spotlight={spotlight ? 'true' : undefined}
      style={style}
    >
      {children}
    </div>
  );
}

function ReelSignal({
  words,
  tone = 'light',
}: {
  words: readonly string[];
  tone?: 'light' | 'dark';
}) {
  const repeatedWords = [...words, ...words];
  return (
    <div className={`home-reel-signal home-reel-signal--${tone}`} aria-hidden="true">
      <div className="home-reel-signal__track">
        {repeatedWords.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <span>{word}</span>
            <i />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function CurvedCorridorText() {
  const pathId = React.useId();
  const words = 'NEW ZEALAND  •  INDIA  •  ACCESS  •  INTELLIGENCE  •  INFLUENCE  •  ';
  return (
    <div className="home-curved-corridor" aria-hidden="true">
      <svg viewBox="0 0 1440 180" focusable="false">
        <defs>
          <path id={pathId} d="M-120 42 Q720 220 1560 42" fill="none" />
        </defs>
        <text>
          <textPath href={`#${pathId}`}>{words.repeat(3)}</textPath>
        </text>
      </svg>
    </div>
  );
}

function useEffectsReel(rootRef: React.RefObject<HTMLDivElement>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reelItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reel]'));
    const aboveFoldItems: HTMLElement[] = [];

    reelItems.forEach((element) => {
      element.dataset.reelReady = 'true';
      const alreadyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.92;
      if (motionQuery.matches) element.dataset.reelVisible = 'true';
      else if (alreadyVisible) aboveFoldItems.push(element);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reelVisible = 'true';
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -9% 0px', threshold: 0.08 },
    );

    if (!motionQuery.matches) {
      reelItems.forEach((element) => {
        if (!aboveFoldItems.includes(element)) observer.observe(element);
      });
    }

    let revealFrame = 0;
    if (aboveFoldItems.length) {
      revealFrame = window.requestAnimationFrame(() => {
        revealFrame = window.requestAnimationFrame(() => {
          aboveFoldItems.forEach((element) => {
            element.dataset.reelVisible = 'true';
          });
        });
      });
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const tiltItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reel-tilt]'));
    const spotlightItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reel-spotlight]'));
    const magnetItems = Array.from(root.querySelectorAll<HTMLElement>('.home-action'));
    const tiltCleanups: Array<() => void> = [];
    const spotlightCleanups: Array<() => void> = [];
    const magnetCleanups: Array<() => void> = [];

    const interactionsAvailable = () => !motionQuery.matches && finePointer.matches;

    if (tiltItems.length || spotlightItems.length || magnetItems.length) {
      tiltItems.forEach((element) => {
        let bounds: DOMRect | null = null;
        let frameId = 0;
        let pointerX = 0;
        let pointerY = 0;

        const paintTilt = () => {
          frameId = 0;
          if (!bounds || !interactionsAvailable()) return;
          const x = (pointerX - bounds.left) / Math.max(1, bounds.width) - 0.5;
          const y = (pointerY - bounds.top) / Math.max(1, bounds.height) - 0.5;
          const rotateX = y * -7;
          const rotateY = x * 8;
          element.style.transform = `perspective(1100px) translate3d(0, -4px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        };
        const onPointerEnter = () => {
          if (!interactionsAvailable()) return;
          bounds = element.getBoundingClientRect();
        };
        const onPointerMove = (event: PointerEvent) => {
          if (!interactionsAvailable()) return;
          if (!bounds) bounds = element.getBoundingClientRect();
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (!frameId) frameId = window.requestAnimationFrame(paintTilt);
        };
        const onPointerLeave = () => {
          bounds = null;
          if (frameId) window.cancelAnimationFrame(frameId);
          frameId = 0;
          element.style.transform = '';
        };
        element.addEventListener('pointerenter', onPointerEnter);
        element.addEventListener('pointermove', onPointerMove);
        element.addEventListener('pointerleave', onPointerLeave);
        tiltCleanups.push(() => {
          element.removeEventListener('pointerenter', onPointerEnter);
          element.removeEventListener('pointermove', onPointerMove);
          element.removeEventListener('pointerleave', onPointerLeave);
          if (frameId) window.cancelAnimationFrame(frameId);
          element.style.transform = '';
        });
      });

      spotlightItems.forEach((element) => {
        let frameId = 0;
        let bounds: DOMRect | null = null;
        let pointerX = 0;
        let pointerY = 0;
        const paint = () => {
          frameId = 0;
          if (!bounds || !interactionsAvailable()) return;
          element.style.setProperty('--spotlight-x', `${pointerX - bounds.left}px`);
          element.style.setProperty('--spotlight-y', `${pointerY - bounds.top}px`);
        };
        const onPointerEnter = () => {
          if (!interactionsAvailable()) return;
          bounds = element.getBoundingClientRect();
        };
        const onPointerMove = (event: PointerEvent) => {
          if (!interactionsAvailable()) return;
          if (!bounds) bounds = element.getBoundingClientRect();
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (!frameId) frameId = requestAnimationFrame(paint);
        };
        const onPointerLeave = () => {
          bounds = null;
          element.style.removeProperty('--spotlight-x');
          element.style.removeProperty('--spotlight-y');
        };
        element.addEventListener('pointerenter', onPointerEnter);
        element.addEventListener('pointermove', onPointerMove);
        element.addEventListener('pointerleave', onPointerLeave);
        spotlightCleanups.push(() => {
          element.removeEventListener('pointerenter', onPointerEnter);
          element.removeEventListener('pointermove', onPointerMove);
          element.removeEventListener('pointerleave', onPointerLeave);
          if (frameId) cancelAnimationFrame(frameId);
          element.style.removeProperty('--spotlight-x');
          element.style.removeProperty('--spotlight-y');
        });
      });

      magnetItems.forEach((element) => {
        let frameId = 0;
        let bounds: DOMRect | null = null;
        let pointerX = 0;
        let pointerY = 0;
        const paint = () => {
          frameId = 0;
          if (!bounds || !interactionsAvailable()) return;
          const x = ((pointerX - bounds.left) / Math.max(1, bounds.width) - 0.5) * 10;
          const y = ((pointerY - bounds.top) / Math.max(1, bounds.height) - 0.5) * 7;
          element.style.setProperty('--magnet-x', `${x.toFixed(2)}px`);
          element.style.setProperty('--magnet-y', `${y.toFixed(2)}px`);
        };
        const onPointerEnter = () => {
          if (!interactionsAvailable()) return;
          bounds = element.getBoundingClientRect();
        };
        const onPointerMove = (event: PointerEvent) => {
          if (!interactionsAvailable()) return;
          if (!bounds) bounds = element.getBoundingClientRect();
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (!frameId) frameId = requestAnimationFrame(paint);
        };
        const reset = () => {
          bounds = null;
          element.style.removeProperty('--magnet-x');
          element.style.removeProperty('--magnet-y');
        };
        element.addEventListener('pointerenter', onPointerEnter);
        element.addEventListener('pointermove', onPointerMove);
        element.addEventListener('pointerleave', reset);
        magnetCleanups.push(() => {
          element.removeEventListener('pointerenter', onPointerEnter);
          element.removeEventListener('pointermove', onPointerMove);
          element.removeEventListener('pointerleave', reset);
          if (frameId) cancelAnimationFrame(frameId);
          reset();
        });
      });
    }

    const onMotionChange = () => {
      if (!motionQuery.matches) return;
      observer.disconnect();
      reelItems.forEach((element) => {
        element.dataset.reelVisible = 'true';
      });
      tiltItems.forEach((element) => {
        element.style.transform = '';
      });
      spotlightItems.forEach((element) => {
        element.style.removeProperty('--spotlight-x');
        element.style.removeProperty('--spotlight-y');
      });
      magnetItems.forEach((element) => {
        element.style.removeProperty('--magnet-x');
        element.style.removeProperty('--magnet-y');
      });
    };
    motionQuery.addEventListener('change', onMotionChange);

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      const reelItem = target?.closest<HTMLElement>('[data-reel]');
      if (reelItem && root.contains(reelItem)) reelItem.dataset.reelVisible = 'true';
    };
    root.addEventListener('focusin', onFocusIn);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      root.removeEventListener('focusin', onFocusIn);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      tiltCleanups.forEach((cleanup) => cleanup());
      spotlightCleanups.forEach((cleanup) => cleanup());
      magnetCleanups.forEach((cleanup) => cleanup());
    };
  }, [rootRef]);
}

function HeroRoute() {
  const shouldReduceMotion = useReducedMotion();
  const route = 'M42 240C166 245 210 74 356 83C420 87 455 126 500 55';

  return (
    <svg
      aria-hidden="true"
      className="home-hero__route"
      viewBox="0 0 540 300"
      fill="none"
      focusable="false"
    >
      <path className="home-hero__route-track" d={route} />
      <motion.path
        className="home-hero__route-active"
        d={route}
        initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.45 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.2, delay: 0.35, ease: [0.23, 1, 0.32, 1] },
          opacity: { duration: 0.3, delay: 0.25, ease: [0.23, 1, 0.32, 1] },
        }}
      />
      <circle className="home-hero__route-origin" cx="42" cy="240" r="5" />
      <motion.circle
        className="home-hero__route-destination"
        cx="500"
        cy="55"
        r="5"
        initial={shouldReduceMotion ? false : { opacity: 0, transform: 'scale(0.92)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        transition={{ duration: 0.45, delay: 1.25, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  );
}

function EventsGallery() {
  const photoClasses = [
    'home-events__photo--main',
    'home-events__photo--small-one',
    'home-events__photo--small-two',
  ] as const;

  return (
    <figure className="home-events__gallery">
      {EVENT_PHOTOS.map((photo, index) => (
        <div
          key={photo.src}
          className={`home-events__photo ${photoClasses[index]}`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
          />
        </div>
      ))}
      <figcaption className="home-events__gallery-caption">
        Indian Prime Minister Narendra Modi&rsquo;s official visit / Auckland / 10&ndash;11 July 2026
      </figcaption>
    </figure>
  );
}

const CONVERSION_ROUTE_TRUNK = 'M600 0 C600 36 600 54 600 72';
const CONVERSION_ROUTE_LEFT = 'M600 72 C600 112 300 98 300 160';
const CONVERSION_ROUTE_RIGHT = 'M600 72 C600 112 900 98 900 160';
const CONVERSION_ROUTE_MOBILE = 'M600 0 C600 48 600 108 600 160';

function ConversionRoute() {
  const routeRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: routeRef,
    offset: ['start 90%', 'end 42%'],
  });
  const trunkLength = useTransform(scrollYProgress, [0.04, 0.42], [0, 1], {
    clamp: true,
  });
  const branchLength = useTransform(scrollYProgress, [0.3, 0.86], [0, 1], {
    clamp: true,
  });
  const routeOpacity = useTransform(scrollYProgress, [0.02, 0.2], [0.2, 1], {
    clamp: true,
  });
  const nodeOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1], {
    clamp: true,
  });
  const nodeTransform = useTransform(
    scrollYProgress,
    [0.72, 0.92],
    [
      'translate3d(0, 0, 0) scale(0.72)',
      'translate3d(0, 0, 0) scale(1)',
    ],
    { clamp: true },
  );
  const trunkStyle = shouldReduceMotion
    ? { opacity: 1, pathLength: 1 }
    : { opacity: routeOpacity, pathLength: trunkLength };
  const branchStyle = shouldReduceMotion
    ? { opacity: 1, pathLength: 1 }
    : { opacity: routeOpacity, pathLength: branchLength };
  const nodeStyle = shouldReduceMotion
    ? { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    : { opacity: nodeOpacity, transform: nodeTransform };

  return (
    <div ref={routeRef} className="home-conversion-route" aria-hidden="true">
      <svg viewBox="0 0 1200 160" preserveAspectRatio="none" focusable="false">
        <g className="home-conversion-route__desktop">
          <path className="home-conversion-route__track" d={CONVERSION_ROUTE_TRUNK} />
          <path className="home-conversion-route__track" d={CONVERSION_ROUTE_LEFT} />
          <path className="home-conversion-route__track" d={CONVERSION_ROUTE_RIGHT} />
          <motion.path
            className="home-conversion-route__active"
            d={CONVERSION_ROUTE_TRUNK}
            style={trunkStyle}
          />
          <motion.path
            className="home-conversion-route__active"
            d={CONVERSION_ROUTE_LEFT}
            style={branchStyle}
          />
          <motion.path
            className="home-conversion-route__active"
            d={CONVERSION_ROUTE_RIGHT}
            style={branchStyle}
          />
        </g>
        <g className="home-conversion-route__mobile">
          <path className="home-conversion-route__track" d={CONVERSION_ROUTE_MOBILE} />
          <motion.path
            className="home-conversion-route__active"
            d={CONVERSION_ROUTE_MOBILE}
            style={branchStyle}
          />
        </g>
      </svg>
      <motion.span
        className="home-conversion-route__node home-conversion-route__node--left"
        style={nodeStyle}
      />
      <motion.span
        className="home-conversion-route__node home-conversion-route__node--right"
        style={nodeStyle}
      />
      <motion.span
        className="home-conversion-route__node home-conversion-route__node--mobile"
        style={nodeStyle}
      />
    </div>
  );
}

function openContactDraft(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const organisation = String(data.get('organisation') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const recipient = LINKS.email.replace(/^mailto:/, '');
  const subject = organisation ? `INZBC enquiry from ${organisation}` : 'INZBC website enquiry';
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : '',
    '',
    message,
  ]
    .filter((line, index) => line || index === 3)
    .join('\n');

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion() === true;

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
        <span className="home-header__progress" aria-hidden="true" />
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
          <AnimatePresence initial={false}>
            {menuOpen ? (
              <motion.div
                id="home-mobile-navigation"
                className="home-mobile-menu__panel"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: 'translate3d(0, -8px, 0) scale(0.975)' }
                }
                animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: 'translate3d(0, -6px, 0) scale(0.985)' }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.16, ease: [0.23, 1, 0.32, 1] }
                    : { type: 'spring', duration: 0.24, bounce: 0 }
                }
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
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-shell home-hero__layout">
        <div className="home-hero__copy">
          <div className="home-hero__status">
            <span className="home-hero__status-dot" aria-hidden="true" />
            FTA signed 27 April 2026
            <span aria-hidden="true">/</span>
            Ratification pending
          </div>
          <KineticHeading
            as="h1"
            id="home-hero-title"
            className="home-display home-hero__title"
            lines={["New Zealand's gateway", 'to the India opportunity.']}
          />
          <p className="home-hero__lede">
            INZBC connects exporters, investors, institutions and government across the
            NZ-India trade relationship, with the intelligence and access to move from interest
            to action.
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
              src="/events/modi-luxon-auckland-2026.jpeg"
              alt="Prime Ministers Narendra Modi and Christopher Luxon in conversation during the Indian Prime Minister's official visit to Auckland"
              width="1200"
              height="1600"
              loading="eager"
              fetchPriority="high"
              className="home-hero__image"
            />
            <div className="home-hero__image-shade" aria-hidden="true" />
            <HeroRoute />
            <div aria-hidden="true" className="home-hero__route-label home-hero__route-label--start">
              New Zealand
            </div>
            <div aria-hidden="true" className="home-hero__route-label home-hero__route-label--end">
              India
            </div>
          </div>
          <div className="home-hero__caption">
            <span>Auckland / July 2026</span>
            <span>Historic official visit</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffectsReel(pageRef);

  return (
    <ClickSpark>
      <div ref={pageRef} className="home-page">
        <EffectsWorld />
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>
      <HomeHeader />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <section className="home-proof" aria-label="INZBC at a glance">
          <div className="home-shell home-proof__grid">
            <div
              className="home-proof__item"
              data-reel="rise"
              style={{ '--reel-delay': '0ms' } as React.CSSProperties}
            >
              <p>Established</p>
              <strong>1988</strong>
            </div>
            <div
              className="home-proof__item"
              data-reel="rise"
              style={{ '--reel-delay': '80ms' } as React.CSSProperties}
            >
              <p>Recognised by</p>
              <strong>New Zealand and India</strong>
            </div>
            <div
              className="home-proof__item"
              data-reel="rise"
              style={{ '--reel-delay': '160ms' } as React.CSSProperties}
            >
              <p>Member network</p>
              <strong>200+ members</strong>
              <a
                href="https://www.inzbc.org/post/india-new-zealand-business-council-welcomes-landmark-nz-india-free-trade-agreement"
                target="_blank"
                rel="noopener noreferrer"
                className="home-proof__source home-focus-dark"
              >
                INZBC published figure / Dec 2025
              </a>
            </div>
          </div>
        </section>

        <TradeThread
          headingId="fta-title"
          title="A signed agreement. A new field of possibility."
          summary={
            <p>
              Signed in New Delhi, the agreement will eliminate or reduce tariffs across
              95% of New Zealand&rsquo;s current export trade with India. Around 57% will
              become duty-free when the agreement enters into force. Domestic implementation
              is still underway.
            </p>
          }
          status={{
            label: 'Current status',
            value: 'Signed, not yet in force',
            note: 'Awaiting domestic ratification in both countries.',
          }}
          stats={HOME_STATS}
          action={<Action href="/fta">Understand the agreement</Action>}
          portal={{
            imageSrc: '/events/auckland-skyline-trade-corridor.webp',
            imagePosition: '63% center',
            imageWidth: 640,
            imageHeight: 270,
            originLabel: 'Aotearoa New Zealand',
            destinationLabel: 'India',
          }}
          source={
            <>
              Sources:{' '}
              <a
                href="https://www.mfat.govt.nz/assets/Trade-agreements/NZ-India-FTA/NZ-India-FTA-National-Interest-Analysis-NIA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="home-focus-light"
              >
                MFAT National Interest Analysis
              </a>{' '}
              and{' '}
              <a
                href="https://bills.parliament.nz/v/6/94E55470-B881-4492-302A-08DED017BCBD"
                target="_blank"
                rel="noopener noreferrer"
                className="home-focus-light"
              >
                New Zealand Parliament
              </a>
              .
            </>
          }
        />

        <section className="home-intro home-section">
          <div className="home-shell home-intro__layout">
            <HomeBlock effect="none">
              <KineticHeading
                className="home-heading home-intro__title"
                lines={[
                  'The relationship is moving.',
                  'Be in the room where it becomes practical.',
                ]}
              />
            </HomeBlock>
            <HomeBlock className="home-intro__copy" effect="right" delay={140}>
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
            </HomeBlock>
          </div>
          <div className="home-shell home-capabilities">
            {[
              ['Advocate', 'Trade policy and market access'],
              ['Interpret', 'Market intelligence and FTA insight'],
              ['Connect', 'Businesses across both countries'],
            ].map(([title, body], index) => (
              <HomeBlock
                key={title}
                className="home-capability"
                effect="fold"
                delay={index * 90}
              >
                <h3>{title}</h3>
                <p>{body}</p>
              </HomeBlock>
            ))}
          </div>
          <ReelSignal words={['Advocate', 'Interpret', 'Connect']} />
        </section>

        <section className="home-pathways home-section" aria-labelledby="pathways-title">
          <CurvedCorridorText />
          <div className="home-shell">
            <HomeBlock className="home-section-head" effect="none">
              <div>
                <KineticHeading
                  id="pathways-title"
                  className="home-heading"
                  lines={['One relationship.', 'Four ways in.']}
                />
              </div>
              <p>
                Start with the question in front of you. The council connects each pathway
                to the wider bilateral opportunity.
              </p>
            </HomeBlock>

            <div className="home-pathways__grid">
              {HOME_PATHWAYS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <HomeBlock key={item.href} effect="fold" delay={index * 80}>
                    <Link
                      to={item.href}
                      data-reel-tilt="true"
                      data-reel-spotlight="true"
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
                  </HomeBlock>
                );
              })}
            </div>
          </div>
        </section>

        <section className="home-events home-section" aria-labelledby="events-title">
          <div className="home-shell home-events__layout">
            <HomeBlock className="home-events__copy" effect="left">
              <KineticHeading
                id="events-title"
                className="home-heading"
                lines={['The bilateral relationship', 'is built face to face.']}
              />
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
            </HomeBlock>

            <div data-reel="right" style={{ '--reel-delay': '100ms' } as React.CSSProperties}>
              <EventsGallery />
            </div>
          </div>
        </section>

        <section className="home-membership home-section" aria-labelledby="membership-title">
          <div className="home-membership__line" aria-hidden="true" />
          <ReelSignal words={['Access', 'Intelligence', 'Influence']} tone="dark" />
          <div className="home-shell home-membership__layout">
            <HomeBlock className="home-membership__copy" effect="left">
              <KineticHeading
                id="membership-title"
                className="home-heading home-heading--light"
                lines={['Access is useful.', 'The right access changes outcomes.']}
              />
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
            </HomeBlock>
            <div className="home-membership__benefits">
              {BENEFITS.map(([lead, rest], index) => (
                <HomeBlock
                  key={lead}
                  className="home-benefit"
                  effect="benefit"
                  delay={index * 85}
                >
                  <div>
                    <h3>{lead}</h3>
                    <p>{rest}</p>
                  </div>
                </HomeBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="home-intelligence home-section" aria-labelledby="intelligence-title">
          <div className="home-shell">
            <HomeBlock className="home-section-head home-section-head--wide" effect="none">
              <div>
                <KineticHeading
                  id="intelligence-title"
                  className="home-heading"
                  lines={['Read what is changing', 'and what it means.']}
                />
              </div>
              <Action href="/publications" variant="outline-dark">
                All publications
              </Action>
            </HomeBlock>

            <div className="home-intelligence__grid">
              <HomeBlock
                className="home-publication home-publication--report"
                effect="flip"
                tilt
                spotlight
              >
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
              </HomeBlock>

              <HomeBlock
                className="home-publication home-publication--magazine"
                effect="flip"
                delay={100}
                tilt
                spotlight
              >
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
              </HomeBlock>

              <div
                className="home-news-card"
                data-reel="scale"
                data-reel-tilt="true"
                data-reel-spotlight="true"
                style={{ '--reel-delay': '160ms' } as React.CSSProperties}
              >
                <img
                  src={ART.ftaNewEra}
                  alt="Delegation photograph accompanying an INZBC FTA article"
                  loading="lazy"
                />
                <div className="home-news-card__copy">
                  <span className="home-card-kicker">Latest insight</span>
                  <h3>FTA signals a new era for business</h3>
                  <p>
                    INZBC says the agreement improves market access and certainty, while
                    long-term commercial gains will still depend on trusted partnerships and
                    sustained engagement.
                  </p>
                  <Action
                    href="https://www.inzbc.org/post/india-new-zealand-free-trade-agreement-signals-new-era-for-business-inzbc"
                    variant="text"
                  >
                    Read the announcement
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
            <HomeBlock className="home-partners__head" effect="none">
              <KineticHeading
                id="partners-title"
                className="home-heading"
                lines={['Partners', 'and supporters']}
              />
              <p>Organisations supporting INZBC&rsquo;s work across the NZ&ndash;India corridor.</p>
            </HomeBlock>

            <div className="home-partners__groups">
              <HomeBlock className="home-partners__group" effect="left">
                <div className="home-partners__group-head">
                  <span>Business network</span>
                  <p>Strategic, partner and associate relationships</p>
                </div>
                <div className="home-partners__logo-grid">
                  {BUSINESS_PARTNERS.map((partner, index) => (
                    <a
                      key={partner.name}
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-partner-mark home-focus-dark"
                      data-reel="rise"
                      style={{ '--reel-delay': `${index * 38}ms` } as React.CSSProperties}
                    >
                      <span className="home-partner-mark__art">
                        {partner.logo ? (
                          <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" />
                        ) : (
                          <strong>{partner.name}</strong>
                        )}
                      </span>
                      <span className="home-partner-mark__meta">
                        {partner.relationship}
                        <ArrowUpRight aria-hidden="true" size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </HomeBlock>

              <HomeBlock
                className="home-partners__group home-partners__group--india"
                effect="right"
                delay={120}
              >
                <div className="home-partners__group-head">
                  <span>India industry network</span>
                  <p>Relationships that extend the council&rsquo;s reach on the ground</p>
                </div>
                <div className="home-partners__india-grid">
                  {INDIA_NETWORK.map((partner, index) => (
                    <a
                      key={partner.name}
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-india-mark home-focus-dark"
                      data-reel="rise"
                      style={{ '--reel-delay': `${index * 58}ms` } as React.CSSProperties}
                    >
                      <span className="home-india-mark__art">
                        {partner.logo ? (
                          <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" />
                        ) : (
                          <strong>CII</strong>
                        )}
                      </span>
                      <span>
                        {partner.relationship}
                        <ArrowUpRight aria-hidden="true" size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </HomeBlock>
            </div>

            <section
              className="home-partners__stakeholders"
              aria-label="Public sector and industry stakeholders"
              data-reel="scale"
            >
              <span>Also working alongside</span>
              <div>
                {PUBLIC_SECTOR_NETWORK.map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-focus-dark"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </section>
            <div className="home-partners__action">
              <Action href="/partners" variant="outline-dark">
                View partnerships
              </Action>
            </div>
          </div>
        </section>

        <section className="home-conversion" aria-labelledby="conversion-title">
          <div className="home-shell">
            <HomeBlock className="home-conversion__lead" effect="none">
              <KineticHeading
                id="conversion-title"
                className="home-display home-conversion__title"
                lines={['Your next India conversation', 'can start here.']}
              />
            </HomeBlock>

            <ConversionRoute />

            <div className="home-conversion__grid">
              <HomeBlock
                className="home-conversion-card home-conversion-card--lime"
                effect="flip"
                tilt
                spotlight
              >
                <span className="home-card-kicker">Membership</span>
                <h3>Join the council</h3>
                <p>Connect your organisation to the people and intelligence shaping the corridor.</p>
                <Action href={LINKS.join} variant="outline-dark">
                  Become a member
                </Action>
              </HomeBlock>

              <HomeBlock
                className="home-conversion-card home-conversion-card--plum"
                effect="flip"
                delay={100}
                tilt
                spotlight
              >
                <span className="home-card-kicker">Stay informed</span>
                <h3>Trade updates, in your inbox</h3>
                <p>FTA developments, council news and event announcements.</p>
                <Action href={LINKS.subscribe} variant="outline-light">
                  Subscribe
                </Action>
              </HomeBlock>

              <div
                className="home-conversion-card home-conversion-card--contact"
                data-reel="rise"
                style={{ '--reel-delay': '190ms' } as React.CSSProperties}
              >
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
                <form
                  className="home-contact-form"
                  aria-labelledby="home-contact-form-title"
                  aria-describedby="home-contact-form-status"
                  onSubmit={openContactDraft}
                >
                  <div className="home-contact-form__head">
                    <h4 id="home-contact-form-title">Send an enquiry</h4>
                    <span>Email draft</span>
                  </div>
                  <div className="home-contact-form__grid">
                    <label>
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        maxLength={80}
                        placeholder="Your name"
                        required
                      />
                    </label>
                    <label>
                      <span>Work email</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="you@company.com"
                        required
                      />
                    </label>
                    <label className="home-contact-form__wide">
                      <span>Organisation</span>
                      <input
                        type="text"
                        name="organisation"
                        autoComplete="organization"
                        maxLength={120}
                        placeholder="Company or organisation"
                      />
                    </label>
                    <label className="home-contact-form__wide">
                      <span>How can we help?</span>
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={600}
                        placeholder="Tell us what you are working on"
                        required
                      />
                    </label>
                  </div>
                  <div className="home-contact-form__footer">
                    <button type="submit" aria-describedby="home-contact-form-status">
                      Prepare email
                      <ArrowRight aria-hidden="true" size={17} />
                    </button>
                    <p id="home-contact-form-status">
                      Opens your email app with these details ready to review and send.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer__horizon" aria-hidden="true">
          <span />
        </div>
        <div className="home-shell home-footer__top" data-reel="rise">
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
        <div
          className="home-shell home-footer__bottom"
          data-reel="rise"
          style={{ '--reel-delay': '100ms' } as React.CSSProperties}
        >
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
    </ClickSpark>
  );
}
