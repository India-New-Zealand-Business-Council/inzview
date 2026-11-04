/**
 * Diwali greeting schedule.
 *
 * Agreed with Sunil (WhatsApp, 4 Nov 2026): a countdown timer on the site until the
 * celebration starts, then fireworks and rangoli from Friday through Monday. Diwali itself
 * falls on Sunday 8 November 2026.
 *
 * Times are New Zealand time. NZ is on daylight time (UTC+13) for the whole window, so the
 * offsets are fixed. To reuse this next year, change these three timestamps — nothing else
 * in the component is date-specific.
 */
export const DIWALI = {
  /** Countdown banner appears from here. */
  countdownFrom: Date.parse('2026-11-01T00:00:00+13:00'),
  /** Friday 6 November 2026, 00:00 NZDT: fireworks and rangoli begin. */
  start: Date.parse('2026-11-06T00:00:00+13:00'),
  /** End of Monday 9 November 2026 (Tuesday 00:00 NZDT): everything disappears. */
  end: Date.parse('2026-11-10T00:00:00+13:00'),
} as const;

export type DiwaliPhase = 'off' | 'countdown' | 'live';

export function diwaliPhase(now: number): DiwaliPhase {
  if (now >= DIWALI.start && now < DIWALI.end) return 'live';
  if (now >= DIWALI.countdownFrom && now < DIWALI.start) return 'countdown';
  return 'off';
}

/**
 * `?diwali=countdown` or `?diwali=live` forces a phase so the greeting can be checked on the
 * published site before Friday. `?diwali=off` hides it. Anything else is ignored.
 */
export function previewPhase(search: string): DiwaliPhase | null {
  const value = new URLSearchParams(search).get('diwali');
  return value === 'countdown' || value === 'live' || value === 'off' ? value : null;
}

export function splitRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}
