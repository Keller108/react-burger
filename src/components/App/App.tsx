import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import { CLOSE_MODAL } from "../../services/constants/modal";
import { ORDERS_FEED_PATH, SHOP_ROUTE } from "../../shared/routes";
import { OrderFeed } from "../../pages/OrderFeed";
import { OrderPage } from "../../pages/OrderPage";
import { wsPublicConnect, wsPublicDisconnect } from "../../services/actions/ws-public";
import { useModalType } from "../../shared/hooks/useModalType";

export const App = () => {
    const [isLoading,] = useState(false);
    const { isActive } = useSelector((store) => store.modal);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserCheck = () => dispatch(userCheck());

    const wsConnect = () => dispatch(wsPublicConnect(ORDERS_FEED_PATH));
    const wsDisconnect = () => dispatch(wsPublicDisconnect());

    const state = location.state && location.state.background;

    const handleCheckData = async () => {
        await handleUserCheck();
    };

    const handleCloseModal = () => {
        navigate(SHOP_ROUTE);
        localStorage.removeItem('currentItem');
        return dispatch({ type: CLOSE_MODAL });
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