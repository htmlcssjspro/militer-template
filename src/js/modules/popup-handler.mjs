'use strict';

import newFetch from 'modules/fetch.mjs';

export default function popupHandler(popup) {
    const handlerWrappper = $popup => {
        const handler = event => {
            if (event.currentTarget === event.target) {
                $popup.classList.add('dn');
                $popup.removeEventListener('click', handler, false);
            }
        };
        $popup.addEventListener('click', handler, false);
        $popup.classList.remove('dn');
    };

    const fetchPopup = popup => {
        const apiPath = window.location.pathname.startsWith('/admin') ? '/admin/api' : '/api';
        newFetch(`${apiPath}/popup/${popup}`)
            .then(response => {
                response.popup && document.body.insertAdjacentHTML('beforeend', response.popup);
                const $popup = document.querySelector(`section.popup.${popup}`);
                handlerWrappper($popup);
            });
    };

    const $popup = typeof popup === 'string' ? document.querySelector(`section.popup.${popup}`) : popup;
    $popup ? handlerWrappper($popup) : fetchPopup(popup);
}

export function closePopup($popup) {
    $popup && $popup.classList.add('dn');
}
