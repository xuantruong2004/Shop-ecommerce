import API from "./ApiRequest";

export const createBill = (formData) => API.post("/bill", formData);
export const getTimeLine = (id) => API.get(`/bill/${id}`);
export const getAllBill = () => API.get(`/bill`);
