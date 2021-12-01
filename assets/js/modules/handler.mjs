'use strict';

import {newFetch, fetchForm} from './fetch.mjs';
import scrollSmooth from './scroll-smooth.mjs';

function clickHandler(data = {}) {
    document.body.addEventListener('focusin', inputHandler, false);
    document.body.addEventListener('input', inputHandler, false);
    document.body.addEventListener('change', inputHandler, false);
    document.body.addEventListener('submit', formHandler, false);
    document.body.addEventListener('click', event => {
        event.preventDefault();
        const t = event.target;

        if (t.closest('a')) {
            const $a = t.closest('a[href^="/"]:not([target=_blank])');
            if ($a) {
                const href = $a.href;
                // const href = a.getAttribute('href');
                activeLink($a);
                history.pushState(href, '', href);
                newFetch(href);
            }

            const $anchor = t.closest('a[href^="#"]');
            // $anchor && scrollSmooth($anchor.hash);
            if ($anchor) {
                activeLink($anchor);
                scrollSmooth($anchor.hash);
            }

            const $tel = t.closest('a[href^=tel]');
            $tel && (window.location = $tel.href);

            const $email = t.closest('a[href^=mailto]');
            $email && (window.location = $email.href);

            const $newTabLink = t.closest('a[target=_blank]');
            $newTabLink && window.open($newTabLink.href);
        }

        if (t.closest('button')) {
            const $button = t.closest('button[type=button]');
            if ($button) {
                const popup = $button.dataset.popup;
                popup && popupHandler(popup);
                const dhref = $button.dataset.href;
                dhref && newFetch(dhref);
                const cb = data[$button.dataset.cb];
                cb && setTimeout(() => cb(t), 100);
            }

            const $reset = t.closest('button[type=reset]');
            $reset && $reset.closest('form').reset();

            const $submit = t.closest('button[type=submit]');
            $submit && formHandler(event);
        }

        const $toggle = t.closest('.dropdown>.dropdown__toggle');
        if ($toggle) {
            const $dropdown = $toggle.closest('.dropdown');
            const $content = $dropdown.querySelector('.dropdown__content');
            $content && $content.classList.toggle('dn');
        }

    }, false);
}


function activeLink($a) {
    const $active = $a.parentElement.querySelector('.active');
    $active && $active.classList.remove('active');
    $a.classList.add('active');
}

function formHandler(event) {
    event.preventDefault();
    const $form = event.target.closest('form');
    validation($form) && fetchForm($form);
}

function validation($form) {
    const inputs = $form.querySelectorAll('input:not([type=hidden])');
    return Array.from(inputs).every($input => {
        inputCheck($input);
        return $input.dataset.validation === 'valid';
    });
}

function inputHandler(event) {
    const t = event.target;
    t.tagName === 'INPUT' && inputCheck(t);
}

function inputCheck($input) {

    let error = '';

    // const spaceRegexp = /^\s+$/;
    const emailRegexp = /^[A-Za-z0-9]+[\w.-]*[A-Za-z0-9]+@[\w-]+\.[a-z]{2,5}$/is;
    const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&?*()]).{8,}$/s;

    const lengthCheck = () => {
        if ($input.dataset.required === 'required' && $input.value.trim().length < 2) {
            error = 'Поле обязательно к заполнению и должно содержать минимум <strong>2</strong> символа';
            return true;
        }
    };
    const emailCheck = () => {
        if ($input.type === 'email' && !emailRegexp.test($input.value)) {
            error = 'Введите корректный Email';
            return true;
        }
    };
    const passwordCheck = () => {
        if (
            $input.value.trim().length
            && (($input.type === 'password' || $input.type === 'text')
            && ($input.name === 'new_password' || $input.name === 'confirm_new_password'))
            && !passwordRegexp.test($input.value)
        ) {
            error = 'Пароль должен содержать не менее <strong>8</strong> символов: буквы латинского алфавита в обоих регистрах, цифры, специальные символы <strong>! @ # $ % & ? * ( )</strong>';
            return true;
        }
    };
    const confirmPasswordCheck = () => {
        if ($input.name === 'confirm_new_password') {
            const confirm = $input.value;
            const password = $input.closest('form').querySelector('input[name=new_password]').value;
            if (confirm === password) {
                return false;
            } else {
                error = 'Пароли не совпадают';
                return true;
            }
        }
    };

    $input.dataset.validation = (lengthCheck() || emailCheck() || confirmPasswordCheck() || passwordCheck()) ? 'invalid' : 'valid';

    let $error;
    const $next = $input.closest('label').nextElementSibling;
    if ($next && $next.classList.contains('error_input')) {
        $error = $next;
    } else {
        $error = document.createElement('span');
        $error.className = 'error_input';
        $input.closest('label').after($error);
    }
    $error.innerHTML = error;
}


function popupHandler(popup) {
    const handlerWrap = $popup => {
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
        newFetch(`${apiPath}/popup/${popup}`, {
            cb: response => {
                response.popup && document.body.insertAdjacentHTML('beforeend', response.popup);
                const $popup = document.querySelector(`section.popup.${popup}`);
                handlerWrap($popup);
            }
        });
    };

    const $popup = typeof popup === 'string' ? document.querySelector(`section.popup.${popup}`) : popup;
    $popup ? handlerWrap($popup) : fetchPopup(popup);
}




export {clickHandler, popupHandler};
