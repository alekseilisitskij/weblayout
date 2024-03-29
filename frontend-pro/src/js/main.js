import {bindModal} from './modules/moduls';
import renders from './modules/render';
import { buttonAll } from './modules/btns';

window.addEventListener('DOMContentLoaded', function() {
    renders();
    buttonAll('.btn__th')
    // bindModal('.block__btn', '.modal__newClient', '.btn-closed', '.modal__content_close');
    // bindModal('.block__btn_change', '.modal__changeClient', '.btn-closed');
    // bindModal('.block__btn_delete', '.modal__deleteClient', '.btn-closed', '.modal__content_close');
})
