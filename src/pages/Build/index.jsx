import { Button } from "../../components/Button";
import {
  Container,
  ContainerHeader,
  ContainerMain,
  ContainerFooter,
} from "./styles";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { useBuild } from "../../providers/build";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { useModal } from "../../providers/modal";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
    buildProducts,
  } = useBuild();
  const { isOpen, handleOpenModal } = useModal();

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
      {isOpen && (
        <Modal>
          <ModalDetails />
        </Modal>
      )}
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
                <ul style={{ listStyle: "disc" }}>
                  {checkErrors.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
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
                      <p id="details" onClick={() => handleOpenModal(product)}>
                        Exibir detalhes <AiOutlinePlusCircle />
                      </p>

                      {["gpu", "ram", "drive"].includes(item[0]) ? (
                        <p className="changeable">Qtd: {product.quantity} </p>
                      ) : (
                        <p className="fixed">Qtd: {product.quantity} </p>
                      )}

                      <h3 id="price">
                        Preço:{" "}
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </h3>
                    </div>
                    <div className="footer">
                      {["gpu", "ram", "drive"].includes(item[0]) ? (
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
          {buildSchema["peripherals"].length > 0 && (
            <div className="card">
              <div className="content">
                <h3>Periféricos</h3>
              </div>
              <div className="footer">
                <Button
                  size="sm"
                  onClick={() => history.push(`/build/peripherals`)}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          )}
        </ContainerMain>
        <ContainerFooter>
          <Button
            size="md"
            disabled={!buildProducts.length}
            onClick={() => buildCheckout()}
          >
            Finalizar montagem
          </Button>
        </ContainerFooter>
      </Container>
    </>
  );
};

export default Build;
