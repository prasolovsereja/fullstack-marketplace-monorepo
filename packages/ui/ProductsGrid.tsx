import {ProductsGridProps} from "../types/componentTypes";
import {FC, useState} from "react";
import ProductCard from "./ProductCard";

const ProductsGrid: FC<ProductsGridProps> = ({ products, renderCardContent}) => {
    return (
        <main className=' w-100 d-flex flex-row flex-wrap border border-black'>
            {products.map((product) => (
                <ProductCard product={product} style={{minWidth: '25%'}}>
                    {renderCardContent(product)}
                </ProductCard>
            ))}
        </main>
    )
}
export default ProductsGrid;