import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

const initialState = {
    ingredientItems: [],
    ingredientRequest: false,
    ingredientFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientItems: action.items,
                ingredientRequest: false,
                ingredientFailed: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientItems: action.items,
                ingredientRequest: false,
                ingredientFailed: true
            }
        }
        default: {
            return state
        }
    }
};