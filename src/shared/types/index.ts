import { ThunkAction } from 'redux-thunk';
import {
    TCartActions,
    TConstructorActions, TIngredientsActions, TLoaderActions, TModalActions, TTabActions, TUserActions,
} from '../../services/actions';
import { TWSPrivateActions } from '../../services/actions/ws-private';
import { TWSPublicActions } from '../../services/actions/ws-public';
import { rootReducer } from '../../services/reducers';

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

export type { IOrderDataModel } from './IOrderDataModel';
export type { TOrderStatus } from './TOrderStatus';
export type { IWSServerResponse } from './IWSServerResponse';
export { WebSocketStatus } from './WebSocketStatus';
export { ModalType } from './ModalType';

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
    | TConstructorActions
    | TIngredientsActions
    | TLoaderActions
    | TModalActions
    | TTabActions
    | TUserActions
    | TWSPublicActions
    | TWSPrivateActions
    | TCartActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch<ReturnType = void> = (action: TApplicationActions | AppThunk<ReturnType>) => ReturnType;