'use strict';

import {fetchForm} from 'modules/fetch.mjs';

function formHandler() {
    document.body.addEventListener('focusin', inputHandler, false);
    document.body.addEventListener('input', inputHandler, false);
    document.body.addEventListener('change', inputHandler, false);
    document.body.addEventListener('submit', submitHandler, false);
    document.body.addEventListener('click', clickHandler, false);
}

function clickHandler(event) {
    event.preventDefault();
    const t = event.target;
    const $reset = t.closest('button[type=reset]') || t.closest('input[type=reset]');
    $reset && $reset.closest('form').reset();
    const $submit = t.closest('button[type=submit]') || t.closest('input[type=submit]');
    $submit && $submit.closest('form').submit();
}

function submitHandler(event) {
    event.preventDefault();
    const $form = event.target.closest('form');
    validation($form) && fetchForm($form);
}

function inputHandler(event) {
    const t = event.target;
    t.tagName === 'INPUT' && inputCheck(t);
}

function validation($form) {
    const inputs = $form.querySelectorAll('input:not([type=hidden])');
    return Array.from(inputs).every($input => {
        inputCheck($input);
        return $input.dataset.validation === 'valid';
    });
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

export default formHandler;
