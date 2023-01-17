import { IWSOrderData } from "./IWSOrderData";

export interface IWSServerResponse {
    success: boolean;
    orders: IWSOrderData[];
    total: number;
    totalToday: number;
}