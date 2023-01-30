import { IUserModel } from "../../shared/types";
import { TUserActions } from "../actions";
import {
    CHECK_USER_FAILED,
    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    PASS_FORGOT_FAILED,
    PASS_FORGOT_REQUEST,
    PASS_FORGOT_SUCCESS,
    PASS_RESET_FAILED,
    PASS_RESET_REQUEST,
    PASS_RESET_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_DEFAULT,
    USER_EDIT_FAILED,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_LOGOUT_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS
} from "../constants/user/user";

type TUserStore = {
    user: IUserModel | null;
    isLogined: boolean;
    request: boolean;
    success: boolean;
    error: boolean;
};

const initialUserState: TUserStore = {
    user: null,
    isLogined: false,
    request: false,
    success: false,
    error: false,
};

export const userReducer = (
    state: TUserStore = initialUserState,
    action: TUserActions
): TUserStore => {
    switch (action.type) {
        case SET_DEFAULT: {
            return {
                ...state,
                request: false,
                success: false,
                error: false
            }
        }
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
                isLogined: true
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
                isLogined: true
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
                    name: action.user.name
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
        case PASS_FORGOT_REQUEST: {
            return {
                ...state,
                request: true,
                success: false
            }
        }
        case PASS_FORGOT_SUCCESS: {
            return {
                ...state,
                request: false,
                success: true,
                error: false
            }
        }
        case PASS_FORGOT_FAILED: {
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
        case USER_LOGOUT_REQUEST: {
            return {
                ...state,
                request: true,
                success: false,
                error: false
            }
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                user: null,
                isLogined: false,
                request: false,
                success: true,
                error: false
            }
        }
        case USER_LOGOUT_FAILED: {
            return {
                ...state,
                request: false,
                success: false,
                error: true,
            }
        }
        case USER_EDIT_REQUEST: {
            return {
                ...state,
                request: true,
                success: false,
                error: false,
            }
        }
        case USER_EDIT_SUCCESS: {
            return {
                ...state,
                request: false,
                success: true,
                error: false,
                user: {
                    ...state.user,
                    email: action.user.email,
                    name: action.user.name,
                    password: action.user.password
                },
                isLogined: true,
            }
        }
        case USER_EDIT_FAILED: {
            return {
                ...state,
                request: false,
                success: false,
                error: true,
                isLogined: false,
            }
        }
        default: {
            return state;
        }
    }
}