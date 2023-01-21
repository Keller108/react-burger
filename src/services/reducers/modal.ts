import { TModalActions } from '../actions/modal';
import { IIngredientItem } from '../../shared/types';

type TModalState = {
    isActive: boolean;
    modalType: 'ingredient' | 'order' | null;
};

const initialModalState: TModalState = {
    isActive: false,
    modalType: null
};

export const modalReducer = (
    state: TModalState = initialModalState,
    action: TModalActions
): TModalState => {
    switch (action.type) {
        case 'OPEN_MODAL': {
            if (action) {
                return {
                    ...state,
                    isActive: true,
                    modalType: action.payload
                }
            }
            return state;
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                isActive: false,
                modalType: null
            }
        }
        default: {
            return state;
        }
    }
};