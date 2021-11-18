import api from "../../services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || ""
  );

  const [checkoutAuth, setCheckoutAuth] = useState(false);

  const history = useHistory();

  const signIn = (data) => {
    const localStorageProducts = localStorage.getItem("build");
    api
      .post("/login/", data)
      .then((response) => {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("userID", JSON.stringify(response.data.user.id));
        setToken(response.data.accessToken);
        localStorageProducts ? history.push("/build") : history.push("/");
        toast.success(`Bem vindo ${response.data.user.name}!`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signUp = (data) => {
    const localStorageProducts = localStorage.getItem("build");
    api
      .post("/register/", data)
      .then((response) => {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("userID", JSON.stringify(response.data.user.id));
        setToken(response.data.accessToken);
        localStorageProducts ? history.push("/build") : history.push("/");
        toast.success(`Bem vindo ${response.data.user.name}!`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signOut = () => {
    localStorage.clear();
    setToken("");
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        checkoutAuth,
        setCheckoutAuth,
        setToken,
        signIn,
        signUp,
        signOut,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
