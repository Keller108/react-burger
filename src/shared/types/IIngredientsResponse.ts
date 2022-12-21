import { IIngredientItem } from "./IIngredientItem";

export interface IIngredientsResponse {
    success: boolean;
    data: IIngredientItem[];
}