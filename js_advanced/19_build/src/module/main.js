import { el, mount } from "redom";

const body = window.document.body

export function formCard() {
  mount(body, el('.payment-title', el('h1', 'Payment Information')))

  const fieldName = el('.field-container',
  el('label', { for:'email'}, 'E-mail'),
  el('input', { id:'email', maxlength:20, type:'E-mail'}));

  const fieldCardNumber = el('.field-container.cardNumberWrapper',
  el('label', {for:'cardnumber'}, 'Card Number'),
  el('input', {id:'cardnumber', type:'text', pattern:'[0-9]*', inputmode:'numeric'}),
  el('.ccicon'),  /* el('svg', {id:'ccicon', class:"ccicon", width:750, height:471, viewBox:'0 0 750 471', version:'1.1', xmlns:'http://www.w3.org/2000/svg', 'xmlns:xlink': 'http://www.w3.org/1999/xlink'}) */);

  const fieldSecurityCode = el('.field-container',
  el('label', {for:'securitycode'}, 'CVC/CVV'),
  el('input', {id:'securitycode', type:'text', pattern:'[0-9]*', inputmode:'numeric',  maxlength:3}));

  const fieldExpirationDate = el('.field-container',
  el('label', {for:'expirationdate'}, 'Expiration (mm/yy)'),
  el('input', {id:'expirationdate', type:'text', pattern:'\d{4}', inputmode:'numeric'}));

  mount(body, el('.form-container', fieldCardNumber, fieldExpirationDate, fieldSecurityCode, fieldName));


  const validateBlock = el('.validate-wrapper',
    el('.validate-button-wrapper',
      el('button#validate-button', 'Validate')),
    el('.validate-result',
      el('h2#validate-result-text',)));


  mount(body, validateBlock);

}




