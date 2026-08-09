import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectPage } from '../index';

class InzbcConnect extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<ConnectPage />, this);
  }
}

customElements.define('inzbc-connect', InzbcConnect);
