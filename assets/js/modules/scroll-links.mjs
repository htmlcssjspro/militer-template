'use strict';

import scrollSmooth from './scroll-smooth.mjs';

export default function scrollLinks(link) {
    document.querySelectorAll(link).forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            const anchorId = event.currentTarget.getAttribute('href');
            scrollSmooth(anchorId);
        });
    });
}
