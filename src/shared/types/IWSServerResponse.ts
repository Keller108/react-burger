import { IOrderDataModel } from "./IOrderDataModel";

export interface IWSServerResponse {
    success: boolean;
    orders: IOrderDataModel[];
    total: number;
    totalToday: number;
}