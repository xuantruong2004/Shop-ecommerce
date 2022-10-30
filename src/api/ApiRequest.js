import axios from "axios";

const API = axios.create({
  baseURL: "https://vincent-shop-truongxuan.herokuapp.com",
});
export default API;
