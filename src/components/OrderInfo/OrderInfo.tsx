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
            <h2 className="text text_type_main-medium mt-0 mb-3">Состав:</h2>
            <ul className={styles.list}></ul>
            <p className="text text_type_main-small text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        </article>
    )
};