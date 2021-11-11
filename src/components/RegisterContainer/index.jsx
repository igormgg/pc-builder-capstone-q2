import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const RegisterContainer = () => {
  const { signUp } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Digite seu nome"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Digite seu melhor email"),
    password: yup.string().required("Digite uma senha"),
    confirmPass: yup
      .string()
      .required("Digite a senha novamente")
      .oneOf(
        [yup.ref("password"), null],
        "A senha deve ser a mesma da anterior"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    signUp(data);
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit(handleForm)}>
      <h1>Cadastro</h1>
      <div className="inputWrap">
        <input
          type="text"
          {...register("name")}
          required={errors.name ? true : false}
          placeholder="Nome"
        />
        <label>{errors.name?.message}</label>
      </div>
      <div className="inputWrap">
        <input
          type="email"
          {...register("email")}
          required={errors.email ? true : false}
          placeholder="Email"
        />
        <label>{errors.email?.message}</label>
      </div>
      <div className="inputWrap">
        <input
          type="password"
          {...register("password")}
          required={errors.password ? true : false}
          placeholder="Senha"
        />
        <label>{errors.password?.message}</label>
      </div>
      <div className="inputWrap">
        <input
          type="password"
          {...register("confirmPass")}
          required={errors.confirmPass ? true : false}
          placeholder="Confirmar Senha"
        />
        <label>{errors.confirmPass?.message}</label>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterContainer;
