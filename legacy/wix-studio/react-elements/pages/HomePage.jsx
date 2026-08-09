import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzFeatureBand from '../components/InzFeatureBand';
import InzStatsGrid from '../components/InzStatsGrid';
import InzCredibilityStrip from '../components/InzCredibilityStrip';
import InzCtaBand from '../components/InzCtaBand';

export default function HomePage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        eyebrow="India – New Zealand trade since 1988"
        headline="New Zealand's gateway to the India opportunity"
        sub="The India New Zealand Business Council has connected exporters, investors and institutions across the New Zealand–India trade relationship since 1988 — and leads the way through the new NZ–India Free Trade Agreement."
        primaryCta="Explore the FTA"
        primaryHref="/fta"
        secondaryCta="Join INZBC"
        secondaryHref="https://inzbc.memberjungle.club"
      />
      <InzFeatureBand
        headline="The NZ–India FTA changes what's possible"
        body="[[FTA summary copy — pull from the FTA Overview / Key Tariff Outcomes pages once drafted.]]"
        cta="Understand the FTA"
        href="/fta"
      />
      <InzCredibilityStrip
        items={[
          'Established 1988',
          'More than 200 members [[proposed — confirm with INZBC]]',
          'Recognised by the governments of New Zealand and India',
        ]}
      />
      <InzStatsGrid
        title="The opportunity, in numbers"
        stats={[
          { value: 'NZ$3.95bn', label: 'Two-way trade with India, year ended December 2025.' },
          { value: '95%', label: 'Of NZ exports to India receiving tariff elimination or reduction over time.' },
          { value: '57%', label: 'Of NZ exports duty-free from day one, rising to 82% once fully implemented.' },
          { value: '[[TBD]]', label: '[[NZ Indian diaspora population — source and confirm before publish.]]' },
        ]}
        footnote="Figures sourced from MFAT National Interest Analysis / MFAT FTA hub, verified 22 Jul 2026."
      />
      <InzCtaBand
        bg="forest"
        headline="Ready to grow your business with India?"
        sub="Join INZBC, or talk to us about how we can help your organisation engage across the NZ–India corridor."
        primaryCta="Join INZBC"
        primaryHref="https://inzbc.memberjungle.club"
        secondaryCta="Contact us"
        secondaryHref="/connect"
      />
    </>
  );
}
