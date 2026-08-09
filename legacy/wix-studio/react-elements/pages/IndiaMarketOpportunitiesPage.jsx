import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function IndiaMarketOpportunitiesPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="India market opportunities"
        sub="Sector guidance for New Zealand exporters under the NZ–India Free Trade Agreement."
      />
      <InzCardGrid
        title="Sector priorities"
        cards={[
          { title: 'Forestry', body: '[[FTA outcome summary]]' },
          { title: 'Horticulture', body: '[[FTA outcome summary]]' },
          { title: 'Seafood', body: '[[FTA outcome summary]]' },
          { title: 'Wine', body: '[[FTA outcome summary]]' },
          { title: 'Industrial goods', body: '[[FTA outcome summary]]' },
        ]}
      />
    </>
  );
}
