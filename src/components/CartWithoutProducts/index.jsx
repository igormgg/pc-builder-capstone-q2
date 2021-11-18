import { useHistory } from "react-router";

const CartWithoutProducts = () => {
  const history = useHistory();

  return (
    <>
      <h1 id="noProductsTitle">Não há produtos no carrinho</h1>
      <button id="backToShopping" onClick={() => history.push("/")}>
        Voltar às compras
      </button>
    </>
  );
};

export default CartWithoutProducts;
