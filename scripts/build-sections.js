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

// Page key -> ordered snippet files. Keys are what page code passes to pageSrc().
const PAGES = {
  home: ['home-hero', 'fta-feature-band', 'trade-stats', 'credibility-strip', 'join-cta'],
  about: ['about-hero', 'credibility-strip', 'join-cta'],
  membership: ['membership'],
  membershipJoin: ['membership-join'],
  memberDirectory: ['member-directory'],
  events: ['events'],
  eventsPast: ['events-past'],
  tradeMissions: ['trade-missions'],
  indiaMarketOpportunities: ['india-market-opportunities'],
  publications: ['insights-publications'],
  newsletters: ['insights-newsletters'],
  news: ['news'],
  partners: ['partners'],
  connect: ['connect'],
  executiveCouncil: ['executive-council'],
  ourPatron: ['our-patron'],
  fta: ['fta-centre'],
  ftaExplainer: ['fta-explainer'],
  tradeResources: ['trade-resources'],
  digest: ['digest'],
};

// Navigation, rendered inside every page's document.
//
// The Wix header menu is site structure and cannot be set from git. This nav can, because
// each page is a self-contained document. target="_top" is required: without it a link
// would open inside the iframe rather than navigating the browser.
//
// Slugs must match what is set in Wix Page Settings. Where they do not, the link 404s.
// See ARCHITECTURE.md.
const NAV = `
<header class="inz-nav">
  <a class="inz-nav__brand" href="/" onclick="inzNav(event, '/')">INZBC</a>
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

// The stylesheet each document carries. A data: URI has an opaque origin and inherits
// nothing from the parent page, so everything the snippets rely on travels with them.
//
// Palette: taken from the live inzbc.org, measured 6 August 2026 (docs/live-site-extract.md).
// Contrast measured, not assumed:
//   indigo #1B1464 on white ....... 15.78:1  AA
//   white on indigo ............... 15.78:1  AA
//   indigo on gold #F8C70C ......... 9.89:1  AA  <- primary CTA
//   white on blue #097BB8 .......... 4.63:1  AA  <- secondary CTA
//   #414141 body text on white .... 10.21:1  AA
//   orange #D0611D .......... 4.07 / 3.88:1  FAILS as body text either way.
// Orange is therefore decorative only: rules, eyebrows, large display text. Never a
// button fill with text on it, and never body copy.

// The stylesheet every page carries. A data: URI has an opaque origin and inherits
// nothing from the parent page, so the whole design system travels inside each document.
//
// Cinematic direction adopted 6 August 2026 (design-preview/home-cinematic.html), in the
// language of wearebrand.io: full-bleed photography, large lowercase geometric sans, tight
// leading, minimal chrome, depth from layered movement rather than decoration.
//
// TYPEFACE: Poppins. This deviates from Big Shoulders in docs/design-decisions.md — that
// face is condensed and uppercase-only, and this look does not survive in it. Recorded as
// a deviation pending INZBC sign-off, not a silent change.
//
// Palette from the live inzbc.org (docs/live-site-extract.md). Contrast measured:
//   indigo #1b1464 on white ........ 15.78:1  AA
//   white on indigo ................ 15.78:1  AA
//   indigo on gold #f8c70c .......... 9.89:1  AA  <- primary CTA
//   white on blue #097bb8 ........... 4.63:1  AA
//   #414141 body on white .......... 10.21:1  AA
//   orange #d0611d ........... 4.07 / 3.88:1  FAILS as text either way.
// Orange stays decorative — rules and large display only. Never a button fill.
const BASE_CSS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --inz-navy:#1b1464; --inz-ink:#12103a; --inz-deep:#0c0a2c; --inz-blue:#097bb8;
    --inz-gold:#f8c70c; --inz-orange:#d0611d; --inz-body:#414141;
    --inz-white:#fff; --inz-mist:#f2f3f7; --inz-line:#e4e6ee; --inz-muted:#6b7086;
    --inz-max-width:1240px; --inz-radius:100px;
    /* Retained so older inline styles in the snippets still resolve. */
    --inz-purple:#1b1464; --inz-tangerine:#f8c70c; --inz-lavender:#9fb6e8;
    --inz-forest:#097bb8; --inz-crimson:#d0611d; --inz-lime:#f8c70c; --inz-light:#f2f3f7;
  }
  *{box-sizing:border-box}
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
  .inz-btn:focus-visible{outline:3px solid var(--inz-gold);outline-offset:3px}
  .inz-btn--primary{background-color:var(--inz-gold);color:var(--inz-navy) !important}
  .inz-btn--secondary{background-color:transparent;color:var(--inz-navy);box-shadow:inset 0 0 0 1px currentColor}
  .inz-btn:hover{transform:translateY(-2px)}

  /* ---- Hero: photographic depth generated in CSS, no photograph ----
     What makes an image read as "photographic" rather than "a gradient" is four things,
     and all four can be synthesised: overlapping soft colour pools at different depths,
     film grain, a vignette, and something with a real edge (here, a horizon and a
     perspective grid). Together they give a rendered scene rather than a flat wash — and
     nothing has to be licensed, uploaded, or kept in step with a Media Manager. */
  .inz-section.inz-hero,.inz-hero{
    position:relative;overflow:hidden;
    /* !important because every hero snippet carries its own inline background gradient,
       and an inline style would otherwise paint straight over all of this. */
    background:var(--inz-ink) !important;
    min-height:min(88vh,760px);display:flex;align-items:center;
  }
  /* Colour pools. Three offset radial gradients at different scales — the same trick a
     mesh-gradient tool uses, done by hand so it costs nothing. */
  .inz-hero__plate{
    position:absolute;inset:-25% -10%;z-index:0;
    background:
      radial-gradient(60% 55% at 18% 22%, rgba(9,123,184,.55) 0%, transparent 62%),
      radial-gradient(46% 48% at 82% 30%, rgba(97,20,95,.5) 0%, transparent 66%),
      radial-gradient(70% 60% at 55% 92%, rgba(248,199,12,.16) 0%, transparent 60%),
      radial-gradient(90% 80% at 50% 50%, rgba(27,20,100,.9) 0%, rgba(12,10,44,1) 78%);
    filter:blur(4px);
  }
  /* Horizon + perspective grid. The straight edge is what stops it reading as a blur:
     an eye takes a hard horizontal as depth cue and fills in a landscape behind it. */
  .inz-hero__scrim{
    position:absolute;inset:0;z-index:1;pointer-events:none;
    background:
      linear-gradient(180deg,transparent 0%,transparent 61.5%,rgba(159,182,232,.5) 61.7%,transparent 62%),
      repeating-linear-gradient(90deg,rgba(159,182,232,.09) 0 1px,transparent 1px 92px),
      linear-gradient(180deg,rgba(12,10,44,.15) 0%,transparent 30%,transparent 55%,rgba(12,10,44,.72) 100%);
    -webkit-mask-image:linear-gradient(180deg,transparent 8%,#000 45%,#000 78%,transparent 100%);
    mask-image:linear-gradient(180deg,transparent 8%,#000 45%,#000 78%,transparent 100%);
  }
  /* Grain + vignette. feTurbulence is the same fractal noise a film-grain filter uses;
     at low opacity it removes the plasticky banding that gives CSS gradients away. */
  .inz-hero__base{
    position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.5;
    background-image:
      radial-gradient(120% 95% at 50% 45%, transparent 42%, rgba(6,5,26,.78) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    background-size:cover,220px 220px;
    mix-blend-mode:normal;
  }
  .inz-hero > .inz-container{position:relative;z-index:4}
  .inz-hero h1,.inz-hero h2,.inz-hero h3{color:#fff}
  .inz-hero p{color:rgba(255,255,255,.82)}
  .inz-hero .inz-btn--secondary{color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}

  /* Body sections get the same grain, far weaker, so light and dark bands feel like one
     surface rather than two different documents. */
  .inz-section:not(.inz-hero){position:relative}
  .inz-section:not(.inz-hero)::after{
    content:"";position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.035;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E");
  }
  .inz-section > *{position:relative;z-index:1}

  /* Eyebrow rule — the gold tick that opens each band. */
  .inz-kick{
    display:flex;align-items:center;gap:.85rem;color:var(--inz-gold);font-size:.72rem;
    letter-spacing:.22em;text-transform:uppercase;font-weight:500;margin:0 0 1.6rem;
  }
  .inz-kick::before{content:"";width:44px;height:1px;background:var(--inz-gold);flex:0 0 auto}

  /* Scroll reveal */
  .rv{opacity:0;transform:translateY(32px);
    transition:opacity .85s cubic-bezier(.2,.7,.25,1),transform .85s cubic-bezier(.2,.7,.25,1)}
  .rv.in{opacity:1;transform:none}

  /* Navigation */
  .inz-nav{
    position:fixed;inset:0 0 auto 0;z-index:60;display:flex;align-items:center;
    justify-content:space-between;gap:1.5rem;padding:1.5rem clamp(1.25rem,4vw,3rem);
    transition:padding .35s ease,background .35s ease,backdrop-filter .35s ease;
  }
  .inz-nav.solid{background:rgba(18,16,58,.92);backdrop-filter:blur(14px);padding:.95rem clamp(1.25rem,4vw,3rem)}
  .inz-nav__brand{font-weight:700;font-size:1.1rem;color:#fff;text-decoration:none;letter-spacing:.01em}
  .inz-nav__list{display:flex;flex-wrap:wrap;gap:.4rem 2rem;list-style:none;margin:0;padding:0}
  .inz-nav__list a{color:#fff;text-decoration:none;font-size:.82rem;opacity:.82;text-transform:lowercase}
  .inz-nav__list a:hover,.inz-nav__list a:focus-visible{opacity:1}
  .inz-nav__cta{padding:.72em 1.5em;font-size:.8rem}
  @media (max-width:900px){.inz-nav__list{display:none}}

  /* Footer */
  .inz-footer{background:var(--inz-deep);color:rgba(255,255,255,.66);
    padding:4rem 0 2.2rem;font-size:.88rem;font-weight:300}
  .inz-footer__grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:2.4rem}
  @media (max-width:820px){.inz-footer__grid{grid-template-columns:1fr 1fr}}
  .inz-footer__brand{color:#fff;font-weight:500;margin:0 0 .7rem;font-size:1rem}
  .inz-footer__note{max-width:30ch}
  .inz-footer__head{margin:0 0 1rem;font-size:.7rem;letter-spacing:.18em;
    text-transform:uppercase;color:var(--inz-gold);font-weight:500}
  .inz-footer ul{list-style:none;margin:0;padding:0}
  .inz-footer li{margin-bottom:.55rem}
  .inz-footer a{color:rgba(255,255,255,.72);text-decoration:none;font-size:.88rem}
  .inz-footer a:hover,.inz-footer a:focus-visible{color:#fff;text-decoration:underline}
  .inz-footer__legal{border-top:1px solid rgba(255,255,255,.1);margin-top:3rem;
    padding-top:1.4rem;font-size:.76rem;color:rgba(255,255,255,.4)}

  @media (prefers-reduced-motion:reduce){
    .rv{opacity:1;transform:none;transition:none}
    .par{transform:none !important}
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

  var sections = [].slice.call(document.querySelectorAll('.inz-section'));
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  sections.forEach(function(el){ el.classList.add('rv'); io.observe(el); });

  // Safety net. .rv starts at opacity 0, so anything the observer misses would stay
  // invisible — a far worse failure than a missing animation. Reveal everything after a
  // beat regardless.
  setTimeout(function(){ sections.forEach(function(el){ el.classList.add('in'); }); }, 1500);
})();
</script>`;

function readSnippet(name) {
  const file = path.join(SNIPPETS, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`build-sections: missing snippet ${file}`);
  }
  return fs
    .readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '') // drop the "paste here" instruction comments
    .trim();
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

/**
 * Adds the hero treatment to a page's first section.
 * @param {string} html the page's concatenated snippet markup
 * @returns {string}
 */
function withHero(html) {
  const open = html.indexOf('>', html.indexOf('<section'));
  if (open === -1) return html;
  const tag = html.slice(0, open + 1);
  // Mark it a hero so the CSS positions the layers, unless the snippet already says so.
  const marked = tag.includes('inz-hero')
    ? tag
    : tag.replace('class="inz-section', 'class="inz-section inz-hero');
  return marked + HERO_LAYERS + html.slice(open + 1);
}

const entries = Object.entries(PAGES).map(([key, files]) => {
  const html = withHero(files.map(readSnippet).join('\n'));
  return `  ${key}: ${JSON.stringify(html)},`;
});

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
const sizes = Object.keys(PAGES).map((k) => k);
console.log(`wrote ${OUT}`);
console.log(`${sizes.length} pages: ${sizes.join(', ')}`);
