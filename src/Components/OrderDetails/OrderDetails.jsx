import orderDetailsStyle from './OrderDetails.module.css';

export function OrderDetails() {
    return (
        <>
            <h2 className={`${orderDetailsStyle.title} text text_type_digits-large`}>
                034536
            </h2>
            <p
                className={`${orderDetailsStyle.description} text text_type_main-medium`}
            >
                идентификатор заказа
            </p>
            <div className={orderDetailsStyle.statusImg}></div>
            <p
                className={`${orderDetailsStyle.description} text text_type_main-default`}
            >
                Ваш заказ начали готовить
            </p>
            <p
                className={`${orderDetailsStyle.description} text text_type_main-default`}
            >
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}