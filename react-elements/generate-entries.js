const fs = require('fs');
const path = require('path');

const pages = [
  ['home', 'HomePage'],
  ['about', 'AboutPage'],
  ['membership', 'MembershipPage'],
  ['membership-join', 'MembershipJoinPage'],
  ['member-directory', 'MemberDirectoryPage'],
  ['events', 'EventsPage'],
  ['events-past', 'EventsPastPage'],
  ['trade-resources', 'TradeResourcesPage'],
  ['trade-missions', 'TradeMissionsPage'],
  ['india-market-opportunities', 'IndiaMarketOpportunitiesPage'],
  ['fta-centre', 'FtaCentrePage'],
  ['fta-explainer', 'FtaExplainerPage'],
  ['insights-publications', 'InsightsPublicationsPage'],
  ['insights-newsletters', 'InsightsNewslettersPage'],
  ['digest', 'DigestPage'],
  ['news', 'NewsPage'],
  ['partners', 'PartnersPage'],
  ['connect', 'ConnectPage'],
  ['executive-council', 'ExecutiveCouncilPage'],
  ['our-patron', 'OurPatronPage'],
];

const dir = path.join(__dirname, 'custom-elements');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

pages.forEach(([tag, component]) => {
  const className = 'Inzbc' + component.replace(/Page$/, '');
  const content = `import React from 'react';
import ReactDOM from 'react-dom';
import { ${component} } from '../index';

class ${className} extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<${component} />, this);
  }
}

customElements.define('inzbc-${tag}', ${className});
`;
  fs.writeFileSync(path.join(dir, `${tag}.js`), content);
});

console.log(`Generated ${pages.length} custom element entries in ${dir}`);
