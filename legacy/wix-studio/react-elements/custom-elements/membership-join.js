import React from 'react';
import ReactDOM from 'react-dom';
import { MembershipJoinPage } from '../index';

class InzbcMembershipJoin extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<MembershipJoinPage />, this);
  }
}

customElements.define('inzbc-membership-join', InzbcMembershipJoin);
