import { IUserResponse } from "./IUserResponse";

export interface ILoginResponse extends IUserResponse {
    accessToken: string;
    refreshToken: string;
}