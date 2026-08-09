import React from 'react';
import ReactDOM from 'react-dom';
import { OurPatronPage } from '../index';

class InzbcOurPatron extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<OurPatronPage />, this);
  }
}

customElements.define('inzbc-our-patron', InzbcOurPatron);
