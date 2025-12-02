import { getProducts } from "../modules/api";
import { renderProducts } from "../modules/ui";

const productList = document.getElementById('product-list');

async function initShop() {
    const product = await getProducts();
    renderProducts(product, productList);

    
}

initShop();