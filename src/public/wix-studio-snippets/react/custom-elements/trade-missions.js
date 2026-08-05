import React from 'react';
import ReactDOM from 'react-dom';
import { TradeMissionsPage } from '../index';

class InzbcTradeMissions extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<TradeMissionsPage />, this);
  }
}

customElements.define('inzbc-trade-missions', InzbcTradeMissions);
