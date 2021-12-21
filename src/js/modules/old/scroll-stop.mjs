'use strict';

// * Выполнение колбека после остановки скроллинга

export default function scrollStop(callback) {
    let scrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(scrolling);
        scrolling = setTimeout(() => {
            callback();
        }, 66);
    }, false);
}

//* How to use
/*

scrollStop(() => {
    //* Do something
});

*/
