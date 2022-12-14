import { combineReducers } from 'redux';
import { CLOSE_MODAL, LOADER_OFF, LOADER_ON, OPEN_MODAL, SWITCH_TAB } from '../actions';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { userReducer } from './user';

const initialModalState = {
    isActive: false,
    content: null,
    currentData: null
};

const modalReducer = (state = initialModalState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                isActive: true,
                content: action.payload,
                currentData: action.data
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
            return state;
        }
    }
};


const initialTabState = {
    tabs: ['bun', 'sauce', 'main'],
    activeTab: 'bun'
};

const tabReducer = (state = initialTabState, action) => {
    switch (action.type) {
        case SWITCH_TAB: {
            return {
                ...state,
                activeTab: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

const initialAppState = {
    isLoading: false
};

const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case LOADER_ON: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOADER_OFF: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    appStore: appReducer,
    userStore: userReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer,
    tabs: tabReducer
});