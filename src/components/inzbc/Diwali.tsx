import { useCallback, useEffect, useRef, useState } from 'react';
import { DIWALI, diwaliPhase, previewPhase, splitRemaining, type DiwaliPhase } from './diwaliSchedule';
import './Diwali.css';

/**
 * Site-wide Diwali greeting, mounted once in the router Layout so it shows on every page.
 *
 *   before DIWALI.start   a small countdown banner
 *   start → end           fireworks over the page on arrival, and a rangoli greeting banner
 *   after DIWALI.end      nothing renders
 *
 * The phase is re-checked every second, so a visitor with the page open at midnight on
 * Friday sees the countdown turn into fireworks without reloading. Both banners can be
 * dismissed; that choice lasts for the browser session only. Fireworks are skipped entirely
 * for visitors who ask for reduced motion, and the canvas never takes pointer events, so
 * nothing on the page is ever blocked.
 */

const PALETTE = ['#ffb000', '#ff7a1a', '#b8f07c', '#ff5fb8', '#fff3c4', '#c77dff'];
const FIREWORKS_MS = 9_000;
const MAX_BACKING_PIXELS = 4_000_000;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
};

type Rocket = { x: number; y: number; vy: number; targetY: number; color: string };

function dismissedKey(phase: DiwaliPhase) {
  return `inzbc-diwali-dismissed-${phase}-${new Date(DIWALI.start).getUTCFullYear()}`;
}

function readDismissed(phase: DiwaliPhase) {
  try {
    return window.sessionStorage.getItem(dismissedKey(phase)) === '1';
  } catch {
    return false;
  }
}

function writeDismissed(phase: DiwaliPhase) {
  try {
    window.sessionStorage.setItem(dismissedKey(phase), '1');
  } catch {
    // Storage blocked (private window etc.): the banner just closes for this page view.
  }
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ fireworks */

function Fireworks({ burstKey }: { burstKey: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let width = 1;
    let height = 1;
    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      const scale = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_BACKING_PIXELS / (width * height)));
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const startedAt = performance.now();
    let lastLaunch = 0;
    let lastFrame = startedAt;
    let frame = 0;

    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];

    const launch = () => {
      rockets.push({
        x: width * (0.12 + Math.random() * 0.76),
        y: height,
        vy: -(height * (0.95 + Math.random() * 0.35)),
        targetY: height * (0.12 + Math.random() * 0.33),
        color: pick(),
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 70 + Math.floor(Math.random() * 40);
      const speed = Math.min(width, height) * (0.22 + Math.random() * 0.12);
      const second = Math.random() < 0.4 ? pick() : color;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.08;
        const v = speed * (0.55 + Math.random() * 0.45);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 1,
          decay: 0.55 + Math.random() * 0.35,
          color: i % 3 === 0 ? second : color,
          size: 1.4 + Math.random() * 1.4,
        });
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const elapsed = now - startedAt;

      if (elapsed < FIREWORKS_MS && now - lastLaunch > 380 + Math.random() * 420) {
        launch();
        if (Math.random() < 0.35) launch();
        lastLaunch = now;
      }

      // Fade the previous frame instead of clearing it, which leaves short light trails.
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'rgba(0, 0, 0, 0.22)';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.y += r.vy * dt;
        context.fillStyle = r.color;
        context.beginPath();
        context.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        context.fill();
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      const gravity = height * 0.18;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.vx *= 1 - 1.4 * dt;
        p.vy = p.vy * (1 - 1.4 * dt) + gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        context.globalAlpha = Math.max(0, p.life);
        context.fillStyle = p.color;
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      if (elapsed < FIREWORKS_MS || rockets.length || particles.length) {
        frame = requestAnimationFrame(tick);
      } else {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        resize();
        frame = 0;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [burstKey]);

  return <canvas ref={canvasRef} className="inzbc-diwali__fireworks" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ rangoli */

function petalRing(count: number, radius: number, length: number, width: number, fill: string, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i + offset;
    return (
      <ellipse
        key={`${radius}-${i}`}
        cx="0"
        cy={-radius}
        rx={width}
        ry={length}
        fill={fill}
        transform={`rotate(${angle})`}
      />
    );
  });
}

function dotRing(count: number, radius: number, r: number, fill: string, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (((360 / count) * i + offset) * Math.PI) / 180;
    return (
      <circle key={`d${radius}-${i}`} cx={Math.sin(angle) * radius} cy={-Math.cos(angle) * radius} r={r} fill={fill} />
    );
  });
}

export function Rangoli({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <circle r="98" fill="#2a0f55" />
      {dotRing(32, 92, 2.6, '#fff3c4')}
      {petalRing(16, 70, 20, 9, '#ff7a1a')}
      {petalRing(16, 70, 12, 4.5, '#ffb000')}
      {petalRing(8, 46, 22, 12, '#ff5fb8', 22.5)}
      {petalRing(8, 46, 13, 6, '#c77dff', 22.5)}
      {petalRing(8, 44, 18, 8, '#b8f07c')}
      <circle r="30" fill="#61145f" />
      {petalRing(12, 18, 9, 4, '#ffb000')}
      {dotRing(12, 26, 1.8, '#fff3c4', 15)}
      <circle r="10" fill="#fff3c4" />
      {/* A diya flame at the centre. */}
      <path d="M0 -8 C 4 -3, 4 2, 0 4 C -4 2, -4 -3, 0 -8 Z" fill="#ff7a1a" />
      <path d="M0 -4 C 2 -1, 2 2, 0 3 C -2 2, -2 -1, 0 -4 Z" fill="#ffb000" />
    </svg>
  );
}

/* ------------------------------------------------------------------ banners */

function Countdown({ now, onClose }: { now: number; onClose: () => void }) {
  const { days, hours, minutes, seconds } = splitRemaining(DIWALI.start - now);
  const units = [
    ['days', days],
    ['hrs', hours],
    ['min', minutes],
    ['sec', seconds],
  ] as const;
  return (
    <aside className="inzbc-diwali__banner inzbc-diwali__banner--countdown" aria-label="Diwali countdown">
      <Rangoli className="inzbc-diwali__rangoli inzbc-diwali__rangoli--small" />
      <div className="inzbc-diwali__copy">
        <p className="inzbc-diwali__eyebrow">Diwali celebrations begin in</p>
        <p className="inzbc-diwali__timer" role="timer" aria-live="off">
          {units.map(([label, value]) => (
            <span key={label} className="inzbc-diwali__unit">
              <span className="inzbc-diwali__value">{String(value).padStart(2, '0')}</span>
              <span className="inzbc-diwali__label">{label}</span>
            </span>
          ))}
        </p>
      </div>
      <button type="button" className="inzbc-diwali__close" onClick={onClose} aria-label="Close Diwali countdown">
        ×
      </button>
    </aside>
  );
}

function Greeting({
  onClose,
  onReplay,
  canReplay,
}: {
  onClose: () => void;
  onReplay: () => void;
  canReplay: boolean;
}) {
  return (
    <aside className="inzbc-diwali__banner inzbc-diwali__banner--live" aria-label="Happy Diwali">
      <Rangoli className="inzbc-diwali__rangoli inzbc-diwali__rangoli--spin" />
      <div className="inzbc-diwali__copy">
        <p className="inzbc-diwali__title">Happy Diwali</p>
        <p className="inzbc-diwali__message">
          Wishing our members, partners and friends in New Zealand and India a bright and prosperous festival of
          lights.
        </p>
        {canReplay ? (
          <button type="button" className="inzbc-diwali__replay" onClick={onReplay}>
            More fireworks
          </button>
        ) : null}
      </div>
      <button type="button" className="inzbc-diwali__close" onClick={onClose} aria-label="Close Diwali greeting">
        ×
      </button>
    </aside>
  );
}

export default function Diwali() {
  const now = useNow();
  const reducedMotion = useReducedMotion();
  const [forced] = useState(() => previewPhase(window.location.search));
  const phase = forced ?? diwaliPhase(now);
  const [dismissed, setDismissed] = useState<Partial<Record<DiwaliPhase, boolean>>>(() => ({
    countdown: readDismissed('countdown'),
    live: readDismissed('live'),
  }));
  // Fireworks play once per page load on arrival during the live window, and again on request.
  const [burstKey, setBurstKey] = useState(0);
  const [fireworksOn, setFireworksOn] = useState(false);

  useEffect(() => {
    if (phase === 'live' && !reducedMotion && !readDismissed('live')) setFireworksOn(true);
  }, [phase, reducedMotion]);

  const close = useCallback((which: DiwaliPhase) => {
    writeDismissed(which);
    setDismissed((current) => ({ ...current, [which]: true }));
  }, []);

  const replay = useCallback(() => {
    setFireworksOn(true);
    setBurstKey((key) => key + 1);
  }, []);

  if (phase === 'off') return null;

  return (
    <>
      {phase === 'live' && fireworksOn && !reducedMotion ? <Fireworks burstKey={burstKey} /> : null}
      {phase === 'countdown' && !dismissed.countdown ? (
        <Countdown now={forced ? Math.min(now, DIWALI.start - 1000) : now} onClose={() => close('countdown')} />
      ) : null}
      {phase === 'live' && !dismissed.live ? (
        <Greeting onClose={() => close('live')} onReplay={replay} canReplay={!reducedMotion} />
      ) : null}
    </>
  );
}
