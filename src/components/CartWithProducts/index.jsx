import api from "../../services/api";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/auth";
import { useCart } from "../../providers/cart";
import { useHistory } from "react-router";
import { useModal } from "../../providers/modal";

const CartWithProducts = () => {
  const { cart } = useCart();

  const { setCheckoutAuth, token } = useAuth();

  const { handleOpenModal } = useModal();

  const history = useHistory();

  const removeFromCart = (item) => {
    api
      .delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => toast.success(`${item.model} foi removido do carrinho!`));
  };

  const checkoutClickHandler = () => {
    setCheckoutAuth(true);
    history.push("/checkout");
  };

  return (
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
                <span>
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
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
          {cart
            .reduce((acc, item) => acc + item.price, 0)
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </h2>
      </div>
      <button id="checkoutButton" onClick={checkoutClickHandler}>
        Checkout
      </button>
    </>
  );
};

export default CartWithProducts;
