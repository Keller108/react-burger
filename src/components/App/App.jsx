import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { fetchIngredients } from '../../utils/burger-api';

export const App = () => {
    const [appData, setAppData] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false
    });
    const [modalState, setModalState] = useState({
        isActive: false,
        content: null
    });

    useEffect(() => {
        setAppData({ ...appData, isLoading: true });
        fetchIngredients()
            .then(res => setAppData({
                ...appData,
                ingredients: res.data
            }))
            .catch(error => setAppData({
                ...appData,
                hasError: true,
                isLoading: false
            }))
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <main className={appStyles.main}>
                {!appData.hasError ? <>
                        <BurgerIngredients
                            data={appData.ingredients}
                            setModalState={setModalState}
                            isLoading={appData.isLoading}
                        />
                        <BurgerConstructor
                            ingredients={appData.ingredients}
                            setModalState={setModalState}
                        />
                    </> : "Произошла ошибка"}
                {modalState.isActive && <Modal
                    setModalState={setModalState}
                    children={modalState.content}
                />}
            </main>
        </div>
    );
}