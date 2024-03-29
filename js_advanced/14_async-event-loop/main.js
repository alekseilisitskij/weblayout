const cssPromises = {};
function loadResours(src) {
  // Javascript module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS файл
  if (src.endsWith('.css')) {
      if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
        cssPromises[src] = new Promise(resolve => {
          link.addEventListener('load', () => resolve());
        });
        document.head.append(link)
    }

    return cssPromises[src];
  }
    // Данные сервера

  return fetch(src).then(res => res.json())
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);

const productId = searchParams.get('productId');

export function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName,apiUrl, css].map(src=>loadResours(src)))
  .then(([pageModule, data]) => {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
  });
}

if(productId) {
  // загрузка  детальной страницы
  renderPage(
    './product-details.js',
    `https://swapi.dev/api/films/${productId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'
      );

} else {
  renderPage(
    './product-list.js',
    'https://swapi.dev/api/films',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css'
      );
}

