import { configureStore } from "@reduxjs/toolkit";
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

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(wsPublicMiddleware)
    }
});