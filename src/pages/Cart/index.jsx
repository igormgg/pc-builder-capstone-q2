import api from "../../services/api";
import CartWithoutProducts from "../../components/CartWithoutProducts";
import CartWithProducts from "../../components/CartWithProducts";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { CartContainer } from "./styles";
import { Redirect } from "react-router";
import { useAuth } from "../../providers/auth";
import { useCart } from "../../providers/cart";
import { useModal } from "../../providers/modal";
import { useEffect } from "react";

const Cart = () => {
  const { isOpen } = useModal();

  const { cart, clearCart, setCart } = useCart();

  const { token } = useAuth();

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
        {cart.length === 0 ? <CartWithoutProducts /> : <CartWithProducts />}
      </CartContainer>
    </>
  );
};

export default Cart;
