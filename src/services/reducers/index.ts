import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { userReducer } from './user';
import { ITabSwitchAction } from '../actions/tab';
import { TLoaderActions } from '../actions/loader';
import { wsPublicReducer } from './ws-public';
import { modalReducer } from './modal';
import { wsPrivateReducer } from './ws-private';
import { LOADER_OFF, LOADER_ON } from '../constants/loader';

type TInitialTabState = {
    readonly tabs: ReadonlyArray<string>;
    readonly activeTab: string;
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
        case 'SWITCH_TAB': {
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

type TInitialAppState = {
    isLoading: boolean;
};

const initialAppState: TInitialAppState = {
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
    tabs: tabReducer,
    wsPublic: wsPublicReducer,
    wsPrivate: wsPrivateReducer
});