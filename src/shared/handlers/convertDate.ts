const getDaysForCard = (days: number) => (
    days === 0 ? 'Сегодня'
    : days === 1 ? 'Вчера'
    : days > 1 ? `${days} дня(-ей) назад`
    : 'Что-то пошло не так'
);

export const conversionDateForCard = (date: string) => {
    const dayCreated: Date = new Date(date);
    const today: Date = new Date();

    today.setHours(0, 0, 0, 0);

    const diffTime: number = Math.ceil(
        (today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000)
    );

    const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`
    const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`

    return `${getDaysForCard(diffTime)}, ${hours}:${min} i-GMT+${dayCreated.getTimezoneOffset() * (-1) / 60}`;
};