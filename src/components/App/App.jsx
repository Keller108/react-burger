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
    const { isActive } = useSelector(store => store.modal);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserCheck = () => dispatch(userCheck());

    const state = location.state && location.state.background;

    const handleCheckData = async () => {
        setIsLoading(true);
        let res = await handleUserCheck();

        if (res && res.success) {
            setIsLoading(false);
        } else if (res && !res.success) {
            let result = await handleTokenRefresh();

            if (result && result.success) {
                setIsLoading(false);
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 10000)
            }
        } else {
            setIsLoading(false);
            if (location.pathname !== SHOP_ROUTE) navigate(LOGIN_ROUTE);
        }
    }

    useEffect(() => {
        handleCheckData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            {isLoading ? <Preloader /> : <>
                <Routes location={state || location}>
                    <Route element={<ProtectedRoutes isLogined={isLogined} />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
                        {state && isActive && (
                            <Route
                                path='/ingredients/:ingredientId'
                                element={<Modal>
                                    <IngredientDetails />
                                </Modal>}
                            />
                        )}
                    </Route>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </>}
        </div>
    );
}