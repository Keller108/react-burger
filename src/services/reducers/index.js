import { combineReducers } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';

const initialModalState = {
    isActive: false,
    content: null
};

const modalReducer = (state = initialModalState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                isActive: true,
                content: action.payload
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                isActive: false,
                content: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer
});