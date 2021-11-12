import Header from "../../components/Header";
import { CartContainer } from "./styles";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  return (
    <>
      <Header cart={false} button1="Produtos" button2="Monte seu PC" />
      <CartContainer>
        <div id="topContainer">
          <h1>Carrinho</h1>
          <button>Remover Todos</button>
        </div>
        <ul id="productsContainer">
          <li>
            <div id="leftDiv">
              <img src="" alt="" />
              <div id="productDetails">
                <h3>Product</h3>
                <p>Exibir detalhes</p>
                <span>Preço</span>
              </div>
            </div>
            <div id="trashDiv">
              <FaTrash />
            </div>
          </li>
          <li>
            <div id="leftDiv">
              <img src="" alt="" />
              <div id="productDetails">
                <h3>Product</h3>
                <p>Exibir detalhes</p>
                <span>Preço</span>
              </div>
            </div>
            <div id="trashDiv">
              <FaTrash />
            </div>
          </li>
        </ul>
        <div id="bottomContainer">
          <h2>Total</h2>
          <h2>Preço Total</h2>
        </div>
        <button id="checkoutButton">Finalizar pedido</button>
      </CartContainer>
    </>
  );
};

export default Cart;
