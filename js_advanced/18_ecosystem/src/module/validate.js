import validator from "validator.js"

export const validationCardNumber = (str) => {
  const cardNumberRegexp = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  const cardNumberRegexpAmericanExpress = /^\d{4}\s\d{6}\s\d{5}$/;
  const cardNumberRegexpDiners = /^\d{4}\s\d{6}\s\d{4}$/;

  return cardNumberRegexp.test(str) ||
    cardNumberRegexpAmericanExpress.test(str) || cardNumberRegexpDiners.test(str);
}

export const validationEmail = (str) => {
  const cardEmail = /\S+@\S+\.\S+/;
  return cardEmail.test(str);
}

export const validationCardCvv = (str) => {
  const cardCvvRegexp = /^\d{3,4}$/;
  return cardCvvRegexp.test(str);
}

export const validationExpiryDate = (str) => {
  // Регулярное выражение для формата MM/YY
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!dateRegex.test(str)) {
    return false; // Неправильный формат
  }

  // Разделение MM и YY
  const [month, year] = str.split('/');

  // Получение текущей даты
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Получение двузначного года
  const currentMonth = currentDate.getMonth() + 1; // Месяцы начинаются с 1

  // Проверка, что дата не истекла
  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    return false; // Дата истекла
  }

  return true; // Дата корректна и не истекла
}

export const validateFormMainFunc = (validateTextWrapper, validateIdText, inputsObject) => {
  const validateWrapper = document.querySelector(`.${validateTextWrapper}`);
  const validateButton = document.querySelector('#validate-button')
  const validateText = document.querySelector(`#${validateIdText}`);
  let { cardnumber, email, securitycode, expirationdate} = inputsObject;
  if (cardnumber, email, securitycode, expirationdate){
    validateButton.disabled = false;
  } else {
      validateButton.disabled = true;
  }

  console.log(validationCardNumber(cardnumber.value));
  console.log(validationEmail(email.value));
  console.log(validationCardCvv(securitycode.value));
  console.log(validationExpiryDate(expirationdate.value));

  validateWrapper.style.opacity = 1;
  if (validationCardNumber(cardnumber.value) && validationEmail(email.value) && validationCardCvv(securitycode.value) && validationExpiryDate(expirationdate.value)) {
    validateText.textContent = 'Card is validate';
    validateWrapper.style.backgroundColor = '#478a56';
  } else {
    validateText.textContent = 'Card is not validate';
    validateWrapper.style.backgroundColor = '#ff8383';
  }
}
