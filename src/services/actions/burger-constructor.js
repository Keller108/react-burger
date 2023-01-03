import { placeAnOrder } from "../../shared/burgerApi";
import { CLEAR_CART, ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/order/order";

export const INCREASE_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const DECREASE_TOTAL_PRICE = 'DECREASE_TOTAL_PRICE';

export function handlePlaceAnOrder(data) {
    return function(dispatch) {
        return placeAnOrder({ ingredients: data })
            .then(res => {
                dispatch({
                    type: ORDER_REQUEST
                });

                if (res && res.success) {
                    dispatch({
                        type: ORDER_SUCCESS,
                        payload: { number: res.order.number, name: res.name }
                    })
                } else {
                    dispatch({
                        type: ORDER_FAILED
                    })
                }
            })
            .then(res => dispatch({ type: CLEAR_CART }))
            .catch(err => alert(`Ошибка при создании заказа – ${err.message}`))
    }
}