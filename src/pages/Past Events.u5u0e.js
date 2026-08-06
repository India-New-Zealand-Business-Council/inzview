// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { pageSrc } from 'public/sections.js';
import wixLocation from 'wix-location';

$w.onReady(function () {
    // Section markup lives in public/sections.js so it is versioned and deploys on push.
    // The embed's own code box stays empty — this sets its source. See EDITING.md.
    $w('#html1').src = pageSrc('eventsPast');

    // The embed is a sandboxed iframe with no direct page access, so its nav links call
    // inzNav(), which posts { path } to the parent instead of using target="_top" (which
    // Wix's sandbox silently swallows). This is the receiving half: wix-location actually
    // moves the top-level page. See EDITING.md and build-sections.js's NAV_SCRIPT.
    $w('#html1').onMessage((event) => {
        wixLocation.to(event.data.path);
    });
});
