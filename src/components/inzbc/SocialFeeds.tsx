import React, { useEffect, useState } from 'react';
import { LINKS } from './content';

/**
 * Real, live Twitter/X and Facebook embeds for the Connect page — the official public embed
 * methods (platform.twitter.com/widgets.js, connect.facebook.net's Page Plugin SDK), not the
 * old site's POWr app (a paid third-party Wix app with no equivalent here) and not a hand-
 * built approximation of one.
 *
 * Neither SDK ships types, so the injected globals (`window.twttr`, `window.FB`) are typed
 * `any` below — there's no @types package for either and declaring a full ambient type for
 * two methods each isn't worth it.
 *
 * Not verified in a browser this session (no browser tool available) — Paras has explicitly
 * accepted that risk and asked for the real embeds anyway. Both scripts load only when this
 * component is mounted (Connect page only, not globally), and both degrade to a visible
 * fallback — a real profile link, not an empty box — if the script fails to load.
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

function TwitterTimeline() {
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;
    loadScriptOnce(
      'https://platform.twitter.com/widgets.js',
      'twitter-wjs',
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

  // Separate effect, not called inline from the script's onload above: onload can fire
  // before React has committed the render that removes the anchor's display:none (setState
  // is async), and widgets.js needs to measure a visible element to replace it. A useEffect
  // keyed on `state` is guaranteed to run after that commit, so the anchor is actually
  // visible by the time this scans for it. Also covers the remount case (widgets.js auto-
  // scans once at its own load time, which may be before this anchor exists at all).
  useEffect(() => {
    if (state === 'ready') (window as any).twttr?.widgets?.load();
  }, [state]);

  if (state === 'error') return <FeedFallback platform="X" href={LINKS.x} />;

  return (
    <div className={state === 'loading' ? 'flex min-h-[500px] items-center justify-center' : undefined}>
      {state === 'loading' ? (
        <p role="status" className="text-sm text-foreground/60">
          Loading the latest posts&hellip;
        </p>
      ) : null}
      <a
        className="twitter-timeline"
        data-height="500"
        href={LINKS.x}
        style={state === 'loading' ? { display: 'none' } : undefined}
      >
        Tweets by inzbc
      </a>
    </div>
  );
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
          <h3 className="font-heading text-lg text-white">Follow us on Twitter</h3>
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
