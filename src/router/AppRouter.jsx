import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticatedLayout } from "../layout/";
import { useEffect } from "react";
import { Navbar } from "../layout";
import { HomePage } from "../home";
import { LoginPage } from "../auth";
import { BudgetPage } from "../budget";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
        {status === "non-authenticated" ? (
          <>
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthenticatedLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="/budget" element={<BudgetPage />} />
            </Route>
            
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
  );
};
