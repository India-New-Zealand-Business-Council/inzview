import React from 'react';

export default function InzProfileGrid({ title, profiles, note }) {
  return (
    <section className="inz-section" style={{ backgroundColor: '#ffffff', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
      <div className="inz-container">
        {title && <h2 style={{ marginBottom: '2rem' }}>{title}</h2>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
            gap: '1.5rem',
          }}
        >
          {profiles.map((profile, i) => (
            <div key={i} style={{ padding: '1.5rem', background: '#f6f5f8', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{profile.name}</h3>
              <p style={{ margin: 0, color: '#61145f' }}>{profile.role}</p>
            </div>
          ))}
        </div>
        {note && <p style={{ fontSize: '0.875rem', color: '#61145f', marginTop: '2rem' }}>{note}</p>}
      </div>
    </section>
  );
}
