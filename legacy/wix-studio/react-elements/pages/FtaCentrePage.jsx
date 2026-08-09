import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function FtaCentrePage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="NZ–India FTA Centre"
        sub="Sourced, plain-language guidance on the New Zealand–India Free Trade Agreement: what changes, who it affects, and what to do next."
        primaryCta="Use the FTA Explainer"
        primaryHref="/fta/explainer"
      />
      <InzCardGrid
        title=""
        cards={[
          { title: 'Status', body: 'Signed 27 April 2026. Awaiting domestic ratification before it enters into force.' },
          { title: 'Key tariff outcomes', body: '57% duty-free from day one, rising to 82% once fully implemented, with the remaining 13% under sharp cuts.' },
          { title: 'Sector briefings', body: '[[Link to sector pages once drafted.]]' },
          { title: 'Official documents', body: '[[Links to MFAT National Interest Analysis and agreement text.]]' },
        ]}
      />
    </>
  );
}
