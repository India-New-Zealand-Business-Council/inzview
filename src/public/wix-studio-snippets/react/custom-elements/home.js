import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from '../index';

class InzbcHome extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<HomePage />, this);
  }
}

customElements.define('inzbc-home', InzbcHome);
