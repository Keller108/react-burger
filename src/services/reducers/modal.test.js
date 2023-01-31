import { modalReducer } from "./modal";

const initialModalState = {
    isActive: false,
    modalType: null
};

describe('Modal Reducer', () => {
    it('should returns the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(initialModalState);
    })
});