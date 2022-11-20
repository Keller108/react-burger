import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from './App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { Modal } from '../Modal/Modal';
import { placeAnOrder } from '../../utils/burger-api';
import { getIngredients } from '../../services/actions/burger-ingredients';

export const App = () => {
    // const [appData, setAppData] = useState({
    //     ingredients: [],
    //     isLoading: false,
    //     hasError: false
    // });

    // const [modalState, setModalState] = useState({
    //     isActive: false,
    //     content: null
    // });

    // const [orderState, setOrderState] = useState({
    //     orderData: [],
    //     constructorItems: [],
    //     success: false,
    //     name: "",
    //     order: {
    //         number: null
    //     }
    // });

    const dispatch = useDispatch();

    const { isActive } = useSelector(store => store.ingredients.modal);
    const ingredients = useSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    // const handleOrderRequest = async () => {
        // return placeAnOrder({
        //     ingredients: orderState.constructorItems
        // }).then(res => setOrderState(prevState => {
        //         return {
        //             ...prevState,
        //             success: true,
        //             name: res.name,
        //             order: {
        //                 number: res.order.number
        //             }
        //         }
        //     }))
        //     .catch(error => setOrderState(prevState => {
        //         return { ...prevState, success: false }}));
    // };

    // useEffect(() => {
    //     setAppData(prevState => {
    //         return { ...prevState, isLoading: true };
    //     });
    //     fetchIngredients()
    //         .then(res => setAppData(prevState => {
    //             return { ...prevState, ingredients: res.data, isLoading: false };
    //         }))
    //         .catch(error => setAppData(prevState => {
    //             return { ...prevState, hasError: true, isLoading: false };
    //         }))
    // }, [])

    // useEffect(() => {
    //     if (appData.ingredients !== []) {
    //         const orderIDs = appData.ingredients.map(item => item._id);
    //         setOrderState({
    //             ...orderState,
    //             orderData: orderIDs
    //         });
    //     }
    // }, [appData.ingredients])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={appStyles.main}>
                    <BurgerIngredients
                        // setModalState={setModalState}
                    />
                    {/* <BurgerConstructorContext.Provider
                        value={{
                            initialData: appData.ingredients,
                            ingredients: orderState.constructorItems,
                            orderState: orderState,
                            setOrderState,
                            totalPrice,
                            setTotalPrice
                        }}
                    > */}
                    <BurgerConstructor
                        // setModalState={setModalState}
                        // handleOrderRequest={handleOrderRequest}
                    />
                    {/* </BurgerConstructorContext.Provider> */}
                    {isActive && <Modal/>}
                </main>
            </DndProvider>
        </div>
    );
}