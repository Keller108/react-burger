import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppHeader } from '../AppHeader/AppHeader';
import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userCheck } from "../../services/actions/user";
import { ProtectedRoutes } from "../../HOC/ProtectedRoutes";
import { NotFound } from "../../pages/NotFound/NotFound";
import { handleTokenRefresh } from "../../utils/handlers/handleTokenRefresh";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/routes";
import { Preloader } from "../Preloader/Preloader";
import { IngredientDetails } from "../IngredientDetails";
import { Modal } from "../Modal";

export const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isLogined } = useSelector(store => store.userStore);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = location.state && location.state.background;

    const handleModalClose = () => {
      navigate.goBack();
    };

    const handleUserCheck = () => dispatch(userCheck());

    useEffect(() => {
        setIsLoading(true);
        handleTokenRefresh()
            .then(res => res)
            .catch(err => console.log(`Ошибка при проверке токена – ${err}`));
        handleUserCheck()
            .then(res => {
                if (res && res.success) {
                    navigate(SHOP_ROUTE);
                } else {
                    navigate(LOGIN_ROUTE);
                }
                setIsLoading(false);
            })
            .catch(err => console.log(`Ошибка при проверке токена – ${err}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            {isLoading ? <Preloader /> : <>
                <Routes location={state || location}>
                    <Route element={<ProtectedRoutes isLogined={isLogined} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
                {state && (
                    <Routes>
                        <Route
                            path='/ingredients/:ingredientId'
                            element={<Modal onClose={handleModalClose}>
                                <IngredientDetails />
                            </Modal>}
                        />
                    </Routes>
                )}
            </>}
        </div>
    );
}