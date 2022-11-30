import { createUser } from "../../utils/userApi";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function setUser(user) {
    return function(dispatch) {
        return createUser(user)
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
                            password: user.password
                        },
                        accessToken: res.accessToken,
                        refreshToken: res.refreshToken
                    })

                    console.log('reg result', res);
                    console.log('Рега прошла успешно');

                    localStorage.setItem('refreshToken', res.refreshToken);
                    localStorage.setItem('accessToken', res.accessToken);
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    })
                }
            })
            // .then(res => {
            //     dispatch({
            //         type: LOGIN_REQUEST
            //     })

            //     if (res) {
            //         dispatch({
            //             type: LOGIN_SUCCESS

            //         })
            //     } else {
            //         dispatch({
            //             type: LOGIN_FAILED
            //         })
            //     }
            // })
            .catch(err => console.log(`Ошибка при регистрации пользователя – ${err.message}`))
    }
}