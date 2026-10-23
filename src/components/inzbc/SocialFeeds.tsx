import React, { useEffect, useRef, useState } from 'react';
import { LINKS } from './content';

const X_HANDLE = new URL(LINKS.x).pathname.replace(/\//g, '');

/**
 * Facebook is a real, live embed (connect.facebook.net's Page Plugin SDK) — the official
 * public embed method, not the old site's POWr app (a paid third-party Wix app with no
 * equivalent here) and not a hand-built approximation of one.
 *
 * X/Twitter is the same: X's official widgets.js timeline, with a detectable fallback — see
 * TwitterTimeline's own comment.
 *
 * Neither SDK ships types, so the injected `window.FB` / `window.twttr` globals are typed `any` below —
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
    // min-h matches FacebookPage's data-height (760) so the two cards sit level in the
    // sm:grid-cols-2 row instead of this one looking stubby next to a tall live feed.
    <div className="flex min-h-[760px] flex-col items-center justify-center gap-3 p-10 text-center">
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
 * Live timeline via X's own widgets.js, created programmatically with
 * twttr.widgets.createTimeline() rather than the <a class="twitter-timeline"> auto-scan: the
 * promise it returns resolves to undefined when X refuses to render the timeline, which the
 * anchor markup never reports. That, plus a timeout for a script that loads but never
 * finishes, means a failed load falls back to FeedFallback instead of sitting on "Loading…"
 * forever. A "View on X" link stays under the live feed too, since X can still render an
 * empty timeline inside its own cross-origin iframe that this page cannot inspect.
 */
const TWITTER_TIMEOUT_MS = 12000;

function TwitterTimeline() {
  const [state, setState] = useState<LoadState>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setState((current) => (current === 'loading' ? 'error' : current));
    }, TWITTER_TIMEOUT_MS);

    loadScriptOnce(
      'https://platform.twitter.com/widgets.js',
      'twitter-wjs',
      () => {
        const container = containerRef.current;
        const widgets = (window as any).twttr?.widgets;
        if (cancelled || !container || !widgets?.createTimeline) {
          if (!cancelled) setState('error');
          return;
        }
        container.innerHTML = '';
        widgets
          .createTimeline({ sourceType: 'profile', screenName: X_HANDLE }, container, {
            height: 760,
            chrome: 'noheader nofooter',
            dnt: true,
          })
          .then((el: HTMLElement | undefined) => {
            if (!cancelled) setState(el ? 'ready' : 'error');
          })
          .catch(() => {
            if (!cancelled) setState('error');
          });
      },
      () => {
        if (!cancelled) setState('error');
      },
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  if (state === 'error') return <FeedFallback platform="X" href={LINKS.x} />;

  return (
    <div>
      {/* The container stays laid out (not display:none) while loading so the widget can
          measure its width; the status text just sits over it until the timeline arrives. */}
      <div className="relative min-h-[760px]">
        {state === 'loading' ? (
          <p role="status" className="absolute inset-0 flex items-center justify-center text-sm text-foreground/75">
            Loading the latest posts&hellip;
          </p>
        ) : null}
        <div ref={containerRef} />
      </div>
      {state === 'ready' ? (
        <div className="border-t border-black/5 px-6 py-3 text-center">
          <a
            href={LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-navy underline-offset-4 hover:underline"
          >
            View @{X_HANDLE} on X
          </a>
        </div>
      ) : null}
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

  // This has to run after React commits the render that removes the fb-page div's
  // display:none, not inline from the script's onload, or XFBML.parse() measures a hidden
  // element.
  useEffect(() => {
    if (state === 'ready') (window as any).FB?.XFBML?.parse();
  }, [state]);

  if (state === 'error') return <FeedFallback platform="Facebook" href={LINKS.facebook} />;

  return (
    <div className={state === 'loading' ? 'flex min-h-[760px] items-center justify-center' : undefined}>
      {state === 'loading' ? (
        <p role="status" className="text-sm text-foreground/75">
          Loading the latest posts&hellip;
        </p>
      ) : null}
      <div
        className="fb-page"
        data-href={LINKS.facebook}
        data-tabs="timeline"
        data-width="500"
        // Was 500 — fine for the narrower max-w-3xl card this plugin was built for, but once
        // the card widened to match the rest of the page (17 Oct 2026), the wider layout
        // pushed the actual posts below this fixed height, leaving only the cover/header
        // visible. The plugin fills whatever height you give it with posts, it doesn't
        // scroll to fit — so the fix is more height, not less width.
        data-height="760"
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
