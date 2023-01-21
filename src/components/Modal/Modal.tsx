import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';

type TModalProps = {
    onClose: () => void;
    children: JSX.Element | null;
};

export function Modal({ onClose, children }: TModalProps) {
    const modalClose = () => onClose();
    const closeModalByEsc = (evt: KeyboardEvent) => {
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
                {children}
            </div>
            <ModalOverlay closeModal={modalClose}/>
        </>,
        document.getElementById("modals") as HTMLDivElement
    )
}