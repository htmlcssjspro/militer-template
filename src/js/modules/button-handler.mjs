'use strict';

import popupHandler from 'modules/popup-handler.mjs';
import newFetch from 'modules/fetch.mjs';

export default function button(data = {}) {
    document.body.addEventListener('click', event => {
        event.preventDefault();
        buttonEventHandler(event, data);
    }, false);
}
export function buttonEventHandler(event, data = {}) {
    const t = event.target;
    buttonHandler(t, data);
}
export function buttonHandler(t, data = {}) {
    const $button = t.closest('button[type=button]');
    if ($button) {
        const popup = $button.dataset.popup;
        popup && popupHandler(popup);
        const dhref = $button.dataset.href;
        dhref && newFetch(dhref);
        const cb = data[$button.dataset.cb];
        cb && setTimeout(() => cb(t), 100);
    }
}
