import {SellerCardProps} from "../../../../packages/types/componentTypes";
import {FC} from "react";

const SellerCard: FC<SellerCardProps> = ({productId, title, quantity}) => {
    return (
        <div>
            <span>
                {title}
            </span>
            <p>
                {quantity}
            </p>
        </div>
    )
}
export default SellerCard;