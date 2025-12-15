import { getProducts } from "../modules/api.js";
import { renderProducts } from "../modules/ui.js";
import { addToCart, updateCartCount } from "../modules/carts.js";

const productList = document.getElementById('product-list');

async function initShop() {
    const products = await getProducts();
    
    // Renderizar productos con funcionalidad de agregar al carrito
    renderProducts(products, productList, (product) => {
        addToCart(product);
        showNotification(`${product.name} agregado al carrito ✓`);
    });
    
    // Actualizar contador del carrito al cargar la página
    updateCartCount();
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