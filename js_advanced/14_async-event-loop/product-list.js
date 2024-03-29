import { renderPage } from "./main.js";
export function render(data) {
  const container = document.createElement('div'),
        list = document.createElement('ul');


        container.classList.add(
        'container',
        'd-flex',
        'justify-content-between',
        'flex-wrap',
        'py-4'
        );
        list.classList.add('list-group');



  for (let i = 0; i < data.count; i++) {
    const item = document.createElement('li'),
          link = document.createElement('a'),
          span = document.createElement('span');


    item.classList.add('list-group-item')
    link.classList.add(
    'link-light',
    'link-offset-2',
    'link-underline-opacity-100-hover'
    )
    link.href = `?productId=${ i + 1 }`
    link.addEventListener('click', e => {
      e.preventDefault();
      const productId = i + 1;
      history.pushState(data, '', `?productId=${productId}`);
      renderPage(
        './product-details.js',
        `https://swapi.dev/api/films/${productId}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'
      );
    })
    span.classList.add('text-info-emphasis', 'fs-3')
    item.append(link);
    span.textContent = `${i + 1}) ${data.results[i].title}`
    link.append(span)
    item.append(link);
    list.append(item)
    container.append(list)
  }

  return container
};


