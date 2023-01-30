import { createReducer } from "@reduxjs/toolkit";
import { IOrderDataModel, WebSocketStatus } from "../../shared/types";
import { wsPrivateClose, wsPrivateConnecting, wsPrivateError, wsPrivateGetData, wsPrivateOpen } from "../actions/ws-private";

export type WSPrivateStore = {
    wsStatus: WebSocketStatus;
    success: boolean;
    orderData: IOrderDataModel[];
    connectingError: string;
    total: number;
    totalToday: number;
};

const initialState: WSPrivateStore = {
    wsStatus: WebSocketStatus.OFFLINE,
    success: false,
    orderData: [{
        _id: '',
        name: '',
        number: 0,
        status: 'none',
        ingredients: [],
        createdAt: '',
        updatedAt: ''
    }],
    connectingError: '',
    total: 0,
    totalToday: 0
};

export const wsPrivateReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsPrivateConnecting, state => {
            state.wsStatus = WebSocketStatus.CONNECTING;
        })
        .addCase(wsPrivateOpen, state => {
            state.wsStatus = WebSocketStatus.ONLINE;
            state.connectingError = '';
        })
        .addCase(wsPrivateClose, state => {
            state.wsStatus = WebSocketStatus.OFFLINE;
        })
        .addCase(wsPrivateError, (state, action) => {
            state.connectingError = action.payload;
        })
        .addCase(wsPrivateGetData, (state, action) => {
            state.orderData = action.payload.orders;
            state.success = action.payload.success;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
})