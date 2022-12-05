import { logOut } from "../userApi"

export const handleLogOut = () => {
    return logOut()
        .then(res => {
            if (res && res.success) {
                localStorage.deleteItem('refreshToken', res.refreshToken);
                localStorage.deleteItem('accessToken', res.accessToken);
            }
        })
        .catch(err => console.log(`Ошибка при разлогинивании – ${err}`))
}