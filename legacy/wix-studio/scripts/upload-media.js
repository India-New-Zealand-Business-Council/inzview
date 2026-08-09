// Uploads the images in assets/from-live-site/ to THIS site's Wix Media Manager, and
// prints a MEDIA block ready to paste into build-sections.js.
//
//   node scripts/upload-media.js          # dry run, lists what it would upload
//   node scripts/upload-media.js --go     # actually uploads
//
// Why this exists: repo files are not served as images, and the old site's
// static.wixstatic.com URLs must not be hot-linked (they belong to the site being
// replaced, on a different Wix account). The only durable fix is getting the bytes into
// this site's own Media Manager, and the Wix CLI has no media command.
//
// THE TOKEN IS NEVER PRINTED. It is read from `wix token` into a variable and sent as an
// Authorization header. Do not add a console.log of it, and do not pass it on a command
// line, where it would land in shell history and process listings.
//
// Lives outside src/ like the other scripts: Wix lints every .js under src/ on publish and
// Node globals fail that lint. See EDITING.md.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets/from-live-site');
const GO = process.argv.includes('--go');

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };

// Skipped deliberately. The live site's logo is a 400x114 JPEG with a white matte; the real
// logo is INZBC_Logo_Files.ai and should be exported to SVG instead.
const SKIP = new Set(['logo-live-site-small.jpg']);

// The Wix CLI token (`wix token`) does NOT work here. It is scoped for CLI operations and
// the Media API rejects it with an HTML 403 before the request reaches the API at all.
// Site-level REST calls need an API key from https://manage.wix.com/account/api-keys plus
// a wix-site-id header. The key is a raw value in Authorization, with no "Bearer" prefix.
//
// The key is read from the environment, or from a .env file this script parses itself.
// It is never printed, never passed on a command line, and .env is gitignored.
const SITE_ID = process.env.WIX_SITE_ID || '040b006f-3745-4a4f-ae4d-03aedb08a7b1';

function apiKey() {
  if (process.env.WIX_API_KEY) return process.env.WIX_API_KEY.trim();

  const envFile = path.join(ROOT, '.env');
  if (fs.existsSync(envFile)) {
    const line = fs.readFileSync(envFile, 'utf8')
      .split(/\r?\n/)
      .find((l) => /^\s*WIX_API_KEY\s*=/.test(l));
    if (line) return line.replace(/^\s*WIX_API_KEY\s*=\s*/, '').replace(/^["']|["']$/g, '').trim();
  }

  throw new Error(
    'upload-media: no WIX_API_KEY.\n' +
    '  1. Create a key at https://manage.wix.com/account/api-keys (account owner only).\n' +
    '     Give it Media Manager permissions and access to this site.\n' +
    '  2. Put it in a .env file at the repo root:  WIX_API_KEY=...\n' +
    '     .env is gitignored. Do not paste the key into a terminal or a chat.\n' +
    `  3. Site id defaults to ${SITE_ID}; override with WIX_SITE_ID if that is wrong.`
  );
}

async function api(auth, url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: auth,
      'wix-site-id': SITE_ID,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`upload-media: ${init.method || 'GET'} ${url} -> ${res.status}\n${body.slice(0, 400)}`);
  }
  return body ? JSON.parse(body) : {};
}

async function uploadOne(auth, file) {
  const ext = path.extname(file).toLowerCase();
  const mimeType = MIME[ext];
  const bytes = fs.readFileSync(path.join(ASSETS, file));

  const gen = await api(auth, 'https://www.wixapis.com/site-media/v1/files/generate-upload-url', {
    method: 'POST',
    body: JSON.stringify({ mimeType, fileName: file, sizeInBytes: String(bytes.length) }),
  });

  const uploadUrl = gen.uploadUrl || gen.upload_url;
  if (!uploadUrl) throw new Error(`upload-media: no uploadUrl for ${file}: ${JSON.stringify(gen).slice(0, 200)}`);

  // The upload URL is pre-signed and carries its own auth. Sending the bearer token here
  // too would leak it to a different host for no reason.
  const put = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': mimeType },
    body: bytes,
  });
  const putBody = await put.text();
  if (!put.ok) throw new Error(`upload-media: PUT ${file} -> ${put.status}\n${putBody.slice(0, 400)}`);

  const parsed = putBody ? JSON.parse(putBody) : {};
  const f = parsed.file || parsed;
  let url = f.url;

  if (!url && f.id) {
    const got = await api(auth, `https://www.wixapis.com/site-media/v1/files/get-file-by-id?fileId=${encodeURIComponent(f.id)}`);
    url = (got.file || {}).url;
  }
  return url || null;
}

async function main() {
  const files = fs.readdirSync(ASSETS)
    .filter((f) => MIME[path.extname(f).toLowerCase()])
    .filter((f) => !SKIP.has(f))
    .sort();

  if (!GO) {
    console.log(`${files.length} file(s) would be uploaded from assets/from-live-site/:\n`);
    for (const f of files) {
      const kb = (fs.statSync(path.join(ASSETS, f)).size / 1024).toFixed(0);
      console.log(`  ${f.padEnd(38)} ${kb.padStart(6)} KB`);
    }
    console.log(`\nskipping: ${[...SKIP].join(', ')}`);
    console.log('\nThis writes to the live Wix Media Manager. Re-run with --go to do it.');
    return;
  }

  const auth = apiKey();
  const results = {};
  for (const f of files) {
    try {
      const url = await uploadOne(auth, f);
      results[f] = url;
      console.log(`  ok    ${f.padEnd(38)} ${url || '(uploaded, url pending)'}`);
    } catch (e) {
      results[f] = null;
      console.error(`  FAIL  ${f.padEnd(38)} ${e.message.split('\n')[0]}`);
    }
  }

  const ok = Object.entries(results).filter(([, u]) => u);
  console.log(`\n${ok.length}/${files.length} uploaded.`);
  if (ok.length) {
    console.log('\nPaste the ones you want into MEDIA in scripts/build-sections.js:\n');
    for (const [f, u] of ok) console.log(`  // ${f}\n  '${u}',`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
