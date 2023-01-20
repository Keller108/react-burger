import { useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IWSOrderData } from '../../shared/types';
import styles from './OrderInfo.module.css';

export const OrderInfo = () => {
    const [currentOrder, ] = useState<IWSOrderData | null>(() => {
        let item = localStorage.getItem('currentOrder');
        if (item) return JSON.parse(item);
        else return null;
    });
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        if (currentOrder) setOrderStatus(currentOrder.status);
    }, [currentOrder])

    let statusText;
    let orderStyle;

    switch (orderStatus) {
        case 'done': {
            statusText = 'Выполнен';
            orderStyle = styles.statusDone;
            break
        }
        case 'canceled': {
            statusText = 'Отменен';
            orderStyle = styles.statusCanceled;
            break
        }
        case 'peding': {
            statusText = 'Готовится';
            orderStyle = styles.statusInProgress;
            break
        }
        case 'created': {
            statusText = 'Создан';
            orderStyle = styles.statusInProgress;
            break
        }
        default: {
            statusText = '';
            orderStyle = '';
        }
    }

    console.log('ingre', currentOrder);

    return (
        <article className={styles.orderInfo}>
            <b className={`${styles.orderId} text text_type_digits-default`}>#{currentOrder?._id}</b>
            <h1 className="text text_type_main-medium mt-0 mb-3">Black Hole Singularity острый бургер</h1>
            <span className={`text text_type_main-default ${orderStyle} mt-0 mb-15`}>{statusText}</span>
            <h2 className="text text_type_main-medium mt-0 mb-6">Состав:</h2>
            <ul className={styles.list}>
                {currentOrder?.ingredients.map((item) => <li className={styles.ingredient}>
                    <span className={styles.ingredientFigure}>
                        <div className={styles.ingredientBackground}>
                            <img className={styles.ingredientImg}
                                src="https://code.s3.yandex.net/react/code/bun-02.png" alt="ingredient" />
                        </div>
                    </span>
                    <h3 className={`${styles.ingredientTitle} text text_type_main-default`} >Флюоресцентная булка R2-D3</h3>
                    <span className={styles.ingredientCost}>
                        <p className="text text_type_digits-default mt-0 mb-0 mr-2">2 X 20</p>
                        <CurrencyIcon type="primary" />
                    </span>
                </li>)}
            </ul>
            <div className={`${styles.footer}`}>
                <p className="text text_type_main-small text_color_inactive mt-0 mb-0">Вчера, 13:50 i-GMT+3</p>
                <span className={`${styles.price}`}>
                    <p className="text text_type_digits-default mt-0 mb-0 mr-2">510</p>
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </article>
    )
};