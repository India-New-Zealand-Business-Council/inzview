// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { pageSrc } from 'public/sections.js';

$w.onReady(function () {
    // All five home sections render into the one embed. Its own code box stays empty —
    // markup lives in public/sections.js so it is versioned and deploys on push.
    $w('#html1').src = pageSrc('home');
});
