'use strict';

import newFetch from 'modules/fetch.mjs';
import {scrollSmooth} from 'modules/scroll.mjs';

export default function anchor() {
    document.body.addEventListener('click', event => {
        event.preventDefault();
        anchorEventHandler(event);
    }, false);
}

export function anchorEventHandler(event) {
    const t = event.target;
    anchorHandler(t);
}

export function anchorHandler(t) {
    const $a = t.closest('a');
    if ($a) {

        if ($a.matches('a[href^="/"]:not([target=_blank])')) {
            const href = $a.href;
            // const href = a.getAttribute('href');
            activeLink($a);
            history.pushState(href, '', href);
            newFetch(href);
        }

        if ($a.matches('a[href^="#"]')) {
            activeLink($a);
            scrollSmooth($a.hash);
        }

        $a.matches('a[href^=tel]') && (window.location = $a.href);
        $a.matches('a[href^=mailto]') && (window.location = $a.href);
        $a.matches('a[target=_blank]') && window.open($a.href);


        // const $a = t.closest('a[href^="/"]:not([target=_blank])');
        // const $anchor = t.closest('a[href^="#"]');
        // $anchor && scrollSmooth($anchor.hash);

        // const $tel = t.closest('a[href^=tel]');
        // $tel && (window.location = $tel.href);

        // const $email = t.closest('a[href^=mailto]');
        // $email && (window.location = $email.href);

        // const $newTabLink = t.closest('a[target=_blank]');
        // $newTabLink && window.open($newTabLink.href);
    }
}

function activeLink($a) {
    const $active = $a.parentElement.querySelector('.active');
    $active && $active.classList.remove('active');
    $a.classList.add('active');
}
