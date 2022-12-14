import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

export function Modal({ onClose }) {
    const { content } = useSelector(store => store.modal);

    const modalClose = () => onClose();

    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') return modalClose();
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
                    <CloseIcon onClick={modalClose} type="primary" />
                </span>
                {content}
            </div>
            <ModalOverlay closeModal={modalClose}/>
        </>,
        document.getElementById("modals")
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}