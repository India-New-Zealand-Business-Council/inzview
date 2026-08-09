import React, { useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { usePageProgress } from './motion';

/**
 * The trade route: one line running the whole page, drawing itself as the visitor scrolls.
 *
 * This is the page's persistent object — the same stroke leaves New Zealand at the hero and
 * arrives at the closing call to action.
 *
 * The Wix Studio build could only approximate this. Everything there lived inside one
 * sandboxed iframe that could not see the parent's scroll, so the route had to be advanced
 * in steps by an IntersectionObserver, one per band. Here `useScroll` reads the real
 * document scroll every frame, so `pathLength` is genuinely continuous rather than a dozen
 * eased jumps pretending to be.
 *
 * Three stacked strokes because the route crosses both dark and light bands and no single
 * colour stays legible on both: a dark blurred halo that only shows against pale surfaces,
 * a lime glow that only shows against dark ones, and a crisp line on top.
 */

const ROUTE_D =
  'M 18 0 C 18 90, 82 130, 82 220 S 18 330, 18 430 S 82 540, 82 640 S 22 760, 22 860 L 22 1000';

export default function TradeRoute() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollYProgress = usePageProgress();

  // Spring the raw progress so fast flicks glide rather than snap. Low stiffness, high
  // damping: this should feel like a line being drawn, not a value being tracked.
  const drawn = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 26,
    restDelta: 0.0005,
  });

  // Under reduced motion the route is simply present, fully drawn, with no scroll linkage.
  const pathLength = reduced ? 1 : drawn;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        focusable="false"
      >
        {/* Halo. Only reads against the mist and white bands. */}
        <motion.path
          d={ROUTE_D}
          fill="none"
          stroke="rgba(12,5,28,0.45)"
          strokeWidth={9}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, filter: 'blur(6px)' }}
        />
        {/* Glow. Only reads against the navy and ink bands. */}
        <motion.path
          d={ROUTE_D}
          fill="none"
          stroke="#b8f07c"
          strokeWidth={7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, filter: 'blur(8px)', opacity: 0.55 }}
        />
        {/* The line itself. */}
        <motion.path
          d={ROUTE_D}
          fill="none"
          stroke="#b8f07c"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, opacity: 0.95 }}
        />
      </svg>
    </div>
  );
}
