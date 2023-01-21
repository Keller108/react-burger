import { TModal } from "../../shared/types/TModal";
import { CLOSE_MODAL, OPEN_MODAL } from "../constants/modal";

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
    readonly payload: TModal;
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export const openModal = (type: TModal): IOpenModalAction => ({ type: OPEN_MODAL, payload: type });

export const closeModal = (): ICloseModalAction => ({ type: CLOSE_MODAL });