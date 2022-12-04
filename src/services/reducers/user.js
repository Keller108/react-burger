import {
    CHECK_USER_FAILED,
    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    PASS_RESET_FAILED,
    PASS_RESET_REQUEST,
    PASS_RESET_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    TOKEN_REFRESH,
    USER_EXISTS_FAILED,
    USER_EXISTS_REQUEST,
    USER_EXISTS_SUCCESS
} from "../actions/user";

const initialUserState = {
    user: null,
    isLogined: false,
    request: false,
    success: false,
    error: false,
    accessToken: null,
    token: null
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                request: true,
                error: false
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                success: true,
                request: false,
                error: false,
                isLogined: true,
                accessToken: action.accessToken,
                token: action.token
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                request: false,
                error: true
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                request: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.user,
                success: true,
                request: false,
                error: false,
                isLogined: true,
                accessToken: action.accessToken,
                token: action.token
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                request: false,
                isLogined: false,
                error: true
            }
        }
        case CHECK_USER_REQUEST: {
            return {
                ...state,
                request: true,
                success: false,
                isLogined: false,
                error: false
            }
        }
        case CHECK_USER_SUCCESS: {
            return {
                ...state,
                request: false,
                success: true,
                user: {
                    ...state.user,
                    email: action.user.email,
                    name: action.user.name,
                    password: action.user.password
                },
                isLogined: true,
                error: false
            }
        }
        case CHECK_USER_FAILED: {
            return {
                ...state,
                request: false,
                success: false,
                isLogined: false,
                error: true,
            }
        }
        case USER_EXISTS_REQUEST: {
            return {
                ...state,
                request: true,
                success: false
            }
        }
        case USER_EXISTS_SUCCESS: {
            return {
                ...state,
                request: false,
                success: true,
                error: false
            }
        }
        case USER_EXISTS_FAILED: {
            return {
                ...state,
                request: false,
                success: false,
                error: true
            }
        }

        case PASS_RESET_REQUEST: {
            return {
                ...state,
                request: true,
                success: false,
                error: false
            }
        }
        case PASS_RESET_SUCCESS: {
            return {
                ...state,
                request: false,
                success: true,
                error: false
            }
        }
        case PASS_RESET_FAILED: {
            return {
                ...state,
                request: false,
                success: false,
                error: true
            }
        }
        case TOKEN_REFRESH: {
            return {
                ...state,
                accessToken: action.accessToken,
                token: action.token
            }
        }
        default: {
            return state;
        }
    }
}