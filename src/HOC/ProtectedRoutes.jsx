import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({ isLogined }) => {
    return (
        isLogined ? <Outlet/> : <Navigate to="/login"/>
    )
}

ProtectedRoutes.propTypes = {
    isLogined: PropTypes.bool.isRequired
}