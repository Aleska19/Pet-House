import { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart } from "../modules/carts.js";
import { renderCart } from "../modules/ui.js";

const cartContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearBtn = document.getElementById('clear-cart-btn');

function updateCartDisplay() {
    const cart = getCart();
    
    // Renderizar items del carrito
    renderCart(
        cart, 
        cartContainer,
        (productId, newQuantity) => {
            updateQuantity(productId, newQuantity);
            updateCartDisplay();
        },
        (productId) => {
            removeFromCart(productId);
            updateCartDisplay();
        }
    );
    
    // Actualizar total
    const total = getCartTotal();
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Mostrar/ocultar botones según si hay items
    if (checkoutBtn && clearBtn) {
        if (cart.length === 0) {
            checkoutBtn.style.display = 'none';
            clearBtn.style.display = 'none';
        } else {
            checkoutBtn.style.display = 'block';
            clearBtn.style.display = 'block';
        }
    }
}

function initCart() {
    updateCartDisplay();
    
    // Event listener para botón de checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                alert('Funcionalidad de pago en desarrollo. Total: $' + getCartTotal().toFixed(2));
                // Aquí puedes redirigir a una página de checkout real
            }
        });
    }
    
    // Event listener para limpiar carrito
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                clearCart();
                updateCartDisplay();
            }
        });
    }
}

initCart();
