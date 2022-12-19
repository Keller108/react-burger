import modalOverlayStyle from './ModalOverlay.module.css';

type TModalOverlayProps = {
    closeModal: () => void;
};

export function ModalOverlay({ closeModal }: TModalOverlayProps) {
    return <div onClick={closeModal}
        className={modalOverlayStyle.overlay}/>
}