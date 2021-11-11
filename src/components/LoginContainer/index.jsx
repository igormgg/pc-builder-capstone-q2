import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LoginContainer = () => {
  const { signIn } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Digite seu email"),
    password: yup.string().required("Digite sua senha"),
  });

  const {
    register,
    handleSubmit,
    // formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    signIn(data);
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit(handleForm)}>
      <h1>Login</h1>
      <div className="inputWrap">
        <input
          type="email"
          {...register("email")}
          required={errors.loginEmail ? true : false}
          placeholder="Email"
        />
        <label>{errors.loginEmail?.message}</label>
      </div>
      <div className="inputWrap">
        <input
          type="password"
          {...register("password")}
          required={errors.loginPassword ? true : false}
          placeholder="Senha"
        />
        <label>{errors.loginPassword?.message}</label>
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginContainer;
