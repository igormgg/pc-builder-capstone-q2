import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import api from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("PCBuilderToken")) || ""
  );

  useEffect(() => {
    token ? setIsAuth(true) : setIsAuth(false);
  }, [token]);

  const history = useHistory();

  const writeToken = (token) => {
    setToken(token);
  };

  const signIn = (data) => {
    api
      .post("login/", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem(
          "PCBuilderToken",
          JSON.stringify(response.data.accessToken)
        );
        setToken(response.data.accessToken);
        history.push("/");
        toast.success(`Bem vindo ${response.data.user.name}`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  return (
    <AuthContext.Provider value={{ isAuth, signIn, token, writeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
