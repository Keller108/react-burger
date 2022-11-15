export const ADD_ITEM_TO_CONSTRUCTOR = 'ADD_ITEM_TO_CONSTRUCTOR';
export const DELETE_ITEM_FROM_CONTRUCTOR = 'DELETE_ITEM_FROM_CONTRUCTOR';

export const addItemToConstructor = ingredient => ({
    type: ADD_ITEM_TO_CONSTRUCTOR,
    ingredient
});

export const deleteItemFromConstructor = ingredient => ({
    type: DELETE_ITEM_FROM_CONTRUCTOR,
    ingredient
})