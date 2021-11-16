import { useState } from "react";
import { Redirect } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Button } from "../../components/Button";
import Header from "../../components/Header";
import { useAuth } from "../../providers/auth";
import { useUserData } from "../../providers/userData";
import { Container, ChildContainer, CheckoutContainer } from "./styles";

export const Checkout = () => {
  const { token } = useAuth();
  const {
    userAddress,
    userCardInfo,
    userInfo,
    userId,
    cepResults,
    getAddress,
    cepError,
    addAddress,
    setCepResults,
    removeAddress,
  } = useUserData();

  return (
    <>
      <Header
        buttonIn1="Produtos"
        buttonIn2="Logout"
        buttonOut1="Login"
        buttonOut2="Produtos"
      ></Header>
      <Container>
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
                  <h3>Cidade: {userAddress.cidade}</h3>
                  <h3>Logradouro: {userAddress.logradouro}</h3>
                  <h3>Numero: {userAddress.numero}</h3>
                  <h3>Estado: {userAddress.estado}</h3>
                  <h3>CEP: {userAddress.cep}</h3>
                </div>
                <Button size="md" variant="outlined" onClick={removeAddress}>
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
                    type="text"
                    placeholder="Número"
                    type="number"
                    onChange={(e) =>
                      setCepResults({ ...cepResults, numero: e.target.value })
                    }
                  />
                </div>
                <div className="button_content">
                  <Button
                    size="md"
                    variant="outlined"
                    disabled={
                      !Object.values(cepResults).every((item) => item.length)
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
            <form action="">
              <div>
                <input type="text" placeholder="Nome" />
              </div>
              <div>
                <input type="text" placeholder="CPF" />
              </div>
              <div>
                <input type="text" placeholder="Número do cartão" />
              </div>
              <div className="row_content">
                <input type="text" placeholder="Código de segurança" />
              </div>
              <div className="button_content">
                <Button size="md" variant="outlined">
                  Adicionar Cartão
                </Button>
              </div>
            </form>
          </div>
        </ChildContainer>
        <CheckoutContainer>
          <Button size="lg">Finalizar pedido</Button>
        </CheckoutContainer>
      </Container>
    </>
  );
};
