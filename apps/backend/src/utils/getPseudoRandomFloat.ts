export const getPseudoRandomFloat = (productId) => {
    const x = Math.sin(productId * 9999) * 10000;
    return x - Math.floor(x);
};