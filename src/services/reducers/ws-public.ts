import { createReducer } from "@reduxjs/toolkit";
import { IOrderDataModel, WebSocketStatus } from "../../shared/types";
import { wsPublicClose, wsPublicConnecting, wsPublicError, wsPublicGetData, wsPublicOpen } from "../actions/ws-public";

export type WSPublicStore = {
    wsStatus: WebSocketStatus;
    success: boolean;
    orderData: IOrderDataModel[];
    connectingError: string;
    total: number;
    totalToday: number;
};

const initialState: WSPublicStore = {
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

export const wsPublicReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsPublicConnecting, state => {
            state.wsStatus = WebSocketStatus.CONNECTING;
        })
        .addCase(wsPublicOpen, state => {
            state.wsStatus = WebSocketStatus.ONLINE;
            state.connectingError = '';
        })
        .addCase(wsPublicClose, state => {
            state.wsStatus = WebSocketStatus.OFFLINE;
        })
        .addCase(wsPublicError, (state, action) => {
            state.connectingError = action.payload;
        })
        .addCase(wsPublicGetData, (state, action) => {
            state.orderData = action.payload.orders;
            state.success = action.payload.success;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
})