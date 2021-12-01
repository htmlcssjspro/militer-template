'use strict';

export default function scrollSmooth(anchorId) {
    const $anchor = document.querySelector(anchorId);
    $anchor && $anchor.scrollIntoView({
        behavior: 'smooth',
        block:    'start'
    });
}
