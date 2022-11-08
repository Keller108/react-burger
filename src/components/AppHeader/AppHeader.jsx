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
                        <a
                            href='/'
                            className={`${appHeaderStyles.navigationItem}
                                ${appHeaderStyles.navigationItem_active}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <BurgerIcon type="primary" />
                            </span>
                            Конструктор
                        </a>
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
                        <a
                            href='/'
                            className={`${appHeaderStyles.navigationItem}`}
                        >
                            <Logo />
                        </a>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <a
                            href='/'
                            className={`${appHeaderStyles.navigationItem}
                                text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ProfileIcon type="secondary" />
                            </span>
                            Личный кабинет
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}