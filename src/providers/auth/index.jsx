import api from "../../services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || ""
  );

  const history = useHistory();

  const signIn = (data) => {
    api
      .post("/login/", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("userID", JSON.stringify(response.data.user.id));
        setToken(response.data.accessToken);
        history.push("/");
        toast.success(`Bem vindo ${response.data.user.name}`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signUp = (data) => {
    api
      .post("/register/", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("userID", JSON.stringify(response.data.user.id));
        setToken(response.data.accessToken);
        history.push("/");
        toast.success(`Bem vindo ${response.data.user.name}`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signOut = () => {
    localStorage.clear();
    setToken("");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
