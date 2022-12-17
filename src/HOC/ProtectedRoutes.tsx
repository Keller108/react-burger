import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../shared/routes';

type TProtectedRoutesProps = {
  anonymous?: boolean;
}

export const ProtectedRoutes = ({ anonymous = false }: TProtectedRoutesProps) => {
    //@ts-ignore
    const isLoggedIn = useSelector((store) => store.userStore.isLogined);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
      return <Navigate to={ from } />;
    }

    if (!anonymous && !isLoggedIn) {
      return <Navigate to={LOGIN_ROUTE} state={{ from: location}}/>;
    }

    return <Outlet />;
}