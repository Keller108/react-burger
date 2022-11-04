import orderDetailsStyle from './OrderDetails.module.css';

export function OrderDetails() {
    return (
        <div className={`${orderDetailsStyle.wrapper} pt-30 pb-30 pl-16 pr-16`}>
            <h2 className={`${orderDetailsStyle.title}
                text text_type_digits-large mt-0 mb-8`}>
                034536
            </h2>
            <p className={`text text_type_main-medium mt-0 mb-15`}>
                идентификатор заказа
            </p>
            <div className={`${orderDetailsStyle.statusImg}
                mt-0 mb-15`}></div>
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