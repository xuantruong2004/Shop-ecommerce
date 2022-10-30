import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createBill = (formData) => API.post("/bill", formData);
export const getTimeLine = (id) => API.get(`/bill/${id}`);
