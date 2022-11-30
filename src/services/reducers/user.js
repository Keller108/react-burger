import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions/user";

const initialUserState = {
    user: null,
    isLogined: false,
    request: false,
    success: false,
    error: false,
    accessToken: null,
    refreshToken: null
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
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
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
                request: true,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                request: false,
                isLogined: true,
                error: false
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
        default: {
            return state;
        }
    }
}