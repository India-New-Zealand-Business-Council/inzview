import React, { useId, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import './TradeThread.css';

export type TradeThreadStat = Readonly<{
  figure: React.ReactNode;
  label: React.ReactNode;
  note?: React.ReactNode;
}>;

export type TradeThreadStatus = Readonly<{
  label?: React.ReactNode;
  value: React.ReactNode;
  note?: React.ReactNode;
}>;

export type TradeThreadProps = Readonly<{
  /** Optional section id for direct links. */
  id?: string;
  /** Optional explicit heading id. A stable id is generated when omitted. */
  headingId?: string;
  /** Additional homepage-only class names. */
  className?: string;
  title: React.ReactNode;
  summary: React.ReactNode;
  status?: TradeThreadStatus;
  stats: readonly TradeThreadStat[];
  statsLabel?: string;
  action?: React.ReactNode;
  source?: React.ReactNode;
}>;

type ThreadNodeProps = Readonly<{
  index: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  stat: TradeThreadStat;
}>;

const COMPLETE_TRANSFORM = 'translate3d(0, 0, 0) scale(1)';
const THREAD_PATH =
  'M18 0 C18 12 7 15 18 25 S29 39 18 50 S7 64 18 75 S29 89 18 100';

/**
 * One factual waypoint on the thread.
 *
 * Only the decorative node responds to scroll. The figure and its supporting text never
 * move, count through invented intermediate values, or become hidden while someone reads.
 */
function ThreadNode({
  index,
  count,
  progress,
  reducedMotion,
  stat,
}: ThreadNodeProps) {
  const denominator = Math.max(1, count - 1);
  const position = count === 1 ? 0.5 : index / denominator;
  const centre = 0.2 + position * 0.64;
  const start = Math.max(0, centre - 0.055);
  const end = Math.min(1, centre + 0.055);

  const nodeOpacity = useTransform(progress, [start, end], [0.34, 1]);
  const nodeTransform = useTransform(
    progress,
    [start, end],
    [
      'translate3d(0, 0.35rem, 0) scale(0.92)',
      COMPLETE_TRANSFORM,
    ],
  );

  return (
    <li className="home-trade-thread__stat">
      <motion.span
        aria-hidden="true"
        className="home-trade-thread__node"
        style={
          reducedMotion
            ? { opacity: 1, transform: COMPLETE_TRANSFORM }
            : { opacity: nodeOpacity, transform: nodeTransform }
        }
      />
      <span aria-hidden="true" className="home-trade-thread__index">
        {String(index + 1).padStart(2, '0')}
      </span>
      <strong className="home-trade-thread__figure">{stat.figure}</strong>
      <h3>{stat.label}</h3>
      {stat.note ? <p>{stat.note}</p> : null}
    </li>
  );
}

/**
 * A self-contained, homepage-only FTA narrative.
 *
 * The small local SVG is revealed by a clipped foreground copy. This keeps the animated
 * paint area bounded to the statistics rail instead of repainting a page-height SVG. The
 * section stays in normal document flow: there is no pinning or scroll takeover.
 */
export default function TradeThread({
  id,
  headingId,
  className = '',
  title,
  summary,
  status,
  stats,
  statsLabel = 'The agreement in numbers',
  action,
  source,
}: TradeThreadProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const generatedHeadingId = useId();
  const resolvedHeadingId = headingId ?? `home-trade-thread-${generatedHeadingId.replace(/:/g, '')}`;
  const reducedMotion = useReducedMotion() === true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 82%', 'end 42%'],
  });
  const activeClip = useTransform(
    scrollYProgress,
    [0.08, 0.9],
    ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
    { clamp: true },
  );

  const classes = `home-trade-thread home-section ${className}`.trim();

  return (
    <section
      ref={sectionRef}
      id={id}
      className={classes}
      aria-labelledby={resolvedHeadingId}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <div className="home-trade-thread__ambient" aria-hidden="true" />
      <div className="home-shell home-trade-thread__layout">
        <header className="home-trade-thread__intro">
          <h2
            id={resolvedHeadingId}
            className="home-heading home-heading--light home-trade-thread__title"
          >
            {title}
          </h2>
          <div className="home-trade-thread__summary">{summary}</div>
          {action ? <div className="home-trade-thread__action">{action}</div> : null}
        </header>

        <div className="home-trade-thread__journey">
          {status ? (
            <dl className="home-trade-thread__status">
              <dt>{status.label ?? 'Current status'}</dt>
              <dd>
                <strong>{status.value}</strong>
                {status.note ? <span>{status.note}</span> : null}
              </dd>
            </dl>
          ) : null}

          <div className="home-trade-thread__stats-wrap">
            <span className="home-trade-thread__rail" aria-hidden="true">
              <svg
                className="home-trade-thread__rail-svg"
                viewBox="0 0 36 100"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path
                  className="home-trade-thread__rail-track"
                  d={THREAD_PATH}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <motion.svg
                className="home-trade-thread__rail-svg home-trade-thread__rail-svg--active"
                viewBox="0 0 36 100"
                preserveAspectRatio="none"
                focusable="false"
                style={{
                  clipPath: reducedMotion ? 'inset(0 0 0% 0)' : activeClip,
                }}
              >
                <path
                  d={THREAD_PATH}
                  vectorEffect="non-scaling-stroke"
                />
              </motion.svg>
            </span>

            <ol className="home-trade-thread__stats" aria-label={statsLabel}>
              {stats.map((stat, index) => (
                <ThreadNode
                  key={index}
                  index={index}
                  count={stats.length}
                  progress={scrollYProgress}
                  reducedMotion={reducedMotion}
                  stat={stat}
                />
              ))}
            </ol>
          </div>

          {source ? <footer className="home-trade-thread__source">{source}</footer> : null}
        </div>
      </div>
    </section>
  );
}
