import { combineReducers } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';

const initialState = {
    isActive: false,
    content: null
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                isActive: true,
                content: action.payload
            }
        }
        case CLOSE_MODAL: {
            return {
                isActive: false,
                content: null
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