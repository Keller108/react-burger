import { CSSProperties, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { getBurgerIngredients } from '../../shared/handlers';
import { useDispatch, useSelector } from '../../shared/hooks';
import { IIngredientItem, IWSOrderData } from '../../shared/types';
import styles from './Order.module.css';
import { openModal } from '../../services/actions/modal';

export const Order = (item: IWSOrderData) => {
    const { ingredientItems } = useSelector(store => store.ingredients);
    const { _id, number, name, ingredients, status = null, createdAt, updatedAt } = item;

    const location = useLocation();
    const dispatch = useDispatch();

    let orderStatus;

    switch (status) {
        case 'done': {
            orderStatus = 'Выполнен';
            break
        }
        case 'canceled': {
            orderStatus = 'Отменен';
            break
        }
        case 'peding': {
            orderStatus = 'Готовится';
            break
        }
        case 'created': {
            orderStatus = 'Создан';
            break
        }
        default: {
            orderStatus = null;
        }
    }

    const setCurrentOrder = (item: IWSOrderData) => {
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

    const price = useMemo(() => {
        return orderIngredients.reduce((acc, curr) => {
            return acc += curr.price
        }, 0)
    }, [orderIngredients])

    const translateIngredient = (array: IIngredientItem[], item: IIngredientItem): CSSProperties => {
        let index = array.indexOf(item);

        if (index === 0) {
            return {
                transform: 'unset',
                zIndex: `${array.length}`
            }
        } else return {
            transform: `translateX(${index * -20}px)`,
            zIndex: `${array.length + 1}`
        }
    };

    return (
        <Link
            to={{ pathname: `/feed/${_id}` }}
            className={styles.link}
            onClick={() => {
                setCurrentOrder(item as IWSOrderData);
                dispatch(openModal('ORDER_VIEW'));
            }}
            state={{ background: location }}
        >
            <li className={styles.orderItem}>
                <div className={`${styles.orderItemDescription} mb-6`}>
                    <span className='text text_type_main-small'>#{number}</span>
                    <span className='text text_type_main-small text_color_inactive'>{updatedAt}</span>
                </div>
                <h2 className='text text_type_main-medium mb-2'>{name}</h2>
                <p className='text text_type_main-small mb-6'>{

                }</p>
                <div className={styles.description}>
                    <ul className={styles.ingredientsEnumeration}>
                        {orderIngredients.slice(0, 6).map((item, i) => <li key={item + i.toString()}
                            className={styles.ingredientItem} style={translateIngredient(orderIngredients, item)}>
                            <span className={styles.ingredientBackground}><img
                                className={styles.ingredientImg} src={item.image} alt="Картинка ингредиента" />
                            </span>
                        </li>)}
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