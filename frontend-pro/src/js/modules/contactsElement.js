export function createContactsElement(arr) {
    const typesTranslate = {
        "vk": "Вконтакте",
        "fb": "Facebook",
        "mail": "Почта",
        "phone": "Телефон",
        "AdditionalPhone": "Доп.телефон"
    }

    const contactWrapper = document.createElement('span');
    
    function refreshContacts() {
        contactWrapper.innerHTML = '';

        for (let i = 0; i < arr.length; i++) {
            const contacts = arr[i];
            const contactLink = document.createElement('a'),
                  tooltip = document.createElement('span');
            const imgURL = `../assets/img/${contacts.type}.svg`;

            contactWrapper.classList.add(`contacts`);
            contactLink.classList.add(`${contacts.type}`);
            contactLink.style.backgroundImage = `url(${imgURL})`;
            contactLink.href = `${contacts.value}`;
            tooltip.classList.add('tooltip');
            tooltip.setAttribute('data-toggle', 'tooltip');

            new bootstrap.Tooltip(contactLink, {
                placement: 'top',
                title: `${typesTranslate[contacts.type]}: ${[contacts.value]}`
            });

            contactLink.append(tooltip);

            // Проверяем, скрыт ли текущий контакт
            if (!contacts.isHidden || i < 4) {
                contactWrapper.append(contactLink);
            }
        }
    }

    // Ограничиваем количество объектов до первых четырех00
    for (let i = 0; i < Math.min(arr.length, 4); i++) {
        const contacts = arr[i];
        const contactLink = document.createElement('a'),
            tooltip = document.createElement('span');
        const imgURL = `../assets/img/${contacts.type}.svg`;

        contactWrapper.classList.add(`contacts`);
        contactLink.classList.add(`${contacts.type}`);
        contactLink.style.backgroundImage = `url(${imgURL})`;
        contactLink.href = `${contacts.value}`;
        tooltip.classList.add('tooltip');
        tooltip.setAttribute('data-toggle', 'tooltip');

        new bootstrap.Tooltip(contactLink, {
            placement: 'top',
            title: `${typesTranslate[contacts.type]}: ${[contacts.value]}`
        });

        contactLink.append(tooltip);
        contactWrapper.append(contactLink);
    }

    // Добавляем кнопку, если контактов больше 4
    if (arr.length > 4) {
        const collapseButton = document.createElement('button');
        collapseButton.classList.add('btn')
        collapseButton.classList.add('btn-reset')
        collapseButton.classList.add('btn__contacts')

        collapseButton.innerHTML = `<svg class="contacts__svgNumber" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7.5" stroke="#9873FF"/>
        <text x="50%" y="50%" font-size="8" text-anchor="middle" alignment-baseline="middle" fill="#333333">+${arr.length}</text>
        </svg>`;
        
        collapseButton.addEventListener('click', function () {
            refreshContacts();
        });

        // Добавляем кнопку к contactWrapper
        contactWrapper.append(collapseButton);
    }
    return contactWrapper;
}