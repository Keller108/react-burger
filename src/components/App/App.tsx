import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from '../AppHeader';
import {
    HomePage, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';
import { userCheck } from "../../services/actions/user";
import { ProtectedRoutes } from "../../HOC/ProtectedRoutes";
import { NotFound } from "../../pages/NotFound/NotFound";
import { handleTokenRefresh } from "../../shared/handlers/handleTokenRefresh";
import { Preloader } from "../Preloader";
import { Modal } from "../Modal";
import { Ingredient } from "../../pages/Ingredient/Ingredient";
import { CLOSE_MODAL } from "../../services/actions";
import { SHOP_ROUTE } from "../../shared/routes";

export const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    //@ts-ignore
    const { isActive } = useSelector((store) => store.modal);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //@ts-ignore
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

    const handleCloseModal = () => {
        navigate(SHOP_ROUTE);
        localStorage.removeItem('currentItem');
        return dispatch({ type: CLOSE_MODAL });
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
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/" index element={<HomePage handleCloseModal={handleCloseModal}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path="/ingredients/:ingredientId" element={<Ingredient />} />
                </Routes>
                {state && isActive && <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={<Modal onClose={handleCloseModal} />}
                    />
                </Routes>}
            </>}
        </div>
    );
}