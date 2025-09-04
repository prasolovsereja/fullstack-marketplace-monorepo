'use client'

import ProductsGrid from "../../../../packages/ui/ProductsGrid";
import {useState} from "react";
import {Product} from "../../../../packages/types/componentTypes";
import BuyerCard from "@/app/ui/BuyerCard";

const ProductsGridClient = ({initialProducts}) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    console.log("products", products);
    const renderCardContent = (product: Product) => (
        <BuyerCard
            productId={product.id}
            price={product.price}
            quantity={product.quantity}
            title={product.title}
            deliveryDuration={product.deliveryDuration}
        />
    )


    return <ProductsGrid products={products} renderCardContent={renderCardContent}/>
}
export default ProductsGridClient;