// Пример использования fetch
let counter = 0


 async function getData() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    let spinner = document.getElementById('spinner');
    if (response.status === 404) {
      createElementError('Список товаров пуст')
      throw new Error('Список товаров пуст');
    }

    if (response.status === 500) {
      counter++;
      if (counter < 3) {
        return getData();
      } else {
       createElementError('Произошла ошибка, попробуйте обновить страницу позже')
      }
    }

   const data = await response.json();
   createElement(data);

  } catch (error) {
    if(error.name === 'SyntaxError'){
      createElementError('Произошла ошибка, попробуйте обновить страницу позже')
    }
    console.log(`Произошла ошибка: ${error.name}`);
  } finally {
      setTimeout(() => {
        const block = document.querySelector('.block');
        if (block) {
          block.classList.add('block__hidden');
        }
      }, 3000);
    spinner.style.display = 'none'
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
  }
}

function createElementError(message) {
  const block = document.createElement('div'),
        er = document.createElement('p');
        er.textContent = message;

  block.classList.add('block')

  block.append(er)
  document.body.append(block);
}

function createElement(elements) {
  const container = document.createElement('div');
        container.classList.add(
          'container',
          'd-flex',
          'justify-content-between',
          'flex-wrap',
          'py-4'
          );
  const list = document.createElement('ul');
        list.classList.add('list-group-item','d-flex','justify-content-between','flex-wrap','py-4')
  list.innerHTML = '';
  for (const element of elements.products) {
      const card = document.createElement('li'),
        image = document.createElement('img'),
        cardBody = document.createElement('div'),
        name = document.createElement('h5'),
        price = document.createElement('span');

        card.classList.add('card', 'mb-2', 'card-link');
        image.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        name.classList.add('card-title');
        price.classList.add('card-text');

        image.src = element.image;
        name.textContent = element.name;
        price.textContent = element.price;

        cardBody.append(name, price);
        card.append(image, cardBody);
        list.append(card);
        container.append(list);
  }

  document.body.append(container)
}

function handleOnlineStatus() {
  console.log('Сеть включена');
}

function handleOfflineStatus() {
  console.log('Сеть отключена');
}

getData()

