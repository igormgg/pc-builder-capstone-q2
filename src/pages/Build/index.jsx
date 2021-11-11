import { Button } from "../../components/Button";
import { Container, Header, Main, Footer } from "./style";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useHistory } from "react-router";

const Build = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/").then((res) => setProducts(res.data));
  }, []);

  console.log(products);

  const categorySchema = {
    cpu: "Processador",
    gpu: "Placa de Vídeo",
    motherboard: "Placa Mãe",
    ram: "Memória Ram",
    drive: "Armazenamento",
    case: "Gabinete",
    font: "Fonte",
    peripherals: "Periféricos",
  };

  return (
    <Container>
      <Header>
        <div className="text">
          <h3>Build</h3>
        </div>
        <div className="info">
          <h3 id="total">Valor total: R$ 1.750,00</h3>
          <h3 id="psu">Consumo estimado: 65W</h3>
        </div>
        {/* <div className="validation_status">
          <div className="content">
            <h3>
              Inicie sua montagem para verificarmos a compatibilidade entre seus
              componentes :)
            </h3>
          </div>
        </div>
        <div className="validation_status">
          <div className="content fail">
            <IoIosWarning></IoIosWarning>
            <h3>Incompatibilidade detectada</h3>
          </div>
        </div> */}
        <div className="validation_status">
          <div className="content success">
            <BsCheckCircleFill></BsCheckCircleFill>
            <h3>Compatibilidade verificada com sucesso</h3>
          </div>
        </div>
      </Header>
      <Main>
        {Object.entries(categorySchema).map((item, index) => {
          return (
            <div className="card" key={index}>
              <div className="content">
                <h3>{item[1]}</h3>
              </div>
              <div className="footer">
                <Button
                  size="sm"
                  onClick={() => history.push(`/build/${item[0]}`)}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          );
        })}

        {/*

        <div className="card filled">
          <div className="header">
            <img
              src="https://static.meupc.net/produto/processador-amd-ryzen-5-3600-100100000031box-jXdm89-L.jpg"
              alt=""
            />
          </div>
          <div className="body">
            <h3 id="category">Processador</h3>
            <h3 id="model">AMD Ryzen 5 3600 3.6 GHz 6-Core </h3>
            <h3 id="price">Preço: R$ 1.750,00</h3>
          </div>
          <div className="footer">
            <Button size="sm" variant="outlined">
              Remover
            </Button>
          </div>
        </div> */}
      </Main>
      <Footer>
        <Button size="md">Finalizar montagem</Button>
      </Footer>
    </Container>
  );
};

export default Build;
