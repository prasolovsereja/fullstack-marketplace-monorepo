import {BuyerCardProps} from "../../../../packages/types/componentTypes";
import Button from "../../../../packages/ui/Button";



const BuyerCard = ({productId, title, price, quantity, deliveryDuration}: BuyerCardProps) => {
    return (
        <div>
            <span>{title}</span>
            <p>{price}</p>
            <Button type='button' className='btn btn-primary'>Добавить в корзину</Button>
            <p>Доставим через {deliveryDuration} дней</p>
        </div>
    )
};
export default BuyerCard;