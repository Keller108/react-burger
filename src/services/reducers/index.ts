import { combineReducers } from 'redux';
import { LOADER_OFF, LOADER_ON } from '../constants/loader';
import { SWITCH_TAB } from '../constants/tab';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { userReducer } from './user';
import { TModalActions } from '../actions/modal';
import { ITabSwitchAction } from '../actions/tab';
import { TLoaderActions } from '../actions/loader';

type TInitialModalState = {
    isActive: boolean;
    content: JSX.Element | null;
    currentData: null | string;
};

type TInitialTabState = {
    readonly tabs: ReadonlyArray<string>;
    readonly activeTab: string;
};

const initialModalState: TInitialModalState = {
    isActive: false,
    content: null,
    currentData: null
};

const modalReducer = (
    state: TInitialModalState = initialModalState,
    action: TModalActions
) => {
    switch (action.type) {
        case 'OPEN_MODAL': {
            return {
                ...state,
                isActive: true,
                content: action.payload,
                currentData: action.data
            }
        }
        case 'CLOSE_MODAL': {
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

const initialTabState: TInitialTabState = {
    tabs: ['bun', 'sauce', 'main'],
    activeTab: 'bun'
};

const tabReducer = (
    state: TInitialTabState = initialTabState,
    action: ITabSwitchAction
) => {
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

const appReducer = (state = initialAppState, action: TLoaderActions) => {
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