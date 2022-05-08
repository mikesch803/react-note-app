import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";

export const RequireAuth = () => {
  const { token } = useAuthContext();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
