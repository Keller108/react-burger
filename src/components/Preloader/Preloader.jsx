import style from './Preloader.module.css';

export function Preloader() {
    return <div className={style.preloader}>
        <div className={style.roller}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
}