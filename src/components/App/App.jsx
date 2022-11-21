import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { Modal } from '../Modal/Modal';
import { getIngredients } from '../../services/actions/burger-ingredients';
import appStyles from './App.module.css';

export const App = () => {
    const dispatch = useDispatch();
    const { isActive } = useSelector(store => store.modal);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={appStyles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                    {isActive && <Modal/>}
                </main>
            </DndProvider>
        </div>
    );
}