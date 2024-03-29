import { createAction } from "@reduxjs/toolkit";
import { IWSServerResponse } from "../../shared/types";

export const wsPublicConnect = createAction<{ url: string }, 'WS_PUBLIC_CONNECT'>('WS_PUBLIC_CONNECT');
export const wsPublicDisconnect = createAction('WS_PUBLIC_DISCONNECT');

export const wsPublicConnecting = createAction('WS_PUBLIC_CONNECTING');
export const wsPublicOpen = createAction('WS_PUBLIC_OPEN');
export const wsPublicClose = createAction('WS_PUBLIC_CLOSE');
export const wsPublicError = createAction<string, 'WS_PUBLIC_ERROR'>('WS_PUBLIC_ERROR');
export const wsPublicGetData = createAction<IWSServerResponse, 'WS_PUBLIC_GET_DATA'>('WS_PUBLIC_GET_DATA');

export type TWSPublicActions =
    | ReturnType<typeof wsPublicConnect>
    | ReturnType<typeof wsPublicDisconnect>
    | ReturnType<typeof wsPublicConnecting>
    | ReturnType<typeof wsPublicOpen>
    | ReturnType<typeof wsPublicClose>
    | ReturnType<typeof wsPublicError>
    | ReturnType<typeof wsPublicGetData>;