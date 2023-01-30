import { Link, NavLink, useLocation } from 'react-router-dom';
import { BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';
import { FEED_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../../shared/routes';

export function AppHeader() {
    let location = useLocation();

    let inactiveLinkClass = `${appHeaderStyles.navigationItem}
        text text_type_main-default pt-4 pb-4 pl-5 pr-5`;

    let activeLinkClass = `${appHeaderStyles.navigationItem}
        ${appHeaderStyles.navigationItem_active}
        text text_type_main-default pt-4 pb-4 pl-5 pr-5`;

    return (
        <header className={`${appHeaderStyles.header} p-4`}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.navigation}>
                    <div className={appHeaderStyles.headerColumn}>
                        <NavLink
                            to={SHOP_ROUTE}
                            className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <BurgerIcon type={location.pathname === SHOP_ROUTE ? 'primary' : "secondary"} />
                            </span>
                            Конструктор
                        </NavLink>
                        <NavLink
                            to={FEED_ROUTE}
                            className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ListIcon type={location.pathname === '/feed' ? 'primary' : "secondary"} />
                            </span>
                            Лента заказов
                        </NavLink>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <Link
                            to={SHOP_ROUTE}
                            className={`${appHeaderStyles.navigationItem}`}
                        >
                            <Logo />
                        </Link>
                    </div>
                    <div className={appHeaderStyles.headerColumn}>
                        <NavLink
                            to={PROFILE_ROUTE}
                            className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
                        >
                            <span className={`${appHeaderStyles.navigationIcon} mr-2`}>
                                <ProfileIcon type={location.pathname === '/profile' ? 'primary' : "secondary"} />
                            </span>
                            Личный кабинет
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}