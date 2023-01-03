import { fetchIngredients } from "../../shared/burgerApi";
import { ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR } from "../constants/burger-constructor";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constants/burger-ingredients";

export function addItemToConstructor<TEntity>(ingredient: TEntity) {
    return ({
        type: ADD_ITEM_TO_CONSTRUCTOR,
        ingredient
    })
};

export function deleteItemFromConstructor<TEntity>(ingredient: TEntity) {
    return ({
        type: DELETE_ITEM_FROM_CONTRUCTOR,
        ingredient
    })
};

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
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
        }).catch(err => alert(`Ошибка при обращении к ресурсу – ${err.message}`))
    }
}