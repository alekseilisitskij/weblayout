(function() {
    let listArray = [], // создаем пустой массив для выплнения задания из 1 этапа чтобы выводить данные в объекте
        listName = '';
//Создаем и возвращаем заголовок приложения
    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
// создаем и возращаем форму для создания дела 
    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true; // кнопка "добавить" теперь не автивна

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        // Следующие событие сделанно для того чтобы кнопка "добавить" была не активна пустой, а при заполнение буквами стало активной
        input.addEventListener('input', function () {
            if (input.value !== "") {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
        // <form class="input-group mb-3">
        //     <input class="form-control" placeholder="Введите название нового дела">
        //     <div class="input-group-append">
        //         <button class="btn btn-primary">Добавить дело</button>
        //     </div>
        // </form>
        return {
            form,
            input,
            button,
        };
    }

    function createTodoList(){
        let list = document.createElement('ul');
         list.classList.add('list-group');
        return list
    }

    function createTodoItem(obj){
        let item = document.createElement('li');
        // кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        // устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью флекс
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (obj.done == true) item.classList.add('list-group-item-success');

        // добавляем обработчик событий на кнопки
        doneButton.addEventListener('click', function(){
            item.classList.toggle('list-group-item-success');
            for (const listItem of listArray) {
                if(listItem.id == obj.id) listItem.done = !listItem.done;
            }
            saveList(listArray, listName)
        });
        deleteButton.addEventListener('click', function(){
            if(confirm('Вы уверены')){
                item.remove();
                for (let i = 0; i < listArray.length; i++) {
                    if(listArray[i].id == obj.id) listArray.splice(i, 1)
                }
                saveList(listArray, listName)
            }
        });

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        
        return {
            item,
            doneButton,
            deleteButton
        }
    }
    
    function getNewId(arr) {
        let max = 0;
        for (const item of arr) {
            if(item.id > max) max = item.id;
        }
        return max + 1;
    }

    function saveList(arr, keyName) {
        localStorage.setItem(keyName, JSON.stringify(arr));
    }

    function createTodoApp(container, title = 'Список дел', keyName, defArray = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        listName = keyName;
        listArray = defArray;

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let localData = localStorage.getItem(listName);

        if(localData !== null && localData !== '') listArray = JSON.parse(localData)

        for (const itemList of listArray) {
            let todoItem =createTodoItem(itemList);
            todoList.append(todoItem.item);
        }

        // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела 
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима, чтобы предотвратить стандартное действия браузера
            // в данном случае, мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();
            // игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if(!todoItemForm.input.value) {
                return;
            }
            // В эту переменную будет вноситься результат значения из формы
            let newItem = {
                id: getNewId(listArray),
                name: todoItemForm.input.value,
                done: false
            }
            // // создаем и добавляем в список новое дело с названием из поля для ввода 1 пример
            // todoList.append(createTodoItem(todoItemForm.input.value).item);

            let todoItem =createTodoItem(newItem);

            listArray.push(newItem); // добавления результата обьекта в массив

            saveList(listArray, listName)
            // создаем и добавляем в список новое дело с названием из поля для ввода 2 пример с событиями
            todoList.append(todoItem.item);
            //Обнуляем кнопку "добавить" чтобы она стало не актиной
            todoItemForm.button.disabled = true;
            // обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });
    }
    window.createTodoApp = createTodoApp;
}());
