import { handleResponse } from "./handlers";
import {
    FORGOT_URL,
    LOGIN_URL,
    LOGOUT_URL,
    PASSWORD_RESET_URL,
    REGISTER_URL,
    TOKEN_URL,
    USER_URL
} from "./routes";
import {
    IUserModel,
    IUserFormActionResponse,
    IUserResponse,
    IForgotResponse,
    IResetResponse,
    ILogoutResponse,
    ITokenResponse
} from "./types";

export const createUser = async (
    newUser: IUserModel
): Promise<IUserFormActionResponse> => {
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
    }).then(handleResponse);
};

export const login = async (
    user: IUserModel
): Promise<IUserFormActionResponse> => {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(handleResponse);
}

export const getUser = async (): Promise<IUserResponse> => {
    return fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
            'Authorization': `${localStorage.getItem('accessToken')}`
        },
    }).then(handleResponse);
}

export const patchUser = async (
    form: IUserModel
): Promise<IUserResponse> => {
    return fetch(USER_URL, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
            'Authorization': `${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(form)
    }).then(handleResponse);
}

export const checkIfExist = async (
    data: { email: string }
): Promise<IForgotResponse> => {
    return fetch(FORGOT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(handleResponse);
}

export const resetPassword = async (
    data: { password: string, token: string }
): Promise<IResetResponse> => {
    return fetch(PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(handleResponse);
}

export const refreshToken = async (): Promise<ITokenResponse> => {
    return fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    }).then(handleResponse);
}

export const logOut = async (): Promise<ILogoutResponse> => {
    return fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    }).then(handleResponse);
}