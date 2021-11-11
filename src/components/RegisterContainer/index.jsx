const RegisterContainer = () => {
  return (
    <form id="registerForm">
      <h1>Cadastro</h1>
      <div className="inputWrap">
        <input placeholder="Nome" />
      </div>
      <div className="inputWrap">
        <input placeholder="Email" />
      </div>
      <div className="inputWrap">
        <input placeholder="Senha" />
      </div>
      <div className="inputWrap">
        <input placeholder="Confirmar Senha" />
      </div>
      <button>Cadastrar</button>
    </form>
  );
};

export default RegisterContainer;
