import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { modalPropType } from '../../shared/types/commonTypes';

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

Modal.propTypes = modalPropType.isRequired;