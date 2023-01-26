import { TModalActions } from '../actions/modal';
import { TModal } from '../../shared/types/TModal';
import { CLOSE_MODAL, OPEN_MODAL } from '../constants/modal';

type TModalStore = {
    isActive: boolean;
    modalType: TModal | null;
};

const initialModalState: TModalStore = {
    isActive: false,
    modalType: null
};

export const modalReducer = (
    state: TModalStore = initialModalState,
    action: TModalActions
): TModalStore => {
    switch (action.type) {
        case OPEN_MODAL: {
            if (action) {
                return {
                    ...state,
                    isActive: true,
                    modalType: action.payload
                }
            }
            return state;
        }
        case CLOSE_MODAL: {
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