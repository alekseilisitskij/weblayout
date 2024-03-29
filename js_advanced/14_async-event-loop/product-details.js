import { renderPage } from "./main.js";
export function render(data)  {

  function getItem(text) {
    const item = document.createElement('li'),
          span = document.createElement('span')

    span.classList.add('span__text')
    item.classList.add(
      'link-light',
      'link-offset-2',
      'link-underline-opacity-100-hover'
      )
    span.textContent = text
    item.append(span)
    return item
  }

  const container = document.createElement('container'),
        block = document.createElement('div'),
        btnBack = document.createElement('button'),
        title = document.createElement('h1'),
        subtitle = document.createElement('h2'),
        subtitleSpecies = document.createElement('h2'),
        descr = document.createElement('p');

  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );
  title.classList.add('title')
  block.classList.add('block')
  btnBack.classList.add('btn', 'btn-primary', 'mb-10')
  subtitle.classList.add('subtitle')
  subtitleSpecies.classList.add('subtitle', '--bs-warning')
  descr.classList.add('descr')

  title.textContent = `${data.title}`
  btnBack.textContent = 'Back to episodes'
  descr.textContent = `${data.opening_crawl}`
  subtitle.textContent = 'Planets'
  subtitleSpecies.textContent = 'Species'

  let listPlanet = document.createElement('ul'),
      listSpecies = document.createElement('ul');

  let link; // Переменную link объявляем здесь
  let itemSpecies;

  listPlanet.classList.add('list-group', 'list-reset');
  listSpecies.classList.add('list-group', 'list-reset');

  const urls = data.planets
  const promises = urls.map(url => fetch(url));

  Promise.all(promises).then(res => {
    return Promise.all(res.map(response => response.json()));
  }).then(dataArray => {
    // Обработка данных из каждого запроса
    dataArray.forEach(item => {
      let result = item.name
      link = getItem(result); // Здесь переменная link будет доступна
      listPlanet.append(link); // Добавляем ссылку в список после ее создания
    })
  })

  const urlsSpecies = data.species
  const promisesSpecies = urlsSpecies.map(url => fetch(url));

 Promise.all(promisesSpecies).then(res => {
    return Promise.all(res.map(response => response.json()));
  }).then(dataArray => {
    // Обработка данных из каждого запроса
    dataArray.forEach(item => {
      let result = item.name
      itemSpecies = getItem(result); // Здесь переменная link будет доступна
      listSpecies.append(itemSpecies); // Добавляем ссылку в список после ее создания
    })
  }).catch(error => {
    console.error('Произошла ошибка', error)
    return null
  })

  btnBack.addEventListener('click', e => {
    // console.log(window.history.state);
    e.preventDefault();
    window.history.back();
    renderPage(
      './product-list.js',
      'https://swapi.dev/api/films',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'
        );
  })

  block.append(btnBack, descr, subtitle, listPlanet, subtitleSpecies, listSpecies)
  container.append(title, block);

  return container
}
