import Logo from "../../assets/images/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { HeaderContainer } from "./styles";
import { useHistory } from "react-router";

const Header = ({ button1, button2, cart = true }) => {
  const history = useHistory();

  const handleClick1 = () => {
    if (button1 === "Login") {
      history.push("sign");
    }
    if (button1 === "Produtos") {
      history.push("/");
    }
  };

  const handleClick2 = () => {
    if (button2 === "Registro") {
      history.push("sign");
    }
    if (button2 === "Monte seu PC") {
      history.push("build");
    }
  };

  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" onClick={() => history.push("/")} />
      <div id="headerEnd">
        <div id="buttonsDiv">
          <button id="button1" onClick={handleClick1}>
            {button1}
          </button>
          <button id="button2" onClick={handleClick2}>
            {button2}
          </button>
        </div>
        {cart && <FaShoppingCart onClick={() => history.push("cart")} />}
      </div>
    </HeaderContainer>
  );
};

export default Header;