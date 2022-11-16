import PropTypes from 'prop-types';
import cardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/types/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useEffect, useMemo, useState } from 'react';

export function Card({ cardData, onCardClick }) {
    const [amount, setAmount] = useState(0);
    const { otherItems } = useSelector(store => store.constructor);

    const [, ref] = useDrag({
        type: 'ingredients',
        item: cardData ,
        collect: monitor => ({
            isHover: monitor.isDragging()
        }),
    });

    const { image, price, name } = cardData;

    useEffect(() => {
        if (otherItems.length > 0) {
            let ingredientAmount = otherItems
            .filter(item => item._id === cardData._id).length;
            setAmount(ingredientAmount);
        }
    }, [otherItems])

    useEffect(() => {
        console.log('amount', amount)
    }, [amount])

    return (
        <li onClick={onCardClick}
            draggable
            ref={ref}
            key={amount > 1 ? `${cardData._id + amount}` : `${cardData._id}`}
            className={cardStyle.card}>
                {amount > 0 && <span
                    className={`${cardStyle.quantity} "text text_type_main-medium"`}
                >
                    {amount}
                </span>}
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