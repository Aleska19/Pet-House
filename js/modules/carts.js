let counter = 0;

export function generateCartId() {
    counter += 1;
    return `cart-${counter}`;
}