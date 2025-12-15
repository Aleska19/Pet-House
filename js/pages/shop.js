import { getProducts } from "../modules/api.js";
import { renderProducts } from "../modules/ui.js";
import { addToCart, updateCartCount } from "../modules/carts.js";
import { applyFilters } from "../modules/filter.js";

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const subcategoryFilter = document.getElementById('subcategory-filter');
const sortFilter = document.getElementById('sort-filter');
const clearFiltersBtn = document.getElementById('clear-filters');

let allProducts = [];
let currentFilters = {
    search: '',
    category: 'todos',
    subcategory: 'todos',
    sort: ''
};

async function initShop() {
    allProducts = await getProducts();
    
    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Aplicar filtro de categoría si viene de la URL
    if (categoryParam && (categoryParam === 'perros' || categoryParam === 'gatos')) {
        currentFilters.category = categoryParam;
        categoryFilter.value = categoryParam;
    }
    
    // Renderizar productos inicialmente
    displayProducts();
    
    // Actualizar contador del carrito al cargar la página
    updateCartCount();
    
    // Event listeners para filtros
    setupFilterListeners();
}

function displayProducts() {
    const filteredProducts = applyFilters(allProducts, currentFilters);
    
    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-box-open"></i>
                <p>No se encontraron productos con los filtros seleccionados</p>
            </div>
        `;
        return;
    }
    
    renderProducts(filteredProducts, productList, (product) => {
        addToCart(product);
        showNotification(`${product.name} agregado al carrito ✓`);
    });
}

function setupFilterListeners() {
    // Búsqueda
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        displayProducts();
    });
    
    // Filtro de categoría
    categoryFilter.addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        displayProducts();
    });
    
    // Filtro de subcategoría
    subcategoryFilter.addEventListener('change', (e) => {
        currentFilters.subcategory = e.target.value;
        displayProducts();
    });
    
    // Ordenar por precio
    sortFilter.addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        displayProducts();
    });
    
    // Limpiar filtros
    clearFiltersBtn.addEventListener('click', () => {
        currentFilters = {
            search: '',
            category: 'todos',
            subcategory: 'todos',
            sort: ''
        };
        searchInput.value = '';
        categoryFilter.value = 'todos';
        subcategoryFilter.value = 'todos';
        sortFilter.value = '';
        displayProducts();
    });
}

// Mostrar notificación temporal
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar y eliminar después de 2 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

initShop();