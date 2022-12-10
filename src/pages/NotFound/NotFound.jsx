import style from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={`${style.page} text text_type_main-large`}>
            Страница не найдена...
        </div>
    )
}