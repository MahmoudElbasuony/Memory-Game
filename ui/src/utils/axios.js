import axios from "axios";
import config from "../config/config.json";

let api = axios.create({
  baseURL: config.api.baseUrl
});

export default api;