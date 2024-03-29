export function bindModal(triggerSelector, modalSelector, closeSelector, cancelBtn) {
    const body = document.body;

    body.addEventListener('click', (e) => {
        const target = e.target;
        const trigger = target.closest(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = target.closest(closeSelector);
        const cancel = target.closest(cancelBtn);

        if (trigger) {
            e.preventDefault();
            modal.style.display = "block";
            body.style.overflow = "hidden";
        }

        if (close || (modal && target === modal)) {
            modal.style.display = "none";
            body.style.overflow = "";
        }

        if (cancel) {
            modal.style.display = "none";
            body.style.overflow = "";
        }
    });
}
//Создание модального окна 
export function createModalInput(modals, btn, className,  contactsArray) {
    const modal = document.querySelector(modals),
    modalInput = document.createElement('div'),
    selectElement = document.createElement('select'),
    options = ['phone', 'AdditionalPhone', 'mail', 'vk', 'fb'],
    inputElement = document.createElement('input'),
    buttonElement = document.createElement('button'),
    imgElement = document.createElement('img'),
    modalFormBtn = document.querySelector(btn);

    modalInput.classList.add(className),
    selectElement.classList.add('form-select', 'form-select-sm');
    selectElement.setAttribute('aria-label', '.form-select-sm');
    inputElement.classList.add('form-control', 'modal__form-control');
    inputElement.setAttribute('name', 'data_input');
    inputElement.setAttribute('required', 'true');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Введите данные контакта');
    buttonElement.classList.add('btn-reset', 'form-delete_btn');
    imgElement.setAttribute('src', 'assets/img/cancelsmall.svg');
    imgElement.setAttribute('alt', 'cancelsmall');

    modalFormBtn.style.padding = '15px 0 15px 0';

    options.forEach((optionText, index) => {
          const optionElement = document.createElement('option');
          optionElement.classList.add('modal__input_option')
          optionElement.value = optionText; // Вы можете установить значение по своему усмотрению
          optionElement.text = optionText;
          if (index === 0) {
            optionElement.selected = true;
          }
          selectElement.append(optionElement);
    });

    if (contactsArray) {
        contactsArray.forEach((contact, index) => {
            const optionElement = document.createElement('option');
            optionElement.classList.add('modal__input_option');
            optionElement.value = contact.type; // Используйте свойство объекта, которое содержит значение
            optionElement.text = contact.type; // Используйте свойство объекта, которое содержит текст
            inputElement.value = contact.value;
            if (index === 0) {
                optionElement.selected = true;
            }
            selectElement.append(optionElement);
            // console.log(contact)
        });
    }

    buttonElement.append(imgElement);
    modalInput.innerHTML = ''; // Очищаем существующее содержимое
    modalInput.append(selectElement);
    modalInput.append(inputElement);
    modalInput.append(buttonElement);

    modal.append(modalInput);
    modal.insertBefore(modalInput, modalFormBtn);

    buttonElement.addEventListener('click', (e) => {
        e.preventDefault();
        modalFormBtn.style.padding = '0'
        modalInput.remove(); // Удаление блока
    });

}

//Зактрытие модального окна 

export function closeDeleteModal(modal) {
    let deleteClient = document.querySelector(modal);

        deleteClient.style.display = "none";
        document.body.style.overflow = "";
}

//сброс селектора контактов 

export function resetSelector(btn, className) {
    let modalInput = document.querySelectorAll(className),
        btnSelector = document.querySelector(btn);

    modalInput.forEach(item => {
        item.remove();
    })
    btnSelector.style.padding = '0'
}
