import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';

export default function FtaExplainerPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="FTA Opportunity Explainer"
        sub="Answer a few questions about your sector and see what the NZ–India FTA means for your business."
      />
      <InzTextSection title="">
        <div style={{ background: '#f6f5f8', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 1rem' }}><strong>[[Embed the FTA Explainer app here.]]</strong></p>
          <p style={{ margin: '0 0 1.5rem' }}>Recommended: iframe pointing to the deployed apps/fta/ui instance, or a Studio custom element wrapping it.</p>
          <a href="#" className="inz-btn inz-btn--primary">Launch Explainer</a>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#61145f', marginTop: '1.5rem' }}>
          All answers cite the approved FTA corpus only. Content is human-reviewed before publication.
        </p>
      </InzTextSection>
    </>
  );
}
