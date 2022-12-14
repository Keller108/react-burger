import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import cardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/types/commonTypes';

export function Card({ cardData, onCardClick }) {
    const [amount, setAmount] = useState(0);
    const { buns, otherItems } = useSelector(store => store.burgerConstructor);
    const location = useLocation();

    const [, ref] = useDrag({
        type: 'ingredients',
        item: cardData ,
        collect: monitor => ({
            isHover: monitor.isDragging()
        }),
    });

    const { image, price, name } = cardData;
    const ingredientId = cardData._id;

    let ingredientAmount = useMemo(() => {
        return otherItems.filter(item => item._id === cardData._id).length;
    }, [otherItems, cardData._id]);

    useEffect(() => {
        if (otherItems.length > 0) {
            setAmount(ingredientAmount);
        } else if (!otherItems.length) {
            setAmount(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otherItems])

    return (
        <Link
            key={ingredientId}
            onClick={onCardClick}
            to={{ pathname: `/ingredients/${ingredientId}` }}
            state={{ background: location }}
            className={cardStyle.link}
        >
            <li draggable
                ref={ref}
                className={cardStyle.card}>
                    {(cardData.type === 'bun' && buns.length)
                        && (buns.filter(item => item._id === cardData._id)
                        && buns.find(item => item._id === cardData._id))
                        ? <span className={`${cardStyle.quantity}
                            "text text_type_main-medium"`}
                        >{buns.length + 1}</span>
                        : (amount > 0) && <span
                        className={`${cardStyle.quantity} "text text_type_main-medium"`}
                        >{amount}</span>
                    }
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
        </Link>
    )
}

Card.propTypes = {
    cardData: ingredientPropType.isRequired,
    onCardClick: PropTypes.func.isRequired
}