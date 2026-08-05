import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';

export default function MembershipJoinPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Become a member"
        sub="Membership is managed through Member Jungle. Complete your application there and the team will be in touch."
        primaryCta="Apply via Member Jungle"
        primaryHref="https://inzbc.memberjungle.club"
      />
      <InzTextSection title="What happens next">
        <ol style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.75rem' }}>Select the tier that matches your organisation.</li>
          <li style={{ marginBottom: '0.75rem' }}>Submit the application through Member Jungle.</li>
          <li style={{ marginBottom: '0.75rem' }}>The INZBC secretariat reviews and confirms your membership.</li>
          <li>You receive access to member events, intelligence and the member directory.</li>
        </ol>
        <p>Questions? <a href="/connect" style={{ color: '#61145f', textDecoration: 'underline' }}>Contact the secretariat</a>.</p>
      </InzTextSection>
    </>
  );
}
