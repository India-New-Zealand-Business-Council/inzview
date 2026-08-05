import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function TradeMissionsPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Trade missions and shows"
        sub="Delegations, trade shows and market events that connect New Zealand and Indian businesses."
      />
      <InzCardGrid
        title="Upcoming missions and shows"
        cards={[
          { title: '[[Mission / show name]]', body: '[[Date, location, description]]', cta: 'Details', href: '#' },
        ]}
      />
    </>
  );
}
