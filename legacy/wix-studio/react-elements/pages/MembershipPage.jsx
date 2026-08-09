import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';
import InzTextSection from '../components/InzTextSection';

export default function MembershipPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Join New Zealand's India trade network"
        sub="INZBC membership gives companies and institutions a direct voice in the NZ–India trade relationship, sourced market intelligence, and access to events, delegations and introductions."
        primaryCta="Join INZBC"
        primaryHref="/membership/join"
      />
      <InzCardGrid
        title="Why members join"
        cards={[
          { title: 'Advocacy', body: 'A direct voice with government on trade policy and market access affecting NZ–India trade.' },
          { title: 'Market intelligence', body: 'The Trade Intelligence Digest and FTA sector briefings, human-reviewed before publication.' },
          { title: 'Networks', body: 'Business development, delegations and introductions across the NZ–India corridor.' },
          { title: 'Events', body: 'From sector briefings to the annual INZBC Summit.' },
        ]}
      />
      <InzTextSection title="Membership tiers" bg="light">
        <p>[[New fee structure from 1 Jan 2026 — request final tiers/pricing from INZBC before publish.]]</p>
        <a href="/membership/join" className="inz-btn inz-btn--primary">See membership options</a>
      </InzTextSection>
    </>
  );
}
