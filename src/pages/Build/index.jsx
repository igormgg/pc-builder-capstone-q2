import { Button } from "../../components/Button";
import { Container, Header, Main, Footer } from "./style";
import { useHistory } from "react-router";

const Build = () => {
  const cpu = {
    model: "AMD Ryzen 5 3600",
    cores: "6",
    threads: "12",
    socket: "AM4",
    baseClock: "3.6",
    coolerBox: true,
    graphics: false,
    price: 1678.31,
    img: "https://static.meupc.net/produto/processador-amd-ryzen-5-3600-100100000031box-jXdm89-L.jpg",
  };

  const history = useHistory();

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
      </Header>
      <Main>
        <div className="card">
          <div className="content">
            <h3>Gabinete</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Processador</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Cooler</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Place de Vídeo</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Placa Mãe</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Memória Ram</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Armazenamento</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Fonte</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h3>Periféricos</h3>
          </div>
          <div className="footer">
            <Button size="sm">Adicionar</Button>
          </div>
        </div>

        <div className="card filled">
          <div className="header">
            <img src={cpu.img} alt="" />
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
        </div>
      </Main>
      <Footer>
        <Button size="md">Finalizar montagem</Button>
      </Footer>
    </Container>
  );
};

export default Build;
