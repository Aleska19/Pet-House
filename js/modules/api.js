export async function getProducts(){
    try{
        const response = await fetch("../../data/products.json");
        return await response.json();
    }catch(error){
        console.error("fetching products error:", error);
        return [];
    }
}

export async function getProductById(id){
    try{
        const products = await getProducts();
        return products.find(product => product.id === parseInt(id));
    }catch(error){
        console.error("fetching product error:", error);
        return null;
    }
}