import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import modalOverlayStyle from './ModalOverlay.module.css';
import { modalRoot } from '../../shared/const/const';

export function ModalOverlay({ isActive, children, closeModal }) {
    return ReactDOM.createPortal(
        <div className={isActive ? `${modalOverlayStyle.overlay}
            ${modalOverlayStyle.overlay_active}`: `${modalOverlayStyle.overlay}`}>
            <Modal children={children} closeModal={closeModal} />
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}