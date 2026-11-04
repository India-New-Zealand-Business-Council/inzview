import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  currentWindow,
  diwaliPhase,
  previewPhase,
  splitRemaining,
  type DiwaliPhase,
} from './diwaliSchedule';
import './Diwali.css';

/**
 * Site-wide Diwali greeting, mounted once in the router Layout so it shows on every page.
 * It runs itself every year from the dates in diwaliSchedule.ts:
 *
 *   countdown   a glowing countdown banner with a lit diya
 *   live        on the first page of a visit: a full-screen "Happy Diwali" moment — a rangoli
 *               that draws itself in, a row of flickering diyas and fireworks — which fades
 *               after a few seconds (or on any click / Esc) into a greeting banner. Fireworks
 *               also play briefly on every later page load, and on request.
 *   off         nothing renders
 *
 * The phase is re-checked every second, so a page left open at midnight switches on its
 * own. Banners can be closed for the session. Fireworks are skipped for visitors who ask for
 * reduced motion, and the fireworks canvas never takes pointer events.
 */

const PALETTE = ['#ffb000', '#ff8a1f', '#ffd76a', '#ff5fb8', '#fff3c4', '#c77dff', '#b8f07c'];
const INTRO_MS = 7_000;
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
  twinkle: boolean;
};

type Rocket = { x: number; y: number; vx: number; vy: number; targetY: number; color: string };

function storageKey(name: string, year: number) {
  return `inzbc-diwali-${name}-${year}`;
}

function readFlag(key: string) {
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeFlag(key: string) {
  try {
    window.sessionStorage.setItem(key, '1');
  } catch {
    // Storage blocked (private window etc.): the choice lasts for this page view only.
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
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ fireworks */

function Fireworks({ burstKey, duration }: { burstKey: number; duration: number }) {
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
    let nextLaunch = startedAt + 150;
    let lastFrame = startedAt;
    let frame = 0;

    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];

    const launch = () => {
      const x = width * (0.1 + Math.random() * 0.8);
      rockets.push({
        x,
        y: height + 10,
        vx: (width / 2 - x) * 0.08 * Math.random(),
        vy: -(height * (1.05 + Math.random() * 0.35)),
        targetY: height * (0.1 + Math.random() * 0.32),
        color: pick(),
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const style = Math.random();
      const count = style < 0.25 ? 120 : 80 + Math.floor(Math.random() * 30);
      const speed = Math.min(width, height) * (0.24 + Math.random() * 0.14);
      const second = pick();
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.06;
        // A quarter of bursts are double rings ("peony with a pistil").
        const ring = style < 0.25 && i % 2 === 0 ? 0.55 : 1;
        const v = speed * ring * (0.75 + Math.random() * 0.25);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 1,
          decay: 0.45 + Math.random() * 0.3,
          color: ring < 1 ? second : color,
          size: 1.3 + Math.random() * 1.5,
          twinkle: style > 0.7,
        });
      }
      // A brief flash at the centre of each burst.
      particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 4, color: '#fff8e1', size: 14, twinkle: false });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const elapsed = now - startedAt;

      if (elapsed < duration && now >= nextLaunch) {
        launch();
        if (Math.random() < 0.45) launch();
        nextLaunch = now + 300 + Math.random() * 450;
      }

      // Fade the previous frame instead of clearing it, which leaves soft light trails.
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        context.fillStyle = '#ffe3a3';
        context.beginPath();
        context.arc(r.x, r.y, 2, 0, Math.PI * 2);
        context.fill();
        // Sparks falling from the rising rocket.
        if (Math.random() < 0.6) {
          particles.push({
            x: r.x,
            y: r.y,
            vx: (Math.random() - 0.5) * 30,
            vy: 20 + Math.random() * 30,
            life: 0.6,
            decay: 1.6,
            color: '#ffb000',
            size: 1.1,
            twinkle: false,
          });
        }
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      const gravity = height * 0.16;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.vx *= 1 - 1.5 * dt;
        p.vy = p.vy * (1 - 1.5 * dt) + gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = p.twinkle && p.life < 0.6 ? p.life * (Math.random() < 0.5 ? 0.2 : 1) : p.life;
        context.globalAlpha = Math.max(0, Math.min(1, alpha));
        context.fillStyle = p.color;
        context.beginPath();
        context.arc(p.x, p.y, p.size * (p.decay > 3 ? p.life : 1), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      if (elapsed < duration || rockets.length || particles.length) {
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
  }, [burstKey, duration]);

  return <canvas ref={canvasRef} className="inzbc-diwali__fireworks" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ rangoli & diya */

function petalRing(count: number, radius: number, length: number, width: number, fill: string, offset = 0) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={i}
      cx="0"
      cy={-radius}
      rx={width}
      ry={length}
      fill={fill}
      transform={`rotate(${(360 / count) * i + offset})`}
    />
  ));
}

function dotRing(count: number, radius: number, r: number, fill: string, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (((360 / count) * i + offset) * Math.PI) / 180;
    return <circle key={i} cx={Math.sin(angle) * radius} cy={-Math.cos(angle) * radius} r={r} fill={fill} />;
  });
}

function leafRing(count: number, radius: number, size: number, fill: string, offset = 0) {
  // Paisley-like teardrops pointing outward.
  return Array.from({ length: count }, (_, i) => (
    <path
      key={i}
      d={`M0 ${-radius} C ${size} ${-radius - size}, ${size * 0.4} ${-radius - size * 2.4}, 0 ${-radius - size * 2.6} C ${-size * 0.4} ${-radius - size * 2.4}, ${-size} ${-radius - size}, 0 ${-radius} Z`}
      fill={fill}
      transform={`rotate(${(360 / count) * i + offset})`}
    />
  ));
}

/** Eight-fold rangoli. With `assemble`, each ring blooms in from the centre outward. */
export function Rangoli({ className, assemble = false }: { className?: string; assemble?: boolean }) {
  const ring = (index: number) => ({
    className: assemble ? 'inzbc-diwali__ring' : undefined,
    style: assemble ? ({ '--i': index } as CSSProperties) : undefined,
  });
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="inzbc-rangoli-base" r="1">
          <stop offset="0%" stopColor="#4a1670" />
          <stop offset="100%" stopColor="#1f0a42" />
        </radialGradient>
      </defs>
      <g {...ring(7)}>
        <circle r="99" fill="url(#inzbc-rangoli-base)" />
        <circle r="96" fill="none" stroke="#ffb000" strokeWidth="1.2" strokeDasharray="2 3" />
      </g>
      <g {...ring(6)}>{dotRing(36, 91, 2.4, '#fff3c4')}</g>
      <g {...ring(5)}>
        {leafRing(16, 62, 7, '#ff8a1f')}
        {leafRing(16, 64, 4, '#ffd76a')}
      </g>
      <g {...ring(4)}>
        {petalRing(16, 60, 13, 7, '#e0218a', 11.25)}
        {petalRing(16, 60, 7, 3.2, '#ff9bd2', 11.25)}
      </g>
      <g {...ring(3)}>
        {petalRing(8, 40, 20, 12, '#ffb000')}
        {petalRing(8, 40, 13, 7, '#ff6a00')}
        {petalRing(8, 40, 6, 2.6, '#fff3c4')}
      </g>
      <g {...ring(2)}>
        {petalRing(8, 38, 15, 8, '#2fbf8f', 22.5)}
        {petalRing(8, 38, 8, 3.5, '#b8f07c', 22.5)}
      </g>
      <g {...ring(1)}>
        <circle r="24" fill="#61145f" />
        {petalRing(12, 15, 8, 3.6, '#ffd76a')}
        {dotRing(12, 21, 1.6, '#fff3c4', 15)}
      </g>
      <g {...ring(0)}>
        <circle r="9" fill="#fff3c4" />
        <circle r="6" fill="#ffb000" />
        <circle r="3" fill="#ff6a00" />
      </g>
    </svg>
  );
}

/** A clay diya with a flickering flame. `delay` staggers the flicker across a row. */
export function Diya({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      className={['inzbc-diwali__diya', className].filter(Boolean).join(' ')}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <defs>
        <radialGradient id="inzbc-diya-glow">
          <stop offset="0%" stopColor="#ffd76a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff8a1f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="inzbc-diya-clay" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e3742b" />
          <stop offset="100%" stopColor="#9c3d12" />
        </linearGradient>
        <linearGradient id="inzbc-diya-flame" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff8e1" />
          <stop offset="45%" stopColor="#ffd23f" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
      </defs>
      <circle className="inzbc-diwali__diya-glow" cx="32" cy="26" r="20" fill="url(#inzbc-diya-glow)" />
      <path
        className="inzbc-diwali__diya-flame"
        d="M32 8 C 38 18, 38 26, 32 31 C 26 26, 26 18, 32 8 Z"
        fill="url(#inzbc-diya-flame)"
      />
      <path d="M8 36 C 14 54, 50 54, 56 36 C 46 40, 18 40, 8 36 Z" fill="url(#inzbc-diya-clay)" />
      <path d="M8 36 C 18 40, 46 40, 56 36" fill="none" stroke="#ffcf8a" strokeWidth="1.5" />
      <circle cx="22" cy="44" r="1.6" fill="#ffd76a" />
      <circle cx="32" cy="46" r="1.6" fill="#ffd76a" />
      <circle cx="42" cy="44" r="1.6" fill="#ffd76a" />
    </svg>
  );
}

/* ------------------------------------------------------------------ views */

function Countdown({ target, now, onClose }: { target: number; now: number; onClose: () => void }) {
  const { days, hours, minutes, seconds } = splitRemaining(target - now);
  const units = [
    ['Days', days],
    ['Hours', hours],
    ['Mins', minutes],
    ['Secs', seconds],
  ] as const;
  return (
    <aside className="inzbc-diwali__banner inzbc-diwali__banner--countdown" aria-label="Diwali countdown">
      <Diya className="inzbc-diwali__banner-diya" />
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

function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leave = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(leave, INTRO_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') leave();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [leave]);

  useEffect(() => {
    if (!leaving) return undefined;
    const timer = window.setTimeout(onDone, 700);
    return () => window.clearTimeout(timer);
  }, [leaving, onDone]);

  return (
    <div
      className={`inzbc-diwali__intro${leaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Happy Diwali from INZBC"
      onClick={leave}
    >
      <div className="inzbc-diwali__intro-inner">
        <Rangoli className="inzbc-diwali__intro-rangoli" assemble />
        <p className="inzbc-diwali__intro-kicker">India New Zealand Business Council</p>
        <h2 className="inzbc-diwali__intro-title">Happy Diwali</h2>
        <p className="inzbc-diwali__intro-message">
          Wishing our members, partners and friends in New Zealand and India a bright and prosperous festival of
          lights.
        </p>
        <div className="inzbc-diwali__diyas">
          {[0, 1, 2, 3, 4].map((i) => (
            <Diya key={i} delay={i * 230} />
          ))}
        </div>
        <button ref={buttonRef} type="button" className="inzbc-diwali__enter" onClick={leave}>
          Continue to site
        </button>
      </div>
    </div>
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
      <Rangoli className="inzbc-diwali__banner-rangoli" />
      <div className="inzbc-diwali__copy">
        <p className="inzbc-diwali__title">Happy Diwali</p>
        <p className="inzbc-diwali__message">From all of us at INZBC — may the festival of lights bring you joy.</p>
        {canReplay ? (
          <button type="button" className="inzbc-diwali__replay" onClick={onReplay}>
            ✨ More fireworks
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
  // Preview of the countdown after the real one has passed counts to a point 2 days ahead.
  const [previewTarget] = useState(() => Date.now() + 2 * 86_400_000 + 5 * 3_600_000);
  const window_ = currentWindow(now);
  const year = window_?.year ?? new Date(now).getFullYear();
  const phase = forced ?? diwaliPhase(now, window_);

  const [closed, setClosed] = useState(() => ({
    countdown: readFlag(storageKey('countdown-closed', year)),
    live: readFlag(storageKey('live-closed', year)),
  }));
  const [introSeen, setIntroSeen] = useState(() => forced !== 'live' && readFlag(storageKey('intro-seen', year)));
  const [burst, setBurst] = useState<{ key: number; duration: number } | null>(null);

  // Fireworks on arrival: a long show with the intro, a short one on later page loads.
  useEffect(() => {
    if (phase !== 'live' || reducedMotion) return;
    setBurst((current) => current ?? { key: 0, duration: introSeen ? 4_000 : INTRO_MS });
  }, [phase, reducedMotion, introSeen]);

  const close = useCallback(
    (which: 'countdown' | 'live') => {
      writeFlag(storageKey(`${which}-closed`, year));
      setClosed((current) => ({ ...current, [which]: true }));
    },
    [year],
  );

  const finishIntro = useCallback(() => {
    writeFlag(storageKey('intro-seen', year));
    setIntroSeen(true);
  }, [year]);

  const replay = useCallback(() => setBurst((current) => ({ key: (current?.key ?? 0) + 1, duration: 6_000 })), []);

  if (phase === 'off') return null;

  const target = window_ && window_.start > now ? window_.start : previewTarget;

  return (
    <>
      {phase === 'live' && !introSeen ? <Intro onDone={finishIntro} /> : null}
      {phase === 'live' && burst && !reducedMotion ? <Fireworks burstKey={burst.key} duration={burst.duration} /> : null}
      {phase === 'countdown' && !closed.countdown ? (
        <Countdown target={target} now={now} onClose={() => close('countdown')} />
      ) : null}
      {phase === 'live' && introSeen && !closed.live ? (
        <Greeting onClose={() => close('live')} onReplay={replay} canReplay={!reducedMotion} />
      ) : null}
    </>
  );
}
