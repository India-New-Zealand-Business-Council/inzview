import React from 'react';

export default function InzHero({ eyebrow, headline, sub, primaryCta, primaryHref, secondaryCta, secondaryHref }) {
  return (
    <section
      className="inz-section inz-hero"
      style={{
        background: 'linear-gradient(135deg, #160933 0%, #261866 55%, #61145f 100%)',
        color: '#ffffff',
        padding: 'clamp(4rem, 10vw, 7rem) 0',
        textAlign: 'center',
      }}
    >
      <div className="inz-container">
        {eyebrow && (
          <p
            style={{
              fontFamily: "'Big Shoulders', Impact, sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.875rem',
              color: '#c1acfb',
              marginBottom: '1rem',
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1 style={{ color: '#ffffff', maxWidth: '20ch', marginInline: 'auto' }}>{headline}</h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#e8e6ee',
            maxWidth: '60ch',
            margin: '0 auto 2rem',
          }}
        >
          {sub}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {primaryCta && (
            <a href={primaryHref} className="inz-btn inz-btn--primary">
              {primaryCta}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryHref}
              className="inz-btn inz-btn--secondary"
              style={{ color: '#ffffff', boxShadow: 'inset 0 0 0 2px #ffffff' }}
            >
              {secondaryCta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
