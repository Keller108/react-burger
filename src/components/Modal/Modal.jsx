import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CLOSE_MODAL } from '../../services/actions';
import { SHOP_ROUTE } from '../../utils/routes';

export function Modal() {
    const dispatch = useDispatch();
    const { content } = useSelector(store => store.modal);
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(SHOP_ROUTE);
        return dispatch({ type: CLOSE_MODAL });
    }

    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') return closeModal()
    };

    useEffect(() => {
        document.addEventListener('keydown', closeModalByEsc)
        return () => {
            document.removeEventListener('keydown', closeModalByEsc)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ReactDOM.createPortal(
        <>
            <div className={modalStyle.modal}>
                <span className={modalStyle.closeBtn}>
                    <CloseIcon onClick={closeModal} type="primary" />
                </span>
                {content}
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>,
        document.getElementById("modals")
    )
}