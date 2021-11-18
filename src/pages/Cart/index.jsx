import api from "../../services/api";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CartContainer } from "./styles";
import { FaTrash } from "react-icons/fa";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/auth";
import { useEffect } from "react";
import { useModal } from "../../providers/modal";
import { useState } from "react";

const Cart = () => {
  const { isOpen, handleOpenModal } = useModal();

  const [cart, setCart] = useState([]);

  const { setCheckoutAuth, token } = useAuth();

  const history = useHistory();

  const userID = localStorage.getItem("userID") || "";

  useEffect(() => {
    api
      .get(`/cart?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => console.log(err));
  }, [cart]);

  const removeFromCart = (item) => {
    api
      .delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => toast.success(`${item.model} foi removido do carrinho!`));
  };

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

  const checkoutClickHandler = () => {
    setCheckoutAuth(true);
    history.push("/checkout");
  };

  if (!token) {
    return <Redirect to="/sign" />;
  }

  return (
    <>
      {isOpen && (
        <Modal>
          <ModalDetails />
        </Modal>
      )}
      <Header cart={false} buttonIn1="Monte seu PC" buttonIn2="Logout" />
      <CartContainer>
        <div id="topContainer">
          <h1>Carrinho</h1>
          <button
            onClick={clearCart}
            disabled={cart.length === 0 ? true : false}
          >
            Remover Todos
          </button>
        </div>
        {cart.length === 0 ? (
          <>
            <h1>Não há produtos no carrinho</h1>
            <button id="backToShopping" onClick={() => history.push("/")}>
              Voltar às compras
            </button>
          </>
        ) : (
          <>
            <ul id="productsContainer">
              {cart.map((item, index) => (
                <li key={index}>
                  <div id="leftDiv">
                    <img src={item.img} alt={item.model} />
                    <div id="productDetails">
                      <h3>{item.model}</h3>
                      <p onClick={() => handleOpenModal(item)}>
                        Exibir detalhes <AiOutlinePlusCircle />
                      </p>
                      <span>{(item.price).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>
                    </div>
                  </div>
                  <div id="trashDiv">
                    <FaTrash onClick={() => removeFromCart(item)} />
                  </div>
                </li>
              ))}
            </ul>
            <div id="bottomContainer">
              <h2>Total:</h2>
              <h2>
                {cart.reduce((acc, item) => acc + item.price, 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
              </h2>
            </div>
            <button id="checkoutButton" onClick={checkoutClickHandler}>
              Checkout
            </button>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;
