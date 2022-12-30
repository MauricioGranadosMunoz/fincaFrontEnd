import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../pages/auth/CheckingAuth";

export const PrivateRoute = ({ children }) => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return status ? children : <Navigate to="/login" />;
};
