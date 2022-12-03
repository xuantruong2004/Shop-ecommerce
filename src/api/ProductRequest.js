import API from "./ApiRequest";

export const createProduct = (formData) =>
  API.post(`/product/create`, formData);
export const getAllProducts = () => API.get(`/product`);
export const getProduct = (id) => API.get(`/product/${id}`);
export const getCategory = (category) =>
  API.get(`/product/category/${category}`);
export const getListCategory = () => API.get(`/product/dashboard/category`);
export const updateProduct = (id, formData) =>
  API.put(`/product/${id}`, formData);
export const deleteProduct = (id) => API.delete(`/product/${id}`);
