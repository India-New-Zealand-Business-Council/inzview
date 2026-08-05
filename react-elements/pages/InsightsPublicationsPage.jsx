import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function InsightsPublicationsPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Publications" sub="Reports, India Report editions and research published by INZBC." />
      <InzCardGrid
        title="India Report"
        cards={[
          { title: 'India Report 2.0', body: '[[Description / date]]', cta: 'Read HTML', href: '#' },
          { title: 'India Report, Apr 2023', body: '[[Description]]', cta: 'Download PDF', href: '#' },
        ]}
      />
    </>
  );
}
