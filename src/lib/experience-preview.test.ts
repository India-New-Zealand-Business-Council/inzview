import { describe, expect, it } from 'vitest';
import {
  registrationPreviewSummary,
  upcomingPreviewEvents,
  type EventForPreview,
} from './experience-preview';

const examples: EventForPreview[] = [
  { title: 'Historical', sortKey: '2026-09-01', date: '1 September', sourceSlug: 'historical', description: '' },
  { title: 'Future', sortKey: '2026-11-12', date: '12 November', sourceSlug: 'future', description: '' },
  { title: 'Today', sortKey: '2026-10-27', date: '27 October', sourceSlug: 'today', description: '' },
  { title: 'Undated', sortKey: '0000-00-00', date: 'Unknown', sourceSlug: 'undated', description: '' },
];

describe('Sunil stakeholder registration preview', () => {
  it('lists only current or future-dated events in ascending order', () => {
    expect(upcomingPreviewEvents(examples, '2026-10-27').map((item) => item.title)).toEqual([
      'Today', 'Future',
    ]);
    expect(examples[0].title).toBe('Historical'); // no mutation of published event list
  });

  it('shows an empty state once the event calendar has no future entries', () => {
    expect(upcomingPreviewEvents(examples, '2027-01-01')).toEqual([]);
  });

  it('never claims a reservation, payment or confirmation from a preview choice', () => {
    const summary = registrationPreviewSummary(examples[1], 'two');
    expect(summary).toContain('2 attendees (selection only)');
    expect(summary).not.toMatch(/confirmed|booked|paid|ticket/i);
    expect(registrationPreviewSummary(undefined, 'one')).toBeNull();
  });
});
