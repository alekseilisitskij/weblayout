import { email, cardnumber, expirationdate, securitycode, lightcolor, darkcolor} from "../../script.js"
import { mask } from "./maskData.js";
import Inputmask from 'inputmask';
import { validateFormMainFunc } from "./validate.js";

const renderSvgIcon = (innerSvg) => {
  return `<img src=" ${innerSvg}" id="ccicon" class="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

</img>`
}


const swapColor = color => { // change card color func
  lightcolor.forEach(input => {
    input.classList = 'lightcolor ' + color
  });
  darkcolor.forEach(input => {
    input.classList = 'darkcolor ' + color + 'dark';
  });
};

export const eventListeners = () => {
  const dateMask = new Inputmask('99/99');
  const cvvMask = new Inputmask('999');
  const ccicon = document.querySelector('.ccicon');

  cardnumber.addEventListener('input', () => {
    if (cardnumber.value.length === 0) {
      ccicon.innerHTML = '';

    } else {


      for (const item of mask) {
        if (cardnumber.value.match(item.regex)) {
          const createCardMask = new Inputmask(item.mask);
          createCardMask.mask(cardnumber);

          if (item.icon !== undefined) {
            ccicon.innerHTML = renderSvgIcon(item.icon);
          }

          swapColor(item.color);
          break;
        }
      };
    }
  });

  expirationdate.addEventListener('input', () => {
    dateMask.mask(expirationdate); // use Inputmask package
  })

  securitycode.addEventListener('input', () => {
    cvvMask.mask(securitycode); // use Inputmask package
  })

  const validateButton = document.querySelector('#validate-button')
  validateButton.disabled = true;
  const inputs = document.querySelectorAll('input')
  inputs.forEach((input => {
    input.addEventListener('input', () => {
      const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== '');
      if (allInputsFilled) {
        validateButton.disabled = false;
      }
    })
  }))

  document.querySelector('#validate-button').addEventListener('click', (e) => {
    validateFormMainFunc('validate-result', 'validate-result-text', { cardnumber, email, securitycode, expirationdate});

  });
}
