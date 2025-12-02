/* import { setupDropdown } from './modules/events.js';

import {$, $$} from './modules/domUtils.js';


export const dropdown = $('.dropdown');
export const dropdownMenu = $$('.dropdown-menu');

document.addEventListener('DOMContentLoaded', () => {
    setupDropdown();
}) */

//efecto de paracion scroll para le sesion promociones
const promoSection = document.querySelector('.promotions');
window.addEventListener('scroll', () => {
  const rect = promoSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    promoSection.classList.add('scroll-visible');
  } 
});