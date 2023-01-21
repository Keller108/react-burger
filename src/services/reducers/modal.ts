import { TModalActions } from '../actions/modal';
import { TModal } from '../../shared/types/TModal';

type TModalState = {
    isActive: boolean;
    modalType: TModal | null;
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