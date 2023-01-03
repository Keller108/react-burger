import { IConstructorItem } from "../../shared/types";
import { ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR } from "../constants/burger-constructor";

export interface IAddItemToConstructorAction {
    readonly type: typeof ADD_ITEM_TO_CONSTRUCTOR;
    readonly ingredient: IConstructorItem;
}

export interface IDeleteItemFromConstructorAction {
    readonly type: typeof DELETE_ITEM_FROM_CONTRUCTOR;
    readonly ingredient: IConstructorItem;
}

export const addItemToConstructor = (ingredient: IConstructorItem): IAddItemToConstructorAction => {
    return ({
        type: ADD_ITEM_TO_CONSTRUCTOR,
        ingredient: ingredient
    })
};

export const deleteItemFromConstructor = (ingredient: IConstructorItem): IDeleteItemFromConstructorAction => {
    return ({
        type: DELETE_ITEM_FROM_CONTRUCTOR,
        ingredient: ingredient
    })
};