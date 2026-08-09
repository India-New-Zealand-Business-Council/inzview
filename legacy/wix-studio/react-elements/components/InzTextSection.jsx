import React from 'react';

export default function InzTextSection({ title, children, bg }) {
  return (
    <section
      className="inz-section"
      style={{ backgroundColor: bg === 'light' ? '#f6f5f8' : '#ffffff', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}
    >
      <div className="inz-container" style={{ maxWidth: '76ch' }}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
