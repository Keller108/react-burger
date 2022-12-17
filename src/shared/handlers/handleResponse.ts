export const handleResponse = (res: Response) => res.ok
    ? res.json()
    : Promise.reject(`Ошибка ${res.status}`);