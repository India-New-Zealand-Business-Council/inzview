import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function EventsPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Events"
        sub="Briefings, delegations, networking and the annual INZBC Summit — the main ways to engage with the NZ–India trade community."
        secondaryCta="Past events"
        secondaryHref="/events/past"
      />
      <InzCardGrid
        title="Upcoming events"
        cards={[
          { title: '[[Event title]]', body: '[[Date, venue / format]]', cta: 'Register', href: '#' },
          { title: 'INZBC Summit', body: '[[Venue / format]]', cta: 'Register', href: '#' },
        ]}
      />
    </>
  );
}
