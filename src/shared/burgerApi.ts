import { handleResponse } from "./handlers";
import { INGREDIENTS_PATH, ORDERS_PATH } from "./routes";
import { IIngredientsResponse, TOrderData } from "./types";

export const fetchIngredients = async (): Promise<IIngredientsResponse> => {
    return fetch(INGREDIENTS_PATH)
        .then(handleResponse);
};

export const placeAnOrder = async (
    orderData: TOrderData
): Promise<{ success: boolean; name: string; order: { number: number } }> => {
    return fetch(ORDERS_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    }).then(handleResponse);
};