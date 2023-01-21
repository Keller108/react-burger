import { useEffect } from 'react';
import { useDispatch } from '../../shared/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { getIngredients } from '../../services/actions/burger-ingredients';
import styles from './Home.module.css';

type THomePageProps = {
    handleCloseModal: () => void;
};

export function HomePage({ handleCloseModal }: THomePageProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}