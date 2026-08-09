import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';
import InzCtaBand from '../components/InzCtaBand';

export default function InsightsNewslettersPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Newsletters" sub="Kia Ora India, the monthly newsletter archive, and the Trade Intelligence Digest." />
      <InzTextSection title="Kia Ora India">
        <p>[[The site currently describes Kia Ora India as quarterly with a December 2023 "latest" issue. Confirm current cadence and latest issue with INZBC before publish.]]</p>
      </InzTextSection>
      <InzTextSection title="Trade Intelligence Digest" bg="light">
        <p>Weekly, LLM-summarised, human-reviewed digest of India–NZ trade news. Renders only items with CMS status = published.</p>
        <a href="/digest" className="inz-btn inz-btn--primary" style={{ marginTop: '1rem' }}>Browse the archive</a>
      </InzTextSection>
      <InzTextSection title="Monthly newsletter archive">
        <p>[[Confirm Mailchimp vs eocampaign hosting. Link to archive.]]</p>
      </InzTextSection>
      <InzCtaBand
        bg="navy"
        headline="Subscribe"
        sub="Get the Trade Intelligence Digest and newsletter updates."
        primaryCta="Subscribe"
        primaryHref="#"
      />
    </>
  );
}
