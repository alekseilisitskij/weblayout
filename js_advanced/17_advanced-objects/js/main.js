const input = document.getElementById('input'),
      form = document.querySelector('.form'),
      list = document.createElement('ol'),
      container = document.querySelector('.container')

container.append(list)

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (typeof window[input.value] === 'function') {
    input.classList.remove('is-invalid')
    getProto(window[input.value])

  } else {
    input.classList.add('is-invalid')
  }
  input.value = '';

})


function getProto(proto) {
  if(proto !== null) {
    let itemProto = Object.getPrototypeOf(proto);
    createListPrototype(proto)
    getProto(itemProto)

  } else return;
}

function createListPrototype(obj) {
  const prototypeItem = document.createElement('li'),
        methodList = document.createElement('ol');

  if(obj.prototype) {
    prototypeItem.textContent = obj.prototype.constructor.name;
  } else prototypeItem.textContent = obj || '[Без названия]'

  const methods = Object.getOwnPropertyNames(obj)

  methods.forEach((methodName) => {
    const methodItem = document.createElement('li');
    methodItem.textContent = methodName;
    methodList.append(methodItem);
    prototypeItem.append(methodList);
  });

  for (const key in obj.prototype) {
    const methodItem = document.createElement('li');
    methodItem.textContent = `${key} - ${globalThis[key]}`
    methodList.append(methodItem)
    prototypeItem.append(methodList);
  }

  container.append(prototypeItem)
}

