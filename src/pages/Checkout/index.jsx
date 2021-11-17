import { Redirect, useHistory } from "react-router";
import { Button } from "../../components/Button";
import Header from "../../components/Header";
import { useAuth } from "../../providers/auth";
import { useUserData } from "../../providers/userData";
import {
  Container,
  ChildContainer,
  CheckoutContainer,
  CheckoutConfirmation,
} from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useEffect } from "react";

export const Checkout = () => {
  const history = useHistory();

  const { checkoutAuth } = useAuth();

  const {
    userAddress,
    userCardInfo,
    cepResults,
    getAddress,
    cepError,
    addAddress,
    setCepResults,
    removeAddress,
    addCard,
    removeCard,
    cart,
    clearCart,
  } = useUserData();

  const [validateCardButton, setValidateCardButton] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório. Ex: John Doe"),
    cpf: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "Padrão inválido. Ex: 12345678900"
      ),
    cardNumber: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /^(\d{4})(\d{4})(\d{4})(\d{4})$/,
        "Padrão inválido. Ex: 444455556666777"
      ),

    sn: yup
      .string()
      .required("Campo obrigatório")
      .matches(/^(\d{3})$/, "Padrão inválido. Ex: 456"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onCardSubmit = (data) => {
    addCard({
      ...data,
      cardNumber: data.cardNumber.replace(
        data.cardNumber.substr(0, 12),
        "xxxx.xxxx.xxxx."
      ),
      cpf: data.cpf.replace(data.cpf.substr(0, 9), "xxx.xxx.xxx-"),
    });
    reset();
  };

  useEffect(() => {
    if (!cart.length || !checkoutAuth) {
      history.push("/cart");
    }
  }, []);

  return (
    <>
      <Header
        buttonIn1="Produtos"
        buttonIn2="Logout"
        buttonOut1="Login"
        buttonOut2="Produtos"
      ></Header>
      <Container>
        {!cart.length && (
          <CheckoutConfirmation>
            <div className="confirmation_container">
              <div className="icon_content">
                <BsCheckLg />
              </div>
              <div className="confirmation_content">
                <h3>Pedido finalizado com sucesso!</h3>
              </div>
              <Button
                size="md"
                variant="outlined"
                onClick={() => history.push("/produtos")}
              >
                Voltar à produtos
              </Button>
            </div>
          </CheckoutConfirmation>
        )}
        {cart.length > 0 && (
          <>
            <ChildContainer>
              <div className="section_header">
                <h3>Kenzinho</h3>
                <h4>kenzinho@mail.com</h4>
              </div>
              <div className="section_body">
                <h3>Endereço de entrega</h3>

                {Object.values(userAddress).length > 0 ? (
                  <div className="address_info">
                    <div className="info_content">
                      <h3>
                        <span>Cidade:</span> {userAddress.cidade}
                      </h3>
                      <h3>
                        <span>Logradouro:</span> {userAddress.logradouro}
                      </h3>
                      <h3>
                        <span>Numero:</span> {userAddress.numero}
                      </h3>
                      <h3>
                        <span>Estado:</span> {userAddress.estado}
                      </h3>
                      <h3>
                        <span>CEP:</span> {userAddress.cep}
                      </h3>
                    </div>
                    <Button
                      size="md"
                      variant="outlined"
                      onClick={removeAddress}
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <form action="">
                    <div>
                      <input
                        placeholder="CEP"
                        type="number"
                        onChange={(e) => getAddress(e.target.value)}
                      />
                      {cepError && <span>CEP inválido</span>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Estado"
                        disabled
                        value={cepResults?.estado || ""}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Cidade"
                        disabled
                        value={cepResults?.cidade || ""}
                      />
                    </div>
                    <div className="row_content">
                      <input
                        type="text"
                        placeholder="Logradouro"
                        disabled
                        value={cepResults?.logradouro || ""}
                      />
                      <input
                        id="address_number"
                        placeholder="Número"
                        type="number"
                        onChange={(e) =>
                          setCepResults({
                            ...cepResults,
                            numero: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="button_content">
                      <Button
                        size="md"
                        variant="outlined"
                        disabled={
                          !Object.values(cepResults).every(
                            (item) => item.length
                          )
                        }
                        onClick={addAddress}
                      >
                        Adicionar endereço
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ChildContainer>
            <ChildContainer>
              <div className="section_header flex_end">
                <h3>Informações de Pagamento</h3>
              </div>
              <div className="section_body flex_end">
                <h3>Cartão de Crédito</h3>
                {Object.values(userCardInfo).length > 0 ? (
                  <div className="address_info">
                    <div className="info_content">
                      <h3>
                        <span>Nome:</span> {userCardInfo.name}
                      </h3>
                      <h3>
                        <span>CPF:</span> {userCardInfo.cpf}
                      </h3>
                      <h3>
                        <span>Número do Cartão:</span> {userCardInfo.cardNumber}
                      </h3>
                    </div>
                    <Button size="md" variant="outlined" onClick={removeCard}>
                      Remover
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onCardSubmit)}>
                    <div>
                      <input
                        type="text"
                        placeholder="Nome"
                        {...register("name")}
                        onKeyDown={() => setValidateCardButton(true)}
                      />
                      <span>{errors.name?.message}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="CPF"
                        {...register("cpf")}
                      />
                      <span>{errors.cpf?.message}</span>
                    </div>

                    <div className="row_content card">
                      <div>
                        <input
                          placeholder="Número do cartão"
                          {...register("cardNumber")}
                        />
                        <span>{errors.cardNumber?.message}</span>
                      </div>
                      <div>
                        <input
                          placeholder="Cód. de segurança"
                          {...register("sn")}
                        />
                        <span>{errors.sn?.message}</span>
                      </div>
                    </div>
                    <div className="button_content">
                      <Button
                        type="submit"
                        size="md"
                        variant="outlined"
                        disabled={!validateCardButton}
                      >
                        Adicionar Cartão
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ChildContainer>
          </>
        )}
        {cart.length > 0 && (
          <CheckoutContainer>
            <Button
              size="lg"
              disabled={
                !(
                  Object.values(userAddress).length > 0 &&
                  Object.values(userCardInfo).length > 0
                )
              }
              onClick={clearCart}
            >
              Finalizar pedido
            </Button>
          </CheckoutContainer>
        )}
      </Container>
    </>
  );
};
