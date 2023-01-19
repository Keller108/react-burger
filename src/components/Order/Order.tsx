import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useSelector } from '../../shared/hooks';
import { TOrderData, TORderStatus } from '../../shared/types';
import styles from './Order.module.css';

type TStatus = {
    done: 'Выполнен',
    pending: 'Готовиться',
    created: 'Создан'
};

type Props = {
    number: number;
    name: string;
    time: string;
    ingredients: TOrderData[];
    maxItems: number;
    status?: TORderStatus | null;
};

export const Order = ({
    number, name, time, ingredients, maxItems, status = null
}: Props) => {
    const { ingredientItems } = useSelector(store => store.ingredients);
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

    return (
        <Link
            to={{ pathname: `/feed/${number}` }}
            className={styles.link}
        >
            <li className={styles.orderItem}>
                <div className={`${styles.orderItemDescription} mb-6`}>
                    <span className='text text_type_main-small'>#{number}</span>
                    <span className='text text_type_main-small text_color_inactive'>{time}</span>
                </div>
                <h2 className='text text_type_main-medium mb-2'>{name}</h2>
                <p className='text text_type_main-small mb-6'>{

                }</p>
                <div className={styles.description}>
                    <ul className={styles.ingredientsEnumeration}>
                        {ingredients.map((item, i) => <li key={item + i.toString()}
                            className={styles.ingredientItem} style={{zIndex: maxItems + 1}}>
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