import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useSelector } from '../../shared/hooks';
import { IWSOrderData, TOrderData, TORderStatus } from '../../shared/types';
import styles from './Order.module.css';

type TStatus = {
    done: 'Выполнен',
    pending: 'Готовиться',
    created: 'Создан'
};

export const Order = (item: IWSOrderData) => {
    const { ingredientItems } = useSelector(store => store.ingredients);
    const { _id, number, name, ingredients, status = null, createdAt, updatedAt } = item;
    let orderStatus;

    switch (status) {
        case 'done': {
            orderStatus = 'Выполнен';
            break
        }
        case 'canceled': {
            orderStatus = 'Отменен'
            break
        }
        case 'peding': {
            orderStatus = 'Готовится'
            break
        }
        case 'created': {
            orderStatus = 'Создан'
            break
        }
        default: {
            orderStatus = null
        }
    }

    const setCurrentOrder = (item: IWSOrderData) => {
        let data = JSON.stringify(item);
        localStorage.setItem('currentOrder', data);
    };

    return (
        <Link
            to={{ pathname: `/feed/${number}` }}
            className={styles.link}
            onClick={() => setCurrentOrder(item as IWSOrderData)}
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
                        {ingredients.map((item, i) => <li key={item + i.toString()}
                            className={styles.ingredientItem} style={{zIndex: ingredients.length + 1}}>
                            <span className={styles.ingredientBackground}><img
                                className={styles.ingredientImg} src='https://aba.ru/' alt="Картинка ингредиента" />
                            </span>
                        </li>)}
                    </ul>
                    <span className={styles.price}>
                        <p className='text text_type_digits-default mr-2'>{status && orderStatus}</p>
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
            </li>
        </Link>
    )
};