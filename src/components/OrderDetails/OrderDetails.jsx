import orderDetailsStyle from './OrderDetails.module.css';
import IMG_SUCCESS_PATH from './assets/img-done.png';
import { useContext } from 'react';
import { BurgerConstructorContext } from '../../services/productsContext';

export function OrderDetails() {
    const { order } = useContext(BurgerConstructorContext);

    return (
        <div className={`${orderDetailsStyle.wrapper} pt-30 pb-30 pl-16 pr-16`}>
            <h2 className={`${orderDetailsStyle.title}
                text text_type_digits-large mt-0 mb-8`}>
                {order.number}
            </h2>
            <p className={`text text_type_main-medium mt-0 mb-15`}>
                идентификатор заказа
            </p>
            <img className={`${orderDetailsStyle.statusImg} mt-0 mb-15`}
                src={IMG_SUCCESS_PATH} alt="Success"
            />
            <p
                className={`text text_type_main-default mt-0 mb-2`}
            >
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default
                text_color_inactive mt-0 mb-0">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}