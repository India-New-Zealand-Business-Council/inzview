import React from 'react';

export default function InzStatsGrid({ title, stats, footnote }) {
  return (
    <section className="inz-section" style={{ backgroundColor: '#f6f5f8', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
      <div className="inz-container">
        {title && <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{title}</h2>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
            gap: '1.5rem',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                padding: '1.75rem',
                borderRadius: '10px',
                boxShadow: '0 4px 18px rgba(22,9,51,0.06)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Big Shoulders', Impact, sans-serif",
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: '#f05b29',
                  margin: '0 0 0.25em',
                }}
              >
                {stat.value}
              </p>
              <p style={{ margin: 0, color: '#261866' }}>{stat.label}</p>
            </div>
          ))}
        </div>
        {footnote && (
          <p style={{ fontSize: '0.8125rem', color: '#61145f', marginTop: '1.5rem', textAlign: 'center' }}>
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
