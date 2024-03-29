export function getLocalStorageData(owner) {
  const data = localStorage.getItem(owner);
  return data ? JSON.parse(data) : [];
}

export function saveLocalStorageData(data, owner) {
  localStorage.setItem(owner, JSON.stringify(data));
}

export function createLocalStorageTodoItem({ owner, name }) {
  const newTodoItem = { id: Date.now(), name, done: false };
  const todoData = getLocalStorageData(owner);
  todoData.push(newTodoItem);
  saveLocalStorageData(todoData, owner);
  return newTodoItem;
}

export function finishTodoItemLocalStorage({ todoItem, owner }) {
  todoItem.done = !todoItem.done;
  let response = getLocalStorageData(owner);
  let doneItem = response.find(item => item.id === todoItem.id);
  doneItem.done = !doneItem.done ? true : false;
  saveLocalStorageData(response, owner);
}

export function deleteTodoItemLocalStorage({ element, todoItem, owner }) {
  if (!confirm("Вы уверены?")) {
    return;
  }
  const todoData = getLocalStorageData(owner);
  const index = todoData.findIndex(obj => obj.id === todoItem.id);
  if (index !== -1) {
    todoData.splice(index, 1);
    saveLocalStorageData(todoData, owner);
    element.remove();
  }
}
