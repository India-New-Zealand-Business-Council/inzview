import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './CorridorPortal.css';

export type CorridorPortalProps = Readonly<{
  imageSrc: string;
  imagePosition?: string;
  imageWidth?: number;
  imageHeight?: number;
  originLabel: string;
  destinationLabel: string;
}>;

const DESKTOP_ROUTE =
  'M320 240 C430 390 650 38 1015 145 C925 190 820 350 740 480';
const MOBILE_ROUTE =
  'M209 150 C160 276 610 178 580 304 C548 414 96 400 18 560';
const RESOLVED_TRANSFORM = 'translate3d(0, 0, 0) scale(1)';

/**
 * A decorative visual callback that turns the hero photograph into the FTA data route.
 * All facts remain in the surrounding TradeThread content, so this layer can disappear in
 * forced-colour or reduced-motion contexts without losing meaning.
 */
export default function CorridorPortal({
  imageSrc,
  imagePosition = 'center',
  imageWidth = 1200,
  imageHeight = 1600,
  originLabel,
  destinationLabel,
}: CorridorPortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ['start 92%', 'end 24%'],
  });

  const photoClip = useTransform(
    scrollYProgress,
    [0.06, 0.24, 0.58],
    [
      'circle(75% at 50% 50%)',
      'circle(75% at 50% 50%)',
      'circle(6% at 50% 50%)',
    ],
    { clamp: true },
  );
  const photoTransform = useTransform(
    scrollYProgress,
    [0.04, 0.58],
    ['translate3d(0, 0, 0) scale(1)', 'translate3d(0, 0, 0) scale(1.06)'],
    { clamp: true },
  );
  const fieldOpacity = useTransform(scrollYProgress, [0.12, 0.38], [0.12, 1], {
    clamp: true,
  });
  const fieldTransform = useTransform(
    scrollYProgress,
    [0.12, 0.42],
    ['translate3d(0, 14px, 0) scale(0.985)', RESOLVED_TRANSFORM],
    { clamp: true },
  );
  const routeLength = useTransform(scrollYProgress, [0.28, 0.84], [0, 1], {
    clamp: true,
  });
  const routeOpacity = useTransform(scrollYProgress, [0.22, 0.38], [0.18, 1], {
    clamp: true,
  });
  const labelOpacity = useTransform(scrollYProgress, [0.38, 0.56], [0, 1], {
    clamp: true,
  });
  const destinationTransform = useTransform(
    scrollYProgress,
    [0.44, 0.62],
    ['translate3d(0, 0, 0) scale(0.72)', RESOLVED_TRANSFORM],
    { clamp: true },
  );
  const handoffOpacity = useTransform(scrollYProgress, [0.68, 0.82], [0, 1], {
    clamp: true,
  });
  const handoffTransform = useTransform(
    scrollYProgress,
    [0.68, 0.96],
    ['translate3d(0, 0, 0) scaleY(0)', 'translate3d(0, 0, 0) scaleY(1)'],
    { clamp: true },
  );

  const photoStyle = reducedMotion
    ? {
        clipPath: 'circle(6% at 50% 50%)',
        transform: 'translate3d(0, 0, 0) scale(1.06)',
      }
    : { clipPath: photoClip, transform: photoTransform };
  const fieldStyle = reducedMotion
    ? { opacity: 1, transform: RESOLVED_TRANSFORM }
    : { opacity: fieldOpacity, transform: fieldTransform };
  const labelStyle = reducedMotion ? { opacity: 1 } : { opacity: labelOpacity };
  const destinationStyle = reducedMotion
    ? { opacity: 1, transform: RESOLVED_TRANSFORM }
    : { opacity: labelOpacity, transform: destinationTransform };
  const handoffStyle = reducedMotion
    ? { opacity: 1, transform: 'translate3d(0, 0, 0) scaleY(1)' }
    : { opacity: handoffOpacity, transform: handoffTransform };

  const routeStyle = reducedMotion
    ? { opacity: 1, pathLength: 1 }
    : { opacity: routeOpacity, pathLength: routeLength };

  return (
    <div ref={portalRef} className="home-corridor-portal" aria-hidden="true">
      <div className="home-shell home-corridor-portal__frame">
        <div className="home-corridor-portal__canvas">
          <div className="home-corridor-portal__photo-anchor">
            <motion.div className="home-corridor-portal__photo" style={photoStyle}>
              <img
                src={imageSrc}
                alt=""
                width={imageWidth}
                height={imageHeight}
                loading="lazy"
                style={{ objectPosition: imagePosition }}
              />
              <span className="home-corridor-portal__photo-shade" />
            </motion.div>
          </div>

          <motion.div className="home-corridor-portal__field" style={fieldStyle}>
            <svg
              className="home-corridor-portal__map home-corridor-portal__map--desktop"
              viewBox="0 0 1200 480"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path className="home-corridor-portal__route-track" d={DESKTOP_ROUTE} />
              <motion.path
                className="home-corridor-portal__route-active"
                d={DESKTOP_ROUTE}
                style={routeStyle}
              />
            </svg>

            <svg
              className="home-corridor-portal__map home-corridor-portal__map--mobile"
              viewBox="0 0 720 560"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path className="home-corridor-portal__route-track" d={MOBILE_ROUTE} />
              <motion.path
                className="home-corridor-portal__route-active"
                d={MOBILE_ROUTE}
                style={routeStyle}
              />
            </svg>

            <span className="home-corridor-portal__origin-marker" />
            <motion.span
              className="home-corridor-portal__destination-marker"
              style={destinationStyle}
            />

            <motion.span
              className="home-corridor-portal__country home-corridor-portal__country--origin"
              style={labelStyle}
            >
              {originLabel}
            </motion.span>
            <motion.span
              className="home-corridor-portal__country home-corridor-portal__country--destination"
              style={labelStyle}
            >
              {destinationLabel}
            </motion.span>
          </motion.div>
        </div>

        <div className="home-corridor-portal__handoff-grid">
          <motion.span className="home-corridor-portal__handoff" style={handoffStyle} />
        </div>
      </div>
    </div>
  );
}
