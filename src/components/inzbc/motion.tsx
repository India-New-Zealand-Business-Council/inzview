import React, { useRef, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

/**
 * Motion primitives.
 *
 * Everything here is scroll-linked against the real document, which is the whole reason the
 * move off Wix Studio was worth making. There, the page lived inside a sandboxed Embed
 * iframe that could not see the parent's scroll: position sticky pinned to the iframe, and
 * scroll arrived by postMessage twenty times a second against sixty frames of paint. Every
 * effect below was either impossible or visibly steppy under that arrangement.
 *
 * Two rules hold throughout:
 *
 * 1. Content is never left hidden by a failed animation. Reveal starts visible and is hidden
 *    only once the client confirms it can animate. The first published build got this wrong
 *    and shipped a hero whose headline and buttons never appeared.
 * 2. Transform and opacity only. Both are compositor properties, so none of this causes
 *    layout or paint work while scrolling.
 */


/* --- scroll, measured directly ---------------------------------------------------------
   Framer's useScroll reads its container's scrollHeight against its clientHeight to build a
   progress range. The Astro template ships height:100% on html, body and #root, which caps
   the document box at one viewport: the range computes as empty, every scroll-linked value
   pins to zero, and the whole page renders static while appearing to work. The template is
   fixed as well, but these hooks no longer depend on that measurement being right.

   window.scrollY is read directly and coalesced on requestAnimationFrame, so this is one
   listener and at most one update per frame for the entire page. */

function useScrollY() {
  const y = useMotionValue(0);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      y.set(window.scrollY || document.documentElement.scrollTop || 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [y]);
  return y;
}

/** Progress of one element through the viewport: 0 as its top enters, 1 as its bottom leaves. */
function useElementProgress(ref: React.RefObject<HTMLElement>) {
  const scrollY = useScrollY();
  const progress = useMotionValue(0);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + (window.scrollY || 0);
      const span = rect.height + window.innerHeight;
      if (span <= 0) return;
      const p = (window.scrollY + window.innerHeight - top) / span;
      progress.set(Math.min(1, Math.max(0, p)));
    };
    measure();
    const unsub = scrollY.on('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      unsub();
      window.removeEventListener('resize', measure);
    };
  }, [ref, scrollY, progress]);
  return progress;
}

/** Progress through a tall pinned section: 0 when its top reaches the viewport top, 1 at its end. */
export function usePinProgress(ref: React.RefObject<HTMLElement>) {
  const scrollY = useScrollY();
  const progress = useMotionValue(0);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + (window.scrollY || 0);
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      progress.set(Math.min(1, Math.max(0, (window.scrollY - top) / span)));
    };
    measure();
    const unsub = scrollY.on('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      unsub();
      window.removeEventListener('resize', measure);
    };
  }, [ref, scrollY, progress]);
  return progress;
}

/** Progress of the hero out of view: 0 at rest, 1 once it has scrolled fully past. */
export function useHeroProgress(ref: React.RefObject<HTMLElement>) {
  const scrollY = useScrollY();
  const progress = useMotionValue(0);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const h = el.getBoundingClientRect().height;
      if (h <= 0) return;
      progress.set(Math.min(1, Math.max(0, window.scrollY / h)));
    };
    measure();
    const unsub = scrollY.on('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      unsub();
      window.removeEventListener('resize', measure);
    };
  }, [ref, scrollY, progress]);
  return progress;
}

/** Progress through the whole document. */
export function usePageProgress() {
  const scrollY = useScrollY();
  const progress = useMotionValue(0);
  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    measure();
    const unsub = scrollY.on('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      unsub();
      window.removeEventListener('resize', measure);
    };
  }, [scrollY, progress]);
  return progress;
}

/* --- reveal on entry ----------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  // Hidden only after mount. Server-rendered markup and any client where the effect never
  // runs both keep the content visible, so a broken observer can never blank the page.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!reduced) setArmed(true);
  }, [reduced]);

  const hidden = armed && !inView;

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? y : 0 }}
      initial={false}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --- headline, revealed a word at a time ---------------------------------------------- */

export function WordReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        // Each word rides up out of a clipping box, so the line assembles rather than fades.
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* --- parallax ------------------------------------------------------------------------- */

/**
 * Moves its children against the scroll. `speed` is how far the element travels across its
 * own passage through the viewport, as a fraction of that distance: negative rises, positive
 * sinks. Small values read as depth; large ones read as a trick.
 */
export function Parallax({
  children,
  speed = -0.15,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useElementProgress(ref);
  const raw = useTransform(progress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const y = useSpring(raw, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* --- card that tilts toward the pointer ------------------------------------------------ */

export function TiltCard({
  children,
  className = '',
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    // -1..1 from the centre, then a shallow tilt. Anything past about 8 degrees stops
    // reading as depth and starts reading as a gimmick.
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Tag = (href ? motion.a : motion.div) as typeof motion.div;
  return (
    <Tag
      {...(href ? ({ href } as Record<string, unknown>) : {})}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* --- number that counts up when it arrives --------------------------------------------- */

export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  // Derive primitives, not the match array.
  //
  // value.match() returns a fresh array on every render. Passing that array as an effect
  // dependency compares it by reference, so it differed every time: the effect re-ran, set
  // state, caused a render, produced a new array, and started again. The figure animated
  // forever and never settled on the real number. Strings and numbers compare by value and
  // end the loop.
  const digits = value.match(/[\d.]+/)?.[0] ?? '';
  const target = digits ? parseFloat(digits) : 0;
  const decimals = (digits.split('.')[1] || '').length;

  useEffect(() => {
    if (!inView || reduced || !digits) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(value.replace(digits, v.toFixed(decimals))),
      onComplete: () => setShown(value),
    });
    return () => {
      controls.stop();
      // However the count ends, the figure ends up correct rather than frozen partway.
      setShown(value);
    };
  }, [inView, reduced, value, digits, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {/* The animated figure is decorative and hidden from assistive technology: between
          the first frame and the last it reads as a number that is simply false. The real
          value sits beside it, visually hidden and always correct, so a screen reader
          announces NZ$3.95bn and never NZ$1.53bn. */}
      <span aria-hidden="true">{reduced || !digits ? value : shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/* --- reading progress ------------------------------------------------------------------ */

export function ScrollProgress() {
  const progress = usePageProgress();
  const scaleX = useSpring(progress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-lime"
      style={{ scaleX }}
    />
  );
}

/* --- header (floating glass bar) ---------------------------------------------------------
   Rebuilt in plain Tailwind to match Home's own header (HomePage.css .home-header*) exactly,
   rather than importing that CSS module here — Home's classes are scoped to Home and pulling
   them in globally would leak Home-only styles onto every other page (see Footer.tsx's own
   comment for the same reasoning, applied there first).

   Home switches to the mobile menu at max-width: 940px, not Tailwind's default md (768px);
   matched with the min-[940px]: arbitrary breakpoint below rather than approximating it. */

export function StickyHeader({
  logo,
  links,
  cta,
}: {
  logo: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menuOpen) return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-4 sm:p-5">
      <div className="pointer-events-auto relative mx-auto grid w-full max-w-[1240px] min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.2rem] border border-white/60 bg-white/80 py-[0.65rem] pl-4 pr-[0.72rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_18px_60px_rgba(9,3,24,0.14)] backdrop-blur-2xl backdrop-saturate-150 min-[940px]:gap-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
        >
          <img
            src={logo}
            alt="India New Zealand Business Council"
            className="h-auto w-[clamp(185px,17vw,222px)]"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-4 min-[940px]:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="inline-flex min-h-11 items-center rounded-md px-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center gap-1.5 justify-self-end rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime min-[940px]:inline-flex"
        >
          {cta.label}
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>

        <div className="relative justify-self-end min-[940px]:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="sticky-mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex min-h-[46px] min-w-[88px] items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-transform active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <span>Menu</span>
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>

          <AnimatePresence initial={false}>
            {menuOpen ? (
              <motion.div
                id="sticky-mobile-nav"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.975, y: -8 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute right-0 top-[calc(100%+0.85rem)] w-[min(370px,calc(100vw-2.5rem))] max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-[1.25rem] border border-white/10 bg-deep/[0.98] p-3 shadow-[0_24px_70px_rgba(9,3,24,0.35)]"
              >
                <nav aria-label="Mobile navigation" className="grid">
                  {links.map((l, i) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={closeMenu}
                      className="grid min-h-[54px] grid-cols-[2rem_1fr_auto] items-center gap-2.5 rounded-xl px-3 py-2.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                    >
                      <span aria-hidden="true" className="text-[0.68rem] tracking-wide text-lime">
                        0{i + 1}
                      </span>
                      {l.label}
                      <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    </Link>
                  ))}
                </nav>
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 flex min-h-[50px] items-center justify-between rounded-xl bg-lime px-3.5 py-3 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  {cta.label}
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

export type { MotionValue };
