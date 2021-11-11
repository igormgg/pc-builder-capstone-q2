import { useHistory } from "react-router";
import Logo from "../../assets/images/logo.png";
import { FaShoppingCart } from "react-icons/fa";

import { HeaderContainer } from "./styles";

const Header = () => {
  const history = useHistory();

  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" onClick={() => history.push("/")} />
      <div id="headerEnd">
        <div id="buttonsDiv">
          <button id="button1">Login</button>
          <button id="button2">Registro</button>
        </div>
        <FaShoppingCart />
      </div>
    </HeaderContainer>
  );
};

export default Header;
