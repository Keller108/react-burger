import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './Modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/routes';
import { CLOSE_MODAL } from '../../services/actions';

export function Modal({ testProp = 1}) {
    const { content } = useSelector(store => store.modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        navigate(SHOP_ROUTE);
        localStorage.removeItem('currentItem');
        return dispatch({ type: CLOSE_MODAL });
    };

    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') return handleCloseModal();
    };

    useEffect(() => {
        document.addEventListener('keydown', closeModalByEsc)
        return () => {
            document.removeEventListener('keydown', closeModalByEsc)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('testProp', testProp);

    return ReactDOM.createPortal(
        <>
            <div className={modalStyle.modal}>
                <span className={modalStyle.closeBtn}>
                    <CloseIcon onClick={handleCloseModal} type="primary" />
                </span>
                {content}
            </div>
            <ModalOverlay closeModal={handleCloseModal}/>
        </>,
        document.getElementById("modals")
    )
}

Modal.propTypes = {
    // closeModal: PropTypes.func
    text: PropTypes.string
}