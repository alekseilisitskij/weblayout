export function calculateDiscount(price, percent) {
  if (typeof price !== 'number' || typeof percent !== 'number') {
    throw new TypeError('Невалидный тип данных для суммирования');
  }
  return (price / 100) * percent;
}

export function getMarketingPrice(product) {
  const productObject = JSON.parse(product);

  if(!productObject.prices) return null;

  return productObject.prices.marketingPrice;
}


// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    const imageData = { url: '/images/default.jpg'};
    resolve(imageData);
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  const image = await fetchAvatarImage(userId);
  return image.url;
}
