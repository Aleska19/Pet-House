# 🛒 Sistema de Carrito de Compras - Pet House

## Funcionalidades Implementadas

### 1. **Módulo de Carrito** (`js/modules/carts.js`)
- ✅ Agregar productos al carrito
- ✅ Actualizar cantidades
- ✅ Eliminar productos
- ✅ Limpiar carrito completo
- ✅ Calcular total
- ✅ Persistencia con localStorage
- ✅ Contador visual en el icono del carrito

### 2. **Interfaz de Usuario** (`js/modules/ui.js`)
- ✅ Renderizado de productos con botón "Agregar al carrito"
- ✅ Renderizado de items del carrito con controles
- ✅ Vista de carrito vacío con enlace a la tienda

### 3. **Página de Tienda** (`js/pages/shop.js`)
- ✅ Integración con el sistema de carrito
- ✅ Notificaciones al agregar productos
- ✅ Actualización automática del contador

### 4. **Página del Carrito** (`html/carrito/index.html` + `js/pages/cart.js`)
- ✅ Visualización de todos los productos
- ✅ Controles para aumentar/disminuir cantidad
- ✅ Botón para eliminar productos
- ✅ Resumen con total
- ✅ Botones de checkout y vaciar carrito

### 5. **Estilos** (`css/components/cart.css`)
- ✅ Diseño responsive
- ✅ Badge con contador en el icono
- ✅ Notificaciones animadas
- ✅ Estilos coherentes con el diseño del sitio

## 🎯 Cómo Usar

### Para Agregar un Producto al Carrito:
1. Ve a la página de la tienda (`/html/tienda/index.html`)
2. Haz clic en "Agregar al carrito" en cualquier producto
3. Verás una notificación confirmando que se agregó
4. El contador en el icono del carrito se actualiza automáticamente

### Para Ver el Carrito:
1. Haz clic en el icono del carrito en el header
2. Verás todos los productos agregados
3. Puedes:
   - Aumentar/disminuir cantidades con los botones +/-
   - Eliminar productos con el icono de basura 🗑️
   - Ver el total actualizado en tiempo real

### Para Finalizar la Compra:
1. Haz clic en "Proceder al pago"
2. (Actualmente muestra un alert - aquí puedes integrar tu pasarela de pago)

### Para Vaciar el Carrito:
1. Haz clic en "Vaciar carrito"
2. Confirma la acción

## 📦 Estructura de Datos

### Producto en el Carrito:
```javascript
{
  id: 1,
  name: "Nombre del producto",
  price: 18,
  img: "../assets/images/producto.jpg",
  quantity: 2
}
```

### LocalStorage:
- Clave: `pet-house-cart`
- Formato: Array de objetos JSON

## 🔧 Funciones Principales

### En `carts.js`:
- `getCart()` - Obtiene el carrito actual
- `addToCart(product)` - Agrega un producto
- `removeFromCart(productId)` - Elimina un producto
- `updateQuantity(productId, quantity)` - Actualiza cantidad
- `clearCart()` - Vacía el carrito
- `getCartTotal()` - Calcula el total
- `getCartItemsCount()` - Cuenta items totales
- `updateCartCount()` - Actualiza el badge visual

### En `ui.js`:
- `renderProducts(products, container, onAddToCart)` - Renderiza productos
- `renderCart(cart, container, onUpdateQuantity, onRemove)` - Renderiza carrito

## 🎨 Personalización

### Colores:
Los colores se toman de `css/components/variables.css`:
- `--primary-color` - Color primario
- `--secondary-color` - Color secundario
- `--color-price` - Color de precios

### Notificaciones:
Puedes modificar la duración y estilo en:
- `js/pages/shop.js` - función `showNotification()`
- `css/style.css` - clase `.notification`

## 📱 Responsive

El carrito es completamente responsive:
- **Desktop**: Grid de 2 columnas (items + resumen)
- **Tablet** (< 950px): Columna única
- **Mobile** (< 625px): Layout optimizado para móvil

## 🚀 Próximos Pasos 

1. **Integrar pasarela de pago** (Stripe, MercadoPago, etc.)
2. **Agregar filtros y búsqueda** en la tienda
3. **Sistema de cupones de descuento**
4. **Guardar favoritos**
5. **Historial de pedidos**
6. **Validación de stock**

## 📝 Notas

- Los datos persisten en localStorage (no se pierden al recargar)
- Las imágenes deben estar en `assets/images/`
- El carrito funciona sin backend (solo frontend)
- Compatible con todos los navegadores modernos