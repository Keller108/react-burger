export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_PATH = `${BASE_URL}/ingredients`;

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export function fetchIngredients() {
    return fetch(INGREDIENTS_PATH)
        .then(handleResponse);
}