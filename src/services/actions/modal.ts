import { IIngredientItem } from "../../shared/types";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants/modal";

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
    readonly payload: JSX.Element | null;
    readonly data: IIngredientItem | null;
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export const openModal = (
    payload: JSX.Element,
    data: IIngredientItem | null
): IOpenModalAction => ({ type: OPEN_MODAL, payload, data });

export const closeModal = (): ICloseModalAction => ({ type: CLOSE_MODAL });