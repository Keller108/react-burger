import { CHECK_USER_FAILED, CHECK_USER_REQUEST, CHECK_USER_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, PASS_FORGOT_FAILED, PASS_FORGOT_REQUEST, PASS_FORGOT_SUCCESS, PASS_RESET_FAILED, PASS_RESET_REQUEST, PASS_RESET_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, SET_DEFAULT, USER_EDIT_FAILED, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_LOGOUT_FAILED, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../constants/user/user";
import { userReducer } from "./user";

const initialState = {
    user: null,
    isLogined: false,
    request: false,
    success: false,
    error: false,
};

describe('Тестирование User Reducer', () => {
    it('Возвращает начальный стейт', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    })

    it('"SET_DEFAULT" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: SET_DEFAULT
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            error: false
        }))
    })

    it('"REGISTER_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: REGISTER_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            error: false
        }))
    })

    it('"REGISTER_SUCCESS" отрабатывает корректно', () => {
        const testUser = {
            email: 'test@test.com',
            password: '123456',
            name: 'Test User'
        };

        expect(userReducer(initialState, {
            type: REGISTER_SUCCESS,
            user: testUser
        })).toEqual(expect.objectContaining({
            user: testUser,
            success: true,
            request: false,
            error: false,
            isLogined: true
        }))
    })

    it('"REGISTER_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: REGISTER_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            error: true
        }))
    })

    it('"LOGIN_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: LOGIN_REQUEST
        })).toEqual(expect.objectContaining({
            request: true
        }))
    })

    it('"LOGIN_SUCCESS" отрабатывает корректно', () => {
        const testUser = {
            email: 'test@test.com',
            password: '123456',
            name: 'Test User'
        };

        expect(userReducer(initialState, {
            type: LOGIN_SUCCESS,
            user: testUser
        })).toEqual(expect.objectContaining({
            user: testUser,
            success: true,
            request: false,
            error: false,
            isLogined: true
        }))
    })

    it('"LOGIN_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: LOGIN_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            isLogined: false,
            error: true
        }))
    })

    it('"CHECK_USER_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: CHECK_USER_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            success: false,
            isLogined: false,
            error: false
        }))
    })

    it('"CHECK_USER_SUCCESS" отрабатывает корректно', () => {
        const testUser = {
            email: 'test@test.com',
            name: 'Test User'
        };

        expect(userReducer(initialState, {
            type: CHECK_USER_SUCCESS,
            user: testUser
        })).toEqual(expect.objectContaining({
            request: false,
            success: true,
            user: testUser,
            isLogined: true,
            error: false
        }))
    })

    it('"CHECK_USER_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: CHECK_USER_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            isLogined: false,
            error: true,
        }))
    })

    it('"PASS_FORGOT_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_FORGOT_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            success: false
        }))
    })


    it('"PASS_FORGOT_SUCCESS" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_FORGOT_SUCCESS
        })).toEqual(expect.objectContaining({
            request: false,
            success: true,
            error: false
        }))
    })

    it('"PASS_FORGOT_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_FORGOT_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            error: true
        }))
    })

    it('"PASS_RESET_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_RESET_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            success: false,
            error: false
        }))
    })

    it('"PASS_RESET_SUCCESS" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_RESET_SUCCESS
        })).toEqual(expect.objectContaining({
            request: false,
            success: true,
            error: false
        }))
    })

    it('"PASS_RESET_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: PASS_RESET_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            error: true
        }))
    })

    it('"USER_LOGOUT_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: USER_LOGOUT_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            success: false,
            error: false
        }))
    })

    it('"USER_LOGOUT_SUCCESS" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: USER_LOGOUT_SUCCESS
        })).toEqual(expect.objectContaining({
            user: null,
            isLogined: false,
            request: false,
            success: true,
            error: false
        }))
    })

    it('"USER_LOGOUT_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: USER_LOGOUT_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            error: true,
        }))
    })

    it('"USER_EDIT_REQUEST" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: USER_EDIT_REQUEST
        })).toEqual(expect.objectContaining({
            request: true,
            success: false,
            error: false,
        }))
    })

    it('"USER_EDIT_SUCCESS" отрабатывает корректно', () => {
        const testUser = {
            email: 'test@test.com',
            password: '123456',
            name: 'Test User'
        };

        expect(userReducer(initialState, {
            type: USER_EDIT_SUCCESS,
            user: testUser
        })).toEqual(expect.objectContaining({
            request: false,
            success: true,
            error: false,
            user: testUser,
            isLogined: true,
        }))
    })

    it('"USER_EDIT_FAILED" отрабатывает корректно', () => {
        expect(userReducer(initialState, {
            type: USER_EDIT_FAILED
        })).toEqual(expect.objectContaining({
            request: false,
            success: false,
            error: true,
            isLogined: false,
        }))
    })
});