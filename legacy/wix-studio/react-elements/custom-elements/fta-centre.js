import React from 'react';
import ReactDOM from 'react-dom';
import { FtaCentrePage } from '../index';

class InzbcFtaCentre extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<FtaCentrePage />, this);
  }
}

customElements.define('inzbc-fta-centre', InzbcFtaCentre);
