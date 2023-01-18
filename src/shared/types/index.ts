import { ThunkAction } from 'redux-thunk';
import {
    TConstructorActions, TIngredientsActions, TLoaderActions, TModalActions, TTabActions, TUserActions,
} from '../../services/actions';
import { store } from '../../services/store';

export type { IIngredientItem } from './IIngredientItem';
export type { IConstructorItem } from './IConstructorItem';
export type { IIngredientsResponse } from'./IIngredientsResponse';

export type { TAppButtons } from './TAppButton';

export type { IUserFormActionResponse } from './IUserFormActionResponse';

export type { IUserModel } from './IUserModel';
export type { IUserResponse } from './IUserResponse';

export type { ITokenResponse } from './ITokenResponse';

export type { IServerResponse } from './IServerResponse';
export type { IForgotResponse } from './IForgotResponse';
export type { IResetResponse } from './IResetResponse';
export type { ILogoutResponse } from './ILogoutResponse';

export type { TOrderID } from './TOrderID';
export type { TOrderData } from './TOrderData';

export type { IWSOrderData } from './IWSOrderData';
export type { TORderStatus } from './TORderStatus';
export type { IWSServerResponse } from './IWSServerResponse';
export { WebSocketStatus } from './WebSocketStatus';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TConstructorActions
    | TIngredientsActions
    | TLoaderActions
    | TModalActions
    | TTabActions
    | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch<ReturnType = void> = (action: TApplicationActions | AppThunk<ReturnType>) => ReturnType;