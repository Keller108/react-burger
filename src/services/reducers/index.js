import { combineReducers } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';

const initialState = {
    modal: {
        isActive: false,
        content: null
    }
};

const modalReducer = (state = initialState, action) => {
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

        default: {
            return initialState
        }
    }
}

export const rootReducer = combineReducers({
    modal: modalReducer,
    ingredients: ingredientsReducer,
    constructor: constructorReducer
});