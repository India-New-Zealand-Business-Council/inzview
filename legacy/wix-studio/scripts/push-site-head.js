// Pushes the generated site-head.html into the site's page <head> via the Custom Embeds
// API, so the brand fonts and tokens reach the native Wix page around the iframe.
//
//   node scripts/push-site-head.js          # dry run, prints what it would send
//   node scripts/push-site-head.js --go     # creates or updates the embed
//
// WIX-TASKS.md lists this as a manual paste into Settings > Custom Code. It is not manual:
// the Custom Embeds API owns the same slot. The content is the generated file, so this and
// BASE_CSS cannot drift apart.
//
// Auth is the same API key as upload-media.js. Never printed, never on a command line.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HEAD_FILE = path.join(ROOT, 'src/public/wix-studio-snippets/site-head.html');
const SITE_ID = process.env.WIX_SITE_ID || '040b006f-3745-4a4f-ae4d-03aedb08a7b1';
const EMBED_NAME = 'INZBC brand tokens';
const GO = process.argv.includes('--go');

function apiKey() {
  // A path is preferred over the value: a key passed as an environment variable on a
  // command line lands in shell history and is visible in process listings.
  if (process.env.WIX_API_KEY_FILE) {
    return fs.readFileSync(process.env.WIX_API_KEY_FILE, 'utf8').trim();
  }
  if (process.env.WIX_API_KEY) return process.env.WIX_API_KEY.trim();
  const envFile = path.join(ROOT, '.env');
  if (fs.existsSync(envFile)) {
    const line = fs.readFileSync(envFile, 'utf8').split(/\r?\n/)
      .find((l) => /^\s*WIX_API_KEY\s*=/.test(l));
    if (line) return line.replace(/^\s*WIX_API_KEY\s*=\s*/, '').replace(/^["']|["']$/g, '').trim();
  }
  throw new Error('push-site-head: no WIX_API_KEY. See scripts/upload-media.js for setup.');
}

async function api(auth, url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: auth, 'wix-site-id': SITE_ID, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`push-site-head: ${method} ${url} -> ${res.status}\n${txt.slice(0, 400)}`);
  return txt ? JSON.parse(txt) : {};
}

async function main() {
  const html = fs.readFileSync(HEAD_FILE, 'utf8');

  if (!GO) {
    console.log(`Would push ${html.length} bytes from site-head.html into the page HEAD.\n`);
    console.log(html.split('\n').slice(0, 12).join('\n'));
    console.log('  ...\n\nRe-run with --go to apply. This changes the live site.');
    return;
  }

  const auth = apiKey();
  const existing = await api(auth, 'https://www.wixapis.com/embeds/v1/custom-embeds', 'GET');
  const mine = (existing.customEmbeds || []).find((e) => e.name === EMBED_NAME);

  // ESSENTIAL, not FUNCTIONAL: this is the site's typography and colour, so it has to load
  // before consent is resolved or the page renders unstyled for some visitors.
  const embedData = { category: 'ESSENTIAL', html };

  if (mine) {
    const r = await api(auth, `https://www.wixapis.com/embeds/v1/custom-embeds/${mine.id}`, 'PATCH', {
      customEmbed: { id: mine.id, revision: mine.revision, name: EMBED_NAME, enabled: true, position: 'HEAD', embedData },
    });
    console.log(`updated embed ${r.customEmbed.id} (revision ${r.customEmbed.revision})`);
  } else {
    const r = await api(auth, 'https://www.wixapis.com/embeds/v1/custom-embeds', 'POST', {
      customEmbed: { name: EMBED_NAME, enabled: true, loadOnce: true, position: 'HEAD', embedData },
    });
    console.log(`created embed ${r.customEmbed.id}`);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
