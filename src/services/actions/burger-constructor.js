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