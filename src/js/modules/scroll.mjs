'use strict';

export function scrollSmooth(anchorId) {
    const $anchor = document.querySelector(anchorId);
    $anchor && $anchor.scrollIntoView({
        behavior: 'smooth',
        block:    'start'
    });
}

export function scrollLinks(link) {
    document.querySelectorAll(link).forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            const anchorId = event.currentTarget.getAttribute('href');
            scrollSmooth(anchorId);
        });
    });
}

export function scrollStopHandler(callback) {
    let scrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(scrolling);
        scrolling = setTimeout(() => {
            callback();
        }, 66);
    }, false);
}

// * Выполнение колбека после остановки скроллинга
/*
//* How to use
scrollStop(() => {
    //* Do something
});
*/
