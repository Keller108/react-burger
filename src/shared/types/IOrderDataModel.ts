import { TOrderID } from "./TOrderID";
import { TOrderStatus } from "./TOrderStatus";

export interface IOrderDataModel {
    _id: string;
    name: string;
    number: number;
    status: TOrderStatus;
    ingredients: TOrderID[];
    createdAt: string;
    updatedAt: string;
}