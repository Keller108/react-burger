import { Routes, Navigate, Route } from "react-router-dom";
import { AppHeader } from '../AppHeader/AppHeader';
import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile
} from "../../pages";
import appStyles from './App.module.css';

export const App = () => {
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