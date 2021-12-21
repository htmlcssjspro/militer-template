'use strict';

import newFetch from 'modules/fetch.mjs';

export default function popstate() {
    window.addEventListener('popstate', () => newFetch(history.state));
}
