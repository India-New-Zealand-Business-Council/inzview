import React from 'react';
import ReactDOM from 'react-dom';
import { TradeResourcesPage } from '../index';

class InzbcTradeResources extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<TradeResourcesPage />, this);
  }
}

customElements.define('inzbc-trade-resources', InzbcTradeResources);
