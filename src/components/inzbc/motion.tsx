import React, { useRef, useEffect, useState } from 'react';
import {
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

  const match = value.match(/[\d.]+/);

  useEffect(() => {
    if (!inView || reduced || !match) return;
    const target = parseFloat(match[0]);
    const decimals = (match[0].split('.')[1] || '').length;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(value.replace(match[0], v.toFixed(decimals))),
      onComplete: () => setShown(value),
    });
    return () => {
      controls.stop();
      // Whatever interrupts the count, the figure ends up correct rather than frozen
      // partway.
      setShown(value);
    };
  }, [inView, reduced, value, match]);

  return (
    <span ref={ref} className={className}>
      {/* The animated figure is decorative and hidden from assistive technology, because
          between the first frame and the last it reads as a number that is simply false.
          The real value sits beside it, visually hidden and always correct, so a screen
          reader announces NZ$3.95bn and never NZ$1.53bn. */}
      <span aria-hidden="true">{reduced || !match ? value : shown}</span>
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

/* --- header that condenses --------------------------------------------------------------
   Impossible in the Studio build: position fixed inside the Embed iframe pinned to the
   iframe's own viewport, not the window, so the header scrolled away with the content. */

export function StickyHeader({
  logo,
  links,
  cta,
}: {
  logo: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md"
      animate={{
        backgroundColor: solid ? 'rgba(14,5,34,0.92)' : 'rgba(14,5,34,0)',
        paddingTop: solid ? 10 : 20,
        paddingBottom: solid ? 10 : 20,
      }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="India New Zealand Business Council"
            animate={{ height: solid ? 28 : 38 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lime px-5 py-2 text-sm font-medium text-navy transition-transform active:scale-95"
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

export type { MotionValue };
