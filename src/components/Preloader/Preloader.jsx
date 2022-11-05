import loaderStyle from './Preloader.module.css';

export function Preloader() {
    return (
        <span className={loaderStyle.loader}>
            Загрузка...
        </span>
    )
}