import { formCard } from './src/module/main.js'
import { eventListeners } from './src/module/listeners.js';

formCard()


export const email = document.getElementById('email');
export const cardnumber = document.getElementById('cardnumber');
export const expirationdate = document.getElementById('expirationdate');
export const securitycode = document.getElementById('securitycode');
export const lightcolor = document.querySelectorAll('.lightcolor');
export const darkcolor = document.querySelectorAll('.darkcolor');


eventListeners()
