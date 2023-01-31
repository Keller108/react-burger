import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constants/burger-ingredients";
import { SET_CURRENT_INGREDIENT } from "../constants/burger-ingredients/burger-ingredients";
import { ingredientsReducer } from "./burger-ingredients";

const initialState = {
    ingredientItems: [],
    ingredientRequest: false,
    ingredientFailed: false,
    currentIngredient: null
};

describe('Тестирование Burger Ingredients Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    })

    it('"GET_INGREDIENTS_REQUEST" отрабатывает корректно', () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual(expect.objectContaining({
            ingredientRequest: true
        }))
    })

    it('"GET_INGREDIENTS_SUCCESS" отрабатывает корректно', () => {
        const testItem = [{
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
        }];
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            items: testItem
        })).toEqual(expect.objectContaining({
            ingredientItems: testItem,
            ingredientFailed: false,
            ingredientRequest: false,
        }))
    })

    it('"GET_INGREDIENTS_FAILED" отрабатывает корректно', () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_FAILED
        })).toEqual(expect.objectContaining({
            ingredientRequest: false,
            ingredientFailed: true
        }))
    })

    it('"SET_CURRENT_INGREDIENT" отрабатывает корректно', () => {
        const testItem = [{
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
        }];
        expect(ingredientsReducer(initialState, {
            type: SET_CURRENT_INGREDIENT,
            payload: testItem
        })).toEqual(expect.objectContaining({
            currentIngredient: testItem
        }))
    })
})