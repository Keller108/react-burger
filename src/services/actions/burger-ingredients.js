import { fetchIngredients } from "../../shared/burgerApi";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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