export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const ADD_ITEM_TO_CONSTRUCTOR = 'ADD_ITEM_TO_CONSTRUCTOR';
export const DELETE_ITEM_FROM_CONTRUCTOR = 'DELETE_ITEM_FROM_CONTRUCTOR';

export const addItemToConstructor = (ingredient) => ({
    type: ADD_ITEM_TO_CONSTRUCTOR,
    item: ingredient
});