import {
    ADD_ITEM_TO_CONSTRUCTOR,
    DELETE_ITEM_FROM_CONTRUCTOR,
    ORDER_FAILED,
    ORDER_REQUEST,
    ORDER_SUCCESS
} from "../actions/burger-constructor"

const initialState = {
    buns: [],
    otherItems: [],
    totalPrice: 0,
    order: {
        data: [],
        number: null,
        request: false,
        success: false,
        error: false
    }
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CONSTRUCTOR: {
            const dataIDs = [...state.buns, ...state.otherItems, ...state.buns]
                .map(item => item._id);

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
                    order: {
                        ...state.order,
                        data: dataIDs
                    },
                    totalPrice: state.totalPrice += (action.ingredient.price * 2)
                }
            }

            return {
                ...state,
                otherItems: [
                    ...state.otherItems,
                    action.ingredient
                ],
                order: {
                    ...state.order,
                    data: dataIDs
                },
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
        case ORDER_REQUEST: {
            console.log('state order', state.order);
            return {
                ...state,
                order: {
                    ...state.order,
                    request: true
                }
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                order: {
                    ...state.order,
                    number: action.payload,
                    success: true,
                    request: false,
                    error: false,
                }
            }
        }
        case ORDER_FAILED: {
            return {
                ...state,
                order: {
                    ...state.order,
                    error: true,
                    request: false,
                    success: false
                }
            }
        }
        default: {
            return initialState
        }
    }
}