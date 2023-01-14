import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderFeed.module.css';

const fakeOrders = [
    {
        number: 1234,
        time: 'Сегодня, 16:20 i-GMT+3',
        name: 'Death Star Starship Main бургер',
        ingredients: [
            {
                calories:  420,
                carbohydrates: 53,
                fat : 24,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                name: "Краторная булка N-200i",
                price: 1255,
                proteins: 80,
                type: "bun",
                __v: 0,
                _id: "60d3b41abdacab0026a733c6"
            },{
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                image: "https://code.s3.yandex.net/react/code/meat-03.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                name: "Филе Люминесцентного тетраодонтимформа",
                price: 988,
                proteins: 44,
                type: "main",
                __v: 0,
                _id: "60d3b41abdacab0026a733c8"
            }
        ],
        price: 480
    }, {
        number: 4321,
        time: 'Сегодня, 16:22 i-GMT+3',
        name: 'Interstellar бургер',
        ingredients: [
            {
                calories:  420,
                carbohydrates: 53,
                fat : 24,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                name: "Краторная булка N-200i",
                price: 1255,
                proteins: 80,
                type: "bun",
                __v: 0,
                _id: "60d3b41abdacab0026a733c6"
            },{
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                image: "https://code.s3.yandex.net/react/code/meat-03.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                name: "Филе Люминесцентного тетраодонтимформа",
                price: 988,
                proteins: 44,
                type: "main",
                __v: 0,
                _id: "60d3b41abdacab0026a733c8"
            }
        ],
        price: 560
    }
];
const ready = [12345, 54321, 67890, 9876];

export const OrderFeed = () => {
    return (
        <main className={styles.orderFeed}>
            <section className={styles.ordersWrapper}>
                <h1 className="text text_type_main-large pb-5">
                    Соберите бургер
                </h1>
                <ul className={styles.orders}>
                    {fakeOrders.map(item => <li className={styles.orderItem} key={item.name}>
                        <div className={styles.orderItemDescription}>
                            <span className='text text_type_main-small'>{item.number}</span>
                            <span className='text text_type_main-small text_color_inactive'>{item.time}</span>
                        </div>
                        <h2 className='text text_type_main-medium'>{item.name}</h2>
                        <div>
                            <ul>
                                {item.ingredients.map(item => <li className={styles.orderItem} key={item.name}>
                                    <img src={item.image} alt={item.name} />
                                </li>)}
                            </ul>
                            <span>
                                <p>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    </li>)}
                </ul>
            </section>
            <section>
                <div className={styles.statusWrapper}>
                    <div className={styles.statusReady}>
                        <h2 className='text text_type_main-default'>Готовы:</h2>
                        <ul className={styles.statusList + '' + styles.statusListReady}>
                            {ready.map(item => <p className='text text_type_digits-default' key={item}>{item}</p>)}
                        </ul>
                    </div>
                    <div className={styles.statusOnWork}>
                        <h2 className='text text_type_main-default'>В работе:</h2>
                        <ul className={styles.statusList + '' + styles.statusListReady}>
                            {ready.map(item => <p className='text text_type_digits-default' key={item}>{item}</p>)}
                        </ul>
                    </div>
                </div>
                <div className={styles.statistics}>
                    <h2 className='text_type_main-default'>Выполнено за все время:</h2>
                    <p className='text text_type_main-large'>28 752</p>
                </div>
                <div className={styles.statistics}>
                    <h2 className='text_type_main-default'>Выполнено за сегодня:</h2>
                    <p className='text text_type_main-large'>138</p>
                </div>
            </section>
        </main>
    )
};