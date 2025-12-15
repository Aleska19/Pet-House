import { getProducts } from "../modules/api.js";
import { renderProducts } from "../modules/ui.js";
import { addToCart, updateCartCount } from "../modules/carts.js";
import { getFeaturedProducts } from "../modules/filter.js";

//efecto de aparición scroll para la sección promociones
const promoSection = document.querySelector('.promotions');
if (promoSection) {
  window.addEventListener('scroll', () => {
    const rect = promoSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      promoSection.classList.add('scroll-visible');
    }
  });
}

// Inicializar productos destacados en el home
const featuredContainer = document.getElementById('featured-products');

async function initHome() {
    const allProducts = await getProducts();
    const featuredProducts = getFeaturedProducts(allProducts);
    
    // Renderizar productos destacados
    if (featuredProducts.length > 0 && featuredContainer) {
        renderProducts(featuredProducts, featuredContainer, (product) => {
            addToCart(product);
            showNotification(`${product.name} agregado al carrito ✓`);
        });
    }
    
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

if (featuredContainer) {
    initHome();
}