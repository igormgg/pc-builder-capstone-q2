import SignContainer from "./styles";

const Sign = () => {
  return (
    <SignContainer>
      <form id="loginForm">
        <h1>Login</h1>
        <input placeholder="Email" />
        <input placeholder="Senha" />
        <button>Entrar</button>
      </form>
      <form id="registerForm">
        <h1>Cadastro</h1>
        <input placeholder="Nome" />
        <input placeholder="Email" />
        <input placeholder="Senha" />
        <input placeholder="Confirmar Senha" />
        <button>Cadastrar</button>
      </form>
    </SignContainer>
  );
};

export default Sign;
