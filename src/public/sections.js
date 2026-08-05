// Page markup kept in code so it is versioned and deploys on push, rather than pasted
// into an Embed Code element where it would live only in Wix site data.
//
// Each page renders into ONE Embed Code element as a self-contained document. The embed's
// own code box stays empty; page code sets its src. See EDITING.md.
//
// The stylesheet is repeated into every document on purpose: a data: URI has an opaque
// origin and inherits nothing from the parent page, so the classes in
// wix-studio-snippets/site-head.html cannot reach it. Keep the two in step.

const BASE_CSS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --inz-navy: #160933;
    --inz-blue: #261866;
    --inz-purple: #61145f;
    --inz-tangerine: #f05b29;
    --inz-forest: #1b4640;
    --inz-lavender: #c1acfb;
    --inz-white: #ffffff;
    --inz-light: #f6f5f8;
    --inz-max-width: 1160px;
    --inz-radius: 10px;
  }
  html, body { margin: 0; padding: 0; }
  body { background: var(--inz-white); }
  .inz-section {
    font-family: 'Merriweather', Georgia, serif;
    color: var(--inz-navy);
    line-height: 1.6;
  }
  .inz-section h1, .inz-section h2, .inz-section h3 {
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
  .inz-section p { max-width: 68ch; margin: 0 0 1em; }
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
  .inz-btn:focus-visible { outline: 3px solid var(--inz-lavender); outline-offset: 3px; }
  /* Accessibility: tangerine buttons MUST use navy text. White on tangerine is 3.37:1
     and fails AA; navy on tangerine is 5.56:1 and passes. */
  .inz-btn--primary { background-color: var(--inz-tangerine); color: var(--inz-navy) !important; }
  .inz-btn--secondary { background-color: transparent; color: var(--inz-navy); box-shadow: inset 0 0 0 2px currentColor; }
  .inz-btn:hover { transform: translateY(-2px); opacity: 0.92; }
  .inz-container { width: min(92%, var(--inz-max-width)); margin-inline: auto; }
  .inz-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1.5rem; }
  .inz-card { background: var(--inz-white); padding: 1.75rem; border-radius: var(--inz-radius); box-shadow: 0 4px 18px rgba(22,9,51,0.06); }
  .inz-stat { font-family: 'Big Shoulders', Impact, sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--inz-tangerine); margin: 0 0 0.25em; }
</style>`;

// --- Home -------------------------------------------------------------------

const homeHero = `
<section class="inz-section" style="background: linear-gradient(135deg, #160933 0%, #261866 55%, #61145f 100%); color: #ffffff; padding: clamp(4rem, 10vw, 7rem) 0; text-align: center;">
  <div class="inz-container">
    <p style="font-family: 'Big Shoulders', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.875rem; color: #c1acfb; margin: 0 auto 1rem;">India &ndash; New Zealand trade since 1988</p>
    <h1 style="color: #ffffff; max-width: 18ch; margin-inline: auto;">New Zealand's gateway to the India opportunity</h1>
    <p style="font-size: clamp(1rem, 2vw, 1.25rem); color: #e8e6ee; max-width: 60ch; margin: 0 auto 2rem;">The India New Zealand Business Council connects exporters, investors and institutions across the NZ&ndash;India trade relationship &mdash; and leads the way through the new NZ&ndash;India Free Trade Agreement.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
      <a href="/fta" class="inz-btn inz-btn--primary">Explore the FTA</a>
      <a href="https://inzbc.memberjungle.club" class="inz-btn inz-btn--secondary" style="color: #ffffff;">Join INZBC</a>
    </div>
  </div>
</section>`;

const ftaFeatureBand = `
<section class="inz-section" style="background: linear-gradient(90deg, #c1acfb 0%, #261866 55%, #160933 100%); color: #ffffff; padding: clamp(3rem, 6vw, 4.5rem) 0;">
  <div class="inz-container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 2rem; justify-content: space-between;">
    <div style="flex: 1 1 32rem;">
      <h2 style="color: #ffffff;">The NZ&ndash;India FTA changes what's possible</h2>
      <p style="color: #e8e6ee; max-width: 55ch;">[[FTA summary copy &mdash; pull from the FTA Overview / Key Tariff Outcomes pages once drafted. Do not restate tariff detail without sign-off from the FTA service.]]</p>
    </div>
    <div style="flex: 0 0 auto;">
      <a href="/fta" class="inz-btn inz-btn--primary">Understand the FTA</a>
    </div>
  </div>
</section>`;

// Figures are sourced. NZ$3.95bn and the 95/57/82/13 split come from MFAT via
// docs/fta-source-corpus.md. Do not round, reword or "simplify" them.
const tradeStats = `
<section class="inz-section" style="background-color: #f6f5f8; padding: clamp(3rem, 6vw, 4.5rem) 0;">
  <div class="inz-container">
    <h2 style="text-align: center; margin-bottom: 2.5rem;">The opportunity, in numbers</h2>
    <div class="inz-cards">
      <div class="inz-card">
        <p class="inz-stat">NZ$3.95bn</p>
        <p style="margin: 0; color: #261866;">Two-way trade with India, year ended December 2025.</p>
      </div>
      <div class="inz-card">
        <p class="inz-stat">95%</p>
        <p style="margin: 0; color: #261866;">Of NZ exports to India receiving tariff elimination or reduction over time.</p>
      </div>
      <div class="inz-card">
        <p class="inz-stat">57%</p>
        <p style="margin: 0; color: #261866;">Of NZ exports duty-free from day one, rising to 82% once fully implemented.</p>
      </div>
      <div class="inz-card">
        <p class="inz-stat">[[TBD]]</p>
        <p style="margin: 0; color: #261866;">[[NZ Indian diaspora population &mdash; source and confirm before publish.]]</p>
      </div>
    </div>
  </div>
</section>`;

const credibilityStrip = `
<section class="inz-section" style="background-color: #160933; color: #ffffff; padding: clamp(2rem, 4vw, 3rem) 0;">
  <div class="inz-container">
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem 2.5rem; text-align: center; font-family: 'Big Shoulders', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.06em; font-size: clamp(0.875rem, 1.5vw, 1rem);">
      <span>Established 1988</span>
      <span aria-hidden="true" style="color: #c1acfb;">&bull;</span>
      <span>More than 200 members [[proposed &mdash; confirm with INZBC]]</span>
      <span aria-hidden="true" style="color: #c1acfb;">&bull;</span>
      <span>Recognised by the governments of New Zealand and India</span>
    </div>
  </div>
</section>`;

const joinCta = `
<section class="inz-section" style="background-color: #1b4640; color: #ffffff; padding: clamp(3.5rem, 7vw, 5rem) 0; text-align: center;">
  <div class="inz-container">
    <h2 style="color: #ffffff; margin-bottom: 0.5rem;">Ready to grow your business with India?</h2>
    <p style="color: #e8e6ee; max-width: 55ch; margin: 0 auto 1.75rem;">Join INZBC, or talk to us about how we can help your organisation engage across the NZ&ndash;India corridor.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
      <a href="https://inzbc.memberjungle.club" class="inz-btn inz-btn--primary">Join INZBC</a>
      <a href="/connect" class="inz-btn inz-btn--secondary" style="color: #ffffff;">Contact us</a>
    </div>
  </div>
</section>`;

// --- Pages ------------------------------------------------------------------

const PAGES = {
  home: [homeHero, ftaFeatureBand, tradeStats, credibilityStrip, joinCta],
};

/**
 * Full HTML document for one page, ready to hand to an Embed Code element.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageHtml(name) {
  const sections = PAGES[name];
  if (!sections) {
    throw new Error(`sections.js: no page named "${name}"`);
  }
  return `<!doctype html><html lang="en-NZ"><head><meta charset="utf-8">${BASE_CSS}</head><body>${sections.join('')}</body></html>`;
}

/**
 * Source value for an Embed Code element showing the given page.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageSrc(name) {
  return `data:text/html;charset=utf-8,${encodeURIComponent(pageHtml(name))}`;
}
