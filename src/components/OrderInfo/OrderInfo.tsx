import { useEffect, useMemo, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItem, IOrderDataModel } from '../../shared/types';
import styles from './OrderInfo.module.css';
import { useSelector } from '../../shared/hooks';
import { countOrderPrice, getBurgerIngredients } from '../../shared/handlers';
import { conversionDateForCard } from '../../shared/handlers/convertDate';

export const OrderInfo = () => {
    const [currentOrder, ] = useState<IOrderDataModel | null>(() => {
        const item = localStorage.getItem('currentOrder');
        if (item) return JSON.parse(item);
        if (!item) {
            const lastItem = localStorage.getItem('lastOrder');
            if (lastItem) return JSON.parse(lastItem);
        }
        return null;
    });
    const [orderStatus, setOrderStatus] = useState('');
    const { ingredientItems } = useSelector(store => store.ingredients);

    let dateForOrder;

    if (currentOrder) {
        dateForOrder = conversionDateForCard(currentOrder.createdAt);
    }

    let statusText;
    let orderStyle;

    const orderIngredients = useMemo(() => {
        let ingredientsIds: string[] | [] = [];
        let ingredients: IIngredientItem[] | [] = [];

        if (currentOrder && currentOrder.ingredients) {
            ingredientsIds = [...currentOrder.ingredients];
            let uniqueIngredientsIDs = new Set(ingredientsIds);
            ingredients = getBurgerIngredients(Array.from(uniqueIngredientsIDs), ingredientItems);
            return ingredients;
        }
        return ingredients;
    }, [currentOrder, ingredientItems])

    const price = countOrderPrice(orderIngredients);

    const countQuantity = (ingredient: IIngredientItem) => {
        let ingredients: IIngredientItem[] | [] = [];

        if (currentOrder && currentOrder.ingredients) {
            let copiedArray = [...currentOrder.ingredients];
            ingredients = getBurgerIngredients(copiedArray, ingredientItems);
            let arr = ingredients.filter(item => item.name === ingredient.name);
            return arr.length
        }

        return ingredients.length;
    };

    switch (orderStatus) {
        case 'done': {
            statusText = 'Выполнен';
            orderStyle = styles.statusDone;
            break
        }
        case 'canceled': {
            statusText = 'Отменен';
            orderStyle = styles.statusCanceled;
            break
        }
        case 'pending': {
            statusText = 'Готовится';
            orderStyle = styles.statusInProgress;
            break
        }
        case 'created': {
            statusText = 'Создан';
            orderStyle = styles.statusInProgress;
            break
        }
        default: {
            statusText = '';
            orderStyle = '';
        }
    }

    useEffect(() => {
        if (currentOrder) setOrderStatus(currentOrder.status);
    }, [currentOrder])

    return (
        <article className={styles.orderInfo}>
            <b className={`${styles.orderId} text text_type_digits-default`}>#{currentOrder?.number}</b>
            <h1 className="text text_type_main-medium mt-0 mb-3">{currentOrder?.name}</h1>
            <span className={`text text_type_main-default ${orderStyle} mt-0 mb-15`}>{statusText}</span>
            <h2 className="text text_type_main-medium mt-0 mb-6">Состав:</h2>
            <ul className={styles.list}>
                {orderIngredients.map((item: IIngredientItem, i: number) => <li key={item._id + i} className={styles.ingredient}>
                    <span className={styles.ingredientFigure}>
                        <div className={styles.ingredientBackground}>
                            <img className={styles.ingredientImg}
                                src={item.image} alt={item.name} />
                        </div>
                    </span>
                    <h3 className={`${styles.ingredientTitle} text text_type_main-default`} >{item.name}</h3>
                    <span className={styles.ingredientCost}>
                        <p className="text text_type_digits-default mt-0 mb-0 mr-2">{`${countQuantity(item)} x ${item.price}`}</p>
                        <CurrencyIcon type="primary" />
                    </span>
                </li>)}
            </ul>
            <div className={`${styles.footer}`}>
                <p className="text text_type_main-small text_color_inactive mt-0 mb-0">{dateForOrder}</p>
                <span className={`${styles.price}`}>
                    <p className="text text_type_digits-default mt-0 mb-0 mr-2">{price}</p>
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </article>
    )
};