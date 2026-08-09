import React from 'react';
import ReactDOM from 'react-dom';
import { PartnersPage } from '../index';

class InzbcPartners extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<PartnersPage />, this);
  }
}

customElements.define('inzbc-partners', InzbcPartners);
