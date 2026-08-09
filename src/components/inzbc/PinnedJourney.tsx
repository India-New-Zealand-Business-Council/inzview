import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { STATS } from './content';
import { CountUp, usePinProgress } from './motion';

/**
 * The pinned trade journey.
 *
 * A tall outer container gives the section scroll distance; an inner panel sticks to the
 * viewport for the whole of it. The visitor scrolls, the panel holds still, and the three
 * statistics arrive one at a time as the route travels across.
 *
 * This is the section the Wix Studio build could not have. Everything there rendered inside
 * one Embed iframe, so `position: sticky` pinned to the iframe rather than to the window,
 * and the parent's scroll only arrived by postMessage every 50ms — 20 updates a second
 * against 60 frames. A pinned panel driven at 20fps reads as a stutter, which is why I said
 * it was not worth building. On a real page it is four lines of CSS and a scroll hook.
 *
 * Under reduced motion the whole conceit is dropped: no pinning, no scroll linkage, just
 * the three figures stated plainly in a row.
 */
/** One figure, fading up as the marker reaches its third of the track. Separate component
    so its transforms are ordinary top-level hooks rather than hooks inside a loop. */
function Stat({
  stat,
  index,
  progress,
}: {
  stat: (typeof STATS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.28 + 0.06;
  const opacity = useTransform(progress, [start, start + 0.16], [0.15, 1]);
  const y = useTransform(progress, [start, start + 0.16], [26, 0]);
  return (
    <motion.div style={{ opacity, y }}>
      <p className="font-heading text-5xl leading-none text-lime md:text-6xl">
        <CountUp value={stat.figure} />
      </p>
      <p className="mt-3 text-lg text-white">{stat.label}</p>
      <p className="mt-1 text-sm text-white/70">{stat.note}</p>
    </motion.div>
  );
}

export default function PinnedJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Progress through this section specifically: 0 when its top hits the top of the
  // viewport, 1 when its bottom does.
  const scrollYProgress = usePinProgress(ref);

  // The travelling marker crosses the panel as the section is scrolled.
  const markerX = useTransform(scrollYProgress, [0.05, 0.95], ['4%', '96%']);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const washY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  if (reduced) {
    return (
      <section className="relative bg-ink px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">The opportunity</p>
          <h2 className="mb-12 font-heading text-4xl md:text-5xl">In numbers</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-5xl text-lime">{s.figure}</p>
                <p className="mt-2 text-lg text-white">{s.label}</p>
                <p className="mt-1 text-sm text-white/70">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    // Three viewport heights of scroll distance, one per statistic.
    <section ref={ref} className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Slow background wash, the furthest depth tier. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-1/4 top-1/4 h-[40rem] rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(closest-side, rgba(97,20,95,0.9), transparent)',
            y: washY,
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">The opportunity</p>
          <h2 className="mb-4 max-w-2xl font-heading text-4xl leading-tight text-white md:text-6xl">
            What the agreement is worth
          </h2>
          <p className="mb-14 max-w-xl text-white/70">
            The New Zealand&ndash;India Free Trade Agreement was signed on 27 April 2026 and
            awaits domestic ratification in both countries.
          </p>

          {/* The track the marker travels, and the marker itself. */}
          <div className="relative mb-14 h-px w-full bg-white/15">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-lime"
              style={{ scaleX: lineScale, width: '100%' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
              style={{
                left: markerX,
                boxShadow: '0 0 0 6px rgba(184,240,124,0.2), 0 0 24px 8px rgba(184,240,124,0.5)',
              }}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Stat key={s.label} stat={s} index={i} progress={scrollYProgress} />
            ))}
          </div>

          <p className="mt-12 text-xs text-white/50">
            Figures sourced from MFAT&rsquo;s National Interest Analysis, verified 1 August 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
