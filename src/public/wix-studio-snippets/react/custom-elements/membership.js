import React from 'react';
import ReactDOM from 'react-dom';
import { MembershipPage } from '../index';

class InzbcMembership extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<MembershipPage />, this);
  }
}

customElements.define('inzbc-membership', InzbcMembership);
