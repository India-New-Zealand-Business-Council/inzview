/**
 * Diwali greeting schedule — reused every year.
 *
 * Agreed with Sunil (WhatsApp, 4 Nov 2026): a countdown on the site, then fireworks and
 * rangoli from the Friday through the Monday of Diwali weekend, then it switches itself off.
 *
 * Diwali follows the lunar calendar, so its date can't be calculated with a simple formula.
 * Each year's Lakshmi Puja date is listed below. To keep this going, add next year's date
 * (check it against a panchang or the Indian government holiday list first). Nothing else
 * needs to change.
 *
 * The window for each year is worked out from that date:
 *   start          Friday on or before Diwali, 00:00 NZ time
 *   end            end of the Monday after that Friday, or end of Diwali day if later
 *                  (so a Tuesday Diwali still gets its own day)
 *   countdownFrom  14 days before start
 *
 * All times are New Zealand time. Diwali always falls in October or November, when NZ is
 * on daylight time (UTC+13), so a fixed offset is correct.
 */
export const DIWALI_DATES = [
  '2026-11-08', // Sunday
  '2027-10-29', // Friday
  '2028-10-17', // Tuesday
  '2029-11-05', // Monday
  '2030-10-26', // Saturday
] as const;

const NZDT = '+13:00';
const DAY = 86_400_000;
const COUNTDOWN_DAYS = 14;

export type DiwaliWindow = {
  year: number;
  diwali: number;
  countdownFrom: number;
  start: number;
  end: number;
};

export function windowFor(date: string): DiwaliWindow {
  const diwali = Date.parse(`${date}T00:00:00${NZDT}`);
  // getUTCDay on the date string itself gives the NZ calendar weekday (0 = Sunday).
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  const daysBackToFriday = (weekday - 5 + 7) % 7;
  const start = diwali - daysBackToFriday * DAY;
  const mondayEnd = start + 4 * DAY; // Tuesday 00:00 after the Friday
  const end = Math.max(mondayEnd, diwali + DAY);
  return { year: Number(date.slice(0, 4)), diwali, countdownFrom: start - COUNTDOWN_DAYS * DAY, start, end };
}

const WINDOWS = DIWALI_DATES.map(windowFor);

/** The window that is current or next, or null once the list runs out. */
export function currentWindow(now: number): DiwaliWindow | null {
  return WINDOWS.find((w) => now < w.end) ?? null;
}

export type DiwaliPhase = 'off' | 'countdown' | 'live';

export function diwaliPhase(now: number, w: DiwaliWindow | null = currentWindow(now)): DiwaliPhase {
  if (!w) return 'off';
  if (now >= w.start && now < w.end) return 'live';
  if (now >= w.countdownFrom && now < w.start) return 'countdown';
  return 'off';
}

/**
 * `?diwali=countdown` or `?diwali=live` forces a phase so the greeting can be checked on the
 * published site ahead of time. `?diwali=off` hides it. Anything else is ignored.
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
