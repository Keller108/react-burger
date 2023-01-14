import { useSelector } from '../../shared/hooks';
import styles from './OrderFeed.module.css';

const fakeOrders = [
    {
        number: 1234,
        time: 'Сегодня, 16:20 i-GMT+3',
        name: 'Death Star Starship Main бургер',
        ingredients: ['bun', 'onion'],
        price: 480
    }, {
        number: 4321,
        time: 'Сегодня, 16:22 i-GMT+3',
        name: 'Interstellar бургер',
        ingredients: ['bun', 'meat', 'onion'],
        price: 560
    }
];

export const OrderFeed = () => {
    const ingredients = useSelector(store => store.ingredients.ingredientItems);
    console.log('ingredients', ingredients);

    return (
        <main className={styles.orderFeed}>
            <section className={styles.ordersWrapper}>
                <h1 className="text text_type_main-large pb-5">
                    Соберите бургер
                </h1>
                <ul className={styles.orders}>
                    {fakeOrders.map(item => <li className={styles.orderItem}>
                        <div className={styles.orderItemDescription}>
                            <span className='text text_type_main-small'>{item.number}</span>
                            <span className='text text_type_main-small text_color_inactive'>{item.time}</span>
                        </div>
                        <h2 className='text text_type_main-medium'>{item.name}</h2>
                        <div>
                            <ul>

                            </ul>
                            <span>{item.price}</span>
                        </div>
                    </li>)}
                </ul>
            </section>
        </main>
    )
};