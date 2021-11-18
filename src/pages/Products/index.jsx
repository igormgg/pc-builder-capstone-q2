import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Container } from "./styles";
import api from "../../services/api.js";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Header from "../../components/Header";
import { useModal } from "../../providers/modal";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/auth";

const Products = () => {
  const history = useHistory();

  const { isOpen, handleOpenModal } = useModal();

  const [products, setProducts] = useState({});

  const [searchInput, setSearchInput] = useState("");

  const [category, setCategory] = useState("");

  const [everyProduct, setEveryProduct] = useState([]);

  const { token } = useAuth();

  const categoryFilter = products[category]?.filter(
    (element) =>
      element.model.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.price.toString().includes(searchInput) ||
      Number(searchInput) <= element.price
  );

  const everyProductFilter = everyProduct.filter(
    (element) =>
      element.model.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.price.toString().includes(searchInput) ||
      Number(searchInput) <= element.price
  );

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let newProducts = [];
    Object.keys(products).forEach((element) =>
      products[element].forEach((item) => {
        newProducts.push(item);
      })
    );
    setEveryProduct(newProducts);
  }, [products]);

  const addToCart = (item) => {
    const userId = localStorage.getItem("userID");

    if (token) {
      api
        .post(
          "/cart/",
          { ...item, userId: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => toast.success(`${item.model} foi adicionado ao carrinho!`))
        .catch(() => toast.error("Ops, algo deu errado!"));
    } else {
      toast.info("Efetue login para adicionar produtos no carrinho!");
      history.push("/sign");
    }
  };

  return (
    <>
      <Header
        buttonOut1="Login"
        buttonOut2="Registro"
        buttonIn1="Monte seu PC"
        buttonIn2="Logout"
      />
      {isOpen && (
        <Modal>
          <ModalDetails />
        </Modal>
      )}
      <Container>
        <div id="homeCover">
          <button onClick={() => history.push("/build")}>Monte seu PC</button>
        </div>
        <div id="banner">
          <h3>PRODUTOS</h3>
        </div>

        <div id="filters">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Pesquisar"
          />

          <select
            onChange={(event) => setCategory(event.target.value)}
            name="category"
            id="categories"
          >
            <option value="">Todos</option>
            <option value="drive">Armazenamento</option>
            <option value="cooler">Cooler</option>
            <option value="font">Fonte</option>
            <option value="case">Gabinete</option>
            <option value="ram">Memória Ram</option>
            <option value="peripherals">Periféricos</option>
            <option value="gpu">Placa de vídeo</option>
            <option value="motherboard">Placa mãe</option>
            <option value="cpu">Processador</option>
          </select>
        </div>

        <div id="products">
          {searchInput ? (
            categoryFilter?.length > 0 || everyProductFilter?.length > 0 ? (
              category ? (
                categoryFilter.map((element, index) => (
                  <div id="card" key={index}>
                    <div id="imageDiv">
                      <img src={element.img} alt={element.model} />
                    </div>
                    <div id="contentDiv">
                      <div id="info">
                        <h3>{element.model}</h3>
                        <p onClick={() => handleOpenModal(element)}>
                          Exibir detalhes <AiOutlinePlusCircle id="plusIcon" />
                        </p>
                        <h3>
                          {element.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(element);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                everyProductFilter.map((element, index) => (
                  <div id="card" key={index}>
                    <div id="imageDiv">
                      <img src={element.img} alt={element.model} />
                    </div>
                    <div id="contentDiv">
                      <div id="info">
                        <h3>{element.model}</h3>
                        <p onClick={() => handleOpenModal(element)}>
                          Exibir detalhes <AiOutlinePlusCircle id="plusIcon" />
                        </p>
                        <h3>
                          {element.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(element);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : (
              <div id="empty">
                <h3>Nenhum produto encontrado...</h3>
              </div>
            )
          ) : category ? (
            products[category]?.map((element, index) => (
              <div id="card" key={index}>
                <div id="imageDiv">
                  <img src={element.img} alt={element.model} />
                </div>
                <div id="contentDiv">
                  <div id="info">
                    <h3>{element.model}</h3>
                    <p onClick={() => handleOpenModal(element)}>
                      Exibir detalhes <AiOutlinePlusCircle id="plusIcon" />
                    </p>
                    <h3>
                      {element.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(element);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))
          ) : (
            everyProduct.map((element, index) => (
              <div id="card" key={index}>
                <div id="imageDiv">
                  <img src={element.img} alt={element.model} />
                </div>
                <div id="contentDiv">
                  <div id="info">
                    <h3>{element.model}</h3>
                    <p onClick={() => handleOpenModal(element)}>
                      Exibir detalhes <AiOutlinePlusCircle id="plusIcon" />
                    </p>
                    <h3>
                      {element.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(element);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default Products;
