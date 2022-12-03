import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AppHeader } from '../AppHeader/AppHeader';
import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCheck } from "../../services/actions/user";
import { ProtectedRoute } from "../../HOC/ProtectedRoute";

export const App = () => {
    const { user, isLogined }  = useSelector(store => store.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckUser = () => dispatch(userCheck());

    useEffect(() => {
        if (!isLogined) {
            navigate('/login');
            handleCheckUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isLogined === true) {
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={!isLogined ? <Navigate to="/login" /> : <Profile />} />
            </Routes>
        </div>
    );
}