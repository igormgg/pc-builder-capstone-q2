import Logo from "../../assets/images/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { HeaderContainer } from "./styles";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/auth";

const Header = ({
  buttonOut1,
  buttonOut2,
  buttonIn1,
  buttonIn2,
  cart = true,
}) => {
  const history = useHistory();

  const { signOut, token } = useAuth();

  const handleClick1 = () => {
    if (token) {
      if (buttonIn1 === "Login") {
        history.push("/sign");
      }
      if (buttonIn1 === "Produtos") {
        history.push("/");
      }
      if (buttonIn1 === "Registro") {
        history.push("/sign");
      }
      if (buttonIn1 === "Monte seu PC") {
        history.push("/build");
      }
      if (buttonIn1 === "Logout") {
        signOut();
      }
    } else {
      if (buttonOut1 === "Login") {
        history.push("/sign");
      }
      if (buttonOut1 === "Produtos") {
        history.push("/");
      }
      if (buttonOut1 === "Registro") {
        history.push("/sign");
      }
      if (buttonOut1 === "Monte seu PC") {
        history.push("/build");
      }
    }
  };

  const handleClick2 = () => {
    if (token) {
      if (buttonIn2 === "Login") {
        history.push("/sign");
      }
      if (buttonIn2 === "Produtos") {
        history.push("/");
      }
      if (buttonIn2 === "Registro") {
        history.push("/sign");
      }
      if (buttonIn2 === "Monte seu PC") {
        history.push("/build");
      }
      if (buttonIn2 === "Logout") {
        signOut();
      }
    } else {
      if (buttonOut2 === "Login") {
        history.push("/sign");
      }
      if (buttonOut2 === "Produtos") {
        history.push("/");
      }
      if (buttonOut2 === "Registro") {
        history.push("/sign");
      }
      if (buttonOut2 === "Monte seu PC") {
        history.push("/build");
      }
    }
  };

  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" onClick={() => history.push("/")} />
      <div id="headerEnd">
        <div id="buttonsDiv">
          <button id="button1" onClick={handleClick1}>
            {token ? buttonIn1 : buttonOut1}
          </button>
          <button id="button2" onClick={handleClick2}>
            {token ? buttonIn2 : buttonOut2}
          </button>
        </div>
        {cart && <FaShoppingCart onClick={() => history.push("/cart")} />}
      </div>
    </HeaderContainer>
  );
};

export default Header;
