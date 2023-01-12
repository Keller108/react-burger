import { AppDispatch, AppThunk, IUserModel } from "../../shared/types";
import {
    checkIfExist,
    createUser,
    getUser,
    login,
    logOut,
    patchUser,
    resetPassword
} from "../../shared/userApi";
import {
    CHECK_USER_FAILED,
    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    PASS_FORGOT_FAILED,
    PASS_FORGOT_REQUEST,
    PASS_FORGOT_SUCCESS,
    PASS_RESET_FAILED,
    PASS_RESET_REQUEST,
    PASS_RESET_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    USER_EDIT_FAILED,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_LOGOUT_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS
} from "../constants/user";

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: IUserModel;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction{
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: IUserModel;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface ICheckUserRequestAction{
    readonly type: typeof CHECK_USER_REQUEST;
}

export interface ICheckUserSuccessAction{
    readonly type: typeof CHECK_USER_SUCCESS;
    readonly user: IUserModel;
}

export interface ICheckUserFailedAction{
    readonly type: typeof CHECK_USER_FAILED;
}

export interface IPassResetRequestAction{
    readonly type: typeof PASS_RESET_REQUEST;
}

export interface IPassResetSuccessAction{
    readonly type: typeof PASS_RESET_SUCCESS;
}

export interface IPassResetFailedAction {
    readonly type: typeof PASS_RESET_FAILED;
}

export interface IPassForgotRequestAction {
    readonly type: typeof PASS_FORGOT_REQUEST;
}

export interface IPassForgotSuccessAction {
    readonly type: typeof PASS_FORGOT_SUCCESS;
}

export interface IPassForgotFailedAction {
    readonly type: typeof PASS_FORGOT_FAILED;
}

export interface IUserLogoutRequestAction {
    readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccessAction {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailedAction {
    readonly type: typeof USER_LOGOUT_FAILED;
}

export interface IUserEditRequestAction {
    readonly type: typeof USER_EDIT_REQUEST;
}

export interface IUserEditSuccessAction {
    readonly type: typeof USER_EDIT_SUCCESS;
    readonly user: IUserModel;
}

export interface IUserEditFailedAction {
    readonly type: typeof USER_EDIT_FAILED;
}

function registerRequest(): IRegisterRequestAction {
    return ({
        type: REGISTER_REQUEST,
    });
}

function registerSuccess(data: IUserModel): IRegisterSuccessAction {
    return ({
        type: REGISTER_SUCCESS,
        user: {
            email: data.email,
            name: data.name,
            password: data.password
        }
    });
}

function registerFailed(): IRegisterFailedAction {
    return ({
        type: REGISTER_FAILED
    });
}

function loginRequest(): ILoginRequestAction {
    return ({
        type: LOGIN_REQUEST
    });
}

function loginSuccess(data: IUserModel): ILoginSuccessAction {
    return ({
        type: LOGIN_SUCCESS,
        user: {
            email: data.email,
            name: data.name,
            password: data.password
        }
    });
}

function loginFailed(): ILoginFailedAction {
    return ({
        type: LOGIN_FAILED
    });
}

function checkUserRequest(): ICheckUserRequestAction {
    return ({
        type: CHECK_USER_REQUEST
    });
}

function checkUserSuccess(data: IUserModel): ICheckUserSuccessAction {
    return ({
        type: CHECK_USER_SUCCESS,
        user: {
            email: data.email,
            name: data.name
        }
    });
}

function checkUserFailed(): ICheckUserFailedAction {
    return ({
        type: CHECK_USER_FAILED
    });
}

function passResetRequest(): IPassResetRequestAction {
    return ({
        type: PASS_RESET_REQUEST
    });
}

function passResetSuccess(): IPassResetSuccessAction {
    return ({
        type: PASS_RESET_SUCCESS
    });
}

function passResetFailed(): IPassResetFailedAction {
    return ({
        type: PASS_RESET_FAILED
    });
}

function passForgotRequest(): IPassForgotRequestAction {
    return ({
        type: PASS_FORGOT_REQUEST
    });
}

function passForgotSuccess(): IPassForgotSuccessAction {
    return ({
        type: PASS_FORGOT_SUCCESS
    });
}

function passForgotFailed(): IPassForgotFailedAction {
    return ({
        type: PASS_FORGOT_FAILED
    });
}

function userLogOutRequest(): IUserLogoutRequestAction {
    return ({
        type: USER_LOGOUT_REQUEST
    });
}

function userLogOutSuccess(): IUserLogoutSuccessAction {
    return ({
        type: USER_LOGOUT_SUCCESS
    });
}

function userLogOutFailed(): IUserLogoutFailedAction {
    return ({
        type: USER_LOGOUT_FAILED
    });
}

function userEditRequest(): IUserEditRequestAction {
    return ({
        type: USER_EDIT_REQUEST
    });
}

function userEditSuccess(userForm: IUserModel): IUserEditSuccessAction {
    return ({
        type: USER_EDIT_SUCCESS,
        user: userForm
    });
}

function userEditFailed(): IUserEditFailedAction {
    return ({
        type: USER_EDIT_FAILED
    });
}

export type TUserActions = IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginFailedAction
    | ILoginSuccessAction
    | ICheckUserRequestAction
    | ICheckUserSuccessAction
    | ICheckUserFailedAction
    | IPassResetRequestAction
    | IPassResetSuccessAction
    | IPassResetFailedAction
    | IPassForgotRequestAction
    | IPassForgotSuccessAction
    | IPassForgotFailedAction
    | IUserLogoutRequestAction
    | IUserLogoutSuccessAction
    | IUserLogoutFailedAction
    | IUserEditRequestAction
    | IUserEditSuccessAction
    | IUserEditFailedAction;

export const signUp = (newUser: IUserModel): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    return await createUser(newUser)
        .then(res => {
            if (res && res.success) {
                const userData = {
                    email: res.user.email,
                    name: res.user.name,
                    password: newUser.password
                };
                dispatch(registerSuccess(userData));
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken);
            } else {
                dispatch(registerFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при регистрации пользователя – ${err}`));
}

export const signIn = (user: IUserModel): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    return await login(user)
        .then(res => {
            if (res && res.success) {
                dispatch(loginSuccess({
                    email: res.user.email,
                    name: res.user.name,
                    password: user.password
                }));
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken);
            } else {
                dispatch(loginFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при авторизации пользователя – ${err}`));
}

export const userCheck = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(checkUserRequest())
    getUser()
        .then(res => {
            if (res && res.success) {
                let result = dispatch(checkUserSuccess({
                    email: res.user.email,
                    name: res.user.name
                }));
                console.log('result from thunk', result);
            } else {
                dispatch(checkUserFailed());
            }
        })
        .catch(err => console.log(`Ошибка при проверке пользователя – ${err}`));
}

export const resetPasswordRequest = (
    data: { password: string; token: string; }
): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(passResetRequest());
    return await resetPassword(data)
        .then(res => {
            if (res && res.success) {
                dispatch(passResetSuccess());
            } else {
                dispatch(passResetFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при восставновлении пароля – ${err}`));
}

export const forgotPasswordRequest = (
    data: { email: string }
): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(passForgotRequest());
    return await checkIfExist(data)
        .then(res => {
            if (res && res.success) {
                dispatch(passForgotSuccess());
            } else {
                dispatch(passForgotFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при проверке почты – ${err}`));
}

export const signOut = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(userLogOutRequest());
    return await logOut()
        .then(res => {
            if (res && res.success) {
                dispatch(userLogOutSuccess());
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
            } else {
                dispatch(userLogOutFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при разлогинивании – ${err}`));
}

export const editUser = (form: IUserModel): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(userEditRequest());
    return await patchUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch(userEditSuccess({
                    email: form.email,
                    name: form.name,
                    password: form.password
                }))
            } else {
                dispatch(userEditFailed());
            }
            return res;
        })
        .catch(err => console.log(`Ошибка при изменении данных юзера – ${err}`));
}