import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react/cjs/react.development";
import api from "../../services/api";
import cep from "../../services/cep";
import { useAuth } from "../auth";

const userContext = createContext({});

const UserProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState({});
  const [userCardInfo, setCardInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("userID") || "");
  const { token } = useAuth();
  const [cepResults, setCepResults] = useState({
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    numero: "",
  });
  const [cepError, setCepError] = useState(false);

  useEffect(() => {
    if (token) {
      setEnvironment();
    }
  }, [token]);

  const setEnvironment = () => {
    setUserId(localStorage.getItem("userID"));
    api
      .get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const addressData = res.data.address || {};
        const cardData = res.data.card || {};
        const userData = res.data || {};
        setUserAddress(addressData);
        setCardInfo(cardData);
        setUserInfo(userData);
      });
  };

  const getAddress = (number) => {
    if (number.length >= 8) {
      cep
        .get(`/${number}`)
        .then((res) => {
          const results = res.data;
          const addressSchema = {
            cep: results.cep,
            cidade: results.cidade,
            estado: results.estado,
            logradouro: results.logradouro,
          };
          setCepResults({ ...cepResults, ...addressSchema });
          setCepError(false);
        })
        .catch((err) => {
          setCepError(true);
          setCepResults({
            ...cepResults,
            cep: "",
            cidade: "",
            estado: "",
            logradouro: "",
          });
        });
    } else {
      setCepError(false);
      setCepResults({
        ...cepResults,
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
      });
    }
  };

  const addAddress = (event) => {
    event.preventDefault();
    api
      .patch(
        `/users/${userId}`,
        { address: cepResults },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("Endereço cadastrado com sucesso");
        setEnvironment();
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar endereço");
      });
  };

  const removeAddress = () => {};

  return (
    <userContext.Provider
      value={{
        userAddress,
        userCardInfo,
        userInfo,
        userId,
        getAddress,
        setCepResults,
        cepResults,
        cepError,
        addAddress,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserData = () => useContext(userContext);

export default UserProvider;
