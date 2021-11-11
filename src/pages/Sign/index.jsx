import LoginContainer from "../../components/LoginContainer";
import RegisterContainer from "../../components/RegisterContainer";
import SignContainer from "./styles";
import { useAuth } from "../../providers/auth";
import { Redirect } from "react-router";

const Sign = () => {
  const { token } = useAuth();
  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <SignContainer>
        <LoginContainer />
        <RegisterContainer />
      </SignContainer>
    </>
  );
};

export default Sign;
