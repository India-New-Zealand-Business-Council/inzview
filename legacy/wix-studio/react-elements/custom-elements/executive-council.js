import React from 'react';
import ReactDOM from 'react-dom';
import { ExecutiveCouncilPage } from '../index';

class InzbcExecutiveCouncil extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<ExecutiveCouncilPage />, this);
  }
}

customElements.define('inzbc-executive-council', InzbcExecutiveCouncil);
