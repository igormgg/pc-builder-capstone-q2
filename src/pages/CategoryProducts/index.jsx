import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "./style";
import api from "../../services/api.js"

const CategoryProducts = () => {
  const { category } = useParams();

  const [products, setProducts] = useState({})

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const filter = products[category] ? products[category].filter(
    (element) =>
      element.model.toLowerCase().includes(searchInput.toLowerCase()) ||
      element.price.toString().includes(searchInput)
  ) : []

  return (
    <Container>
      <div id="banner" >
        <h3>PRODUTOS</h3>
      </div>

      <div id="searchInput" >
        <input onChange={(e) => setSearchInput(e.target.value)} placeholder="Pesquisar" />
      </div>

      <div id="products" >
        {!searchInput && products[category] ? (products[category].map((element, index) => (
          <div id="card" key={index}>
            <div id="imageDiv" >
              <img src={element.img} alt={element.model} />
            </div>
            <div id="contentDiv" >
              <h3>{element.model}</h3>
              <p>Exibir detalhes</p>
              <h3>Preço: {element.price}</h3>
              <button >Adicionar</button>
            </div>
          </div>
        ))) :
          filter.length > 0 ? (filter.map((element, index) => (
            <div id="card" key={index}>
              <div id="imageDiv" >
                <img src={element.img} alt={element.model} />
              </div>
              <div id="contentDiv" >
                <h3>{element.model}</h3>
                <p>Exibir detalhes</p>
                <h3>Preço: {element.price}</h3>
                <button >Adicionar</button>
              </div>
            </div>
          ))) :
            <div id="empty">
              <h3>Nenhum produto encontrado</h3>
            </div>
        }
      </div>
    </Container>
  );
};

export default CategoryProducts;
