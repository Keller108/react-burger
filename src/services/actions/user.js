import {
    checkIfExist,
    createUser,
    getUser,
    login,
    logOut,
    patchUser,
    resetPassword
} from "../../shared/userApi";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';
export const USER_EDIT_FAILED = 'USER_EDIT_FAILED';

export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST';
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
export const CHECK_USER_FAILED = 'CHECK_USER_FAILED';

export const PASS_FORGOT_REQUEST = 'USER_EXISTS_REQUEST';
export const PASS_FORGOT_SUCCESS = 'USER_EXISTS_SUCCESS';
export const PASS_FORGOT_FAILED = 'USER_EXISTS_FAILED';

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
                        }
                    })
                    localStorage.setItem('refreshToken', res.refreshToken);
                    localStorage.setItem('accessToken', res.accessToken);
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    })
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ?????????????????????? ???????????????????????? ??? ${err}`))
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
                        }
                    })
                    localStorage.setItem('refreshToken', res.refreshToken);
                    localStorage.setItem('accessToken', res.accessToken);
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    })
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ?????????????????????? ???????????????????????? ??? ${err}`))
    }
}

export function userCheck() {
    return async function(dispatch) {
        return getUser()
            .then(res => {
                dispatch({ type: CHECK_USER_REQUEST })

                if (res && res.success) {
                    dispatch({
                        type: CHECK_USER_SUCCESS,
                        user: {
                            email: res.user.email,
                            name: res.user.name
                        }
                    })
                } else {
                    dispatch({
                        type: CHECK_USER_FAILED
                    })
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ???????????????? ???????????????????????? ??? ${err}`))
    }
}

export function forgotPasswordRequest(email) {
    return function(dispatch) {
        return checkIfExist(email)
            .then(res => {
                dispatch({
                    type: PASS_FORGOT_REQUEST
                })

                if (res && res.success) {
                    dispatch({
                        type: PASS_FORGOT_SUCCESS
                    })
                } else {
                    dispatch({
                        type: PASS_FORGOT_FAILED
                    })
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ???????????????? ?????????? ??? ${err}`))
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

                return res
            })
            .catch(err => console.log(`???????????? ?????? ?????????????????????????????? ???????????? ??? ${err}`))
    }
}

export function signOut() {
    return function(dispatch) {
        return logOut()
            .then(res => {
                dispatch({
                    type: USER_LOGOUT_REQUEST
                })

                if (res && res.success) {
                    dispatch({
                        type: USER_LOGOUT_SUCCESS
                    })

                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('accessToken');
                } else {
                    dispatch({
                        type: USER_LOGOUT_FAILED
                    })
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ???????????????????????????? ??? ${err}`))
    }
}

export function editUser(form) {
    return function(dispatch) {
        dispatch({ type : USER_EDIT_REQUEST });

        dispatch({
            type: USER_EDIT_SUCCESS,
            user: {
                email: form.email,
                name: form.name,
                password: form.password
            }
        })

        return patchUser(form)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: USER_EDIT_SUCCESS,
                        user: {
                            email: res.user.email,
                            name: res.user.name,
                            password: form.password
                        }
                    })
                } else {
                    dispatch({ type: USER_EDIT_FAILED });
                }

                return res
            })
            .catch(err => console.log(`???????????? ?????? ?????????????????? ???????????? ?????????? ??? ${err}`))
    }
}