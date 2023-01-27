import { useEffect, useMemo } from 'react';
import { Order } from '../../components/Order';
import { openModal } from '../../services/actions/modal';
import { wsPrivateDisconnect } from '../../services/actions/ws-private';
import { wsPublicConnect } from '../../services/actions/ws-public';
import { useDispatch, useSelector } from '../../shared/hooks';
import { ORDERS_FEED_PATH } from '../../shared/routes';
import { IOrderDataModel } from '../../shared/types';
import styles from './OrderFeed.module.css';

export const OrderFeed = () => {
    const dispatch = useDispatch();
    const wsStore = useSelector(store => store.wsPublic);
    const { total, totalToday, orderData } = wsStore;

    const readyOrders = useMemo(() => {
        let array = [...orderData];
        return array.filter(item => item.status === 'done');
    }, [orderData])

    const createdOrders = useMemo(() => {
        let array = [...orderData];
        return array.filter(item => item.status === 'pending');
    }, [orderData])

    useEffect(() => {
        dispatch(wsPublicConnect({ url: ORDERS_FEED_PATH }));

        return () => {
            dispatch(wsPrivateDisconnect());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let currentOrder = localStorage.getItem('currentOrder');
        if (currentOrder) dispatch(openModal('ORDER_VIEW'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className={styles.orderFeed}>
            <section className={styles.ordersWrapper}>
                <h1 className="text text_type_main-large mt-8 mb-2">
                    Лента заказов
                </h1>
                <ul className={styles.orders}>
                    {orderData.map((item: IOrderDataModel) => <Order
                        key={item.number}
                        {...item}
                        status="none"
                    />)}
                </ul>
            </section>
            <section className={`${styles.info} pl-15`}>
                <div className={styles.statusWrapper}>
                    <div className={styles.statusCol}>
                        <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                        <ul className={`${styles.statusList} ${styles.statusListDone}`}>
                            {readyOrders?.slice(0, 9).map(item => <p
                                className='text text_type_digits-default mb-2'
                                key={item._id}
                            >{item.number}</p>)}
                        </ul>
                    </div>
                    <div className={`${styles.statusCol}`}>
                        <h2 className='text text_type_main-medium mb-6'>В работе:</h2>
                        <ul className={`${styles.statusList}`}>
                            {createdOrders?.slice(0, 9).map(item => <p
                                className='text text_type_digits-default mb-2'
                                key={item._id}
                            >{item.number}</p>)}
                        </ul>
                    </div>
                </div>
                <div className={`${styles.statistics} mt-15`}>
                    <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                    <p className='text text_type_digits-large'>{total}</p>
                </div>
                <div className={`${styles.statistics} mt-15`}>
                    <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                    <p className='text text_type_digits-large'>{totalToday}</p>
                </div>
            </section>
        </main>
    )
};