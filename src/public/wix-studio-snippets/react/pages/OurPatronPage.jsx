import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';

export default function OurPatronPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Our Patron" sub="[[Patron name and title — confirm current patron with INZBC.]]" />
      <InzTextSection title="[[Patron name]]">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 14rem', maxWidth: '100%' }}>
            <div style={{ aspectRatio: '1', background: '#f6f5f8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#61145f', fontSize: '0.875rem' }}>[[Patron photo]]</div>
          </div>
          <div style={{ flex: '1 1 24rem' }}>
            <p style={{ color: '#61145f', fontWeight: 700 }}>[[Title / role]]</p>
            <p>[[Biography text — confirm with INZBC before publish.]]</p>
            <p style={{ fontSize: '0.875rem', color: '#61145f', marginTop: '1.5rem' }}>[[Proposed — confirm patron details with INZBC before publish.]]</p>
          </div>
        </div>
      </InzTextSection>
    </>
  );
}
