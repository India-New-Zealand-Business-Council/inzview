import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './CorridorPortal.css';

export type CorridorPortalProps = Readonly<{
  imageSrc: string;
  imagePosition?: string;
  imageWidth?: number;
  imageHeight?: number;
  destinationImageSrc?: string;
  destinationImagePosition?: string;
  destinationImageWidth?: number;
  destinationImageHeight?: number;
  originLabel: string;
  destinationLabel: string;
}>;

const DESKTOP_ROUTE =
  'M258 292 C418 118 676 386 990 158';
const MOBILE_ROUTE =
  'M196 154 C104 254 604 278 522 402';
const RESOLVED_TRANSFORM = 'translate3d(0, 0, 0) scale(1)';

/**
 * A decorative visual handoff that carries the FTA route between New Zealand and India.
 * All facts remain in the surrounding TradeThread content, so this layer can disappear in
 * forced-colour or reduced-motion contexts without losing meaning.
 */
export default function CorridorPortal({
  imageSrc,
  imagePosition = 'center',
  imageWidth = 1280,
  imageHeight = 853,
  destinationImageSrc,
  destinationImagePosition = 'center',
  destinationImageWidth = 1200,
  destinationImageHeight = 800,
  originLabel,
  destinationLabel,
}: CorridorPortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ['start 92%', 'end 24%'],
  });

  const photoOpacity = useTransform(scrollYProgress, [0.04, 0.3], [0.45, 1], {
    clamp: true,
  });
  const originPhotoTransform = useTransform(
    scrollYProgress,
    [0.04, 0.46],
    ['translate3d(-5%, 0, 0) scale(1.045)', RESOLVED_TRANSFORM],
    { clamp: true },
  );
  const destinationPhotoTransform = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ['translate3d(5%, 0, 0) scale(1.045)', RESOLVED_TRANSFORM],
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

  const originPhotoStyle = reducedMotion
    ? { opacity: 1, transform: RESOLVED_TRANSFORM }
    : { opacity: photoOpacity, transform: originPhotoTransform };
  const destinationPhotoStyle = reducedMotion
    ? { opacity: 1, transform: RESOLVED_TRANSFORM }
    : { opacity: photoOpacity, transform: destinationPhotoTransform };
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
          <motion.div
            className="home-corridor-portal__photo home-corridor-portal__photo--origin"
            style={originPhotoStyle}
          >
            <img
              src={imageSrc}
              alt=""
              width={imageWidth}
              height={imageHeight}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: imagePosition }}
            />
            <span className="home-corridor-portal__photo-shade" />
          </motion.div>

          {destinationImageSrc ? (
            <motion.div
              className="home-corridor-portal__photo home-corridor-portal__photo--destination"
              style={destinationPhotoStyle}
            >
              <img
                src={destinationImageSrc}
                alt=""
                width={destinationImageWidth}
                height={destinationImageHeight}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: destinationImagePosition }}
              />
              <span className="home-corridor-portal__photo-shade" />
            </motion.div>
          ) : null}

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
