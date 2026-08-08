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

function token() {
  // execFileSync, not exec: no shell, so nothing can be injected and the value never
  // touches a command line.
  const out = execFileSync('npx', ['--yes', 'wix', 'token'], {
    cwd: ROOT,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  // The CLI wraps the token in a box-drawing banner. Matching the token's actual shape
  // (three base64url segments) rather than "the longest run of non-whitespace", which
  // picked up a line of ╭──── and produced a header full of characters above U+00FF.
  const m = out.match(/[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_.-]{20,}/);
  if (!m) {
    throw new Error('upload-media: no token found in `wix token` output. Run `npx wix login` first.');
  }
  const t = m[0];
  // A header value must be Latin-1. Fail here with a clear message rather than 22 times
  // inside fetch with an opaque ByteString error.
  const bad = [...t].findIndex((c) => c.codePointAt(0) > 255);
  if (bad !== -1) throw new Error(`upload-media: token has a non-Latin-1 character at ${bad}`);
  return t;
}

async function api(auth, url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: auth, 'Content-Type': 'application/json', ...(init.headers || {}) },
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

  const auth = token();
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
