import { setupDropdown } from './modules/events.js';

import {$, $$} from './modules/domUtils.js';


export const dropdown = $('.dropdown');
export const dropdownMenu = $$('.dropdown-menu');

document.addEventListener('DOMContentLoaded', () => {
    setupDropdown();
})

