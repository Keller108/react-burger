import { configureStore } from "@reduxjs/toolkit";
import { wsPrivateClose, wsPrivateConnect, wsPrivateConnecting, wsPrivateDisconnect, wsPrivateError, wsPrivateGetData, wsPrivateOpen } from "./actions/ws-private";
import { wsPublicClose, wsPublicConnect, wsPublicConnecting, wsPublicDisconnect, wsPublicError, wsPublicGetData, wsPublicOpen } from "./actions/ws-public";
import { socketMiddleware } from "./middleware";
import { rootReducer } from "./reducers";

const wsPublicMiddleware = socketMiddleware({
    wsConnect: wsPublicConnect,
    wsDisconnect: wsPublicDisconnect,
    wsConnecting: wsPublicConnecting,
    onOpen: wsPublicOpen,
    onClose: wsPublicClose,
    onError: wsPublicError,
    onData: wsPublicGetData,
});

const wsPrivateMiddleware = socketMiddleware({
    wsConnect: wsPrivateConnect,
    wsDisconnect: wsPrivateDisconnect,
    wsConnecting: wsPrivateConnecting,
    onOpen: wsPrivateOpen,
    onClose: wsPrivateClose,
    onError: wsPrivateError,
    onData: wsPrivateGetData,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(wsPublicMiddleware, wsPrivateMiddleware)
    }
});