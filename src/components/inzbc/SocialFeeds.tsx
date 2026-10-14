import React, { useEffect, useState } from 'react';
import { LINKS } from './content';

/**
 * Facebook is a real, live embed (connect.facebook.net's Page Plugin SDK) — the official
 * public embed method, not the old site's POWr app (a paid third-party Wix app with no
 * equivalent here) and not a hand-built approximation of one.
 *
 * X/Twitter is not: see TwitterTimeline's own comment for why the live widget was replaced
 * with its fallback card as the permanent state, not a last resort.
 *
 * The Facebook SDK ships no types, so the injected `window.FB` global is typed `any` below —
 * there's no @types package for it and declaring a full ambient type for two methods isn't
 * worth it.
 *
 * Not verified in a browser this session (no browser tool available) — Paras has explicitly
 * accepted that risk and asked for the real embed anyway. The script loads only when this
 * component is mounted (Connect page only, not globally), and degrades to a visible fallback
 * — a real profile link, not an empty box — if the script fails to load.
 */

type LoadState = 'loading' | 'ready' | 'error';

/**
 * Loads `src` once per page, however many times components using it mount/unmount (React
 * Router remounts this on every visit to /connect). A script tag already present means an
 * earlier mount already added it; `onReady` still needs to fire so the caller can re-run its
 * SDK's re-scan for whatever fresh DOM this mount just rendered.
 */
function loadScriptOnce(src: string, id: string, onReady: () => void, onError: () => void) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    if (existing.dataset.loaded === 'true') onReady();
    else existing.addEventListener('load', onReady, { once: true });
    if (existing.dataset.failed === 'true') onError();
    return;
  }
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  script.onload = () => {
    script.dataset.loaded = 'true';
    onReady();
  };
  script.onerror = () => {
    script.dataset.failed = 'true';
    onError();
  };
  document.body.appendChild(script);
}

function FeedFallback({ platform, href }: { platform: string; href: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <p className="text-sm text-foreground/70">
        {platform}&rsquo;s feed didn&rsquo;t load here.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
      >
        View on {platform}
      </a>
    </div>
  );
}

/**
 * Not a live embed, on purpose — this used to attempt platform.twitter.com/widgets.js the
 * same way FacebookPage still does. That script itself loads fine (verified: 200 OK, not a
 * dead URL, and renaming anything to "x.com" doesn't change this), but the timeline it
 * renders comes from X's backend API, which X locked down after the 2023 platform changes.
 * For accounts without special API access the widget silently renders nothing — no error
 * event fires, because the script itself succeeded; the empty result is inside a
 * cross-origin iframe X controls, which this page has no way to inspect or detect from the
 * outside. That combination means the old code could show "Loading the latest posts…"
 * forever with no way to notice the load had actually failed and fall back — worse than
 * just being honest about it. This is the same real, working fallback card FeedFallback
 * already provides for Facebook's actual failure case, used here as the primary state
 * instead of a last resort, because for X it currently always is one.
 */
function TwitterTimeline() {
  return <FeedFallback platform="X" href={LINKS.x} />;
}

function FacebookPage() {
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;
    loadScriptOnce(
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0',
      'facebook-jssdk',
      () => {
        if (!cancelled) setState('ready');
      },
      () => {
        if (!cancelled) setState('error');
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  // Same reasoning as TwitterTimeline's separate effect above: this has to run after React
  // commits the render that removes the fb-page div's display:none, not inline from the
  // script's onload, or XFBML.parse() measures a hidden element.
  useEffect(() => {
    if (state === 'ready') (window as any).FB?.XFBML?.parse();
  }, [state]);

  if (state === 'error') return <FeedFallback platform="Facebook" href={LINKS.facebook} />;

  return (
    <div className={state === 'loading' ? 'flex min-h-[500px] items-center justify-center' : undefined}>
      {state === 'loading' ? (
        <p role="status" className="text-sm text-foreground/60">
          Loading the latest posts&hellip;
        </p>
      ) : null}
      <div
        className="fb-page"
        data-href={LINKS.facebook}
        data-tabs="timeline"
        data-width="500"
        data-height="500"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        style={state === 'loading' ? { display: 'none' } : undefined}
      >
        {/* Meta's own documented fallback markup — shown until the SDK replaces it, or
            permanently if XFBML.parse() never runs (state === 'error' skips this branch
            entirely, but this covers the gap between "script tag exists" and "SDK ready"
            for a second mount). */}
        <blockquote cite={LINKS.facebook} className="fb-xfbml-parse-ignore">
          <a href={LINKS.facebook}>India New Zealand Business Council</a>
        </blockquote>
      </div>
    </div>
  );
}

export default function SocialFeeds() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-navy px-6 py-4">
          <h3 className="font-heading text-lg text-white">Follow us on X</h3>
        </div>
        <TwitterTimeline />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-navy px-6 py-4">
          <h3 className="font-heading text-lg text-white">Follow us on Facebook</h3>
        </div>
        <FacebookPage />
      </div>
    </div>
  );
}
