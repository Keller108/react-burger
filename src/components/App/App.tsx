import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../shared/hooks";
import { AppHeader } from '../AppHeader';
import {
    HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword, ProfilePage, IngredientPage, NotFound
} from "../../pages";
import appStyles from './App.module.css';
import { userCheck } from "../../services/actions/user";
import { ProtectedRoutes } from "../../HOC";
import { Preloader } from "../Preloader";
import { Modal } from "../Modal";
import { ORDERS_FEED_PATH  } from "../../shared/routes";
import { OrderFeed } from "../../pages/OrderFeed";
import { OrderPage } from "../../pages/OrderPage";
import { wsPublicConnect } from "../../services/actions/ws-public";
import { useModalType } from "../../shared/hooks/useModalType";
import { closeModal } from "../../services/actions/modal";
import { clearCart } from "../../services/actions/burger-constructor";

export const App = () => {
    const [isLoading,] = useState(false);
    const { isActive, modalType } = useSelector((store) => store.modal);

    const location = useLocation();
    const dispatch = useDispatch();

    const handleUserCheck = () => dispatch(userCheck());

    const wsConnect = () => dispatch(wsPublicConnect({ url: ORDERS_FEED_PATH }));

    const state = location.state && location.state.background;

    const handleCheckData = async () => {
        await handleUserCheck();
    };

    const handleCloseModal = () => {
        if (modalType === 'INGREDIENT_VIEW') {
            let currentItem = localStorage.getItem('currentItem');
            if (currentItem) {
                localStorage.removeItem('currentItem');
            }
        }
        dispatch(clearCart());
        dispatch(closeModal());
    };

    useEffect(() => {
        handleCheckData();
        wsConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let component: JSX.Element | null = useModalType();

    return (
        <div className={appStyles.app}>
            <AppHeader />
            {isLoading ? <Preloader /> : <>
                <Routes location={state || location}>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/orders" element={<ProfilePage />} />
                    </Route>
                    <Route path="/" index element={<HomePage handleCloseModal={handleCloseModal}/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
                    <Route path="/feed" element={<OrderFeed />} />
                    <Route path="/feed/:id" element={<OrderPage />} />
                </Routes>
                {state && isActive && <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={<Modal onClose={handleCloseModal}>
                            {component}
                        </Modal>}
                    />
                    <Route
                        path="/feed/:id"
                        element={<Modal onClose={handleCloseModal}>
                            {component}
                        </Modal>}
                    />
                </Routes>}
            </>}
        </div>
    );
}