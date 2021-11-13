import { Button } from "../../components/Button";
import {
  Container,
  ContainerHeader,
  ContainerMain,
  ContainerFooter,
} from "./styles";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { useBuild } from "../../providers/build";

const Build = () => {
  const history = useHistory();
  const { buildSchema, removeFromBuild, buildTotal, buildWatts } = useBuild();

  const categorySchema = {
    cpu: "Processador",
    cooler: "Cooler",
    gpu: "Placa de Vídeo",
    motherboard: "Placa Mãe",
    ram: "Memória Ram",
    drive: "Armazenamento",
    case: "Gabinete",
    font: "Fonte",
    peripherals: "Periféricos",
  };

  return (
    <>
      <Header button1="Login" button2="Registro"></Header>
      <Container>
        <ContainerHeader>
          <div className="text">
            <h3>Build</h3>
          </div>
          <div className="info">
            <h3 id="total">
              Valor total:{" "}
              {buildTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h3>
            <h3 id="psu">Consumo estimado: {buildWatts}W</h3>
          </div>
          <div className="validation_status">
            <div className="content">
              <h3>
                Inicie sua montagem para verificarmos a compatibilidade entre
                seus componentes :)
              </h3>
            </div>
          </div>
          {/* <div className="validation_status">
          <div className="content fail">
            <IoIosWarning></IoIosWarning>
            <h3>Incompatibilidade detectada</h3>
          </div>
        </div> */}
          {/* <div className="validation_status">
          <div className="content success">
            <BsCheckCircleFill></BsCheckCircleFill>
            <h3>Compatibilidade verificada com sucesso</h3>
          </div>
        </div> */}
        </ContainerHeader>
        <ContainerMain>
          {Object.entries(categorySchema).map((item, index) => {
            return buildSchema[item[0]].length ? (
              buildSchema[item[0]].map((product, key) => {
                return (
                  <div className="card filled" key={key}>
                    <div className="header">
                      <img src={product.img} alt="" />
                    </div>
                    <div className="body">
                      <h3 id="category">{item[1]}</h3>
                      <h3 id="model">{product.model}</h3>
                      <h3 id="price">
                        Preço:{" "}
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </h3>
                    </div>
                    <div className="footer">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          removeFromBuild(product.productID, item[0])
                        }
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
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
        </ContainerMain>
        <ContainerFooter>
          <Button size="md" onClick={() => console.log(buildSchema)}>
            Finalizar montagem
          </Button>
        </ContainerFooter>
      </Container>
    </>
  );
};

export default Build;
