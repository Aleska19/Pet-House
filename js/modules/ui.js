//dIBUJAR PRODUCTOS EN EL DOM

export function renderProducts(products, container) {
  // container is the grid (.products-container)
  container.innerHTML = "";
  products.forEach((product) => {
    container.innerHTML += `
      <div class="product-item">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
      </div>
    `;
  });
}
