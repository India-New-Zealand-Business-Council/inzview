/** Pure presentation helpers; no membership, attendee or payment data is stored. */
export type EventForPreview = Readonly<{
  title: string;
  sortKey: string;
  date: string;
  sourceSlug: string;
  venue?: string;
  description: string;
}>;

export type AttendancePreference = 'one' | 'two' | 'three';


// Avoid locale-dependent en-CA formatting, which can yield MM/DD/YYYY on some hosts.
export function aucklandTodayIso(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function upcomingPreviewEvents<T extends EventForPreview>(
  events: readonly T[],
  todayIso: string,
): T[] {
  // Local time is supplied by the caller. Existing public site event dates
  // are ISO yyyy-mm-dd; undated archive posts ('0000-00-00') stay excluded.
  return events
    .filter((event) => /^\d{4}-\d{2}-\d{2}$/.test(event.sortKey) && event.sortKey >= todayIso)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export function registrationPreviewSummary(
  event: EventForPreview | undefined,
  people: AttendancePreference,
): string | null {
  if (!event) return null;
  const headcount = Number(people);
  if (![1, 2, 3].includes(headcount)) return null;
  return `${event.title} · ${event.date} · ${headcount} attendee${headcount === 1 ? '' : 's'} (selection only)`;
}
