'use strict';

import popupHandler, {closePopup} from 'modules/popup-handler.mjs';

export default function newFetch(url, init = {}) {

    // const init = args.init ? args.init : {};
    init.method ??= 'POST';
    // const cb = args.cb ? args.cb : () => {};

    return fetch(url, init)
        .then(response => {
            const ContentType = response.headers.get('Content-Type');
            switch (ContentType) {
                case 'text/plain':
                case 'text/plain;charset=UTF-8':
                case 'text/plain; charset=UTF-8':
                case 'text/html':
                case 'text/html;charset=UTF-8':
                case 'text/html; charset=UTF-8':
                    return response.text();
                case 'application/json':
                    return response.json();

                default:
                    return response.text();
            }
        })
        .then(response => {
            message(response);
            content(response);
            response.location && window.location.assign(response.location);
            response.reload && window.location.reload(true);
            return response;
        })
        .catch(error => console.error(error));
}

function message(response) {
    if (response.message) {
        // let $response = document.querySelector('section.response');
        let $response = document.getElementById('response');

        if (!$response) {
            $response = document.createElement('section');
            $response.id = 'response';
            $response.classList.add('response', 'dn');

            const $responseWrapper = document.createElement('div');
            $responseWrapper.classList.add('response__wrapper');

            const $responsePar = document.createElement('p');

            $responseWrapper.append($responsePar);
            $response.append($responseWrapper);
            document.body.append($response);

            // $response = document.querySelector('section.response');
            // $response = document.getElementById('response');
        }

        const $responseP = $response.querySelector('p');
        $responseP.innerHTML = response.message;
        popupHandler($response);
    }
}

function content(response) {
    if(response.content) {
        document.getElementById('main').innerHTML = response.content;
        document.querySelector('title').textContent = response.title;
        document.querySelector('meta[name=description]').content = response.description;
    }
}

export function fetchForm($form) {
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
