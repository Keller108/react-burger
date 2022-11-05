import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { useEffect } from 'react';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

export function Modal({ setModalState, children }) {
    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') {
            setModalState({
                isActive: false,
                content: null
            });
        }
    }

    const closeModal = () => {
        setModalState({
            isActive: false,
            content: null
        });
    }

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
                {children}
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>,
        document.getElementById("modals")
    )
}

Modal.defaultProps = {
    setModalState: PropTypes.func.isRequired,
    children: null
}

Modal.propTypes = {
    setModalState: PropTypes.func.isRequired,
    children: PropTypes.element
}