import React from 'react';

export default function InzFeatureBand({ headline, body, cta, href }) {
  return (
    <section
      className="inz-section"
      style={{
        background: 'linear-gradient(90deg, #c1acfb 0%, #261866 55%, #160933 100%)',
        color: '#ffffff',
        padding: 'clamp(3rem, 6vw, 4.5rem) 0',
      }}
    >
      <div
        className="inz-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '2rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 32rem' }}>
          <h2 style={{ color: '#ffffff' }}>{headline}</h2>
          <p style={{ color: '#e8e6ee', maxWidth: '55ch' }}>{body}</p>
        </div>
        {cta && (
          <div style={{ flex: '0 0 auto' }}>
            <a href={href} className="inz-btn inz-btn--primary">
              {cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
