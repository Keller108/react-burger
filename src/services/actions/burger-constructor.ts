import { IConstructorItem, TOrderID } from "../../shared/types";
import {
    ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR, MOVE_ITEM
} from "../constants/burger-constructor";
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

export interface IMoveItemInConstructorAction {
    readonly type: typeof MOVE_ITEM;
    readonly toIndex: number;
    readonly fromIndex: number;
}

export interface IOrderRequestAction {
    readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccessAction {
    readonly type: typeof ORDER_SUCCESS;
    readonly payload: {
        number: number;
        name: string;
    }
}

export interface IOrderFailedAction {
    readonly type: typeof ORDER_FAILED;
}

export interface IClearCartAction {
    readonly type: typeof CLEAR_CART;
}

export type TConstructorActions = IAddItemToConstructorAction
    | IDeleteItemFromConstructorAction
    | IMoveItemInConstructorAction
    | IOrderRequestAction
    | IOrderSuccessAction
    | IOrderFailedAction
    | IClearCartAction;

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

export const moveItemInConstructor = (
    toIndex: number,
    fromIndex: number
): IMoveItemInConstructorAction => {
    return ({
        type: MOVE_ITEM,
        toIndex: toIndex,
        fromIndex: fromIndex
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