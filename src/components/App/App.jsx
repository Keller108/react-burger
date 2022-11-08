import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { fetchIngredients, placeAnOrder } from '../../utils/burger-api';
import { BurgerConstructorContext } from '../../services/productsContext';

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

    const [orderState, setOrderState] = useState({
        orderData: [],
        success: false,
        name: "",
        order: {
            number: null
        }
    });

    const handleOrderRequest = async () => {
        return placeAnOrder({ingredients: orderState.orderData})
            .then(res => setOrderState(prevState => {
                return {
                    ...prevState,
                    success: true,
                    name: res.name,
                    order: {
                        number: res.order.number
                    }
                }
            }));
    };

    useEffect(() => {
        setAppData(prevState => {
            return { ...prevState, isLoading: true };
        });
        fetchIngredients()
            .then(res => setAppData(prevState => {
                return { ...prevState, ingredients: res.data, isLoading: false };
            }))
            .catch(error => setAppData(prevState => {
                return { ...prevState, hasError: true, isLoading: false };
            }))
    }, [])

    useEffect(() => {
        if (appData.ingredients !== []) {
            const orderIDs = appData.ingredients.map(item => item._id);
            setOrderState({...orderState, orderData: orderIDs});
        }
    }, [appData.ingredients])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <BurgerConstructorContext.Provider
                value={{
                    ingredients: appData.ingredients,
                    order: orderState.order,
                    orderData: orderState.orderData
                }}
            >
                <main className={appStyles.main}>
                    {!appData.hasError ? <>
                            <BurgerIngredients
                                data={appData.ingredients}
                                setModalState={setModalState}
                                isLoading={appData.isLoading}
                            />
                            <BurgerConstructor
                                setModalState={setModalState}
                                handleOrderRequest={handleOrderRequest}
                            />
                        </> : "Произошла ошибка"}
                    {modalState.isActive && <Modal
                        setModalState={setModalState}
                        children={modalState.content}
                    />}
                </main>
            </BurgerConstructorContext.Provider>
        </div>
    );
}