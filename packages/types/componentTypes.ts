export interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    sellerId: number;
}
export interface ProductsGridProps {
    products: Product[];
    renderCardContent: (product: Product) => React.ReactNode;

}
export interface ProductCardProps {
    product: Product;
    children: BuyerCardProps | SellerCardProps

}
export interface BuyerCardProps {
    productId: number;
    title: string;
    price: number;
}

export interface SellerCardProps {
    productId: number;
    title: string;
    quantity: number;
}