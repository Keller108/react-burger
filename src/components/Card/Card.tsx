import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../shared/hooks';
import { useDrag } from 'react-dnd';
import cardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItem } from '../../shared/types';

type TCardProps = {
    cardData: IIngredientItem;
    onCardClick: () => void;
};

export function Card({ cardData, onCardClick }: TCardProps) {
    const [amount, setAmount] = useState(0);
    const store = useSelector(store => store.burgerConstructor);
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
        if (store && store.otherItems) {
            return store.otherItems.filter((item: IIngredientItem) => item._id === cardData._id).length;
        }
    }, [store, cardData._id]);

    useEffect(() => {
        if (store && store.otherItems) {
            if (ingredientAmount) setAmount(ingredientAmount);
        } else if (!store?.otherItems?.length) setAmount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store?.otherItems])

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
                    {(cardData.type === 'bun' && store?.buns)
                        && (store?.buns.filter((item: IIngredientItem) => item._id === cardData._id)
                        && store?.buns.find((item: IIngredientItem) => item._id === cardData._id))
                        ? <span className={`${cardStyle.quantity}
                            "text text_type_main-medium"`}
                        >{store?.buns.length + 1}</span>
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