import { useSelector} from '../../shared/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import styles from './Home.module.css';
import { Modal } from '../../components/Modal';
import { useModalType } from '../../shared/hooks/useModalType';

type THomePageProps = {
    handleCloseModal: () => void;
};

export function HomePage({ handleCloseModal }: THomePageProps) {
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