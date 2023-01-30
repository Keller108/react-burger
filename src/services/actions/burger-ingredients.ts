import { fetchIngredients } from "../../shared/burgerApi";
import { AppDispatch, AppThunk, IIngredientItem } from "../../shared/types";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../constants/burger-ingredients";
import { SET_CURRENT_INGREDIENT } from "../constants/burger-ingredients/burger-ingredients";

export interface IIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: IIngredientItem[];
}

export interface IIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly payload: IIngredientItem;
}

export type TIngredientsActions = IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsFailedAction
    | ISetIngredientAction;

export const setCurrentIngredient = (data: IIngredientItem): ISetIngredientAction => {
    return ({ type: SET_CURRENT_INGREDIENT, payload: data })
}

export const getIngredients = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetchIngredients().then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                items: res.data
            })
            let items = JSON.stringify(res.data);
            localStorage.setItem('ingredients', items);
        } else {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        }
    }).catch(err => alert(`Ошибка при обращении к ресурсу – ${err}`));
}