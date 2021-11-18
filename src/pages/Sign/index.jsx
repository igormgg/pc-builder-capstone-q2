import Header from "../../components/Header";
import LoginContainer from "../../components/LoginContainer";
import RegisterContainer from "../../components/RegisterContainer";
import SignContainer from "./styles";
import { Redirect } from "react-router";
import { useAuth } from "../../providers/auth";

const Sign = () => {
  const { token } = useAuth();

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header buttonOut1="Produtos" buttonOut2="Monte seu PC" />
      <SignContainer>
        <LoginContainer />
        <RegisterContainer />
      </SignContainer>
    </>
  );
};

export default Sign;
