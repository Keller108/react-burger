import { fetchIngredients } from "../../shared/burgerApi";
import { AppDispatch, AppThunk, IIngredientItem } from "../../shared/types";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../constants/burger-ingredients";

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

export type TIngredientsActions = IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsFailedAction;

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