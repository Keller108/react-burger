import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...props}) => {
    const { isLogged } = useSelector(store => store.user);
    return (
        <Route>
            {
                () => props.isLogged ? <Component {...props} /> : <Navigate to="/login"/>
            }
        </Route>
    )
}