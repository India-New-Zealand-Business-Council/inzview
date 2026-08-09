import React from 'react';
import ReactDOM from 'react-dom';
import { FtaExplainerPage } from '../index';

class InzbcFtaExplainer extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<FtaExplainerPage />, this);
  }
}

customElements.define('inzbc-fta-explainer', InzbcFtaExplainer);
