import React from 'react';
import { LINKS } from './content';

/**
 * None of the three platforms here get a live embed — see each component's own comment for
 * why, but the short version is the same for all three: a widget that can silently render
 * nothing (no error event, so no way to detect the failure and fall back) is worse than an
 * honest static card.
 *
 * Facebook's Page Plugin SDK (connect.facebook.net) used to be the one live embed here,
 * injecting a script tag directly into document.body and relying on a global `window.FB`.
 * Reverted 15 Oct 2026: it had never been verified in an actual browser this session (no
 * browser tool available when it was built), Paras had explicitly accepted that as a known
 * risk at the time, and the Connect page specifically started failing to load after it
 * shipped while every other page kept working — the one page doing third-party script
 * injection into the DOM outside React is the obvious suspect, so it's gone rather than
 * re-attempted unverified a second time.
 */
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
 * This panel used to be X/Twitter: platform.twitter.com/widgets.js loads fine (verified:
 * 200 OK, not a dead URL), but the timeline it renders comes from X's backend API, which X
 * locked down after the 2023 platform changes. For accounts without special API access the
 * widget silently renders nothing — no error event fires, because the script itself
 * succeeded; the empty result is inside a cross-origin iframe X controls, which this page
 * has no way to inspect or detect from the outside. That combination could show "Loading the
 * latest posts…" forever with no way to notice the load had actually failed and fall back.
 *
 * Replaced with LinkedIn on Sunil's instruction (14 Oct 2026) — X "can't show the latest
 * things like Facebook does", put LinkedIn there instead. LinkedIn has the same problem X
 * does, one step earlier: it has no public embed for a company page's post feed at all (only
 * a single-post embed, for one post at a time, and only once you already have that post's own
 * URL) — and its company-posts page itself 302s straight to a login wall for a logged-out
 * fetch (checked 14 Oct 2026), so there's no way to pull real post URLs to embed individually
 * either. Same honest fallback card as the old X panel, for the same reason: a link to the
 * real profile instead of a feed this page cannot actually show.
 */
function LinkedInFeed() {
  return <FeedFallback platform="LinkedIn" href={LINKS.linkedin} />;
}

function FacebookFeed() {
  return <FeedFallback platform="Facebook" href={LINKS.facebook} />;
}

export default function SocialFeeds() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-navy px-6 py-4">
          <h3 className="font-heading text-lg text-white">Follow us on LinkedIn</h3>
        </div>
        <LinkedInFeed />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between bg-navy px-6 py-4">
          <h3 className="font-heading text-lg text-white">Follow us on Facebook</h3>
        </div>
        <FacebookFeed />
      </div>
    </div>
  );
}
