import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzProfileGrid from '../components/InzProfileGrid';

export default function ExecutiveCouncilPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="Executive Council" sub="The governance and executive team leading INZBC." />
      <InzProfileGrid
        title="Board"
        profiles={[
          { name: 'Edwin Paul', role: 'Chair' },
          { name: 'Tony Martin', role: 'Deputy Chair' },
          { name: 'Bharat Chawla', role: 'Treasurer' },
          { name: 'Antje Fiedler, Prince Kumar, Jonathan Manuel, Rachel Lynch, Jenny McGregor, Sumant Khedkar', role: 'Board Members' },
        ]}
      />
      <InzProfileGrid
        title="Executive team"
        profiles={[
          { name: 'Sunil Kaushal', role: 'Chief Executive' },
          { name: 'Kanwaljit Singh Bakshi', role: 'Ex-Officio' },
          { name: 'Clive Antony', role: 'Strategic Communications Officer' },
          { name: 'Sandeep Sharma', role: 'Strategy and Trade Officer' },
          { name: 'Sreedhar Venkatram', role: 'Mumbai Chapter Head' },
          { name: 'Bharat Joshi', role: 'Delhi Chapter Head' },
          { name: 'Dr Pushpa Wood', role: 'Wellington Chapter Head' },
          { name: 'Michael Henstock', role: 'Christchurch Chapter Head' },
        ]}
        note="[[Proposed — read from inzbc.org 27 Jul 2026; pending INZBC confirmation before publish.]]"
      />
    </>
  );
}
