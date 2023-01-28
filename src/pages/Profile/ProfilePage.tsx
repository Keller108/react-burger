import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from '../../shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE } from '../../shared/routes';
import { signOut } from '../../services/actions/user';
import { Account } from '../../components/Account';
import { Orders } from '../Orders';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';
import { Modal } from '../../components/Modal';
import { useModalType } from '../../shared/hooks/useModalType';
import { ModalType } from '../../shared/types';
import { useEffect } from 'react';
import { closeModal, openModal } from '../../services/actions/modal';

type Props = {
    handleCloseModal: () => void;
};

export function ProfilePage({ handleCloseModal }: Props) {
    const { isActive } = useSelector(store => store.modal);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        await dispatch(signOut());
        navigate(LOGIN_ROUTE);
    };

    let component: JSX.Element | null = useModalType();

    useEffect(() => {
        let currentOrder = localStorage.getItem('currentOrder');
        if (currentOrder && location.pathname === ORDERS_ROUTE) {
            dispatch(openModal(ModalType.ORDER_HISTORY_VIEW));
        } else {
            dispatch(closeModal());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={styles.page}>
            <div className={styles.wrapper}>
                <Account logout={handleLogOut} />
                {location.pathname === PROFILE_ROUTE
                    ?  <ProfileForm />
                    : location.pathname === ORDERS_ROUTE
                    ? <Orders handleCloseModal={handleCloseModal} />
                    : <ProfileForm />
                }
            </div>
            {isActive && <Modal onClose={handleCloseModal}>
                {component}
            </Modal>}
        </section>
    )
}