function calculate(priceBasket, allProducts, discount = null) {
  let result = priceBasket;
  if (discount === 'ДАРИМ300' && priceBasket < 300) {
    result = 0;
  } else if (discount === 'ДАРИМ300') {
    result -= 300;
  }

  if (allProducts >= 10) {
    result *= 0.95;
  }

  if (result > 50000) {
    result *= 0.80;
  }

  if (discount === 'СКИДКА15' && result >= 20000) {
    result *= 0.85;
  }
  return result;
}

calculate(21000, 12, 'СКИДКА15');

export default calculate;
