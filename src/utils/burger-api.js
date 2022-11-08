export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_PATH = `${BASE_URL}/ingredients`;
export const ORDERS_PATH = `${BASE_URL}/orders`;

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export async function fetchIngredients() {
    return fetch(INGREDIENTS_PATH)
        .then(handleResponse);
}

export async function placeAnOrder(orderData) {
    return fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    }).then(handleResponse);
}