import React from 'react';

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');

  :root {
    --inz-navy: #160933;
    --inz-blue: #261866;
    --inz-purple: #61145f;
    --inz-crimson: #7e0030;
    --inz-tangerine: #f05b29;
    --inz-forest: #1b4640;
    --inz-lavender: #c1acfb;
    --inz-lime: #b8f07c;
    --inz-white: #ffffff;
    --inz-light: #f6f5f8;
    --inz-max-width: 1160px;
    --inz-radius: 10px;
  }

  .inz-section {
    font-family: 'Merriweather', Georgia, serif;
    color: var(--inz-navy);
    line-height: 1.6;
  }

  .inz-section h1,
  .inz-section h2,
  .inz-section h3,
  .inz-section .inz-heading {
    font-family: 'Big Shoulders', Impact, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.05;
    margin: 0 0 0.4em;
  }

  .inz-section h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
  .inz-section h2 { font-size: clamp(2rem, 4.5vw, 3.25rem); }
  .inz-section h3 { font-size: clamp(1.5rem, 3vw, 2rem); }

  .inz-section p {
    max-width: 68ch;
    margin: 0 0 1em;
  }

  .inz-btn {
    display: inline-block;
    font-family: 'Big Shoulders', Impact, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-decoration: none;
    padding: 0.85em 1.6em;
    border-radius: var(--inz-radius);
    transition: transform 0.15s ease, opacity 0.15s ease;
  }

  .inz-btn:focus-visible {
    outline: 3px solid var(--inz-lavender);
    outline-offset: 3px;
  }

  .inz-btn--primary {
    background-color: var(--inz-tangerine);
    color: var(--inz-navy) !important;
  }

  .inz-btn--secondary {
    background-color: transparent;
    color: var(--inz-navy);
    box-shadow: inset 0 0 0 2px currentColor;
  }

  .inz-btn:hover {
    transform: translateY(-2px);
    opacity: 0.92;
  }

  .inz-container {
    width: min(92%, var(--inz-max-width));
    margin-inline: auto;
  }
`;

export default function InzGlobalStyles() {
  return <style>{globalCss}</style>;
}
