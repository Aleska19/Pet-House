//DIBUJAR PRODUCTOS EN EL DOM

export function renderProducts(products, container, onAddToCart) {
  // container is the grid (.products-container)
  container.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-item';
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button class="view-details-btn" data-id="${product.id}">Ver detalles</button>
      <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
    `;
    
    // Event listener para ver detalles
    const detailsBtn = productCard.querySelector('.view-details-btn');
    detailsBtn.addEventListener('click', () => {
      window.location.href = `/html/producto/index.html?id=${product.id}`;
    });
    
    // Event listener para agregar al carrito
    const addBtn = productCard.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onAddToCart) {
        onAddToCart(product);
      }
    });
    
    container.appendChild(productCard);
  });
}

// Renderizar el carrito completo
export function renderCart(cart, container, onUpdateQuantity, onRemove) {
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p>Tu carrito está vacío 🛒</p>
        <a href="/html/tienda/index.html" class="btn-shop">Ir a la tienda</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = "";
  
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">$${item.price}</p>
      </div>
      <div class="cart-item-controls">
        <button class="btn-decrease" data-id="${item.id}">-</button>
        <span class="cart-item-quantity">${item.quantity}</span>
        <button class="btn-increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-total">
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="btn-remove" data-id="${item.id}">🗑️</button>
    `;
    
    // Event listeners
    const decreaseBtn = cartItem.querySelector('.btn-decrease');
    const increaseBtn = cartItem.querySelector('.btn-increase');
    const removeBtn = cartItem.querySelector('.btn-remove');
    
    decreaseBtn.addEventListener('click', () => {
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, item.quantity - 1);
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, item.quantity + 1);
      }
    });
    
    removeBtn.addEventListener('click', () => {
      if (onRemove) {
        onRemove(item.id);
      }
    });
    
    container.appendChild(cartItem);
  });
}

// Renderizar detalle del producto
export function renderProductDetail(product, container, onAddToCart) {
  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <h2>Producto no encontrado</h2>
        <a href="/html/tienda/index.html" class="btn-back">Volver a la tienda</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.img}" alt="${product.name}">
      </div>
      
      <div class="product-detail-info">
        <div class="breadcrumb">
          <a href="/html/tienda/index.html">Tienda</a> / 
          <span>${product.category}</span> / 
          <span>${product.name}</span>
        </div>
        
        <h1 class="product-title">${product.name}</h1>
        
        <div class="product-category-badge">
          <span class="category">${product.category}</span>
          <span class="subcategory">${product.subcategory}</span>
        </div>
        
        <div class="product-price">
          <span class="price-label">Precio:</span>
          <span class="price-value">$${product.price}</span>
        </div>
        
        <div class="product-description">
          <h3>Descripción</h3>
          <p>${product.description || 'Sin descripción disponible'}</p>
        </div>
        
        <div class="product-features">
          <h3>Características</h3>
          <ul>
            ${product.features ? product.features.map(feature => `<li>${feature}</li>`).join('') : '<li>No hay características disponibles</li>'}
          </ul>
        </div>
        
        <div class="product-specs">
          <div class="spec-item">
            <span class="spec-label">Peso:</span>
            <span class="spec-value">${product.weight || 'N/A'}</span>
          </div>
          <div class="spec-item ${product.stock < 10 ? 'low-stock' : ''}">
            <span class="spec-label">Stock:</span>
            <span class="spec-value">${product.stock || 0} unidades</span>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn-add-to-cart" id="add-to-cart-detail">
            <i class="fa-solid fa-cart-shopping"></i>
            Agregar al carrito
          </button>
          <a href="/html/tienda/index.html" class="btn-back-shop">
            Seguir comprando
          </a>
        </div>
      </div>
    </div>
  `;

  // Event listener para agregar al carrito
  const addBtn = container.querySelector('#add-to-cart-detail');
  if (addBtn && onAddToCart) {
    addBtn.addEventListener('click', () => {
      onAddToCart(product);
    });
  }
}
