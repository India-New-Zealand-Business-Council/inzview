// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { pageSrc } from 'public/sections.js';

$w.onReady(function () {
    // Section markup lives in public/sections.js so it is versioned and deploys on push.
    // The embed's own code box stays empty — this sets its source. See EDITING.md.
    $w('#html1').src = pageSrc('about');
});
