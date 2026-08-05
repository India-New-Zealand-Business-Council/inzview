import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';

export default function MemberDirectoryPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Member directory"
        sub="The directory of INZBC members is hosted on Member Jungle, the provisional system of record for membership."
        primaryCta="Open directory"
        primaryHref="https://inzbc.memberjungle.club"
      />
      <InzTextSection title="For members">
        <p>Log in to Member Jungle to update your profile, manage renewals and access member-only resources. The Wix site does not store membership data.</p>
        <p style={{ fontSize: '0.875rem', color: '#61145f', marginTop: '1.5rem' }}>
          Per docs/modules/membership-crm.md: membership is not rebuilt on Wix before the retain/integrate/replace assessment closes.
        </p>
      </InzTextSection>
    </>
  );
}
