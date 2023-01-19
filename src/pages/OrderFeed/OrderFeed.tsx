import { Order } from '../../components/Order';
import { useSelector } from '../../shared/hooks';
import { IWSOrderData, TOrderID } from '../../shared/types';
import styles from './OrderFeed.module.css';

export const OrderFeed = () => {
    const wsStore = useSelector(store => store.wsPublic);
    const { ingredientItems } = useSelector(store => store.ingredients);

    const orders = wsStore.orderData;
    const ready = [12345, 54321, 67890, 9876];

    const getIngredientPrice = (itemId: TOrderID) => {
        let item = ingredientItems.filter(item => item._id === itemId).pop()?.price;
        if (item) return item;
        return 0;
    };

    return (
        <main className={styles.orderFeed}>
            <section className={styles.ordersWrapper}>
                <h1 className="text text_type_main-large mt-8 mb-2">
                    Лента заказов
                </h1>
                <ul className={styles.orders}>
                    {orders.map((item: IWSOrderData) => <Order
                        key={item.name}
                        number={item.number}
                        name={item.name}
                        time={item.createdAt}
                        ingredients={item.ingredients}
                        price={getIngredientPrice(item._id)}
                        maxItems={item.ingredients.length}
                    />)}
                </ul>
            </section>
            <section className={`${styles.info} pl-15`}>
                <div className={styles.statusWrapper}>
                    <div className={styles.statusCol}>
                        <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
                        <ul className={`${styles.statusList} ${styles.statusListDone}`}>
                            {ready.map(item => <p className='text text_type_digits-default' key={item}>{item}</p>)}
                        </ul>
                    </div>
                    <div className={`${styles.statusCol}`}>
                        <h2 className='text text_type_main-medium mb-6'>В работе:</h2>
                        <ul className={styles.statusList}>
                            {ready.map(item => <p className='text text_type_digits-default' key={item}>{item}</p>)}
                        </ul>
                    </div>
                </div>
                <div className={`${styles.statistics} mt-15`}>
                    <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                    <p className='text text_type_digits-large'>28 752</p>
                </div>
                <div className={`${styles.statistics} mt-15`}>
                    <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                    <p className='text text_type_digits-large'>138</p>
                </div>
            </section>
        </main>
    )
};