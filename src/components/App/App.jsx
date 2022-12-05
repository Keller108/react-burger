import { Routes, Route, useNavigate } from "react-router-dom";
import { AppHeader } from '../AppHeader/AppHeader';
import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCheck } from "../../services/actions/user";
import { ProtectedRoutes } from "../../HOC/ProtectedRoutes";
import { NotFound } from "../../pages/NotFound/NotFound";
import { handleTokenRefresh } from "../../utils/handlers/handleTokenRefresh";

export const App = () => {
    const { user, isLogined }  = useSelector(store => store.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkData = async () => {
        await handleTokenRefresh();
        dispatch(userCheck());
    };

    useEffect(() => {
        if (!isLogined) {
            navigate('/login');
            checkData();
        }
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isLogined === true) {
            navigate('/');
        }
    // eslint-disable-next-line
    }, [user])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Routes>
                <Route element={<ProtectedRoutes isLogined={isLogined} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </div>
    );
}