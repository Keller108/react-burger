import { TOrderData } from "./TOrderData";
import { TORderStatus } from "./TORderStatus";

export interface IWSOrderData {
    ingredients: TOrderData[] | [];
    _id: string;
    status: TORderStatus | null;
    number: number;
    createdAt: string;
    updatedAt: string;
}