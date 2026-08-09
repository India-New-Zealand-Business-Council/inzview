import React from 'react';
import InzGlobalStyles from '../components/InzGlobalStyles';
import InzHero from '../components/InzHero';
import InzCardGrid from '../components/InzCardGrid';

export default function NewsPage() {
  return (
    <>
      <InzGlobalStyles />
      <InzHero headline="News" sub="Updates from INZBC and the NZ–India trade relationship." />
      <InzCardGrid
        title=""
        cards={[
          { title: '[[Post title]]', body: '[[Excerpt]]', cta: 'Read more', href: '#' },
        ]}
      />
      <p style={{ textAlign: 'center', color: '#61145f', fontSize: '0.875rem' }}>
        [[Connect the Wix Blog app here, or list recent posts manually until the CMS is set up.]]
      </p>
    </>
  );
}
