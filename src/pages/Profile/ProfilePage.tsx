import styles from './Profile.module.css';
import { useDispatch } from '../../shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE } from '../../shared/routes';
import { signOut } from '../../services/actions/user';
import { Account } from '../../components/Account';
import { Orders } from '../Orders';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';

export function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        await dispatch(signOut());
        navigate(LOGIN_ROUTE);
    };

    return (
        <section className={styles.page}>
            <div className={styles.wrapper}>
                <Account logout={handleLogOut} />
                {location.pathname === PROFILE_ROUTE
                    ?  <ProfileForm />
                    : location.pathname === ORDERS_ROUTE
                    ? <Orders />
                    : <ProfileForm />
                }
                <div className={styles.sideColumn}></div>
            </div>
        </section>
    )
}