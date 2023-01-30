import { IIngredientItem } from '../../shared/types';
import { TIngredientsActions } from '../actions';
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from '../constants/burger-ingredients';
import { SET_CURRENT_INGREDIENT } from '../constants/burger-ingredients/burger-ingredients';

type TIngredientStore = {
    ingredientItems: IIngredientItem[];
    ingredientRequest: boolean;
    ingredientFailed: boolean;
    currentIngredient: IIngredientItem | null;
};

const initialState: TIngredientStore = {
    ingredientItems: [],
    ingredientRequest: false,
    ingredientFailed: false,
    currentIngredient: null
};

export const ingredientsReducer = (
    state: TIngredientStore = initialState,
    action: TIngredientsActions
): TIngredientStore => {
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
                ingredientRequest: false,
                ingredientFailed: true
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.payload
            }
        }
        default: {
            return state
        }
    }
};