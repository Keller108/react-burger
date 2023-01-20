import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../shared/types";

export type TWSActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsSendData?: ActionCreatorWithPayload<any>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onData: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}, RootState>=> {
    return store => {
      let socket: WebSocket | null = null;

      return next => action => {
        const { dispatch } = store;
        const {
            wsConnect,
            onOpen,
            onClose,
            onError,
            onData,
            wsConnecting,
            wsDisconnect,
            wsSendData
        } = wsActions;

        if (wsConnect.match(action)) {
          socket = new WebSocket(action.payload);
          dispatch(wsConnecting);
        }

        if (socket) {
            socket.onopen = event => {
                dispatch(onOpen());
            };

            socket.onerror = event => {
                dispatch(onError('Error'));
            };

            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);

                dispatch(onData(parsedData));
            };

            socket.onclose = event => {
                dispatch(onClose());
            };

            //   if (wsSendData?.match(action)) {
            //     const data = { ...payload, token: user.token };
            //     socket.send(JSON.stringify(data));
            //   }

            if (wsDisconnect.match(action)) {
                socket.close();
                socket = null;
            }
        }

        next(action);
      };
    };
  };