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
  const {
    buildSchema,
    addToBuild,
    removeFromBuild,
    buildTotal,
    buildWatts,
    buildCheckout,
    checkErrors,
  } = useBuild();

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
      <Header
        buttonIn1="Produtos"
        buttonIn2="Logout"
        buttonOut1="Login"
        buttonOut2="Produtos"
      ></Header>
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
          {checkErrors.every((item) => !item) && !buildTotal && (
            <div className="validation_status">
              <div className="content">
                <h3>
                  Inicie sua montagem para verificarmos a compatibilidade entre
                  seus componentes :)
                </h3>
              </div>
            </div>
          )}
          {checkErrors.some((item) => item) && (
            <div className="validation_status">
              <div className="content fail">
                <IoIosWarning></IoIosWarning>
                <h3>Incompatibilidade detectada</h3>
                {checkErrors.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </div>
          )}
          {checkErrors.every((item) => !item) && !!buildTotal && (
            <div className="validation_status">
              <div className="content success">
                <BsCheckCircleFill></BsCheckCircleFill>
                <h3>Compatibilidade verificada com sucesso</h3>
              </div>
            </div>
          )}
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

                      {["gpu", "peripherals", "ram", "drive"].includes(
                        item[0]
                      ) && <p>Qtd: {product.quantity} </p>}

                      <h3 id="price">
                        Preço:{" "}
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </h3>
                    </div>
                    <div className="footer">
                      {["gpu", "ram", "peripherals", "drive"].includes(
                        item[0]
                      ) ? (
                        <>
                          <Button
                            size="us"
                            variant="outlined"
                            onClick={() =>
                              removeFromBuild(product.productID, item[0])
                            }
                          >
                            -
                          </Button>
                          <Button
                            size="us"
                            variant="outlined"
                            onClick={() => addToBuild(product, item[0])}
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="outlined"
                            onClick={() => history.push(`/build/${item[0]}`)}
                          >
                            Mais Modelos
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outlined"
                          onClick={() =>
                            removeFromBuild(product.productID, item[0])
                          }
                        >
                          Remover
                        </Button>
                      )}
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
        </ContainerMain>
        <ContainerFooter>
          <Button size="md" onClick={() => buildCheckout()}>
            Finalizar montagem
          </Button>
        </ContainerFooter>
      </Container>
    </>
  );
};

export default Build;
