import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzTextSection from '../components/InzTextSection';
import InzCtaBand from '../components/InzCtaBand';

export default function ConnectPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Connect" sub="Get in touch with INZBC or become a sponsor." />
      <InzTextSection title="Contact">
        <p><strong>Email:</strong> <a href="mailto:sunil@inzbc.org" style={{ color: '#61145f' }}>sunil@inzbc.org</a> [[proposed — pending INZBC confirmation]]</p>
        <p><strong>Postal:</strong> [[confirm current preferred contact + PO Box]]</p>
        <h3 style={{ marginTop: '1.5rem' }}>Follow INZBC</h3>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li><a href="#" style={{ color: '#61145f' }}>LinkedIn</a></li>
          <li><a href="#" style={{ color: '#61145f' }}>X / Twitter</a></li>
          <li><a href="#" style={{ color: '#61145f' }}>Facebook</a></li>
          <li><a href="#" style={{ color: '#61145f' }}>YouTube</a></li>
          <li><a href="#" style={{ color: '#61145f' }}>Flickr</a></li>
        </ul>
      </InzTextSection>
      <InzTextSection title="Send a message" bg="light">
        <p>[[Replace this block with a Wix Form connected to the correct recipient. Fields: First/Last name, Email, Subject, Message.]]</p>
        <a href="mailto:sunil@inzbc.org" className="inz-btn inz-btn--primary">Email INZBC</a>
      </InzTextSection>
      <InzCtaBand
        bg="navy"
        headline="Become a sponsor"
        sub="[[Sponsorship tiers and enquiry form — missing today; opportunity to add.]]"
        primaryCta="Enquire"
        primaryHref="mailto:sunil@inzbc.org"
      />
    </>
  );
}
