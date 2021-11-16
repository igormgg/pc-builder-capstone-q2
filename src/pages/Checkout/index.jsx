import { useState } from "react";
import { Redirect } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Button } from "../../components/Button";
import Header from "../../components/Header";
import { useAuth } from "../../providers/auth";
import api from "../../services/api";
import cep from "../../services/cep";
import { Container, ChildContainer, CheckoutContainer } from "./styles";

export const Checkout = () => {
  const [cepError, setCepError] = useState(false);
  const { token } = useAuth();
  const userID = localStorage.getItem("userID") || "";
  const [userInfo, setUserInfo] = useState([]);
  //   if (!token) {
  //     return <Redirect to="/sign" />;
  //   }

  const [address, setAddress] = useState({
    estado: "",
    cidade: "",
    logradouro: "",
    number: "",
  });

  const getAddress = (number) => {
    if (number.length >= 8) {
      cep
        .get(`/${number}`)
        .then((res) => {
          const data = res.data;
          setAddress({
            ...address,
            estado: data.estado,
            cidade: data.cidade,
            logradouro: data.logradouro,
          });
          setCepError(false);
        })
        .catch((err) => setCepError(true));
    } else {
      setAddress({ ...address, estado: "", cidade: "", logradouro: "" });
    }
  };

  useEffect(() => {
    api
      .get(`/users/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserInfo(res.data));
  }, []);

  const sendAddress = (event) => {
    event.preventDefault();
    api
      .patch(
        `/users/${userID}`,
        { address: address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

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
            <form action="">
              <div>
                <input
                  placeholder="CEP"
                  onChange={(e) => getAddress(e.target.value)}
                  type="number"
                />
                {cepError && <span>CEP inválido</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Estado"
                  disabled
                  value={address.estado}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Cidade"
                  disabled
                  value={address.cidade}
                />
              </div>
              <div className="row_content">
                <input
                  type="text"
                  placeholder="Logradouro"
                  disabled
                  value={address.logradouro}
                />
                <input
                  type="text"
                  placeholder="Número"
                  type="number"
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                />
              </div>
              <div className="button_content">
                <Button
                  size="md"
                  variant="outlined"
                  disabled={
                    !Object.values(address).every((item) => item.length)
                  }
                  onClick={sendAddress}
                >
                  Adicionar endereço
                </Button>
              </div>
            </form>
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
