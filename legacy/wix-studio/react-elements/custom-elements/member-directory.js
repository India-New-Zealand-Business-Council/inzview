import React from 'react';
import ReactDOM from 'react-dom';
import { MemberDirectoryPage } from '../index';

class InzbcMemberDirectory extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<MemberDirectoryPage />, this);
  }
}

customElements.define('inzbc-member-directory', InzbcMemberDirectory);
