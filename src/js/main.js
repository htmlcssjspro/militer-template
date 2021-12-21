'use strict';

import popstate from 'modules/popstate.mjs';
import clickHandler from 'modules/click-handler.mjs';
import newFetch from 'modules/fetch.mjs';

// import Slider from 'assets/militerslider/militerslider';
// import dropDown from 'components/dropdown/dropdown.mjs';

// dropDown();

popstate();
clickHandler();


const $townSelector = document.querySelector('.town-selector select');
if ($townSelector) {
    $townSelector.addEventListener('change', event => {
        const town = event.currentTarget.value;
        const fetchInit = {
            body: JSON.stringify({'town': town})
        };
        newFetch('/api/set-town', fetchInit, () => {
            document.querySelector('.offers .offers-list');
        });
    });
}

const $offerForm = document.querySelector('.offer__form');
if ($offerForm) {
    let position = 1;
    $offerForm.addEventListener('click', event => {
        if (event.target.tagName === 'BUTTON' && event.target.type === 'button') {

            const fieldsetClone = $fieldset => {
                const $fieldsetClone = $fieldset.cloneNode(true);
                position++;
                $fieldsetClone.dataset.position = position;
                $fieldsetClone.querySelector('legend').textContent = `Позиция ${position}`;
                // $fieldsetClone.querySelectorAll('input').forEach($input => {
                //     $input.name = `position[${position}][${$input.dataset.name}]`;
                // });
                return $fieldsetClone;
            };
            const setFormInputsDefaultValue = $form => {
                $form.querySelectorAll('input').forEach($input => {
                    $input.value = $input.defaultValue;
                });
            };

            const $btnAdd = $offerForm.querySelector('button[type=button][data-position=add]');

            switch (event.target.dataset.position) {
                case 'add': {
                    const $fieldset = $btnAdd.previousElementSibling;
                    const $fieldsetClone = fieldsetClone($fieldset);
                    setFormInputsDefaultValue($fieldsetClone);
                    $btnAdd.before($fieldsetClone);
                }
                    break;
                case 'copy': {
                    const $fieldset = event.target.parentElement;
                    const $fieldsetClone = fieldsetClone($fieldset);
                    $btnAdd.before($fieldsetClone);
                    $btnAdd.scrollIntoView({
                        behavior: 'smooth',
                        block:    'end'
                    });
                }
                    break;
                case 'del': {
                    const $fieldset = event.target.parentElement;
                    if ($fieldset.dataset.position == 1) {
                        setFormInputsDefaultValue($fieldset);
                    } else {
                        $fieldset.remove();
                    }
                }
                    break;

                default:
                    break;
            }
        }

    });
}

// new Slider({
//     main:          'slider',
//     arrowBtns:     false, // default true
//     prev:          '',
//     next:          '',
//     dots:          true, // default true
//     infinity:      true, // default true
//     auto:          true, // default true
//     autoInterval:  5, // default 5
//     slidesToShow:  1, // default 1
//     startPosition: 0, // default 0
// });
