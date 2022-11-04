import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../shared/const/const';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

export const App = () => {
    const [data, setData] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false
    });
    const [modalState, setModalState] = useState({
        isActive: false,
        content: null
    });

    const handleCloseModal = () => {
        setModalState({
            isActive: false,
            content: null
        });
    }

    const closeModalByEsc = (evt) => {
        if (evt.key === 'Escape') {
            setModalState({
                isActive: false,
                content: null
            })
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                setData({
                    ...data,
                    isLoading: true
                })
                const res = await fetch(BASE_API_URL);
                const result = await res.json();
                setData({
                    ingredients: result.data,
                    isLoading: false,
                });
            } catch (error) {
                setData({
                    ...data,
                    hasError: true,
                });
                alert(`Ошибка при обращении к ресурсу ${BASE_API_URL}:`, error.message);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', closeModalByEsc)
        return () => {
            document.removeEventListener('keydown', closeModalByEsc)
        }
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <main className={appStyles.main}>
                <BurgerIngredients
                    data={data.ingredients}
                    setModalState={setModalState}
                    isLoading={data.isLoading}
                />
                <BurgerConstructor
                    ingredients={data.ingredients}
                    setModalState={setModalState}
                    isLoading={data.isLoading}
                />
                {modalState.isActive && <ModalOverlay
                    children={modalState.content}
                    closeModal={handleCloseModal}
                />}
            </main>
        </div>
    );
}