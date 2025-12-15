import { getProductById } from "../modules/api.js";
import { renderProductDetail } from "../modules/ui.js";
import { addToCart, updateCartCount } from "../modules/carts.js";

const productDetailContainer = document.getElementById('product-detail-container');

async function initProductDetail() {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        productDetailContainer.innerHTML = `
            <div class="product-not-found">
                <h2>No se especificó un producto</h2>
                <a href="/html/tienda/index.html" class="btn-back">Volver a la tienda</a>
            </div>
        `;
        return;
    }
    
    // Obtener el producto
    const product = await getProductById(productId);
    
    // Renderizar el detalle
    renderProductDetail(product, productDetailContainer, (product) => {
        addToCart(product);
        showNotification(`${product.name} agregado al carrito ✓`);
    });
    
    // Actualizar contador del carrito
    updateCartCount();
}

// Mostrar notificación temporal
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

initProductDetail();
