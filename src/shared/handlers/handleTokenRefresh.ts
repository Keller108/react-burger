import { refreshToken } from "../userApi";

export const handleTokenRefresh = () => {
    return refreshToken().then(res => {
        if (res && res.success) {
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('accessToken', res.accessToken);
        }
        return res;
    })
    .catch(err => console.log(`Ошибка при обновлении токена – ${err}`))
};