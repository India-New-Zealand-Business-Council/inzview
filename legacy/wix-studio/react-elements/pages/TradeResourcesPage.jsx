import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';
import InzFeatureBand from '../components/InzFeatureBand';

export default function TradeResourcesPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero
        headline="Trade resources for the NZ–India opportunity"
        sub="Practical guidance for New Zealand businesses exporting to India, importing from India, and using the NZ–India Free Trade Agreement."
      />
      <InzCardGrid
        title=""
        cards={[
          { title: 'Export to India', body: 'A practical guide for NZ businesses preparing to export, build partnerships and use FTA opportunities.', cta: 'Explore sectors', href: '/india-market-opportunities' },
          { title: 'Import from India', body: 'Guidance for NZ businesses sourcing products and services from India under the evolving trade relationship.', cta: 'See suppliers', href: '/trade-missions' },
          { title: 'Trade missions and shows', body: 'Delegations, trade shows and market events merged into one pathway.', cta: 'View missions', href: '/trade-missions' },
          { title: 'Market intelligence', body: 'The Trade Intelligence Digest, human-reviewed before publication.', cta: 'Read the digest', href: '/newsletters' },
        ]}
      />
      <InzFeatureBand
        headline="NZ–India FTA opportunity"
        body="Signed 27 April 2026 and awaiting ratification, the agreement changes tariff and market-access settings for NZ exporters. Use the FTA Opportunity Explainer to see what it means for your sector."
        cta="FTA Opportunity Explainer"
        href="/fta"
      />
    </>
  );
}
