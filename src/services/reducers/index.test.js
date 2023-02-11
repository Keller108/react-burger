import { appReducer, tabReducer } from ".";
import { LOADER_OFF, LOADER_ON } from "../constants/loader";
import { SWITCH_TAB } from "../constants/tab";

const initialTabState = {
    tabs: ['bun', 'sauce', 'main'],
    activeTab: 'bun'
};

describe('Тестирование таб редьюсера', () => {
    it('Возвращает начальный стейт', () => {
        expect(tabReducer(undefined, {})).toEqual(initialTabState);
    })

    it('"SWITCH_TAB" отрабатывает корректно', () => {
        const testTab = 'sauce';

        expect(tabReducer(initialTabState, {
            type: SWITCH_TAB,
            payload: testTab
        })).toEqual(expect.objectContaining({
            activeTab: testTab
        }))
    })
});

const initialAppState = {
    isLoading: false
};

describe('Тестирование апп редьюсера', () => {
    it('Возвращает начальный стейт', () => {
        expect(appReducer(undefined, {})).toEqual(initialAppState);
    })

    it('"LOADER_ON" отрабатывает корректно', () => {
        expect(appReducer(initialAppState, {
            type: LOADER_ON
        })).toEqual(expect.objectContaining({
            isLoading: true
        }))
    })

    it('"LOADER_OFF" отрабатывает корректно', () => {
        expect(appReducer(initialAppState, {
            type: LOADER_OFF
        })).toEqual(expect.objectContaining({
            isLoading: false
        }))
    })
});