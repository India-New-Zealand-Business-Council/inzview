import React from 'react';

export default function InzCredibilityStrip({ items }) {
  return (
    <section className="inz-section" style={{ backgroundColor: '#160933', color: '#ffffff', padding: 'clamp(2rem, 4vw, 3rem) 0' }}>
      <div className="inz-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem 2.5rem',
            textAlign: 'center',
            fontFamily: "'Big Shoulders', Impact, sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          }}
        >
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              {i < items.length - 1 && (
                <span aria-hidden="true" style={{ color: '#c1acfb' }}>
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
