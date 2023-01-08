import { IConstructorItem, TOrderData, TOrderID } from "../../shared/types";
import { ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR } from "../constants/burger-constructor";
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED, CLEAR_CART } from '../../services/constants/order';
import { placeAnOrder } from "../../shared/burgerApi";

export interface IAddItemToConstructorAction {
    readonly type: typeof ADD_ITEM_TO_CONSTRUCTOR;
    readonly ingredient: IConstructorItem;
}

export interface IDeleteItemFromConstructorAction {
    readonly type: typeof DELETE_ITEM_FROM_CONTRUCTOR;
    readonly ingredient: IConstructorItem;
}

export type TConstructorActions = IAddItemToConstructorAction
    | IDeleteItemFromConstructorAction;

export const addItemToConstructor = (
    ingredient: IConstructorItem
): IAddItemToConstructorAction => {
    return ({
        type: ADD_ITEM_TO_CONSTRUCTOR,
        ingredient: ingredient
    });
};

export const deleteItemFromConstructor = (
    ingredient: IConstructorItem
): IDeleteItemFromConstructorAction => {
    return ({
        type: DELETE_ITEM_FROM_CONTRUCTOR,
        ingredient: ingredient
    });
};

export function handlePlaceAnOrder(data: TOrderID[]) {
    return function(dispatch: any) {
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