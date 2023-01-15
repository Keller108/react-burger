import { Link } from 'react-router-dom';
import { ORDERS_ROUTE, PROFILE_ROUTE } from '../../shared/routes';
import styles from './Account.module.css';

type Props = {
    logout: () => void;
};

export const Account = ({ logout }: Props) => {
    return (
        <div className={`${styles.account} pr-15`}>
            <ul className={`${styles.tabs} mb-20`}>
                <Link to={PROFILE_ROUTE}>
                    <li>
                        <p className="text text_type_main-medium">Профиль</p>
                    </li>
                </Link>
                <Link to={ORDERS_ROUTE}>
                    <li>
                        <p className="text text_type_main-medium text_color_inactive">История заказов</p>
                    </li>
                </Link>
                <li onClick={logout}>
                    <p className="text text_type_main-medium text_color_inactive">Выход</p>
                </li>
            </ul>
            <p className={`${styles.description} text text_type_main-default`}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    )
};