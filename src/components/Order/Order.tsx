import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { IIngredientItem } from '../../shared/types';
import styles from './Order.module.css';

type TOrderStatus = 'Создан' | 'Готовится' | 'Выполнен';

type Props = {
    number: number;
    name: string;
    time: string;
    ingredients: IIngredientItem[];
    price: number;
    maxItems: number;
    status?: TOrderStatus | null;
};

export const Order = ({
    number, name, time, ingredients, price, maxItems, status = null
}: Props) => {
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
                <p className='text text_type_main-small mb-6'>Готовится</p>
                <div className={styles.description}>
                    <ul className={styles.ingredientsEnumeration}>
                        {ingredients.map(item => <li key={item.name}
                            className={styles.ingredientItem} style={{zIndex: maxItems + 1}}>
                            <span className={styles.ingredientBackground}><img
                                className={styles.ingredientImg} src={item.image} alt={item.name} />
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