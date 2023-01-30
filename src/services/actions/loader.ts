import { LOADER_OFF, LOADER_ON } from "../constants/loader";

export interface ILoaderOnAction {
    readonly type: typeof LOADER_ON;
}

export interface ILoaderOffAction {
    readonly type: typeof LOADER_OFF;
}

export type TLoaderActions = ILoaderOnAction | ILoaderOffAction;

export const loaderOn = (): ILoaderOnAction => ({ type: LOADER_ON });
export const loaderOff = (): ILoaderOffAction => ({ type: LOADER_OFF });