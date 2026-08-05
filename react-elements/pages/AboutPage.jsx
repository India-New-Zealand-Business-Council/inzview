import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';
import InzCtaBand from '../components/InzCtaBand';

export default function AboutPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="New Zealand's trusted partner for the India relationship, since 1988"
        sub="The India New Zealand Business Council is New Zealand's longstanding, member-based body for trade, investment and commercial ties with India."
        primaryCta="Become a member"
        primaryHref="/membership"
      />
      <InzTextSection title="History">
        <p>
          Since 1988, INZBC has promoted and encouraged trade in goods and services, investment, and scientific, technical and economic cooperation between New Zealand and India. INZBC is recognised as the main industry body for the bilateral relationship by both governments, and has hosted visiting Government of India delegations to New Zealand, organising networking events on their behalf.
        </p>
        <p>[[Key milestones since 1988 — confirm dates and events with INZBC.]]</p>
      </InzTextSection>
      <InzTextSection title="Mission" bg="light">
        <p>
          INZBC advances trade, investment and enduring commercial ties between New Zealand and India. We advise government on the bilateral relationship, share sourced market intelligence with members, and connect New Zealand and Indian businesses — work that now centres on the opportunity created by the New Zealand–India Free Trade Agreement.
        </p>
      </InzTextSection>
      <InzTextSection title="What we do">
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>Advocate on trade policy and market access affecting members.</li>
          <li>Provide sourced market intelligence (see the Trade Intelligence Digest and FTA Centre).</li>
          <li>Facilitate business development, delegations and introductions.</li>
          <li>Host Government of India delegations and business missions to New Zealand.</li>
          <li>Convene events, including the annual INZBC Summit.</li>
        </ul>
      </InzTextSection>
      <InzCtaBand
        bg="navy"
        headline="Meet the people behind INZBC"
        sub="The Executive Council and chapter heads guide the Council's work."
        primaryCta="Executive Council"
        primaryHref="/executive-council"
        secondaryCta="Become a member"
        secondaryHref="/membership"
      />
    </>
  );
}
