import { IUserModel } from "./IUserModel";

export interface IUserResponse {
    success: boolean;
    user: IUserModel;
}