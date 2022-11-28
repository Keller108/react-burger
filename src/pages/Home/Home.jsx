import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { Modal } from '../../components/Modal';
import { getIngredients } from '../../services/actions/burger-ingredients';
import styles from './Home.module.css';

export function Home() {
    const dispatch = useDispatch();
    const { isActive } = useSelector(store => store.modal);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
                {isActive && <Modal/>}
            </DndProvider>
        </main>
    )
}