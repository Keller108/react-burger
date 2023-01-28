import { IOrderDataModel } from "../../shared/types"
import { TCartActions } from "../actions";
import { DELETE_CURRENT_ORDER, SET_CURRENT_ORDER } from "../constants/cart";

type CartStore = {
    currentOrder: IOrderDataModel | null;
};

const initialState: CartStore = {
    currentOrder: null
};

export const cartReducer = (state = initialState, action: TCartActions): CartStore => {
    switch (action.type) {
        case SET_CURRENT_ORDER: {
            return {
                ...state,
                currentOrder: action.payload
            }
        }
        case DELETE_CURRENT_ORDER: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}