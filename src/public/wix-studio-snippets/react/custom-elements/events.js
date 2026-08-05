import React from 'react';
import ReactDOM from 'react-dom';
import { EventsPage } from '../index';

class InzbcEvents extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<EventsPage />, this);
  }
}

customElements.define('inzbc-events', InzbcEvents);
