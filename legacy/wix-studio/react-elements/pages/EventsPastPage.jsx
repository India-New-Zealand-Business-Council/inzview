import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';

export default function EventsPastPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Past events" sub="Reports, recordings and summaries from previous INZBC events." />
      <InzTextSection title="Event archive">
        <p>[[Confirm which past event reports (2017–2021) carry over. Link to recordings, summaries and photo galleries.]]</p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '0.75rem' }}><strong>[[Event name, year]]</strong> — [[one-line outcome]]</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>[[Event name, year]]</strong> — [[one-line outcome]]</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>[[Event name, year]]</strong> — [[one-line outcome]]</li>
        </ul>
      </InzTextSection>
    </>
  );
}
