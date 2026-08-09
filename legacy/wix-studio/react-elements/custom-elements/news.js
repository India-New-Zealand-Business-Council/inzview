import React from 'react';
import ReactDOM from 'react-dom';
import { NewsPage } from '../index';

class InzbcNews extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<NewsPage />, this);
  }
}

customElements.define('inzbc-news', InzbcNews);
