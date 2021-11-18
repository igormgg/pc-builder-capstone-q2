import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import cep from "../../services/cep";
import { useAuth } from "../auth";
import { useCart } from "../../providers/cart";

const userContext = createContext({});

const UserProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState({});
  const [userCardInfo, setUserCardInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("userID") || "");
  const { token, checkoutAuth, setCheckoutAuth } = useAuth();
  const [cepResults, setCepResults] = useState({
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    numero: "",
  });
  const [cepError, setCepError] = useState(false);
  const { cart, setCart } = useCart();
  const [endCheckout, setEndCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setEnvironment();
    }
  }, [token, checkoutAuth, setCheckoutAuth, cart]);

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
        setUserCardInfo(cardData);
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

  const removeAddress = () => {
    api
      .patch(
        `/users/${userId}`,
        { address: {} },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("Endereço removido com sucesso");
        setEnvironment();
      })
      .catch((err) => {
        toast.error("Erro ao remover endereço");
      });
  };

  const addCard = (data) => {
    api
      .patch(
        `/users/${userId}`,
        { card: data },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success("Cartão adicionado com sucesso");
        setEnvironment();
      })
      .catch((err) => "Erro ao adicionar cartão");
  };

  const removeCard = () => {
    api
      .patch(
        `/users/${userId}`,
        { card: {} },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success("Cartão removido com sucesso");
        setEnvironment();
      })
      .catch((err) => "Erro ao remover cartão");
  };

  const clearCart = async () => {
    setIsLoading(true);
    await Promise.all(
      cart.map(async (item) => {
        await api.delete(`/cart/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    ).then(() => {
      setEndCheckout(true);
      setIsLoading(false);
      setCart([]);
    });
  };

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
        removeAddress,
        addCard,
        removeCard,
        clearCart,
        cart,
        endCheckout,
        setEndCheckout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserData = () => useContext(userContext);

export default UserProvider;
