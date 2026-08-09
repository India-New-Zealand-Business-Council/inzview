import React from 'react';

export default function InzCtaBand({ bg, headline, sub, primaryCta, primaryHref, secondaryCta, secondaryHref }) {
  const isDark = bg === 'forest' || bg === 'navy';
  const bgColor = bg === 'forest' ? '#1b4640' : '#160933';

  return (
    <section
      className="inz-section"
      style={{ backgroundColor: bgColor, color: '#ffffff', padding: 'clamp(3.5rem, 7vw, 5rem) 0', textAlign: 'center' }}
    >
      <div className="inz-container">
        <h2 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{headline}</h2>
        <p style={{ color: '#e8e6ee', maxWidth: '55ch', margin: '0 auto 1.75rem' }}>{sub}</p>
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
