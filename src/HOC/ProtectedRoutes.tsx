import { useSelector } from '../shared/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../shared/routes';

type TProtectedRoutesProps = {
  anonymous?: boolean;
};

export const ProtectedRoutes = ({ anonymous = false }: TProtectedRoutesProps) => {
    const isLoggedIn = useSelector((store) => store.userStore.isLogined);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
      return <Navigate to={ from } state={{ from: location}} />;
    }

    if (!anonymous && !isLoggedIn) {
      return <Navigate to={LOGIN_ROUTE} state={{ from: location}} />;
    }

    return <Outlet />;
}