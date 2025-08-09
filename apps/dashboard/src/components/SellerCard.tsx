import {SellerCardProps} from "../../../../packages/types/componentTypes";
import {FC} from "react";
import Button from "../../../../packages/ui/Button";

const SellerCard: FC<SellerCardProps> = ({productId, title, quantity}) => {
    return (
        <div>
            <span>
                {title}
            </span>
            <p>
                {quantity}
            </p>
            <Button type='button' className='btn'>
                ⋮
            </Button>
        </div>
    )
}
export default SellerCard;