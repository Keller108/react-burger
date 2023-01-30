import { IIngredientItem, TOrderID } from "../types";

export const getBurgerIngredients = (ids: TOrderID[], ingrdients: IIngredientItem[]) => ids?.map(
    (id: string) => ingrdients.filter((item: IIngredientItem) => item._id === id)
)?.flat();