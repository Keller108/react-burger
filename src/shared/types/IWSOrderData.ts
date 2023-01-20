import { TOrderID } from "./TOrderID";
import { TORderStatus } from "./TORderStatus";

export interface IWSOrderData {
    _id: string;
    name: string;
    number: number;
    status: TORderStatus;
    ingredients: TOrderID[];
    createdAt: string;
    updatedAt: string;
}