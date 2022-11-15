import { ADD_BUN_TO_CONSTRUCTOR, ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR } from "../actions/burger-constructor"

const initialState = {
    buns: [],
    otherItems: [],
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CONSTRUCTOR: {
            return {
                ...state,
                otherItems: [
                    ...state.otherItems,
                    action.ingredient
                ]
            }
        }
        case DELETE_ITEM_FROM_CONTRUCTOR: {
            return {
                ...state,
                otherItems: [...state.otherItems].filter(item => item._id !== action.ingredient._id)
            }
        }
        default: {
            return initialState
        }
    }
}