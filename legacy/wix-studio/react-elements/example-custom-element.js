// Example: bundle this with webpack/rollup to create a Wix custom element.
// Wix custom elements must expose a customElements.define() call in a single JS file.

import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage, AboutPage, MembershipPage } from './index';

function definePage(tag, Component) {
  class InzbcPage extends HTMLElement {
    connectedCallback() {
      ReactDOM.render(<Component />, this);
    }
  }
  customElements.define(tag, InzbcPage);
}

definePage('inzbc-home', HomePage);
definePage('inzbc-about', AboutPage);
definePage('inzbc-membership', MembershipPage);
