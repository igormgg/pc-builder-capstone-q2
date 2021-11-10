import axios from "axios";

const api = axios.create({
  baseURL: "https://pc-builder-json-api.herokuapp.com/",
});

export default api;
