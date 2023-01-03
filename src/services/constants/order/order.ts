import { placeAnOrder } from "../../../shared/burgerApi";

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';
export const CLEAR_CART: 'CLEAR_CART' = 'CLEAR_CART';

export const INCREASE_TOTAL_PRICE: 'INCREASE_TOTAL_PRICE' = 'INCREASE_TOTAL_PRICE';
export const DECREASE_TOTAL_PRICE: 'DECREASE_TOTAL_PRICE' = 'DECREASE_TOTAL_PRICE';

export function handlePlaceAnOrder(data: any) {
    //@ts-ignore
    return function(dispatch) {
        //@ts-ignore
        return placeAnOrder({ ingredients: data })
        //@ts-ignore
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
            //@ts-ignore
            .then(res => dispatch({ type: CLEAR_CART }))
            //@ts-ignore
            .catch(err => alert(`Ошибка при создании заказа – ${err.message}`))
    }
}