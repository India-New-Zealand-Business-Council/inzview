// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { pageSrc } from 'public/sections.js';
import wixLocation from 'wix-location';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    // Section markup lives in public/sections.js so it is versioned and deploys on push.
    // The embed's own code box stays empty — this sets its source. See EDITING.md.
    $w('#html1').src = pageSrc('membership');

    // The Home page still carries an empty Custom Element from the abandoned React route;
    // its type file lists #customElement1. Custom elements do not render on this plan, so
    // it painted a 140px placeholder and collapsed to nothing about eleven seconds in,
    // shoving the page up. Measured before the fix: one layout shift, CLS 0.0447, the
    // browser naming that element going from 270,140 to 0,0.
    //
    // collapse() takes it out of layout flow through the supported API rather than by
    // styling around it. Guarded, because 19 of the 20 pages have no such element.
    // Deleting it in the Editor is still the real fix; this stops it costing anything.
    try {
        const stray = $w('#customElement1');
        if (stray && typeof stray.collapse === 'function') {
            stray.collapse();
        }
    } catch (err) {
        // No custom element on this page. Expected, and not worth logging.
    }

    // The embed is a sandboxed iframe with no direct page access, so its nav links call
    // inzNav(), which posts { path } to the parent instead of using target="_top" (which
    // Wix's sandbox silently swallows). This is the receiving half: wix-location actually
    // moves the top-level page. See EDITING.md and build-sections.js's NAV_SCRIPT.
    $w('#html1').onMessage((event) => {
        if (!event.data) {
            return;
        }
        if (event.data.path) {
            wixLocation.to(event.data.path);
        }
        // The embed's height is set by hand in the Editor and was left at 500px, which
        // clipped every page. The document inside reports its own height (see
        // build-sections.js's reportHeight) and this resizes the element to match, so the
        // page fits its content without anyone opening the Editor. Clamped because a bad
        // measurement should not produce a 100,000px page.
        if (typeof event.data.inzHeight === 'number') {
            const h = Math.min(Math.max(event.data.inzHeight, 400), 12000);
            if (Math.abs(($w('#html1').height || 0) - h) > 12) {
                $w('#html1').height = h;
            }
        }
    });

    // Scroll bridge — the other direction. The iframe cannot see the parent's scroll, so
    // no scroll-linked effect inside it can fire on its own. Page code polls the real
    // scroll position and posts it in; build-sections.js's PARALLAX_SCRIPT drives the
    // layers from it and smooths the gaps with a lerp.
    //
    // Polled rather than event-driven because getBoundingRect() is the only scroll
    // position Velo exposes and it is async. inFlight stops calls stacking up if one
    // resolves slower than the interval.
    let inFlight = false;
    setInterval(() => {
        if (inFlight) return;
        inFlight = true;
        wixWindowFrontend.getBoundingRect()
            .then((rect) => {
                inFlight = false;
                // Null under SSR — there is no scroll position to report on the server.
                if (!rect) return;
                $w('#html1').postMessage({
                    scrollY: rect.scroll.y,
                    viewportHeight: rect.window.height
                });
            })
            .catch(() => { inFlight = false; });
    }, 50);
});
