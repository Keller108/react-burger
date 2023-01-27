import { useEffect } from 'react';
import { Order } from '../../components/Order';
import { wsPrivateConnect, wsPrivateDisconnect, wsPrivateError } from '../../services/actions/ws-private';
import { useDispatch, useSelector } from '../../shared/hooks';
import { ORDERS_PROFILE_PATH } from '../../shared/routes';
import styles from './Orders.module.css';

export const Orders = () => {
    const { orderData } = useSelector(store => store.wsPrivate);
    const dispatch = useDispatch();

    const wsConnect = () => {
        let token = localStorage.getItem('accessToken');
        let data = token?.replace(/Bearer /g, '');
        if (data !== undefined && data !== null) {
            return dispatch(wsPrivateConnect({ url: ORDERS_PROFILE_PATH, token: data }))
        }
        return dispatch(wsPrivateError('Ошибка соединения'));

    };

    useEffect(() => {
        wsConnect();

        return () => {
            dispatch(wsPrivateDisconnect());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ul className={styles.orders}>
            {orderData ? orderData.map((item, i) => <Order
                key={item._id}
                {...item}
            />).reverse() : 'пусто'}
        </ul>
    )
};