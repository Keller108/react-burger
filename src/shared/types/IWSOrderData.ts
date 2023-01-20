import { TOrderData } from "./TOrderData";
import { TORderStatus } from "./TORderStatus";

export interface IWSOrderData {
    _id: string;
    name: string;
    number: number;
    status: TORderStatus;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}