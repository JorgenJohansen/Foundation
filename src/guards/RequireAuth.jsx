import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const RequireAuth = () => {
    const { user } = useAuthContext();
    const location = useLocation();

    return (
        user ? (<Outlet />) : (<Navigate to="logg-inn" state={{ from: location }} replace />)
    )
}

export default RequireAuth;
