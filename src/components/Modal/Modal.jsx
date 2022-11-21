import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CLOSE_MODAL } from '../../services/actions';

export function Modal() {
    const dispatch = useDispatch();
    const { content } = useSelector(store => store.modal);

    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') return dispatch({ type: CLOSE_MODAL });
    };

    const closeModal = () => dispatch({ type: CLOSE_MODAL });

    useEffect(() => {
        document.addEventListener('keydown', closeModalByEsc)
        return () => {
            document.removeEventListener('keydown', closeModalByEsc)
        }
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