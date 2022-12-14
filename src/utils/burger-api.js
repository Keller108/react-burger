import { handleResponse } from "./handlers/handleResponse";
import { INGREDIENTS_PATH, ORDERS_PATH } from "./routes";

export async function fetchIngredients() {
    return fetch(INGREDIENTS_PATH)
        .then(handleResponse);
}

export async function placeAnOrder(orderData) {
    return fetch(ORDERS_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    }).then(handleResponse);
}