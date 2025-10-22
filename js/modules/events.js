import {toggleDropdown, closeDropdown} from './ui.js'; 
import {$, $$} from './domUtils.js';





export function setupDropdown(){
    const dropBtn = $('.dropBtn');
    const dropdownMenu = $$('.dropdown-menu');

    if (!dropBtn || !dropdownMenu) return;

    dropBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDropdown(dropdownMenu)

    })
    // dropdown.addEventListener('click', () =>  toggleDropdown(dropdownMenu));
}



