import { dateInYyyyMmDdHhMmSs } from './date';
import {bindModal, createModalInput, closeDeleteModal, resetSelector} from './moduls';
import { createContactsElement } from './contactsElement';
import {serverAddSudent, serverGetSudents, serverDeleteSudent, serverPatchSudent} from './server';

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

let listData = [];
const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+(\s[а-яА-ЯёЁa-zA-Z]+)?(\s[а-яА-ЯёЁa-zA-Z]+)?$/;

async function renders() {

        let sortColumnFlag = 'fio'
        let sortDirFlag = true

        let serverData = await serverGetSudents(listData);
        
        if (serverData) {
          listData = serverData;
        }
    
        // Чтобы не было дублирования при удалений
        let currentOneUser;
    
        const handleDeleteUser = async () => {
            if (!currentOneUser) {
                return;
            }
    
            await serverDeleteSudent(currentOneUser.id);
            listData = listData.filter(item => item.id !== currentOneUser.id);
            closeDeleteModal('.modal__deleteClient');
            closeDeleteModal('.modal__changeClient');
            render(listData);
    
            currentOneUser = null;
        };
    
        // Обработчик событий для кнопки addChangeBtn (вынес чтобы не было дублирования)
        const addChangeBtnClickHandler = (e) => {
            e.preventDefault();
            const button = document.querySelector('.modal__form_btnChange');
            if (document.querySelectorAll('.modal__inputChange').length <= 10) {
                createModalInput('.modal__btnChange', '#addChangeContactBtn', 'modal__inputChange');
            } else {
                button.disabled = 'true';

            }
            // createModalInput('.modal__btnChange', '#addChangeContactBtn', 'modal__inputChange');
        };
    
        const handleChangeUser = async () => {
            const updatedContacts = Array.from(document.querySelectorAll('.modal__inputChange')).map(modalInput => {
            const selectElement = modalInput.querySelector('.form-select');
            const inputElement = modalInput.querySelector('.modal__form-control');
                
            return {
                    type: selectElement.value,
                    value: inputElement.value
                };
        });
        
            // Создаем объект с обновленными данными
            const updatedData = {
                    // id: oneUser.id,
                    name: inputName.value,
                    surname: inputSurname.value.trim(),
                    lastName: inputLast.value.trim(),
                    // createdAt: dateInYyyyMmDdHhMmSs(new Date(), '.'),
                    // updatedAt: dateInYyyyMmDdHhMmSs(new Date(oneUser.updatedAt), '.'),
                    contacts: updatedContacts,
            };
    
            // Отправляем запрос на сервер для обновления данных
            await serverPatchSudent(currentOneUser.id, updatedData);
    
            // Обновляем данные в массиве listData
            const updatedIndex = listData.findIndex(item => item.id === currentOneUser.id);
    
            if (updatedIndex !== -1) {
                    listData[updatedIndex] = {
                        ...listData[updatedIndex],
                        ...updatedData
                    };
            }
    
            // Закрываем модальное окно
            closeDeleteModal('.modal__changeClient');
    
            // Перерисовываем таблицу
            render(listData);
    
        }


            
        const $block = document.querySelector('.block__list'),
              $nameInp = document.getElementById('user_name'),
              $surnameInp = document.getElementById('user_surname'),
              $lastnameInp = document.getElementById('user_lastname'),
              $filterForm = document.getElementById('filter__form'),
              $searchInp = document.getElementById('filter__inp'),
              $table = document.createElement('table'),
              $tableHead = document.createElement('thead'),
              $tableBody = document.createElement('tbody'),
              $tableHeadTr = document.createElement('tr'),
              $tableHeadThId = document.createElement('th'),
              $tableHeadFio = document.createElement('th'),
              $tableHeadData = document.createElement('th'),
              $tableHeadClear = document.createElement('th'),
              $tableHeadContact = document.createElement('th'),
              $tableHeadMove = document.createElement('th'),
              $btnThId = document.createElement('button'),
              $btnThFio = document.createElement('button'),
              $btnThData = document.createElement('button'),
              $btnThClear = document.createElement('button'),
              $imgThId = document.createElement('img'),
              $imgThFio = document.createElement('img'),
              $imgThData = document.createElement('img'),
              $imgThClear = document.createElement('img'),
              $modalFormBtn = document.getElementById('addContactBtn'),
              $btnAddInput = document.querySelector('.block__btn'),
              $changeBtn = document.getElementById('changeBtn'),
              saveBtn = document.getElementById('saveBtn'),
              addChangeBtn = document.getElementById('addChangeContactBtn'),
              inputName = document.getElementById('user_nameChange'),
              inputSurname = document.getElementById('user_surnameChange'),
              inputLast = document.getElementById('user_lastnameChange');
    
        $table.classList.add('table', 'block__head');
        $tableHeadThId.classList.add('col', 'block__id');
        $tableHeadFio.classList.add('col', 'block__fio');
        $tableHeadData.classList.add('col', 'block__data');
        $tableHeadClear.classList.add('col', 'block__clear');
        $tableHeadContact.classList.add('col', 'block__contacts');
        $tableHeadMove.classList.add('col', 'block__move');
        $btnThId.classList.add('btn-reset', 'btn__th', 'btn__th_id');
        $btnThFio.classList.add('btn-reset', 'btn__th', 'btn__th_fio');
        $btnThData.classList.add('btn-reset', 'btn__th', 'btn__th_data');
        $btnThClear.classList.add('btn-reset', 'btn__th', 'btn__th_clear');
        $imgThId.classList.add('btn__th_svg');
        $imgThFio.classList.add('btn__th_svg');
        $imgThData.classList.add('btn__th_svg');
        $imgThClear.classList.add('btn__th_svg');
    
        $btnThId.innerHTML = 'ID<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>';
        $btnThFio.innerHTML = `Фамилия Имя Отчество<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg><span class="fio-span">А-Б</span>`;
        $btnThData.innerHTML = 'Дата и время<br>создания<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>';
        $btnThClear.innerHTML = 'Последние<br>изменения<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>';
        $tableHeadContact.innerHTML = 'Контакты';
        $tableHeadMove.innerHTML = 'Действия';
    
        $tableHeadThId.append($btnThId);
        $tableHeadFio.append($btnThFio);
        $tableHeadData.append($btnThData);
        $tableHeadClear.append($btnThClear);
    
        $tableHeadTr.append($tableHeadThId, $tableHeadFio, $tableHeadData, $tableHeadClear, $tableHeadContact, $tableHeadMove);
        $tableHead.append($tableHeadTr);
        $table.append($tableHead, $tableBody);
        $block.append($table);
    // кнопка добавить пользователя
        $btnAddInput.addEventListener('click', (e) => {
            e.preventDefault()
            $nameInp.value = '';
            $surnameInp.value = '';
            $lastnameInp.value = '';
            resetSelector('#addContactBtn', '.modal__input');
            resetSelector('#addChangeContactBtn', '.modal__inputChange');
            render(listData)
        })
    // кнопка добавить контакт в модальном окне
        $modalFormBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if (document.querySelectorAll('.modal__input').length <= 10) {
                createModalInput('.modal__btn', '#addContactBtn', 'modal__input');
            } else {
                $modalFormBtn.disabled = true;
            }

            // createModalInput('.modal__btn', '#addContactBtn', 'modal__input')
        })
    
        function createUserTr(oneUser) {
            const $userTr = document.createElement('tr'),
                $userThId = document.createElement('td'),
                $userFio = document.createElement('td'),
                $userData = document.createElement('td'),
                $userClear = document.createElement('td'),
                $userContacts = document.createElement('td'),
                $userTdBtn = document.createElement('td'),
                $userTdBtnChange = document.createElement('button'),
                $userTdBtnDelete = document.createElement('button')
            
            $userThId.classList.add('td__id');
            $userFio.classList.add('td__fio');
            $userData.classList.add('td__data');
            $userClear.classList.add('td__clear');
            $userContacts.classList.add('td__contacts');
            $userTdBtn.classList.add('td__move');
            $userTdBtnChange.classList.add('block__btn_change', 'btn-reset');
            $userTdBtnDelete.classList.add('block__btn_delete', 'btn-reset');
    
            $userThId.textContent = oneUser.id;
            $userFio.textContent = oneUser.fio;
            $userData.textContent = dateInYyyyMmDdHhMmSs(new Date(oneUser.createdAt), '.');
            $userClear.textContent =dateInYyyyMmDdHhMmSs(new Date(oneUser.updatedAt), '.') ;

            // Вызываем функцию createContactsElement без $userContacts
            const createdContactsElement = createContactsElement(oneUser.contacts);

            $userContacts.append(createdContactsElement);
    
            $userTdBtnChange.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="edit" opacity="0.7" clip-path="url(#clip0_216_219)"><path id="Vector" d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/></g><defs><clipPath id="clip0_216_219"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Изменить'
            $userTdBtnDelete.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="cancel" opacity="0.7" clip-path="url(#clip0_216_224)"><path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g><defs><clipPath id="clip0_216_224"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Удалить';
    
            // Кнопка изменить
            $userTdBtnChange.addEventListener('click', async (e) => {
                e.preventDefault();
                bindModal('.block__btn_change', '.modal__changeClient', '.btn-closed');
    
                currentOneUser = oneUser;
    
                // Собираем обновленные данные из модального окна
                inputName.value = currentOneUser.name;
                inputSurname.value = currentOneUser.surname;
                inputLast.value = currentOneUser.lastName;

                // Добавляем обработчик событий для кнопки addChangeBtn
                addChangeBtn.addEventListener('click', addChangeBtnClickHandler);
    
                resetSelector('#addChangeContactBtn', '.modal__inputChange');
    
                currentOneUser.contacts.forEach(contact => {
                    createModalInput('.modal__btnChange', '#addChangeContactBtn', 'modal__inputChange', [contact]);
                })
                    
                $changeBtn.removeEventListener('click', handleChangeUser);
                $changeBtn.addEventListener('click', handleChangeUser);

                const deleteBtnChange = document.getElementById('btnDeleteChange');
            
                // Удаляем предыдущий обработчик, если таковой был
                deleteBtnChange.removeEventListener('click', handleDeleteUser);

                // Добавляем новый обработчик
                deleteBtnChange.addEventListener('click', handleDeleteUser);

                addChangeBtn.disabled = false;
            });
    
            // кнопка удаление пользователя
            $userTdBtnDelete.addEventListener('click', (e) => {
                e.preventDefault();
                bindModal('.block__btn_delete', '.modal__deleteClient', '.btn-closed', '.modal__content_close');
                currentOneUser = oneUser;
                const deleteBtn = document.querySelector('.modal__content_btn-delete');
            
                // Удаляем предыдущий обработчик, если таковой был
                deleteBtn.removeEventListener('click', handleDeleteUser);
            
                // Добавляем новый обработчик
                deleteBtn.addEventListener('click', handleDeleteUser);
            });
    
            $userTdBtn.append($userTdBtnChange, $userTdBtnDelete)
            $userTr.append($userThId, $userFio, $userData, $userClear, $userContacts, $userTdBtn);
    
            return $userTr;
        }
    
        function filter(arr, prop, value) {
            return arr.filter(function(oneUser) {
              if(oneUser[prop].includes(value.trim())) return true
            })
          }
    
        function render(arrData) {
                // Подготовка
            $tableBody.innerHTML = '';
    
            let copyList = [...arrData];
    
            for (const oneUser of copyList) {
                oneUser.fio = ` ${oneUser.surname} ${oneUser.name} ${oneUser.lastName}`;
                oneUser.updatedAt = new Date(oneUser.updatedAt)
                oneUser.createdAt = new Date(oneUser.createdAt)
                // oneUser.updatedAt = dateInYyyyMmDdHhMmSs(new Date(oneUser.updatedAt), '.');
                // oneUser.createdAt = dateInYyyyMmDdHhMmSs(new Date(oneUser.createdAt), '.');
            }
    
        // Сортировка
            copyList = copyList.sort(function(a,b) {
                let sort = a[sortColumnFlag] < b[sortColumnFlag]
                if(sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
                if(sort) return -1
            });
    
    
            // Фильтрация
            if($searchInp.value.trim() !== ''){
                copyList = filter(copyList, 'fio', $searchInp.value)
            }
    
            // отрисовка
            for (const oneUser of copyList) {
                const $newUser = createUserTr(oneUser)
                $tableBody.append($newUser)
            }
    
        }
    
    //открытие модального окна добавить
    bindModal('.block__btn', '.modal__newClient', '.btn-closed', '.modal__content_close'); 
    
    // добавление
        saveBtn.addEventListener('click', async function (e) {
            e.preventDefault();
              let $modalInputOption = document.querySelectorAll('.form-select'),
                  $modalFormControl = document.querySelectorAll('.modal__form-control'),
                  contactsArray = [];
    
            if ($surnameInp.value.trim() == "" || !nameRegex.test($surnameInp.value.trim())) {
                $surnameInp.value = '';
                $surnameInp.classList.add('form_red');
                return
            } else {
                $surnameInp.classList.remove('form_red');
            }
    
            if ($nameInp.value.trim() == "" || !nameRegex.test($nameInp.value.trim())) {
                $nameInp.value = '';
                $nameInp.classList.add('form_red');
                return
            } else {
                $nameInp.classList.remove('form_red');
            }
            
            if ($lastnameInp.value.trim() == "" || !nameRegex.test($lastnameInp.value.trim())) {
                $lastnameInp.value = '';
                $lastnameInp.classList.add('form_red');
                return
            } else {
                $lastnameInp.classList.remove('form_red');
            }
    
            $modalInputOption.forEach(iterator => {
              let selectedOption = iterator.options[iterator.selectedIndex];
              let type = selectedOption ? selectedOption.text : ''; 
              let value  = '';
          
              if (type !== "Телефон") {
                  contactsArray.push({
                      type,
                      value
                  });
              }
          });
          
          // Проверка наличия элементов в массиве перед установкой value
          if (contactsArray.length > 0) {
            $modalFormControl.forEach((iterator, index) => {
              if (contactsArray[index]) {
                contactsArray[index].value = iterator.value;
              }
          });
          }

            let newListData = {
                // id: listData.length + 1,
                name: $nameInp.value,
                surname: $surnameInp.value.trim(),
                lastName: $lastnameInp.value.trim(),
                // createdAt: dateInYyyyMmDdHhMmSs(new Date(), '.'),
                // updatedAt: dateInYyyyMmDdHhMmSs(new Date(), '.'),
                contacts: [...contactsArray],
            };
    
            try {
              let serverDataObj = await serverAddSudent(newListData);
              listData.push(serverDataObj)
              $nameInp.value = '';
              $surnameInp.value = '';
              $lastnameInp.value = '';
    
              render(listData);
          } catch (error) {
              console.error('Ошибка при отправке данных на сервер:', error);
          }
        });
    
        render(listData);
    
    // клики сортировки
    
        $btnThId.addEventListener('click', () => {
            sortColumnFlag = 'id'
            sortDirFlag = !sortDirFlag
            render(listData)
            $btnThId.classList.toggle('btn__active', sortDirFlag);
          })
    
        $btnThFio.addEventListener('click', () => {
            sortColumnFlag = 'fio'
            sortDirFlag = !sortDirFlag
            render(listData)
            $btnThFio.classList.toggle('btn__active', sortDirFlag);
          })
    
        $btnThData.addEventListener('click', () => {
          sortColumnFlag = 'createdAt'
          sortDirFlag = !sortDirFlag
          render(listData)
          $btnThData.classList.toggle('btn__active', sortDirFlag);
        })
    
        $btnThClear.addEventListener('click', () => {
          sortColumnFlag = 'updatedAt'
          sortDirFlag = !sortDirFlag
          render(listData)
          $btnThClear.classList.toggle('btn__active', sortDirFlag);
        })
    
        //Фильтр
        $filterForm.addEventListener('submit', (event) => {
            event.preventDefault()
            })
    
       $searchInp.addEventListener('input', (event) => {
          render(listData)
        })

}

export default renders;