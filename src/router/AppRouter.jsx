import { Route, Routes } from "react-router-dom";
import { AdminRoutes } from "../pages/admin/routes/AdminRoutes";
import { LoginPage } from "../pages/auth/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
