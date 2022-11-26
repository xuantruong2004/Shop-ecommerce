import axios from "axios";

const API = axios.create({
  // baseURL: "https://vincent-shop-truongxuan.herokuapp.com",
  baseURL: "https://vincentmart-server.onrender.com",
});
export default API;
