import { checkIfExist, createUser, getUser, login, resetPassword } from "../../utils/userApi";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST';
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
export const CHECK_USER_FAILED = 'CHECK_USER_FAILED';

export const USER_EXISTS_REQUEST = 'USER_EXISTS_REQUEST';
export const USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
export const USER_EXISTS_FAILED = 'USER_EXISTS_FAILED';

export const PASS_RESET_REQUEST = 'PASS_RESET_REQUEST';
export const PASS_RESET_SUCCESS = 'PASS_RESET_SUCCESS';
export const PASS_RESET_FAILED = 'PASS_RESET_FAILED';

export function signUp(newUser) {
    return function(dispatch) {
        return createUser(newUser)
            .then(res => {
                dispatch({
                    type: REGISTER_REQUEST
                });

                if (res && res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: {
                            email: res.user.email,
                            name: res.user.name,
                            password: newUser.password
                        },
                        accessToken: res.accessToken,
                        token: res.refreshToken
                    })
                    localStorage.setItem('token', res.refreshToken);
                    localStorage.setItem('accessToken', res.accessToken);
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    })
                }
            }).catch(err => console.log(`Ошибка при регистрации пользователя – ${err.message}`))
    }
}

export function signIn(user) {
    return function(dispatch) {
        return login(user)
            .then(res => {
                dispatch({
                    type: LOGIN_REQUEST
                })

                if (res && res.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: {
                            email: res.user.email,
                            name: res.user.name,
                            password: user.password
                        },
                        accessToken: res.accessToken,
                        token: res.refreshToken
                    })
                    localStorage.setItem('token', res.refreshToken);
                    localStorage.setItem('accessToken', res.accessToken);
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    })
                }
            }).catch(err => console.log(`Ошибка при авторизации пользователя – ${err.message}`))
    }
}

export function userCheck() {
    return function(dispatch) {
        return getUser()
            .then(res => {
                dispatch({ type: CHECK_USER_REQUEST })

                if (res && res.success) {
                    dispatch({
                        type: CHECK_USER_SUCCESS,
                        user: {
                            email: res.user.email,
                            name: res.user.name,
                            password: null
                        }
                    })
                } else {
                    dispatch({
                        type: CHECK_USER_FAILED
                    })
                }
            }).catch(err => console.log(`Ошибка при проверке пользователя – ${err.message}`))
    }
}

export function checkUserExists(email) {
    return function(dispatch) {
        return checkIfExist(email)
            .then(res => {
                dispatch({
                    type: USER_EXISTS_REQUEST
                })

                if (res && res.success) {
                    dispatch({
                        type: USER_EXISTS_SUCCESS
                    })
                } else {
                    dispatch({
                        type: CHECK_USER_FAILED
                    })
                }
            }).catch(err => console.log(`Ошибка при проверке почты – ${err.message}`))
    }
}

export function resetPasswordRequest(data) {
    return function(dispatch) {
        return resetPassword(data)
            .then(res => {
                dispatch({
                    type: PASS_RESET_REQUEST
                })

                if (res && res.success) {
                    dispatch({
                        type: PASS_RESET_SUCCESS
                    })
                } else {
                    dispatch({
                        type: PASS_RESET_FAILED
                    })
                }
            }).catch(err => console.log(`Ошибка при восставновлении пароля – ${err.message}`))
    }
}