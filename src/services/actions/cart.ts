import { IOrderDataModel } from "../../shared/types";
import { SET_CURRENT_ORDER, DELETE_CURRENT_ORDER } from "../constants/cart";

export interface ISetCurrentOrderAction {
    readonly type: typeof SET_CURRENT_ORDER;
    readonly payload: IOrderDataModel;
}

export interface IDeleteCurrentOrderAction {
    readonly type: typeof DELETE_CURRENT_ORDER;
}

export const setCurrentOrder = (data: IOrderDataModel): ISetCurrentOrderAction => {
    return ({
        type: SET_CURRENT_ORDER,
        payload: data
    });
};

export const deleteCurrentOrder = (): IDeleteCurrentOrderAction => {
    return ({
        type: DELETE_CURRENT_ORDER
    });
}

export type TCartActions =
    | ISetCurrentOrderAction
    | IDeleteCurrentOrderAction;
