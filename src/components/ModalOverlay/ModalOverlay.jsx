import PropTypes from 'prop-types';
import modalOverlayStyle from './ModalOverlay.module.css';

export function ModalOverlay({ closeModal }) {
    return <div onClick={closeModal}
        className={modalOverlayStyle.overlay}/>
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}