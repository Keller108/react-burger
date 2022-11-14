export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const ADD_ITEM_TO_CONSTRUCTOR = 'ADD_ITEM_TO_CONSTRUCTOR';
export const DELETE_ITEM_FROM_CONTRUCTOR = 'DELETE_ITEM_FROM_CONTRUCTOR';

export function addItemsToConstructor(ingredient) {
    return function(dispatch) {
        dispatch({
            type: ADD_BUN_TO_CONSTRUCTOR,
            item: ingredient
        })
    }
}