import { Routes, Route, useNavigate } from "react-router-dom";
import { AppHeader } from '../AppHeader/AppHeader';
import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const App = () => {
    const { user, isLogined }  = useSelector(store => store.user);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        console.log('isLogined', isLogined);
        if (isLogined === true) {
            navigate('/');
        }
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
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}