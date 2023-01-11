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

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TConstructorActions
    | TIngredientsActions
    | TLoaderActions
    | TModalActions
    | TTabActions
    | TUserActions;