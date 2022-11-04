import ReactDOM from 'react-dom';
import { Modal } from '../Modal/Modal';
import modalOverlayStyle from './ModalOverlay.module.css';
import { modalRoot } from '../../shared/const/const';

export function ModalOverlay({ children, closeModal, }) {
    return ReactDOM.createPortal(
        <div className={modalOverlayStyle.overlay}>
            <Modal children={children} closeModal={closeModal} />
        </div>,
        modalRoot
    )
}