import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { wsPublicClose, wsPublicConnect, wsPublicConnecting, wsPublicDisconnect, wsPublicError, wsPublicGetData, wsPublicOpen } from "./actions/ws-public";
import { socketMiddleware } from "./middleware";
import { rootReducer } from "./reducers";

const wsUrl = 'wss://norma.nomoreparties.space';

const wsPublicMiddleware = socketMiddleware({
    wsConnect: wsPublicConnect,
    wsDisconnect: wsPublicDisconnect,
    wsConnecting: wsPublicConnecting,
    onOpen: wsPublicOpen,
    onClose: wsPublicClose,
    onError: wsPublicError,
    onData: wsPublicGetData,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware({
        wsConnect: wsPublicConnect,
        wsDisconnect: wsPublicDisconnect,
        wsConnecting: wsPublicConnecting,
        onOpen: wsPublicOpen,
        onClose: wsPublicClose,
        onError: wsPublicError,
        onData: wsPublicGetData,
    })

));

export const store = createStore(rootReducer, enhancer);