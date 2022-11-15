import { ADD_BUN_TO_CONSTRUCTOR, ADD_ITEM_TO_CONSTRUCTOR } from "../actions/burger-constructor"

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
                    {...action.ingredient}
                ]
            }
        }
        default: {
            return initialState
        }
    }
}