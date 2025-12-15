// Módulo de filtrado de productos

// Filtrar productos por categoría
export function filterByCategory(products, category) {
    if (!category || category === 'todos') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Filtrar productos por subcategoría
export function filterBySubcategory(products, subcategory) {
    if (!subcategory || subcategory === 'todos') {
        return products;
    }
    return products.filter(product => product.subcategory === subcategory);
}

// Filtrar productos destacados
export function getFeaturedProducts(products) {
    return products.filter(product => product.featured === true);
}

// Ordenar productos por precio
export function sortByPrice(products, order = 'asc') {
    const sortedProducts = [...products];
    return sortedProducts.sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

// Buscar productos por nombre
export function searchProducts(products, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return products;
    }
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
}

// Aplicar múltiples filtros
export function applyFilters(products, filters) {
    let filteredProducts = [...products];
    
    // Filtrar por categoría
    if (filters.category) {
        filteredProducts = filterByCategory(filteredProducts, filters.category);
    }
    
    // Filtrar por subcategoría
    if (filters.subcategory) {
        filteredProducts = filterBySubcategory(filteredProducts, filters.subcategory);
    }
    
    // Buscar por término
    if (filters.search) {
        filteredProducts = searchProducts(filteredProducts, filters.search);
    }
    
    // Ordenar por precio
    if (filters.sort) {
        filteredProducts = sortByPrice(filteredProducts, filters.sort);
    }
    
    return filteredProducts;
}

// Obtener categorías únicas
export function getCategories(products) {
    const categories = products.map(product => product.category);
    return [...new Set(categories)];
}

// Obtener subcategorías únicas
export function getSubcategories(products) {
    const subcategories = products.map(product => product.subcategory);
    return [...new Set(subcategories)];
}

