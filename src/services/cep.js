import axios from "axios";

const cep = axios.create({
  baseURL: "https://api.postmon.com.br/v1/cep",
});

export default cep;
