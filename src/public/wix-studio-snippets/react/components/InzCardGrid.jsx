import React from 'react';

export default function InzCardGrid({ title, cards }) {
  return (
    <section className="inz-section" style={{ backgroundColor: '#ffffff', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
      <div className="inz-container">
        {title && <h2 style={{ marginBottom: '2.5rem' }}>{title}</h2>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
            gap: '1.5rem',
          }}
        >
          {cards.map((card, i) => (
            <div key={i} style={{ padding: '1.75rem', background: '#f6f5f8', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.35rem' }}>{card.title}</h3>
              <p style={{ margin: '0 0 1rem' }}>{card.body}</p>
              {card.cta && card.href && (
                <a href={card.href} className="inz-btn inz-btn--primary" style={{ padding: '0.6em 1.2em', fontSize: '0.875rem' }}>
                  {card.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
