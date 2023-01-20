import { Order } from '../../components/Order';
import styles from './Orders.module.css';

export const Orders = () => {
    return (
        <ul className={styles.orders}>
            {/* {fakeOrders.map((item, i) => <Order
                key={item.name + i}
                number={item.number}
                name={item.name}
                time={item.time}
                ingredients={item.ingredients}
                price={item.price}
                maxItems={item.ingredients.length}
            />)} */}
        </ul>
    )
};