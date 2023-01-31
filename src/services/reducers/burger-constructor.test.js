import { ADD_ITEM_TO_CONSTRUCTOR, CLEAR_CART, DELETE_ITEM_FROM_CONTRUCTOR, ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/burger-constructor";
import { constructorReducer } from "./burger-constructor";

const initialState = {
    buns: [],
    otherItems: [],
    totalPrice: 0,
    order: {
        name: '',
        number: 0,
        request: false,
        success: false,
        error: false
    }
};

describe('Тестирование Burger Constructor Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState);
    })

    it('"ADD_ITEM_TO_CONSTRUCTOR" отрабатывает корректно', () => {
        const testItem = {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            _id: "60cb6564fce49c00269d4018"
        };

        expect(constructorReducer(initialState, {
            type: ADD_ITEM_TO_CONSTRUCTOR,
            ingredient: testItem
        })).toEqual(expect.objectContaining({
            buns: [testItem],
            totalPrice: testItem.price * 2
        }))
    })

    it('"DELETE_ITEM_FROM_CONTRUCTOR" отрабатывает корректно', () => {
        const testItem = {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            _id: "60cb6564fce49c00269d4018",
            uuid: '12345'
        };

        expect(constructorReducer(initialState, {
            type: DELETE_ITEM_FROM_CONTRUCTOR,
            ingredient: testItem
        })).toEqual(expect.objectContaining({
            buns: [],
            totalPrice: 0
        }))
    })

    it('"ORDER_REQUEST" отрабатывает корректно', () => {
        expect(constructorReducer(initialState, {
            type: ORDER_REQUEST
        })).toEqual(expect.objectContaining({
            order: {
                ...initialState.order,
                name: "",
                request: true
            }
        }))
    })

    it('"ORDER_SUCCESS" отрабатывает корректно', () => {
        const testOrder = {
            name: 'test order',
            number: 108108
        };

        expect(constructorReducer(initialState, {
            type: ORDER_SUCCESS,
            payload: testOrder
        })).toEqual(expect.objectContaining({
            order: {
                ...initialState.order,
                name: testOrder.name,
                number: testOrder.number,
                success: true,
                request: false,
                error: false,
            }
        }))
    })

    it('"ORDER_FAILED" отрабатывает корректно', () => {
        expect(constructorReducer(initialState, {
            type: ORDER_FAILED
        })).toEqual(expect.objectContaining({
            order: {
                ...initialState.order,
                error: true,
                name: "",
                request: false,
                success: false
            }
        }))
    })

    it('"CLEAR_CART" отрабатывает корректно', () => {
        expect(constructorReducer(initialState, {
            type: CLEAR_CART
        })).toEqual(expect.objectContaining({
            totalPrice: 0
        }))
    })
});