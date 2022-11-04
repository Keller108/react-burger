import cardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../shared/types/commonTypes';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

export function Card({ cardData, setModalState }) {
    const { image, price, name } = cardData;

    const handleModalState = () => {
        setModalState({
            isActive: true,
            content: <IngredientDetails data={cardData} />
        })
    }

    return (
        <li onClick={handleModalState} className={cardStyle.card}>
            <span className={`${cardStyle.quantity} "text text_type_main-medium"`}>1</span>
            <img
                className={image}
                src={image}
                alt="Картинка ингридиента"
            />
            <span className={`${cardStyle.price} mb-1`}>
                <p className="text text_type_main-medium mr-2">{price}</p>
                <span>
                    <CurrencyIcon type="primary"/>
                </span>
            </span>
            <p className="text text_type_main-default">{name}</p>
        </li>
    )
}

Card.propTypes = {
    cardData: ingredientPropType.isRequired
}