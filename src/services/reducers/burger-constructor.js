import { ADD_BUN_TO_CONSTRUCTOR, ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONTRUCTOR } from "../actions/burger-constructor"

const initialState = {
    buns: [],
    otherItems: [],
    totalPrice: 0
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CONSTRUCTOR: {
            if (action.ingredient.type === 'bun') {
                if (state.buns.length) {
                    state.totalPrice = 0;
                    state.buns = [];
                }
                return {
                    ...state,
                    buns: [
                        action.ingredient
                    ],
                    totalPrice: state.totalPrice += (action.ingredient.price * 2)
                }
            }

            return {
                ...state,
                otherItems: [
                    ...state.otherItems,
                    action.ingredient
                ],
                totalPrice: state.totalPrice += action.ingredient.price
            }
        }
        case DELETE_ITEM_FROM_CONTRUCTOR: {
            const priceToDecrease = [...state.otherItems]
                .find(item => item._id === action.ingredient._id).price;

            return {
                ...state,
                otherItems: [...state.otherItems]
                    .filter(item => item._id !== action.ingredient._id),
                totalPrice: state.totalPrice -= priceToDecrease
            }
        }
        default: {
            return initialState
        }
    }
}