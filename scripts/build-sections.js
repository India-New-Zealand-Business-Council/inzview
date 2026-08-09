// Generates src/public/sections.js from the paste-ready snippets in
// src/public/wix-studio-snippets/. Run with: node scripts/build-sections.js
//
// Lives outside src/ on purpose: Wix lints every .js under src/ during `wix publish`
// and Node globals like require and __dirname fail that lint. See EDITING.md.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SNIPPETS = path.join(ROOT, 'src/public/wix-studio-snippets');
const OUT = path.join(ROOT, 'src/public/sections.js');

// ---------------------------------------------------------------------------
// Page archetypes (DESIGN.local.md, Phase 0)
// ---------------------------------------------------------------------------
// Applying one band rhythm to all twenty pages trades a messy template for a tidy one.
// These four say what a page is FOR, and the composition follows from that.
//
//   landmark   Home, FTA. Cold traffic arriving on the FTA news. Orient and route.
//   hub        Routes to the right sub-thing.
//   editorial  Credibility or content. Provenance matters more than persuasion.
//   task       One action. No decoration, no photography, short hero.
const ARCHETYPE = {
  home: 'landmark', fta: 'landmark',

  membership: 'hub', events: 'hub', tradeResources: 'hub',
  tradeMissions: 'hub', indiaMarketOpportunities: 'hub',

  about: 'editorial', executiveCouncil: 'editorial', ourPatron: 'editorial',
  publications: 'editorial', newsletters: 'editorial', digest: 'editorial',
  news: 'editorial', partners: 'editorial',

  membershipJoin: 'task', connect: 'task', memberDirectory: 'task',
  ftaExplainer: 'task', eventsPast: 'task',
};

const HERO_TIER = { landmark: 'landmark', hub: 'page', editorial: 'page', task: 'task' };

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------
// The images exist at assets/from-live-site/ but are NOT in this site's Media Manager
// (WIX-TASKS.md task 4). Repo files are not served as images, and the old site's
// static.wixstatic.com URLs must not be hot-linked: they resolve today but belong to the
// site being replaced, on a different Wix account.
//
// So every src starts empty. An empty src omits the layer entirely and the CSS gradient
// plate shows through, which is what ships today. Paste the new Media Manager URL here
// after the upload and the photograph appears with no other change.
//
//   role: 'decorative'  a CSS background layer. Backgrounds cannot carry alt text, so only
//                       imagery that adds nothing to the meaning goes here.
//   role: 'content'     a real <img alt>. Publication covers, people, event flyers. The
//                       build refuses a content image with an empty alt.
//
// Photography is for landmark and hub pages. A Join or Directory page does not need a hero
// photograph, and giving it one is decoration standing in for content.
// Uploaded to THIS site's Media Manager 9 Aug 2026 by scripts/upload-media.js, from the
// originals in assets/from-live-site/. These are INZBC's own photographs, re-hosted rather
// than hot-linked, so retiring inzbc.org cannot break them.
// Only Home carries a photograph, and that is a finding rather than a preference. Every
// image in INZBC's library was opened and checked:
//
//   banner-wide-primary      Auckland harbour at dusk, Sky Tower, port cranes, a ferry.
//                            The only frame that works behind white text. Used here.
//   hero-tall                near-white abstract wave texture, and byte-identical to
//                            home-top-banner, so those two are one file
//   banner-wide-secondary    a flat orange gradient, not a photograph
//   hero-event-networking    a collage with headline text baked into it, which fights
//                            the page's own headline
//   the rest                 covers, mockups, icons, logo strips
//
// So there is one usable hero photograph in the whole library. The other heroes keep the
// synthesised plate, which is better than a bad photograph. Real photography for the FTA,
// Trade and Events pages needs a commissioned or licensed shoot.
const MEDIA = {
  home: {
    src: 'https://static.wixstatic.com/media/df219d_85f777cc8d624bc2b4ea81783f71df24~mv2.jpg',
    alt: '', role: 'decorative', position: 'center 55%',
  },
  fta: {
    src: 'https://static.wixstatic.com/media/df219d_8fb4bb30e06840df8ed2d17a25ea8330~mv2.jpg',
    alt: '', role: 'decorative', position: 'center 45%',
  },
};

// INZBC's own artwork, re-hosted on this site. The blob illustrations and the hero banner
// are commissioned pieces from the live site: not stock, not decoration, and the strongest
// brand assets INZBC has. The first pass of this redesign shipped without them, which is
// why it read as weaker than the site it replaces.
const ART = {
  logo: 'https://static.wixstatic.com/media/df219d_0b8e6333d53841efaf66f675038a0798~mv2.jpg',
  // The designed hero lockup: logo, tagline, orange chevron, port and container ship, with
  // circular insets of a NZ paddock and India Gate. It carries its own text, so it is shown
  // whole rather than used as a bed for a headline.
  heroBanner: 'https://static.wixstatic.com/media/df219d_83e2d493f8b8499c8ef83fddd27208b8~mv2.jpg',
  reportCover: 'https://static.wixstatic.com/media/df219d_60093c58a989446681ae38ad6efe3a94~mv2.png',
  partnerStrip: 'https://static.wixstatic.com/media/df219d_5350f10f4b714eddae1958abfd3c39d5~mv2.jpg',
  iconEvents: 'https://static.wixstatic.com/media/df219d_161014de7ca0434ea61527a1d44455a2~mv2.png',
  iconPublications: 'https://static.wixstatic.com/media/df219d_5660a14b9b3c457a801d7c5e2d6e4450~mv2.png',
  iconMemberships: 'https://static.wixstatic.com/media/df219d_e722f1a99464408c987c16bec72791f4~mv2.png',
  iconTrade: 'https://static.wixstatic.com/media/df219d_3f9c2e680dbb4de1964c21532decad7b~mv2.png',
  kiaOraCover: 'https://static.wixstatic.com/media/df219d_3ac94d17fa9a42eeaef1597686fe952d~mv2.jpg',
  newsletterMockup: 'https://static.wixstatic.com/media/df219d_29794fdc9e864b9997c3333499673a20~mv2.png',
};

for (const [key, m] of Object.entries(MEDIA)) {
  if (m.src && m.role === 'content' && !m.alt.trim()) {
    throw new Error(
      `build-sections: MEDIA.${key} is a content image with no alt text. ` +
      `Several of these arrived with filenames as alt text on the live site; ` +
      `see assets/from-live-site/README.md.`
    );
  }
  if (m.src && !/^https:\/\/static\.wixstatic\.com\//.test(m.src)) {
    throw new Error(
      `build-sections: MEDIA.${key} must point at this site's Media Manager ` +
      `(https://static.wixstatic.com/...), not ${m.src}`
    );
  }
}

// Page key -> ordered snippet files. Keys are what page code passes to pageSrc().
// The closing section is the CTA the page has earned. Joining means leaving for Member
// Jungle, which is a lot to ask of someone who arrived forty seconds ago wanting to know
// what a tariff line means, so informational pages ask for the cheaper next step.
const PAGES = {
  // Landmark
  // Band rhythm is the point, not the section count. Surfaces alternate deliberately:
  // dark, dark strip, paper, dark, mist, paper, mist, accent, paper, dark. Two bands of
  // the same surface never sit together, which is what stops a long page reading as one
  // undifferentiated column.
  home: ['home-hero', 'credibility-strip', 'pathways', 'fta-feature-band', 'trade-stats',
    'report-feature', 'magazine-feature', 'newsletter-band', 'partners-wall', 'join-cta'],
  fta: ['fta-centre', 'cta-guidance'],

  // Hub
  membership: ['membership', 'join-cta'],
  events: ['events', 'cta-events'],
  tradeResources: ['trade-resources', 'cta-guidance'],
  tradeMissions: ['trade-missions', 'cta-guidance'],
  indiaMarketOpportunities: ['india-market-opportunities', 'cta-guidance'],

  // Editorial
  about: ['about-hero', 'credibility-strip', 'join-cta'],
  executiveCouncil: ['executive-council', 'join-cta'],
  ourPatron: ['our-patron', 'join-cta'],
  publications: ['insights-publications', 'cta-subscribe'],
  newsletters: ['insights-newsletters', 'cta-subscribe'],
  digest: ['digest', 'cta-subscribe'],
  news: ['news', 'cta-subscribe'],
  partners: ['partners', 'partners-wall', 'cta-sponsor'],

  // Task. No closing CTA: the page IS the action, and a second one competes with it.
  membershipJoin: ['membership-join'],
  connect: ['connect'],
  memberDirectory: ['member-directory'],
  ftaExplainer: ['fta-explainer'],
  eventsPast: ['events-past'],
};

// Navigation, rendered inside every page's document.
//
// The Wix header menu is site structure and cannot be set from git. This nav can, because
// each page is a self-contained document. Every link goes through inzNav() rather than
// target="_top" — see the SITE_ORIGIN block below for why that attribute does nothing here.
//
// Slugs must match what is set in Wix Page Settings. Where they do not, the link 404s.
// See ARCHITECTURE.md.
const NAV = `
<header class="inz-nav">
  <a class="inz-nav__brand" href="/" onclick="inzNav(event, '/')" aria-label="India New Zealand Business Council, home">
    <img src="${ART.logo}" alt="India New Zealand Business Council" width="200" height="57">
  </a>
  <nav aria-label="Main">
    <ul class="inz-nav__list">
      <li><a href="/fta" onclick="inzNav(event, '/fta')">NZ&ndash;India FTA</a></li>
      <li><a href="/trade-resources" onclick="inzNav(event, '/trade-resources')">Trade</a></li>
      <li><a href="/events" onclick="inzNav(event, '/events')">Events</a></li>
      <li><a href="/membership" onclick="inzNav(event, '/membership')">Membership</a></li>
      <li><a href="/publications" onclick="inzNav(event, '/publications')">Insights</a></li>
      <li><a href="/news" onclick="inzNav(event, '/news')">Media</a></li>
      <li><a href="/partners" onclick="inzNav(event, '/partners')">Partners</a></li>
      <li><a href="/about-inzbc" onclick="inzNav(event, '/about-inzbc')">About</a></li>
    </ul>
  </nav>
  <a class="inz-btn inz-btn--primary inz-nav__cta" href="/membership/join" onclick="inzNav(event, '/membership/join')">Join</a>
</header>`;

const FOOTER = `
<footer class="inz-footer">
  <div class="inz-container inz-footer__grid">
    <div>
      <p class="inz-footer__brand">India New Zealand Business Council</p>
      <p class="inz-footer__note">Connecting New Zealand and India through trade, investment and commercial diplomacy since 1988.</p>
    </div>
    <div>
      <p class="inz-footer__head">Explore</p>
      <ul>
        <li><a href="/fta" onclick="inzNav(event, '/fta')">NZ&ndash;India FTA</a></li>
        <li><a href="/trade-missions" onclick="inzNav(event, '/trade-missions')">Trade missions</a></li>
        <li><a href="/india-market-opportunities" onclick="inzNav(event, '/india-market-opportunities')">Market opportunities</a></li>
        <li><a href="/events" onclick="inzNav(event, '/events')">Events</a></li>
      </ul>
    </div>
    <div>
      <p class="inz-footer__head">Membership</p>
      <ul>
        <li><a href="/membership" onclick="inzNav(event, '/membership')">Why join</a></li>
        <li><a href="/membership/join" onclick="inzNav(event, '/membership/join')">Become a member</a></li>
        <li><a href="/membership/directory" onclick="inzNav(event, '/membership/directory')">Member directory</a></li>
        <li><a href="/executive-council" onclick="inzNav(event, '/executive-council')">Executive Council</a></li>
      </ul>
    </div>
    <div>
      <p class="inz-footer__head">Connect</p>
      <ul>
        <li><a href="/connect" onclick="inzNav(event, '/connect')">Contact us</a></li>
        <li><a href="/partners" onclick="inzNav(event, '/partners')">Partners</a></li>
        <li><a href="/newsletters" onclick="inzNav(event, '/newsletters')">Newsletters</a></li>
        <li><a href="/news" onclick="inzNav(event, '/news')">News</a></li>
      </ul>
    </div>
  </div>
</footer>`;

// Wix's Embed Code element is a sandboxed iframe with no direct access to the parent
// page (dev.wix.com, "Working with the HTML iFrame Element") and no way for us to add
// an allow-top-navigation sandbox token, so a plain <a target="_top"> is silently
// swallowed — the click does nothing, no error. Wix's own documented fix is the
// postMessage()/onMessage() messaging API between an HTML element and page code:
// https://dev.wix.com/docs/velo/velo-only-apis/$w/html-component/messaging-between-a-site-page-and-an-html-element
// Every internal link calls inzNav(event, path) instead of relying on target="_top".
// wire-pages.js's page-code template receives the message and calls wixLocation.to().
//
// targetOrigin is the site's real origin, not "*": Wix's own docs warn that "*" lets any
// site intercept the message (MDN Window.postMessage()).
const SITE_ORIGIN = 'https://inzbcsecretariat.wixstudio.com';

const NAV_SCRIPT = `
<script>
  function inzNav(event, path) {
    event.preventDefault();
    window.parent.postMessage({ path: path }, '${SITE_ORIGIN}');
  }
</script>`;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
// INZBC has not chosen between the candidate palettes. docs/live-site-extract.md records
// the conflict and marks the bicultural set explicitly NOT approved, so both are built and
// previewed side by side rather than one being guessed at:
//
//   node scripts/build-sections.js                          -> live-site palette
//   INZ_PALETTE=bicultural node scripts/build-sections.js    -> provisional palette
//
// Production bakes whichever is selected. Only the preview emitter writes both.
const PALETTES = {
  // Measured from the live inzbc.org, 6 August 2026.
  live: {
    navy: '#1b1464', ink: '#12103a', deep: '#0c0a2c',
    second: '#097bb8', accent: '#f8c70c', warm: '#d0611d',
    body: '#414141', muted: '#6b7086',
    paper: '#ffffff', mist: '#f2f3f7', line: '#e4e6ee',
    // Decorative only, never text: the hero's counterpoint colour pool and the hairline
    // used for the horizon and perspective grid.
    pool: '#61145f', hairline: '#9fb6e8',
  },
  // CONFIRMED by Sunil, 9 Aug 2026. The purple-and-green set recorded as the repo palette
  // in docs/live-site-extract.md: purple #61145f, lime #b8f07c, forest #1b4640 over a
  // #160933 base, with lavender #c1acfb as the hairline. ink, deep, body, muted and line
  // are derived from those, since that document names only the brand colours.
  purpleGreen: {
    navy: '#160933', ink: '#1a0b3f', deep: '#0e0522',
    second: '#1b4640', accent: '#b8f07c', warm: '#61145f',
    body: '#3a3742', muted: '#655f73',
    paper: '#ffffff', mist: '#f4f2f8', line: '#e6e1ee',
    pool: '#61145f', hairline: '#c1acfb',
  },
  // PROVISIONAL, not approved. The three brand colours are from docs/live-site-extract.md;
  // ink, deep, body, muted and line are derived here because that document names only the
  // three. If INZBC adopts this set, those five need confirming too.
  bicultural: {
    navy: '#12203d', ink: '#0b1526', deep: '#060d18',
    second: '#0e7c86', accent: '#e86a17', warm: '#e86a17',
    body: '#3d4450', muted: '#657084',
    paper: '#ffffff', mist: '#f2f4f7', line: '#e2e6ec',
    // Marigold is the natural counterpoint to teal here, where the live palette uses a
    // magenta. Decorative only.
    pool: '#7a3208', hairline: '#8fb3bd',
  },
};

// ---- Colour maths ---------------------------------------------------------
// WCAG 2.1 relative luminance. This exists to fail the build, not to produce a number for
// a comment: the comment block that used to sit here listed every pair as passing while
// .inz-footer__legal shipped at 3.75:1 and the focus ring at 1.60:1 on white.
function rgbOf(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = rgbOf(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
}

// Flatten a translucent colour against the surface it actually sits on. Authoring alpha
// here rather than in the CSS is the entire point: an rgba() text colour is invisible to
// any check that compares declared token values, because the token says #fff (15.78:1 on
// deep) while the reader sees the composite (3.75:1 at 40% alpha).
function over(hex, alpha, bgHex) {
  const fg = rgbOf(hex);
  const bg = rgbOf(bgHex);
  return '#' + fg
    .map((c, i) => Math.round(alpha * c + (1 - alpha) * bg[i]).toString(16).padStart(2, '0'))
    .join('');
}

// For decorative layers that genuinely need alpha at paint time — gradient stops composite
// against whatever is beneath them, so they cannot be pre-flattened the way text can.
// Written as a function so these still follow the palette; the hero used to hardcode the
// live palette's RGB triples, which meant switching palettes recoloured every token and
// left the largest element on every page in the old colours.
function rgba(hex, alpha) {
  return `rgba(${rgbOf(hex).join(',')},${alpha})`;
}

// Brand colours are chosen against white. On a tinted surface they lose contrast, and
// small text is where that first bites: #097bb8 is 4.63:1 on paper but 4.17:1 on mist.
// Darkening the brand hue itself keeps the colour recognisably the brand — the alternative
// everyone reaches for is grey, which throws the hue away. Steps in 4% black until the
// ratio clears, so it re-derives correctly for any palette rather than being hand-tuned.
function darkenUntil(hex, bgHex, target) {
  let c = hex;
  for (let i = 0; i < 40 && contrast(c, bgHex) < target; i++) {
    c = over('#000000', 0.04, c);
  }
  return c;
}

// purpleGreen is the default because Sunil confirmed it on 9 Aug 2026. The other two stay
// buildable so the decision can be revisited without a rewrite.
const PALETTE = process.env.INZ_PALETTE || 'purpleGreen';
const P = PALETTES[PALETTE];
if (!P) {
  throw new Error(
    `build-sections: unknown INZ_PALETTE "${PALETTE}" (have: ${Object.keys(PALETTES).join(', ')})`
  );
}

// Text and rules on dark surfaces, flattened at build time. The alphas are a starting
// point; the assert below is what holds them to AA.
P.onDark = over('#ffffff', 0.86, P.ink);          // hero body copy
P.onDeep = over('#ffffff', 0.7, P.deep);          // footer body and links
P.onDeepMuted = over('#ffffff', 0.5, P.deep);     // footer legal. Was 0.4 -> 3.75:1, failed
P.ruleOnDark = over('#ffffff', 0.16, P.deep);     // hairlines. Decorative, not text

// Focus rings are surface-specific, and this is not cosmetic. Gold on white is 1.60:1 and
// on mist 1.44:1 — a keyboard user on a light band cannot see where they are. Gold on deep
// is 12.02:1 and fine. One token cannot serve both, so there are two.
P.focusLight = P.navy;
P.focusDark = P.accent;

// Text-safe variants for the tinted surface. .inz-note is .8125rem (normal text, 4.5:1);
// .inz-stat__figure is clamp(2rem,...) (large text, 3:1). Derived against mist because
// that is the worse of the two light surfaces, so one value is safe on both.
P.noteText = darkenUntil(P.second, P.mist, 4.5);
P.statText = darkenUntil(P.warm, P.mist, 3);

// ---- Contrast policy ------------------------------------------------------
// Text needs 4.5:1. Large text (>=24px, or >=18.66px bold) and non-text UI indicators such
// as focus rings need 3:1. Purely decorative colour carries no requirement and is
// deliberately absent from this table rather than given a token threshold of 1.
//
// [[REVIEW: Bhanu — the pairs below are the ones I can justify from the CSS as it stands.
// Two judgement calls worth checking: (a) the .inz-stat figure is display-sized, so it is
// listed at 3:1 not 4.5:1; (b) hairline rules on dark are treated as decorative and are
// not asserted at all. If either should be stricter, change the threshold here — that is
// the only place it is expressed.]]
const CONTRAST_PAIRS = [
  ['body on paper', P.body, P.paper, 4.5],
  ['body on mist', P.body, P.mist, 4.5],
  ['muted on paper', P.muted, P.paper, 4.5],
  ['link on paper', P.second, P.paper, 4.5],
  ['heading on paper', P.ink, P.paper, 4.5],
  ['primary CTA text on fill', P.navy, P.accent, 4.5],
  ['secondary CTA on paper', P.navy, P.paper, 4.5],
  ['white on ink', '#ffffff', P.ink, 4.5],
  ['white on deep', '#ffffff', P.deep, 4.5],
  ['white on navy', '#ffffff', P.navy, 4.5],
  ['hero copy on ink', P.onDark, P.ink, 4.5],
  ['footer copy on deep', P.onDeep, P.deep, 4.5],
  ['footer legal on deep', P.onDeepMuted, P.deep, 4.5],
  // .inz-stat__figure is clamp(2rem,...) so it is large text at 3:1. .inz-note is
  // .8125rem, which is normal text at 4.5:1 however small it looks.
  ['stat figure on paper', P.statText, P.paper, 3],
  ['stat figure on mist', P.statText, P.mist, 3],
  // The inverted stat tile: accent figure and body text on the ink surface.
  ['stat figure on ink', P.accent, P.ink, 3],
  ['stat label on ink', P.onDark, P.ink, 4.5],
  ['note on paper', P.noteText, P.paper, 4.5],
  ['note on mist', P.noteText, P.mist, 4.5],
  ['focus ring on paper', P.focusLight, P.paper, 3],
  ['focus ring on mist', P.focusLight, P.mist, 3],
  ['focus ring on deep', P.focusDark, P.deep, 3],
];

const contrastFailures = CONTRAST_PAIRS
  .map(([name, fg, bg, min]) => ({ name, fg, bg, min, ratio: contrast(fg, bg) }))
  .filter((r) => r.ratio < r.min);

if (contrastFailures.length) {
  console.error(`\nbuild-sections: palette "${PALETTE}" fails WCAG AA\n`);
  for (const f of contrastFailures) {
    console.error(
      `  ${f.name.padEnd(26)} ${f.fg} on ${f.bg}  ` +
      `${f.ratio.toFixed(2)}:1  (needs ${f.min}:1)`
    );
  }
  console.error('');
  throw new Error(`${contrastFailures.length} contrast failure(s) in palette "${PALETTE}"`);
}

// ---------------------------------------------------------------------------
// The stylesheet every page carries. A data: URI has an opaque origin and inherits nothing
// from the parent page, so the whole design system travels inside each document.
//
// Cinematic direction adopted 6 August 2026 (design-preview/home-cinematic.html), in the
// language of wearebrand.io: full-bleed photography, large lowercase geometric sans, tight
// leading, minimal chrome, depth from layered movement rather than decoration.
//
// TYPEFACE: Poppins. This deviates from Big Shoulders in docs/design-decisions.md, which is
// condensed and uppercase-only; the look does not survive in it. Recorded as a deviation
// pending INZBC sign-off, not a silent change.
//
// Contrast is asserted above, not documented here. A comment cannot fail a build.
// Shared by BASE_CSS (which travels inside each iframe) and site-head.html (which a human
// pastes into Wix Custom Code to style the native page around the iframe). Defined once so
// the two cannot drift — site-head.html had been left on the previous system entirely,
// still declaring Merriweather, Big Shoulders, a 1160px measure and a third palette.
const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

const TOKENS = `  :root{
    --inz-navy:${P.navy}; --inz-ink:${P.ink}; --inz-deep:${P.deep}; --inz-blue:${P.second};
    --inz-gold:${P.accent}; --inz-orange:${P.warm}; --inz-body:${P.body};
    --inz-white:${P.paper}; --inz-mist:${P.mist}; --inz-line:${P.line}; --inz-muted:${P.muted};

    /* Text on dark surfaces, pre-flattened against the surface named in the token. Never
       replace these with rgba(): the alpha then becomes invisible to the contrast assert. */
    --inz-on-dark:${P.onDark}; --inz-on-deep:${P.onDeep};
    --inz-on-deep-muted:${P.onDeepMuted}; --inz-rule-on-dark:${P.ruleOnDark};

    /* Two focus rings, because one colour cannot clear 3:1 on both paper and deep. */
    --inz-focus-light:${P.focusLight}; --inz-focus-dark:${P.focusDark};

    /* Brand hues darkened until they clear AA on the tinted surface. Use these for text,
       and the plain brand tokens for fills, rules and large display. */
    --inz-note-text:${P.noteText}; --inz-stat-text:${P.statText};

    --inz-max-width:1240px; --inz-radius:100px; --inz-radius-card:14px;

    /* RATCHET: retained only so not-yet-migrated inline styles still resolve. Delete when
       Phase 1c finishes and the inline-style guard goes live. */
    --inz-purple:${P.navy}; --inz-tangerine:${P.accent}; --inz-lavender:#9fb6e8;
    --inz-forest:${P.second}; --inz-crimson:${P.warm}; --inz-lime:${P.accent};
    --inz-light:${P.mist};
  }`;

const BASE_CSS = `
${FONT_LINKS}
<style>
${TOKENS}
  *{box-sizing:border-box}
  /* No image may exceed its column. One rule, rather than discovering per image that a
     1593px mockup has pushed a band's text out of view. */
  img{max-width:100%;height:auto}
  html{scroll-behavior:smooth}
  body{
    margin:0;padding:0;background:var(--inz-white);color:var(--inz-body);
    font-family:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif;
    line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased;
  }
  a{color:var(--inz-blue)}
  .par{will-change:transform}

  /* Headings: lowercase geometric, tight. line-height 1 clears Poppins' descenders —
     at .88 the g/y of "gateway" collide with the line below. */
  .inz-section h1,.inz-section h2,.inz-section h3,.inz-section .inz-heading{
    font-family:inherit;font-weight:600;text-transform:none;letter-spacing:-.03em;
    line-height:1;margin:0 0 .45em;color:var(--inz-ink);
  }
  .inz-section h1{font-size:clamp(2.7rem,6.8vw,6rem)}
  .inz-section h2{font-size:clamp(1.9rem,4.3vw,3.4rem)}
  .inz-section h3{font-size:clamp(1.2rem,2.3vw,1.75rem);font-weight:500}
  .inz-section{font-family:inherit;color:var(--inz-body);line-height:1.65}
  .inz-section p{max-width:64ch;margin:0 0 1em;font-weight:300}
  .inz-container{width:min(90%,var(--inz-max-width));margin-inline:auto}

  /* Buttons: pill, no uppercase. Gold fill takes navy text (9.89:1). */
  .inz-btn{
    display:inline-flex;align-items:center;font-family:inherit;font-weight:500;
    text-transform:none;letter-spacing:0;text-decoration:none;font-size:.88rem;
    padding:1em 1.9em;border-radius:var(--inz-radius);
    transition:transform .2s ease,background .2s ease;
  }
  /* Focus is visible on both surfaces or it is not an accessibility feature. The dark
     override has to come after, and has to cover every dark context: hero, nav, footer,
     and any band carrying the dark surface modifier. */
  .inz-btn:focus-visible,a:focus-visible{outline:3px solid var(--inz-focus-light);outline-offset:3px}
  .inz-hero :focus-visible,.inz-nav :focus-visible,.inz-footer :focus-visible,
  .inz-band--dark :focus-visible{outline-color:var(--inz-focus-dark)}
  .inz-btn--primary{background-color:var(--inz-gold);color:var(--inz-navy)}
  .inz-btn--secondary{background-color:transparent;color:var(--inz-navy);box-shadow:inset 0 0 0 1px currentColor}
  .inz-btn:hover{transform:translateY(-2px)}
  .inz-btn--sm{padding:.65em 1.4em;font-size:.8125rem}

  /* =========================================================================
     Class vocabulary
     -------------------------------------------------------------------------
     Extracted from the 290 inline style attributes across the 24 snippets, and
     only where a pattern appeared 3+ times with the same intent. The counts in
     each comment are the measured occurrences it replaces.
     ========================================================================= */

  /* ---- Band surfaces --------------------------------------------------------
     .inz-section stays the band class. PARALLAX_SCRIPT selects it to attach the
     scroll reveal, so renaming it would silently kill every animation on every
     page. These are modifiers on it, not a replacement.
     Padding: clamp(3rem,6vw,4.5rem) x23, clamp(4rem,10vw,6rem) x18. */
  /* Band height is a rhythm decision, not one shared number. A page where every band is
     the same height reads as a single column however well the surfaces alternate. */
  .inz-section{padding:clamp(3rem,6vw,4.5rem) 0}
  .inz-section--tall{padding:clamp(4rem,10vw,6rem) 0}
  .inz-section--compact{padding:clamp(1.75rem,3vw,2.5rem) 0}
  .inz-section--generous{padding:clamp(5rem,9vw,7.5rem) 0}
  .inz-section--paper{background:var(--inz-white);color:var(--inz-body)}
  .inz-section--mist{background:var(--inz-mist);color:var(--inz-body)}
  .inz-section--dark{background:var(--inz-ink);color:var(--inz-on-dark)}
  .inz-section--dark h2,.inz-section--dark h3{color:#fff}

  /* ---- Measure --------------------------------------------------------------
     max-width 55ch x16, 60ch x6, plus margin-inline:auto x20 and
     text-align:center x28. 65ch is the readable floor, so the lede sits at 60
     (it is larger than body) and prose at 68. */
  .inz-lede{font-size:clamp(1rem,2vw,1.25rem);max-width:60ch;margin:0 0 2rem}
  /* 68ch, not the 76ch that was set inline x4. 65-75ch is the readable measure; 76 is
     over it, and the container is already capped at 1240px for wider layouts. */
  .inz-prose{max-width:68ch}
  .inz-prose ol,.inz-prose ul{padding-left:1.25rem;margin:0 0 1.5rem}
  .inz-prose li{margin-bottom:.75rem}
  .inz-prose li:last-child{margin-bottom:0}
  .inz-center{text-align:center}
  .inz-center .inz-lede,.inz-center p,.inz-center h1,.inz-center h2{margin-inline:auto}
  /* The kick is a left-aligned rule plus label; centring it needs the flex axis moved,
     not just text-align. */
  .inz-center .inz-kick{justify-content:center}
  /* More space above a heading than below it. Scoped to direct children of the container
     so a card's own h3 is not pushed away from its card. Replaces margin-top:2.5rem x3. */
  .inz-container > :is(h2,h3):not(:first-child){margin-top:2.5rem}
  /* Hero headlines were set inline at 18ch x8, 20ch x6 and 22ch x4. One measure. */
  .inz-hero h1{max-width:20ch}

  /* ---- Grid ----------------------------------------------------------------
     minmax(16rem) x5, (18rem) x5, (14rem) x3; gap 1.5rem x11. */
  .inz-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))}
  .inz-grid--wide{grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))}
  .inz-grid--tight{grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))}

  /* ---- Card ----------------------------------------------------------------
     background #f6f5f8 x40, border-radius 10px x41, padding 1.5rem x27 and
     1.75rem x12. The card radius is its own token: --inz-radius is the 100px
     button pill and would turn a card into a lozenge. Cards invert against their
     band so a mist card never sits on a mist section. */
  /* A hairline and a real shadow. Pale mist on white had almost no edge, so a grid of
     cards read as one flat area with text in it rather than as separate objects. The
     shadow carries an offset and a soft blur; a zero-offset halo is decoration, not depth. */
  .inz-card{
    background:var(--inz-mist);padding:1.75rem;border-radius:var(--inz-radius-card);
    border:1px solid var(--inz-line);box-shadow:0 1px 2px rgba(22,9,51,.04),0 8px 24px rgba(22,9,51,.06);
  }
  .inz-card h3{font-size:1.35rem;margin-bottom:.5rem}
  .inz-card > :last-child{margin-bottom:0}
  .inz-section--mist .inz-card{background:var(--inz-white)}
  .inz-section--dark .inz-card{background:rgba(255,255,255,.06)}
  .inz-card--raised{background:var(--inz-white);box-shadow:0 4px 18px rgba(0,0,0,.07)}
  .inz-section--dark .inz-card{border-color:var(--inz-rule-on-dark);box-shadow:none}
  /* Name plus role, x12 on the Executive Council. Denser than a content card: the name
     leads and the role sits tight beneath it. */
  .inz-person h3{font-size:1.25rem;margin-bottom:.15em}
  .inz-person p{margin:0;color:var(--inz-note-text)}

  /* ---- Stat ----------------------------------------------------------------
     font-size 2.5rem + weight 800 + colour + margin, x4 each. tabular-nums so a
     column of figures aligns; proportional digits make NZ$3.95bn ragged. */
  /* Inverted: dark tiles on the light band, with the figure in lime. These are proof
     points, and as pale cards with purple numerals they read like form fields. Dark tiles
     make them the focus of their band instead of the quietest thing in it. */
  /* .inz-card.inz-stat, not .inz-stat. The surface modifiers use .inz-section--mist
     .inz-card at 0,2,0 and would otherwise repaint these tiles white. */
  .inz-card.inz-stat{background:var(--inz-ink);border-color:transparent;color:var(--inz-on-dark)}
  .inz-stat__figure{
    font-size:clamp(2.1rem,4.2vw,3rem);font-weight:700;line-height:1;
    color:var(--inz-gold);margin:0 0 .35em;letter-spacing:-.03em;
    font-variant-numeric:tabular-nums;
  }
  .inz-stat p:not(.inz-stat__figure){color:var(--inz-on-dark)}
  .inz-stat > :last-child{margin-bottom:0}

  /* ---- Action rows ----------------------------------------------------------
     display:flex x11, flex-wrap x7, justify-content:center x8. */
  .inz-actions{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem}
  .inz-actions--center{justify-content:center}

  /* ---- Small print ----------------------------------------------------------
     color #097bb8 x33, mostly source citations and meta lines. */
  .inz-note{font-size:.8125rem;color:var(--inz-note-text)}
  /* A source citation almost always trails a grid or a card. Spacing it by adjacency
     avoids a margin utility class, which is where utility sprawl starts. */
  .inz-grid + .inz-note,.inz-card + .inz-note{margin-top:1.5rem}
  .inz-section--dark .inz-note{color:var(--inz-on-deep-muted)}

  /* ---- Sibling rail ---------------------------------------------------------
     Phase 0 finding: the page set is organised by INZBC's org chart, not visitor
     intent, so four pages publish things and three help you export. Slugs are
     live 301 destinations and cannot be merged, so this routes sideways instead. */
  .inz-rail{
    display:flex;flex-wrap:wrap;gap:.6rem 1.4rem;padding-top:1.6rem;
    border-top:1px solid var(--inz-line);margin-top:2.5rem;font-size:.85rem;
  }
  .inz-section--dark .inz-rail{border-top-color:var(--inz-rule-on-dark)}

  /* ---- Credibility strip and split band ------------------------------------- */
  .inz-strip{
    display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem 2.5rem;
    text-align:center;font-size:clamp(.85rem,1.5vw,1rem);
  }
  .inz-split{display:flex;flex-wrap:wrap;align-items:center;gap:2rem;justify-content:space-between}
  .inz-split > :first-child{flex:1 1 32rem}
  /* The trailing column is usually a single button. Without this it stretches and the
     button lands at an arbitrary height beside a tall paragraph. */
  /* Sized through a custom property, not a plain declaration. As a plain rule this is
     specificity 0,3,0 because of the :not(), which beat every .inz-split--x > :last-child
     modifier at 0,2,0 and collapsed the cover and device columns to their natural width.
     A variable is read at use time, so the modifier below simply sets it and order and
     specificity stop mattering. */
  .inz-split > :last-child:not(:first-child){flex:var(--inz-split-last,0 0 auto);align-self:center}
  .inz-split .inz-actions{margin-top:0}
  /* Portrait or cover beside copy: the media column is fixed, the text takes the rest. */
  .inz-split--media{align-items:flex-start;gap:2.5rem;--inz-split-last:1 1 24rem}
  .inz-split--media > :first-child{flex:0 0 14rem;max-width:100%}
  .inz-media{
    background:var(--inz-mist);border-radius:var(--inz-radius-card);aspect-ratio:1;
    display:grid;place-items:center;text-align:center;padding:1rem;
    color:var(--inz-note-text);font-size:.875rem;
  }
  .inz-section--mist .inz-media{background:var(--inz-white)}

  /* A real path or identifier, not monospace worn as a costume. */
  code{
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9em;
    background:var(--inz-line);padding:.15em .4em;border-radius:4px;
  }

  /* ---- Pathway cards -------------------------------------------------------
     The four routes into the site, each led by one of INZBC's blob illustrations. The art
     is the point, so it gets real size and the card is a link rather than a card with a
     link inside it: the whole tile is the target. */
  .inz-pathway{
    display:flex;flex-direction:column;align-items:center;text-align:center;
    text-decoration:none;color:inherit;padding:2rem 1.5rem;
  }
  /* The art is the reason this section exists, so it gets real size. At the previous
     clamp it rendered around 90px and read as a small icon rather than an illustration. */
  /* The blob sits in a tinted well across the top of the card rather than floating as an
     icon above text. It is illustration, so it gets the room illustration needs. */
  .inz-pathway{padding:0 0 1.75rem;overflow:hidden}
  .inz-pathway__well{
    width:100%;padding:1.5rem 1rem 1rem;margin-bottom:1.25rem;
    background:radial-gradient(70% 90% at 50% 40%,rgba(27,20,100,.07),transparent 70%);
    display:grid;place-items:center;
  }
  .inz-pathway h3,.inz-pathway p{padding-inline:1.5rem}
  .inz-pathway__art{
    width:clamp(150px,17vw,200px);height:auto;display:block;
    transition:transform .35s cubic-bezier(.2,.8,.3,1);
  }
  .inz-pathway h3{color:var(--inz-ink);font-size:1.15rem}
  .inz-pathway p{margin:0;font-size:.95rem;max-width:26ch}
  /* The blob lifts and grows slightly; the card itself stays put, so the art leads. */
  .inz-pathway:hover .inz-pathway__art{transform:translateY(-6px) scale(1.06)}
  .inz-pathway:hover{transform:none}

  /* ---- Publication cover ---------------------------------------------------
     A real cover, given room and a shadow so it reads as a physical object. */
  .inz-split--cover{align-items:center;gap:3rem;--inz-split-last:1 1 26rem}
  .inz-split--cover > :first-child{flex:0 0 clamp(200px,26vw,320px)}
  /* The cap belongs on the cover itself, not only on its column. A flip or a future layout
     change can hand this element the flexible column, and a 2464px magazine scan then
     renders at natural size and bleeds off the page. Belt and braces. */
  .inz-cover{max-width:clamp(200px,26vw,320px)}
  .inz-cover img{
    width:100%;height:auto;display:block;border-radius:10px;
    box-shadow:0 18px 40px rgba(0,0,0,.18);
  }
  /* Alternates which side the cover sits on, so two feature bands in a row do not read as
     a template. row-reverse rather than reordering the markup, which keeps reading order
     and tab order matching the source. */
  .inz-split--flip{flex-direction:row-reverse}
  @media (max-width:820px){.inz-split--flip{flex-direction:column}}

  /* ---- Partner wall --------------------------------------------------------
     Real partner logos, tiered. The strongest credibility asset INZBC has, and the reason
     the Partners page should never have shipped with [[Logo]] placeholders. */
  .inz-wall{margin:0}
  .inz-wall img{width:100%;height:auto;display:block;border-radius:10px}

  /* ---- Accent band ---------------------------------------------------------
     The one warm band on the page. Used once, for the standing subscribe offer, so it
     reads as an offer rather than as another section. */
  .inz-section--accent{background:var(--inz-orange);color:#fff}
  .inz-section--accent h2{color:#fff}
  .inz-section--accent .inz-note{color:rgba(255,255,255,.85)}
  .inz-btn--onaccent{background:#fff;color:var(--inz-orange)}
  .inz-btn--onaccent-ghost{background:transparent;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.6)}
  .inz-split--device{--inz-split-last:0 0 clamp(220px,30vw,420px)}
  .inz-device{margin:0}
  .inz-device img{width:100%;height:auto;display:block}

  /* ---- Partner logo tile ----------------------------------------------------
     width 9rem + height 5rem + radius 8px, x3 each. */
  .inz-logos{display:flex;flex-wrap:wrap;gap:2rem;align-items:center;justify-content:center;margin-top:2rem}
  .inz-logo{
    width:9rem;height:5rem;display:grid;place-items:center;text-align:center;
    background:var(--inz-mist);border-radius:8px;padding:.75rem;
    font-size:.75rem;color:var(--inz-note-text);
  }
  .inz-section--mist .inz-logo{background:var(--inz-white)}

  /* ---- Browser surfaces -----------------------------------------------------
     Selection, caret and scrollbar ship with browser defaults that belong to no
     design system. Cheap to theme, conspicuous when nobody has. */
  ::selection{background:var(--inz-gold);color:var(--inz-navy)}
  html{scrollbar-color:var(--inz-muted) transparent;caret-color:var(--inz-blue)}
  a{text-underline-offset:.18em}

  /* ---- Hero: photographic depth generated in CSS, no photograph ----
     What makes an image read as "photographic" rather than "a gradient" is four things,
     and all four can be synthesised: overlapping soft colour pools at different depths,
     film grain, a vignette, and something with a real edge (here, a horizon and a
     perspective grid). Together they give a rendered scene rather than a flat wash — and
     nothing has to be licensed, uploaded, or kept in step with a Media Manager. */
  .inz-section.inz-hero,.inz-hero{
    position:relative;overflow:hidden;
    /* Was !important while the hero snippets still carried their own inline navy gradient.
       They no longer do, and the guard stops one coming back. */
    background:var(--inz-ink);
    display:flex;align-items:center;
  }
  /* Hero height is an archetype decision, not one number for twenty pages. A single
     min(88vh,760px) put a near-full screen of empty gradient above one paragraph: on
     ourPatron that was 39.5% of the entire page height, measured in a browser.
       landmark  Home and FTA. Cold traffic, nothing above it, earns the full screen.
       page      Hubs and editorial. Enough to establish the band, not a barrier.
       task      Join, Connect, Directory. The visitor came to do one thing. */
  .inz-hero--landmark{min-height:min(88vh,760px)}
  .inz-hero--page{min-height:min(46vh,400px)}
  .inz-hero--task{min-height:min(32vh,280px)}
  .inz-hero--landmark .inz-container{padding-block:4rem}
  .inz-hero--page .inz-container{padding-block:3rem}
  .inz-hero--task .inz-container{padding-block:2.5rem}
  /* Colour pools. Three offset radial gradients at different scales — the same trick a
     mesh-gradient tool uses, done by hand so it costs nothing. */
  .inz-hero__plate{
    position:absolute;inset:-25% -10%;z-index:0;
    background:
      radial-gradient(60% 55% at 18% 22%, ${rgba(P.second, 0.55)} 0%, transparent 62%),
      radial-gradient(46% 48% at 82% 30%, ${rgba(P.pool, 0.5)} 0%, transparent 66%),
      radial-gradient(70% 60% at 55% 92%, ${rgba(P.accent, 0.16)} 0%, transparent 60%),
      radial-gradient(90% 80% at 50% 50%, ${rgba(P.navy, 0.9)} 0%, ${P.deep} 78%);
    filter:blur(4px);
  }
  /* The photograph, when a page has one. Sits above the synthesised plate and below the
     scrim and grain, so it picks up the same vignette and film treatment instead of looking
     pasted on. Absent entirely when MEDIA has no src, which is the state that ships today. */
  .inz-hero__photo{
    position:absolute;inset:-25% -10%;z-index:1;
    background-size:cover;background-repeat:no-repeat;opacity:.55;
  }
  /* Horizon + perspective grid. The straight edge is what stops it reading as a blur:
     an eye takes a hard horizontal as depth cue and fills in a landscape behind it. */
  .inz-hero__scrim{
    position:absolute;inset:0;z-index:1;pointer-events:none;
    background:
      linear-gradient(180deg,transparent 0%,transparent 61.5%,${rgba(P.hairline, 0.5)} 61.7%,transparent 62%),
      repeating-linear-gradient(90deg,${rgba(P.hairline, 0.09)} 0 1px,transparent 1px 92px),
      linear-gradient(180deg,${rgba(P.deep, 0.15)} 0%,transparent 30%,transparent 55%,${rgba(P.deep, 0.72)} 100%);
    -webkit-mask-image:linear-gradient(180deg,transparent 8%,#000 45%,#000 78%,transparent 100%);
    mask-image:linear-gradient(180deg,transparent 8%,#000 45%,#000 78%,transparent 100%);
  }
  /* Grain + vignette. feTurbulence is the same fractal noise a film-grain filter uses;
     at low opacity it removes the plasticky banding that gives CSS gradients away. */
  /* This layer sits above the photograph, so it is what keeps the headline legible over it.
     The alpha is baked into each gradient rather than set as layer opacity, because opacity
     would fade the legibility scrim and the grain together and the scrim has to stay
     strong. Without this, white text over the harbour frame drops well under AA. */
  .inz-hero__base{
    position:absolute;inset:0;z-index:2;pointer-events:none;
    background-image:
      linear-gradient(180deg,rgba(6,5,26,.66) 0%,rgba(6,5,26,.42) 42%,rgba(6,5,26,.82) 100%),
      radial-gradient(120% 95% at 50% 45%, transparent 38%, rgba(6,5,26,.55) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    background-size:cover,cover,220px 220px;
    mix-blend-mode:normal;
  }
  /* INZBC's designed banner. Finished artwork carrying its own logo and tagline, so it is
     shown whole and nothing is laid over it. It lives on the FTA page, where its blue and
     orange belong to the subject rather than fighting the purple and lime. */
  .inz-banner{margin:0 auto 2.5rem;max-width:min(100%,880px);border-radius:12px;
    overflow:hidden;box-shadow:0 18px 44px rgba(22,9,51,.18)}
  .inz-banner img{width:100%;height:auto;display:block}

  /* ---- Wide hero -----------------------------------------------------------
     Left-aligned, because every other band on this page is centred and a hero that matches
     them gives the page no opening. The copy is held to the left so the photograph reads as
     a photograph rather than as texture behind text.

     The designed blue-and-orange banner that used to sit here has been removed. It is
     INZBC's previous brand and it collided with the purple and lime it was sitting on. It
     still ships on the FTA page, where the blue belongs to the subject rather than fighting
     the palette. */
  .inz-hero--wide > .inz-container{text-align:left}
  .inz-hero--wide .inz-kick{justify-content:flex-start}
  .inz-hero--wide h1{max-width:15ch;margin-inline:0}
  .inz-hero--wide .inz-lede{max-width:48ch;margin-inline:0}
  .inz-hero--wide .inz-actions{justify-content:flex-start}
  @media (min-width:900px){
    .inz-hero--wide > .inz-container > *{max-width:min(100%,62ch)}
  }

  /* Three facts under the buttons. The page states them again in full further down; here
     they exist to give a cold visitor a reason to keep scrolling. */
  .inz-hero__facts{
    display:flex;flex-wrap:wrap;gap:1.25rem 2.75rem;margin:2.75rem 0 0;
    padding-top:1.6rem;border-top:1px solid var(--inz-rule-on-dark);
  }
  .inz-hero__facts dt{
    font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;
    color:var(--inz-on-deep-muted);margin:0 0 .35rem;
  }
  .inz-hero__facts dd{
    margin:0;font-size:clamp(1.35rem,2.4vw,1.9rem);font-weight:600;color:#fff;
    line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;
  }

  .inz-hero > .inz-container{position:relative;z-index:4}
  .inz-hero h1,.inz-hero h2,.inz-hero h3{color:#fff}
  .inz-hero p{color:var(--inz-on-dark)}
  /* Every dark context, not just the hero. Scoping this to .inz-hero alone left the
     secondary button navy-on-navy at 1.15:1 in the closing CTA band, which is
     .inz-section--dark. The focus ring above needs exactly the same list. */
  .inz-hero .inz-btn--secondary,
  .inz-section--dark .inz-btn--secondary,
  .inz-footer .inz-btn--secondary{color:#fff;box-shadow:inset 0 0 0 1px var(--inz-on-deep-muted)}

  /* Body sections get the same grain, far weaker, so light and dark bands feel like one
     surface rather than two different documents. */
  .inz-section:not(.inz-hero){position:relative}
  .inz-section:not(.inz-hero)::after{
    content:"";position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.035;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E");
  }
  /* :not(.inz-hero) matters. Without it this rule also hits the hero's own layer divs and
     overrides their position:absolute, because it has the same specificity and is declared
     later. A relative, empty div with no height collapses to 0x0, so the plate, the
     photograph and the grain all rendered as nothing and the parallax had nothing to move.
     The hero was a flat navy block for that reason alone. */
  .inz-section:not(.inz-hero) > *{position:relative;z-index:1}

  /* ---- Drifting glow -------------------------------------------------------
     A slow colour pool behind a band, moving at its own rate. This is where extra motion
     belongs: it is a depth layer with nothing to read on it, so it adds life without
     dragging the text around, which is what parallax on a reading surface does.
     Sits at z-index 0, under the band's own content. */
  .inz-glow{
    position:absolute;inset:-30% -15%;z-index:0;pointer-events:none;
    background:radial-gradient(45% 45% at var(--glow-x,25%) 50%,var(--glow-c,var(--inz-orange)) 0%,transparent 70%);
    opacity:.13;filter:blur(30px);
  }
  .inz-section--dark .inz-glow{opacity:.4}
  .inz-glow--right{--glow-x:78%}
  .inz-glow--blue{--glow-c:var(--inz-blue)}
  .inz-glow--accent{--glow-c:var(--inz-gold)}

  /* [[placeholder]] markers. Deliberately outside both palettes: this is a build-state
     warning, not part of the design, and it should look wrong on the page. The release
     gate (INZ_RELEASE=1) refuses to build while any remain, so none of this ships. */
  .inz-ph{
    background:repeating-linear-gradient(45deg,#ffe9a8 0 8px,#ffd970 8px 16px);
    color:#3a2c00;font-weight:500;padding:.05em .3em;border-radius:3px;
    box-shadow:inset 0 0 0 1px #b98900;
  }

  /* Eyebrow rule — the gold tick that opens each band. */
  .inz-kick{
    display:flex;align-items:center;gap:.85rem;color:var(--inz-gold);font-size:.72rem;
    letter-spacing:.22em;text-transform:uppercase;font-weight:500;margin:0 0 1.6rem;
  }
  .inz-kick::before{content:"";width:44px;height:1px;background:var(--inz-gold);flex:0 0 auto}

  /* ---- Motion -------------------------------------------------------------
     Two rules govern everything here.

     First, animate from an already-visible default. The hidden state is scoped to
     .js-motion, which the script adds to <html> only once it is running. If the script
     fails, throws, or is blocked, nothing is ever hidden and the page reads normally. The
     previous version started at opacity:0 unconditionally and needed a 1.5s timeout to
     un-hide anything the observer missed, which is a blank page waiting to happen.

     Second, restraint. Every .inz-section used to get the same entrance, which is a tell
     rather than a design. The hero parallax is the authored moment; elsewhere only card
     grids move, and they stagger their children rather than sliding as a slab. */
  /* A spring, generated rather than guessed: 0.45s perceptual, bounce 0.15. The returned
     800ms includes the settle, so siblings are timed off 0.45s, not 800ms. Opacity uses a
     plain ease over the perceptual duration, because a fade that overshoots reads as a
     flicker. */
  .js-motion .rv-stagger > *{
    opacity:0;transform:translateY(26px);
    transition:
      opacity .45s cubic-bezier(.16,1,.3,1),
      transform 800ms linear(0, 0.0523, 0.1708, 0.314, 0.4571, 0.5866, 0.6963, 0.7848, 0.8534, 0.9047, 0.9416, 0.9673, 0.9843, 0.9951, 1.0014, 1.0047, 1.0061, 1.0062, 1.0057, 1.0049, 1.004, 1.0031, 1.0023, 1.0017, 1.0012, 1.0008, 1);
  }
  .js-motion .rv-stagger.in > *{opacity:1;transform:none}
  /* 70ms reads as a sequence; much more and the last card feels late. */
  .js-motion .rv-stagger.in > :nth-child(2){transition-delay:70ms}
  .js-motion .rv-stagger.in > :nth-child(3){transition-delay:140ms}
  .js-motion .rv-stagger.in > :nth-child(4){transition-delay:210ms}
  .js-motion .rv-stagger.in > :nth-child(5){transition-delay:280ms}
  .js-motion .rv-stagger.in > :nth-child(n+6){transition-delay:350ms}
  /* Printing and full-page capture do not scroll, so the observer never reveals anything
     below the fold and the page prints with holes where its content should be. */
  @media print{.js-motion .rv-stagger > *{opacity:1 !important;transform:none !important}}

  /* Only cards that actually go somewhere respond to the pointer. A lift on a card with
     no link promises an interaction that does not exist. */
  .inz-card{transition:transform .18s cubic-bezier(.2,.8,.3,1),box-shadow .18s ease}
  .inz-card:has(a):hover{transform:translateY(-3px)}
  .inz-card--raised:has(a):hover{box-shadow:0 10px 28px rgba(0,0,0,.1)}

  /* Navigation */
  /* Static, not fixed. position:fixed inside an iframe pins to the IFRAME's viewport, not
     the browser's, so this nav floated over the page content instead of sticking to the
     top of the window. A sticky site header has to be Wix's own header, outside the embed;
     it cannot be done from in here. */
  .inz-nav{
    position:relative;z-index:60;display:flex;align-items:center;
    background:${rgba(P.ink, 0.92)};
    justify-content:space-between;gap:1.5rem;padding:1.5rem clamp(1.25rem,4vw,3rem);
    /* padding is deliberately NOT transitioned. The .solid state shrinks it, and animating
       a layout property means recalculating this subtree every frame for 350ms, triggered
       by scrolling, which is the worst possible moment. The size change snaps while the
       background fades, and the fade is what the eye actually reads. */
    transition:background .35s ease,backdrop-filter .35s ease;
  }
  .inz-nav.solid{background:${rgba(P.ink, 0.92)};backdrop-filter:blur(14px);padding:.95rem clamp(1.25rem,4vw,3rem)}
  /* The logo is dark purple on white, so on the navy nav it sits in a white pill. That is
     how INZBC uses it on their own site, not an invention. */
  .inz-nav__brand{display:inline-flex;align-items:center;background:#fff;border-radius:6px;
    padding:.4rem .7rem;line-height:0;text-decoration:none;flex:0 0 auto}
  .inz-nav__brand img{width:clamp(120px,14vw,180px);height:auto;display:block}
  .inz-nav__list{display:flex;flex-wrap:wrap;gap:.4rem 2rem;list-style:none;margin:0;padding:0}
  .inz-nav__list a{color:#fff;text-decoration:none;font-size:.82rem;opacity:.82;text-transform:lowercase}
  .inz-nav__list a:hover,.inz-nav__list a:focus-visible{opacity:1}
  .inz-nav__cta{padding:.72em 1.5em;font-size:.8rem}
  @media (max-width:900px){.inz-nav__list{display:none}}

  /* Footer */
  .inz-footer{background:var(--inz-deep);color:var(--inz-on-deep);
    padding:4rem 0 2.2rem;font-size:.88rem;font-weight:300}
  .inz-footer__grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:2.4rem}
  @media (max-width:820px){.inz-footer__grid{grid-template-columns:1fr 1fr}}
  .inz-footer__brand{color:#fff;font-weight:500;margin:0 0 .7rem;font-size:1rem}
  .inz-footer__note{max-width:30ch}
  .inz-footer__head{margin:0 0 1rem;font-size:.7rem;letter-spacing:.18em;
    text-transform:uppercase;color:var(--inz-gold);font-weight:500}
  .inz-footer ul{list-style:none;margin:0;padding:0}
  .inz-footer li{margin-bottom:.55rem}
  .inz-footer a{color:var(--inz-on-deep);text-decoration:none;font-size:.88rem}
  .inz-footer a:hover,.inz-footer a:focus-visible{color:#fff;text-decoration:underline}
  /* .76rem is normal text, so this needs 4.5:1. At the previous rgba(255,255,255,.4) it
     was 3.75:1 and failed. --inz-on-deep-muted is the same idea at an alpha that passes. */
  .inz-footer__legal{border-top:1px solid var(--inz-rule-on-dark);margin-top:3rem;
    padding-top:1.4rem;font-size:.76rem;color:var(--inz-on-deep-muted)}

  @media (prefers-reduced-motion:reduce){
    /* The reveal needs no rule here: .js-motion is never added under reduced motion, so
       the hidden state never applies. These cover what CSS owns on its own. */
    .par{transform:none !important}
    .inz-card,.inz-btn{transition:none}
    .inz-card:has(a):hover,.inz-btn:hover{transform:none}
    html{scroll-behavior:auto}
  }
</style>`;

// Parallax + reveal. Runs inside each page document.
//
// IMPORTANT: this only does anything if the Embed Code element is about 100vh, so the
// content scrolls INSIDE the iframe. If the embed is as tall as its content, nothing in
// it ever scrolls and every scroll-linked effect silently does nothing. See WIX-TASKS.md.
//
// Each .par layer carries data-p (0 = pinned to page, 1 = moves with scroll). Offsets are
// smoothed with a lerp so motion settles instead of snapping. Transforms are translate3d
// or scale only, so they stay on the compositor and never trigger layout.
const PARALLAX_SCRIPT = `
<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.querySelector('.inz-nav');
  var items = [].slice.call(document.querySelectorAll('.par')).map(function(el){
    return {
      el: el,
      p: parseFloat(el.getAttribute('data-p')) || 0,
      scale: parseFloat(el.getAttribute('data-scale')) || 0,
      cur: 0,
      target: 0
    };
  });

  // Where each layer sits within this document. The embed does not scroll, so these are
  // fixed; the parent's scroll is what moves underneath them.
  function anchorOf(el){
    var y = 0, n = el;
    while (n){ y += n.offsetTop || 0; n = n.offsetParent; }
    return y + (el.offsetHeight || 0) / 2;
  }
  items.forEach(function(it){ it.anchor = anchorOf(it.el); });

  // Driven by the parent page's scroll, posted in by page code (wire-pages.js). The
  // iframe cannot read the parent's scroll itself — same sandbox that blocks
  // target="_top". Offset by the layer's own anchor so each one has its own phase; the
  // absolute origin does not matter, only relative movement, so the unknown distance
  // from page top to the embed just shifts phase imperceptibly.
  var scrollY = 0, haveScroll = false;
  addEventListener('message', function(e){
    if (!e.data || typeof e.data.scrollY !== 'number') return;
    scrollY = e.data.scrollY;
    haveScroll = true;
    if (nav) nav.classList.toggle('solid', scrollY > 80);
    for (var i = 0; i < items.length; i++){
      items[i].target = -(scrollY - items[i].anchor) * items[i].p;
    }
    kick();
  });

  var running = false;
  function loop(){
    var moving = false;
    for (var i = 0; i < items.length; i++){
      var it = items[i];
      // Lerp toward the target. This is what makes a polled scroll signal look smooth:
      // the damping fills in the gaps between samples.
      it.cur += (it.target - it.cur) * 0.12;
      if (Math.abs(it.target - it.cur) > 0.4) moving = true;
      var tf = 'translate3d(0,' + it.cur.toFixed(2) + 'px,0)';
      if (it.scale) tf += ' scale(' + it.scale + ')';
      it.el.style.transform = tf;
    }
    if (moving) requestAnimationFrame(loop); else running = false;
  }
  function kick(){ if (!running && !reduce){ running = true; requestAnimationFrame(loop); } }

  // Fallback: if this document ever scrolls on its own — a taller-than-embed iframe, or
  // opened directly rather than embedded — drive from local scroll instead.
  addEventListener('scroll', function(){
    if (haveScroll) return;
    for (var i = 0; i < items.length; i++){
      var r = items[i].el.getBoundingClientRect();
      items[i].target = -(((r.top + r.height / 2) - (innerHeight / 2)) * items[i].p);
    }
    if (nav) nav.classList.toggle('solid', (pageYOffset || 0) > 80);
    kick();
  }, { passive: true });

  // Only card grids reveal, and only their children. Every section animating identically
  // is a tell, not a design; the hero parallax above is the authored moment.
  //
  // .js-motion is added here rather than sitting in the markup, so the hidden state exists
  // only while this script is alive to remove it. Under reduced motion it is never added
  // at all, which is why no separate reduced-motion rule is needed for the reveal.
  // ---- Report our height to the parent -------------------------------------------------
  // The Embed element's height is set by hand in the Editor and was left at 500px, so every
  // page was clipped a few hundred pixels in. This document knows its own height; page code
  // receives this and sets $w('#html1').height, so the embed fits its content on every page
  // without anyone opening the Editor.
  var lastH = 0;
  function reportHeight() {
    var h = Math.ceil(document.documentElement.scrollHeight);
    // Ignore sub-pixel churn, and the reflow the resize itself causes.
    if (!h || Math.abs(h - lastH) < 12) return;
    lastH = h;
    try { parent.postMessage({ inzHeight: h }, '${SITE_ORIGIN}'); } catch (e) {}
  }
  addEventListener('load', reportHeight);
  addEventListener('resize', reportHeight);
  if (document.readyState === 'complete') reportHeight();
  // Web fonts and the hero photograph both change layout after first paint.
  setTimeout(reportHeight, 300);
  setTimeout(reportHeight, 1200);
  if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.body);

  if (!reduce) {
    document.documentElement.classList.add('js-motion');

    var grids = [].slice.call(document.querySelectorAll('.inz-grid, .inz-logos'));
    var seen = false;
    var io = new IntersectionObserver(function(es){
      seen = true;
      es.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    grids.forEach(function(el){ el.classList.add('rv-stagger'); io.observe(el); });

    // Failsafe. IntersectionObserver normally invokes its callback once per target soon
    // after observe(), so this should never fire. If it does, the observer is not working
    // and every grid below the fold would stay at opacity 0 forever. Dropping .js-motion
    // reverts the whole page to visible rather than leaving the statistics invisible.
    setTimeout(function(){
      if (!seen) document.documentElement.classList.remove('js-motion');
    }, 2000);
  }
})();
</script>`;

// ---------------------------------------------------------------------------
// [[placeholder]] handling
// ---------------------------------------------------------------------------
// WIX-TASKS.md: the site must not be shared publicly while [[placeholder]] markers are
// visible. They were styled like body copy, so nothing enforced that. Now they are wrapped
// in <mark> so they cannot be missed, counted in the build summary, and INZ_RELEASE=1
// refuses to build while any remain.

// Everything a placeholder must NOT be rewritten inside: whole tags, so attribute values
// are safe, and the bodies of the two raw-text elements, where markup is not parsed and a
// <mark> would either break the code or appear as literal text.
//
// Written as "match what to skip, transform the gaps" rather than "match text between > and
// <", which silently misses the first and last text node of a fragment.
const SKIP_REGIONS = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<[^>]*>/gi;
const PLACEHOLDER = /\[\[([^\]]+)\]\]/g;
const MARKED = '<mark class="inz-ph">[[$1]]</mark>';

function markPlaceholders(html) {
  let out = '';
  let last = 0;
  for (const skip of html.matchAll(SKIP_REGIONS)) {
    out += html.slice(last, skip.index).replace(PLACEHOLDER, MARKED) + skip[0];
    last = skip.index + skip[0].length;
  }
  return out + html.slice(last).replace(PLACEHOLDER, MARKED);
}

// A placeholder inside a tag or a script/style body cannot be wrapped, so it would ship
// invisibly and the release gate would never see it. Fail loudly rather than skip quietly.
function placeholdersInMarkup(html) {
  return [...html.matchAll(SKIP_REGIONS)]
    .filter((skip) => skip[0].includes('[['))
    .map((skip) => skip[0].slice(0, 100));
}

function countPlaceholders(html) {
  return [...html.matchAll(/<mark class="inz-ph">/g)].length;
}

// ---------------------------------------------------------------------------
// Regression guards
// ---------------------------------------------------------------------------
// The design system used to lose a specificity fight it created itself: BASE_CSS carried
// the current system while the snippets carried the previous one inline, and an inline
// style beats any stylesheet rule. Documentation asking people not to do that is how it
// got there. This fails the build instead.
//
// Switched on in the same commit that migrated the last snippet, so it has never been
// knowingly red. If a future migration needs more than one commit, shrink an explicit
// allowlist rather than disabling this.
const BANNED = [
  [/\sstyle="/, 'inline style attribute (use the class vocabulary in BASE_CSS)'],
  [/Big Shoulders|Merriweather|Impact,/, 'retired typeface (the system is Poppins)'],
  [/#16307f|#c1acfb|#f6f5f8|#f05b29|#160933|#e8e6ee/i, 'retired palette value (use a token)'],
  [/rgba\(255,\s*255,\s*255/, 'raw translucent white (use --inz-on-dark / --inz-on-deep)'],
];

function checkBanned(name, html) {
  const problems = [];
  const lines = html.split('\n');
  for (const [pattern, why] of BANNED) {
    lines.forEach((line, i) => {
      const hit = line.match(pattern);
      if (hit) problems.push(`  ${name}.html:${i + 1}  ${why}\n      ${hit[0].trim()}`);
    });
  }
  if (problems.length) {
    throw new Error(
      `build-sections: ${problems.length} banned pattern(s) in ${name}.html\n` +
      problems.join('\n')
    );
  }
}

function readSnippet(name) {
  const file = path.join(SNIPPETS, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`build-sections: missing snippet ${file}`);
  }
  const raw = fs
    .readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '') // drop the "paste here" instruction comments
    // Art URLs live in ART, not in the snippets: the snippets are hand-edited and a pasted
    // media URL there would be invisible to the guard that keeps them off the old site.
    .replace(/IMG_ICON_EVENTS/g, ART.iconEvents)
    .replace(/IMG_ICON_PUBLICATIONS/g, ART.iconPublications)
    .replace(/IMG_ICON_MEMBERSHIPS/g, ART.iconMemberships)
    .replace(/IMG_ICON_TRADE/g, ART.iconTrade)
    .replace(/IMG_REPORT_COVER/g, ART.reportCover)
    .replace(/IMG_PARTNER_STRIP/g, ART.partnerStrip)
    .replace(/IMG_HERO_BANNER/g, ART.heroBanner)
    .replace(/IMG_KIA_ORA_COVER/g, ART.kiaOraCover)
    .replace(/IMG_NEWSLETTER_MOCKUP/g, ART.newsletterMockup)
    .trim();

  checkBanned(name, raw);

  const unwrappable = placeholdersInMarkup(raw);
  if (unwrappable.length) {
    throw new Error(
      `build-sections: ${name}.html has a [[placeholder]] inside a tag, script or style, ` +
      `where it can be neither marked nor detected:\n    ${unwrappable.join('\n    ')}`
    );
  }

  return markPlaceholders(raw);
}

// The photographic plate and scrims that sit behind a page's opening band. Injected into
// the first <section> of every page so each one opens cinematically without every snippet
// having to repeat the markup. data-p drives the parallax rate: the plate drifts at half
// the scroll distance while the copy above it stays put, which is what reads as depth.
// Three layers at three depths. The colour pools drift most, the horizon grid less, the
// grain not at all — grain that moves reads as a dirty screen rather than as film.
const HERO_LAYERS =
  '<div class="inz-hero__plate par" data-p="0.34" data-scale="1.1"></div>' +
  '<div class="inz-hero__scrim par" data-p="0.14"></div>' +
  '<div class="inz-hero__base"></div>';

// The photograph, when there is one, sits above the synthesised plate and below the scrim
// and grain, so it inherits the same vignette and film treatment rather than looking pasted
// on. aria-hidden because it is decorative: it carries no information the heading does not.
function heroPhoto(key) {
  const m = MEDIA[key];
  if (!m || !m.src) return '';
  // An inline style is correct here and not a guard violation: the guard inspects
  // hand-authored snippets, and this is generated from a validated URL. The alternative,
  // a per-page rule inside a shared stylesheet, would be worse.
  const pos = m.position || 'center';
  return (
    `<div class="inz-hero__photo par" data-p="0.34" data-scale="1.1" aria-hidden="true" ` +
    `style="background-image:url('${m.src}');background-position:${pos}"></div>`
  );
}

/**
 * Adds the hero treatment to a page's first section.
 * @param {string} html the page's concatenated snippet markup
 * @returns {string}
 */
function withHero(html, key) {
  const open = html.indexOf('>', html.indexOf('<section'));
  if (open === -1) return html;
  const tag = html.slice(0, open + 1);
  const tier = HERO_TIER[ARCHETYPE[key]];
  // Mark it a hero so the CSS positions the layers, unless the snippet already says so.
  let marked = tag.includes('inz-hero')
    ? tag
    : tag.replace('class="inz-section', 'class="inz-section inz-hero');
  // The tier is added separately. Adding it only on the branch that injects inz-hero meant
  // home-hero.html, the one snippet that declares inz-hero itself, silently got no tier.
  if (!marked.includes('inz-hero--')) {
    marked = marked.replace('inz-hero', `inz-hero inz-hero--${tier}`);
  }
  if (!marked.includes('inz-hero--')) {
    throw new Error(`build-sections: ${key} has no hero tier; its first section may not be a <section class="inz-section">`);
  }
  return marked + HERO_LAYERS + heroPhoto(key) + html.slice(open + 1);
}

const built = Object.entries(PAGES).map(([key, files]) => {
  if (!ARCHETYPE[key]) throw new Error(`build-sections: page "${key}" has no archetype`);
  const html = withHero(files.map(readSnippet).join('\n'), key);
  return { key, html, placeholders: countPlaceholders(html) };
});

const entries = built.map((p) => `  ${p.key}: ${JSON.stringify(p.html)},`);

const shell = { nav: NAV, footer: FOOTER, navScript: NAV_SCRIPT, parallax: PARALLAX_SCRIPT };

const out = `// GENERATED by scripts/build-sections.js — do not edit by hand.
// Edit the snippets in wix-studio-snippets/ and re-run: node scripts/build-sections.js
//
// Page markup lives in code so it is versioned and deploys on push. Each page renders
// into ONE Embed Code element whose own code box stays empty; page code sets its src.
// See EDITING.md.

const BASE_CSS = ${JSON.stringify(BASE_CSS)};

const NAV_SCRIPT = ${JSON.stringify(shell.navScript)};

const NAV = ${JSON.stringify(shell.nav)};

const FOOTER = ${JSON.stringify(shell.footer)};

const PARALLAX_SCRIPT = ${JSON.stringify(shell.parallax)};

const PAGES = {
${entries.join('\n')}
};

/**
 * Full HTML document for one page.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageHtml(name) {
  const body = PAGES[name];
  if (!body) {
    throw new Error('sections.js: no page named ' + name);
  }
  return '<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' + BASE_CSS + NAV_SCRIPT + '</head><body>' + NAV + body + FOOTER + PARALLAX_SCRIPT + '</body></html>';
}

/**
 * Source value for an Embed Code element showing the given page.
 * @param {string} name key of PAGES
 * @returns {string}
 */
export function pageSrc(name) {
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml(name));
}
`;

fs.writeFileSync(OUT, out, 'utf8');

// site-head.html is the copy a human pastes into Wix Custom Code. It styles the native Wix
// page — header, footer, anything outside the Embed Code element — which the iframe's own
// stylesheet cannot reach. Generated from the same tokens as BASE_CSS so it cannot drift.
const SITE_HEAD = `<!-- GENERATED by scripts/build-sections.js — do not edit by hand. -->
<!-- Paste into Wix Studio: Settings > Custom Code > Add to Head. -->
<!-- Palette: ${PALETTE}. Regenerate after any token change. -->

${FONT_LINKS}

<style>
${TOKENS}

  /* Only the primitives a native Wix element might use. Everything else lives in
     BASE_CSS and travels inside the embed. */
  .inz-container{width:min(90%,var(--inz-max-width));margin-inline:auto}
  .inz-btn{
    display:inline-flex;align-items:center;font-family:'Poppins',system-ui,sans-serif;
    font-weight:500;text-decoration:none;font-size:.88rem;padding:1em 1.9em;
    border-radius:var(--inz-radius);transition:transform .2s ease;
  }
  .inz-btn--primary{background-color:var(--inz-gold);color:var(--inz-navy)}
  .inz-btn--secondary{background-color:transparent;color:var(--inz-navy);box-shadow:inset 0 0 0 1px currentColor}
  .inz-btn:hover{transform:translateY(-2px)}
  .inz-btn:focus-visible{outline:3px solid var(--inz-focus-light);outline-offset:3px}
  .inz-sr-only{
    position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
    clip:rect(0,0,0,0);white-space:nowrap;border:0;
  }

  /* Hides Wix's own unconfigured header and footer. The header reads "Business Name" above
     a placeholder logo and duplicates the navy INZBC nav; the footer reads "© 2035 by
     Business Name". There is exactly one of each in the page document. This stylesheet
     lives in the parent page and cannot reach inside the iframe, so the embed's own header
     and footer are unaffected.

     TEMPORARY. The durable fix is configuring the real Wix header with the INZBC logo and
     menu, which also restores a genuinely sticky site header. An iframe cannot provide one.
     Delete the custom embed to undo this. */
  header,footer{display:none !important}
</style>

<script>
/* Resizes the Embed element to fit its content.
   The embed's height is set by hand in the Editor and was left at 500px, so every page was
   clipped a few hundred pixels in. The document inside reports its own height; this listens
   for that and applies it.

   This runs in the parent page rather than in Velo page code because Wix Studio's responsive
   layout engine owns element size, and $w('#html1').height = n is silently ignored there. It
   sets no error, which is why that route looked like it worked. Setting the height on the
   real elements is the only thing that takes. */
(function(){
  var MIN = 400, MAX = 12000, last = 0;
  addEventListener('message', function(e){
    var h = e.data && e.data.inzHeight;
    if (typeof h !== 'number' || h < MIN) return;
    var f = document.querySelector('iframe[src^="data:text/html"]');
    if (!f) return;
    /* Identify the sender by window, not by origin. A data: URI has an opaque origin, so
       e.origin is the string "null" and an origin equality check rejects every message.
       Comparing against our own iframe's contentWindow is both correct and stricter. */
    if (e.source !== f.contentWindow) return;
    h = Math.min(h, MAX);
    if (Math.abs(h - last) < 12) return;
    last = h;
    /* The iframe, its wrapper, and the Wix component that actually carries the height.
       Walking up by structure rather than naming the hashed class names, which are
       generated per build and would not survive a Wix release. */
    var el = f, n = 0;
    while (el && n < 4) {
      el.style.setProperty('height', h + 'px', 'important');
      if (el.id && el.id.indexOf('comp-') === 0) break;
      el = el.parentElement; n++;
    }
  });
})();
</script>
`;

fs.writeFileSync(path.join(SNIPPETS, 'site-head.html'), SITE_HEAD, 'utf8');

// Standalone previews, so a page can be opened in a browser without Wix in the way, and so
// INZBC can compare both palettes side by side rather than from a table of hex values.
// Gitignored: these are build output, not source.
const PREVIEW_DIR = path.join(ROOT, 'design-preview', '_generated', PALETTE);
fs.mkdirSync(PREVIEW_DIR, { recursive: true });
for (const page of built) {
  const doc =
    '<!doctype html><html lang="en-NZ"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    `<title>INZBC ${page.key} (${PALETTE})</title>` +
    BASE_CSS + NAV_SCRIPT + '</head><body>' +
    NAV + page.html + FOOTER + PARALLAX_SCRIPT + '</body></html>';
  fs.writeFileSync(path.join(PREVIEW_DIR, `${page.key}.html`), doc, 'utf8');
}

// Size budget. BASE_CSS ships inside every document, so a page is its body plus the whole
// stylesheet. Generous on purpose: this catches a runaway asset, it does not police growth.
const BUDGET_KB = 64;
const oversize = built
  .map((p) => ({ key: p.key, kb: (p.html.length + BASE_CSS.length) / 1024 }))
  .filter((p) => p.kb > BUDGET_KB);

console.log(`wrote ${OUT}`);
console.log(`wrote ${path.join(SNIPPETS, 'site-head.html')}`);
console.log(`wrote ${built.length} previews to ${PREVIEW_DIR}`);

const largest = built
  .map((p) => ({ key: p.key, kb: (p.html.length + BASE_CSS.length) / 1024 }))
  .sort((a, b) => b.kb - a.kb)[0];
console.log(
  `largest document: ${largest.key} ${largest.kb.toFixed(1)} KB of ${BUDGET_KB} KB budget`
);

if (oversize.length) {
  console.error(`\nbuild-sections: ${oversize.length} page(s) over the ${BUDGET_KB} KB budget`);
  for (const p of oversize) console.error(`  ${p.key.padEnd(26)} ${p.kb.toFixed(1)} KB`);
  process.exit(1);
}
console.log(`palette: ${PALETTE}`);
console.log(`${built.length} pages: ${built.map((p) => p.key).join(', ')}`);

// Placeholder report. INZBC owes a fact for every one of these; docs/wix-staging-readiness.md
// says nothing is shared publicly while they are visible.
const outstanding = built.filter((p) => p.placeholders > 0);
const totalPlaceholders = outstanding.reduce((n, p) => n + p.placeholders, 0);

if (totalPlaceholders) {
  console.log(`\n${totalPlaceholders} [[placeholder]] marker(s) awaiting INZBC:`);
  for (const p of [...outstanding].sort((a, b) => b.placeholders - a.placeholders)) {
    console.log(`  ${String(p.placeholders).padStart(3)}  ${p.key}`);
  }
}

// The release gate. A warning during development, a hard stop when building to publish.
if (process.env.INZ_RELEASE === '1' && totalPlaceholders) {
  console.error(
    `\nbuild-sections: INZ_RELEASE=1 and ${totalPlaceholders} placeholder(s) remain. ` +
    `Every one is a fact INZBC still owes; none may be published.\n`
  );
  process.exit(1);
}
