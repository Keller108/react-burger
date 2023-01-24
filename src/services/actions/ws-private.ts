import { createAction } from "@reduxjs/toolkit";
import { IWSServerResponse } from "../../shared/types";

export const wsPrivateConnect = createAction<{ url:string, token?: string }, 'WS_PRIVATE_CONNECT'>('WS_PRIVATE_CONNECT');
export const wsPrivateDisconnect = createAction('WS_PRIVATE_DISCONNECT');

export const wsPrivateConnecting = createAction('WS_PRIVATE_CONNECTING');
export const wsPrivateOpen = createAction('WS_PRIVATE_OPEN');
export const wsPrivateClose = createAction('WS_PRIVATE_CLOSE');
export const wsPrivateError = createAction<string, 'WS_PRIVATE_ERROR'>('WS_PRIVATE_ERROR');
export const wsPrivateGetData = createAction<IWSServerResponse, 'WS_PRIVATE_GET_DATA'>('WS_PRIVATE_GET_DATA');
export const wsPrivateSendData = createAction<string, 'WS_PRIVATE_SEND_DATA'>('WS_PRIVATE_SEND_DATA');

export type TWSPrivateActions =
    | ReturnType<typeof wsPrivateConnect>
    | ReturnType<typeof wsPrivateDisconnect>
    | ReturnType<typeof wsPrivateConnecting>
    | ReturnType<typeof wsPrivateOpen>
    | ReturnType<typeof wsPrivateClose>
    | ReturnType<typeof wsPrivateError>
    | ReturnType<typeof wsPrivateGetData>;