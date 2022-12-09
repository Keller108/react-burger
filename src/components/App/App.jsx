import { Routes, Route, useLocation } from "react-router-dom";
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
import { Preloader } from "../Preloader/Preloader";
import { Ingredient } from "../../pages/Ingredient/Ingredient";

export const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isLogined } = useSelector(store => store.userStore);

    const location = useLocation();
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
        }
    };

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
                    </Route>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/ingredients/:ingredientId" element={<Ingredient />} />
                </Routes>
            </>}
        </div>
    );
}