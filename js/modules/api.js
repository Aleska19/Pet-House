export async function getProducts(){
    try{
        const response = await fetch("../../data/products.json");
        return await response.json();
    }catch(error){
        console.error("fetching products error:", error);
        return [];
    }
}