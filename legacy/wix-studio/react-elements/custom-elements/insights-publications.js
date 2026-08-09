import React from 'react';
import ReactDOM from 'react-dom';
import { InsightsPublicationsPage } from '../index';

class InzbcInsightsPublications extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<InsightsPublicationsPage />, this);
  }
}

customElements.define('inzbc-insights-publications', InzbcInsightsPublications);
