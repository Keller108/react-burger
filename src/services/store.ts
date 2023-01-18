import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
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
    rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(wsPublicMiddleware)
    }
})

// export const store = createStore(
//     rootReducer,
//     composeWithDevTools(
//         applyMiddleware(
//             thunk,
//             socketMiddleware({
//                 wsConnect: wsPublicConnect,
//                 wsDisconnect: wsPublicDisconnect,
//                 wsConnecting: wsPublicConnecting,
//                 onOpen: wsPublicOpen,
//                 onClose: wsPublicClose,
//                 onError: wsPublicError,
//                 onData: wsPublicGetData,
//             })
//         )
//     )
// )