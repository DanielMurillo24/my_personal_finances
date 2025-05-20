import { useDispatch, useSelector } from "react-redux";
import financeApi from "../apis/financeApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../storage";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initlogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await financeApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (error.response) {
        // Si el backend responde con 401, es un error de autenticación real
        if (error.response.status === 401) {
          dispatch(onLogout("Wrong Credentials"));
        } else {
          dispatch(onLogout("Server error. Please try again."));
        }
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.log("No response from server");
        dispatch(onLogout("No response from server."));
      } else {
        // Otro tipo de error
        console.log("Error", error.message);
        dispatch(onLogout("Unexpected error occurred."));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const newRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await financeApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || ""));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await financeApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const initlogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,

    checkAuthToken,
    initlogin,
    newRegister,
    initlogout,
  };
};
