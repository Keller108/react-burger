import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/burger-ingredients';

const initialState = {
    ingredientItems: [],
    ingredientRequest: false,
    ingredientFailed: false,
    modal: {
        isActive: false,
        content: null
    }
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modal: {
                    isActive: true,
                    content: action.payload
                }
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modal: {
                    isActive: false,
                    content: null
                }
            }
        }
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