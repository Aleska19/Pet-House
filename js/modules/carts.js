// Carrito de compras - gestión completa

const CART_KEY = 'pet-house-cart';

// Obtener carrito desde localStorage
export function getCart() {
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : [];
}

// Guardar carrito en localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Agregar producto al carrito
export function addToCart(product) {
  const cart = getCart();
  
  // Verificar si el producto ya existe en el carrito
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Si existe, incrementar cantidad
    cart[existingItemIndex].quantity += 1;
  } else {
    // Si no existe, agregarlo con cantidad 1
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1
    });
  }
  
  saveCart(cart);
  updateCartCount();
  return cart;
}

// Eliminar producto del carrito
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  return cart;
}

// Actualizar cantidad de un producto
export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menor, eliminar el producto
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
    updateCartCount();
  }
  
  return cart;
}

// Limpiar carrito completamente
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

// Calcular total del carrito
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Obtener cantidad total de items en el carrito
export function getCartItemsCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Actualizar el contador visual del carrito en el header
export function updateCartCount() {
  const count = getCartItemsCount();
  const cartIcon = document.querySelector('.nav-icons a[aria-label="Carrito"]');
  
  if (cartIcon) {
    // Remover contador anterior si existe
    let badge = cartIcon.querySelector('.cart-badge');
    
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartIcon.appendChild(badge);
      }
      badge.textContent = count;
    } else if (badge) {
      badge.remove();
    }
  }
} 