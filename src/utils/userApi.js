import { handleResponse } from "./handlers/handleResponse";
import {
    FORGOT_URL,
    LOGIN_URL,
    LOGOUT_URL,
    PASSWORD_RESET_URL,
    REGISTER_URL,
    TOKEN_URL,
    USER_URL
} from "./routes";

export function createUser(newUser) {
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
    }).then(handleResponse);
}

export function login(user) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    }).then(handleResponse);
}

export function getUser() {
    return fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
            'Authorization': `${localStorage.getItem('accessToken')}`
        },
    }).then(handleResponse);
}

export function checkIfExist(email) {
    return fetch(FORGOT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(email)
    }).then(handleResponse);
}

export function resetPassword(data) {
    return fetch(PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(handleResponse);
}

export function refreshToken() {
    return fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    }).then(handleResponse);
}

export function logOut() {
    return fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    }).then(handleResponse);
}