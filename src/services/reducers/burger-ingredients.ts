import { IIngredientItem } from '../../shared/types';
import { TIngredientsActions } from '../actions';

type TInitialState = {
    ingredientItems: IIngredientItem[];
    ingredientRequest: boolean;
    ingredientFailed: boolean;
};

const initialState = {
    ingredientItems: [],
    ingredientRequest: false,
    ingredientFailed: false
};

export const ingredientsReducer = (
    state: TInitialState = initialState,
    action: TIngredientsActions
) => {
    switch (action.type) {
        case 'GET_INGREDIENTS_REQUEST': {
            return {
                ...state,
                ingredientRequest: true
            }
        }
        case 'GET_INGREDIENTS_SUCCESS': {
            return {
                ...state,
                ingredientItems: action.items,
                ingredientRequest: false,
                ingredientFailed: false
            }
        }
        case 'GET_INGREDIENTS_FAILED': {
            return {
                ...state,
                ingredientRequest: false,
                ingredientFailed: true
            }
        }
        default: {
            return state
        }
    }
};