import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from '../../shared/hooks';
import { ModalOverlay } from '../ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';

type TModalProps = {
    onClose: () => void;
};

export function Modal({ onClose }: TModalProps) {
    const { content } = useSelector(store => store.modal);
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
                {content}
            </div>
            <ModalOverlay closeModal={modalClose}/>
        </>,
        document.getElementById("modals") as HTMLDivElement
    )
}