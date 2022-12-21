import { IUserResponse } from "./IUserResponse";

export interface IUserFormActionResponse extends IUserResponse {
    accessToken: string;
    refreshToken: string;
}