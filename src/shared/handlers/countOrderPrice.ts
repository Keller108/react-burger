import { IIngredientItem } from "../types";

export const countOrderPrice = (intialArray: IIngredientItem[]): number => {
    let array = [...intialArray];
    let price: number = 0;
    array.forEach((item) => {
        if (item.type === 'bun') {
            return price += item.price * 2
        } else if (item.type !== 'bun') {
            return  price += item.price
        }
        return price;
    })
    return price;
};