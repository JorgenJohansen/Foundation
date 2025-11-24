import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

const RequireNotAuth = () => {
    const { user } = useAuthContext();
    const location = useLocation();

    return (
        !user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireNotAuth;
