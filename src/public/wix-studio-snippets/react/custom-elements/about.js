import React from 'react';
import ReactDOM from 'react-dom';
import { AboutPage } from '../index';

class InzbcAbout extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<AboutPage />, this);
  }
}

customElements.define('inzbc-about', InzbcAbout);
