import { ModalType } from "../../shared/types";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants/modal";
import { modalReducer } from "./modal";

const initialModalState = {
    isActive: false,
    modalType: null
};

describe('Тестирование Modal Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(modalReducer(undefined, {})).toEqual(initialModalState);
    })

    it('"OPEN_MODAL" отрабатывает корректно', () => {
        expect(modalReducer(initialModalState, {
            type: OPEN_MODAL,
            payload: ModalType.INGREDIENT_VIEW
        })).toEqual(expect.objectContaining({
            isActive: true,
            modalType: ModalType.INGREDIENT_VIEW
        }))
    })

    it('"CLOSE_MODAL" отрабатывает корректно', () => {
        expect(modalReducer(initialModalState, {
            type: CLOSE_MODAL
        })).toEqual(expect.objectContaining({
            isActive: false,
            modalType: null
        }))
    })
});