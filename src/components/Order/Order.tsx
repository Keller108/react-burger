import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItem } from '../../shared/types';
import styles from './Order.module.css';

type Props = {
    number: number;
    name: string;
    time: string;
    ingredients: IIngredientItem[];
    price: number;
    maxItems: number;
};

export const Order = ({ number, name, time, ingredients, price, maxItems }: Props) => {
    return (
        <li className={styles.orderItem}>
            <div className={`${styles.orderItemDescription} mb-6`}>
                <span className='text text_type_main-small'>#{number}</span>
                <span className='text text_type_main-small text_color_inactive'>{time}</span>
            </div>
            <h2 className='text text_type_main-medium mb-5'>{name}</h2>
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
    )
};