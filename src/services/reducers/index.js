import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer
});