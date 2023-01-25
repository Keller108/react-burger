import { CSSProperties, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { countOrderPrice, getBurgerIngredients } from '../../shared/handlers';
import { useDispatch, useSelector } from '../../shared/hooks';
import { IIngredientItem, IOrderDataModel } from '../../shared/types';
import styles from './Order.module.css';
import { openModal } from '../../services/actions/modal';
import { conversionDateForCard } from '../../shared/handlers';

enum OrderStatus {
    DONE = 'Выполнен',
    CANCELED = 'Отменен',
    CREATED = 'Создан',
    PENDING = 'Готовится'
}

export const Order = (item: IOrderDataModel) => {
    const { ingredientItems } = useSelector(store => store.ingredients);
    const { _id, number, name, status = null } = item;

    const location = useLocation();
    const dispatch = useDispatch();

    let statusText;
    let orderClass;

    switch (status) {
        case 'done': {
            statusText = OrderStatus.DONE;
            orderClass = styles.statusDone;
            break
        }
        case 'canceled': {
            statusText = OrderStatus.CANCELED;
            orderClass = styles.statusCanceled;
            break
        }
        case 'pending': {
            statusText = OrderStatus.PENDING;
            orderClass = styles.statusInProgress;
            break
        }
        case 'created': {
            statusText = OrderStatus.CREATED;
            orderClass = styles.statusInProgress;
            break
        }
        default: {
            statusText = '';
            orderClass = '';
        }
    }

    const setCurrentOrder = (item: IOrderDataModel) => {
        let data = JSON.stringify(item);
        localStorage.setItem('currentOrder', data);
    };

    const orderIngredients = useMemo(() => {
        let ingredientsIds: string[] | [] = [];
        let ingredients: IIngredientItem[] | [] = [];
        let filteredIngredients: IIngredientItem[] | [] = [];

        if (item && item.ingredients) {
            ingredientsIds = [...item.ingredients];
            ingredients = getBurgerIngredients(ingredientsIds, ingredientItems);
            let res = ingredients.reduce((acc: IIngredientItem[], curr: IIngredientItem) => {
                if (!acc.find((item: IIngredientItem) => item.name === curr.name)) {
                    acc.push(curr);
                }
                return acc;
            }, []);
            return res;
        }
        return filteredIngredients;
    }, [item, ingredientItems])

    const dateForOrder = conversionDateForCard(item.createdAt);
    const price = countOrderPrice(orderIngredients);

    const translateIngredient = (array: IIngredientItem[], item: IIngredientItem): CSSProperties => {
        let index = array.indexOf(item);

        if (index === 0) {
            return {
                transform: 'unset',
                zIndex: `${array.length}`
            }
        } else return {
            transform: `translateX(${index * -20}px)`,
            zIndex: `${array.length - 1 - array.indexOf(item)}`
        }
    };

    const getIngredientsWithSkip = () => {
        let items;
        if (orderIngredients.length > 5) {
            let skipItem = orderIngredients[orderIngredients.length - 1];
            items = [...orderIngredients.slice(0, 5), skipItem];
            return items
        }
        return orderIngredients;
    };

    const ingredientsItems = getIngredientsWithSkip();

    return (
        <Link
            to={{ pathname: `/feed/${_id}` }}
            className={styles.link}
            onClick={() => {
                setCurrentOrder(item as IOrderDataModel);
                dispatch(openModal('ORDER_VIEW'));
            }}
            state={{ background: location }}
        >
            <li className={styles.orderItem}>
                <div className={`${styles.orderItemDescription} mb-6`}>
                    <span className='text text_type_main-small'>#{number}</span>
                    <span className='text text_type_main-small text_color_inactive'>{dateForOrder}</span>
                </div>
                <h2 className='text text_type_main-medium mb-2'>{name}</h2>
                <p className={`text text_type_main-small mb-6 ${orderClass}`}>{status && statusText}</p>
                <div className={styles.description}>
                    <ul className={styles.ingredientsEnumeration}>
                        {ingredientsItems?.map((item, i) => {
                            if (ingredientsItems.length > 5 && ingredientsItems.indexOf(item) === ingredientsItems.length - 1) {
                                return <li key={item + i.toString()} className={styles.ingredientItem}
                                    style={{transform: 'translateX(-100px)'}}>
                                    <p className={`${styles.skipText} text text_type_digits-default`}>+{orderIngredients.length + 1 - ingredientsItems.length}</p>
                                    <span className={styles.ingredientBackground}><div className={styles.overlay}></div>
                                        <img className={styles.ingredientImg} src={item.image} alt="Картинка ингредиента"/>
                                    </span>
                                </li>
                            } else return <li key={item + i.toString()}
                            className={styles.ingredientItem} style={translateIngredient(orderIngredients, item)}>
                                <span className={styles.ingredientBackground}><img
                                    className={styles.ingredientImg} src={item.image} alt="Картинка ингредиента" />
                                </span>
                            </li>
                        })}
                    </ul>
                    <span className={styles.price}>
                        <p className='text text_type_digits-default mr-2'>{price}</p>
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
            </li>
        </Link>
    )
};