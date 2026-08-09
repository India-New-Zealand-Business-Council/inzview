import React from 'react';
import ReactDOM from 'react-dom';
import { IndiaMarketOpportunitiesPage } from '../index';

class InzbcIndiaMarketOpportunities extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<IndiaMarketOpportunitiesPage />, this);
  }
}

customElements.define('inzbc-india-market-opportunities', InzbcIndiaMarketOpportunities);
