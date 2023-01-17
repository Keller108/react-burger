import { OrderInfo } from '../../components/OrderInfo';
import styles from './OrderPage.module.css';

export const OrderPage = () => {
    return (
        <div className={styles.orderPage}>
            <OrderInfo />
        </div>
    )
};