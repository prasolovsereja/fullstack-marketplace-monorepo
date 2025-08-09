import {ProductCardProps} from "../types/componentTypes";
import {FC} from "react";

const ProductCard: FC<ProductCardProps> = ({product, children, style, ...rest}) => {
    return (
        <div
             className=''
             style={style}
             {...rest}
        >
            <div className=''>
                {children}
            </div>
        </div>
    );
}
export default ProductCard;