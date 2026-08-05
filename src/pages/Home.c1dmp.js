// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import { homeHero } from 'public/sections.js';

$w.onReady(function () {
    // Section markup is set from code so it stays in git. Pasting it into the embed
    // instead would store it in Wix site data, where a push cannot reach it.
    $w('#html1').src = `data:text/html;charset=utf-8,${encodeURIComponent(homeHero)}`;
});
