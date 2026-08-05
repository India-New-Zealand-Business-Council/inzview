import React from 'react';
import ReactDOM from 'react-dom';
import { DigestPage } from '../index';

class InzbcDigest extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<DigestPage />, this);
  }
}

customElements.define('inzbc-digest', InzbcDigest);
