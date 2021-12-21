'use strict';

export default function dropDown(){
    document.body.addEventListener('click', event => {
        event.preventDefault();
        toggleEventHandler(event);
    }, false);
}

export function toggleEventHandler(event) {
    const t = event.target;
    toggleHandler(t);
}

export function toggleHandler(t){
    const $toggle = t.closest('.dropdown>.dropdown__toggle');
    if ($toggle) {
        const $dropdown = $toggle.closest('.dropdown');
        const $content = $dropdown.querySelector('.dropdown__content');
        $content && $content.classList.toggle('dn');
    }
}
