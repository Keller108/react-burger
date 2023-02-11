import { DELETE_CURRENT_ORDER, SET_CURRENT_ORDER } from "../constants/cart";
import { cartReducer } from "./cart";

const initialCartState = {
    currentOrder: null
};

describe('Тестирование Cart Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(cartReducer(undefined, {})).toEqual(initialCartState);
    })

    it('"SET_CURRENT_ORDER" отрабатывает корректно', () => {
        const testOrder = {
            _id: '123',
            name: 'Test order',
            number: 1234,
            status: 'done',
            ingredients: [
                'qwerty',
                'wasd'
            ],
            createdAt: '31.01.2023',
            updatedAt: '31.01.2023'
        };
        expect(cartReducer(initialCartState, {
            type: SET_CURRENT_ORDER,
            payload: testOrder
        })).toEqual(expect.objectContaining({
            currentOrder: testOrder
        }))
    })

    it('"DELETE_CURRENT_ORDER" отрабатывает корректно', () => {
        expect(cartReducer(initialCartState, {
            type: DELETE_CURRENT_ORDER
        })).toEqual(expect.objectContaining({
            currentOrder: null
        }))
    })
});