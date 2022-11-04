import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';

export function Modal({ children, closeModal }) {
    return (
        <div className={modalStyle.modal}>
            <span className={modalStyle.closeBtn}>
                <CloseIcon onClick={closeModal} type="primary" />
            </span>
            {children}
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
}