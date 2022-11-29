import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions/user";

const initialUserState = {
    user: null,
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
        default: {
            return state;
        }
    }
}