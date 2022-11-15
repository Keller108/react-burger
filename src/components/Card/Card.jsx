import PropTypes from 'prop-types';
import cardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/types/commonTypes';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

export function Card({ cardData, onCardClick }) {
    const dispatch = useDispatch();

    const [, ref] = useDrag({
        type: 'ingredients',
        item: cardData ,
        collect: monitor => ({
            isHover: monitor.isDragging()
        }),
    });

    const { image, price, name } = cardData;

    return (
        <li onClick={onCardClick}
            draggable
            ref={ref}
            className={cardStyle.card}>
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
    cardData: ingredientPropType.isRequired,
    onCardClick: PropTypes.func.isRequired
}