import { Link } from 'react-router-dom';
import { BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';

export function AppHeader() {
    return (
        <header className={`${appHeaderStyles.header} p-4`}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.navigation}>
                    <div className={appHeaderStyles.headerColumn}>
                        <Link
                            to='/'
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <BurgerIcon type="primary" />
                            </span>
                            Конструктор
                        </Link>
                        <a
                            href='/'
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ListIcon type="secondary" />
                            </span>
                            Лента заказов
                        </a>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <Link
                            to='/'
                            className={`${appHeaderStyles.navigationItem}`}
                        >
                            <Logo />
                        </Link>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <Link
                            to='/profile'
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ProfileIcon type="secondary" />
                            </span>
                            Личный кабинет
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}