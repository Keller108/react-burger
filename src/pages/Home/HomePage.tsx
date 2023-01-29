import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import styles from './Home.module.css';
import { Modal } from '../../components/Modal';
import { useSelector } from '../../shared/hooks';
import { useModalType } from '../../shared/hooks/useModalType';

type Props = {
    handleCloseModal: () => void;
};

export function HomePage({ handleCloseModal }: Props) {
    const { isActive } = useSelector(store => store.modal);
    let component: JSX.Element | null = useModalType();
    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
            {isActive && <Modal onClose={handleCloseModal}>
                {component}
            </Modal>}
        </main>
    )
}