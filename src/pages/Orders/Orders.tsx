import { useEffect } from 'react';
import { Order } from '../../components/Order';
import { setCurrentOrder } from '../../services/actions/cart';
import { openModal } from '../../services/actions/modal';
import { wsPrivateConnect, wsPrivateDisconnect, wsPrivateError } from '../../services/actions/ws-private';
import { useDispatch, useSelector } from '../../shared/hooks';
import { ORDERS_PROFILE_PATH } from '../../shared/routes';
import { IOrderDataModel, ModalType } from '../../shared/types';
import styles from './Orders.module.css';

type Props = {
    handleCloseModal: () => void;
};

export const Orders = ({ handleCloseModal }: Props) => {
    const { orderData } = useSelector(store => store.wsPrivate);
    const dispatch = useDispatch();

    const wsConnect = () => {
        let token = localStorage.getItem('accessToken');
        let data = token?.replace(/Bearer /g, '');
        if (data !== undefined && data !== null) dispatch(
            wsPrivateConnect({ url: ORDERS_PROFILE_PATH, token: data })
        )
        return dispatch(wsPrivateError('Ошибка соединения'));
    };

    const renderModal = (order: IOrderDataModel) => {
        dispatch(openModal(ModalType.ORDER_HISTORY_VIEW));
        dispatch(setCurrentOrder(order));
    };

    const renderElement = (order: IOrderDataModel) => {
        renderModal(order);
        const data = JSON.stringify(order);
        localStorage.setItem('currentOrder', data);
    };

    useEffect(() => {
        wsConnect();
        return () => dispatch(wsPrivateDisconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ul className={styles.orders}>
            {orderData ? orderData.map((item, i) => <Order
                key={item.number}
                item={item}
                status={item.status}
                onCardClick={() => renderElement(item)}
            />).reverse() : 'пусто'}
        </ul>
    )
};