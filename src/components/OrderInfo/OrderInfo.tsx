import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderInfo.module.css';

const fakeOrder = {
    _id: '034533',
    status: 'done',
    number: 1,
    createdAt: '2021-06-23T20:11:01.403Z',
    updatedAt: '2021-06-23T20:11:01.406Z',
    ingredients: [
        '60d3463f7034a000269f45e9',
        '60d3463f7034a000269f45e7'
    ]
};

type TOrderStatus = 'done' | 'inProgress' | 'canceled';

export const OrderInfo = () => {
    const statusClass = fakeOrder.status === 'done'
        ? `${styles.statusDone}`
        : fakeOrder.status === 'inProgress'
        ? `${styles.statusInProgress}`
        : fakeOrder.status === 'canceled'
        ? `${styles.statusCanceled}`
        : fakeOrder.status === 'inProgress';

    return (
        <article className={styles.orderInfo}>
            <b className="text text_type_digits-default mt-0 mb-10">#${fakeOrder._id}</b>
            <h1 className="text text_type_main-medium mt-0 mb-3">Black Hole Singularity острый бургер</h1>
            <span className={`text text_type_main-default ${statusClass} mt-0 mb-15`}>{fakeOrder.status}</span>
            <h2 className="text text_type_main-medium mt-0 mb-6">Состав:</h2>
            <ul className={styles.list}>
                <li className={styles.ingredient}>
                    <span className={styles.ingredientFigure}>
                        <div className={styles.ingredientBackground}>
                            <img className={styles.ingredientImg}
                                src="https://code.s3.yandex.net/react/code/bun-02.png" alt="ingredient" />
                        </div>
                    </span>
                    <h3 className={`${styles.ingredientTitle} text text_type_main-small`} >Флюоресцентная булка R2-D3</h3>
                    <span>
                        <p className="text text_type_digits-default mt-0 mb-0">
                            2 X 20
                        </p>
                        <CurrencyIcon type="primary" />
                    </span>
                </li>
            </ul>
            <div className={`${styles.footer}`}>
                <p className="text text_type_main-small text_color_inactive mt-0 mb-0">Вчера, 13:50 i-GMT+3</p>
                <span className={`${styles.price}`}>
                    <p className="text text_type_digits-default mt-0 mb-0">510</p>
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </article>
    )
};