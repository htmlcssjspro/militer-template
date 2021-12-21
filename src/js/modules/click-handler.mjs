'use strict';

import {anchorHandler} from 'modules/anchor-handler.mjs';
import {buttonHandler} from 'modules/button-handler.mjs';
import {toggleHandler} from 'components/dropdown/dropdown.mjs';

export default function clickHandler(data = {}) {
    document.body.addEventListener('click', event => {
        event.preventDefault();
        const t = event.target;

        anchorHandler(t);
        buttonHandler(t, data);
        toggleHandler(t);

    }, false);
}
