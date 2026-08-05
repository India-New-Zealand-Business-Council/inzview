import React from 'react';
import ReactDOM from 'react-dom';
import { EventsPastPage } from '../index';

class InzbcEventsPast extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<EventsPastPage />, this);
  }
}

customElements.define('inzbc-events-past', InzbcEventsPast);
