import React from 'react';
import ReactDOM from 'react-dom';
import { InsightsNewslettersPage } from '../index';

class InzbcInsightsNewsletters extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<InsightsNewslettersPage />, this);
  }
}

customElements.define('inzbc-insights-newsletters', InzbcInsightsNewsletters);
