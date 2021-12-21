'use strict';

import newFetch from 'modules/fetch.mjs';
import {closePopup} from 'modules/popup-handler.mjs';

export default function fetchForm($form) {
    newFetch($form.action, {
        method: $form.method,
        body:   new FormData($form)
    })
        .then(response => {
            if (response.success) {
                const $popup = $form.closest('.popup');
                closePopup($popup);
            }
        });
}
