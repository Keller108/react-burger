import { handleResponse } from "./handlers/handleResponse";
import { LOGIN_URL, REGISTER_URL } from "./routes";

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