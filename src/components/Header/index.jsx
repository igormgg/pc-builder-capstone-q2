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
      switch (buttonIn1) {
        case "Produtos":
          history.push("/");
          break;
        case "Login":
          history.push("/sign");
          break;
        case "Registro":
          history.push("/sign");
          break;
        case "Monte seu PC":
          history.push("/build");
          break;
        case "Logout":
          signOut();
          break;
        default:
        // Do nothing
      }
    } else {
      switch (buttonOut1) {
        case "Produtos":
          history.push("/");
          break;
        case "Login":
          history.push("/sign");
          break;
        case "Registro":
          history.push("/sign");
          break;
        case "Monte seu PC":
          history.push("/build");
          break;
        case "Logout":
          signOut();
          break;
        default:
        // Do nothing
      }
    }
  };

  const handleClick2 = () => {
    if (token) {
      switch (buttonIn2) {
        case "Produtos":
          history.push("/");
          break;
        case "Login":
          history.push("/sign");
          break;
        case "Registro":
          history.push("/sign");
          break;
        case "Monte seu PC":
          history.push("/build");
          break;
        case "Logout":
          signOut();
          break;
        default:
        // Do nothing
      }
    } else {
      switch (buttonOut2) {
        case "Produtos":
          history.push("/");
          break;
        case "Login":
          history.push("/sign");
          break;
        case "Registro":
          history.push("/sign");
          break;
        case "Monte seu PC":
          history.push("/build");
          break;
        case "Logout":
          signOut();
          break;
        default:
        // Do nothing
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
