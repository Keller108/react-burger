import { handleResponse } from "./handlers/handleResponse";
import { LOGIN_URL, PASSWORD_RESET_URL, REGISTER_URL, USER_URL } from "./routes";

export function createUser(newUser) {
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(handleResponse);
}

export function login(user) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(handleResponse);
}

export function getUser() {
    return fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('accessToken')}`
        },
    }).then(handleResponse);
}

export function checkIfExist(email) {
    return fetch(PASSWORD_RESET_URL, {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(handleResponse);
}