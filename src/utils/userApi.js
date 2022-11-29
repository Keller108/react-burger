import { handleResponse } from "./handlers/handleResponse";
import { REGISTER_URL } from "./routes";

export async function createUser(user) {
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(handleResponse);
}