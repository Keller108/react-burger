import { placeAnOrder } from "../../utils/burger-api";

export const ADD_ITEM_TO_CONSTRUCTOR = 'ADD_ITEM_TO_CONSTRUCTOR';
export const DELETE_ITEM_FROM_CONTRUCTOR = 'DELETE_ITEM_FROM_CONTRUCTOR';
export const INCREASE_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const DECREASE_TOTAL_PRICE = 'DECREASE_TOTAL_PRICE';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const addItemToConstructor = ingredient => ({
    type: ADD_ITEM_TO_CONSTRUCTOR,
    ingredient
});

export const deleteItemFromConstructor = ingredient => ({
    type: DELETE_ITEM_FROM_CONTRUCTOR,
    ingredient
});

export const handleOrderRequest = () => ({
    type: ORDER_REQUEST
});

export function handlePlaceAnOrder(data) {
    return function(dispatch) {
        console.log('проверка data', data);
        return placeAnOrder({ ingredients: data })
            .then(res => {
                if (res && res.success) {
                    console.log('order', res.order);
                    dispatch({
                        type: ORDER_SUCCESS,
                        payload: res.order.number
                    })
                } else {
                    dispatch({
                        type: ORDER_FAILED
                    })
                }
            })
    }
}