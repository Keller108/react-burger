import { useEffect, useMemo, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItem, IWSOrderData, TOrderID } from '../../shared/types';
import styles from './OrderInfo.module.css';
import { useDispatch, useSelector } from '../../shared/hooks';
import { getIngredients } from '../../services/actions/burger-ingredients';

export const OrderInfo = () => {
    const [currentOrder, ] = useState<IWSOrderData | null>(() => {
        let item = localStorage.getItem('currentOrder');
        if (item) return JSON.parse(item);
        else return null;
    });
    const [orderStatus, setOrderStatus] = useState('');

    const { ingredientItems } = useSelector(store => store.ingredients);

    const dispatch = useDispatch();
    const getAppIngredients = () => dispatch(getIngredients());

    let statusText;
    let orderStyle;

    const getBurgerIngredients = (ids: TOrderID[], ingrdients: IIngredientItem[]) => ids?.map(
        (id: string) => ingrdients.filter((item: IIngredientItem) => item._id === id)
    )?.flat();

    const orderIngredients = useMemo(() => {
        let ingredientsIds: string[] | [] = [];
        let ids: IIngredientItem[] | [] = [];

        if (currentOrder && currentOrder.ingredients) {
            ingredientsIds = [...currentOrder.ingredients];
            ids = getBurgerIngredients(ingredientsIds, ingredientItems);
            return ids;
        }
        return ids;
    }, [currentOrder, ingredientItems])

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
        case 'peding': {
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
        getAppIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (currentOrder) setOrderStatus(currentOrder.status);
    }, [currentOrder])

    return (
        <article className={styles.orderInfo}>
            <b className={`${styles.orderId} text text_type_digits-default`}>#{currentOrder?.number}</b>
            <h1 className="text text_type_main-medium mt-0 mb-3">Black Hole Singularity острый бургер</h1>
            <span className={`text text_type_main-default ${orderStyle} mt-0 mb-15`}>{statusText}</span>
            <h2 className="text text_type_main-medium mt-0 mb-6">Состав:</h2>
            <ul className={styles.list}>
                {orderIngredients.map((item: IIngredientItem) => <li className={styles.ingredient}>
                    <span className={styles.ingredientFigure}>
                        <div className={styles.ingredientBackground}>
                            <img className={styles.ingredientImg}
                                src={item.image} alt={item.name} />
                        </div>
                    </span>
                    <h3 className={`${styles.ingredientTitle} text text_type_main-default`} >{item.name}</h3>
                    <span className={styles.ingredientCost}>
                        <p className="text text_type_digits-default mt-0 mb-0 mr-2">{item.price}</p>
                        <CurrencyIcon type="primary" />
                    </span>
                </li>)}
            </ul>
            <div className={`${styles.footer}`}>
                <p className="text text_type_main-small text_color_inactive mt-0 mb-0">Вчера, 13:50 i-GMT+3</p>
                <span className={`${styles.price}`}>
                    <p className="text text_type_digits-default mt-0 mb-0 mr-2">510</p>
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </article>
    )
};