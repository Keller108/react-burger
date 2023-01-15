import { Order } from '../../components/Order';
import { fakeOrders } from '../../shared/const';
import styles from './Orders.module.css';

export const Orders = () => {
    return (
        <ul className={styles.orders}>
            {fakeOrders.map(item => <Order
                key={item.name}
                number={item.number}
                name={item.name}
                time={item.time}
                ingredients={item.ingredients}
                price={item.price}
                maxItems={item.ingredients.length}
            />)}
        </ul>
    )
};