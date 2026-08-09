import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';
import InzCtaBand from '../components/InzCtaBand';

export default function PartnersPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Partners"
        sub="Organisations that support INZBC's work across the NZ–India corridor."
        primaryCta="Become a sponsor"
        primaryHref="/connect"
      />
      <InzTextSection title="Strategic partners">
        <p>[[Partner logos and links by tier. Upload logo assets and link to partner sites.]]</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ width: '9rem', height: '5rem', background: '#f6f5f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#61145f', fontSize: '0.75rem' }}>[[Logo]]</div>
          <div style={{ width: '9rem', height: '5rem', background: '#f6f5f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#61145f', fontSize: '0.75rem' }}>[[Logo]]</div>
          <div style={{ width: '9rem', height: '5rem', background: '#f6f5f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#61145f', fontSize: '0.75rem' }}>[[Logo]]</div>
        </div>
      </InzTextSection>
      <InzCtaBand
        bg="forest"
        headline="Become a sponsor"
        sub="[[Sponsorship tiers and enquiry form — missing today; opportunity to add.]]"
        primaryCta="Enquire"
        primaryHref="mailto:sunil@inzbc.org"
      />
    </>
  );
}
