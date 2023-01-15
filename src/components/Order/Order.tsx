import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItem } from '../../shared/types';
import styles from './Order.module.css';

type Props = {
    number: number;
    name: string;
    time: string;
    ingredients: IIngredientItem[];
    price: number;
};

export const Order = ({ number, name, time, ingredients, price }: Props) => {
    return (
        <li className={styles.orderItem}>
            <div className={styles.orderItemDescription}>
                <span className='text text_type_main-small'>{number}</span>
                <span className='text text_type_main-small text_color_inactive'>{time}</span>
            </div>
            <h2 className='text text_type_main-medium'>{name}</h2>
            <div>
                <ul className={styles.ingredientsEnumeration}>
                    {ingredients.map(item => <li className={styles.ingredientItem} key={item.name}>
                        <img src={item.image} alt={item.name} />
                    </li>)}
                </ul>
                <span>
                    <p>{price}</p>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </li>
    )
};