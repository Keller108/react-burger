import { NavLink } from 'react-router-dom';
import { ORDERS_ROUTE, PROFILE_ROUTE } from '../../shared/routes';
import styles from './Account.module.css';

type Props = {
    logout: () => void;
};

export const Account = ({ logout }: Props) => {
    const activeLinkClass = `${styles.navItem} ${styles.navItem_active} text text_type_main-medium`;
    const inactiveLinkClass = `${styles.navItem} text text_type_main-medium`;

    return (
        <div className={`${styles.account} pr-15`}>
            <nav className={`${styles.tabs} mb-20`}>
                <NavLink
                    to={PROFILE_ROUTE}
                    className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to={ORDERS_ROUTE}
                    className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
                >
                    История заказов
                </NavLink>
                <p
                    onClick={logout}
                    className={`${styles.navItem} text text_type_main-medium`}
                >
                    Выход
                </p>
            </nav>
            <p className={`${styles.description} text text_type_main-default`}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    )
};