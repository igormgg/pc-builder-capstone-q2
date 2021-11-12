import Header from "../../components/Header";
import { CartContainer } from "./styles";
import { FaTrash } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../providers/auth";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router";
import { useModal } from "../../providers/modal";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Cart = () => {
  const { isOpen, handleOpenModal } = useModal();

  const [cart, setCart] = useState([]);

  const { token } = useAuth();

  const history = useHistory();

  useEffect(() => {
    api
      .get("/cart", {
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
    for (let i = 1; i <= cart.length; i++) {
      api.delete(`/cart/${i}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    toast.success(`Todos os produtos foram removidos do carrinho.`);
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
                      <div>
                        <p onClick={() => handleOpenModal(item)}>
                          Exibir detalhes <AiOutlinePlusCircle />
                        </p>
                      </div>
                      <span>R$ {item.price.toFixed(2)}</span>
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
                R$ {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </h2>
            </div>
            <button id="checkoutButton">Finalizar pedido</button>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;
