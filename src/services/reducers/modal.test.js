import { modalReducer } from "./modal";

const initialModalState = {
    isActive: false,
    modalType: null
};

describe('Тестирование Modal Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(modalReducer(undefined, {})).toEqual(initialModalState);
    })
});