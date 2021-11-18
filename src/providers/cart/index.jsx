import api from "../../services/api";
import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { token } = useAuth();

  const clearCart = () => {
    cart.forEach((item) => {
      api.delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
    toast.success(`Todos os produtos foram removidos do carrinho.`);
  };

  return (
    <CartContext.Provider value={{ cart, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
