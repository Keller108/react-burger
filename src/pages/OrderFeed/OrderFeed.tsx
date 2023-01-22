import { useMemo } from 'react';
import { Order } from '../../components/Order';
import { useSelector } from '../../shared/hooks';
import { IOrderDataModel } from '../../shared/types';
import styles from './OrderFeed.module.css';

export const OrderFeed = () => {
    const wsStore = useSelector(store => store.wsPublic);
    const { total, totalToday, orderData } = wsStore;

    const readyOrders = useMemo(() => {
        return orderData.filter(item => item.status === 'done');
    }, [orderData])

    const createdOrders = useMemo(() => {
        return orderData.filter(item => item.status === 'created');
    }, [orderData])

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
                    />)}
                </ul>
            </section>
            <section className={`${styles.info} pl-15`}>
                <div className={styles.statusWrapper}>
                    <div className={styles.statusCol}>
                        <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                        <ul className={`${styles.statusList} ${styles.statusListDone}`}>
                            {readyOrders?.map(item => <p
                                className='text text_type_digits-default mb-2'
                                key={item._id}
                            >{item.number}</p>)}
                        </ul>
                    </div>
                    <div className={`${styles.statusCol}`}>
                        <h2 className='text text_type_main-medium mb-6'>В работе:</h2>
                        <ul className={`${styles.statusList} ${styles.statusListDone}`}>
                            {createdOrders?.map(item => <p
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