import {ProductsGridProps} from "../types/componentTypes";
import {FC} from "react";
const ProductsGrid: FC<ProductsGridProps> = ({ products, renderCardContent}) => {
    return (
        <main className=' w-100 d-flex flex-row flex-wrap border border-black'>
            <div className='w-25' style={{ minHeight: '100px' }}>1item</div>
            <div className='w-25' style={{ minHeight: '100px' }}>2item</div>
            <div className='w-25' style={{ minHeight: '100px' }}>3item</div>
            <div className='w-25' style={{ minHeight: '100px' }}>4item</div>
            <div className='w-25' style={{ minHeight: '100px' }}>5item</div>
            <div className='w-25' style={{ minHeight: '100px' }}>6item</div>
        </main>
    )
}
export default ProductsGrid;